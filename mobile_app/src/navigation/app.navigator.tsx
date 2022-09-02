import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import { SignIn2Screen } from '../scenes/login.component';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignUpScreen } from '../scenes/signup.component';
import { HomeScreen } from '../scenes/home.component';
import { ClassroomScreen } from '../scenes/classroom.component';
import { BottomNavigationTab } from '@ui-kitten/components';
import { BottomTabNavigation } from './bottom-tab.navigator';
import { AddMemberComponent } from '../layouts/members/add-member';
import { AddFeedComponent } from '../layouts/classroom/add-feed';
import { ArticleScreen } from '../scenes/article.component';
import { MyAccountScreen } from '../scenes/account.component';
 
const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator> 
    <Stack.Screen 
    name="Login" 
    component={SignIn2Screen} 
    options={{headerShown: false}} />
    <Stack.Screen   options={{headerShown: false}} name="Home" component={HomeScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen options={{headerShown: false}} name="Classroom" component={BottomTabNavigation} />
    <Stack.Screen options={{headerShown: false}} name="AddMember" component={AddMemberComponent} />
    <Stack.Screen options={{headerShown: false}} name="AddFeed" component={AddFeedComponent} />
    <Stack.Screen options={{headerShown: false}} name="ArticleDetail" component={ArticleScreen} />
    <Stack.Screen options={{headerShown: false}} name="MyAccount" component={MyAccountScreen} />
  </Stack.Navigator>
);
const navigatorTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // prevent layout blinking when performing navigation
    background: 'transparent',
  },
};
export const AppNavigator = () => (
  <NavigationContainer theme={navigatorTheme}>
    <HomeNavigator/>
  </NavigationContainer>
);
