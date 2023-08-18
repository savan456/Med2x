import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";
import axios from "axios";
// import { ScrollView } from "react-native-gesture-handler";

const Signup = (navigation) => {

    const [Email, setEmail] = useState("")
    const [Emailerror, setEmailerror] = useState("")

    const [Username, setUsername] = useState("")
    const [Usernameerror, setuserNameerror] = useState("")

    const [Password, setPassword] = useState("")
    const [Passworderror, setPassworderror] = useState("")

    const [Confirm, setConfirm] = useState("")
    const [Confirmerorr, setConfirmerror] = useState("")

    const [Show, setShow] = useState(true)
    const [Showw, setShoww] = useState(true)

    const Validation = () => {

        setEmailerror("")
        setuserNameerror("")
        setPassworderror("")
        setConfirmerror("")

        if (Email == "") {
            setEmailerror("Please Email is required")
        }

        if (Username == "") {
            setuserNameerror("Please UserName is required")
        }

        if (Password == "") {
            setPassworderror("Please Password is required")
        }

        if (Confirm == "") {
            setConfirmerror("Please Confirm Passsword is required")
        }
        else if (Confirm != Password) {
            setConfirmerror("Password does not match")
        }

        if (Email !== "" && Username !== "" && Password !== "" && Confirm !== "") {
            signupAPI()
        }

    }

    const signupAPI = () => {

        axios.get("http://staging.webmynehost.com/hospital_demo/services/signup.php",
            {
                params: {
                    username: Username,
                    emailid: Email,
                    password: Password,
                    confirm_password: Confirm
                }
            }
        )

            .then(function (response) {
                
                if (response.data.ResponseCode == "1") {
                    // alert(response.data.ResponseMsg)
                    props.navigate("Login")

                }
                else {
                    alert(response.data.ResponseMsg)
                }
            })
            .catch(function (error) {
                
            });
    }

    const props = navigation.navigation;

    return (

    
                <View style={styles.aa}>

                    <View style={styles.bb}>

                        <Text style={styles.cc}>SIGN UP</Text>

                        <Text style={styles.dd}>Email Id</Text>
                        <TextInput style={styles.ee}
                            placeholder="Email Id"
                            placeholderTextColor={"#4E95FF"}
                            value={Email}
                            onChangeText={(Email) => setEmail(Email)}
                        />

                        {Emailerror == "" ? (
                            null
                        ) : (
                            <Text style={styles.Error}>{Emailerror}</Text>
                        )}


                        <Text style={styles.dd}>User name</Text>
                        <TextInput style={styles.ee}
                            placeholder="User Name"
                            placeholderTextColor={"#4E95FF"}
                            value={Username}
                            onChangeText={(Username) => setUsername(Username)}
                        />

                        {Usernameerror == "" ? (
                            null
                        ) : (
                            <Text style={styles.Error}>{Usernameerror}</Text>
                        )}



                        <Text style={styles.dd}>Password</Text>

                        <View style={styles.TextInput}>
                            <TextInput style={styles.pp}
                                placeholder="Password"
                                placeholderTextColor={"#4E95FF"}
                                secureTextEntry={Showw}
                                value={Password}
                                onChangeText={(Password) => setPassword(Password)}
                            />

                            <View style={styles.eye}>
                                <TouchableOpacity onPress={() => { setShoww(prev => !prev) }}>
                                    <Image style={{ alignSelf: "center", width: wp('5'), height: hp('5'), resizeMode: "contain" }} source={require('../Assets/Images/eye.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {Passworderror == "" ? (
                            null
                        ) : (
                            <Text style={styles.Error}>{Passworderror}</Text>
                        )}


                        <Text style={styles.dd}>Confirm Password</Text>

                        <View style={styles.TextInput}>
                            <TextInput style={styles.pp}
                                placeholder="Confirm Password"
                                placeholderTextColor={"#4E95FF"}
                                secureTextEntry={Show}
                                value={Confirm}
                                onChangeText={(Confirm) => setConfirm(Confirm)}
                            />
                            <View style={styles.eye}>
                                <TouchableOpacity onPress={() => { setShow(prev => !prev) }}>
                                    <Image style={{ alignSelf: "center", width: wp('5'), height: hp('5'), resizeMode: "contain" }} source={require('../Assets/Images/eye.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {Confirmerorr == "" ? (
                            null
                        ) : (
                            <Text style={styles.Error}>{Confirmerorr}</Text>
                        )}


                        <TouchableOpacity style={styles.ff} onPress={() => Validation()} >
                            <Text style={styles.gg}>Sign up</Text>
                        </TouchableOpacity>


                    </View>

                    <View style={styles.hh}>
                        <Text style={{ fontSize: 15, color: "#3A3A3A", fontFamily: Fonts.Lato_Semibold }}>Already have an account?</Text>

                        <TouchableOpacity onPress={() => props.navigate("Login")}>
                            <Text style={{ color: "#4E95FF", fontSize: 15, fontFamily: Fonts.Lato_Semibold }}> Login Here</Text>
                        </TouchableOpacity>

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
        height: hp('75%'),
        marginTop: hp('13'),
        borderRadius: 40,
        elevation: 5,
    },
    cc: {
        fontSize: 25,
        alignSelf: "center",
        marginTop: hp('4'),
        fontFamily: Fonts.Lato_Semibold,
        color: "#3A3A3A"
    },
    dd: {
        marginLeft: wp('15'),
        fontSize: 15,

        color: "#3A3A3A",
        marginTop: hp('1'),
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
    ff: {
        marginTop: hp('6'),
        alignSelf: "center",
        backgroundColor: "#4E95FF",
        color: "white",
        width: wp('55'),
        alignItems: "center",
        justifyContent: "center",
        height: hp('6'),
        borderRadius: 24
    },
    gg: {
        color: "white",
        fontSize: 18,
        fontFamily: Fonts.Lato_Semibold
    },
    hh: {
        flexDirection: "row",
        marginTop: hp('4'),

    },

    TextInput: {
        flexDirection: "row",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 24,
        borderColor: "#707070",
        width: wp('67'),
        marginLeft: wp('-3'),
        height: hp('6.6'),
        marginTop: hp('1'),
        alignSelf: "center",
    },

    pp: {
        alignSelf: "center",
        width: wp('67'),
        paddingLeft: wp('17.3'),
        alignItems: "center",
        fontFamily: Fonts.Lato_Semibold,
        color: "#4E95FF"
    },

    eye: {
        marginRight: wp('17'),
        justifyContent: "center",
        alignSelf: "center"
    },

    Error: {
        // backgroundColor: "red",
        // width: wp("100%"),
        // fontSize: 16,
        // fontFamily: Fonts.Lato_Semibold,
        // color: "white",
        paddingLeft: wp("12%"),

    }

})

export default Signup;