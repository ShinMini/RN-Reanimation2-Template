/** @format */

/** react */
import React from 'react'
import type { FC } from 'react'

/** react-native components */
import { Animated, PixelRatio, Pressable, ScrollView, StyleSheet, View } from 'react-native'

/**  use Skia lib */
import { useFont, Easing, runTiming, useValue, SkiaView } from '@shopify/react-native-skia'
import LoadingView from '../../components/LoadingView'

/** Donut Chart components */
import DonutChart from '../../components/car/DonutChart'

/** navigation*/
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types'

/** for styling */
import { Colors } from '../../constants/Colors'
import userCar from './../../assets/images/user/car-sample.png'
import RegularText from '../../components/text/RegularText'
import Font from '../../constants/Font'
import CardView, { Card } from '../../components/car/CardView'
import { MotiView, useAnimationState } from 'moti'

/** declare static consistent */
const RADIUS = PixelRatio.roundToNearestPixel(130)
const STROKE_WIDTH = 24

/** create styled components */
const CARD_SIZE = RADIUS * 4

const CONTENT_HEIGHT = CARD_SIZE * 3 + RADIUS

/** navigator type config */
type UserCarScreenProps = NativeStackScreenProps<RootStackParamList, 'UserCarScreen'>

const UserCarScreen: FC<UserCarScreenProps> = (props, { navigation, route }) => {
  /** consistent that indicate donut chart percentage */
  const percentageComplete = 0.85
  const myCarComplete = 0.65

  /** animation variable (Skia) */
  const chargeAnimState = useValue(0)
  const carStatusAnimState = useValue(0)

  const fadeAnim = React.useRef(new Animated.Value(0)).current
  const transitionAnim = React.useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start()
  }

  /** variable  about user car */
  const userInfo = props.route.params.userInfo
  const predictedCharge = 40

  /** fonts for Skia Text */
  const regularRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Bold.ttf'), 60)
  const smallerRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Regular.ttf'), 25)
  const digitFont = useFont(require('./../../assets/fonts/ZenDots-Regular.ttf'), 85)
  const smallFont = useFont(require('./../../assets/fonts/Play/Play-Regular.ttf'), 30)

  const chargePercentageAnim = React.useCallback(() => {
    chargeAnimState.current = 0

    runTiming(chargeAnimState, percentageComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    })
  }, [])

  const myCarScoreAnim = React.useCallback(() => {
    fadeIn()
    carStatusAnimState.current = 0

    runTiming(carStatusAnimState, myCarComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    })
  }, [])
  /** if don't load the fonts */
  if (!regularRobotoFont || !smallerRobotoFont || !digitFont || !smallFont) {
    return <LoadingView text='로딩중입니다 :)' />
  }
  chargePercentageAnim()

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer]}>
      <CardView
        radius={RADIUS}
        mainText={userInfo.car}
        imageSourceUri={userCar}
        contentText='BMW'
        commentText='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        backgroundColor='#cdb4db'
      />

      <Card style={{ backgroundColor: '#173b4c' }}>
        <View style={[styles.donutChartContainer]}>
          <DonutChart
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={chargeAnimState}
            targetPercentage={percentageComplete}
            font={digitFont}
            smallerFont={smallFont}
            circleColor={Colors.yellow}
          />
        </View>
        <RegularText textStyles={{ fontSize: 27 }}>완충까지 약 {predictedCharge}분</RegularText>
      </Card>

      <Animated.View>
        <Card style={{ backgroundColor: '#9dc3c2' }}>
          <Pressable onPress={myCarScoreAnim} style={styles.btn}>
            <RegularText textStyles={{ fontSize: 27, fontFamily: Font.gilroyBold }}>내 차 점수 확인</RegularText>
          </Pressable>
          <Animated.View style={[styles.donutChartContainer, { transform: [{ scale: fadeAnim }] }]}>
            <DonutChart
              radius={RADIUS}
              strokeWidth={25}
              percentageComplete={carStatusAnimState}
              targetPercentage={myCarComplete}
              font={digitFont}
              smallerFont={smallFont}
              gradientColor={[Colors.green, Colors.yellow]}
            />
          </Animated.View>
        </Card>
      </Animated.View>

      <CardView
        radius={RADIUS}
        mainText={userInfo.name}
        contentText='Mini Cooper _BMW'
        commentText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus repudiandae impedit vero voluptates quidem, praesentium quia quas dolorum ducimus ullam minima qui facilis nostrum dignissimos quam deleniti? Commodi, recusandae nulla.'
        backgroundColor='#76c893'
      />
    </ScrollView>
  )
}

export default UserCarScreen

const styles = StyleSheet.create({
  container: {
    display: 'flex',

    flexDirection: 'column',
    marginTop: 35,
  },
  contentContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',

    height: CONTENT_HEIGHT,
  },
  carImage: {
    height: '50%',
    width: '88%',
  },
  donutChartContainer: {
    height: RADIUS * 2,
    width: RADIUS * 2.2,
    left: RADIUS * 0.1,
    marginBottom: 30,
  },
  carCard: {
    height: RADIUS * 2.2,
    width: RADIUS * 2,
  },
  btn: {
    backgroundColor: 'orange',
    paddingHorizontal: 60,
    paddingVertical: 25,

    borderRadius: 15,
  },
})
