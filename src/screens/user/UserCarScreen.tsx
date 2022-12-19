/** @format */

/** react */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'

/** react-native components */
import { PixelRatio, Pressable, ScrollView, StyleSheet, View } from 'react-native'

/**  use Skia lib */
import { useFont, Easing, useValue, useSharedValueEffect } from '@shopify/react-native-skia'
import LoadingView from '../../components/LoadingView'

/** Donut Chart components */
import DonutChart from '../../components/user/DonutChart'

/** navigation*/
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types'

/** for styling */
import { Colors } from '../../constants/Colors'
import userCar from './../../assets/images/user/car-sample.png'
import RegularText from '../../components/text/RegularText'
import Font from '../../constants/Font'
import CardView, { Card } from '../../components/user/CardView'

import Animated, { useAnimatedStyle, withTiming, useSharedValue, runOnJS } from 'react-native-reanimated'
/** declare static consistent */
const RADIUS = PixelRatio.roundToNearestPixel(130)
const STROKE_WIDTH = 24

/** consistent that indicate donut chart percentage */
const percentageComplete = 0.65
const myCarScore = 0.79
const predictedCharge = 40

/** create styled components */
const CARD_SIZE = RADIUS * 5
const CONTENT_HEIGHT = CARD_SIZE * 3 + RADIUS

const carScoreColors = ['#df4721', '#F4A261', '#E9C46A', '#99e665', '#2A9D8F', '#264653']

/** navigator type config */
type UserCarScreenProps = NativeStackScreenProps<RootStackParamList, 'UserCarScreen'>

const UserCarScreen: FC<UserCarScreenProps> = (props, { navigation, route }) => {
  const [gradientColors, setGradientColors] = useState(carScoreColors)
  /** variable  about user car */
  const userInfo = props.route.params.userInfo

  /** fonts for Skia Text */
  const regularRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Bold.ttf'), 60)
  const smallerJuaFont = useFont(require('./../../assets/fonts/Jua-Regular.ttf'), 25)
  const digitFont = useFont(require('./../../assets/fonts/ZenDots-Regular.ttf'), 85)
  const smallFont = useFont(require('./../../assets/fonts/Play/Play-Regular.ttf'), 30)

  // 자동차 충전 차트 애니메이션
  const skiaCharge = useValue(0)
  const reAnimCharge = useSharedValue(0)

  const chargePercentAnim = useCallback(() => {
    'worklet'
    reAnimCharge.value = withTiming(percentageComplete)
  }, [])
  useSharedValueEffect(() => {
    skiaCharge.current = reAnimCharge.value
  }, reAnimCharge)

  // 내 자동차 점수 차트 애니메이션
  const reMyCarScore = useSharedValue(0)
  const skiaMyCarScore = useValue(0)

  const myCarScoreAnim = useCallback(() => {
    'worklet'
    fadeAnim.value = withTiming(RADIUS * 2)
    reMyCarScore.value = withTiming(myCarScore, { duration: 1500 })
  }, [])
  useSharedValueEffect(() => {
    skiaMyCarScore.current = reMyCarScore.value
  }, reMyCarScore)

  useEffect(() => {
    if (myCarScore == 1.0) setGradientColors((prev) => (prev = ['#99e665', '#6AAD5F', '#269663']))
    else setGradientColors((prev) => (prev = carScoreColors))
  }, [myCarScore])

  // 기본 자동차 점수 컨테이너 애니메이션
  const fadeAnim = useSharedValue(0)
  const rScoreContainer = useAnimatedStyle(() => {
    return {
      height: fadeAnim.value,
    }
  }, [fadeAnim])

  /** if don't load the fonts */
  if (!regularRobotoFont || !smallerJuaFont || !digitFont || !smallFont) {
    return <LoadingView text='로딩중입니다 :)' />
  }
  chargePercentAnim()

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer]}>
      <CardView
        userName={userInfo?.name}
        radius={RADIUS}
        mainText={userInfo.car}
        imageSourceUri={userCar}
        contentText='Mini Cooper _BMW'
        commentText='Lorem ipsum dolor sit amet consectetur adipisicing elit.'
        backgroundColor='#cdb4db'
      />

      <Card style={{ backgroundColor: '#173b4c' }}>
        <View style={[styles.donutChartContainer]}>
          <DonutChart
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={skiaCharge}
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
          <RegularText textStyles={{ color: Colors.grayDark, fontFamily: Font.gilroyMedium, fontWeight: '700' }}>
            내 자동차 종합 점수 확인하기
          </RegularText>
          <Pressable onPress={myCarScoreAnim} style={styles.btn}>
            <RegularText textStyles={{ fontSize: 23, fontFamily: Font.gilroyBold }}>내 자동차 점수는?</RegularText>
          </Pressable>

          <Animated.View style={[styles.donutChartContainer, rScoreContainer]}>
            <DonutChart
              radius={RADIUS}
              strokeWidth={25}
              percentageComplete={skiaMyCarScore}
              targetPercentage={myCarScore}
              font={digitFont}
              smallerFont={smallerJuaFont}
              gradientColor={gradientColors}
              smallText={`상위${Math.round(myCarScore / 0.17)}%`}
            />
          </Animated.View>
        </Card>
      </Animated.View>

      <CardView
        radius={RADIUS}
        mainText={userInfo.name}
        contentText='Mini Cooper _BMW'
        commentText='Lorem ipsum dolor sit amet consectetur adipisicing elit.
         Delectus repudiandae impedit vero voluptates quidem,
         praesentium quia quas dolorum ducimus ullam minima qui facilis nostrum dignissimos quam deleniti?
         Commodi, recusandae nulla.'
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
    marginVertical: 30,
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
    marginVertical: 25,
    backgroundColor: Colors.yellow,
    padding: 23,

    borderRadius: 15,
  },
})
