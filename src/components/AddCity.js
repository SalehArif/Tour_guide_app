import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next'
import { horizontalScale, verticalScale } from '../helpers/Metrics'
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const AddCity = () => {
	const {t} = useTranslation();
	const [city, setCity] = React.useState("");
	const [description, setDescription] = React.useState("");
	const [image, setImage] = React.useState()
	
	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.5});
		if(result.assets){
			setImage(result.assets[0])
		}
	}

	const addCityToDB = async ()=>{
		await firestore().collection("tour").add({
			image:image.base64,
			imageType:image.type,
			city:city,
			description:description
		})
	}

  return (
    <View style={styles.viewWrapper}>
			<ScrollView>
      <Text style={styles.subtitle}>{t("common:add_city_subtitle")}</Text>
			<TouchableOpacity onPress={chooseImage} 
			style={{alignItems:"center" ,backgroundColor:"#F0F4F4", borderColor:"white", borderWidth:2, borderRadius:10, padding:image? 0:"20%"}}>
			{ image ? 
					<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"contain"} style={{width:horizontalScale(330), height:verticalScale(250), borderRadius:10}} />:
					<>
						<MaterialCommunityIcons name='file-image' size={30} color={"#333"}/>
						<Text >{t("common:pic_upload")}</Text>
					</>
			}
			</TouchableOpacity>
			<View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"4%"}}>
				<Ionicons name='location-sharp' size={22} color={"red"} />
				<TextInput
					value={city}
					placeholder='Search and chose the city'
					onChangeText={setCity}
					placeholderTextColor={"#616163"}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
				/>
			</View>
			<TextInput
				multiline
				value={description}
				onChangeText={setDescription}
				placeholder='Write place description here. . .'
				textAlignVertical="top"
				style={{backgroundColor:"#F0F4F4", marginHorizontal:"4%", marginVertical:"2%",borderColor:"white", borderWidth:2,paddingLeft:"4%", borderRadius:20, height:verticalScale(150)}}
			/>
			<TouchableOpacity style={styles.mainButton}>
				<Text style={styles.buttonText}>Add the City</Text>
			</TouchableOpacity>
			</ScrollView>
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