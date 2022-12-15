/** @format */
/** Skia Lib*/
import { Skia, Canvas, Path, Text, LinearGradient, vec, Group } from '@shopify/react-native-skia'

/** react Lib */
import React from 'react'
import type { FC } from 'react'

/** react-native Lib */
import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'
import { DonutChartProps } from './type'
import { RADIUS } from '../../../constants/Chart'

interface GradientChartProps extends DonutChartProps {
  gradientColor: string[]
}
export const GradientDonutChart: FC<GradientChartProps> = ({
  strokeWidth,
  percentageComplete,
  font,
  smallerFont,
  smallText = 'Score',
  targetPercentage,

  gradientColor = [],
}) => {
  const innerRadius = RADIUS - strokeWidth / 2.0
  const targetText = `${targetPercentage * 100}`

  const path = Skia.Path.Make()
  path.addCircle(RADIUS, RADIUS, innerRadius)

  const width = font.getTextWidth(targetText)

  return (
    <Canvas style={styles.container}>
      <Group>
        <LinearGradient start={vec(0, 0)} end={vec(RADIUS * 2.2, RADIUS * 2.2)} colors={gradientColor} />
        <Path path={path} style='stroke' strokeWidth={strokeWidth} strokeCap='round' start={0} end={percentageComplete} />
      </Group>

      <Text
        color={Colors.black}
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

export default GradientDonutChart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartText: {
    color: Colors.text,
  },
})
