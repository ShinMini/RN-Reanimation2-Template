/** @format */
import { configureStore } from '@reduxjs/toolkit'
import { selectedDateSlice } from './slices/selectedDateSlice'
import { cardAnimationSlice } from './slices/cardAnimationSlice'
import { backgroundSlice } from './slices/backgroundSlice'

export const store = configureStore({
  reducer: {
    selectedDate: selectedDateSlice.reducer,
    cardAnimation: cardAnimationSlice.reducer,
    backgroundScheme: backgroundSlice.reducer,
  },
})

// Can still subscribe to the store
store.subscribe

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
