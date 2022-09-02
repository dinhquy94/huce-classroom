import React from 'react';
import { Alert, StyleSheet, View, ViewStyle } from 'react-native';
import { Avatar, Button, Icon, ListItem, ListItemProps, MenuItem, OverflowMenu, Text, TopNavigationAction } from '@ui-kitten/components';
import { DoneAllIcon } from './icons';
import { Message } from './data';
import { MoreVerticalIcon } from '../../../components/icons';
import { removeMemberFromClass } from '../../../services/classes';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { loadMembers } from '../../../redux/Member/slice';

export type MemberItemProps = ListItemProps & {
  name: string,
  role: string,
  item: any,
  classId: string
};

export const MemberItem = (props: MemberItemProps): React.ReactElement => {

  const { name, role, onPress, item, classId, ...listItemProps } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);
  const dispatch = useDispatch();
   const removeMember = () => { 
    setMenuVisible(!menuVisible);
    Alert.alert(
      "Xác nhận",
      "Bạn có muốn xoá thành viên khỏi lớp học?",
      [
        {
          text: "Huỷ bỏ",
          onPress: () => {},
          style: "cancel"
        },
        { 
          text: "Xoá", onPress: () => { 
            removeMemberFromClass({userId: item.userId.id, classId}).then(res => {
          
              if(!res.success) {
                Toast.show({  
                  type: 'error',
                  text1: res.message
                }); 
              }else {
                Toast.show({  
                  type: 'success',
                  text1: res.message
                }); 
                dispatch(loadMembers({ classId , page: 1, searchQuery: ""})) 
              }
            })
          }
        }
      ]
    ); 
  }
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  const renderMenuAction = () => (
    <Button style={styles.memberAction} onPress={toggleMenu}  appearance='ghost' accessoryLeft={MoreVerticalIcon}/>
  );
  const renderRightActions = () => (
    <React.Fragment> 
      <OverflowMenu
       anchor={renderMenuAction}
       visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem title='Gửi email cho học viên'/>
        <MenuItem onPress={removeMember} title='Xoá'/>
      </OverflowMenu>
    </React.Fragment>
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
      description={role}
      title={
      <View>
        <Text  style={styles.userFullName}>{name}</Text>
      </View>
      } 
      accessoryLeft={renderProfileAvatar}
      accessoryRight={renderRightActions} 
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
    fontWeight: "500"
  },
  memberAction: {
    borderRadius: 100
  },
  icon: {
    width: 32,
    height: 32,
  },
});
