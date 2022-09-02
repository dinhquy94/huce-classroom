import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Button, MenuItem, OverflowMenu, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ArrowIosBackIcon, BookIcon, MoreVerticalIcon, SettingsIcon } from '../components/icons';
import { SafeAreaLayout } from '../components/safe-area-layout.component';
import ContentView from '../layouts/article';
import { useDispatch } from 'react-redux';
import { getFeedDetail } from '../redux/Classroom/slice';

export const ArticleScreen = (props) => { 

  const dispatch = useDispatch();   
  const { navigation, route } = props;

  useEffect(() => {
    dispatch(getFeedDetail({feedId: route.params.feed.id}))
 }, [])

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon} 
      alignment="center"
      onPress={navigation.goBack}
    />
  ); 
 
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
        title="Bài viết chi tiết"
        accessoryLeft={renderBackAction}
      />
      <ContentView navigation={navigation} route={route}  />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
