import { StyleSheet, Text, View, TouchableOpacity, Image, } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { horizontalScale, verticalScale } from '../helpers/Metrics'

const DetailPage = ({navigation, route}) => {
  const [city, setCity] = React.useState(route.params.city)

  return (
    <View style={styles.viewWrapper}>
      <View style={{flexDirection:"row", alignItems:"center"}}>
				<TouchableOpacity onPress={()=>navigation.goBack()} >
					<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
				<Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>Detail Page</Text>
			</View>
      <Image source={{uri:city.image}} style={{width:horizontalScale(310), height:verticalScale(180), borderRadius:20, borderWidth:2, borderColor:"#D8D8D8", marginLeft:"5%", marginVertical:"8%", marginBottom:"1%"}} />
      <View style={{marginLeft:"5%"}}>
        <View style={{flexDirection:"row", alignItems:"center"}}>
          <Ionicons name='location-sharp' size={16} color={"red"} />
          <Text style={styles.title}>{city.city}</Text>
        </View>
        <Text style={styles.subtitle}>{city.description}</Text>
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate("SuggestedPrograms", {city: city.city})} style={styles.mainButton}>
        <Text style={styles.buttonText} >Suggested Programs</Text>
        <AntDesign name='right' size={20} color={"#000"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.buttonText} >Community Programs</Text>
        <AntDesign name='right' size={20} color={"#000"} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mainButton}>
        <Text style={styles.buttonText} >Places To Visit</Text>
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