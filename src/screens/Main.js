import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, {useCallback, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import { LogoutButton } from '../components/LogoutButton';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Main = ({navigation}) => {
  const [tourId, setTourID] = useState("wpmbfohLBnez9gAMfWJS");
  const [user, setuser] = useState();
  const [search, setSearch] = useState('');
  const [selected,setSelected] = useState(0);
  const filters = [['All', require("../assets/menu_icon.png")], ['Current Country Based', require("../assets/game-controller.png")]]
  // const getTours = async()=> {
  //   const tours = await firestore().collection("tour").get()
  // }

  // useEffect(()=>{
  //   getTours();
  // },[])
  useEffect(()=>{
    setuser(auth().currentUser)
  },[])

  useEffect(()=>{
    const subscriber = firestore()
    .collection('tour')
    .doc(tourId)
    .onSnapshot(documentSnapshot => {
      console.log('User data: ', documentSnapshot.data().name);
    });

  // Stop listening for updates when no longer required
    return () => subscriber();
  },[tourId])
  
  return (
    <View style={styles.viewWrapper}>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-evenly"}}>
        <Ionicons name='md-menu' size={25} color={"black"}/>
        <View>
          <Text>Howday,  Amber!</Text>
          <View style={{flexDirection:"row", alignItems:"center",}}>
            <Ionicons name='location-sharp' size={16} color={"red"} />
            <Text>Current Location</Text>
          </View>
        </View>
        <Image source={require('../assets/User.png')} style={{width:30, height:30}} />
      </View>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", borderWidth:1, borderColor:"#ccc", borderRadius:50,marginVertical:"3%", paddingLeft:"6%", paddingVertical:"2%"}}>
        <TextInput
            placeholder="Start searching here..."
            placeholderTextColor={"#828F9C"}
            onChangeText={setSearch}
            // style={styles.input}
          />
        <Ionicons name='md-search-outline' size={20} color={"red"} style={{paddingHorizontal:"2%"}} />
      </View>
      <Text style={styles.title}>Discover Places</Text>
      <FlatList
          data={filters}
          horizontal
          keyExtractor={(item,index) => index}
          showsHorizontalScrollIndicator={false}
          style={{marginVertical:20, width:"90%", marginLeft:10, }}
          renderItem={({item,index})=>
            <TouchableOpacity style={{flexDirection:"row" ,backgroundColor:selected==index? "#72F8B6":"#FCFEFF", alignItems:"center", justifyContent:"space-between", borderRadius:40, marginHorizontal:5, paddingHorizontal:22, paddingVertical:8,...styles.shadow}}
              onPress={()=>setSelected(index)}
            >
              {item[1] ? 
              <Image source={item[1]} style={{ tintColor:"#333", width:20, height:20}} />:null
              }
              <Text style={styles.text}>{item[0]}</Text>
            </TouchableOpacity>
          }
          
        />
      <Text style={styles.subtitle}>Discover all the cities in current country or search above.</Text>
      {/* <Button title={"gawk"} onPress={()=>{axios.get("https://us-central1-tour-guide-app-2c866.cloudfunctions.net/sendMail?dest=saleharif109@gmail.com&code=1234").then(res => console.log(res.data))}}/>
      <Button title={"reset"} onPress={()=>{auth().sendPasswordResetEmail("saleharif109@gmail.com")}}/> */}
      <LogoutButton/>
    </View>
  )
}

export default Main

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
  input:{marginVertical:"3%", paddingLeft:"6%", paddingVertical:"5%"},

})