import React, {useCallback, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import {StyleSheet, Text, View, Alert, TextInput, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import { horizontalScale, moderateScale, verticalScale } from '../helpers/Metrics';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {launchImageLibrary} from 'react-native-image-picker';

const EditProfile = ({navigation}) => {
	const [user, setUser] = React.useState(auth().currentUser)
	const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.displayName);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [image, setImage] = React.useState(user.photoURL)
	
	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.5});
		if(result.assets){
			setImage(result.assets[0])
		}
		// console.log(`data:image/${image.type};base64,${image.base64}`.substring(0,40))
	}

  const updateProfile = useCallback(async () => {
    Promise.allSettled([
      user.updateProfile({displayName: name }),
			user.updateEmail(email),
			password.length>5 ? user.updatePassword(password):null,
			firestore().collection('users')
      .add({
        uid: userCreds.user.uid,
				image: `data:image/${image.type};base64,${image.base64}`,
        isAdmin:true
      }),
    ]).then((values) => {
      console.log(values);
    });	
}, [email, password, image, name]);

  // onPressSignUp() registers the user and then calls signIn to log the user in
  const onPressSignUp = useCallback(async () => {
    try {
      // await app.emailPasswordAuth.registerUser({email, password});
      setLoading(true)
      await updateProfile();
      setLoading(false)
    } catch (error) {
      Alert.alert(`Failed to update: ${error?.message}`);
    }
  }, [updateProfile, email, password, image, name]);

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
				<View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
					<TouchableOpacity onPress={()=>navigation.goBack()} >
						<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
					</TouchableOpacity>
					<Text style={[styles.title,{ fontSize:20}]} >Edit Profile</Text>
					<Ionicons name='settings-sharp' onPress={()=>navigation.navigate("Settings")} size={24} color={"#333"} style={{ marginLeft:"2%", padding:"1%", }} />
				</View>
				<View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly", marginTop:"20%", marginBottom:"10%"}}>
					{image ? typeof image === 'string' ?  
							<Image source={{uri:image}} style={styles.image}/>:
							<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} style={styles.image} />:
							<Image source={require("../assets/User.png")} style={styles.image} />
					}
					<View style={{alignItems:"flex-start"}}>
						<Text style={styles.subtitle}>Upload profile picture</Text>
						<TouchableOpacity style={styles.mainButton1} onPress={chooseImage}>
							<AntDesign name='camerao' size={20} />
							<Text style={styles.buttonText1}>Upload</Text>
						</TouchableOpacity>
					</View>
				</View>
        <TextInput
					value={name}
          placeholder="Full Name"
          placeholderTextColor={"#828F9C"}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
					value={email}
          placeholder="Email Address"
          placeholderTextColor={"#828F9C"}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
					value={password}
          placeholder="Password"
          placeholderTextColor={"#828F9C"}
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
          style={styles.input}
        />
        <TouchableOpacity
          style={styles.mainButton}
          onPress={onPressSignUp}
        >
          {loading ? 
            <ActivityIndicator color={"#000"} size={'large'} style={{marginVertical:"1%"}}/>:
            <Text style={styles.buttonText}>Save Changes</Text>
          }
        </TouchableOpacity>
        
      </View>
    </SafeAreaProvider>
  );
}

export default EditProfile

const styles = StyleSheet.create({
    viewWrapper: {
      paddingTop:"5%",
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
      fontSize: 15,
      color: '#000',
			fontWeight:"500",
      paddingHorizontal:"4%",
      marginBottom:"3%"
    },
    mainButton: {
      borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"1%",
      marginTop:"6%", paddingVertical:"2%"
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
    secondaryButton: {
      color:  '#000',
      fontWeight:"bold"
    },
		
	mainButton1: {
    backgroundColor:"#EAEAEA",
		borderRadius:30,
		marginLeft:"5%",
    marginTop:"2%",
		paddingVertical:"2%",
		paddingHorizontal:"15%", 
		flexDirection:"row", 
		alignItems:"center", 
		justifyContent:"center"
  },
  buttonText1:{
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 33,
    textAlign: "center",
    color: "#101018",
    marginVertical:"2%",
		marginHorizontal:"5%"
},
  input:{borderWidth:1, borderColor:"#ccc", borderRadius:50, marginVertical:"3%", paddingLeft:"6%", paddingVertical:"5%"},
	image:{width:horizontalScale(80), height:verticalScale(90), borderRadius:moderateScale(70), borderColor:"#96BCA9", borderWidth:2}
  });
  
  