import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { View, Image, StyleSheet, ImageBackground } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging'

import Drawerr from "./Drawerr.js";
import Login from "../Screens/Login.js";
import Signup from "../Screens/Signup.js";
import Reset from "../Screens/Resetpassword.js";
import Pass_success from "../Screens/Pass_success.js";
import Appoiment from "../Screens/Appoiment.js";
import Profile from "../Screens/Profile.js";
import Setting from "../Screens/Setting.js";
import Home from "../Screens/Home.js";
import Message from "../Screens/Message.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import messaging from '@react-native-firebase/messaging';


const Stack = createNativeStackNavigator();


export default function Navigation() {

  useEffect(() => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
    
    })
    messaging().onMessage((message) => {
      //process data message
      
    });

    setTimeout(() => {
      setShow(false)
    }, 4000)
    checkToken();
    database_get();
  }, []);

  const [check, setcheck] = useState("")
  const [show, setShow] = useState(true)
// firebase connection
const firebase_Config = {
          apiKey: "AIzaSyAiuattur9_7Nfu0ybuMk3zGS9ZjdttYbE",
          projectId: "med2x-f01ce",
          storgeBucket: "med2x-f01ce.appspot.com",
          messagingSenderId: "476900873273",
          appId: "1:476900873273:android:8dca1063825ee89bc1e9e8",
          databaseUrl: "htpps://med2x-f01ce.firebaseio.com",

}

!firebase.apps.length? firebase.initializeApp(firebase_Config):firebase.app();

const database_get = async () => {
      // firestore data fetch
      const data = firebase.firestore.FieldValue.delete();
      const get = await firestore().collection('database').doc('OCqqjTJ9RjGOXbuP0SL0').get()
      
      // const add = firestore().collection('database').doc('OCqqjTJ9RjGOXbuP0SL0')
      // add.update({
      //   pass: data
      // })
      
  

}

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      
    }
  }

  const SplashScreen = () => {
    return (
      <View style={{ flex: 1, justifyContent: "space-evenly", alignItems: "center", }}>
        <View>
          <Image style={styles.im1} source={require('../Assets/Images/Group_67.png')} />

          <ImageBackground style={styles.im2} source={require('../Assets/Images/Group_64.png')} />
        </View>

        <Image style={styles.logo} source={require('../Assets/Images/logo.png')} />

        <View style={{ transform: [{ rotate: '180deg' }], }}>
          <Image style={styles.im1} source={require('../Assets/Images/Group_67.png')} />

          <ImageBackground style={styles.im2} source={require('../Assets/Images/Group_64.png')} />
        </View>


      </View>
    )
  }

  // const check_id = async () => {

  //   const value = await AsyncStorage.getItem('test')
  //   console.log(value)
  //   const value1= JSON.parse(value)
  //   console.log(value1 == true)

  //   if (value1 == true) {
  //     setcheck(value1)
  //     alert("if " + value1)
  //   } else {
  //     setcheck(false)
  //     alert("else " + check)
  //   }
  // }

  return (
    show == true ? <SplashScreen /> :
      <NavigationContainer>
        {console.log("check", check == true ? "Signup" : "Login")}
        <Stack.Navigator initialRouteName="Drawerr" screenOptions={{
          headerShown: false
        }}>
          {<Stack.Screen name="Drawerr" component={Drawerr} />}
          {<Stack.Screen name="Home" component={Home} />}
          {<Stack.Screen name="Login" component={Login} />}
          {<Stack.Screen name="Signup" component={Signup} />}
          {<Stack.Screen name="Resetpassword" component={Reset} />}
          {<Stack.Screen name="Pass_success" component={Pass_success} />}
          {<Stack.Screen name="Appoiment" component={Appoiment} />}
          {<Stack.Screen name="Profile" component={Profile} />}
          {<Stack.Screen name="Setting" component={Setting} />}
          {/* {<Stack.Screen name="Medication" component={Medication} />} */}
          {<Stack.Screen name="Message" component={Message} />}




        </Stack.Navigator>
      </NavigationContainer>
  )
}

const styles = StyleSheet.create({

  im1: {
    resizeMode: "cover",
    height: hp("15%"),
    width: wp('147%'),
    // marginTop: hp('-4.5%'),
    transform: [{ rotate: '180deg' }],
  },

  im2: {
    resizeMode: "cover",
    height: hp('15%'),
    width: wp("147%"),
    marginTop: hp('-13.5%')
  },

  logo: {
    marginVertical: hp("33%")
  }

})

