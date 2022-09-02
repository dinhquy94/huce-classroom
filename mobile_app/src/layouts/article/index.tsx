import React, { useEffect } from 'react';
import { Alert, PermissionsAndroid, Platform, View } from 'react-native';
import { Button, Divider, Input, Layout, List, Spinner, StyleService, Text, useStyleSheet } from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/keyboard-avoiding-view.component';
import { CommentList } from './extra/comment-list.component';

import { getFeedDetailApi, submitComment } from '../../services/classes';
import moment from 'moment';
import { AttatchmentItem } from '../classroom/extra/attatchment-item.component';
import { baseUrl } from '../../services/config';

import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs'

import FileViewer from 'react-native-file-viewer'

const keyboardOffset = (height: number): number => Platform.select({
  android: 0,
  ios: height,
});

export default (props): React.ReactElement => {
  const { navigation, route } = props
  const { classroom, feed } = route.params
  const styles = useStyleSheet(themedStyles);
  const [inputComment, setInputComment] = React.useState<string>("");
  const [feedDetail, setFeedDetail] = React.useState<any>({comments: []});
  const [reload, setReload] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  // const { feedDetail, isLoading } = useSelector(getFeeds)

  useEffect(() => {
    getFeedDetailApi(feed.id).then(result => { 
      setFeedDetail(result.data)
    }).finally(() => {
      setIsLoading(false)
    })
  }, [reload])

  const renderCommentsLabel = React.useCallback(evaProps => (
    <Text
      {...evaProps}
      style={styles.commentInputLabel}>
      Bình luận của bạn
    </Text>
  ), []);

  const postComment = async() => {
    const commentContent = inputComment;
    setInputComment("");
    const result = await submitComment(feed.id, commentContent);
    
    if(result.status) {
      Toast.show({
        type: 'success',
        text1: "Bình luận của bạn đã được đăng tải thành công!"
      });
      setReload(!reload);
    }else {
      Toast.show({
        type: 'error',
        text1: "Lỗi khi đăng bình luận, xin vui lòng thử lại!"
      });
    }
  }

  const renderPostCommentButton = () => (
    <Button 
    onPress={postComment}
    status='basic'>
    Đăng
  </Button>
  )

  const renderAttatchmentItem = ({ item }) => (
    <AttatchmentItem
      {...item}
      onDeleteAttatchment={removeAttatchment}
      onDownloadAttatchment={checkPermission}
    />
  );
  const removeAttatchment = () => {
    
  }
  const renderHeader = (): React.ReactElement => (

    <Layout
      style={styles.header}
      level='1'>
      {isLoading && <View style={styles.loadingFeeds}>
        <Spinner size='large' />
      </View>}
      {!isLoading && <View>
        <Text
          style={styles.titleLabel}
          category='h6'>
          {feedDetail.title}
        </Text>

        <Text style={styles.contentLabel}>
          {feedDetail.content}
        </Text>
        <View style={styles.authoringContainer}>
          <Text
            appearance='hint'
            category='p2'>
            {`Đăng bởi ${feedDetail.userId.name} vào lúc`}
          </Text>
          <Text
            style={styles.dateLabel}
            appearance='hint'
            category='p2'>{feedDetail.createdAt ? moment(feedDetail.createdAt).format("HH:mm DD-MM ") : ""}
          </Text>
        </View>
        <Divider />
        <List
          style={styles.listContainer}
          data={feedDetail.attatchments}
          renderItem={renderAttatchmentItem}
        />
        <Divider />
        <Input
          style={styles.commentInput}
          label={renderCommentsLabel}
          placeholder='Viết bình luận của bạn'
          value={inputComment}
          onChangeText={setInputComment}
          accessoryRight={renderPostCommentButton}
        />
       
        
      </View>}
    </Layout>
  );
  const checkPermission = async (fileName) => { 

    const fileUrl = baseUrl.concat("/v1/media/attatchment/").concat(fileName)
    // Function to check the platform
    // If Platform is Android then check for permissions.
    const localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`
    const options = { 
      fromUrl: fileUrl,
      toFile: localFile,
    }
    RNFS.downloadFile(options)
      .promise.then(() => {
          FileViewer.open(localFile)
          // console.log(localFile)
      })
      .then(() => {
        // success
        // setDisplay({item: null, display: false});
      })
      .catch(error => {
        // error
        console.log({ error })
        // eslint-disable-next-line no-undef
        showMessage(error.message, 'warning')
      })
    // if (Platform.OS === 'ios') {
    //   // downloadFile(fileUrl, fileName);
    // } else {
    //   try {
    //     const granted = await PermissionsAndroid.request(
    //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //       {
    //         title: 'Storage Permission Required',
    //         message:
    //           'Application needs access to your storage to download File',
    //       }
    //     );
    //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //       // Start downloading
    //      // downloadFile(fileUrl, fileName);
    //       console.log('Storage Permission Granted.');
    //     } else {
    //       // If permission denied then show alert
    //       Alert.alert('Error', 'Storage Permission Not Granted');
    //     }
    //   } catch (err) {
    //     // To handle permission related exception
    //     console.log("++++" + err);
    //   }
    // }
  };
 

  return (
    <KeyboardAvoidingView
      style={styles.container}
      offset={keyboardOffset}>
      <CommentList
        style={styles.list}
        data={feedDetail.comments}
        ListHeaderComponent={renderHeader()}
      />
    </KeyboardAvoidingView>
  );

};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
    paddingBottom: 8,
  },
  list: {
    flex: 1,
  },
  listContainer: {
    flex: 1
  },
  header: {
    marginBottom: 8,
  },
  image: {
    height: 240,
  },
  titleLabel: {
    marginHorizontal: 24,
    marginVertical: 16,
  },
  descriptionLabel: {
    margin: 24,
  },
  contentLabel: {
    marginHorizontal: 24,
  },
  authoringContainer: {
    flexDirection: 'row',
    marginVertical: 10, 
    marginHorizontal: 24, 
  },
  dateLabel: {
    marginHorizontal: 8,
  },
  commentInputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: 'text-basic-color',
  },
  commentInput: {
    marginHorizontal: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  loadingFeeds: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
