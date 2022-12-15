jest.mock('@react-navigation/core', () => {
    return {
        ...jest.requireActual('@react-navigation/core'),
        useNavigation: jest.fn(() => ({}))
    }
})

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome')
