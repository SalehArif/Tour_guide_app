import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, Linking, ScrollView, Modal, ToastAndroid } from 'react-native'
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
  const [showModal, setModal] = React.useState(false)
  const [Modalvisible, setModalvisible] = React.useState(false)

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

  const deleteSchedule = async ()=>{
    try {
      await firestore()
      .collection('schedules')
      .doc(schedule.id)
      .delete()
      ToastAndroid.showWithGravity("Schedule removed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
      navigation.goBack()
    } catch (error) {
      console.log(error)
      ToastAndroid.showWithGravity("Schedule couldn't be updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
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

  const approveSchedule = ()=>{
    try {
      firestore()
      .collection('schedules')
      .doc(schedule.id)
      .update({
        type: "Community Schedule",
      })
      .then(() => {
        console.log('User updated!');
      });
      navigation.goBack()
      ToastAndroid.showWithGravity("Schedule approved", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } catch (error) {
      ToastAndroid.showWithGravity("Schedule couldn't be updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
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
        {
          route.params?.isAdmin ?
          <MaterialCommunityIcons name='trash-can' size={18} onPress={()=>{setModal(true) }} color={favorited ? "#F85454":"#fff"} style={{position:"absolute", top:verticalScale(30), right:horizontalScale(25), backgroundColor:"#0005", borderRadius:40, padding:"2%"}} />:
          <AntDesign name='heart' size={18} onPress={()=>{favorited? removeFavorite():addFavorite() }} color={favorited ? "#F85454":"#fff"} style={{position:"absolute", top:verticalScale(30), right:horizontalScale(25), backgroundColor:"#0005", borderRadius:40, padding:"2%"}} />
        }
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
        style={{height:verticalScale(500)}}
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
      {
        route.params.unApproved ?
        <View style={styles.bottomView} >
          <TouchableOpacity style={[styles.mainButton1,{marginTop:"6%", paddingVertical:"4%",}]} >
            <Text style={styles.buttonText1}>{t("common:Reject")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mainButton} onPress={()=>setModalvisible(true)}>
            <Text style={styles.buttonText}>{t("common:Accept")}</Text>
          </TouchableOpacity>
        </View>
        :null
      }
      <Modal 
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setModal(!showModal);
          }}
        >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModal(!showModal);}}>
              <MaterialCommunityIcons name='trash-can' size={moderateScale(30)} color={"#fff"} style={{backgroundColor:"#F94747", padding:"9%", borderRadius:40,alignSelf:"center"}} />
              <Text style={{ marginTop:"15%", fontSize:15, fontWeight:"700", color:"#000",textAlign:"center"}}>{t("common:deleteSchedule")}</Text>
              {/* <Text style={{ textAlign:"center", fontSize:15, fontWeight:"700",}}>Place added Successfully!</Text> */}
            </View>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
              <TouchableOpacity onPress={()=>setModal(!showModal)}  style={[styles.mainButton1, {backgroundColor:"#EAEAEA",paddingVertical:"6%", paddingHorizontal:"15%"}]} >
                <Text style={[styles.buttonText1, {color:"#000"}]} >{t("common:No")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setModal(!showModal); ; deleteSchedule();}} style={[styles.mainButton1, {paddingVertical:"6%", paddingHorizontal:"15%"}]} >
                <Text style={styles.buttonText1} >{t("common:Yes")}</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
      <Modal 
          animationType="slide"
          transparent={true}
          visible={Modalvisible}
          onRequestClose={() => {
            setModalvisible(!Modalvisible);
          }}
        >
         <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setModalvisible(!Modalvisible);}}>
              <MaterialCommunityIcons name='paperclip' size={moderateScale(30)} color={"#fff"} style={{backgroundColor:"#31B072", padding:"9%", borderRadius:40,alignSelf:"center"}} />
              <Text style={{ marginTop:"15%", fontSize:15, fontWeight:"700", color:"#000",textAlign:"center"}}>{t("common:approveModal")}</Text>
              {/* <Text style={{ textAlign:"center", fontSize:15, fontWeight:"700",}}>Place added Successfully!</Text> */}
            </View>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
              <TouchableOpacity onPress={()=>setModalvisible(!Modalvisible)}  style={[styles.mainButton1, {backgroundColor:"#EAEAEA",paddingVertical:"6%", paddingHorizontal:"15%"}]} >
                <Text style={[styles.buttonText1, {color:"#000"}]} >{t("common:No")}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setModalvisible(!Modalvisible); approveSchedule();}} style={[styles.mainButton1, {backgroundColor:"#1CE181",paddingVertical:"6%", paddingHorizontal:"15%"}]} >
                <Text style={styles.buttonText1} >{t("common:Yes")}</Text>
              </TouchableOpacity>
              
            </View>
          </View>
        </View>
      </Modal>
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
},
mainButton1: {
  backgroundColor:"#F94747", borderRadius:30, marginHorizontal:"1%",paddingHorizontal:"8%",
  marginTop:"2%", paddingVertical:"1%", flexDirection:"row", alignItems:"center", justifyContent:"center"
},
buttonText1:{
  fontFamily: 'DM Sans',
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: 16,
  textAlign: "center",
  color: "#fff",
  marginVertical:"2%"
},
bottomView:{
  flexDirection:"row",
  alignItems:"center",
  justifyContent:"space-evenly",
  width:"110%",
  backgroundColor:"#fff",
  // marginHorizontal:"3%",
  paddingHorizontal:"4%",
  paddingVertical:"2%",
  position:"absolute",
  bottom:110
}
})