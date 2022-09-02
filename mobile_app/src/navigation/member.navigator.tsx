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
import { MembersScreen } from '../scenes/members.component';

const { Navigator, Screen } = createStackNavigator();
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MemberNavigator = () => (
  <Stack.Navigator>
    
    <Stack.Screen 
    name="Member" 
    component={MembersScreen} 
    options={{headerShown: false}} />
    <Stack.Screen   options={{headerShown: false}} name="ListMeme" component={HomeScreen} />
    <Stack.Screen name="Signup" component={SignUpScreen} />
    <Stack.Screen   options={{headerShown: false}} name="Classroom" component={BottomTabNavigation} />
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
