import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const AdminProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export default AdminProfileStack