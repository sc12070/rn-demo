import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    rowWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        flex: 1,
        marginRight: 10,
        paddingHorizontal: 10,
        paddingVertical: 0,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    searchBtn: {
        width: 30,
        height: 30
    }
})

export default styles
