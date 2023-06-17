import React, {useCallback, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StyleSheet, Text, View, Alert, TextInput, Image,ToastAndroid, TouchableOpacity, Dimensions} from 'react-native';
import auth from '@react-native-firebase/auth';
import { Divider } from 'react-native-paper';
// import AntDesign from 'react-native-vector-icons/AntDesign'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTranslation } from 'react-i18next';

GoogleSignin.configure({
  webClientId: '707850947275-ihmk9vjmfjifnu5iekcorrqad4mhij7j.apps.googleusercontent.com',
});

export default function Login({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {width, height} = Dimensions.get("window")
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { t } = useTranslation()
  const signIn = useCallback(async () => {
          auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              console.log('That email address is invalid!');
            }

            console.error(error);
          });
  }, [email, password]);

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const onPressSignIn = useCallback(async () => {
    try {
      await signIn();
    } catch (error) {
      Alert.alert(`Failed to sign in: ${error?.message}`);
    }
  }, [signIn]);

  return (
    <SafeAreaProvider>
      <View style={styles.viewWrapper}>
        <Text style={styles.title}>{t("common:login")}</Text>
        <Text style={styles.subtitle}>
        {t("common:loginSub")}
        </Text>
        <TextInput
          placeholder={t("common:Email")}
          placeholderTextColor={"#828F9C"}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder={t("common:yourPassword")}
          placeholderTextColor={"#828F9C"}
          onChangeText={setPassword}
          secureTextEntry={passwordHidden}
          style={styles.input}
        />
        <TouchableOpacity onPress={()=>navigation.navigate("ForgotPassword")} style={{alignSelf:"flex-end", marginRight:"3%"}} >
          <Text >{t("common:ForgotPassword")}</Text>
        </TouchableOpacity>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={onPressSignIn}
          >
            <Text style={styles.buttonText}>{t("common:login")}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row", marginTop:"5%", justifyContent:"space-evenly", alignItems:"center"}}>
            <Divider style={styles.divider} />
            <Text>{t("common:Or")}</Text>
            <Divider style={styles.divider}/>
          </View>
          <TouchableOpacity
            style={[styles.mainButton,{borderWidth:1,borderColor:"#ccc", backgroundColor:undefined, flexDirection:"row", alignItems:"center",justifyContent:"space-evenly", paddingVertical:"3%", paddingHorizontal:"20%"}]}
            onPress={() => onGoogleButtonPress().then(() => ToastAndroid.showWithGravity('Signed in with Google!', ToastAndroid.SHORT, ToastAndroid.BOTTOM))}
          >
            <Image source={require("../assets/Google-Icon.png")} style={{width:width*0.05, height:width*0.05}}/>
            <Text style={styles.buttonText}>{t("common:LoginGoogle")}</Text>
          </TouchableOpacity>
          <View style={{flexDirection:"row", position:"absolute", top:height, left:width*0.25}}>
            <Text>{t("common:noAccount")} </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.secondaryButton}>{t("common:signup")}</Text>
            </TouchableOpacity>
          </View>
        
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  viewWrapper: {
    paddingTop:"30%",
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
  mainButton: {
    borderWidth:1, borderColor:"#3CDD8E", backgroundColor:"#72F8B6", borderRadius:30, marginHorizontal:"1%",
    marginTop:"6%", paddingVertical:"2%"
  },
  secondaryButton: {
    color:  '#000',
    fontWeight:"bold"
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
input:{borderWidth:1, borderColor:"#ccc", borderRadius:50, marginVertical:"3%", paddingLeft:"6%", paddingVertical:"5%"},
divider:{borderWidth:0.5, borderColor:"#EAEAEA", paddingHorizontal:"15%"}
});