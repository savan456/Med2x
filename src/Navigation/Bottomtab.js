import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";

import Home from "../Screens/Home.js";
import Medication from '../Screens/Medication';
import Profile from '../Screens/Profile';
import Setting from '../Screens/Setting';


const Tab = createBottomTabNavigator();

export default function Bottomtab() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "#4E95FF",
                    height: hp('7.5'),
                    borderTopLeftRadius: 40,
                    borderTopRightRadius: 40,
                    position: "absolute",
                    alignSelf: "center"
                },
                headerShown: false
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: () => <Text style={styles.Home}>Home</Text>,
                    tabBarIcon: () => <Image style={styles.image} source={require('../Assets/Images/Home.png')}></Image>
                }}
            />
            <Tab.Screen
                name="Medication"
                component={Medication}
                options={{
                    unmountOnBlur:true,
                    tabBarLabel: () => <Text style={styles.Home}>Medication</Text>,
                    tabBarIcon: () => <Image style={styles.image} source={require('../Assets/Images/Medication.png')}></Image>
                }}
            />
            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    unmountOnBlur:true,
                    tabBarLabel: () => <Text style={styles.Home}>Setting</Text>,
                    tabBarIcon: () => <Image style={styles.image} source={require('../Assets/Images/Setting.png')}></Image>
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: () => <Text style={styles.Home}>Profile</Text>,
                    tabBarIcon: () => <Image style={styles.image} source={require('../Assets/Images/Profile.png')}></Image>
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    Home: {
        color: "#FFFFFF",
        marginBottom: hp('1'),
        fontSize: 12,
        fontFamily: Fonts.Lato_Bold
    },
    image: {
        resizeMode: "contain",
        height: hp('2.5'),
        marginTop: hp('1')
    }
})