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
import { Switch } from 'react-native-switch';

const Settings = ({ navigation, route }) => {
	const { t, i18n } = useTranslation();
	const [lang, changeLang] = useState('en');
	const languages = [
		{ code: 'en', label: t('language:english') },
		{ code: 'ar', label: t('language:arabic') },
	];
	const selectedLanguageCode = i18n.language;
	const [isEnabled, setIsEnabled] = useState(selectedLanguageCode === 'en');
	const toggleSwitch = (currentLang) => {
      changeLang(currentLang.code);
      i18n.changeLanguage(currentLang.code);
      setIsEnabled(previousState => !previousState);
  };
	
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
				<Text style={[styles.title,{ fontSize:20, marginLeft:"30%"}]} >{t("common:Menu")}</Text>
				<TouchableOpacity  style={{ marginLeft:"30%", padding:"1%", }} onPress={()=>navigation.goBack()} >
					<Ionicons name='close' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
			</View>
			<View style={{marginTop:"10%"}}>
				<View style={{backgroundColor:"#3CDD8E", flexDirection:"row", alignItems:"center", marginHorizontal:"8%", padding:"5%", paddingBottom:"20%", borderRadius:20}}>
					<AntDesign name='swap' size={20} />
					<Text style={styles.title}>{t("common:LanguageMode")}</Text>
				</View>
				<View style={{zIndex:3, position:"absolute", top:"40%", left:"8%", padding:"10%", borderRadius:20,backgroundColor:"#F0F0F0", height:verticalScale(160), width:horizontalScale(315)}}>
					<View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around", marginBottom:"8%"}} >
						<Text style={[styles.title, {fontSize:16}]}>{t("common:English")}</Text>
						<Switch
							onValueChange={()=> toggleSwitch(languages[0])}
							value={isEnabled}
							activeText={''}
							inActiveText={''}
              circleBorderWidth={0}
              backgroundActive={'white'}
              backgroundInactive={'white'}
              circleActiveColor={'#1BE381'}
              circleInActiveColor={'gray'}
							circleSize={25}
							barHeight={26}
							switchWidthMultiplier={2.05} //2.25
						/>
					</View>
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-around", }}>
            <Text style={[styles.title, {fontSize:16}]}>{t("common:Arabic")}</Text>
            <Switch
              onValueChange={()=> toggleSwitch(languages[1])}
              value={!isEnabled}
              activeText={''}
              inActiveText={''}
              circleBorderWidth={0}
              backgroundActive={'white'}
              backgroundInactive={'white'}
              circleActiveColor={'#1BE381'}
              circleInActiveColor={'gray'}
              circleSize={25}
              barHeight={26}
              switchWidthMultiplier={2.05} //2.25
          />
          </View>
				</View>
			</View>
			<TouchableOpacity onPress={()=> navigation.navigate("GuideManual")}  style={{flexDirection:"row", alignItems:"center", marginLeft:"15%", marginTop:"30%" ,marginBottom:"5%"}}>
				<MaterialIcons size={25} name='info-outline' />
				<Text style={{color:"#000", fontSize:20, marginLeft:"4%"}} >{t("common:GuideManual")}</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={signOut} style={{flexDirection:"row", alignItems:"center", marginLeft:"15%", marginBottom:"5%"}}>
				<SimpleLineIcons size={25} name='logout' />
				<Text style={{color:"#000", fontSize:20, marginLeft:"4%"}} >{t("common:Logout")}</Text>
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