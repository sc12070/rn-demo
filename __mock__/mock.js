const navigationMock = {
    navigate: jest.fn(),
    reset: jest.fn()
}

const useNavigationMock = () => navigationMock

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper')

jest.mock('@react-navigation/core', () => {
    return {
        ...jest.requireActual('@react-navigation/core'),
        useNavigation: useNavigationMock
    }
})

jest.mock('react-native-vector-icons/FontAwesome', () => 'FontAwesome')
