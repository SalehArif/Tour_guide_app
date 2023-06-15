import React, {useCallback, useState, useEffect} from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StyleSheet, Text, View, Image, Dimensions, TextInput, FlatList, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AddCity from '../components/AddCity';
import AddPlace from '../components/AddPlace';
import { horizontalScale } from '../helpers/Metrics';
const Tab = createMaterialTopTabNavigator();
import auth from '@react-native-firebase/auth';

export default function TopTabs() {
  const [user, setuser] = useState();

  useEffect(()=>{
    setuser(auth().currentUser)
  },[])

  return (
    <>
    <View style={{ ...styles.viewWrapper, flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:"#f2f2f2", marginHorizontal:"2%"}}>
        <View style={{flexDirection:"row", alignItems:"center",}}>
          <Ionicons name='md-menu' size={28} color={"#2D302E"}/>
          <View style={{justifyContent:"center", marginHorizontal:"10%"}}>
            <Text style={[styles.title,{fontSize:20, paddingHorizontal:0}]}>Howday{user?.displayName ? `, ${user?.displayName?.split(" ")[0]}!`:""}</Text>
            <View style={{flexDirection:"row", alignItems:"center",}}>
              <Ionicons name='location-sharp' size={16} color={"red"} />
              <Text style={[styles.subtitle, {color:"red", paddingHorizontal:0, marginBottom:0}]}>Current Location</Text>
            </View>
          </View>
        </View>
        { user?.photoURL ? 
        <Image source={{uri:user.photoURL}} style={{width:50, height:50, borderRadius:50, borderColor:"#96BCA9", borderWidth:2}} /> :
        <Image source={require('../assets/User.png')} style={{width:50, height:50}} />
         }
      </View>
    <Tab.Navigator screenOptions={{tabBarStyle:{backgroundColor:"#f2f2f2"}, tabBarIndicatorStyle: {borderBottomColor: '#35C37E',borderBottomWidth: 2}}}>
        <Tab.Screen name="AddCity" component={AddCity} options={{tabBarLabel:"Add City", tabBarLabelStyle: styles.tabText}} />
        <Tab.Screen name="AddPlace" component={AddPlace} options={{tabBarLabel:"Add Place", tabBarLabelStyle: styles.tabText, tabBarActiveTintColor:"#000"}} />
    </Tab.Navigator>
    </>
  );
}

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
      paddingHorizontal:"4%",
    },
    subtitle: {
      fontSize: 14,
      color: '#828F9C',
      paddingHorizontal:"4%",
      marginBottom:"3%"
    },
    tabText:{fontWeight:"700",color:"#000", fontSize:16, textTransform:"capitalize"}
})