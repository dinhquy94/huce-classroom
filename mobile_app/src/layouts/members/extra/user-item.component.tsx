import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar, Button, Icon, ListItem, ListItemProps, MenuItem, OverflowMenu, Text, TopNavigationAction } from '@ui-kitten/components';
import { DoneAllIcon } from './icons';
import { Message } from './data';
import { MoreVerticalIcon } from '../../../components/icons';

export type UserItemProps = ListItemProps & {
  name: string,
  email: string
};

export const UserItem = (props: UserItemProps): React.ReactElement => {

  const { name, email, onPress, ...listItemProps } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <Button style={styles.memberAction} onPress={toggleMenu}  appearance='ghost' accessoryLeft={MoreVerticalIcon}/>
  );
  
  const renderProfileAvatar = (): React.ReactElement => (
    <Icon
    style={styles.icon}
    fill='#8F9BB3'
    name='person'
  />
  ); 
  return (
    <ListItem
      {...listItemProps}
      onPress={onPress} 
      description={email}
      title={
      <View>
        <Text style={styles.userFullName}>{name}</Text>
      </View>
      } 
      accessoryLeft={renderProfileAvatar}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    tintColor: null,
    marginRight: 10,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    textAlign: 'right',
    minWidth: 64,
  },
  userFullName: {
    fontSize: 15,
    color: "#388E3C"
  },
  memberAction: {
    borderRadius: 100
  },
  icon: {
    width: 32,
    height: 32,
    color: '#00796B'
  },
});
