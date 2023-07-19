import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from "react-native-vector-icons/AntDesign";
import Fonts from "../Assets/Fonts/fonts";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"

const Reset = (navigation) => {



    const [Old, setOld] = useState("")
    const [Olderror, setOlderror] = useState("")

    const [New, setNew] = useState("")
    const [Newerror, setNewerror] = useState("")

    const [Confirm, setConfirm] = useState("")
    const [Confirmerror, setConfirmerror] = useState("")

    const [OldShow, setOldShow] = useState(true)
    const [NewShow, setNewShow] = useState(true)
    const [ConfirmShow, setConfirmShow] = useState(true)

    const [id, setid] = useState("")

    // API STATE ----------------

    const ResetAPI = async () => {
        const email = await AsyncStorage.getItem('emailid')
        console.log(email)
        var formData = new FormData();
        formData.append("email", email);
        formData.append("old_password", Old);
        formData.append("new_password", New);
        formData.append("confirm_password", Confirm);

        axios.post('http://staging.webmynehost.com/hospital_demo/services/change_password.php', formData,    
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(function (response) {
                console.log("change password", response)
            }).catch(function (error) {
                console.log(error)
            })
        console.log("old", Old, "new", New, "confirm", Confirm)
    }



    const Validation = () => {

        setOlderror("")
        setNewerror("")
        setConfirmerror("")

        if (Old == "") {
            setOlderror("Old Password is required")
        }

        if (New == "") {
            setNewerror("New Password is required")
        }

        if (Confirm == "") {
            setConfirmerror("Confirm Password is required")
        }
        else if (New == Confirm) {
            ResetAPI()
            props.navigate("Pass_success")

        } else {
            setNewerror("New Password and confirm password is does not match")
        }
    }



    const props = navigation.navigation;

    return (

        <ScrollView automaticallyAdjustKeyboardInsets>
            <View style={{ height: hp("100%") }}>
                <View style={styles.blue}>

                    <View style={{ flexDirection: "row", marginTop: hp('2') }}>

                        <TouchableOpacity onPress={() => props.navigate("Drawerr")}>
                            <AntDesign style={{ marginLeft: wp('15') }} name="arrowleft" size={30} color="#FFFFFF" />
                        </TouchableOpacity>

                        <Text style={{ color: "white", fontFamily: Fonts.Lato_Bold, fontSize: 18, marginRight: wp('60'), marginLeft: wp('5') }}>Reset Password</Text>
                    </View>

                    <View style={styles.white}>

                        

                            <Image style={styles.image} source={require("../Assets/Images/lock.png")} />

                            <Text style={styles.Old}>Old Password</Text>

                            <View style={styles.textInput}>
                                <TextInput style={styles.placeholder}
                                    placeholder="Old Password"
                                    placeholderTextColor={"#4E95FF"}
                                    secureTextEntry={OldShow}
                                    value={Old}
                                    onChangeText={(Old) => setOld(Old)}

                                />
                                <TouchableOpacity style={styles.touch} onPress={() => setOldShow(prev => !prev)}>
                                    <Image style={styles.eye} source={require('../Assets/Images/eye.png')} />
                                </TouchableOpacity>
                            </View>

                            {Olderror == "" ? (
                                null
                            ) : (
                                <Text style={styles.error}>{Olderror}</Text>
                            )}

                            <Text style={styles.New}>New Password</Text>

                            <View style={styles.textInput}>
                                <TextInput style={styles.placeholder}
                                    placeholder="New Password"
                                    placeholderTextColor={"#4E95FF"}
                                    secureTextEntry={NewShow}
                                    value={New}
                                    onChangeText={(New) => setNew(New)}

                                />
                                <TouchableOpacity style={styles.touch} onPress={() => setNewShow(prev => !prev)}>
                                    <Image style={styles.eye} source={require('../Assets/Images/eye.png')} />
                                </TouchableOpacity>
                            </View>

                            {Newerror == "" ? (
                                null
                            ) : (
                                <Text style={styles.error}>{Newerror}</Text>
                            )}

                            <Text style={styles.Confirm}>Confirm Password</Text>

                            <View style={styles.textInput}>
                                <TextInput style={styles.placeholder}
                                    placeholder="New Password"
                                    placeholderTextColor={"#4E95FF"}
                                    secureTextEntry={ConfirmShow}
                                    value={Confirm}
                                    onChangeText={(Confirm) => setConfirm(Confirm)}

                                />
                                <TouchableOpacity style={styles.touch} onPress={() => setConfirmShow(prev => !prev)}>
                                    <Image style={styles.eye} source={require('../Assets/Images/eye.png')} />
                                </TouchableOpacity>
                            </View>

                            {Confirmerror == "" ? (
                                null
                            ) : (
                                <Text style={styles.error}>{Confirmerror}</Text>
                            )}

                            <TouchableOpacity style={styles.button} onPress={() => Validation()}>
                                <Text style={styles.Reset}>Reset Password</Text>
                            </TouchableOpacity>

                       


                    </View>

                </View>
            </View>
        </ScrollView>

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

    white: {
        backgroundColor: "white",
        width: wp('89%'),
        height: hp('75%'),
        marginTop: hp('4'),
        borderRadius: 40,
        elevation: 5,
    },

    image: {
        alignSelf: "center",
        resizeMode: "contain",
        height: hp('20'),
        width: wp('20')
    },

    Old: {
        color: "#3A3A3A",
        fontSize: 15,
        fontFamily: Fonts.Lato_Semibold,
        marginLeft: wp('9')
    },

    textInput: {
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "#E8F1FF",
        borderRadius: 10,
        width: wp('70'),
        height: hp('6.5'),
        marginTop: hp('1'),
        alignSelf: "center",
    },

    touch: {
        justifyContent: "center",
        alignSelf: "center",
    },

    eye: {
        alignSelf: "center",
        width: wp('5'),
        height: hp('5'),
        resizeMode: "contain"
    },

    placeholder: {
        alignSelf: "flex-end",
        width: wp('60'),
        paddingLeft: wp('5'),
        fontFamily: Fonts.Lato_Semibold,
        color: "#4E95FF"
    },

    New: {
        color: "#3A3A3A",
        fontSize: 15,
        fontFamily: Fonts.Lato_Semibold,
        marginLeft: wp('9'),
        marginTop: hp('2')
    },

    Confirm: {
        color: "#3A3A3A",
        fontSize: 15,
        fontFamily: Fonts.Lato_Semibold,
        marginLeft: wp('9'),
        marginTop: hp('2')
    },

    Reset: {
        color: "white",
        fontSize: 18,
        fontFamily: Fonts.Lato_Semibold
    },

    button: {
        marginTop: hp('7.5'),
        alignSelf: "center",
        backgroundColor: "#4E95FF",
        color: "white",
        width: wp('55'),
        alignItems: "center",
        justifyContent: "center",
        height: hp('6'),
        borderRadius: 24,
    },

    error: {
        // backgroundColor:"red",
        // width:wp("100%"),
        // color:"white",
        // fontSize:16,
        // fontFamily:Fonts.Lato_Semibold,
        paddingLeft: wp("12%")
    }
})

export default Reset;