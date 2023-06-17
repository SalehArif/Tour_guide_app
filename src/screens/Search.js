import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, FlatList } from 'react-native'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { horizontalScale, verticalScale, moderateScale } from '../helpers/Metrics';
import { BlurView } from "@react-native-community/blur";
import { Divider, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
const Search = ({navigation}) => {
  const [search, setSearch] = React.useState('');
	const [results, setResults] = React.useState();
  const [loading, setLoading] = React.useState(false)
  const { t } = useTranslation()
	const getSearchResults = async ()=>{
		// .where('city', '<', search +'z')
    setLoading(true)
		const query = await firestore().collection("cities").where('city', '>=', search)
		.where('city', '<=', search+ '\uf8ff').get().then(querySnapshot => {
      // console.log('Total users: ', querySnapshot.size);
			let docs = []
			querySnapshot.forEach(documentSnapshot => {
        documentSnapshot.data().id = documentSnapshot.id
				docs.push(documentSnapshot.data())
				// console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
			});
			setResults(docs)
      setLoading(false)
		});
		// setResults(query)
		// console.log(query)
	}
  const getCities = async ()=>{
		setLoading(true)
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
      setLoading(false)
    });
  }

	useEffect(()=>{
		if(search !== "")
			getSearchResults()
    else
      getCities()
	},[search])

  useEffect(()=>{
    getCities()
  },[])


  return (
    <View style={styles.viewWrapper}>
			<View style={{flexDirection:"row", alignItems:"center"}}>
				<TouchableOpacity onPress={()=>navigation.goBack()} >
					<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
				<Text style={[styles.title,{ marginLeft:"25%",fontSize:20}]} >{t("common:Search")}</Text>
			</View>
			<View style={{flexDirection:"row", alignItems:"center", backgroundColor:"white" ,borderWidth:1, borderColor:"#ccc", borderRadius:50,marginVertical:"3%", paddingLeft:"6%", paddingVertical:"2%"}}>
        <TextInput
            placeholder={t("common:StartSearching")}
            placeholderTextColor={"#828F9C"}
            onChangeText={setSearch}
            style={{backgroundColor:"white", fontSize:16, width:"80%"}}
          />
        <Ionicons name='md-search-outline' size={20} color={"#000"} style={{paddingHorizontal:"6%"}} />
      </View>
      <Text style={styles.title}>{t("common:DiscoverPlaces")}</Text>
			<FlatList
				data={results}
				key={(item,index)=>index}
				ListFooterComponent={(
					<View style={{paddingVertical:"30%"}}></View>
				)}
        ListEmptyComponent={()=>
          <View style={{alignItems:"center", justifyContent:"center", height:verticalScale(300)}}>
            {
              loading ? 
              <ActivityIndicator size={moderateScale(100)} color={"#72F8B6"} />
              :<Text style={[styles.title,{textAlign:"center",}]} >No places available for this country</Text>
            }
          </View>
        }
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

export default Search

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
    paddingHorizontal:"4%",
    marginBottom:"3%"
  },
	absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
		borderRadius:20,
  }
})