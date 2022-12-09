/** @format */
import 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state'
import { BackgroundColorType } from '../state/action-types/index'

export const DarkColors = {
  light: 'FFD6BA',
  lightText: '#9CA0A6',
  darkText: '#1B1E28',
  lightBackground: '#E4E4E4',
  gray: '#d1d5db',
  grayLight: '#C3C4C6',
  grayDark: '#4B5563',
  accent: '#fbcd77',
  secondary: '#232323',
  tertiary: '#85c6d8',
  onPrimary: 'rgb(255, 255, 255)',
  primaryContainer: 'rgb(234, 234, 0)',

  background: '000000',
  cardBackground: '14213d',

  lightCardBackground: '6d597a',
  lightGray: 'e5e5e5',

  yellow: '#ffc300',
  text: 'ffffff',
}
export const LightColors = {
  light: 'FFD6BA',
  lightText: '#9CA0A6',
  darkText: '#1B1E28',
  lightBackground: '#E4E4E4',
  gray: '#d1d5db',
  grayLight: '#C3C4C6',
  grayDark: '#4B5563',
  accent: '#fbcd77',
  secondary: '#232323',
  tertiary: '#85c6d8',
  onPrimary: 'rgb(255, 255, 255)',
  primaryContainer: 'rgb(234, 234, 0)',

  background: '555b6e',
  cardBackground: '89b0ae',

  lightCardBackground: 'bee3db',
  lightGray: 'faf9f9',

  yellow: '#ffd60a',
  text: '101010',
}

export type ColorType = typeof DarkColors | typeof LightColors

const nowColors = useSelector<RootState, BackgroundColorType>((state) => state.backgroundScheme.value)

export let Colors = DarkColors
switch (nowColors) {
  case BackgroundColorType.DARK:
    Colors = DarkColors
    Colors = DarkColors
  case BackgroundColorType.LIGHT:
    Colors = LightColors
    break
  default:
    Colors = LightColors
}
