import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { horizontalScale, moderateScale, verticalScale } from '../helpers/Metrics';

const Profile = ({navigation}) => {
	const [user, setUser] = React.useState(auth().currentUser)
  const [image, setImage] = React.useState(user.photoURL)

  return (
    <View style={styles.viewWrapper}>
			<View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between"}}>
				<TouchableOpacity onPress={()=>navigation.goBack()} >
					<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
				<Text style={[styles.title,{ fontSize:20}]} >Profile</Text>
				<Ionicons name='settings-sharp' onPress={()=>navigation.navigate("Settings")} size={24} color={"#333"} style={{ marginLeft:"2%", padding:"1%", }} />
			</View>
			<View style={{alignItems:"center", marginTop:"20%"}} >
				{image ?  
					<Image source={{uri:image}} style={{width:horizontalScale(110), height:verticalScale(120), borderRadius:moderateScale(70), borderColor:"#96BCA9", borderWidth:2}}/>:
					<Image source={require("../assets/user_icon.png")} style={{width:horizontalScale(110), height:verticalScale(120), borderRadius:moderateScale(70), borderColor:"#96BCA9", borderWidth:2}} />
				}
				<Text style={[styles.subtitle,{color:"#000", fontSize:20, marginTop:"3%"}]} >{auth().currentUser?.displayName ?? "User" }</Text>
				<View style={{flexDirection:"row", alignItems:"center",}}>
					<Ionicons name='location-sharp' size={16} color={"red"} />
					<Text style={[styles.subtitle, {color:"red", paddingHorizontal:0, marginBottom:0}]}>Current Location</Text>
				</View>
			</View>
				<TouchableOpacity style={styles.mainButton} onPress={()=>navigation.navigate("EditProfile")}>
					<MaterialCommunityIcons name='account-edit' size={20} />
					<Text style={styles.buttonText}>Edit Profile</Text>
				</TouchableOpacity>
    </View>
  )
}

export default Profile

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
    fontSize: 14,
    color: '#828F9C',
    paddingHorizontal:"4%",
    marginBottom:"3%"
  },
	mainButton: {
    backgroundColor:"#EAEAEA", borderRadius:30, marginHorizontal:"20%",
    marginTop:"2%", paddingVertical:"2%", flexDirection:"row", alignItems:"center", justifyContent:"center"
  },
  buttonText:{
    fontFamily: 'DM Sans',
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: 33,
    textAlign: "center",
    color: "#101018",
    marginVertical:"2%",
		marginLeft:"2%"
},
})