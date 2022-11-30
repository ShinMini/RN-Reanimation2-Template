/** @format */
import { createSlice } from '@reduxjs/toolkit'
import { CardAnimationActionType as ActionType } from '../action-types'

export const cardAnimationSlice = createSlice({
  name: 'cardAnimation',
  initialState: {
    value: ActionType.REGULAR,
  },
  reducers: {
    setRegular: (state) => {
      state.value = ActionType.REGULAR
    },
    setFlip: (state) => {
      state.value = ActionType.FLIP
    },
  },
})

export const { setRegular, setFlip } = cardAnimationSlice.actions
