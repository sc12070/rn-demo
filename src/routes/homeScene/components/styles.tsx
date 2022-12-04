import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    bg: {
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 20,
        backgroundColor: 'white'
    },
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    searchBtn: {
        width: 30,
        height: 30
    },
    stockListWrapper: {
        marginTop: 20,
        marginBottom: 5
    },
    text: {
        flex: 1,
        color: 'black'
    },
    textInfo: {
        textAlign: 'right'
    }
})

export default styles
