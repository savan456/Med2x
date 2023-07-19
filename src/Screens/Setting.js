import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Setting = (navigation) => {

    useEffect(() => {
        profile()
    })
    const [asy1, setasy] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")


    const profile = async () => {
        const asy = await AsyncStorage.getItem("uri")
        setasy(asy)
    }

    const props = navigation.navigation

    const setting = [
        {
            path: require('../Assets/Images/general.png'),
            name: "General",
            root: ""
        },

        {
            path: require('../Assets/Images/notification.png'),
            name: "Notification",
            root: ""
        },

        {
            path: require('../Assets/Images/Medical_Center.png'),
            name: "Medical Details",
            root: ""
        },

        {
            path: require('../Assets/Images/doctor_details.png'),
            name: "Doctor Details",
            root: ""

        },

        {
            path: require('../Assets/Images/payments.png'),
            name: "Payments",
            root: ""
        },

        {
            path: require('../Assets/Images/profilee.png'),
            name: "Profile",
            root: "Resetpassword"
        },

        {
            path: require('../Assets/Images/privacy.png'),
            name: "Privacy",
            root: ""
        },

        {
            path: require('../Assets/Images/logout.png'),
            name: "Logout",
            root: "Login"
        },
    ]
    const logout = (item, index) => {
        if (index == 5) {
            navigation.navigation.dispatch(CommonActions.reset({ routes: [{ name: item.root }] }))
        }


        if (index == 7) {
            logout1(item)
            navigation.navigation.dispatch(CommonActions.reset({ routes: [{ name: item.root }] }))
        }


    }
    const logout1 = async () => {

        const password = await AsyncStorage.getItem('pwd')
        const email = await AsyncStorage.getItem('email')

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password)

        axios.post('http://staging.webmynehost.com/hospital_demo/services/logout.php', formdata,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
            .then(function (response) {
                alert(response.data.ResponseMsg)
                console.log(response);
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (

        <View style={styles.blue}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigate("Medication")}>
                    <AntDesign style={{ marginLeft: wp('2') }} name="arrowleft" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.setting}>SETTINGS</Text>
            </View>

            <View style={styles.nameview}>
                <Image style={styles.doctor} source={{ uri: asy1 }} />
                <Text style={styles.erica}>Smith Johnson</Text>
            </View>

            <View style={styles.white}>

                <FlatList style={{ marginTop: hp('5'), marginLeft: wp('7'), }}

                    data={setting}
                    renderItem={({ item, index }) => (

                        <TouchableOpacity onPress={() => logout(item, index)} style={styles.touch}>

                            <View style={styles.image}>
                                <Image style={styles.imagelist} source={item.path} />
                            </View>

                            <Text style={styles.name}>{item.name}</Text>

                        </TouchableOpacity>

                    )}

                />

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    blue: {
        backgroundColor: "#4E95FF",
        height: hp('65%'),
        alignItems: "center",
        borderBottomLeftRadius: wp('20'),
        borderBottomRightRadius: wp('20')
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        width: wp('95%'),
        margin: 10
    },

    setting: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamily:
            Fonts.Lato_Semibold,
        marginLeft: wp('4')
    },

    nameview: {
        flexDirection: "row",
        alignItems: "center",
        width: wp('95%'),
        margin: 10,
        marginLeft: wp('15')
    },

    erica: {
        color: "white",
        fontSize: 14,
        fontFamily:
            Fonts.Lato_Heavy,
        marginTop: hp('1.5')
    },

    doctor: {
        resizeMode: "cover",
        marginRight: wp('3'),
        marginTop: hp('2'),
        height: hp('5'),
        width: wp('10'),
        borderRadius: 50
    },

    white: {
        backgroundColor: "white",
        width: wp('89%'),
        height: hp('71%'),
        marginTop: hp('1'),
        borderRadius: 40,
        elevation: 5,
    },

    imagelist: {
        resizeMode: "contain",
        height: hp('2.5%'),
        width: wp('5%'),
    },

    image: {
        backgroundColor: "#4E95FF",
        width: wp('10%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
    },

    touch: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: hp('3%')
    },

    name: {
        color: "#3A3A3A",
        fontSize: 14,
        fontFamily: Fonts.Lato_Heavy,
        marginLeft: wp('4')
    }

})

export default Setting;