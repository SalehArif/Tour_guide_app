import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList,ToastAndroid } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { horizontalScale, verticalScale, moderateScale } from '../helpers/Metrics';
import { ActivityIndicator, Divider } from 'react-native-paper';
import { useTranslation } from 'react-i18next';


const Notifications = ({navigation}) => {
  const [notifs, setNotifs] = React.useState([
    {image:"https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=1060", title:"Reminder from Calender", subtitle:"1 day remaining in your Denver,Colorado tour."},
    {image:"https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=1060", title:"From Admin", subtitle:"Congrats! your Melbourne schedule has been approved."},
    {image:"https://img.freepik.com/premium-photo/image-colorful-galaxy-sky-generative-ai_791316-9864.jpg?w=1060", title:"Reminder from Calender", subtitle:"1 day remaining in your Kuala Lumper, Malaysia tour.",}])
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation()

  return (
    <View style={styles.viewWrapper} >
      <View style={{flexDirection:"row", alignItems:"center", marginBottom:"10%"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
        </TouchableOpacity>
        <Text style={[styles.title,{ marginLeft:"18%",fontSize:20}]}>{t("common:Notifications")}</Text>
      </View>
      <FlatList
          data={notifs}
          ListFooterComponent={(
            <View style={{paddingVertical:"10%"}}></View>
          )}
          ListEmptyComponent={()=>
            <View style={{alignItems:"center", justifyContent:"center", height:verticalScale(600)}}>
              {
                loading ? 
                <ActivityIndicator size={moderateScale(100)} color={"#72F8B6"} />
                :<Text style={[styles.title,{textAlign:"center",}]} >No Notifications</Text>
              }
            </View>
          }
          renderItem={({item,index})=>(
            <View style={{backgroundColor: index==0? "#84FDC1":"#E7E7E7", flexDirection:"row", alignItems:"center",paddingHorizontal:"2%", paddingLeft:"5%", marginTop:"2%",paddingVertical:"6%",borderRadius:10, }} >
              <Image source={{uri: item.image}} style={{alignSelf:"flex-start" ,width:horizontalScale(30), height:verticalScale(30), borderRadius:50}} />
              <View style={{ paddingHorizontal:"1%", width:horizontalScale(300) }} >
                  <Text style={[styles.title, {fontSize:18, marginTop:0}]}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
              </View>
            </View>
          )}
        />
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
  viewWrapper: {
    paddingTop:"5%",
    paddingHorizontal:"3%",
  },
  title: {
    fontWeight:"bold",
    fontSize: 25,
    color:"#101018",
    marginVertical:"2%",
    paddingHorizontal:"4%",
  },
  subtitle: {
    fontSize: 14,
    color: '#514E4E',
    paddingHorizontal:"4%",
    // marginBottom:"3%"
  },
  input:{marginVertical:"3%", paddingLeft:"6%", paddingVertical:"5%"},

})