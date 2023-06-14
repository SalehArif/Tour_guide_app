import React, {useCallback, useState} from 'react';
import {StyleSheet, Text, View, Alert, TextInput, Image,ToastAndroid, TouchableOpacity, Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const {width, height} = Dimensions.get("window")

  return (
    <View style={styles.viewWrapper}>
      <TouchableOpacity onPress={()=>navigation.goBack()} >
        <Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
      </TouchableOpacity>
      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
      Don't worry! It happens. Please enter the email associated with your account.
      </Text>
      <TextInput
        placeholder="Enter Your Email"
        placeholderTextColor={"#828F9C"}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.mainButton}
        onPress={ async ()=>{ await auth().sendPasswordResetEmail(email);navigation.navigate("ResetSuccess")}}
      >
        <Text style={styles.buttonText}>Send Email</Text>
      </TouchableOpacity>
      <View style={{flexDirection:"row", position:"absolute", top:height, left:width*0.3}}>
        <Text>Remember password? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.secondaryButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
  viewWrapper: {
    paddingTop:"15%",
    paddingHorizontal:"5%",
  },
  title: {
    fontWeight:"bold",
    fontSize: 25,
    color:"#101018",
    marginVertical:"2%",
    marginTop:"15%",
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
    marginTop:"15%", paddingVertical:"2%"
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
input:{borderWidth:1, borderColor:"#ccc", borderRadius:50, marginVertical:"12%", paddingLeft:"6%", paddingVertical:"5%"},
})