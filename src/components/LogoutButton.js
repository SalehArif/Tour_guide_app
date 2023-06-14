import React, {useCallback, useState, useEffect} from 'react';
import {Pressable, Alert, View, Text, StyleSheet} from 'react-native';
import {useUser} from '@realm/react';
import auth from '@react-native-firebase/auth';

export function LogoutButton() {
    // const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
 
   // Handle user state changes
   function onAuthStateChanged(user) {
     setUser(user);
    //  if (initializing) setInitializing(false);
   }
 
   useEffect(() => {
     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
     return subscriber; // unsubscribe on unmount
   }, []);
 
  // The signOut function calls the logOut function on the currently
  // logged in user and then navigates to the welcome screen
  const signOut = useCallback(() => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
  }, [user]);

  return (
    <Pressable
      onPress={() => {
        Alert.alert('Log Out', '', [
          {
            text: 'Yes, Log Out',
            style: 'destructive',
            onPress: () => signOut(),
          },
          {text: 'Cancel', style: 'cancel'},
        ]);
      }}>
      <View style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Log Out</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 16,
    color:  '#00684A',
  },
});