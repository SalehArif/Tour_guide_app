import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import { StatusBar, PermissionsAndroid, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
// Components
import LoginNavigation from './src/navigation/LoginNavigation';
import UserTabs from './src/navigation/UserTabs';
import AdminTabs from './src/navigation/AdminTabs';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

const App = () => {
   // Set an initializing state whilst Firebase connects
   const [initializing, setInitializing] = useState(true);
   const [user, setUser] = useState();
 
   // Handle user state changes
   function onAuthStateChanged(user) {
     setUser(user);
     if (initializing) setInitializing(false);
   }
  
   useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.data.title, remoteMessage.data.body);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  }, []);



   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);
 
   if (initializing) return null;
   if (!user) {
     return (
       <LoginNavigation/>
     );
   }

   return (
     <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#f2f2f2"}/>
        {/* <UserTabs /> */}
        <AdminTabs/>
    </NavigationContainer>
   );
};
 
export default App;