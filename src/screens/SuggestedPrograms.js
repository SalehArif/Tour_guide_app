import React from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { horizontalScale, verticalScale } from '../helpers/Metrics';

const SuggestedPrograms = () => {
  return (
    <View style={styles.viewWrapper} >
			<View style={{flexDirection:"row", alignItems:"center"}}>
					<TouchableOpacity onPress={()=>navigation.goBack()} >
							<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
					</TouchableOpacity>
					<Text style={[styles.title,{ marginLeft:"10%",fontSize:20}]}>Suggested Programs</Text>
			</View>
			<ScrollView>
			<View style={{backgroundColor:"#E7E7E7", marginTop:"4%", borderRadius:20}} >
				<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>1 Day Program</Text>
			</View>
			<View style={{flexDirection:"row", alignItems:"center", marginTop:"5%"}} >
				<Image source={require("../assets/temp.png")} style={{width:horizontalScale(180), height:verticalScale(150), borderWidth:2, borderColor:"#FFFFFF", borderRadius:20}} />
				<TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"2%", marginLeft:"4%", paddingHorizontal:"4%", paddingVertical:"2%", alignSelf:"flex-start", borderRadius:20}} >
					<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>View Schedule</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.title}>Place Description:</Text>
			<Text style={styles.subtitle}>an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.</Text>
			<View style={{backgroundColor:"#E7E7E7", marginTop:"4%", borderRadius:20}} >
				<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>3 Day Program</Text>
			</View>
			<View style={{flexDirection:"row", alignItems:"center", marginTop:"5%"}} >
				<Image source={require("../assets/temp.png")} style={{width:horizontalScale(180), height:verticalScale(150), borderWidth:2, borderColor:"#FFFFFF", borderRadius:20}} />
				<TouchableOpacity style={{backgroundColor:"#E7E7E7", marginTop:"2%", marginLeft:"4%", paddingHorizontal:"4%", paddingVertical:"2%", alignSelf:"flex-start", borderRadius:20}} >
					<Text style={[styles.title, {fontSize:18, textAlign:"center"}]}>View Schedule</Text>
				</TouchableOpacity>
			</View>
			<Text style={styles.title}>Place Description:</Text>
			<Text style={styles.subtitle}>an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.</Text>
			</ScrollView>
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