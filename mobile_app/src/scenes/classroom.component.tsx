import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ArrowIosBackIcon, BookIcon, MoreVerticalIcon, SettingsIcon } from '../components/icons';
import { SafeAreaLayout } from '../components/safe-area-layout.component';
import ContentView from '../layouts/classroom';
import { useDispatch } from 'react-redux';
import { loadMembers } from '../redux/Member/slice';
import { loadFeeds, loadHomeworks } from '../redux/Classroom/slice';


export const ClassroomScreen = (props) => { 
  const { navigation, route } = props;
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon} 
      alignment="center"
      onPress={navigation.goBack}
    />
  );

  const dispatch = useDispatch();  
  const classId = route.params.data.id;
  
  dispatch(loadMembers({ classId, page: 1, searchQuery: ""})) 
  dispatch(loadFeeds({ classId, page: 1, searchQuery: ""})) 
  dispatch(loadHomeworks({ classId, page: 1})) 

  const renderToggleButton = () => (
    <TopNavigationAction
      icon={MoreVerticalIcon}
      onPress={() => setVisible(true)} />
  );

  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  const onItemSelect = (index) => {
    setSelectedIndex(index);
    setVisible(false);
  };
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MoreVerticalIcon} onPress={toggleMenu}/>
  );
  const renderRightActions = () => (
    <React.Fragment> 
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={BookIcon} title='About'/>
        <MenuItem accessoryLeft={BookIcon} title='Logout'/>
      </OverflowMenu>
    </React.Fragment>
  );
  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title={route.params.data.className}
        accessoryLeft={renderBackAction}
        // accessoryRight={renderRightActions}

      />
      <ContentView navigation={navigation} route={route} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
