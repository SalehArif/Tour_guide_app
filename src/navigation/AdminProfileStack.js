import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';
import GuideManual from '../screens/GuideManual';
import AddSchedule from '../screens/AddSchedule';
import AddActivity from '../screens/AddActivity';
import ApproveSchedules from '../screens/ApproveSchedules';
import ViewSchedule from '../screens/ViewSchedule';

const Stack = createStackNavigator();

const AdminProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="GuideManual" component={GuideManual} />
        <Stack.Screen name="AddSchedule" component={AddSchedule} />
        <Stack.Screen name="AddActivity" component={AddActivity} />
        <Stack.Screen name="ApproveSchedules" component={ApproveSchedules} />
        <Stack.Screen name="ViewSchedule" component={ViewSchedule} />
    </Stack.Navigator>
  )
}

export default AdminProfileStack