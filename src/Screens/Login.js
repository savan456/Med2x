import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import axios from "axios";
import Fonts from "../Assets/Fonts/fonts";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AsyncStorage from "@react-native-async-storage/async-storage"

const Login = (navigation) => {

    useEffect(() => {
        get_id();
    })

    const [userName, setuserName] = useState("")
    const [Password, setPassword] = useState("")

    const [userNmaeerror, setuserNameerror] = useState("")
    const [passworderror, setpassworderror] = useState("")

    const [Show, setShow] = useState(true)
    const [userid, setUser] = useState("")

    const props = navigation.navigation;


    const Validation = () => {

        setuserNameerror("")
        setpassworderror("")

        if (userName == "") {
            setuserNameerror("Please User name is required")
        }

        if (Password == "") {
            setpassworderror("Please Password is required")
        }

        if (userName !== "" && Password !== "") {

            loginAPI()
        }


    }

    const loginAPI = () => {
        
        axios.get("http://staging.webmynehost.com/hospital_demo/services/login.php",
            {
                params: {
                    uname: userName,
                    pwd: Password
                }
            }
        )
            .then(async function (response) {
                console.log(response.config.params);
                setUser(response.data.did)
                await AsyncStorage.setItem("email" , response.config.params.uname)
                await AsyncStorage.setItem("pwd", response.config.params.pwd)
                if (response.data.code == "Login successfully") {
                    // alert(response.data.code)
                    props.navigate("Drawerr")
                }
                else {
                    alert(response.data.code)
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const get_id = async() => {
        await AsyncStorage.setItem('id' , userid)
    }

    return (
        <View>
            <View style={styles.aa}>

                <View style={styles.bb}>

                    <Text style={styles.cc}>LOGIN</Text>

                    <Text style={styles.dd}>User name</Text>
                    <TextInput
                        style={styles.ee}
                        placeholder="User Name"
                        placeholderTextColor={"#4E95FF"}
                        value={userName}
                        onChangeText={(userName) => setuserName(userName)}
                    />

                    {userNmaeerror == "" ? (
                        null
                    ) : (
                        <Text style={{ paddingLeft: wp("15%") }}>{userNmaeerror}</Text>
                    )}


                    <Text style={styles.ff}>Password</Text>

                    <View style={styles.TextInput}>

                        <TextInput
                            style={styles.pp}
                            placeholder="Password"
                            placeholderTextColor={"#4E95FF"}
                            secureTextEntry={Show}
                            value={Password}
                            onChangeText={(Password) => setPassword(Password)}
                        />

                        <View style={styles.eye}>
                            <TouchableOpacity onPress={() => { setShow(prev => !prev) }}>
                                <Image style={{ alignSelf: "center", width: wp('5'), height: hp('5'), resizeMode: "contain" }} source={require('../Assets/Images/eye.png')} />
                            </TouchableOpacity>
                        </View>

                    </View>

                    {passworderror == "" ? (
                        null
                    ) : (
                        <Text style={{ paddingLeft: wp("15%") }}>{passworderror}</Text>
                    )}



                    <Text style={styles.gg}>Forget Password?</Text>

                    <TouchableOpacity style={styles.hh} onPress={() => Validation()}>

                        <Text style={styles.ii}>Login</Text>

                    </TouchableOpacity>


                </View>

                <View style={styles.jj}>
                    <Text style={{ fontSize: 15, color: "#3A3A3A", fontFamily: Fonts.Lato_Semibold }}>Don't have an account?</Text>

                    <TouchableOpacity onPress={() => props.navigate("Signup")}>
                        <Text style={{ color: "#4E95FF", fontSize: 15, fontFamily: Fonts.Lato_Semibold }}> Sign Up</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    aa: {
        backgroundColor: "#4E95FF",
        height: hp('70%'),
        alignItems: "center",
        borderBottomLeftRadius: wp('20'),
        borderBottomRightRadius: wp('20')
    },
    bb: {
        backgroundColor: "white",
        width: wp('89%'),
        height: hp('65%'),
        marginTop: hp('13'),
        borderRadius: 40,
        elevation: 5,

    },
    cc: {
        fontSize: 25,
        alignSelf: "center",
        marginTop: hp(5),
        color: "#3A3A3A",
        fontFamily: Fonts.Lato_Bold
    },
    dd: {
        marginLeft: wp('15'),
        fontSize: 15,
        marginTop: hp('5'),
        color: "#3A3A3A",
        fontFamily: Fonts.Lato_Semibold
    },
    ee: {
        borderColor: "#707070",
        borderWidth: 1,
        borderRadius: 24,
        width: wp('67'),
        height: hp('6.5'),
        marginLeft: wp('10'),
        marginTop: hp('1'),
        paddingLeft: wp('5'),
        fontFamily: Fonts.Lato_Semibold,
        color: "#4E95FF"
    },
    pp: {
        alignSelf: "center",
        width: wp('70'),
        paddingLeft: wp('20'),
        alignItems: "center",
        fontFamily: Fonts.Lato_Semibold,
        color: "#4E95FF"
    },
    TextInput: {
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 24,
        borderColor: "#707070",
        width: wp('67'),
        height: hp('6.5'),
        marginTop: hp('1'),
        marginLeft: wp('-2.5'),
        alignSelf: "center",
    },
    eye: {
        marginRight: wp('17'),
        justifyContent: "center",
        alignSelf: "center"
    },
    ff: {
        marginLeft: wp('15'),
        //fontWeight: "bold",
        fontSize: 15,
        marginTop: hp('5'),
        color: "#3A3A3A",
        fontFamily: Fonts.Lato_Semibold
    },
    gg: {
        marginLeft: wp('48'),
        marginTop: hp('2'),
        fontFamily: Fonts.Lato_Medium
    },
    hh: {
        marginTop: hp('5'),
        alignSelf: "center",
        backgroundColor: "#4E95FF",
        color: "white",
        width: wp('55'),
        alignItems: "center",
        justifyContent: "center",
        height: hp('6'),
        borderRadius: 24,
    },
    ii: {
        color: "white",
        fontSize: 18,
        fontFamily: Fonts.Lato_Semibold
    },
    jj: {
        flexDirection: "row",
        marginTop: hp('5')
    },

})

export default Login;