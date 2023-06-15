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
import AdminStack from './AdminStack';
import ProfileStack from './ProfileStack';
import { verticalScale } from '../helpers/Metrics';
import SearchStack from './SearchStack';
const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
        tabBarShowLabel:false,
        tabBarStyle:[{height:verticalScale(60), justifyContent:"center" }],
        headerShown:false
    }}
    backBehavior='history'
    >
        <Tab.Screen name="Home" component={AdminStack} options={{
        tabBarIcon:({focused, size}) => (
            <View>
                <MaterialIcons name='home-filled' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                
            </View>
        )
    }}/>
        <Tab.Screen name="SearchStack" component={SearchStack} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    <AntDesign name='search1' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                    
                </View>
            ),
        }}/>
        <Tab.Screen name="Settings1" component={Settings} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    <Octicons name='bell' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                    
                </View>
            ),
        }}/>
        <Tab.Screen name="ProfileStack" component={ProfileStack} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    <FontAwesome name='user-o' size={size} color={ focused ? "#72F8B6":"#DADCE0"} />
                    
                </View>
            ),
        }}/>
    </Tab.Navigator>
  );
}