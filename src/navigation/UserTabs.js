import React from 'react';
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNCalendarEvents from "react-native-calendar-events";
import messaging from '@react-native-firebase/messaging';
const Tab = createBottomTabNavigator();

RNCalendarEvents.requestPermissions((readOnly = false));

export default function UserTabs() {
    const [calendar, setCalendar] = React.useState()
    const getCalendarEvents = async ()=>{
      let docs = []
      firestore()
      .collection("calendar")
      .where("user","==", auth().currentUser.uid)
      .get().then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        querySnapshot.forEach( documentSnapshot => {
          documentSnapshot.data().id = documentSnapshot.id
          docs.push(documentSnapshot.data())
          // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
        });
        setCalendar(docs)
        getCalendarEventsDetails()
        // console.log(docs)
      })
    }
    
    const getCalendarEventsDetails = async ()=>{
      let details = {}, doc={}, docs = []
      for (let i = 0; i < calendar.length; i++) {
        details = await RNCalendarEvents.findEventById(calendar[i].eventId);
        doc = { title:details.title, startDate:details.startDate, location:details.location, description:details.description, 
          scheduleId: calendar[i].schedule, type:calendar[i].type, docId:calendar[i].id, eventId:calendar[i].eventId}
        // console.log(doc)
        docs.push(doc)
      }
      setCalendar(docs)
      console.log(docs)
    }

    const addNotifToken = (token)=>{
        firestore()
        .collection("users")
        .add({
            isAdmin:false,
            notifToken:token,
            uid: auth().currentUser.uid
        })
        // .where("uid","==", auth().currentUser.uid)
    }

    React.useEffect(()=>{
        (async ()=>{
            await messaging().registerDeviceForRemoteMessages();
            const token = await messaging().getToken();
            addNotifToken(token)
            console.log(token)
        })()
        getCalendarEvents()
      }, [])
    
  
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