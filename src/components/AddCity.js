import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, Platform, KeyboardAvoidingView, ScrollView, StatusBar, Modal, ToastAndroid } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'
import { horizontalScale, moderateScale, verticalScale } from '../helpers/Metrics'
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { ActivityIndicator } from 'react-native-paper';
import { API_KEY } from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddCity = ({navigation}) => {
	const {t} = useTranslation();
	const [city, setCity] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [image, setImage] = React.useState()
	const [loading, setLoading] = React.useState(false)

	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.1});
		if(result.assets){
			setImage(result.assets[0])
		}
	}

	const addCityToDB = async ()=>{
		setLoading(true)
		if (image !== undefined && city !== "" && description !== ""){
			const obj = {
				image:`data:image/${image.type};base64,${image.base64}`,
				city:city,
				description:description,
				addedBy: auth().currentUser.uid
			}
			try {
				await firestore().collection("cities").add(obj)
				resetFields();
				ToastAndroid.showWithGravity("City Added Succesfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)	
			} catch (error) {
				console.log(error)
				ToastAndroid.showWithGravity("City couldn't be added. You may have to select a different image", ToastAndroid.LONG, ToastAndroid.BOTTOM)
				
			}

		}
		else
			ToastAndroid.showWithGravity("Fill in the required fields", ToastAndroid.LONG, ToastAndroid.BOTTOM)
		setLoading(false)
	}

	const resetFields = ()=>{
		setCity("")
		setDescription("")
		setImage(null)
	  }

  return (
    <View style={styles.viewWrapper}>
		<StatusBar barStyle={"dark-content"} backgroundColor={loading ? "#0007":"#f2f2f2"}/>
		{/* <ScrollView> */}
		<KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={100}>
			<Text style={styles.subtitle}>{t("common:add_city_subtitle")}</Text>
			<TouchableOpacity onPress={chooseImage} 
			style={{alignItems:"center" ,backgroundColor:"#F0F4F4", borderColor:"white", borderWidth:2, borderRadius:10, padding:image? 0:"16%"}}>
			{ image ? 
					<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"stretch"} style={{width:horizontalScale(330), height:verticalScale(190), borderRadius:10}} />:
					<>
						<MaterialCommunityIcons name='file-image' size={30} color={"#333"}/>
						<Text style={{marginTop:"8%"}} >{t("common:pic_upload")}</Text>
						<Text style={{marginTop:"0%"}} >{t("common:max_size")}</Text>
					</>
			}
			</TouchableOpacity>
			<View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"4%"}}>
				<Ionicons name='location-sharp' size={22} color={"red"} />
				{/* <TextInput
					value={city}
					placeholder='Search and chose the city'
					onChangeText={setCity}
					placeholderTextColor={"#616163"}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
				/> */}
				<GooglePlacesAutocomplete
					placeholder={t("common:AddcitySub1")}
					onPress={(data, details = null) => {
					// 'details' is provided when fetchDetails = true
					if(data.terms.length == 3)
						setCity(data.terms[0].value+" "+data.terms[2].value)
					else if(data.terms.length == 2)
						setCity(data.terms[0].value+" "+data.terms[1].value)
					else
						setCity(data.terms[0].value)
					console.log(data);
					}}
					disableScroll={true}
					query={{
						key: API_KEY,
						language: 'en',
					}}
					styles={{
						textInputContainer:{
							backgroundColor:"white", borderWidth:1, borderRadius:50, borderColor:"#DBDBDB", paddingVertical:"1%",marginHorizontal:"2%" ,paddingHorizontal:"4%",
						},
					}}
				/>
			</View>
			<TextInput
				multiline
				value={description}
				onChangeText={setDescription}
				placeholder={t("common:WriteDescription")}
				textAlignVertical="top"
				style={{backgroundColor:"#F0F4F4", marginHorizontal:"4%", marginVertical:"2%",borderColor:"white", borderWidth:2,paddingLeft:"6%", paddingTop:"6%", borderRadius:20, height:verticalScale(150)}}
				/>

			<TouchableOpacity style={styles.mainButton} onPress={()=>{navigation.navigate("PreviewAddedCity", { city: 
				{image:image.base64,imageType:image.type,city:city,description:description}, addCityToDB }); }}>
				<Text style={styles.buttonText}>{t("common:AddtheCity")}</Text>
			</TouchableOpacity>
			</KeyboardAvoidingView>
			{/* </ScrollView> */}
			<Modal
				visible={loading}
				animationType="slide"
				transparent={true}
				style={{backgroundColor:"#0007", alignItems:"center"}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<ActivityIndicator size={moderateScale(100)} color={"#fff"} />
					</View>
				</View>
			</Modal>
    </View>
  )
}

export default AddCity

const styles = StyleSheet.create({
	viewWrapper: {
		paddingTop:"5%",
		paddingHorizontal:"5%",
	},
	subtitle: {
		fontSize: 14,
		color: '#828F9C',
		paddingHorizontal:"4%",
		marginBottom:"3%"
	},
  mainButton: {
    borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"1%",
    marginTop:"2%", paddingVertical:"2%"
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
centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#0007",
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: null,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    
  }
})