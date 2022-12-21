import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    bg: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    priceWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'black',
        height: 30
    },
    title: {
        height: 40,
        fontSize: 24,
        fontWeight: '700'
    }
})

export default styles
