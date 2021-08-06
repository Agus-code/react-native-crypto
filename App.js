import React from 'react'
import { View, Text, FlatList, StyleSheet, StatusBar, TextInput } from 'react-native'
import CrytoItem from './components/CrytoItem'

const App = () => {

    const [cryptos, setCryptos] = React.useState([])
    const [typed, setTyped] = React.useState('');
    const [cryptosTypes, setCryptosTyped] = React.useState();
    const [loading, setLoading] = React.useState(false);

    const getData = async () => {
        setLoading(true)
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        const data = await res.json();
        setCryptos(data);
        setLoading(false)
    }

    React.useEffect(() => {
        getData()
    }, [])
    React.useEffect(() => {
        setLoading(true)
        let searchedCrypto = [];
        if (typed.length === 0) setCryptosTyped(undefined)
        else {
            cryptos.forEach(coin => {
                if (coin.name.toLowerCase().includes(typed.toLowerCase()) || coin.symbol.toLowerCase().includes(typed.toLowerCase())) {
                    searchedCrypto.push(coin);
                }
            })
            setCryptosTyped(searchedCrypto);
        }
        setLoading(false)
    }, [typed])

    return (
        <View style={Styles.container}>
            <StatusBar backgroundColor="#333" />
            <View style={Styles.header}>
                <Text style={Styles.title}>
                    CryptoNitsu
                </Text>
                <TextInput
                    onChangeText={setTyped}
                    value={typed}
                    style={Styles.search}
                    placeholder="Search"
                />
            </View>
            <FlatList
                style={Styles.list}
                data={cryptosTypes === undefined ? cryptos : cryptosTypes}
                renderItem={({ item }) => {
                    return <CrytoItem coin={item} />
                }}
                showsVerticalScrollIndicator={false}
            />
            {loading && <Text>Cargando</Text>}
        </View>
    )
}

const Styles = StyleSheet.create(
    {
        container: {
            backgroundColor: "#333",
            alignItems: "center",
            flex: 1,
        },
        header: {
            flexDirection: 'row',
            justifyContent: "space-between",
            width: "90%",
            marginBottom: 10
        },
        title: {
            color: "#fff",
            fontSize: 20,
        },
        list: {
            width: "90%"
        },
        search: {
            width: "40%",
            backgroundColor: "#444",
            alignItems: "center",
            textAlign: "center",
            color: "#eee",
            fontSize: 16
        }
    }
)

export default App

