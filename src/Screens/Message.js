import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Fonts from "../Assets/Fonts/fonts";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/Ionicons";
import EmojiPicker from 'rn-emoji-keyboard'
import { GiftedChat } from 'react-native-gifted-chat'


const Message = (navigation) => {

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [show, setshow] = useState(false)

    const Emoji = () => {
        return (
            <EmojiPicker onEmojiSelected={handlePick}
                open={show}
                onClose={() => setshow(!show)}
                allowMultipleSelections

            />
        )
    }

    const handlePick = (emojiObject) => {
        setInput(input + emojiObject.emoji)
    }

    const send = () => {
        return (
            <View style={styles.placeholder}>

                <View style={{ flexDirection: "row", alignItems: "center" }}>



                    <TouchableOpacity onPress={() => setshow(!show)}>
                        <Image style={styles.emoji} source={require("../Assets/Images/Emoji.png")} />
                    </TouchableOpacity>

                    <Image style={styles.link} source={require("../Assets/Images/Link.png")} />
                    <TextInput style={{ width: wp('50%') }} value={input} placeholder='Type your message here' onChangeText={(text) => setInput(text)}></TextInput>

                </View>

                <View style={{ alignItems: "center", justifyContent: "center" }}>

                    <TouchableOpacity style={styles.send_touch} onPress={() => {
                        const newMsg = {
                            _id: messages.length + 1,
                            text: input,
                            createdAt: new Date(),
                            user: {
                                _id: 2,
                                name: 'React Native',
                                avatar: 'https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532',
                            },
                        }

                        setMessages(previousMessages =>
                            GiftedChat.append(previousMessages, newMsg),
                        )
                        setInput("")
                    }}>
                        <Image style={styles.send} source={require('../Assets/Images/Send.png')} />
                    </TouchableOpacity>

                </View>


            </View>
        )
    }
    return (
        <View style={{ backgroundColor: "#E8F1FF", flex: 1 }}>
            <View style={{ marginBottom: hp('2%'), flex: 1 }}>
                <View style={styles.header_view}>
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()} >
                        <AntDesign name="arrowleft" size={30} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.header_text}>Dr. Kelly Rehman</Text>
                    <TouchableOpacity>
                        <Icon name="call" size={20} color="#4E95FF" />
                    </TouchableOpacity>
                    <Icon name="videocam" size={20} color="#4E95FF" />
                </View>
                <GiftedChat
                    renderInputToolbar={send}
                    messages={messages}
                    user={{
                        _id: 2,
                        avatar: 'https://image.lexica.art/full_jpg/7515495b-982d-44d2-9931-5a8bbbf27532',
                    }}

                />
                {show == true && <Emoji />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    header_view: {
        backgroundColor: "white",
        height: hp('10%'),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    header_text: {
        color: "#3A3A3A",
        fontSize: 18,
        width: wp('50%'),
        fontFamily: Fonts.Lato_Semibold
    },

    placeholder: {
        backgroundColor: "white",
        width: wp('90%'),
        alignSelf: "center",
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },

    emoji: {
        resizeMode: "contain",
        height: hp('3%'),
        width: wp('10%'),
        marginHorizontal: wp('-2%')
    },

    link: {
        resizeMode: "contain",
        height: hp('3%'),
        width: wp('10%')
    },

    send_touch: {
        backgroundColor: "#4E95FF",
        borderRadius: 20,
        justifyContent: "center",
        height: hp('4%'),
        width: wp('8%')
    },

    send: {
        resizeMode: "contain",
        marginLeft: wp('0.5%'),
        marginVertical: hp('0.2%')
    },
})

export default Message;