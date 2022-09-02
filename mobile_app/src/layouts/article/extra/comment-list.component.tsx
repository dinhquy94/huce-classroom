import React from 'react';
import { ListRenderItemInfo, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  List,
  ListProps,
  Text,
} from '@ui-kitten/components';
import { HeartIcon, MessageCircleIcon, MoreHorizontalIcon } from './icons';
import { Comment } from './data';
import { baseUrl } from '../../../services/config';

export type CommentListProps = Omit<ListProps, 'renderItem'>;

export const CommentList = (props: CommentListProps): React.ReactElement => {

  const renderCommentHeader = (comment: Comment): React.ReactElement => (
    <View style={styles.commentHeader}>
      <Avatar source={comment.user.avatar ? { uri: baseUrl.concat("/v1/media/attatchment/").concat(comment.user.avatar) } : require('../assets/image-profile.jpeg')}/>
      <View style={styles.commentAuthorContainer}>
        <Text category='s2'>{comment.user.name}</Text>
        <Text appearance='hint' category='c1'>{comment.createdAt}</Text>
      </View>
      <Button
        style={styles.iconButton}
        appearance='ghost'
        status='basic'
        accessoryLeft={MoreHorizontalIcon}
      />
    </View>
  );

  const renderItem = (info: ListRenderItemInfo<Comment>): React.ReactElement => (
    <Card
      style={styles.commentItem}
      header={() => renderCommentHeader(info.item)}>
      <Text>{info.item.commentContent}</Text> 
    </Card>
  );

  return (
    <List
      {...props}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  commentItem: {
    marginVertical: 4,
    marginHorizontal: 16,
  },
  commentHeader: {
    flexDirection: 'row',
    padding: 16,
  },
  commentAuthorContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  commentReactionsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginHorizontal: -8,
    marginVertical: -8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
