import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ToastAndroid, ScrollView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTranslation } from 'react-i18next';

const GuideManual = ({navigation}) => {
  const { t } = useTranslation()

  return (
    <View style={styles.viewWrapper} >
      <View style={{flexDirection:"row", alignItems:"center"}}>
				<TouchableOpacity onPress={()=>navigation.goBack()} >
					<Ionicons name='chevron-back' size={24} style={{borderRadius:50, borderWidth:1, borderColor:"#E2E2E2", backgroundColor:"white", marginLeft:"2%", padding:"1%", alignSelf:"flex-start"}} />
				</TouchableOpacity>
				<Text style={[styles.title,{ marginLeft:"20%",fontSize:20}]}>{t("common:GuideManual")}</Text>
			</View>
      <ScrollView>
      <View style={{marginTop:"10%", marginHorizontal:"5%"}} >
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]} >Tour Guide App User Manual</Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>Welcome to the Tour Guide App! This concise guide will help you make the most out of your experience as a user. Follow these steps to get started and navigate through the app:</Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        1. Installation and Registration:
          - Download the Tour Guide App from your device's app store.
          - Open the app and follow the on-screen instructions to complete the registration process.
          - Provide the necessary information, such as your name, email address, and preferred language.
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        2. Home Screen:
          - Upon successful registration, you will be taken to the home screen.
          - The home screen serves as the main hub for accessing various features of the app.
          - Here, you will find options like "Explore," "Favorites," "Tours," and "Settings."
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        3. Explore:
          - Tap on the "Explore" option to discover different destinations and attractions.
          - Browse through the available locations or use the search feature to find a specific place.
          - Each location will provide details like description, photos, reviews, and ratings.
          - Tap on a location to view more information or add it to your favorites.
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        4. Favorites:
          - In the "Favorites" section, you can find all the locations you have marked as favorites.
          - Access your favorite places quickly and easily for future reference or planning.
          - To add a location to your favorites, simply tap the heart icon on the location's page.
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        5. Tours:
          - The "Tours" section offers pre-planned tours and itineraries for popular destinations.
          - Browse through the available tours and select the one that interests you.
          - Each tour provides a detailed itinerary, including attractions, timings, and directions.
          - You can add a tour to your favorites or follow the suggested route using GPS navigation.
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        6. Settings:
          - Access the "Settings" option to personalize your Tour Guide App experience.
          - Customize preferences like language, notifications, and app theme.
          - You may also find options to manage your account settings or upgrade to a premium version.
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify"}]}>
        7. Additional Features:
          - Depending on the app's functionality, you may have additional features like:
            - Augmented reality (AR) mode: Use your device's camera to overlay information on real-world views.
            - Audio guides: Listen to informative audio commentary while exploring a location.
            - Offline mode: Download maps and content for offline access in areas with limited internet connectivity.
        </Text>
        <Text style={[styles.subtitle,{color:"#000", fontSize:16, textAlign:"justify", marginBottom:"15%"}]}>
        8. Help and Support:
          - If you encounter any issues or have questions, the "Help" or "Support" section should provide assistance.
          - Contact the app's support team through the provided channels (email, chat, or phone) for further assistance.

        Remember to explore, discover, and enjoy your journey using the Tour Guide App!</Text>
      </View>
      </ScrollView>

    </View>
  )
}

export default GuideManual

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
      
})