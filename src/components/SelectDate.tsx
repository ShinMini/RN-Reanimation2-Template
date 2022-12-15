/** @format */

// components
import { View, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from 'react-native'
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react'
import RegularText from './text/RegularText'
import { MotiView, useAnimationState } from 'moti'
import { BlurView as _BlurView } from 'expo-blur'

import Animated from 'react-native-reanimated'

// styles
import Spacing from '../constants/Spacing'
import Colors from '../constants/Colors'
import { setDay, setMonth, setWeek, setYear, selectedDateSlice } from '../state/slices/selectedDateSlice'
import { CardAnimationActionType as CardAction, SelectedDateActionType as DateAction } from '../state/action-types/index'

const DATE_DATA = [DateAction.DAY, DateAction.WEEK, DateAction.MONTH, DateAction.YEAR]

// Main component
interface SelectDateProps {
  activeDate: DateAction
  setActiveDate: (activeDate: DateAction) => void

  showDateList: boolean
  toggleBtn: () => void
}

const SelectDate: FC<SelectDateProps> = ({ activeDate, setActiveDate, toggleBtn, showDateList }) => {
  const selectDate = useCallback((date: DateAction) => {
    setActiveDate(date)
    toggleBtn()
  }, [])

  return (
    <Animated.View style={styles.container}>
      <TouchableOpacity onPress={() => toggleBtn()}>
        <MotiView style={[styles.blurView, { marginTop: Spacing }]}>
          <RegularText textStyles={{ color: Colors.yellow }}>{activeDate}</RegularText>
        </MotiView>
      </TouchableOpacity>
      {showDateList &&
        DATE_DATA.filter((date) => date !== activeDate).map((date, index) => (
          <MotiView
            key={index.toString()}
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            delay={index * 100}
            style={styles.blurView}>
            <TouchableOpacity onPress={() => selectDate(date)}>
              <RegularText textStyles={[styles.textStyle]}>{date}</RegularText>
            </TouchableOpacity>
          </MotiView>
        ))}
    </Animated.View>
  )
}

export default SelectDate

/// styling
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    right: 1,
    flexDirection: 'column',
    zIndex: 101,
  },
  blurView: {
    width: Spacing * 12,
    height: Spacing * 4,
    alignItems: 'center',
  },
  textStyle: {
    color: Colors.text,
  },
})
