import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import CalendarStrip from 'react-native-calendar-strip';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AntDesign from "react-native-vector-icons/AntDesign";
import Fonts from "../Assets/Fonts/fonts";
import { Dropdown } from 'react-native-element-dropdown';


const Appoiment = (navigation) => {

    const props = navigation.navigation;

    const Month = [
        { lable: "January" },
        { lable: "February" },
        { lable: "March" },
        { lable: "April" },
        { lable: "May" },
        { lable: "Jun" },
        { lable: "July" },
        { lable: "August" },
        { lable: "September" },
        { lable: "October" },
        { lable: "November" },
        { lable: "December" },
    ]

    const Years = [
        { years: "2021" },
        { years: "2022" },
        { years: "2023" },
        { years: "2024" },
        { years: "2025" },
    ]

    const [active, setActive] = useState("")

    const [Value, setValue] = useState("")
    const [isFocus, setIsFocus] = useState(false);

    const [Value1, setValue1] = useState("")
    const [inFocus, setinFocus] = useState(false)


    const Slots = [
        {
            id: 0,
            name: "Morning Shots",
            Slots: [
                {
                    id: 0,
                    time: "10:10 AM"
                },
                {
                    id: 1,
                    time: "10:30 AM"
                },
                {
                    id: 2,
                    time: "10:50 AM"
                },
                {
                    id: 3,
                    time: "11:10 AM"
                },
                {
                    id: 4,
                    time: "11:30 AM"
                },
            ]
        },
        {
            id: 1,
            name: "Afternoon Slots",
            Slots: [
                {
                    id: 5,
                    time: "02:10 PM"
                },
                {
                    id: 6,
                    time: "02:30 PM"
                },
                {
                    id: 7,
                    time: "03:00 PM"
                },
            ]
        },
        {
            id: 2,
            name: "Evening Slots",
            Slots: [
                {
                    is: 8,
                    time: "06:30 PM"
                },
                {
                    id: 9,
                    time: "07:00 PM"
                },
                {
                    id: 10,
                    time: "07:30 PM"
                },
                {
                    id: 11,
                    time: "07:50 PM"
                },
                {
                    id: 12,
                    time: "08:20 PM"
                },
            ]
        }
    ]

    return (
        <View style={{ backgroundColor: "white", flex: 1 }}>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => props.navigate("Drawerr")}>
                    <AntDesign style={{ marginLeft: wp('5') }} name="arrowleft" size={30} color="black" />
                </TouchableOpacity>
                <Text style={styles.Appointment}>Appointment</Text>
            </View>

            <View>
                <View style={{ flexDirection: "row" }}>
                    <Dropdown style={{ width: wp('25%'), marginLeft: wp("10%"), }}
                        data={Month}
                        labelField="lable"
                        value={Value}
                        valueField="lable"
                        placeholder="Month"
                        // onFocus={()=> setIsFocus(true)}
                        onChange={item => {
                            setValue(item.lable)
                            setIsFocus(false);
                        }}
                        containerStyle={{ width: wp("32%") }}
                        selectedTextStyle={{ color: "#707070", fontSize: 16, fontFamily: Fonts.Lato_Bold }}
                    />

                    <Dropdown style={{ width: wp("17%"), marginLeft: wp('4%') }}
                        data={Years}
                        placeholder="Years"
                        labelField="years"
                        value={Value1}
                        valueField="years"
                        selectedTextStyle={{ color: "#707070", fontSize: 14, fontFamily: Fonts.Lato_Bold }}
                        containerStyle={{ width: wp("20%") }}
                        onFocus={()=> setinFocus(true)}
                        onChange={item => {
                            setValue1(item.years);
                            setinFocus(false);
                        }}

                    />



                </View>

                <CalendarStrip
                    calendarAnimation={{ type: "sequence", duration: 30 }}
                    style={{ height: 100, paddingTop: 20, paddingBottom: 55, marginBottom: hp('-3%') }}
                    highlightDateContainerStyle={{ backgroundColor: "#4E95FF", height: hp("7%"), width: wp("10%"), borderRadius: 10 }}
                    showMonth={false}
                    calendarColor={'white'}
                    dateNumberStyle={{ color: '#929292', fontSize: 14, fontFamily: Fonts.Lato_Regulaar }}
                    dateNameStyle={{ color: '#707070', fontSize: 14, fontFamily: Fonts.Lato_Bold }}
                    highlightDateNumberStyle={{ color: 'white', fontSize: 14, fontFamily: Fonts.Lato_Regulaar }}
                    highlightDateNameStyle={{ color: 'white', fontSize: 14, fontFamily: Fonts.Lato_Bold }}
                    iconContainer={{ flex: 0.1 }}

                />

            </View>



            <View style={{backgroundColor:"#E8F1FF",height:hp("100%")}}>
                <FlatList style={{ marginLeft: wp('1%'), marginTop: hp('1%') }}
                    data={Slots}
                    // numColumns={'3'}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <Text style={styles.Morning}>{item.name}</Text>
                                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>

                                    {item.Slots.map((i) => {

                                        return (
                                            <TouchableOpacity style={active == i.id ? styles.selected_Slots : styles.Slots} onPress={() => setActive(i.id)}>
                                                <Text style={active == i.id ? styles.selected_time : styles.time}>{i.time}</Text>
                                            </TouchableOpacity>
                                        )
                                    })}
                                </View>
                            </View>

                        )
                    }}
                />


                <TouchableOpacity style={styles.touch}>
                    <Text style={styles.Book}>Book An Appointment</Text>
                </TouchableOpacity>
            </View>

        </View>


    )
}

const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        marginTop: hp('2'),
        alignItems: "center",

    },

    Appointment: {
        color: "black",
        fontFamily: Fonts.Lato_Semibold,
        fontSize: 18,
        marginRight: wp('60'),
        marginLeft: wp('5')
    },

    Morning: {
        color: "#707070",
        fontSize: 16,
        fontFamily: Fonts.Lato_Bold,
        marginTop: hp('4%'),
        marginLeft: wp('5%')
    },

    Slots: {
        backgroundColor: "white",
        margin: 15,
        height: hp('4%'),
        width: wp('25%'),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    time: {
        color: "#707070",
        fontFamily: Fonts.Lato_Regulaar,
        fontSize: 14
    },

    touch: {
        alignSelf: "center",
        backgroundColor: "#4E95FF",
        width: wp('60'),
        alignItems: "center",
        justifyContent: "center",
        height: hp('6'),
        borderRadius: 24,
        marginBottom: hp('29%')
    },

    Book: {
        color: "white",
        fontFamily: Fonts.Lato_Semibold,
        fontSize: 18
    },

    selected_Slots: {
        backgroundColor: "#4E95FF",
        margin: 15,
        height: hp('4%'),
        width: wp('25%'),
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8
    },

    selected_time: {
        color: "#707070",
        fontFamily: Fonts.Lato_Regulaar,
        fontSize: 14,
        color: "white"
    },





})

export default Appoiment;