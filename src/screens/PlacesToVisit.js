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

const PlacesToVisit = ({navigation, route}) => {
  const city = route.params.city
  const filters = ['Hotels', 'Restaurants',"Places"]
  const [selected,setSelected] = React.useState(0);
  const [places, setPlaces] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation()

  const getPlaces = ()=>{
    setLoading(true)
    firestore()
    .collection('places')
    .where("city","==", city.city)
    .where("type_of_place","==", filters[selected])
    .get().then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
      let docs = []
      querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
        docs.push(documentSnapshot.data())
        // console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
      });
      setPlaces(docs)
      setLoading(false)
    });
  }

  React.useEffect(()=>{
    getPlaces()
  },[selected])

  

  return (
    <View style={styles.viewWrapper} >
      <View style={{flexDirection:"row", alignItems:"center"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()} >
            <Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
        </TouchableOpacity>
        <Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>{t("common:PlacesTo")}</Text>
      </View>
      <Image source={{uri:city.image}} style={{width:horizontalScale(310), height:verticalScale(220), borderRadius:20, borderWidth:2, borderColor:"#D8D8D8", marginLeft:"5%", marginVertical:"4%", marginBottom:"1%"}} />
      <View style={{marginLeft:"5%"}}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Ionicons name='location-sharp' size={16} color={"red"} />
          <Text style={styles.title}>{city.city}</Text>
        </View>
      </View>
      <FlatList
          data={filters}
          horizontal
          keyExtractor={(item,index) => index}
          showsHorizontalScrollIndicator={false}
          style={{marginVertical:verticalScale(20), marginLeft:horizontalScale(10), }}
          renderItem={({item,index})=>
            <TouchableOpacity style={{flexDirection:"row" ,backgroundColor: selected==index? "#72F8B6":"#FCFEFF", alignItems:"center", justifyContent:"space-between", borderRadius:40, marginHorizontal:horizontalScale(5), height:verticalScale(50), paddingVertical:verticalScale(5), paddingHorizontal:horizontalScale(10),}}
              onPress={()=>setSelected(index)}
            >
              <Text style={{paddingHorizontal:horizontalScale(5), fontSize:15, color:"#000"}}>{t(`common:${item}`) }</Text>
            </TouchableOpacity>
          }
          
        />
      <FlatList
        data={places}
        horizontal
        keyExtractor={(item,index) => index}
        // showsHorizontalScrollIndicator={false}
        style={{marginVertical:verticalScale(20), marginLeft:horizontalScale(10), }}
        ListEmptyComponent={()=>
          <View style={{alignItems:"center", height:verticalScale(150)}}>
            {
              loading ? 
              <ActivityIndicator size={moderateScale(100)} color={"#72F8B6"} />
              :<Text style={{ fontWeight:"bold", fontSize: 20, color:"#101018",textAlign:"center",}} >No {filters[selected]} available for this city</Text>
            }
          </View>
        }
        renderItem={({item,index})=>
          <View style={{borderRadius:10, borderColor:"#DBDBDB", borderWidth:1, paddingHorizontal:"2%", paddingVertical:"4%", marginHorizontal:horizontalScale(10), marginVertical:"1%", width:horizontalScale(200), height:verticalScale(270)}} >
            <Image source={{uri:item.image}} resizeMode={"contain"} style={{width:horizontalScale(180), height:verticalScale(200), marginLeft:"3%", borderRadius:10}} />
            <Text style={{ fontWeight:"bold", fontSize: 20, color:"#101018",marginLeft:"10%"}} >{item.place}</Text>
            <View style={{marginLeft:"7%"}} >
              <View style={{flexDirection:"row", alignItems:"center"}} >
                <Ionicons name='location-sharp' size={16} color={"red"} />
                <Text style={{fontWeight:"500", color:"#1976D2", fontSize:14, marginBottom:"1%"}} >{item.google_place}</Text>
              </View>
            </View>
        </View>
        }
        
      />
    </View>
  )
}

export default PlacesToVisit

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