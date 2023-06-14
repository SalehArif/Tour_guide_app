import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, {useCallback, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LogoutButton } from '../components/LogoutButton';
import { horizontalScale, verticalScale } from '../helpers/Metrics';

const Main = ({navigation}) => {
  const [tourId, setTourID] = useState("wpmbfohLBnez9gAMfWJS");
  const [user, setuser] = useState();
  const [search, setSearch] = useState('');
  const [selected,setSelected] = useState(0);
  const filters = [['All', require("../assets/menu_icon2.png")], ['Current Country Based', require("../assets/game-controller1.png")]]
  // const getTours = async()=> {
  //   const tours = await firestore().collection("tour").get()
  // }

  // useEffect(()=>{
  //   getTours();
  // },[])
  useEffect(()=>{
    setuser(auth().currentUser)
  },[])

  // useEffect(()=>{
  //   const subscriber = firestore()
  //   .collection('tour')
  //   .doc(tourId)
  //   .onSnapshot(documentSnapshot => {
  //     console.log('User data: ', documentSnapshot.data().name);
  //   });

  // // Stop listening for updates when no longer required
  //   return () => subscriber();
  // },[tourId])
  
  return (
    <View style={styles.viewWrapper}>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginHorizontal:"2%", marginBottom:"4%"}}>
        <View style={{flexDirection:"row", alignItems:"center",}}>
          <Ionicons name='md-menu' size={28} color={"#2D302E"}/>
          <View style={{justifyContent:"center", marginHorizontal:"10%"}}>
            <Text style={[styles.title,{fontSize:20, paddingHorizontal:0}]}>Howday{`, ${user?.displayName.split(" ")[0]}!`}</Text>
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
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", backgroundColor:"white" ,borderWidth:1, borderColor:"#ccc", borderRadius:50,marginVertical:"3%", paddingLeft:"6%", paddingVertical:"2%"}}>
        <TextInput
            placeholder="Start searching here..."
            placeholderTextColor={"#828F9C"}
            onChangeText={setSearch}
            style={{backgroundColor:"white", fontSize:16}}
          />
        <Ionicons name='md-search-outline' size={20} color={"red"} style={{paddingHorizontal:"6%"}} />
      </View>
      <Text style={styles.title}>Discover Places</Text>
      <FlatList
          data={filters}
          horizontal
          keyExtractor={(item,index) => index}
          showsHorizontalScrollIndicator={false}
          style={{marginVertical:20, width:"90%", marginLeft:10, }}
          renderItem={({item,index})=>
            <TouchableOpacity style={{flexDirection:"row" ,backgroundColor: selected==index? "#72F8B6":"#FCFEFF", alignItems:"center", justifyContent:"space-between", borderRadius:40, marginHorizontal:horizontalScale(5), paddingHorizontal:horizontalScale(10), paddingVertical:verticalScale(8)}}
              onPress={()=>setSelected(index)}
            >
              {item[1] ? 
              <Image source={item[1]} resizeMode={"contain"} style={{ tintColor:"#333", width:20, height:20}} />:null
              }
              <Text style={{paddingHorizontal:horizontalScale(5)}}>{item[0]}</Text>
            </TouchableOpacity>
          }
          
        />
      <Text style={styles.subtitle}>Discover all the cities in current country or search above.</Text>
      {/* <Button title={"gawk"} onPress={()=>{axios.get("https://us-central1-tour-guide-app-2c866.cloudfunctions.net/sendMail?dest=saleharif109@gmail.com&code=1234").then(res => console.log(res.data))}}/> */}
      {/* <Button title={"reset"} onPress={ async ()=>{console.log(user)}}/> */}
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