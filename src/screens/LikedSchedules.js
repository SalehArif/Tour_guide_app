import React,{useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList,ToastAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { horizontalScale, verticalScale, moderateScale } from '../helpers/Metrics';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const LikedSchedules = ({navigation}) => {
  const [user, setuser] = useState();
	const [results, setResults] = React.useState();
  const [loading, setLoading] = React.useState(false)
	const [ids, setIds] = React.useState();
  const { t } = useTranslation()
  
  const getFavs = async ()=>{
		setLoading(true)
    let docs = []
    await firestore()
    .collection('favorites')
    .where('user', '==', auth().currentUser.uid)
    .get()
    .then(querySnapshot => {
			querySnapshot.forEach(documentSnapshot => {
        docs.push(documentSnapshot.data().favorite)
			});
      // console.log(docs.length)
			// setIds(docs)
    });
    await firestore().collection('schedules').where(firestore.FieldPath.documentId(), 'in', docs)
    .get()
    .then(querySnapshot => {
      let doc = []
      querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
        doc.push(documentSnapshot.data())
      });
      // console.log(docs)
      setResults(doc)
      setLoading(false)
    });
  }
  
  // const getFavs =async  ()=>{
    // firestore().collection('schedules').doc(documentSnapshot.data().favorite)
    // .get().then(doc =>
    //   {
    //     // docs.push(doc.data())
    //     // doc.data().id = doc.id
    //   })
  // }

  useEffect(()=>{
    getFavs()
    // getFavs()
  },[navigation])

  return (
    <View style={styles.viewWrapper}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
        </TouchableOpacity>
        <Text style={[styles.title,{ marginLeft:"18%",fontSize:20}]}>{t("common:LikedSchedules")}</Text>
      </View>
      <FlatList
				data={results}
				key={(item,index)=>index}
				ListFooterComponent={(
					<View style={{paddingVertical:"50%"}}></View>
				)}
        ListHeaderComponent={()=> <View style={{marginTop:"6%"}} ></View>}
        ListEmptyComponent={()=>
          <View style={{alignItems:"center", justifyContent:"center", height:verticalScale(400)}}>
            {
              loading ? 
              <ActivityIndicator size={moderateScale(100)} color={"#72F8B6"} />
              :<Text style={[styles.title,{textAlign:"center",}]} >No Liked Schedules</Text>
            }
          </View>
        }
        ItemSeparatorComponent={()=> <Divider bold style={{ marginVertical:"5%"}} />}
				renderItem={({item, index})=> (
					<TouchableOpacity onPress={()=>navigation.navigate("LikedScheduleDetails", {schedule:item})}  style={{height:verticalScale(280), width:horizontalScale(320),marginLeft:"5%"}} >
						<Image source={{uri:item.image}} style={{width:horizontalScale(310), height:verticalScale(200), borderRadius:20, borderWidth:2, borderColor:"#D8D8D8",}} />
						<View style={{flexDirection:"row", alignItems:"center",}}>
							<Ionicons name='location-sharp' size={16} color={"red"} />
							<Text style={styles.title} >{item.city}</Text>
						</View>
            <View style={{flexDirection:"row", borderRadius:20, alignItems:"center", justifyContent:"space-around", width:"60%", 
            paddingVertical:"2%",
                borderWidth:2, borderColor:"#E7E7E7" }} >
              <AntDesign name='heart' size={16} color={"#FF6359"} />
              <Text>{t("common:SuggestedSchedule")}</Text>
            </View>
						{/* <Text style={{...styles.subtitle,position:"absolute", bottom:15, left:10,}} >{item.description.substring(0,100)}...</Text> */}
					</TouchableOpacity>
				)}
			/>
    </View>
  )
}

export default LikedSchedules

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