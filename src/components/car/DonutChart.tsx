/** @format */
/** Skia Lib*/
import { SkFont, Skia, SkiaMutableValue, Canvas, Path, Text, LinearGradient, vec, Group } from '@shopify/react-native-skia'

/** react Lib */
import React from 'react'
import type { FC } from 'react'

/** react-native Lib */
import { StyleSheet } from 'react-native'
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

  const width = font.getTextWidth(targetText)

  return (
    <Canvas style={styles.container}>
      {circleColor && (
        <Group color={circleColor}>
          <Path path={path} style='stroke' strokeWidth={strokeWidth} strokeCap='round' start={0} end={percentageComplete} />
        </Group>
      )}
      {gradientColor.length != 0 && (
        <Group>
          <LinearGradient start={vec(0, 0)} end={vec(radius * 2.2, radius * 2.2)} colors={gradientColor} />
          <Path path={path} style='stroke' strokeWidth={strokeWidth} strokeCap='round' start={0} end={percentageComplete} />
        </Group>
      )}

      <Text
        color={Colors.text}
        x={innerRadius - width / 2 + 5}
        y={radius + strokeWidth}
        text={targetText}
        font={font}
        opacity={percentageComplete}
      />
      <Text
        color={Colors.textGray}
        x={innerRadius - width / 2 + 40}
        y={radius + strokeWidth + 45}
        text={smallText}
        font={smallerFont}
        opacity={percentageComplete}
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
