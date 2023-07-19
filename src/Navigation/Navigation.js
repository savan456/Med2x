import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import SplashScreen from "react-native-splash-screen";

import Drawerr from "./Drawerr.js";
import Bottomtab from "./Bottomtab.js";
import Login from "../Screens/Login.js";
import Signup from "../Screens/Signup.js";
import Home from "../Screens/Home.js";
import Reset from "../Screens/Resetpassword.js";
import Pass_success from "../Screens/Pass_success.js";
import Appoiment from "../Screens/Appoiment.js";
import Profile from "../Screens/Profile.js";
import Setting from "../Screens/Setting.js";
import Medication from "../Screens/Medication.js";


const Stack = createNativeStackNavigator();


export default function Navigation() {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Login" screenOptions={{
        headerShown: false
      }}>
        {<Stack.Screen name="Drawerr" component={Drawerr} />}
        {<Stack.Screen name="Login" component={Login} />}
        {<Stack.Screen name="Signup" component={Signup} />}
        {<Stack.Screen name="Resetpassword" component={Reset} />}
        {<Stack.Screen name="Pass_success" component={Pass_success} />}
        {<Stack.Screen name="Appoiment" component={Appoiment} />}
        {<Stack.Screen name="Profile" component={Profile} />}
        {<Stack.Screen name="Setting" component={Setting} />}
        {<Stack.Screen name="Medication" component={Medication} />}
        



      </Stack.Navigator>
    </NavigationContainer>
  )
}

