import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AdminTopTabs from './AdminTopTabs';
import PreviewAddedCity from '../components/PreviewAddedCity';
import Settings from '../screens/Settings';


const Stack = createStackNavigator();

const AdminStack = () => {
  return (
    <Stack.Navigator initialRouteName='AddCityTabs' screenOptions={{headerShown:false}}>
        <Stack.Screen name="AddCityTabs" component={AdminTopTabs} />
        <Stack.Screen name="PreviewAddedCity" component={PreviewAddedCity} />
        <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}

export default AdminStack