import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React from 'react'
import auth from '@react-native-firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { horizontalScale, verticalScale } from '../helpers/Metrics'
import firestore from '@react-native-firebase/firestore';

const PreviewAddedCity = ({navigation, route}) => {
	// console.log(route.params.city)
	const cityDetails = route.params.city;
	const [user, setuser] = React.useState();
	const {t} = useTranslation();
	const [city, setCity] = React.useState(cityDetails.city);
	const [description, setDescription] = React.useState(cityDetails.description);
	const [image, setImage] = React.useState({base64:cityDetails.image, imageType:cityDetails.imageType})

  React.useEffect(()=>{
    setuser(auth().currentUser)
  },[])

	// const addCityToDB = async ()=>{
	// 	await firestore().collection("cities").add({
	// 		image:image.base64,
	// 		imageType:image.imageType,
	// 		city:city,
	// 		description:description,
	// 		addedBy: user.uid
	// 	})
	// 	navigation.goBack();
	// }

  return (
		<View style={styles.viewWrapper}>
			<View style={{ flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:"#f2f2f2", marginHorizontal:"2%"}}>
					<View style={{flexDirection:"row", alignItems:"center",}}>
						<Ionicons name='md-menu' size={28} color={"#2D302E"}/>
						<View style={{justifyContent:"center", marginHorizontal:"10%"}}>
							<Text style={[styles.title,{ paddingHorizontal:0}]}>{t("common:greet")}{user?.displayName ? `, ${user?.displayName?.split(" ")[0]}!`:""}</Text>
							<View style={{flexDirection:"row", alignItems:"center",}}>
								<Ionicons name='location-sharp' size={16} color={"red"} />
								<Text style={[styles.subtitle, {color:"red", paddingHorizontal:0, marginBottom:0}]}>{t("common:CurrentLocation")}</Text>
							</View>
						</View>
					</View>
					{ user?.photoURL ? 
					<Image source={{uri:user.photoURL}} style={{width:50, height:50, borderRadius:50, borderColor:"#96BCA9", borderWidth:2}} /> :
					<Image source={require('../assets/User.png')} style={{width:50, height:50}} />
					}
			</View>
			<Text style={[styles.title, {paddingTop:"4%", paddingBottom:"1%"}]} >{t("common:AddCity")}</Text>
			<Text style={styles.subtitle}>{t("common:add_city_subtitle")}</Text>
			<View 
			style={{alignItems:"center" ,backgroundColor:"#F0F4F4", borderColor:"white", borderWidth:2, borderRadius:10, padding:image? 0:"20%"}}>
			<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"stretch"} style={{width:horizontalScale(330), height:verticalScale(250), borderRadius:10}} />
			</View>
			<View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"4%"}}>
				<Ionicons name='location-sharp' size={22} color={"red"} />
				<Text style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%", paddingVertical:"3%" ,paddingLeft:"6%",}}>{city} </Text>
				{/* <TextInput
					value={city}
					placeholder='Search and chose the city'
					onChangeText={setCity}
					placeholderTextColor={"#616163"}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
				/> */}
			</View>
			<Text style={{backgroundColor:"#F0F4F4", marginHorizontal:"4%", marginVertical:"1%",borderColor:"white", borderWidth:2,paddingLeft:"6%", paddingTop:"4%", borderRadius:20, height:verticalScale(150)}}>{description}</Text>
			{/* <TextInput
				multiline
				value={description}
				onChangeText={setDescription}
				placeholder='Write place description here. . .'
				textAlignVertical="top"
				style={{backgroundColor:"#F0F4F4", marginHorizontal:"4%", marginVertical:"2%",borderColor:"white", borderWidth:2,paddingLeft:"4%", borderRadius:20, height:verticalScale(150)}}
			/> */}
			<TouchableOpacity style={styles.mainButton} onPress={()=> { route.params.addCityToDB(); navigation.goBack();}}>
				<Text style={styles.buttonText}>{t("common:AddtheCity")}</Text>
			</TouchableOpacity>
		</View>
  )
}

export default PreviewAddedCity

const styles = StyleSheet.create({
	viewWrapper: {
		paddingTop:"5%",
		paddingHorizontal:"5%",
	},
	title: {
		fontWeight:"bold",
		fontSize: 20,
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
})