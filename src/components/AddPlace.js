import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator, ToastAndroid, Modal, StatusBar, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { API_KEY } from "@env"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { horizontalScale, moderateScale, verticalScale } from '../helpers/Metrics'
import RadioButton from './RadioBtn';
import { AvoidSoftInput  } from "react-native-avoid-softinput";
import { useFocusEffect } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const AddPlace = () => {
	// const [users,setUsers] = React.useState("")
  const [selected, setSelected] = React.useState(-1);
  const places = ['Hotels', 'Restaurants', 'Places']
  const [image, setImage] = React.useState()
	const [city, setCity] = React.useState("");
	const [place, setPlace] = React.useState("");
	const [googlePlace, setGooglePlace] = React.useState("");
  const [showModal, setModal] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [disabled, setDisabled] = React.useState(true)
	const {t} = useTranslation();
	
  // const onFocusEffect = React.useCallback(() => {
  //   // This should be run when screen gains focus - enable the module where it's needed
  //   AvoidSoftInput.setShouldMimicIOSBehavior(true);
  //   AvoidSoftInput.setEnabled(true);
  //   return () => {
  //     // This should be run when screen loses focus - disable the module where it's not needed, to make a cleanup
  //     AvoidSoftInput.setEnabled(false);
  //     AvoidSoftInput.setShouldMimicIOSBehavior(false);
  //   };
  // }, []);
  // useFocusEffect(onFocusEffect); // register callback to focus events

	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.1});
		if(result.assets){
			setImage(result.assets[0])
		}
	}

  
	const addPlaceToDB = async ()=>{
    setLoading(true)
    try {
      await firestore().collection("places").add({
        image:`data:image/${image.type};base64,${image.base64}`,
        city:city,
        type_of_place:places[selected],
        place:place,
        google_place:googlePlace,
        addedBy: auth().currentUser.uid
      })
      setModal(true)
      
    } catch (error) {
			ToastAndroid.showWithGravity("Place couldn't be added", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
    setLoading(false)
	}
  // React.useEffect(()=>{
	const resetFields = ()=>{
    setSelected(-1)
    setCity("")
    setGooglePlace("")
    setImage(null)
    setPlace("")
  }
  //   firestore()
  // .collection('users')
  // .get()
  // .then(querySnapshot => {
  //   console.log('Total users: ', querySnapshot.size);
	// 	setUsers(querySnapshot.data)
  // });
	// },[])

	// const addUser = ()=>{
	// 	firestore().collection('users')
  // .add({
	// 	uid: auth().currentUser.uid,
	// 	isAdmin: true
  // })
  // .then(() => {
  //   console.log('User added!');
  // });
	// }
  return (
    <View style={styles.viewWrapper}>
      <StatusBar barStyle={"dark-content"} backgroundColor={showModal ? "#0007":"#f2f2f2"}/>
      {/* <ScrollView> */}
      <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={50}>
      <Text style={styles.subtitle}>{t("common:AddPlacesSub")}</Text>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:"white" ,borderWidth:1, borderColor:"#ccc", borderRadius:50,marginVertical:"3%", paddingLeft:"6%", paddingVertical:"0.25%"}}>
        {/* <TextInput
            value={city}
            placeholder="In which city does the place exist?"
            placeholderTextColor={"#828F9C"}
            onChangeText={setCity}
            style={{backgroundColor:"white", fontSize:16}}
          /> */}
         <GooglePlacesAutocomplete
            placeholder={t("common:locate")}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              if(data.terms.length == 3)
                setCity(data.terms[0].value+" "+data.terms[2].value)
              else if(data.terms.length == 2)
                setCity(data.terms[0].value+" "+data.terms[1].value)
              else
                setCity(data.terms[0].value)
              console.log(data, details);
            }}
            disableScroll={true}
            query={{
              key: API_KEY,
              language: 'en',
            }}
            styles={{
              textInputContainer:{
                backgroundColor:"white",
              },
              textInput:{fontSize:16 }
            }}
            textInputProps={{
              leftIcon: { type: 'font-awesome', name: 'chevron-left' },
            }}
          />
        <Ionicons name='md-search-outline' size={20}  style={{paddingHorizontal:"6%"}} />
      </View>
      <Text style={[styles.title, {fontSize:20}]}>{t("common:ChooseCategory")}</Text>
      <View style={{marginHorizontal:"1%", marginBottom:"2%"}}>
        {
          places.map((item, index) => (
            <TouchableOpacity key={index} onPress={()=>setSelected(index)} style={{flexDirection:"row", alignItems:"center", marginHorizontal:"4%" }}>
              <RadioButton selected={selected == index} />
              <Text style={[styles.subtitle, {fontSize:16,marginBottom:"1%", paddingHorizontal:"5%", paddingVertical:"1%", color:"#000"}]} >{t(`common:${item}`)}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      <TouchableOpacity onPress={chooseImage} 
			style={{alignItems:"center",backgroundColor:"#E3E3E3", borderColor:"white", borderWidth:2, borderRadius:10, width:"35%", padding:image? 0:"4%", paddingVertical:image? 0:"6%", marginHorizontal:"6%", marginBottom:"2%"}}>
			{ image ? 
					<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"stretch"} style={{width:horizontalScale(120), height:verticalScale(100), borderRadius:10}} />:
					<>
						<MaterialCommunityIcons name='file-image' size={30} color={"#333"}/>
						<Text >{t("common:AddImage")} </Text>
					</>
			}
			</TouchableOpacity>
      <TextInput
        value={place}
        placeholder={t("common:namePlace")}
        onPressIn={()=>setDisabled(true)}
        onChangeText={setPlace}
        placeholderTextColor={"#616163"}
        style={{backgroundColor:"white", borderWidth:1, borderRadius:20, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
      />
      <View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"4%"}}>
				<Ionicons name='location-sharp' size={22} color={"red"} />
				{/* <TextInput
					value={googlePlace}
					placeholder='Search place and chose to add location'
					onChangeText={setGooglePlace}
					placeholderTextColor={"#616163"}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"8%",}}
				/> */}
        <GooglePlacesAutocomplete
            placeholder={t("common:locationPlace")}
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              // if(data.terms.length == 3)
              //   setGooglePlace(data.terms[0].value+" "+data.terms[2].value)
              // else if(data.terms.length == 2)
              //   setGooglePlace(data.terms[0].value+" "+data.terms[1].value)
              // else
              setGooglePlace(data.description)
              console.log(data, details);
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
			<TouchableOpacity onPress={addPlaceToDB} style={styles.mainButton}>
        {
          loading ?
          <ActivityIndicator size={"large"} />:
          <Text style={styles.buttonText}>{t("common:AddPlace")}</Text>
        }
			</TouchableOpacity>
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
      <Modal 
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setModal(!showModal);
          resetFields();
        }}
      >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModal(!showModal); resetFields();}}>
              <AntDesign name='checkcircle' size={moderateScale(70)} color={"#31B072"} style={{alignSelf:"center"}} />
              <Text style={{ marginTop:"15%", fontSize:15, fontWeight:"700",textAlign:"center"}}>{t("common:Welldone")}</Text>
              <Text style={{ textAlign:"center", fontSize:15, fontWeight:"700",}}>{t("common:PlaceAdded")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default AddPlace

const styles = StyleSheet.create({
	viewWrapper: {
		paddingTop:"3%",
		paddingHorizontal:"5%",
	},
  
  title: {
    fontWeight:"bold",
    fontSize: 16,
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    
  }
})