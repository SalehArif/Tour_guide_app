import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Image, TextInput, FlatList, Linking, ToastAndroid, Modal, KeyboardAvoidingView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from 'react-i18next'
import {launchImageLibrary} from 'react-native-image-picker';
import { horizontalScale, moderateScale, verticalScale } from '../helpers/Metrics'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ActivityIndicator } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import DatePicker from 'react-native-date-picker'
import { API_KEY } from "@env"

const AddActivity = ({navigation, route}) => {
	const [image, setImage] = React.useState()
	const [loading, setLoading] = React.useState(false)
	const [place, setPlace] = React.useState("");
	const [activityName, setActivityName] = React.useState("");
	const [activityTime, setActivityTime] = React.useState(new Date());
	const [activities, setActivities] = React.useState([]);
	const [city, setCity] = React.useState("");
	const [location, setLocation] = React.useState()
	const [date, setDate] = React.useState(new Date())
	const [open, setOpen] = React.useState(false)
  
	const {t} = useTranslation();

	
	const resetFields = ()=>{
		// setCity("")
		// setLocation()
		setActivityName("")
		setActivityTime(new Date())
		setPlace("")
		setImage(null)
	  }

	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.1});
		if(result.assets){
			setImage(result.assets[0])
		}
	}

	const addactivity = ()=>{
		// add schedule id as well
		setLoading(true)
		if(image !== null && location !== null){
			setActivities(prevState => 
				[...prevState, 
					{activityName, activityTime, place, city, image:`data:image/${image.type};base64,${image.base64}`, location, schedule_id:route.params.scheduleId}
				] )
			resetFields()
		}
		setLoading(false)
	}

	const addactivityToDB = async ()=>{
		// Create a new batch instance
		setLoading(true)
		const batch = firestore().batch();
		activities.forEach(item => {
			var docRef = firestore().collection("activities").doc(); //automatically generate unique id
			batch.set(docRef, item);
		})

		try {
			const result = await batch.commit();
			resetFields()
			setActivities([])
			ToastAndroid.showWithGravity("Schedule Added Succesfully", ToastAndroid.SHORT, ToastAndroid.BOTTOM)	
		} catch (error) {
			console.log(error)
			ToastAndroid.showWithGravity("Schedule couldn't be added. You may have to select a different image", ToastAndroid.LONG, ToastAndroid.BOTTOM)
		}
		setLoading(false)
	}


	const openMaps = (location)=>{
		const scheme = Platform.select({ ios: 'maps://app?', android: 'google.navigation:q=' });
		const latLng = Platform.select({ios:`saddr=${location.lat}+${location.lng}&daddr=${location.lat}+${location.lng}`, android:`${location.lat}+${location.lng}`});
		// const label = 'Custom Label';
		// 'maps://app?saddr=100+101&daddr=100+102'
		const url = `${scheme}${latLng}`
		// Platform.select({
		// 	ios: `${scheme}${latLng}`,
		// 	android: `${scheme}${latLng}`
		// });
		Linking.openURL(url);
	}

  return (
		<View style={styles.viewWrapper}>
			<StatusBar barStyle={"dark-content"} backgroundColor={loading ? "#0007":"#f2f2f2"}/>
			<KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={0}>
			<View style={{flexDirection:"row", alignItems:"center"}}>
					<TouchableOpacity onPress={()=>navigation.goBack()} >
							<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
					</TouchableOpacity>
					<Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>{t("common:AddSchedule")}</Text>
			</View>
			<View style={{borderRadius:10, borderColor:"#DBDBDB", borderWidth:1, paddingHorizontal:"2%", paddingVertical:"4%", marginVertical:"4%", marginBottom:"2%"}} >
				<View style={{flexDirection:"row", alignItems:"center"}} >
					<TouchableOpacity onPress={chooseImage} 
					style={{alignItems:"center",backgroundColor:"#DFDBDB", borderRadius:10, width:"25%", padding:image? 0:"4%", paddingVertical:image? 0:"6%", marginHorizontal:"6%", marginBottom:"2%"}}>
					{ image ? 
							<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"stretch"} style={{width:horizontalScale(80), height:verticalScale(80), borderRadius:10}} />:
							<MaterialCommunityIcons name='file-image' size={30} color={"#333"}/>
					}
					</TouchableOpacity>
					<TouchableOpacity onPress={chooseImage}  style={{backgroundColor:"#E7E7E7", marginTop:"2%", marginLeft:"2%", paddingHorizontal:"4%", paddingVertical:"2%", borderRadius:20}} >
							<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>{t("common:Uploadpictures")}</Text>
					</TouchableOpacity>
				</View>
				<TextInput
					value={place}
					placeholder={t("common:PlaceName")}
					onChangeText={setPlace}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:20, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%", marginVertical:"1%" }}
				/>
				<TextInput
					value={activityName}
					placeholder={t("common:ActivityName")}
					onChangeText={setActivityName}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:20, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%", marginVertical:"1%" }}
				/>
				<TextInput
					value={activityTime.toLocaleTimeString({ hour: 'numeric', minute: 'numeric', hour12: true })}
					placeholder={t("common:ActivityTime")}
					onPressIn={()=>setOpen(true)}
					onChangeText={setActivityTime}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:20, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%", marginVertical:"1%" }}
				/>
				<DatePicker
					modal
					minuteInterval={15}
					minimumDate={new Date()}
					open={open}
					date={activityTime}
					onConfirm={(date) => {
					setOpen(false)
					setActivityTime(date)
					}}
					onCancel={() => {
					setOpen(false)
					}}
				/>
				<View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"2%"}}>
					<Ionicons name='location-sharp' size={22} color={"red"} />
					{/* <TextInput
						value={city}
						placeholder='Search and chose the city'
						onChangeText={setCity}
						placeholderTextColor={"#616163"}
						style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
					/> */}
					<GooglePlacesAutocomplete
						placeholder={t("common:actSearch")}
						onPress={(data, details = null) => {
						// 'details' is provided when fetchDetails = true
						if(data.terms.length == 3)
							setCity(data.terms[0].value+" "+data.terms[2].value)
						else if(data.terms.length == 2)
							setCity(data.terms[0].value+" "+data.terms[1].value)
						else
							setCity(data.terms[0].value)
						console.log(data);
						setLocation(details.geometry.location)
						console.log(details.geometry.location);
						}}
						query={{
						key: API_KEY,
						language: 'en',
						}}
						disableScroll={true}
						fetchDetails={true}
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
				<TouchableOpacity onPress={addactivity} style={[styles.mainButton, { paddingHorizontal:"3%", marginHorizontal:"8%", marginTop:"2%", paddingVertical:0 }]} >
					<Text style={styles.buttonText} >{t("common:AddActivity")}</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={activities}
				key={(item,index)=>index}
				ListFooterComponent={(
					<View style={{paddingVertical:"2%"}}></View>
				)}
				style={{height:verticalScale(150)}}
				renderItem={({item,index}) => (
					<View style={{borderRadius:10, flexDirection:"row", alignItems:"center", borderColor:"#DBDBDB", borderWidth:1, paddingHorizontal:"2%", paddingVertical:"4%", marginVertical:"1%"}} >
						<Image source={{uri:item.image}} resizeMode={"stretch"} style={{width:horizontalScale(80), height:verticalScale(80), borderRadius:10}} />
						<View style={{marginLeft:"5%"}} >
							<View style={{flexDirection:"row", alignItems:"center"}} >
								<Ionicons name='location-sharp' size={16} color={"red"} />
								<Text style={{fontWeight:"500", color:"#000", fontSize:14, marginBottom:"4%"}} >{item.city}</Text>
							</View>
							<Text style={{fontWeight:"500", color:"#000", fontSize:14, marginBottom:"4%"}}>{t("common:Activity")} {item.activityName}</Text>
							<Text style={{fontWeight:"500", color:"#000", fontSize:14, marginBottom:"4%"}}>{t("common:Time")} {item.activityTime.toLocaleTimeString()}</Text>
							<TouchableOpacity onPress={()=>openMaps(item.location)}  style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly", borderRadius:30, backgroundColor:"#F8F8F8", borderColor:"#DFDFDF", paddingHorizontal:"2%", paddingVertical:"2%", borderWidth:2 }} >
								<MaterialCommunityIcons name='directions-fork' size={15} color={"#1976D2"} />
								<Text style={{color:"#1976D2", fontSize:15 }} >{t("common:Directions")}</Text>
								<FontAwesome name='angle-double-right' size={15}  />
							</TouchableOpacity>
						</View>
						<Text style={{alignSelf:"flex-end", marginLeft:"10%"}} >{t("common:day")} 1</Text>
					</View>
				)}
			/>
			<TouchableOpacity style={styles.mainButton} onPress={addactivityToDB} >
				<Text style={styles.buttonText} >{t("common:AddSchedule")}</Text>
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

export default AddActivity

const styles = StyleSheet.create({
    viewWrapper: {
        paddingTop:"1%",
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