import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import UserLandingPage from '../screens/UserLandingPage';
import Settings from '../screens/Settings';
import AdminTopTabs from './AdminTopTabs';
import { verticalScale } from '../helpers/Metrics';
import AdminProfileStack from './AdminProfileStack';
import UserStack from './UserStack';
import UserProfileStack from './UserProfileStack';
import UserLikesStack from './UserLikesStack';
import Notifications from '../screens/Notifications';

const Tab = createBottomTabNavigator();

export default function UserTabs() {
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
        <Tab.Screen name="Home" component={UserStack} options={{
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
        <Tab.Screen name="UserLikesStack" component={UserLikesStack} 
        options={{
            tabBarIcon:({focused, size}) => (
                <View>
                    {
                        focused ?
                        <AntDesign name='heart' size={size} color={"#72F8B6"} />:
                        <AntDesign name='hearto' size={size} color={"#DADCE0"} />
                    }
                    
                </View>
            ),
        }}/>
        <Tab.Screen name="Notifications" component={Notifications} 
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
        <Tab.Screen name="ProfileStack" component={UserProfileStack} 
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