/** @format */
/** Skia Lib*/
import { SkFont, Skia, SkiaMutableValue, Canvas, Path, Text } from '@shopify/react-native-skia'

/** react Lib */
import React from 'react'
import type { FC } from 'react'

/** react-native Lib */
import { StyleSheet } from 'react-native'
import { Colors } from '../constants/Colors'

interface DonutChartProps {
  strokeWidth: number
  radius: number
  percentageComplete: SkiaMutableValue<number>
  font: SkFont
  smallerFont: SkFont
  targetPercentage: number
}

export const DonutChart: FC<DonutChartProps> = ({
  strokeWidth,
  radius,
  percentageComplete,
  font,
  smallerFont,
  targetPercentage,
}) => {
  const innerRadius = radius - strokeWidth / 2
  const targetText = `${targetPercentage * 100}`

  const path = Skia.Path.Make()
  path.addCircle(radius, radius, innerRadius)

  const width = font.getTextWidth(targetText)

  return (
    <Canvas style={styles.container}>
      <Path
        path={path}
        color={Colors.yellow}
        style='stroke'
        strokeWidth={strokeWidth}
        strokeCap='round'
        start={0}
        end={percentageComplete}
      />
      <Text x={innerRadius - width / 2 + 7} y={radius + strokeWidth} text={targetText} font={font} opacity={percentageComplete} />
      <Text
        x={innerRadius - width / 2 + 12}
        y={radius + strokeWidth + 33}
        text='Power'
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
