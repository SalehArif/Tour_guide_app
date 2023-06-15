import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screens/Search';
import DetailPage from '../screens/DetailPage';
import SuggestedPrograms from '../screens/SuggestedPrograms';

const Stack = createStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName='Search' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="DetailPage" component={DetailPage} />
        <Stack.Screen name="SuggestedPrograms" component={SuggestedPrograms} />
    </Stack.Navigator>
  )
}

export default SearchStack