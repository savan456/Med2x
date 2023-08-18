import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, Image, ImageBackground, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import axios, { Axios } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";


const Profile = (navigation) => {

    const [item, setitem] = useState("")
    const [edit, setedit] = useState(false)




    useEffect(() => {
        ProfileAPI()
    }, [])

    async function ProfileAPI() {
        const id = await AsyncStorage.getItem('id')

        axios.get('http://staging.webmynehost.com/hospital_demo/services/getProfile.php', {
            params: {
                profileId: id
            }

        })
            .then(async function (response) {
                setitem(response.data.ResponseData)
                
                await AsyncStorage.setItem('emailid', response.data.ResponseData.email)
            })
            .catch(function (error) {
                
            });
    }
    

    const Toggle = () => {
        setedit(!edit)
    }

    const props = navigation.navigation
    const [Image1, setimage] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [visibleModal, setVisibleModal] = useState(false)

    const choosePhotoFromgallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(async image => {
            
            setimage(image.path)
            await AsyncStorage.setItem("uri", image.path)
            setVisibleModal(false)
        });
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(async image => {
            
            setimage(image.path)
            await AsyncStorage.setItem("uri", image.path)
            setVisibleModal(false)
        });
    }

    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [mobile, setmobile] = useState("")
    const [age, setage] = useState("")
    const [address, setaddress] = useState("")

    const editAPI = () => {
        var formdata = new FormData();
        
        formdata.append("name", name);
        formdata.append("age", age);
        formdata.append("address", address);
        formdata.append("mobile", mobile);
        formdata.append("image(basa64)", "\"\"");
        formdata.append("profileId", item.id);
        axios.post('http://staging.webmynehost.com/hospital_demo/services/editProfile.php', formdata,
            {
                params: {
                    formate: "json"
                }

            }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        ).then(function (response) {
            
        }).catch(function (error) {
        
        })
    }


    return (
        <ScrollView automaticallyAdjustKeyboardInsets>
            {item ?
                <View style={{ backgroundColor: "white", height: hp("100%") }}>

                    <View style={styles.Header}>

                        {edit == true ? <AntDesign style={{ marginLeft: wp("4") }} name="close" onPress={() => Toggle()} size={30} color="#FFFFFF" /> :

                            <TouchableOpacity onPress={() => navigation.navigation.dispatch(
                                CommonActions.reset({
                                    routes: [{
                                        name: "Setting",

                                    }]
                                })
                            )}>
                                <AntDesign style={{ marginLeft: wp('4') }} name="arrowleft" size={30} color="#FFFFFF" />
                            </TouchableOpacity>}

                        <Text style={{ color: "white", fontFamily: Fonts.Lato_Semibold, fontSize: 18, marginRight: wp('60') }}>Profle</Text>

                        {edit == true ? <Feather style={{ marginRight: wp('4') }} onPress={() => {
                            Toggle()
                            editAPI()
                        }} name="check" size={25} color="#FFFFFF" /> :
                            <Feather style={{ marginRight: wp('4') }} onPress={() => Toggle()} name="edit" size={25} color="#FFFFFF" />
                        }
                    </View>

                    <View style={styles.bgBlue}>



                        <View style={styles.photo}>
                            <ImageBackground style={{ height: hp('15'), width: wp('30'), }} borderRadius={20} source={{ uri: Image1 }}></ImageBackground>
                            <TouchableOpacity style={styles.icon} onPress={() => setVisibleModal(true)}>
                                <Image style={styles.camera} source={require("../Assets/Images/camera.png")}></Image>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.bgWhite}>

                            <View style={{ marginTop: hp('7') }}>

                                <Text style={styles.title}>Name</Text>
                                <TextInput style={styles.TextInput}
                                    editable={edit}
                                    onChangeText={(Text) => setname(Text)}
                                    placeholder="User name"
                                    placeholderTextColor={"#4E95FF"}>{item.name}</TextInput>

                                <Text style={styles.title}>Email</Text>
                                <TextInput style={styles.TextInput}
                                    editable={edit}
                                    onChangeText={(Text) => setemail(Text)}
                                    placeholder="Email"
                                    placeholderTextColor={"#4E95FF"}>{item.email}</TextInput>

                                <Text style={styles.title}>Mobile Number</Text>
                                <TextInput style={styles.TextInput}
                                    editable={edit}
                                    onChangeText={(Text) => setmobile(Text)}
                                    placeholder="Mobile Number"
                                    placeholderTextColor={"#4E95FF"}>{item.mobile}</TextInput>

                                <Text style={styles.title}>Age</Text>
                                <TextInput style={styles.TextInput}
                                    editable={edit}
                                    onChangeText={(Text) => setage(Text)}
                                    placeholder="Age"
                                    placeholderTextColor={"#4E95FF"}>{item.age}</TextInput>

                                <Text style={styles.title}>Address</Text>
                                <TextInput style={styles.TextInput}
                                    editable={edit} onChangeText={(Text) => setaddress(Text)}
                                    placeholder="Address"
                                    placeholderTextColor={"#4E95FF"}>{item.address}</TextInput>

                            </View>

                        </View>

                    </View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={visibleModal}

                        onRequestClose={() => {
                            setVisibleModal(!visibleModal)
                            Alert.alert('Modal has been closed.');

                        }}>
                        <View style={styles.modal}>

                            <TouchableOpacity style={styles.close} onPress={() => setVisibleModal(false)}>
                                <AntDesign name="closecircle" size={25} color={"black"} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: "row", marginTop: -60 }}>

                                <TouchableOpacity onPress={choosePhotoFromgallery}>
                                    <Image style={styles.gallery} source={require("../Assets/Images/gallery.png")}></Image>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={takePhotoFromCamera}>
                                    <Image style={styles.camera1} source={require("../Assets/Images/camera1.png")}></Image>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </Modal>
                </View>
                : <ActivityIndicator size={"large"} />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    bgBlue: {
        backgroundColor: "#4E95FF",
        height: hp('65%'),
        alignItems: "center",
        borderBottomLeftRadius: wp('20'),
        borderBottomRightRadius: wp('20')
    },

    Header: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#4E95FF",
        paddingTop: hp('2'),
        alignItems: "center"
    },

    bgWhite: {
        backgroundColor: "white",
        width: wp('89%'),
        height: hp('70%'),
        marginTop: hp('10'),
        borderRadius: 40,
        elevation: 5,
    },

    title: {
        color: "#3A3A3A",
        fontFamily: Fonts.Lato_Semibold,
        fontSize: 15,
        marginLeft: wp('9'),
        marginTop: hp('2'),
    },

    TextInput: {
        backgroundColor: "#E8F1FF",
        marginTop: hp('1'),
        width: wp('70'),
        marginLeft: wp('9'),
        borderRadius: 10,
        paddingLeft: wp('4'),
        fontSize: 15,
        fontFamily: Fonts.Lato_Semibold,
        color: "#4E95FF"
    },

    photo: {
        backgroundColor: "white",
        elevation: 5,
        height: hp('15'),
        width: wp('30'),
        marginTop: hp('3'),
        position: "absolute",
        zIndex: 999,
        borderRadius: 20
    },

    camera: {
        resizeMode: "contain",
        height: hp(3),
        width: wp(5),
        alignSelf: "center",
    },

    icon: {
        height: wp(8),
        width: wp(8),
        borderRadius: wp(8),
        borderWidth: 3,
        borderColor: "#4E95FF",
        // marginLeft: wp('27'),
        backgroundColor: "white",
        justifyContent: "center",
        marginTop: hp(-15.3),
        marginLeft: wp(23.5)
    },

    modal: {
        height: hp('15%'),
        width: hp('50.5%'),
        marginTop: hp('85%'),
        borderTopRightRadius: wp('5'),
        borderTopLeftRadius: wp('5'),
        backgroundColor: "#E8F1FF"
    },

    close: {
        marginLeft: wp('90'),
        marginTop: hp('1%'),
        height: hp('15%'),
        width: wp('15%')
    },

    gallery: {
        height: hp('15'),
        width: wp('15'),
        resizeMode: "contain",
        marginLeft: wp('25'),
        marginTop: hp('-8')
    },

    camera1: {
        height: hp('12'),
        width: wp('12'),
        resizeMode: "contain",
        marginTop: hp('-6.2'),
        marginLeft: wp('25')
    }


})

export default Profile;