import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, TextInput, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import {launchImageLibrary} from 'react-native-image-picker';
import { horizontalScale, moderateScale, verticalScale } from '../helpers/Metrics'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { API_KEY } from "@env"

const AddSchedule = ({navigation}) => {
	const [loading, setLoading] = React.useState(false)
	const [city, setCity] = React.useState("");
	const [days, setDays] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [image, setImage] = React.useState()

	const {t} = useTranslation();


	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.1});
		if(result.assets){
			setImage(result.assets[0])
		}
	}

	const addScheduleToDB = async ()=>{
		setLoading(true)
		try {
			const obj = {
				image:`data:image/${image.type};base64,${image.base64}`,
				city:city,
				description:description,
				type:"Suggested Schedule",
				days:parseInt(days),
				addedBy: auth().currentUser.uid
			}
			const documentRef = await firestore().collection("schedules").add(obj)
			resetFields();
			// console.log(documentRef.id)
			ToastAndroid.showWithGravity("Schedule Added Succesfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)	
			navigation.navigate("AddActivity", { scheduleId: documentRef.id });
		} catch (error) {
			console.log(error)
			ToastAndroid.showWithGravity("Schedule couldn't be added. You may have to select a different image", ToastAndroid.LONG, ToastAndroid.BOTTOM)
			
		}
		setLoading(false)
		// navigation.navigate("AddActivity",)
	}

	const resetFields = ()=>{
		setCity("")
		setDescription("")
		setDays("")
		setImage(null)
	  }


  return (
    <View style={styles.viewWrapper}>
			<StatusBar barStyle={"dark-content"} backgroundColor={loading ? "#0007":"#f2f2f2"}/>
			<KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={100}>
			<View style={{flexDirection:"row", alignItems:"center"}}>
					<TouchableOpacity onPress={()=>navigation.goBack()} >
							<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
					</TouchableOpacity>
					<Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>{t("common:AddSchedule")}</Text>
			</View>
			<TouchableOpacity onPress={chooseImage} 
			style={{alignItems:"center" ,backgroundColor:"#F0F4F4", borderColor:"white", borderWidth:2, borderRadius:10, marginTop:"8%" ,padding:image? 0:"16%"}}>
			{ image ? 
					<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"stretch"} style={{width:horizontalScale(330), height:verticalScale(190), borderRadius:10}} />:
					<>
						<MaterialCommunityIcons name='file-image' size={30} color={"#333"}/>
						<Text style={{marginTop:"8%"}} >{t("common:pic_upload")}</Text>
						<Text style={{marginTop:"0%"}} >{t("common:max_size")}</Text>
					</>
			}
			</TouchableOpacity>
			<View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"6%"}}>
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
					query={{
					key: API_KEY,
					language: 'en',
					}}
					disableScroll={true}
					// renderRow={(data,index)=>(
					// 	<View style={{borderRadius:20, backgroundColor:"#333"}}>
					// 		<Text style={{fontSize:14, color:"#fff"}} >{data.description}</Text>
					// 	</View>
					// )}
					styles={{
					textInputContainer:{
						backgroundColor:"white", borderWidth:1, borderRadius:50, borderColor:"#DBDBDB", paddingVertical:"1%",marginHorizontal:"2%" ,paddingHorizontal:"4%",
					},
					}}
				/>
			</View>
			<View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"10%"}} >
					<Text style={[styles.title, {fontSize:16}]} >{t("common:Programduration")}</Text>
					<TextInput
						value={days}
						placeholder="0"
						onChangeText={(value)=> {parseInt(value)>=0 || value=="" ? setDays(value):null}}
						style={{backgroundColor:"white", borderWidth:1, borderRadius:50, borderColor:"#DBDBDB", paddingVertical:"1%",marginHorizontal:"2%", fontSize:18 ,paddingHorizontal:"4%",}}
					/>
					<Text style={[styles.title, {fontSize:16}]} >{t("common:days")}</Text>
			</View>
			<TextInput
				multiline
				value={description}
				onChangeText={setDescription}
				placeholder={t("common:WriteDescription")}
				textAlignVertical="top"
				style={{backgroundColor:"#F0F4F4", marginHorizontal:"4%", marginVertical:"2%",borderColor:"white", borderWidth:2,paddingLeft:"6%", paddingTop:"6%", borderRadius:20, height:verticalScale(150)}}
			/>
			<TouchableOpacity style={styles.mainButton} onPress={()=>{addScheduleToDB(); }}>
				<Text style={styles.buttonText}>{t("common:Next")}</Text>
			</TouchableOpacity>
			</KeyboardAvoidingView>
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

export default AddSchedule

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
    paddingHorizontal:"2%",
  },
  subtitle: {
    fontSize: 14,
    color: '#828F9C',
    paddingHorizontal:"2%",
    marginBottom:"3%"
  },
  mainButton: {
    borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"1%",paddingHorizontal:"8%",
    marginTop:"6%", paddingVertical:"2%", flexDirection:"row", alignItems:"center", justifyContent:"center"
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