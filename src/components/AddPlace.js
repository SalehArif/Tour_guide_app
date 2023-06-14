import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {launchImageLibrary} from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next'
import { horizontalScale, verticalScale } from '../helpers/Metrics'

import { LogoutButton } from './LogoutButton';
import RadioButton from './RadioBtn';

const AddPlace = () => {
	// const [users,setUsers] = React.useState("")
	const [search,setSearch] = React.useState("")
  const [selected, setSelected] = React.useState(-1);
  const places = ['Hotels', 'Restaurants', 'Places']
  const [image, setImage] = React.useState()
	const [city, setCity] = React.useState("");

	const {t} = useTranslation();
	
	const chooseImage = async ()=>{
		const result = await launchImageLibrary({includeBase64:true, mediaType:"photo", quality:0.5});
		if(result.assets){
			setImage(result.assets[0])
		}
	}
  // React.useEffect(()=>{
		
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
      <Text style={styles.subtitle}>Add different places for the users to see and visit those places.</Text>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:"white" ,borderWidth:1, borderColor:"#ccc", borderRadius:50,marginVertical:"3%", paddingLeft:"6%", paddingVertical:"0.25%"}}>
        <TextInput
            placeholder="In which city does the place exist?"
            placeholderTextColor={"#828F9C"}
            onChangeText={setSearch}
            style={{backgroundColor:"white", fontSize:16}}
          />
        <Ionicons name='md-search-outline' size={20}  style={{paddingHorizontal:"6%"}} />
      </View>
      <Text style={styles.title}>Choose Category</Text>
      <View style={{marginHorizontal:"3%"}}>
        {
          places.map((item, index) => (
            <TouchableOpacity onPress={()=>setSelected(index)} style={{flexDirection:"row", alignItems:"center", }}>
              <RadioButton selected={selected == index} />
              <Text>{item}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
      <TouchableOpacity onPress={chooseImage} 
			style={{alignItems:"center",backgroundColor:"#F0F4F4", borderColor:"white", borderWidth:2, borderRadius:10, width:"30%", padding:image? 0:"2%"}}>
			{ image ? 
					<Image source={{uri:`data:image/${image.type};base64,${image.base64}`}} resizeMode={"contain"} style={{width:horizontalScale(100), height:verticalScale(75), borderRadius:10}} />:
					<>
						<MaterialCommunityIcons name='file-image' size={30} color={"#333"}/>
						<Text >Add Image</Text>
					</>
			}
			</TouchableOpacity>
      <TextInput
        value={city}
        placeholder='Write name of the place. . .'
        onChangeText={setCity}
        placeholderTextColor={"#616163"}
        style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
      />
      <View style={{flexDirection:"row", alignItems:"center", marginHorizontal:"5%", marginVertical:"4%"}}>
				<Ionicons name='location-sharp' size={22} color={"red"} />
				<TextInput
					value={city}
					placeholder='Search place and chose to add location'
					onChangeText={setCity}
					placeholderTextColor={"#616163"}
					style={{backgroundColor:"white", borderWidth:1, borderRadius:25, borderColor:"#DBDBDB", width:"95%", marginHorizontal:"2%" ,paddingLeft:"6%",}}
				/>
			</View>
			<TouchableOpacity style={styles.mainButton}>
				<Text style={styles.buttonText}>Add Place</Text>
			</TouchableOpacity>
			<LogoutButton/>
    </View>
  )
}

export default AddPlace

const styles = StyleSheet.create({
	viewWrapper: {
		paddingTop:"5%",
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