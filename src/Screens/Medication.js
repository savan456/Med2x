import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Medication = (navigation) => {

    const First = [
        {
            path: require('../Assets/Images/heart.png'),
            num: "56",
            name: "Heart Rate",
        },

        {
            path: require('../Assets/Images/blood.png'),
            num: "120/80",
            name: "Blood Pressure",
        },

        {
            path: require('../Assets/Images/weight.png'),
            num: "118",
            name: "Weight",
        },

        {
            path: require('../Assets/Images/height.png'),
            num: "5'3'",
            name: "ft Height",
        },

        {
            path: require('../Assets/Images/pulse.png'),
            num: "136",
            name: "Pulse Rate",
        },

        {
            path: require('../Assets/Images/calories.png'),
            num: "138",
            name: "Calories"
        },
    ]

    const Secound = [
        {
            image: require('../Assets/Images/Message.png'),
            text: "Message",
            root: "Message",
        },

        {
            image: require('../Assets/Images/Bell.png'),
            text: "Notification",
            root: "",
        },

        {
            image: require('../Assets/Images/pills.png'),
            text: "Pills Reminder",
            root: "",
        },

        {
            image: require('../Assets/Images/blogs.png'),
            text: "Our Blogs",
            root: "",
        },
    ]
    const touch = (item, index) => {

        if (index == 0) {
            navigation.navigation.navigate(item.root)
        }

    }
    useEffect(() => {
        profile()
    })
    const [asy1, setasy] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const props = navigation.navigation;

    const profile = async () => {
        const asy = await AsyncStorage.getItem("uri")
    
        setasy(asy)
    }

    return (

        <View style={{ backgroundColor: "white" }}>

            <View style={styles.blue}>

                <TouchableOpacity onPress={() => props.navigate("Home")}>
                    <AntDesign style={styles.back} name="arrowleft" size={30} color="#FFFFFF" />
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image style={styles.photo} source={{ uri: asy1 }} />
                    <Text style={styles.smith} >Smith Johnson </Text>
                    <Text style={styles.years}>{'\n'}33 Years {'\n'}British Colombia, CA</Text>

                    <TouchableOpacity style={styles.touch} onPress={() => props.navigate("Profile")}>
                        <Text style={styles.profile}>My Profile</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <FlatList style={{ marginTop: hp('2%'), marginLeft: wp('4%'), }}
                data={First}
                numColumns={2}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ alignItems: "center", flexDirection: "row", flex: 1, marginLeft: wp('3%'), marginVertical: hp('2.5%') }}>
                        <View style={styles.image}>
                            <Image style={styles.imagelist} source={item.path} />
                        </View>
                        <View style={{ marginLeft: wp('4%') }}>
                            <Text style={styles.num}>{item.num}</Text>
                            <Text style={styles.name}>{item.name}</Text>
                        </View>
                    </View>
                )}
            />

            <View style={{ height: hp('50%'), backgroundColor: "#E8F1FF" }}>
                <FlatList style={{ marginTop: hp('1%') }}
                    // horizontal
                    numColumns={'2'}
                    data={Secound}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={styles.bgwhite} onPress={() => touch(item, index)}>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                <Image style={styles.item} source={item.image} />
                                <Text style={styles.text}>{item.text}</Text>
                            </View>
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
        height: hp('18%'),
        width: wp('100%')
    },

    back: {
        marginLeft: wp('4'),
        marginTop: hp('1')
    },

    photo: {
        height: hp('9%'),
        width: wp('19%'),
        resizeMode: "contain",
        marginLeft: wp('4%'),
        marginTop: hp('1%'),
        borderRadius: 40
    },

    smith: {
        color: "#FFFFFF",
        fontSize: 18,
        fontFamile: Fonts.Lato_Semibold,
        marginBottom: hp('5%'),
        marginLeft: wp('4%'),
        marginTop: hp('0.5%')
    },

    years: {
        color: "#FFFFFF",
        fontSize: 14,
        fontFamily: Fonts.Laato_Light,
        marginLeft: wp('-34%'),
        marginTop: hp('3%')
    },

    touch: {
        alignSelf: "center",
        backgroundColor: "#F2F7FF",
        height: hp('4%'),
        width: wp('23%'),
        marginLeft: wp('12%'),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 6,
        marginBottom: hp('3%')
    },

    profile: {
        color: "#4E95FF",
        fontSize: 14,
        fontFamily: Fonts.Lato_Semibold
    },

    image: {
        backgroundColor: "#4E95FF",
        width: wp('10%'),
        height: hp('5%'),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20
    },

    imagelist: {
        resizeMode: "contain",
        height: hp('2.5%'),
        width: wp('5%'),
    },

    num: {
        color: "#515151",
        fontSize: 16,
        fontFamily: Fonts.Lato_Semibold,
        width: wp('20%')
    },

    name: {
        color: "#515151",
        fontSize: 16,
        fontFamily: Fonts.Lato_Semibold,
        width: wp('30%')
    },

    bgwhite: {
        flexDirection: "row",
        backgroundColor: "white",
        elevation: 1,
        height: hp('15%'),
        width: wp('46%'),
        margin: 8,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center"
    },

    item: {
        resizeMode: "contain",
        height: hp('5%'),
        width: wp('10%')
    },

    text: {
        color: "#515151",
        fontSize: 16,
        fontFamily: Fonts.Lato_Semibold,
        alignSelf: "center",
        marginTop: hp('1%')

    }

})

export default Medication;