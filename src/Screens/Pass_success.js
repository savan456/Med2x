import React from "react";
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from "react-native-vector-icons/AntDesign";
import Fonts from "../Assets/Fonts/fonts";


const Pass = (navigation) => {

    const props = navigation.navigation

    return (
        <View style={styles.blue}>
            <TouchableOpacity onPress={() => props.navigate("Resetpassword")}>
                <AntDesign style={styles.arrow} name="arrowleft" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.white}>

                <ImageBackground style={{ height: hp('22%'), width: wp('29%'), alignSelf: "center" }} resizeMode="contain" source={require("../Assets/Images/dout.png")}>

                    <Image style={styles.lock} source={require('../Assets/Images/reset_lock.png')} />

                </ImageBackground>

                <Text style={styles.pass}>Your Password</Text>

                <Text style={styles.success}>Changed Successfully</Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    blue: {
        backgroundColor: "#4E95FF",
        height: hp('70%'),
        alignItems: "center",
        borderBottomLeftRadius: wp('20'),
        borderBottomRightRadius: wp('20')
    },

    arrow: {
        marginRight: wp('83%'),
        marginTop: hp('2%')
    },

    white: {
        backgroundColor: "white",
        width: wp('89%'),
        height: hp('65%'),
        marginTop: hp('8%'),
        borderRadius: 40,
        elevation: 5,
        alignItems: "center",
        justifyContent: "center"
    },

    lock: {
        resizeMode: "contain",
        alignSelf: "center",
        marginTop: hp('4%'),
        height: hp('17%'),
        width: wp('17%')
    },

    pass: {
        color: "#3A3A3A",
        fontSize: 18,
        fontFamily: Fonts.Lato_Semibold,
        alignSelf: "center",
        marginTop: hp('4%')
    },

    success: {
        color: "#3A3A3A",
        fontSize: 18,
        fontFamily: Fonts.Lato_Semibold,
        alignSelf: "center",
        marginTop: hp('1%')
    }


})

export default Pass;