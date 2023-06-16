import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from '../screens/DetailPage';
import UserLandingPage from '../screens/UserLandingPage';
import UserSuggestedPrograms from '../screens/UserSuggestedPrograms';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName='UserLandingPage' screenOptions={{headerShown:false}}>
        <Stack.Screen name="UserLandingPage" component={UserLandingPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="SuggestedPrograms" component={UserSuggestedPrograms} />
    </Stack.Navigator>
  )
}

export default UserStack