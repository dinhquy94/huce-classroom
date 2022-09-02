import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { ArrowIosBackIcon } from '../components/icons';
import { SafeAreaLayout } from '../components/safe-area-layout.component';
import ContentView from '../layouts/members';
import { PersonAddIcon } from '../layouts/classroom/extra/icons';
import { PersonIcon } from '../layouts/auth/login/extra/icons';

 
export const MembersScreen = (props): React.ReactElement => {
  const { navigation, route } = props;
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );
  const addMember = () => {
    navigation.navigate("AddMember", {data: route.params.data})
  }
  const renderRightActions = () => (
    <Button style={styles.addButton} onPress={addMember}  appearance='ghost' status='primary' accessoryLeft={PersonAddIcon}/>
  );
  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Thành viên lớp học'
        alignment="center"
        accessoryLeft={renderBackAction}
        accessoryRight={renderRightActions}
      />
      <ContentView navigation={navigation} route={route} />
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    borderRadius: 100
  }
});
