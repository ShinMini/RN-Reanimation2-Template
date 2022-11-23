/** @format */

import {StatusBar} from 'expo-status-bar'
import {Animated, StyleSheet, Text, View} from 'react-native'

// user components
import HorizontalView from './src/components/HorizontalView'

export default function App() {
    return (
        <Animated.View style={styles.container}>
            <StatusBar hidden />
            <HorizontalView />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
