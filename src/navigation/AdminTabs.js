import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Main from '../screens/Main';
import Settings from '../screens/Settings';
import TopTabs from './TopTab';
const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:[{height:70, justifyContent:"center" }],
        headerShown:false
    }}
    backBehavior='history'
    >
        <Tab.Screen name="Home" component={TopTabs} options={{
        tabBarIcon:({focused, size}) => (
            <View>
                <MaterialIcons name='home-filled' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                <Entypo name='dot-single' size={size} color={ focused ? "#72F8B6":"#fff"} />
            </View>
        )
    }}/>
        <Tab.Screen name="Settings" component={Settings} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    <AntDesign name='search1' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                    <Entypo name='dot-single' size={size} color={ focused ? "#72F8B6":"#fff"} />
                </View>
            ),
        }}/>
        <Tab.Screen name="Settings1" component={Settings} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    <Octicons name='bell' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                    <Entypo name='dot-single' size={size} color={ focused ? "#72F8B6":"#fff"} />
                </View>
            ),
        }}/>
        <Tab.Screen name="Settings2" component={Settings} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    <FontAwesome name='user-o' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                    <Entypo name='dot-single' size={size} color={ focused ? "#72F8B6":"#fff"} />
                </View>
            ),
        }}/>
    </Tab.Navigator>
  );
}