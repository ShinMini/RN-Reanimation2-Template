/** @format */
import { createSlice } from '@reduxjs/toolkit'
import { SelectedDateActionType as ActionType } from '../action-types'

export const selectedDateSlice = createSlice({
  name: 'selectedDate',
  initialState: {
    value: ActionType.DAY,
  },
  reducers: {
    setDay: (state) => {
      state.value = ActionType.DAY
    },
    setWeek: (state) => {
      state.value = ActionType.WEEK
    },
    setMonth: (state) => {
      state.value = ActionType.MONTH
    },
    setYear: (state) => {
      state.value = ActionType.YEAR
    },
  },
})

export const { setDay, setWeek, setMonth, setYear } = selectedDateSlice.actions
