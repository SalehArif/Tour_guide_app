import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { horizontalScale, verticalScale } from '../helpers/Metrics'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { useTranslation } from 'react-i18next';

const DetailPage = ({navigation, route}) => {
  const [city, setCity] = React.useState(route.params.city)
  const [favorited, setFavorite] = React.useState(false)
  const { t } = useTranslation()

  const addFavorite = async ()=>{
    try {
      await firestore().collection('favorites').add({
        user: auth().currentUser.uid,
        favorite: city.id,
        type:"City"
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
  return (
    <View style={styles.viewWrapper}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
				<TouchableOpacity onPress={()=>navigation.goBack()} >
					<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
				<Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>{t("common:DetailPage")}</Text>
			</View>
      <View>
        <Image source={{uri:city.image}} style={{width:horizontalScale(310), height:verticalScale(220), borderRadius:20, borderWidth:2, borderColor:"#D8D8D8", marginLeft:"5%", marginVertical:"4%", marginBottom:"1%"}} />
        <AntDesign name='heart' size={18} onPress={()=>{favorited? removeFavorite():addFavorite() }} color={favorited ? "#F85454":"#fff"} style={{position:"absolute", top:verticalScale(30), right:horizontalScale(25), backgroundColor:"#0005", borderRadius:40, padding:"2%"}} />
      </View>
      <View style={{marginLeft:"5%"}}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Ionicons name='location-sharp' size={16} color={"red"} />
          <Text style={styles.title}>{city.city}</Text>
        </View>
        <Text style={styles.subtitle}>{city.description}</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("SuggestedPrograms", {city: city.city})} style={styles.mainButton}>
        <Text style={styles.buttonText} >{t("common:SuggestedPrograms")}</Text>
        <AntDesign name='right' size={20} color={"#000"} />
      </TouchableOpacity >
      <TouchableOpacity onPress={()=>navigation.navigate("CommunityProgram", {city: city.city})} style={styles.mainButton}>
        <Text style={styles.buttonText} >{t("common:CommunityPrograms")}</Text>
        <AntDesign name='right' size={20} color={"#000"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate("PlacesToVisit", {city: city})} style={styles.mainButton}>
        <Text style={styles.buttonText} >{t("common:PlacesTo")}</Text>
        <AntDesign name='right' size={20} color={"#000"} />
      </TouchableOpacity>
    </View>
  )
}

export default DetailPage

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