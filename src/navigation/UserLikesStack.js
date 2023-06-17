import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LikedSchedules from '../screens/LikedSchedules';
import LikedScheduleDetails from '../screens/LikedScheduleDetails';

const Stack = createStackNavigator();

const UserLikesStack = () => {
  return (
    <Stack.Navigator initialRouteName='LikedSchedules' screenOptions={{headerShown:false}}>
        <Stack.Screen name="LikedSchedules" component={LikedSchedules} />
        <Stack.Screen name="LikedScheduleDetails" component={LikedScheduleDetails} />
    </Stack.Navigator>
  )
}

export default UserLikesStack