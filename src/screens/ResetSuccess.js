import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTranslation } from 'react-i18next';


const ResetSuccess = ({navigation}) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name='credit-card-check-outline' size={30} color={"white"} style={{padding:"7%", borderRadius:50,backgroundColor:"#393333", alignSelf:"center"}} />
      <Text style={styles.title}>{t("common:PasswordReset")}</Text>
      <Text style={styles.subtitle}>{t("common:PasswordReset2")}
      </Text>
      <TouchableOpacity
            style={styles.mainButton}
            onPress={ async ()=>{ navigation.navigate("Login")}}
            // await auth().sendPasswordResetEmail(email);
          >
            <Text style={styles.buttonText}>{t("common:Backtologin")}</Text>
      </TouchableOpacity>
      
    </View>
  )
}

export default ResetSuccess

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:"center",
        // alignItems:"center"
    },
    title: {
      fontWeight:"bold",
      fontSize: 25,
      textAlign:"center",
      color:"#101018",
      marginVertical:"2%",
      marginTop:"5%",
      paddingHorizontal:"4%",
    },
    subtitle: {
      fontSize: 14,
      color: '#828F9C',
      paddingHorizontal:"4%",
      marginBottom:"3%",
      textAlign:"center"
    },
    mainButton: {
      borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"7%",
      marginTop:"15%", paddingVertical:"2%"
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