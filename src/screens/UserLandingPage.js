import { StyleSheet, Text, View, Button, Image, TextInput, FlatList, TouchableOpacity } from 'react-native'
import React, {useCallback, useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LogoutButton } from '../components/LogoutButton';
import { horizontalScale, verticalScale } from '../helpers/Metrics';
import { BlurView } from "@react-native-community/blur";

const UserLandingPage = ({navigation}) => {
  const [user, setuser] = useState();
  const [search, setSearch] = useState('');
  const [selected,setSelected] = useState(0);
  const filters = [['All', require("../assets/menu_icon2.png")], ['Current Country Based', require("../assets/game-controller1.png")]]
	const [results, setResults] = React.useState();

	const getSearchResults = async ()=>{
		// .where('city', '<', search +'z')
		const query = await firestore().collection("cities").where('city', '>=', search)
		.where('city', '<=', search+ '\uf8ff').get().then(querySnapshot => {
			let docs = []
			querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
				docs.push(documentSnapshot.data())
			});
			setResults(docs)
		});
	}

  
  const getCities = async ()=>{
    await firestore()
    .collection('cities')
    .limit(5)
    .get()
    .then(querySnapshot => {
      let docs = []
			querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
				docs.push(documentSnapshot.data())
			});
			setResults(docs)
    });
  }

	useEffect(()=>{
		if(search !== "")
			getSearchResults()
    else
      getCities()
	},[search])

  useEffect(()=>{
    setuser(auth().currentUser)
    getCities()
  },[])

  // useEffect(()=>{
  //   const subscriber = firestore()
  //   .collection('cities')
  //   .limit(10)
  //   .onSnapshot(querySnapshot => {
  //     let docs = []
	// 		querySnapshot.forEach(documentSnapshot => {
	// 			docs.push(documentSnapshot.data())
	// 		});
	// 		setResults(docs)
  //   });

  //   return () => subscriber();
  // }, [results])
  
  return (
    <View style={styles.viewWrapper}>
      <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", marginHorizontal:"2%", marginBottom:"4%"}}>
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
        <Image source={require('../assets/user_icon.png')} style={{width:50, height:50}} />
         }
      </View>
      <View style={{flexDirection:"row", alignItems:"center", backgroundColor:"white" ,borderWidth:1, borderColor:"#ccc", borderRadius:50,marginVertical:"3%", paddingLeft:"6%", paddingVertical:"2%"}}>
        <TextInput
            placeholder="Start searching here..."
            placeholderTextColor={"#828F9C"}
            onChangeText={setSearch}
            style={{backgroundColor:"white", fontSize:16, width:"80%"}}
          />
        <Ionicons name='md-search-outline' size={20} color={"red"} style={{paddingHorizontal:"6%"}} />
      </View>
      <Text style={styles.title}>Discover Places</Text>
      {/* <FlatList
          data={filters}
          horizontal
          keyExtractor={(item,index) => index}
          showsHorizontalScrollIndicator={false}
          style={{marginVertical:verticalScale(20), marginLeft:horizontalScale(10), }}
          renderItem={({item,index})=>
            <TouchableOpacity style={{flexDirection:"row" ,backgroundColor: selected==index? "#72F8B6":"#FCFEFF", alignItems:"center", justifyContent:"space-between", borderRadius:40, marginHorizontal:horizontalScale(5), height:verticalScale(50), paddingVertical:verticalScale(5), paddingHorizontal:horizontalScale(10),}}
              onPress={()=>setSelected(index)}
            >
              {item[1] ? 
              <Image source={item[1]} resizeMode={"contain"} style={{ tintColor:"#333", width:horizontalScale(25), height:verticalScale(25)}} />:null
              }
              <Text style={{paddingHorizontal:horizontalScale(5)}}>{item[0]}</Text>
            </TouchableOpacity>
          }
          
        /> */}
        <View style={{ flexDirection:"row",marginVertical:verticalScale(20), marginLeft:horizontalScale(10), }}>
          <TouchableOpacity style={{flexDirection:"row" ,backgroundColor: selected==0? "#72F8B6":"#FCFEFF", alignItems:"center", justifyContent:"space-between", borderRadius:40, marginHorizontal:horizontalScale(5), height:verticalScale(50), paddingVertical:verticalScale(5), paddingHorizontal:horizontalScale(10),}}
              onPress={()=>setSelected(0)}
            >
              {filters[0][1] ? 
              <Image source={filters[0][1]} resizeMode={"contain"} style={{ tintColor:"#333", width:horizontalScale(25), height:verticalScale(25)}} />:null
              }
              <Text style={{paddingHorizontal:horizontalScale(5)}}>{filters[0][0]}</Text>
            </TouchableOpacity>
          <TouchableOpacity style={{flexDirection:"row" ,backgroundColor: selected==1? "#72F8B6":"#FCFEFF", alignItems:"center", justifyContent:"space-between", borderRadius:40, marginHorizontal:horizontalScale(5), height:verticalScale(50), paddingVertical:verticalScale(5), paddingHorizontal:horizontalScale(10),}}
              onPress={()=>setSelected(1)}
            >
              {filters[1][1] ? 
              <Image source={filters[1][1]} resizeMode={"contain"} style={{ tintColor:"#333", width:horizontalScale(25), height:verticalScale(25)}} />:null
              }
              <Text style={{paddingHorizontal:horizontalScale(5)}}>{filters[1][0]}</Text>
            </TouchableOpacity>
        </View>
      <Text style={styles.subtitle}>Discover all the cities in current country or search above.</Text>
      {/* <Button title={"gawk"} onPress={()=>{axios.get("https://us-central1-tour-guide-app-2c866.cloudfunctions.net/sendMail?dest=saleharif109@gmail.com&code=1234").then(res => console.log(res.data))}}/> */}
      {/* <Button title={"reset"} onPress={ async ()=>{console.log(user)}}/> */}
      <FlatList
				data={results}
				key={(item,index)=>index}
				ListFooterComponent={(
					<View style={{paddingVertical:"50%"}}></View>
				)}
				renderItem={({item, index})=> (
					<TouchableOpacity onPress={()=>navigation.navigate("DetailPage", {city:item})}  style={{height:verticalScale(280), width:horizontalScale(320), marginLeft:"3%", marginBottom:"4%"}} >
						 <Image
								source={{ uri:item.image }}
								style={[styles.absolute]}
							/>
							{/* in terms of positioning and zIndex-ing everything before the BlurView will be blurred */}
							<BlurView
								style={[styles.absolute, {margin:"2%",}]}
								blurType="light"
								blurAmount={10}
							/>
							{/* <Text>I'm the non blurred text because I got rendered on top of the BlurView</Text> */}
						<Image source={{uri:item.image}} style={{width:horizontalScale(310), height:verticalScale(180), borderRadius:20, borderWidth:2, borderColor:"#D8D8D8", position:"absolute", top:5, left:5}} />
						{/* <Image source={{uri:item.image}} style={{width:horizontalScale(300), height:verticalScale(200)}} /> */}
						<View style={{flexDirection:"row", alignItems:"center", position:"absolute", bottom:45, left:15,}}>
							<Ionicons name='location-sharp' size={16} color={"red"} />
							<Text style={{...styles.title, color:"#fff"}} >{item.city}</Text>
						</View>
						<Text style={{...styles.subtitle,position:"absolute", bottom:15, left:10, color:"#fff"}} >{item.description.substring(0,100)}...</Text>
					</TouchableOpacity>
				)}
			/>
    </View>
  )
}

export default UserLandingPage

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

	absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
		borderRadius:20,
  }
})