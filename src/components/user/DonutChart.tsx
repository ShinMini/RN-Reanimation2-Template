/** @format */
/** Skia Lib*/
import {
  SkFont,
  Skia,
  SkiaMutableValue,
  Canvas,
  Path,
  Text,
  LinearGradient,
  vec,
  Group,
  SweepGradient,
  RadialGradient,
} from '@shopify/react-native-skia'

/** react Lib */
import React, { useCallback } from 'react'
import type { FC } from 'react'

/** react-native Lib */
import { Dimensions, StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

interface DonutChartProps {
  strokeWidth: number
  radius: number
  percentageComplete: SkiaMutableValue<number>
  font: SkFont
  smallerFont: SkFont
  smallText?: string
  targetPercentage: number

  circleColor?: string
  gradientColor?: string[]
}

export const DonutChart: FC<DonutChartProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  smallerFont,
  smallText = 'Power',
  targetPercentage,

  circleColor,
  gradientColor = [],
}) => {
  const innerRadius = radius - strokeWidth / 2.0
  const targetText = `${targetPercentage * 100}`

  const path = Skia.Path.Make()
  path.addCircle(radius, radius, innerRadius)

  const textWidth = font.getTextWidth(targetText)

  return (
    <Canvas style={styles.container}>
      {circleColor && (
        <Group color={circleColor}>
          <Path path={path} style='stroke' strokeWidth={strokeWidth} strokeCap='round' start={0} end={percentageComplete} />
        </Group>
      )}
      {gradientColor.length != 0 && (
        <Group>
          <SweepGradient c={vec(radius, radius - strokeWidth / 2)} colors={gradientColor} />
          <Path path={path} style='stroke' strokeWidth={strokeWidth} strokeCap='round' start={0} end={percentageComplete} />
        </Group>
      )}
      <Text color={Colors.text} x={innerRadius - textWidth / 2 + 5} y={radius + strokeWidth} text={targetText} font={font} />
      <Text
        color={Colors.textGray}
        x={innerRadius - textWidth / 2 + 40}
        y={radius + strokeWidth + 45}
        text={smallText}
        font={smallerFont}
      />
    </Canvas>
  )
}

export default DonutChart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartText: {
    color: Colors.text,
  },
})
