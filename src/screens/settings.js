import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { t } from 'i18next';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { DefaultTheme } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { horizontalScale, verticalScale } from '../helpers/Metrics';

const Settings = ({ navigation, route }) => {
	const { t, i18n } = useTranslation();
	const [lang, changeLang] = useState('en');
	const languages = [
		{ code: 'en', label: t('language:english') },
		{ code: 'ar', label: t('language:arabic') },
	];
	const selectedLanguageCode = i18n.language;

	// useLayoutEffect(() => {
	// 	navigation.setOptions({
	// 		headerShown: true,
	// 		headerTitle: t('navigate:settings'),
	// 	});
	// 	return () => {};
	// }, [navigation, lang]);
	const signOut = () => {
		auth()
			.signOut()
			.then(() => console.log('User signed out!'));
	  };

	return (
		<View>
			<View style={{flexDirection:"row", alignItems:"center",}}>
				<Text style={[styles.title,{ fontSize:20, marginLeft:"40%"}]} >Menu</Text>
				<TouchableOpacity  style={{ marginLeft:"30%", padding:"1%", }} onPress={()=>navigation.goBack()} >
					<Ionicons name='close' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
			</View>
			<View style={{marginTop:"10%"}}>
				<View style={{backgroundColor:"#3CDD8E", flexDirection:"row", alignItems:"center", marginHorizontal:"8%", padding:"5%", paddingBottom:"20%", borderRadius:20}}>
					<AntDesign name='swap' size={20} />
					<Text style={styles.title}>Language Mode</Text>
				</View>
				<View style={{zIndex:3, position:"absolute", top:"40%", left:"8%", padding:"10%", borderRadius:20,backgroundColor:"white", height:verticalScale(160), width:horizontalScale(315)}}>
					<Text style={[styles.title, {fontSize:16}]}>English</Text>
					<Text style={[styles.title, {fontSize:16}]}>Arabic</Text>
				</View>
			</View>
			{/* {languages.map((currentLang, i) => {
				const selectedLanguage = currentLang.code === selectedLanguageCode;
				return (
					<Text
						key={i}
						onPress={() => {
							changeLang(currentLang.code);
							i18n.changeLanguage(currentLang.code);
						}}
						style={{
							color: selectedLanguage ? "#96BCA9" : '#000000',
							padding: 10,
							fontSize: 18,
							fontWeight: selectedLanguage ? 'bold' : 'normal',
						}}>
						{currentLang.label}
					</Text>
				);
			})} */}
			<TouchableOpacity style={{flexDirection:"row", alignItems:"center", marginLeft:"10%", marginTop:"20%" ,marginBottom:"5%"}}>
				<MaterialIcons size={25} name='info-outline' />
				<Text style={{color:"#000", fontSize:20, marginLeft:"4%"}} >Guide Manual</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={signOut} style={{flexDirection:"row", alignItems:"center", marginLeft:"10%", marginBottom:"5%"}}>
				<SimpleLineIcons size={25} name='logout' />
				<Text style={{color:"#000", fontSize:20, marginLeft:"4%"}} >Log out</Text>
			</TouchableOpacity>
		</View>
	);
};
export default Settings;
const styles = StyleSheet.create({
	language: {
		paddingTop: 10,
		textAlign: 'center',
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
});