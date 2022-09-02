import React, { useEffect, useState } from 'react';
import { ImageBackground, ListRenderItemInfo, LogBox, ScrollView, View } from 'react-native';
import { Avatar, Button, StyleService, useStyleSheet, Card, Layout, List, Text, Spinner } from '@ui-kitten/components';
import { ImageOverlay } from './extra/image-overlay.component';
import { ProfileSocial } from './extra/profile-social.component';
import { MessageCircleIcon, HeartIcon, PersonAddIcon, PinIcon, AttatchmentIcon } from './extra/icons';
import { Post, Profile } from './extra/data';
import { ClassObj } from '../classes/types/class';
import { Article } from './extra/article';
import { Props } from '@ui-kitten/components/devsupport/services/props/props.service';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from '../../redux/Member/slice';
import { getFeeds, loadFeeds } from '../../redux/Classroom/slice';
import moment from "moment";
import { baseUrl } from '../../services/config';
/*
 * Will warn because container view is ScrollView that contains 3 List components inside.
 * Better workaround depends on the user needs.
 */
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews']);
 
export default ({ route, navigation }: Props): React.ReactElement => {
  const { members } = useSelector(getMembers)
  const { feeds, isLoading, reload, userInfo } = useSelector(getFeeds)
  const [classroom, setClassroom] = useState<ClassObj>({} as ClassObj);
 
  useEffect(() => {
    setClassroom(route.params.data);
    if(!route.params || !route.params.data) {
      navigation.navigate("Home")
    } 
  }, [reload]) 

  
  const onItemPress = (feed: any): void => {
    navigation && navigation.navigate('ArticleDetail', { classroom: route.params.data, feed: feed.item });
  };


  const styles = useStyleSheet(themedStyle);

  const addNewFeedACtion = (): void => {
    navigation && navigation.navigate('AddFeed', { classroom });
  }

  const renderFriendItem = (info: ListRenderItemInfo<Profile>): React.ReactElement => (
    <View style={styles.friendItem}>
      <Avatar source={info.item.userId.avatar ? { uri: baseUrl.concat("/v1/media/attatchment/").concat(info.item.userId.avatar) } : require('./assets/image-profile.jpeg')}/>
      <Text
        style={styles.friendName}
        category='c2'>
          {info.item.userId.name.length < 8
                ? `${info.item.userId.name}`
                : `${info.item.userId.name.substring(0, 7)}...`}
         
      </Text>
    </View>
  );

  const renderPostItem = (info: ListRenderItemInfo<Post>): React.ReactElement => (
    <ImageBackground
      style={styles.postItem}
      source={info.item.photo}
    />
  );
  const renderItemFooter = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <View style={styles.itemFooter}>
      <Avatar source={info.item.userId.avatar ? { uri: baseUrl.concat("/v1/media/attatchment/").concat(info.item.userId.avatar) } : require('./assets/image-profile.jpeg')}/>
      <View style={styles.itemAuthoringContainer}>
        <Text
          category='s2'>
          {info.item.userId.name}
        </Text>
        <Text
          appearance='hint'
          category='c1'>
          {moment(info.item.updatedAt).format("DD-MM HH:mm")}
        </Text>
      </View>
      {info.item.comments.length > 0 && <Button
        style={styles.iconButton}
        appearance='ghost'
        status='basic'
        accessoryLeft={MessageCircleIcon}>
         {info.item.comments.length || 0}
      </Button>}
      {info.item.attatchments.length > 0 && <Button
        style={styles.iconButton}
        appearance='ghost' 
        accessoryLeft={AttatchmentIcon}>
       {info.item.attatchments.length || 0}
      </Button>}
    </View>
  );

  const renderItemHeader = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <View></View>
  );

  const renderItem = (info: ListRenderItemInfo<Article>): React.ReactElement => (
    <Card
      style={styles.item}
      header={() => renderItemHeader(info)}
      footer={() => renderItemFooter(info)}
      onPress={() => onItemPress(info)}>
      <Text style={styles.feedTextTitle}>
        {info.item.title}
      </Text>
      <Text
        style={styles.itemContent}
        appearance='hint'
        category='s1'>
        {`${info.item.content.substring(0, 82)}...`}
      </Text>
    </Card>
  );
  return (
    <ScrollView style={styles.container}>
      <ImageOverlay
        style={styles.header}
        source={require('./assets/img_bookclub.jpeg')}> 
        <Text
          style={styles.profileName}
          category='h5'
          status='control'>
          {classroom.className}
        </Text>  
        <View style={styles.socialsContainer}>
          <ProfileSocial
            style={styles.profileSocial}
            hint='Thành viên'
            value='100'
          />
          <ProfileSocial
            style={styles.profileSocial}
            hint='Tài liệu'
            value='100'
          />
          <ProfileSocial
            style={styles.profileSocial}
            hint='Bài tập'
            value='100'
          />
        </View>
      </ImageOverlay>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Giới thiệu
      </Text>
      <Text
        style={styles.profileDescription}
        appearance='hint'>
        {classroom.description}
      </Text>
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Thành viên
      </Text>
      <List
        contentContainerStyle={styles.friendsList}
        horizontal={true}
        data={members}
        renderItem={renderFriendItem}
      />
      <Text
        style={styles.sectionLabel}
        category='s1'>
        Bảng tin lớp lọc
      </Text>
      <Card style={styles.shareNewsFeed} onPress={() => addNewFeedACtion()}> 
      <View style={{ flex: 1, flexDirection:"row" }} >
      <Avatar source={userInfo.avatar ? { uri: baseUrl.concat("/v1/media/attatchment/").concat(userInfo.avatar) } : require('./assets/image-profile.jpeg')}/>
        <View style={{ flex: 1, justifyContent: 'center', marginLeft: 10 }}> 
          <Text
            appearance='hint'
            category='s2'>
            Chia sẻ với lớp học của bạn
          </Text> 
        </View> 
      </View>
        
    </Card>


      { isLoading && <View style={styles.loadingFeeds}>

       <Spinner size='large'/>
      </View> }

      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={feeds}
        renderItem={renderItem} 
      />
    </ScrollView> 
  );
};

const themedStyle = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  profileAvatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    marginVertical: 16,
  },
  profileName: {
    zIndex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginVertical: 8,
  },
  profileButtonsContainer: {
    flexDirection: 'row',
    marginVertical: 32,
    marginHorizontal: 20,
  },
  profileButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  socialsContainer: {
    flexDirection: 'row',
    width: '75%',
    marginVertical: 8,
  },
  profileSocial: {
    flex: 1,
  },
  sectionLabel: {
    marginTop: 24,
    marginBottom: 8,
    marginHorizontal: 16,
  },
  profileDescription: {
    marginHorizontal: 16,
  },
  friendsList: {
    marginHorizontal: 8,
  },
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  friendName: {
    marginTop: 8,
  },
  postItem: {
    flex: 1,
    aspectRatio: 1.0,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
  },
  itemHeader: {
    height: 220,
  },
  itemContent: {
    marginVertical: 8,
  },
  itemFooter: {
    flexDirection: 'row',
    padding: 5
  },
  shareNewsFeed: { 
    marginLeft: 8,
    marginRight: 8, 
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  itemAuthoringContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  loadingFeeds: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedTextTitle: {
    fontSize: 16
  },
  addNewFeed: {
    flex: 1
  }
});

