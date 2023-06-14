import 'react-native-gesture-handler';
import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  StatusBar
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

// Components
import Main from './src/screens/Main';
import LoginNavigation from './src/navigation/LoginNavigation';
import TabNav from './src/navigation/Tabs';
import TopTab from './src/navigation/TopTab';
import AdminTabNav from './src/navigation/AdminTabs';

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
  //  createUserWithEmailAndPassword for signup
   if (!user) {
     return (
       <LoginNavigation/>
     );
   }
 
   // <UserNavigation/>
  //  <TabNav />
   return (
     <NavigationContainer>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#f2f2f2"}/>
        <AdminTabNav/>
    </NavigationContainer>
   );
};

const LoadingIndicator = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};
 
function UserNavigation(){
  return (
      <Stack.Navigator initialRouteName='Main' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
      
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  activityContainer: {justifyContent:"center",alignItems:"center"}
});

export default App;