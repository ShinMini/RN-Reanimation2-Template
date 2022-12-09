/** @format */

// components
import { View, StyleSheet, TouchableOpacity, StyleProp, TextStyle } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import RegularText from './text/RegularText'
import { MotiView, useAnimationState } from 'moti'
import { BlurView as _BlurView } from 'expo-blur'

// redux
import { useDispatch, useSelector } from 'react-redux'

// styles
import Spacing from '../constants/Spacing'
import { Colors } from '../constants/Colors'
import { setDay, setMonth, setWeek, setYear } from '../state/slices/selectedDateSlice'
import { SelectedDateActionType as DateAction } from '../state/action-types/index'
import { RootState } from '../state'
import { setFlip, setRegular } from '../state/slices/cardAnimationSlice'

const SelectDate: React.FC = () => {
  const [isShowDisplay, setIsShowDisplay] = useState(false)

  const nowReduxDate = useSelector<RootState, DateAction>((state) => state.selectedDate.value)
  const dispatch = useDispatch()

  const orderDate = useMemo(() => [DateAction.WEEK, DateAction.DAY, DateAction.MONTH, DateAction.YEAR], [])

  const onPress = useCallback((selectedOption: DateAction) => {
    switch (selectedOption) {
      case DateAction.DAY:
        setDay()
        break
      case DateAction.WEEK:
        setWeek()
        break
      case DateAction.MONTH:
        setMonth()
        break
      case DateAction.YEAR:
        setYear()
        break
    }
    setIsShowDisplay((isShowDisplay) => !isShowDisplay)
  }, [])

  useEffect(() => {
    if (!isShowDisplay) setRegular()
    if (isShowDisplay) setFlip()
  }, [isShowDisplay])

  const animState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.9,
    },
    to: {
      opacity: 1,
      scale: 1,
    },
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onPress(nowReduxDate)}>
        <MotiView style={[styles.blurView, { marginTop: Spacing }]}>
          <RegularText textStyles={{ color: Colors.yellow }}>{nowReduxDate}</RegularText>
        </MotiView>
      </TouchableOpacity>
      {isShowDisplay &&
        orderDate.map((date, index) => {
          if (date == nowReduxDate) return
          return (
            <TouchableOpacity key={index.toString()} onPress={() => onPress(date)}>
              <MotiView state={animState} delay={index * 500} style={styles.blurView}>
                <RegularText textStyles={[styles.textStyle]}>{date}</RegularText>
              </MotiView>
            </TouchableOpacity>
          )
        })}
    </View>
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
