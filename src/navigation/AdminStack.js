import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TopTabs from './TopTab';
import PreviewAddedCity from '../components/PreviewAddedCity';

const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName='AddCityTabs' screenOptions={{headerShown:false}}>
        <Stack.Screen name="AddCityTabs" component={TopTabs} />
        <Stack.Screen name="PreviewAddedCity" component={PreviewAddedCity} />
    </Stack.Navigator>
  )
}

export default AdminStack