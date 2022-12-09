/** @format */
import { createSlice } from '@reduxjs/toolkit'
import { BackgroundColorType as ActionType } from '../action-types'

export const backgroundSlice = createSlice({
  name: 'backgroundSlice',
  initialState: {
    value: ActionType.DARK,
  },
  reducers: {
    setDark: (state) => {
      state.value = ActionType.DARK
    },
    setLight: (state) => {
      state.value = ActionType.LIGHT
    },
  },
})

export const { setDark, setLight } = backgroundSlice.actions
