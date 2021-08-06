import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const CrytoItem = ({ coin }) => {
    return (
        <View style={Styles.item}>
            <View style={Styles.nameImg}>
                <Image
                    source={{ uri: coin.image }}
                    style={Styles.img}
                />
                <View>
                    <Text style={Styles.text}>{coin.name}</Text>
                    <Text style={Styles.subText}>{coin.symbol}</Text>
                </View>
            </View>
            <View style={Styles.values}>
                <Text style={Styles.price}>${coin.current_price}</Text>
                <Text style={coin.price_change_percentage_24h > 0 || coin.price_change_percentage_24h === 0 ? Styles.percentageHigh : Styles.percentageLow}>{coin.price_change_percentage_24h}%</Text>
            </View>
        </View>
    )
}

const Styles = StyleSheet.create(
    {
        item: {
            paddingTop: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottomWidth: 1,
            borderBottomColor: "#444",
            paddingBottom: 10
        },
        nameImg: {
            flexDirection: "row",
            alignItems: "center"
        },
        text: {
            color: "#fff",
            paddingLeft: 5
        },
        subText: {
            color: "#aaa",
            paddingLeft: 5,
            fontSize: 13,

        },
        price: {
            color: "#fff",
            textAlign: "right"
        },
        img: {
            height: 30,
            width: 30,
            borderRadius: 15
        },
        percentageHigh: {
            color: "#4c4",
            textAlign: "right"
        },
        percentageLow: {
            color: "#c44",
            textAlign: "right"
        }
    }
)

export default CrytoItem
