import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ListRenderItemInfo, NativeScrollEvent, StyleSheet, View } from 'react-native';
import { Button, Card, List, Text } from '@ui-kitten/components';
import { ActivityIcon, ClockIcon } from './extra/icons';
// import { Training } from './extra/data';
import { getClasses } from '../../services/classes';
import { ClassObj } from './types/class';
import { PersonIcon } from '../auth/login/extra/icons';
import { SettingsIcon } from '../../components/icons';
import { ScrollView } from 'react-native-gesture-handler';

const headerImages = [
  require('./assets/img_backtoschool.jpeg'),
  require('./assets/img_bookclub.jpeg'),
  require('./assets/img_breakfast.jpeg'),
  require('./assets/img_code.jpeg'),
  require('./assets/img_graduation.jpeg'),
  require('./assets/img_reachout.jpeg'),
]
Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
}

export default ({ navigation }): React.ReactElement => {
  const [page, setPage] = useState<number>(1)
  const [loadingMore, setLoadingMore] = useState<boolean>(false)

  const [classes, setClasses] = useState<ClassObj[]>([])
  const handleGetClasses = async () => {
    const result = await getClasses();
    const classes = result.results.map(classObj => {
      return {
        ...classObj,
        image: headerImages.sample()
      }
    })
    setClasses(classes);
  }

  useEffect(() => {
    handleGetClasses();
  }, [])

  const renderItemHeader = (info: ListRenderItemInfo<ClassObj>): React.ReactElement => (
    <View>
      <ImageBackground
        style={styles.itemHeader}
        source={info.item.image}
      />
      <Text style={styles.headerName} category='h4'>{info.item.className}</Text>
    </View>
  );
  const enterClassroom = (item) => {
    navigation.navigate('Classroom', { data: item })
  }


  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }
  const handleLoadMore = async () => {
    const result = await getClasses(page + 1);
    const moreData = result.results.map(classObj => {
      return {
        ...classObj,
        image: headerImages.sample()
      }
    })
    setPage(pre => pre + 1)
    setClasses(classes.concat(moreData));
  }

  const renderItem = (info: ListRenderItemInfo<ClassObj>): React.ReactElement => (
    <Card
      style={styles.item}
      onPress={() => enterClassroom(info.item)}
      header={() => renderItemHeader(info)}>
      <View style={styles.itemFooter}>
        <Button
          style={styles.activityButton}
          appearance='ghost'
          size='tiny'
          accessoryLeft={SettingsIcon}>
          Code: {info.item.code}
        </Button>
        <Button
          style={styles.activityButton}
          appearance='ghost'
          size='tiny'
          status='danger'
          accessoryLeft={PersonIcon}>
          {info.item.owner.name}
        </Button>
      </View>
    </Card>
  );
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          setLoadingMore(true)
          handleLoadMore()
          setLoadingMore(false)
        }
      }}
      scrollEventThrottle={400}>
      <List
        style={styles.list}
        data={classes}
        renderItem={renderItem}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator size="large" color={'#110000'} />
          ) : null
        }
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  item: {
    borderRadius: 0,
    marginVertical: 8,
  },
  itemHeader: {
    height: 160,
  },
  itemFooter: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: -4,
  },
  activityButton: {
    marginHorizontal: 4,
    paddingHorizontal: 0,
  },
  headerName: {
    position: 'absolute',
    flexDirection: 'row',
    width: '80%',
    color: "#fff",
    top: 10,
    left: 10,
    justifyContent: 'space-between'
  }
});
