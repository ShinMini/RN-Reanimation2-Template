/** @format */

/** react */
import React, { useCallback, useEffect, useState } from 'react'
import type { FC } from 'react'

/** react-native components */
import { PixelRatio, Pressable, ScrollView, StyleSheet, View } from 'react-native'

/**  use Skia lib */
import { useFont, Easing, runTiming, useValue, useSharedValueEffect, useTiming } from '@shopify/react-native-skia'
import LoadingView from '../../components/LoadingView'

/** Donut Chart components */
import DonutChart from '../../components/user/Chart/DonutChart'
import GradientDonutChart from '../../components/user/Chart/GradientDonutChart'

/** navigation*/
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types'

/** ReAnimated */
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnUI,
  interpolate,
  runOnJS,
  withSpring,
} from 'react-native-reanimated'

/** for styling */
import { Colors } from '../../constants/Colors'
import userCar from './../../assets/images/user/car-sample.png'
import RegularText from '../../components/text/RegularText'
import Font from '../../constants/Font'
import CardView, { Card, CardImage } from '../../components/user/CardView'
import { CONTENT_HEIGHT, RADIUS, STROKE_WIDTH } from '../../constants/Chart'
import BigText from '../../components/text/BigText'
import SmallText from '../../components/text/SmallText'
import { MotiView } from 'moti'

/** consistent that indicate donut chart percentage */
const predictedCharge = 40
const percentageComplete = 0.85
const myCarComplete = 0.65

/** navigator type config */
type UserCarScreenProps = NativeStackScreenProps<RootStackParamList, 'UserCarScreen'>

const UserCarScreen: FC<UserCarScreenProps> = (props, { navigation, route }) => {
  const [pressedBtn, setBtnDisplay] = useState(false)
  /** fonts for Skia Text */
  const regularRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Bold.ttf'), 60)
  const smallerRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Regular.ttf'), 25)
  const digitFont = useFont(require('./../../assets/fonts/ZenDots-Regular.ttf'), 85)
  const smallFont = useFont(require('./../../assets/fonts/Play/Play-Regular.ttf'), 30)

  /** variable  about user car */
  const userInfo = props.route.params.userInfo

  /** skia variable (Skia) */
  const chargeStatus = useValue(0)
  const carScore = useValue(0)

  /** charge status animation */
  const chargeChartAnim = useCallback(() => {
    chargeStatus.current = 0
    runTiming(chargeStatus, percentageComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    })
  }, [])

  /** button animation style  */
  const BTN_HEIGHT = useSharedValue(150)

  /** score card animation */
  const SCORECARD_HEIGHT = useSharedValue(0)
  const showScoreCard = useCallback(() => {
    'worklet'
    runOnJS(() => setBtnDisplay(true))()
    runTiming(carScore, percentageComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    })

    SCORECARD_HEIGHT.value = withTiming(RADIUS * 2.2)
    BTN_HEIGHT.value = withTiming(0)
  }, [])

  /** reAnimated Style  */
  const rScoreCardStyle = useAnimatedStyle(() => {
    return { height: SCORECARD_HEIGHT.value }
  }, [SCORECARD_HEIGHT])

  const rScoreBtnStyle = useAnimatedStyle(() => {
    return {
      opacity: BTN_HEIGHT.value,
    }
  }, [BTN_HEIGHT])

  /** if don't load the fonts */
  if (!regularRobotoFont || !smallerRobotoFont || !digitFont || !smallFont) {
    return <LoadingView text='로딩중입니다 :)' />
  }
  chargeChartAnim()

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer]}>
      <Card>
        <BigText textStyles={{ color: Colors.deepGreen, fontSize: 40 }}>{userInfo.car}</BigText>
        <CardImage source={userCar} />
        <RegularText
          textStyles={{ color: Colors.darkText, fontSize: 27, fontWeight: '700', alignSelf: 'flex-start', margin: 10 }}>
          BMW
        </RegularText>
        <SmallText> Lorem ipsum dolor sit amet consectetur adipisicing elit. </SmallText>
      </Card>

      <Card style={{ backgroundColor: '#173b4c', height: RADIUS * 3 }}>
        <Animated.View style={[styles.donutChartContainer]}>
          <DonutChart
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={chargeStatus}
            targetPercentage={percentageComplete}
            font={digitFont}
            smallerFont={smallFont}
            circleColor={Colors.yellow}
          />
        </Animated.View>
        <RegularText textStyles={{ fontSize: 27 }}>완충까지 약 {predictedCharge}분</RegularText>
      </Card>

      <Animated.View>
        <Card style={{ backgroundColor: '#9dc3c2' }}>
          <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {pressedBtn ? (
              <BigText textStyles={{ marginBottom: 25, color: Colors.black, fontWeight: '700' }}>나의 자동차 Score</BigText>
            ) : (
              <Pressable onPress={showScoreCard} style={[styles.btn]}>
                <RegularText textStyles={{ fontSize: 27, fontFamily: Font.gilroyBold }}>내 차 점수 확인</RegularText>
              </Pressable>
            )}
          </MotiView>
          <Animated.View style={[styles.donutChartContainer, rScoreCardStyle]}>
            <GradientDonutChart
              radius={RADIUS}
              strokeWidth={25}
              percentageComplete={carScore}
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
    marginTop: 40,
  },
  contentContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
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
  cardImage: {
    height: '50%',
    width: '88%',
  },
})
