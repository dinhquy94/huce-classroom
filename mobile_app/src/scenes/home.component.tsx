import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { AccountIcon, ArrowIosBackIcon } from '../components/icons';
import { SafeAreaLayout } from '../components/safe-area-layout.component';
import ContentView from '../layouts/classes';
import { useDispatch } from 'react-redux';
import { LoadAuthorInfo } from '../redux/Classroom/slice';


export const HomeScreen = ({ navigation }): React.ReactElement => {

  const dispatch = useDispatch();  
  const showProfile = () => {
    navigation.navigate('MyAccount')
  }

  dispatch(LoadAuthorInfo())

  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={AccountIcon}
      onPress={showProfile}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Danh sách lớp học'
        alignment="center"
        accessoryLeft={renderBackAction}
      />
      <ContentView navigation={navigation}/>
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
