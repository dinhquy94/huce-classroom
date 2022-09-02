import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ListRenderItemInfo, NativeScrollEvent, ScrollView, View } from 'react-native';
import { isArray } from 'lodash'
import {
  Button,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  OverflowMenu,
  StyleService,
  useStyleSheet,
} from '@ui-kitten/components';
import { SearchIcon } from './extra/icons';
import { Message } from './extra/data';
import { connect, useDispatch, useSelector } from 'react-redux';
import { getMembers, loadMembers, loadMore, setMembers } from '../../redux/Member/slice';
import { getClassMembers } from '../../services/classes';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { MemberItem } from './extra/member-item.component';

const initialMessages: Message[] = [
  Message.howAreYou(),
  Message.canYouSend(),
  Message.noProblem(),
];

const MembersComponent = ({ route, navigation }: Props): React.ReactElement => {

  // const [members, setMembers] = useState<any[]>([])
  const [loadingMore, setLoadingMore] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [searchQuery, setSearchQuery] = React.useState<string>();

  const { members } = useSelector(getMembers)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMembers({ classId: route.params.data.id, page, searchQuery})) 
  }, [searchQuery])
 
  const styles = useStyleSheet(themedStyles); 
  const renderItem = ({ item }) => (
    <MemberItem
      name={item.userId.name}
      role={item.role}
      item={item}
      classId={route.params.data.id}
    />
  );
  const handleLoadMore = async () => {
    setLoadingMore(true) 
    dispatch(loadMore({ classId: route.params.data.id, page: page + 1, searchQuery})) 
    setPage(pre => pre + 1)
    setLoadingMore(false)
  }
 
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }
  return (
    <View style={styles.mainView}>
      <View style={styles.inputSearch}>
        <Input
            placeholder='Tìm kiếm học viên'
            value={searchQuery}
            onChangeText={setSearchQuery }
            accessoryRight={SearchIcon}
          />  
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={({ nativeEvent }) => {
          if (isCloseToBottom(nativeEvent)) { 
            handleLoadMore()
          }
        }}
        scrollEventThrottle={400}>
        
        <List
          style={styles.list}
          data={members}
          renderItem={renderItem}
          ListFooterComponent={() =>
            loadingMore ? (
              <ActivityIndicator size="large" color={'#110000'} />
            ) : null
          }
        />
      </ScrollView>
    </View>
  );
};

const themedStyles = StyleService.create({
  list: {
    flex: 1,
  },
  mainView: {
    flex: 1
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'background-basic-color-3',
  },
  memberAction: {
    borderRadius: 100
  },
  inputSearch: {
    padding: 10
  }
});


export default MembersComponent