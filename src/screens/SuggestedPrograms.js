import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ScrollView, ToastAndroid } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { horizontalScale, verticalScale, moderateScale } from '../helpers/Metrics';
import { Divider, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const SuggestedPrograms = ({navigation, route}) => {
  const [schedules, setSchedules] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation()

  const getSchedules = ()=>{
    setLoading(true)
    firestore()
    .collection("schedules")
    .where("city","==", route.params.city)
    .where("type","==", "Suggested Schedule")
    .get().then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
      let docs = []
      querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
        docs.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setSchedules(docs)
      setLoading(false)
    });
  }

  React.useEffect(()=>{
    getSchedules()
  },[])

  return (
    <View style={styles.viewWrapper} >
			<View style={{flexDirection:"row", alignItems:"center"}}>
					<TouchableOpacity onPress={()=>navigation.goBack()} >
							<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
					</TouchableOpacity>
					<Text style={[styles.title,{ marginLeft:"10%",fontSize:20}]}>{t("common:SuggestedPrograms")}</Text>
			</View>
			<FlatList
        data={schedules}
        ItemSeparatorComponent={()=> <Divider/>}
        ListFooterComponent={(
          <View style={{paddingVertical:"10%"}}></View>
        )}
        ListEmptyComponent={()=>
          <View style={{alignItems:"center", justifyContent:"center", height:verticalScale(600)}}>
            {
              loading ? 
              <ActivityIndicator size={moderateScale(100)} color={"#72F8B6"} />
              :<Text style={[styles.title,{textAlign:"center",}]} >No schedules available for this city</Text>
            }
          </View>
        }
        renderItem={({item,index})=>(
          <View>
            <View style={{backgroundColor:"#E7E7E7", marginTop:"4%", borderRadius:20}} >
                <Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>{item.days} {t("common:DayProgram")}</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center", marginTop:"5%"}} >
                <Image source={{uri: item.image}} style={{width:horizontalScale(180), height:verticalScale(150), borderWidth:2, borderColor:"#FFFFFF", borderRadius:20}} />
              <TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"2%", marginHorizontal:"2%", paddingHorizontal:"4%", paddingVertical:"2%", borderRadius:20, alignSelf:"flex-start"}} >
                <Text onPress={()=> navigation.navigate("ViewSchedule", {schedule:item, isAdmin:true})} style={[styles.title, {fontSize:18, textAlign:"center", }]}>{t("common:ViewSchedule")}</Text>
              </TouchableOpacity>
            </View>
              <Text style={{marginLeft:"2%", marginVertical:"2%"}} >
                <Text style={styles.title}>{t("common:PlaceDescription")} </Text>
                <Text style={styles.subtitle}>{item.description}</Text>
              </Text>
          </View>
        )}
      />
    </View>
  )
}

export default SuggestedPrograms


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