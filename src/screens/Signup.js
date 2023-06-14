import React, {useCallback, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Alert, TextInput, TouchableOpacity, Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Signup({navigation}){
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const {width, height} = Dimensions.get("window")

  // state values for toggable visibility of features in the UI
  const [passwordHidden, setPasswordHidden] = useState(true);

  const signup = useCallback(async () => {
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }

      console.error(error);
    });
}, [email, password]);

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = useCallback(async () => {
    try {
      // await app.emailPasswordAuth.registerUser({email, password});
      await signup();
    } catch (error) {
      Alert.alert(`Failed to sign up: ${error?.message}`);
    }
  }, [signup, email, password]);

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
      <Text style={styles.title}>Sign up</Text>
        <Text style={styles.subtitle}>
        Welcome! Please enter your Name, email and password to create your account.
        </Text>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={"#828F9C"}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor={"#828F9C"}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone number"
          placeholderTextColor={"#828F9C"}
          onChangeText={setPhone}
          style={styles.input}
        />
        <TextInput
          placeholder="Your Password"
          placeholderTextColor={"#828F9C"}
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
          style={styles.input}
          // rightIcon={
          //   <Icon
          //     type="material-community"
          //     name={passwordHidden ? 'eye-off-outline' : 'eye-outline'}
          //     size={12}
          //     color="black"
          //     onPress={() => setPasswordHidden(!passwordHidden)}
          //     tvParallaxProperties={undefined}
          //   />
          // }
        />
        <TouchableOpacity
          style={styles.mainButton}
          onPress={onPressSignUp}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={{flexDirection:"row", position:"absolute", top:height, left:width*0.25}}>
            <Text>Already have an account? </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.secondaryButton}>Login</Text>
            </TouchableOpacity>
          </View>
{/*         
        <TouchableOpacity
          title="Already have an account? Log In"
          type="clear"
          titleStyle={styles.secondaryButton}
          onPress={() => navigation.navigate("")}
        >
          <Text></Text>
        </TouchableOpacity> */}
        
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    paddingTop:"30%",
    paddingHorizontal:"5%",
  },
  title: {
    fontWeight:"bold",
    fontSize: 25,
    color:"#101018",
    marginVertical:"2%",
    paddingHorizontal:"4%",
  },
  subtitle: {
    fontSize: 14,
    color: '#828F9C',
    paddingHorizontal:"4%",
    marginBottom:"3%"
  },
  mainButton: {
    borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"1%",
    marginTop:"6%", paddingVertical:"2%"
  },
  secondaryButton: {
    color:  '#000',
    fontWeight:"bold"
  },
  buttonText:{
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 33,
    textAlign: "center",
    color: "#101018",
    marginVertical:"2%"
},
input:{borderWidth:1, borderColor:"#ccc", borderRadius:50, marginVertical:"3%", paddingLeft:"6%", paddingVertical:"5%"}
});

