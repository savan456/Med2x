import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, {useEffect} from "react";
import SplashScreen from "react-native-splash-screen";


import Login from "./src/Screens/Login.js";
import Signup from "./src/Screens/Signup.js";
import Home from "./src/Screens/Home.js";


const Stack = createNativeStackNavigator();


export default function App () {

  useEffect(() =>{
    SplashScreen.hide();
  },[]);

  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"  screenOptions={{
    headerShown: false
  }}>
        { <Stack.Screen  name="Login" component={Login} /> }
        { <Stack.Screen name="Signup" component={Signup} /> }
        { <Stack.Screen name="Home" component={Home} /> }
      </Stack.Navigator>
    </NavigationContainer>
  )
}
