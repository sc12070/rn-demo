import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    swipeWrapper: {
        width: '110%'
    },
    stockItemWrapper: {
        height: 30,
        justifyContent: 'center',
        flex: 10
    },
    stockItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    oddWrapper: {
        backgroundColor: '#EEE'
    },
    text: {
        flex: 1,
        color: 'black',
        opacity: 0.7
    },
    textInfo: {
        textAlign: 'right'
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
