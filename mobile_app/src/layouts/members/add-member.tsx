import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, Card, Icon, Input, List, ListItem, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { CloseIcon, SearchIcon } from './extra/icons';
import { SafeAreaLayout } from '../../components/safe-area-layout.component';
import { MemberAutocomplete } from './member-autocomplete.component';



export const AddMemberComponent = (props): React.ReactElement => {
  const { navigation, route } = props;
   
  const renderBackAction = (): React.ReactElement => (
    <TopNavigationAction
      icon={CloseIcon}
      onPress={navigation.goBack}
    />
  ); 
  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        size='small'
        appearance='ghost'
        status='basic'>
        Chia sẻ
      </Button>
      <Button
        style={styles.footerControl}
        size='small'>
        Sao chép đường dẫn liên kết
      </Button>
    </View>
  );
  return (
    <SafeAreaLayout
      style={styles.container}
      insets='top'>
      <TopNavigation
        title='Mời học viên'
        alignment="center"
        accessoryLeft={renderBackAction}
      />
      <View style={styles.inputSearch}>
        <MemberAutocomplete classObj={route.params.data} navigation={navigation} />
      </View> 
      <Card style={styles.card} footer={Footer}>
        <Text>
          Bạn cũng có thể copy đường dẫn liên kết tham gia lớp học hoặc chia sẻ cho mọi người.
        </Text>
      </Card> 
    </SafeAreaLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addButton: {
    borderRadius: 100
  },
  inputSearch: {
    padding: 10
  },
  card: { 
    margin: 10,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  share: {
    padding: 20, 
  }
});
