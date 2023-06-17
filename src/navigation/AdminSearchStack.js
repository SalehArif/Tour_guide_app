import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import DetailPage from '../screens/DetailPage';
import SuggestedPrograms from '../screens/SuggestedPrograms';
import ViewSchedule from '../screens/ViewSchedule';
import CommunityProgram from '../screens/CommunityProgram';
import PlacesToVisit from '../screens/PlacesToVisit';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName='Search' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="SuggestedPrograms" component={SuggestedPrograms} />
        <Stack.Screen name="ViewSchedule" component={ViewSchedule} />
        <Stack.Screen name="CommunityProgram" component={CommunityProgram} />
        <Stack.Screen name="PlacesToVisit" component={PlacesToVisit} />
    </Stack.Navigator>
  )
}

export default SearchStack