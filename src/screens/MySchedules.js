import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ToastAndroid, Modal, StatusBar } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { horizontalScale, verticalScale, moderateScale } from '../helpers/Metrics';
import { Divider } from 'react-native-paper';

const MySchedules = ({navigation}) => {
  const [schedules, setSchedules] = React.useState([])
  const [favorited, setFavorite] = React.useState(false)
  const [showModal, setModal] = React.useState(false)
  const [id, setId] = React.useState(false)

  const getSchedules = ()=>{
    firestore()
    .collection("schedules")
    .where("addedBy","==", auth().currentUser.uid)
    .get().then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
      let docs = []
      querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
        docs.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setSchedules(docs)
    });
  }

  const deleteSchedule = async ()=>{
    try {
      await firestore()
      .collection('schedules')
      .doc(id)
      .delete()
      ToastAndroid.showWithGravity("Schedule removed", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    } catch (error) {
      console.log(error)
      ToastAndroid.showWithGravity("Schedule couldn't be updated", ToastAndroid.SHORT, ToastAndroid.BOTTOM)
    }
  }

  React.useEffect(()=>{
    getSchedules()
  },[])

  const addFavorite = async (id)=>{
    try {
      await firestore().collection('favorites').add({
        user: auth().currentUser.uid,
        favorite: id,
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

  return (
    <View style={styles.viewWrapper} >
      <StatusBar barStyle={"dark-content"} backgroundColor={showModal ? "#0007":"#f2f2f2"}/>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} >
                <Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
        </TouchableOpacity>
        <Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>My Schedules</Text>
      </View>
      <FlatList
        data={schedules}
        ItemSeparatorComponent={()=> <Divider/>}
        ListFooterComponent={(
          <View style={{paddingVertical:"10%"}}></View>
        )}
        renderItem={({item,index})=>(
          <View>
            <View style={{backgroundColor:"#E7E7E7", marginTop:"4%", borderRadius:20}} >
                <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>{item.days} Day Program</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center", marginTop:"5%"}} >
                <Image source={{uri: item.image}} style={{width:horizontalScale(180), height:verticalScale(150), borderWidth:2, borderColor:"#FFFFFF", borderRadius:20}} />
            <View style={{alignItems:"center"}} >
              {
                favorited ?
                <AntDesign name='heart' size={18} onPress={()=>{favorited? removeFavorite():addFavorite(item.id)}} color={"#F85454"} />:
                <AntDesign name='hearto' size={18} onPress={()=>{favorited? removeFavorite():addFavorite(item.id)}} color={"#000"} />
              }
              <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"8%", paddingHorizontal:"4%", paddingVertical:"2%", borderRadius:20}} >
                <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>View Schedule</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"4%", paddingHorizontal:"6%", paddingVertical:"10%", borderRadius:30}} >
                <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>Add to Calender</Text>
              </TouchableOpacity>
            </View>
            </View>
              <Text style={{marginLeft:"2%", marginVertical:"2%"}} >
                <Text style={styles.title}>Place Description: </Text>
                <Text style={styles.subtitle}>{item.description}</Text>
              </Text>
            <TouchableOpacity onPress={()=>{setModal(!showModal); setId(item.id) }} style={[styles.mainButton,{marginBottom:"4%"}]} >
              <Text style={styles.buttonText} >Delete Schedule</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
              <Text style={{ marginTop:"15%", fontSize:15, fontWeight:"700", color:"#000",textAlign:"center"}}>Are you sure you want to delete this schedule?</Text>
              {/* <Text style={{ textAlign:"center", fontSize:15, fontWeight:"700",}}>Place added Successfully!</Text> */}
            </View>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}} >
              <TouchableOpacity onPress={()=>setModal(!showModal)}  style={[styles.mainButton, {backgroundColor:"#EAEAEA",paddingVertical:"6%", paddingHorizontal:"15%"}]} >
                <Text style={[styles.buttonText, {color:"#000"}]} >No</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>{setModal(!showModal); ; deleteSchedule();}} style={[styles.mainButton, {paddingVertical:"6%", paddingHorizontal:"15%"}]} >
                <Text style={styles.buttonText} >Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default MySchedules


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
      backgroundColor:"#F94747", borderRadius:30, marginHorizontal:"1%",paddingHorizontal:"8%",
      marginTop:"2%", paddingVertical:"1%", flexDirection:"row", alignItems:"center", justifyContent:"center"
    },
    buttonText:{
      fontFamily: 'DM Sans',
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: 16,
      textAlign: "center",
      color: "#fff",
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
  }
  })