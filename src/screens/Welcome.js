import { StyleSheet, Text, StatusBar, View, TouchableOpacity, Image } from 'react-native'
import React, {useCallback, useState, useEffect} from 'react';
import { useTranslation } from 'react-i18next';

const Welcome = ({navigation}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} backgroundColor={"#ffffff00"} translucent/>
        <Image
            style={styles.stretch}
            source={require('../assets/welcome.png')}/>
        <Text style={styles.heading}>{t('common:welcome_heading')}</Text>
        <Text style={{textAlign:"center", fontSize:16, marginBottom:"10%"}}>{t('common:welcome_subheading')}</Text>
        <TouchableOpacity style={{borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"4%", paddingVertical:"2%"}} onPress={()=> navigation.navigate("Login")}>
          <Text style={[styles.heading,{fontSize:16}]}>{t('common:login')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:0.25,borderColor:"#999", borderRadius:30, marginVertical:"5%", marginHorizontal:"4%", paddingVertical:"2%"}} onPress={()=> navigation.navigate("Signup")}>
          <Text style={[styles.heading,{fontSize:16}]}>{t("common:signup")}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        paddingTop: "1.5%",
    },
    stretch: {
        width: "98%",
        height: "55%",
        marginHorizontal:"1%",
        resizeMode: 'stretch',
    },
    heading:{
        fontFamily: 'DM Sans',
        fontStyle: "normal",
        fontWeight: 700,
        fontSize: 25,
        lineHeight: 33,
        textAlign: "center",
        color: "#101018",
        marginVertical:"2%",
        marginHorizontal:"2%"

    }
})