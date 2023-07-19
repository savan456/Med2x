import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, FlatList, Image, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";
import axios from "axios";
import AntDesign from "react-native-vector-icons/AntDesign";
import Animated, { FadeIn } from "react-native-reanimated";
import { Rating, AirbnbRating } from 'react-native-ratings';


const Home = (navigation) => {

    const Doctor_Profile = () => {

        const icon = [
            {
                path: require("../Assets/Images/mess.png")
            },

            {
                path: require("../Assets/Images/call.png")
            },

            {
                path: require("../Assets/Images/V_call.png")
            },

            {
                path: require("../Assets/Images/Location.png")
            }
        ]

        // const star = [
        //     {
        //         path1: require('../Assets/Images/star.png')
        //     },

        //     {
        //         path1: require('../Assets/Images/star.png')
        //     },

        //     {
        //         path1: require('../Assets/Images/star.png')
        //     },

        //     {
        //         path1: require('../Assets/Images/star.png')
        //     },

        //     {
        //         path1: require('../Assets/Images/star.png')
        //     },
        // ]

        const Exp = [
            {
                name: "Patients",
                num: "1.08K"
            },

            {
                name: "Experience",
                num: item1.Experience
            },

            {
                name: "Review",
                num: item1.Reviews
            },
        ]



        return (

            <Animated.View entering={FadeIn} style={{ height: hp("100%"), width: wp("100%") }}>

                <View style={styles.blue}>

                    <TouchableOpacity onPress={() => Toggle()}>
                        <AntDesign style={styles.arrow} name="arrowleft" size={30} color="#FFFFFF" />
                    </TouchableOpacity>

                    <View style={styles.white}>

                        <ImageBackground style={styles.picture}
                            source={require("../Assets/Images/img.png")}>
                            <View style={styles.mark}></View>
                        </ImageBackground>

                        <Text style={styles.Urologist}>{item1.SpecialityName != "" ? item1.SpecialityName : "none"}</Text>
                        <Text style={styles.Erica}>{item1.DoctorName != "" ? item1.DoctorName : "none"}</Text>

                        <View style={{ marginTop: hp('-1') }}>

                            <FlatList style={{ alignSelf: "center", }}
                                data={icon}
                                horizontal
                                renderItem={({ item }) => (
                                    <TouchableOpacity>
                                        <Image style={styles.icon} source={item.path} />
                                    </TouchableOpacity>
                                )}

                            />

                        </View>

                        <Text style={styles.MBBS}>Good Health Hospitals, {item1.Degree}</Text>


                        {/* <FlatList style={{ marginLeft: wp('8%') }}
                                horizontal
                                data={star}
                                renderItem={({ item }) => (
                                    <Image style={styles.star} source={item.path1} />
                                )}

                            /> */}


                        <View style={{ alignItems: "flex-start", marginLeft: wp("7.5%"), marginTop: hp('1%') }}>
                            <AirbnbRating
                                showRating={false}
                                size={19}
                                defaultRating={4}
                            />
                        </View>
                        <Text style={styles.About}>About</Text>

                        <Text style={styles.par}>Lorem ipsum dolor sit amet, consetetur{'\n'}sadipscing elitr, sed diam nonumy eirmod {'\n'}tempor invidunt ut labore et dolore magna</Text>
                        <View style={{ height: hp('10%') }}>
                            <FlatList style={{ alignSelf: "center" }}
                                horizontal
                                data={Exp}
                                renderItem={({ item }) => (
                                    <View style={{ margin: 20, alignItems: "center" }} >
                                        <Text style={styles.name}>{item.name}</Text>
                                        <Text style={styles.num}>{item.num}{item.name == "Review" ? "K" : null}</Text>
                                    </View>
                                )}

                            />
                        </View>

                        <TouchableOpacity style={styles.touch} onPress={() => props.navigate("Appoiment")}>
                            <Text style={styles.Book}>Book An Appointment</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            </Animated.View>


        )
    }


    const [api, setapi] = useState("")
    const [Show, setShow] = useState(false)
    const [item1, setitem] = useState("")

    const Toggle = (item) => {
        setitem(item)
        setShow(!Show)
    }

    const HomeAPI = () => {
        axios.get("http://staging.webmynehost.com/hospital_demo/services/dashboard.php?format=json",


        )
            .then(function (response) {
                console.log(response);
                setapi(response.data.response)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        HomeAPI()
    }, [])

    const props = navigation.navigation;


    const user = [
        {
            id: 1,
            title: "Patient Bill",
            color: "#4E95FF",
            path: require('../Assets/Images/Bill.png')
        },
        {
            id: 2,
            title: "Occupancy",
            color: "#3FCEA3",
            path: require('../Assets/Images/Occupancy.png')
        },
        {
            id: 3,
            title: "Charge Bill",
            color: "#54C3E6",
            path: require('../Assets/Images/Charge.png')
        },
        {
            id: 4,
            title: "Contact",
            color: "#7ACE52",
            path: require('../Assets/Images/Contact.png')
        },
        {
            id: 5,
            title: "Patient",
            color: "#6F55F1",
            path: require('../Assets/Images/Patient.png')
        },

    ]

    const images = require("../Assets/Images/img.png")


    return (
        <View style={{ backgroundColor: "white" }}>
            {Show == true ? <Doctor_Profile /> : null}
            <ScrollView showsVerticalScrollIndicator={false}>

                <TouchableOpacity onPress={() => navigation.navigation.openDrawer()}>
                    <Image style={styles.drawer} source={require("../Assets/Images/menu.png")}></Image>
                </TouchableOpacity>

                <View style={{ marginTop: hp('-5') }}>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.aa}>Doctor {'\n'}Appointment</Text>
                        <Image style={{ marginTop: hp('6'), marginRight: wp('5'), height: hp('6'), resizeMode: "contain" }} source={require('../Assets/Images/Mask.png')} />
                    </View>

                    <View style={styles.TextInput}>
                        <TextInput style={styles.cc} placeholder="Search e.g. Dr Louis" placeholderTextColor={"#BBBBBB"}></TextInput>
                        <View style={styles.bg}>
                            <AntDesign style={styles.icon1} name="search1" size={25} color="#FFFFFF" />
                        </View>
                    </View>

                    <Text style={styles.dd}>Categories</Text>

                    <View style={{ marginTop: hp('2'), marginLeft: wp('6') }}>

                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={user}
                            renderItem={({ item }) => (
                                <View style={[styles.ii, { backgroundColor: item.color }]}  >
                                    <Image style={styles.images} source={item.path} />
                                    <Text style={[styles.item]}>{item.title}</Text>

                                </View>
                            )}
                        />
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Text style={styles.ee}>Top Doctors</Text>
                        <Text style={styles.ff}>See all</Text>
                    </View>

                    <View style={{ marginTop: hp('1.5'), marginBottom: hp("8%") }}>

                        <FlatList
                            // nestedScrollEnabled={true}
                            data={api}
                            renderItem={({ item }) => {
                            

                                return (


                                    <TouchableOpacity style={styles.doctorlist} onPress={() => Toggle(item)}>

                                        <ImageBackground
                                            style={[styles.dimage, { marginTop: hp('1') }]}
                                            source={images}
                                            borderRadius={10}>
                                            <View style={styles.mark}></View>
                                        </ImageBackground>
                                        <View style={{ marginLeft: wp('5'), marginTop: hp('2.5') }}>
                                
                                            <Text style={styles.title}>{item.SpecialityName != "" ? item.SpecialityName : "Speciality name is does not defined"}</Text>
                                            <Text style={styles.name1}>{item.DoctorName != "" ? item.DoctorName : "Doctor name is dose not defined"}</Text>
                                        </View>


                                    </TouchableOpacity>
                                )
                            }}
                        />

                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    aa: {
        fontSize: 20,
        fontFamily: Fonts.Lato_Heavy,
        marginTop: hp('6'),
        marginLeft: wp('7'),
        color: "#3A3A3A"
    },
    cc: {
        alignSelf: "center",
        width: wp('70'),
        paddingLeft: wp('3'),
        fontFamily: Fonts.Lato_Regulaar
    },
    dd: {
        fontSize: 20,
        fontFamily: Fonts.Lato_Semibold,
        color: "#3A3A3A",
        marginLeft: wp('7'),
        marginTop: hp('3')
    },
    item: {
        fontSize: 14,
        marginBottom: hp('3'),
        color: "white",

    },
    ee: {
        fontSize: 20,
        color: "#3A3A3A",
        fontFamily: Fonts.Lato_Semibold,
        marginLeft: wp('7'),
        marginTop: hp('2')
    },
    ff: {
        fontSize: 18,
        color: "#3A3A3A",
        fontFamily: Fonts.Lato_Regulaar,
        marginTop: hp('2'),
        marginRight: wp('7'),
    },
    ii: {
        marginTop: hp('1'),
        margin: wp('2'),
        height: hp('12'),
        width: wp('25'),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    images: {
        height: hp('7'),
        width: wp('7'),
        resizeMode: "contain",
        marginTop: hp('2')
    },
    dimage: {
        resizeMode: "contain",
        marginLeft: wp('5'),
        marginTop: hp('2'),
        height: hp('8'),
        width: wp('15'),
        borderRadius: 10
    },
    mark: {
        height: hp(2),
        width: hp(2),
        borderRadius: hp(2),
        backgroundColor: "#1FC429",
        alignSelf: "flex-end",
        borderWidth: 2,
        borderColor: "white"
    },
    title: {
        color: "#3A3A3A",
        fontSize: 13,
        fontFamily: Fonts.Lato_Regulaar,
        textTransform:"capitalize"
    },
    name1: {
        color: "#3A3A3A",
        fontSize: 14,
        fontFamily: Fonts.Lato_Bold,
        textTransform:"capitalize"
    },
    doctorlist: {
        flexDirection: "row",
        backgroundColor: "white",
        elevation: 1,
        height: hp('10%'),
        width: wp('85%'),
        borderRadius: 10,
        margin: 10,
        alignSelf: "center"
    },
    TextInput: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "#F2F2F2",
        borderRadius: 25,
        height: hp('7'),
        width: wp('85%'),
        marginTop: hp('3'),
        alignSelf: "center",

    },
    icon1: {
        alignSelf: "center",
    },

    bg: {
        height: hp('6'),
        width: hp('6'),
        borderRadius: hp('4'),
        backgroundColor: "#4E95FF",
        justifyContent: "center",
        alignSelf: "center"
    },

    drawer: {
        resizeMode: "contain",
        height: hp('6'),
        width: wp('7'),
        marginLeft: wp('7'),
        marginTop: hp('2')
    },

    blue: {
        backgroundColor: "#4E95FF",
        height: hp('65%'),
        borderBottomLeftRadius: wp(20),
        borderBottomRightRadius: wp(20,),
        alignItems: "center"
    },

    arrow: {
        marginRight: wp("82%"),
        marginTop: hp('2%')
    },

    white: {
        backgroundColor: "white",
        width: wp('89%'),
        height: hp('75%'),
        marginTop: hp('5%'),
        borderRadius: 40,
        elevation: 5,
    },

    picture: {
        resizeMode: "contain",
        height: hp("13%"),
        width: wp('27%'),
        alignSelf: "center",
        marginTop: hp('3%'),

    },

    mark: {
        height: hp(2),
        width: hp(2),
        borderRadius: hp(2),
        backgroundColor: "#1FC429",
        alignSelf: "flex-end",
        borderWidth: 2,
        borderColor: "white"
    },

    Urologist: {
        color: "#707070",
        fontSize: 14,
        fontFamily: Fonts.Lato_Semibold,
        alignSelf: "center",
        marginTop: hp('1.5%'),
        textTransform:"capitalize"
    },

    Erica: {
        alignSelf: "center",
        color: "#3A3A3A",
        fontSize: 16,
        fontFamily: Fonts.Lato_Semibold,
        marginTop: hp('0.5%'),
        textTransform:"capitalize"
    },

    icon: {
        margin: 10,
        resizeMode: "contain",
        height: hp('4%'),
        width: wp("4%")
    },

    MBBS: {
        color: "#707070",
        fontSize: 14,
        fontFamily: Fonts.Lato_Semibold,
        marginLeft: wp('8%'),
        marginTop: hp("1%")
    },

    star: {
        margin: 3,
        resizeMode: "contain",
        height: hp('4%'),
        width: wp('4%')
    },

    About: {
        color: "#707070",
        fontSize: 14,
        fontFamily: Fonts.Lato_Semibold,
        marginLeft: wp('8%'),
        marginTop: hp("1%")
    },

    par: {
        marginLeft: wp('8%'),
        color: "#777777",
        fontSize: 15,
        fontFamily: Fonts.Lato_Regulaar,
        marginTop: hp('1%')
    },

    name: {
        color: "#929292",
        fontSize: 14,
        fontFamily: Fonts.Lato_Regulaar
    },

    num: {
        color: "#707070",
        fontSize: 15,
        fontFamily: Fonts.Lato_Semibold
    },

    touch: {
        marginTop: hp('3'),
        alignSelf: "center",
        backgroundColor: "#4E95FF",
        width: wp('60'),
        alignItems: "center",
        justifyContent: "center",
        height: hp('6'),
        borderRadius: 24,
        marginBottom: hp('3%')
    },

    Book: {
        color: "white",
        fontFamily: Fonts.Lato_Semibold,
        fontSize: 18
    },



})

export default Home;