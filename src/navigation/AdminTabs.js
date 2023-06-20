import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AdminStack from './AdminStack';
import AdminProfileStack from './AdminProfileStack';
import { verticalScale } from '../helpers/Metrics';
import SearchStack from './AdminSearchStack';
import Notifications from '../screens/Notifications';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import RNCalendarEvents from "react-native-calendar-events";
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';

const Tab = createBottomTabNavigator();

RNCalendarEvents.requestPermissions((readOnly = false));

export default function TabNav() {
  const [calendar, setCalendar] = React.useState()
  const [token, setToken] = React.useState()



  const getCalendarEvents = async ()=>{
    let docs = []
    firestore()
    .collection("calendar")
    .where("user","==", auth().currentUser.uid)
    .get().then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
      querySnapshot.forEach( documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
        docs.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setCalendar(docs)
      getCalendarEventsDetails()
      notifCalendar()
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
        isAdmin:true,
        notifToken:token,
        uid: auth().currentUser.uid
    })
    setToken(token)
    // .where("uid","==", auth().currentUser.uid)
}

  const notifCalendar = ()=>{
    let rem = 0;
    for (let i = 0; i < calendar.length; i++) {
      rem = new Date(calendar[i].startDate)-new Date()
    // console.log()
      if (rem<86400){
        //send notif
        sendNotif(calendar[i])
      }
    }
  }

  const sendNotif = (data)=>{
		var notif = {
			title:"Reminder from Calender",
			body:`1 day remaining in your ${data.location} tour.`,
			// navigate:"ViewSchedule",
			// data:{
			// 	scheduleId: route.params.docId,
			// 	loadData:true,
			// }
		}
		const batch = firestore().batch();
		
		firestore()
		.collection('users')
		.where("notifToken","==",token)
		.get().then(async querySnapshot => {
			// console.log('Total users: ', querySnapshot.size);
			let docs = []
			querySnapshot.forEach(documentSnapshot => {
				var docRef = firestore().collection("notifications").doc(); //automatically generate unique id
				notif.user = documentSnapshot.data().uid
				batch.set(docRef, notif);
				axios.post("https://fcm.googleapis.com/fcm/send", {
					"to":documentSnapshot.data().notifToken,
					"data":{
						"body":notif.body,
						"title":notif.title,
						// data:notif.data,
						// navigate:notif.navigate
					}
				  }, {
					headers: {
					withCredentials:true, 
					  Authorization: `Bearer ${SERVER_KEY}`,
					}
				  })
			//   documentSnapshot.data().id = documentSnapshot.id
			//   docs.push(documentSnapshot.data())
			  // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
			});
			const result = await batch.commit();
		});

	}

  React.useEffect(()=>{
    (async ()=>{
        await messaging().registerDeviceForRemoteMessages();
        const token = await messaging().getToken();
        addNotifToken(token)
        // console.log(token)
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