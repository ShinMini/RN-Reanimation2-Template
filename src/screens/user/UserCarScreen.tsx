/** @format */

/** react */
import React from 'react'
import type { FC } from 'react'

/** react-native components */
import { PixelRatio, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'

/**  use Skia lib */
import { useFont, Easing, runTiming, useValue } from '@shopify/react-native-skia'
import LoadingView from '../../components/LoadingView'

/** Donut Chart components */
import DonutChart from '../../components/DonutChart'

/** navigation*/
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types'

/** for styling */
import styled from 'styled-components/native'
import Layout from '../../constants/Layout'
import Colors from '../../constants/Colors'

/** navigator type config */
type UserCarScreenProps = NativeStackScreenProps<RootStackParamList, 'UserCarScreen'>

/** declare static consistent */
const RADIUS = PixelRatio.roundToNearestPixel(130)
const STROKE_WIDTH = 15

/** create styled components */
const { width, height } = Layout.window
const CardView = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.grayLight};
  padding: 40px;

  border-radius: 25px;
`

const UserCarScreen: FC<UserCarScreenProps> = ({ navigation, route }) => {
  /** consistent that indicate donut chart percentage */
  const percentageComplete = 0.85
  const animationState = useValue(0)

  const regularRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Bold.ttf'), 60)
  const smallerRobotoFont = useFont(require('./../../assets/fonts/Roboto/Roboto-Regular.ttf'), 20)

  const animateChart = () => {
    animationState.current = 0

    runTiming(animationState, percentageComplete, {
      duration: 1250,
      easing: Easing.inOut(Easing.cubic),
    })
  }

  /** if don't load the fonts */
  if (!regularRobotoFont || !smallerRobotoFont) {
    return <LoadingView text='Load the fonts !' />
  }
  animateChart()

  return (
    <ScrollView style={styles.container} contentContainerStyle={[styles.contentContainer]}>
      <CardView>
        <View style={styles.donutChartContainer}>
          <DonutChart
            radius={RADIUS}
            strokeWidth={STROKE_WIDTH}
            percentageComplete={animationState}
            targetPercentage={percentageComplete}
            font={regularRobotoFont}
            smallerFont={smallerRobotoFont}
          />
        </View>
        <Pressable onPress={animateChart} style={styles.btn}>
          <Text>Animate !</Text>
        </Pressable>
      </CardView>
    </ScrollView>
  )
}

export default UserCarScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  donutChartContainer: {
    height: RADIUS * 2,
    width: RADIUS * 2,
  },
  btn: {
    marginTop: 40,
    backgroundColor: 'orange',
    paddingHorizontal: 60,
    paddingVertical: 15,

    borderRadius: 15,
  },
})
