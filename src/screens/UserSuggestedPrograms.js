import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { horizontalScale, verticalScale } from '../helpers/Metrics';

const UserSuggestedPrograms = ({navigation}) => {

  const [favorited, setFavorite] = React.useState(false)

  const addFavorite = async ()=>{
    try {
      await firestore().collection('favorites').add({
        user: auth().currentUser.uid,
        favorite: city.id,
        type:"Suggested Schedule"
      })
      setFavorite(true)
      ToastAndroid.showWithGravity("Favorite added", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } catch (error) {
      console.log(error)
      ToastAndroid.showWithGravity("Favorite couldn't be updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }

  const removeFavorite = async ()=>{
    try {
      await firestore().collection('favorites').where('user', '==', auth().currentUser.uid).where('favorite', '==', city.id)
      .get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          doc.ref.delete();
        });
      });
      ToastAndroid.showWithGravity("Favorite removed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      setFavorite(false)
    } catch (error) {
      console.log(error)
      ToastAndroid.showWithGravity("Favorite couldn't be updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }
// favorited? removeFavorite():addFavorite() 
  return (
    <View style={styles.viewWrapper} >
			<View style={{flexDirection:"row", alignItems:"center"}}>
					<TouchableOpacity onPress={()=>navigation.goBack()} >
							<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
					</TouchableOpacity>
					<Text style={[styles.title,{ marginLeft:"15%",fontSize:20}]}>Suggested Programs</Text>
			</View>
			<ScrollView>
			<View style={{backgroundColor:"#E7E7E7", marginTop:"4%", borderRadius:20}} >
				<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>1 Day Program</Text>
			</View>
			<View style={{flexDirection:"row", alignItems:"center", marginTop:"5%"}} >
				<Image source={require("../assets/temp.png")} style={{width:horizontalScale(180), height:verticalScale(150), borderWidth:2, borderColor:"#FFFFFF", borderRadius:20}} />
        <View style={{alignItems:"center"}} >
          {
            favorited ? 
            <AntDesign name='heart' size={18} onPress={()=>{setFavorite(!favorited)}} color={"#F85454"} />:
            <AntDesign name='hearto' size={18} onPress={()=>{setFavorite(!favorited)}} color={"#000"} />
          }
          <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"8%", paddingHorizontal:"4%", paddingVertical:"2%", borderRadius:20}} >
            <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>View Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"4%", paddingHorizontal:"6%", paddingVertical:"10%", borderRadius:30}} >
            <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>Add to Calender</Text>
          </TouchableOpacity>
        </View>
			</View>
			<Text style={styles.title}>Place Description:</Text>
			<Text style={styles.subtitle}>an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.</Text>
			<View style={{backgroundColor:"#E7E7E7", marginTop:"4%", borderRadius:20}} >
				<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>3 Day Program</Text>
			</View>
			<View style={{flexDirection:"row", alignItems:"center", marginTop:"5%"}} >
				<Image source={require("../assets/temp.png")} style={{width:horizontalScale(180), height:verticalScale(150), borderWidth:2, borderColor:"#FFFFFF", borderRadius:20}} />
				<View style={{alignItems:"center"}} >
          {
            favorited ? 
            <AntDesign name='heart' size={18} onPress={()=>{setFavorite(!favorited)}} color={"#F85454"} />:
            <AntDesign name='hearto' size={18} onPress={()=>{setFavorite(!favorited)}} color={"#000"} />
          }
          <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"8%", paddingHorizontal:"4%", paddingVertical:"2%", borderRadius:20}} >
            <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>View Schedule</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"4%", paddingHorizontal:"6%", paddingVertical:"10%", borderRadius:30}} >
            <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>Add to Calender</Text>
          </TouchableOpacity>
        </View>
			</View>
			<Text style={styles.title}>Place Description:</Text>
			<Text style={styles.subtitle}>an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.</Text>
			</ScrollView>
    </View>
  )
}

export default UserSuggestedPrograms


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
      marginTop:"6%", paddingVertical:"2%", flexDirection:"row", alignItems:"center", justifyContent:"space-between"
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