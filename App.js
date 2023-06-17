import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

// Components
import LoginNavigation from './src/navigation/LoginNavigation';
import UserTabs from './src/navigation/UserTabs';
import AdminTabs from './src/navigation/AdminTabs';

const Stack = createStackNavigator();

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
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);
 
   if (initializing) return null;
   if (!user) {
     return (
       <LoginNavigation/>
     );
   }

   // <UserTabs />
   return (
     <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#f2f2f2"}/>
        <AdminTabs/>
    </NavigationContainer>
   );
};
 
export default App;