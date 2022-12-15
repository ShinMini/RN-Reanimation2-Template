/** @format */

export interface DonutChartProps {
  strokeWidth: number
  radius?: number
  percentageComplete: SkiaMutableValue<number>
  font: SkFont
  smallerFont: SkFont
  smallText?: string
  targetPercentage: number
}
