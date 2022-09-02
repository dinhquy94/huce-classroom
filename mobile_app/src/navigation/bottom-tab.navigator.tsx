import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import { ClassroomScreen } from '../scenes/classroom.component';
import {
    BottomTabNavigationOptions,
    createBottomTabNavigator,
  } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../scenes/home.component';
import { LayoutIcon } from '../components/icons';
import { HomeBottomNavigation } from './home-bottom-navigation';
import { MembersScreen } from '../scenes/members.component';
import { HomeworkScreen } from '../layouts/classroom/homework';

const BottomTab = createBottomTabNavigator();

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline'/>
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline'/>
);

const EmailIcon = (props) => (
  <Icon {...props} name='email-outline'/>
);

const useBottomNavigationState = (initialState = 0) => {
  const [selectedIndex, setSelectedIndex] = React.useState(initialState);
  return { selectedIndex, onSelect: setSelectedIndex };
};
const ROOT_ROUTES: string[] = ['Classroom', 'Layouts', 'Components', 'Themes'];

const TabBarVisibilityOptions = ({ route }): BottomTabNavigationOptions => {
    // const isNestedRoute: boolean = route.state?.index > 0;
    // const isRootRoute: boolean = ROOT_ROUTES.includes(route.name);
  
    return { tabBarVisible: true };
    // return { tabBarVisible: isRootRoute && !isNestedRoute };
  };

export const BottomTabNavigation = (props) => {

  const { navigation, route } = props;

  useEffect(() => {
    // Update the document title using the browser API
   
  });
 
  const topState = useBottomNavigationState();
  const bottomState = useBottomNavigationState();

  return (
    <React.Fragment> 
      <BottomTab.Navigator
        screenOptions={TabBarVisibilityOptions}
        initialRouteName='ClassDetail'
        tabBar={props => <HomeBottomNavigation {...props} />}> 
        <BottomTab.Screen  name='ClassDetail' initialParams={route.params} component={ClassroomScreen} />
        <BottomTab.Screen name='Homework' initialParams={route.params} component={HomeworkScreen} />
        <BottomTab.Screen name='Members' initialParams={route.params} component={MembersScreen} />
    </BottomTab.Navigator>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    marginVertical: 8,
  },
});