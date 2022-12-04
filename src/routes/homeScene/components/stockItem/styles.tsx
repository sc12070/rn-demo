import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    swipeWrapper: {
        width: '110%'
    },
    stockItemWrapper: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 10
    },
    oddWrapper: {
        backgroundColor: '#EEE'
    },
    text: {
        flex: 1,
        color: 'black'
    },
    textInfo: {
        textAlign: 'right'
    },
    priceChange: {
        color: 'black'
    },
    priceChangeMinus: {
        color: 'red'
    },
    priceChangePlus: {
        color: 'green'
    },
    deleteBtn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    deleteBtnLabel: {
        width: '80%',
        backgroundColor: 'red',
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

export default styles
