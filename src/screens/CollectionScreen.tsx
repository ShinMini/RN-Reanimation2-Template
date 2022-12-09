/** @format */

// Inspiration: https://dribbble.com/shots/14139308-Simple-Scroll-Animation
// Illustrations by: SAMji https://dribbble.com/SAMji_illustrator

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import * as React from 'react'
import { StatusBar, Image, Animated, View, Dimensions, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { RootStackParamList } from '../../types'
import ChevronIcon from '../components/icon/ChevronIcon'
import RegularBlurView from '../components/view/RegularBlurView'
import { Colors } from '../constants/Colors'
import Spacing from '../constants/Spacing'
const { width, height } = Dimensions.get('screen')

const data = [
  'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/11205211/media/44c854b0a6e381340fbefe276e03e8e4.jpg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/6727912/samji_illustrator.jpeg?compress=1&resize=1200x1200',
  'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
]

const imageW = width * 0.7
const imageH = imageW * 1.54
const BUTTON_SIZE = Spacing * 7

type CollectionScreenProps = NativeStackScreenProps<RootStackParamList, 'CollectionScreen'>

const CollectionScreen: React.FC<CollectionScreenProps> = ({ navigation: { goBack, navigate }, route }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current
  return (
    <View style={styles.horizontalMainView}>
      <View style={StyleSheet.absoluteFill}>
        {data.map((image, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          })
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{
                uri: image,
              }}
              style={[StyleSheet.absoluteFillObject, { opacity }]}
              blurRadius={50}
            />
          )
        })}
      </View>

      <Animated.FlatList
        data={data}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {
            useNativeDriver: true,
          }
        )}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <SafeAreaView style={styles.renderView}>
              <Animated.Image
                source={{
                  uri: item,
                }}
                style={styles.renderImage}
              />
            </SafeAreaView>
          )
        }}
      />
      <TouchableOpacity onPress={() => goBack()}>
        <RegularBlurView
          blurViewStyle={{
            height: BUTTON_SIZE,
            width: BUTTON_SIZE,
            borderRadius: BUTTON_SIZE / 2,
            position: 'absolute',
            left: Spacing,
            bottom: Dimensions.get('screen').height - 150,
          }}>
          <ChevronIcon color={Colors.darkText} />
        </RegularBlurView>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  horizontalMainView: {
    flex: 1,
    backgroundColor: '#000',
  },
  renderView: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  renderImage: {
    width: imageW,
    height: imageH,
    resizeMode: 'cover',
    borderRadius: 16,
  },
})

export default CollectionScreen
