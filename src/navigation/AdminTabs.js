import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UserLandingPage from '../screens/UserLandingPage';
import Settings from '../screens/Settings';
import AdminTopTabs from './AdminTopTabs';
import AdminStack from './AdminStack';
import AdminProfileStack from './AdminProfileStack';
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
                {
                    focused ?
                    <MaterialCommunityIcons name='home' size={size} color={"#72F8B6"} />:
                    <MaterialCommunityIcons name='home-outline' size={size} color={"#DADCE0"} />
                }
                
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
                    {
                        focused ?
                        <Fontisto name='bell-alt' size={size} color={"#72F8B6"} />:
                        <Fontisto name='bell' size={size} color={"#DADCE0"} />
                    }
                    
                </View>
            ),
        }}/>
        <Tab.Screen name="ProfileStack" component={AdminProfileStack} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    {
                        focused ?
                        <FontAwesome name='user' size={size} color={"#72F8B6"} />:
                        <FontAwesome name='user-o' size={size} color={"#DADCE0"} />
                    }
                    
                </View>
            ),
        }}/>
    </Tab.Navigator>
  );
}