/** @format */
/** Skia Lib*/
import { SkFont, Skia, SkiaMutableValue, Canvas, Path, Text, LinearGradient, vec, Group } from '@shopify/react-native-skia'

/** react Lib */
import React from 'react'
import type { FC } from 'react'

/** react-native Lib */
import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { DonutChartProps } from './type'
import { RADIUS } from '../../../constants/Chart'

interface ColorDonutChart extends DonutChartProps {
  circleColor?: string
}

export const DonutChart: FC<ColorDonutChart> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  smallerFont,
  smallText = 'Power',
  targetPercentage,

  circleColor = Colors.yellow,
}) => {
  const innerRadius = RADIUS - strokeWidth / 2.0
  const targetText = `${targetPercentage * 100}`

  const path = Skia.Path.Make()
  path.addCircle(RADIUS, RADIUS, innerRadius)

  const width = font.getTextWidth(targetText)

  return (
    <Canvas style={styles.container}>
      <Group color={circleColor}>
        <Path path={path} style='stroke' strokeWidth={strokeWidth} strokeCap='round' start={0} end={percentageComplete} />
      </Group>

      <Text
        color={Colors.text}
        x={innerRadius - width / 2 + 5}
        y={RADIUS + strokeWidth}
        text={targetText}
        font={font}
        opacity={percentageComplete}
      />
      <Text
        color={Colors.textGray}
        x={innerRadius - width / 2 + 40}
        y={RADIUS + strokeWidth + 45}
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
