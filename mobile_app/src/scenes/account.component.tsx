import React from 'react';
import { StyleSheet } from 'react-native';
import { TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { AccountIcon, ArrowIosBackIcon } from '../components/icons';
import { SafeAreaLayout } from '../components/safe-area-layout.component';
import ContentView from '../layouts/profile';

export const MyAccountScreen = ({ navigation }): React.ReactElement => {
 
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={ArrowIosBackIcon}
      onPress={navigation.goBack}
    />
  );

  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Thông tin cá nhân'
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
