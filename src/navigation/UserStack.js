import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DetailPage from '../screens/DetailPage';
import UserLandingPage from '../screens/UserLandingPage';
import UserSuggestedPrograms from '../screens/UserSuggestedPrograms';
import ViewSchedule from '../screens/ViewSchedule';
import CommunityProgram from '../screens/CommunityProgram';
import PlacesToVisit from '../screens/PlacesToVisit';

const Stack = createStackNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName='UserLandingPage' screenOptions={{headerShown:false}}>
        <Stack.Screen name="UserLandingPage" component={UserLandingPage} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="SuggestedPrograms" component={UserSuggestedPrograms} />
        <Stack.Screen name="ViewSchedule" component={ViewSchedule} />
        <Stack.Screen name="CommunityProgram" component={CommunityProgram} />
        <Stack.Screen name="PlacesToVisit" component={PlacesToVisit} />
    </Stack.Navigator>
  )
}

export default UserStack