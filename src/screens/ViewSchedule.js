import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, Linking, ScrollView, ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { horizontalScale, verticalScale, moderateScale } from '../helpers/Metrics';
import { Divider, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const ViewSchedule = ({navigation, route }) => {
  const [activities, setActivities] = React.useState([]);
  const [schedule, setSchedule] = React.useState(route.params.schedule);
  const [loading, setLoading] = React.useState(false)
  const [favorited, setFavorite] = React.useState(false)
  const { t } = useTranslation()

  const addFavorite = async ()=>{
    try {
      await firestore().collection('favorites').add({
        user: auth().currentUser.uid,
        favorite: schedule.id,
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
      await firestore().collection('favorites').where('user', '==', auth().currentUser.uid).where('favorite', '==', schedule.id)
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

  const getActivities = ()=>{
    setLoading(true)
    firestore()
    .collection('activities')
    .where("schedule_id","==", schedule.id)
    .get().then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
      let docs = []
      querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
        docs.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setActivities(docs)
      setLoading(false)
    });
  }

  React.useEffect(()=>{
    getActivities()
  },[])

  return (
    <View style={styles.viewWrapper} >
      <View style={{flexDirection:"row", alignItems:"center"}}>
          <TouchableOpacity onPress={()=>navigation.goBack()} >
              <Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
          </TouchableOpacity>
          <Text style={[styles.title,{ marginLeft:"15%",fontSize:20}]}>{t("common:ViewSchedule")}</Text>
      </View>
      <View>
        <Image source={{uri:schedule.image}} style={{width:horizontalScale(310), height:verticalScale(220), borderRadius:20, borderWidth:2, borderColor:"#D8D8D8", marginLeft:"5%", marginVertical:"4%", marginBottom:"1%"}} />
        <AntDesign name='heart' size={18} onPress={()=>{favorited? removeFavorite():addFavorite() }} color={favorited ? "#F85454":"#fff"} style={{position:"absolute", top:verticalScale(30), right:horizontalScale(25), backgroundColor:"#0005", borderRadius:40, padding:"2%"}} />
      </View>
      <View style={{marginLeft:"5%"}}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Ionicons name='location-sharp' size={16} color={"red"} />
          <Text style={styles.title}>{schedule.city}</Text>
        </View>
        <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginBottom:"5%"}} >
          <Text style={{color:"#000"}} >{t("common:SuggestedSchedule")}</Text>
          <Text style={{color:"#000"}}>{schedule.days} {schedule.days>1? t("common:days"):t("common:day")}</Text>
        </View>
      </View>
      <FlatList
				data={activities}
				key={(item,index)=>index}
				ListFooterComponent={(
					<View style={{paddingVertical:"60%"}}></View>
				)}
        ListEmptyComponent={()=>
          <View style={{alignItems:"center", justifyContent:"center", height:verticalScale(150)}}>
            {
              loading ? 
              <ActivityIndicator size={moderateScale(100)} color={"#72F8B6"} />
              :<Text style={[styles.title,{textAlign:"center",}]} >No activities available for this schedule</Text>
            }
          </View>
        }
				renderItem={({item,index}) => (
					<View style={{borderRadius:10, flexDirection:"row", alignItems:"center", borderColor:"#DBDBDB", borderWidth:1, paddingHorizontal:"2%", paddingVertical:"4%", marginVertical:"1%"}} >
						<Image source={{uri:item.image}} resizeMode={"stretch"} style={{width:horizontalScale(80), height:verticalScale(80), borderRadius:10}} />
						<View style={{marginLeft:"5%"}} >
							<View style={{flexDirection:"row", alignItems:"center"}} >
								<Ionicons name='location-sharp' size={16} color={"red"} />
								<Text style={{fontWeight:"500", color:"#000", fontSize:14, marginBottom:"4%"}} >{item.city}</Text>
							</View>
							<Text style={{fontWeight:"500", color:"#000", fontSize:14, marginBottom:"4%"}}>{t("common:Activity")} {item.activityName}</Text>
							<Text style={{fontWeight:"500", color:"#000", fontSize:14, marginBottom:"4%"}}>{t("common:Time")} {item.activityTime}</Text>
							<TouchableOpacity onPress={()=>openMaps(item.location)}  style={{flexDirection:"row", justifyContent:"space-evenly", borderRadius:30, backgroundColor:"#F8F8F8", borderColor:"#DFDFDF", paddingHorizontal:"2%", paddingVertical:"2%", borderWidth:2 }} >
								<MaterialCommunityIcons name='directions-fork' size={15} color={"#1976D2"} />
								<Text style={{color:"#1976D2" }} >{t("common:Directions")}</Text>
								<FontAwesome name='angle-double-right' size={15}  />
							</TouchableOpacity>
						</View>
						<Text style={{alignSelf:"flex-end", marginLeft:"10%"}} >{t("common:day")} 1</Text>
					</View>
				)}
			/>
    </View>
  )
}

export default ViewSchedule

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