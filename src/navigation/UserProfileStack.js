import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import UserProfile from '../screens/UserProfile';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import AddSchedule from '../screens/AddSchedule';
import AddActivity from '../screens/AddActivity';
import MySchedules from '../screens/MySchedules';
import ViewSchedule from '../screens/ViewSchedule';
import GuideManual from '../screens/GuideManual';

const Stack = createStackNavigator();

const UserProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Profile" component={UserProfile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} />
        <Stack.Screen name="AddActivity" component={AddActivity} />
        <Stack.Screen name="MySchedules" component={MySchedules} />
        <Stack.Screen name="ViewSchedule" component={ViewSchedule} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GuideManual" component={GuideManual} />
    </Stack.Navigator>
  )
}

export default UserProfileStack