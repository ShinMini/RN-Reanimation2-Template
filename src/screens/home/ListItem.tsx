/** @format */

import { View, Text, ViewToken } from 'react-native'
import React, { memo } from 'react'
import type { FC } from 'react'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { cardInterface } from '../../data/'

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>
  cards: cardInterface
}
const ListItem: FC<ListItemProps> = ({ viewableItems, cards }) => {
  const rStyle = useAnimatedStyle(() => {
    const isVisible = Boolean(
      viewableItems.value.filter((item) => item.isViewable).find((viewableItem) => viewableItem.item.id === cards.id)
    )
    return {
      opacity: withTiming(isVisible ? 1 : 0),
    }
  }, [])
  return (
    <Animated.View
      style={[
        {
          height: 80,
          width: '90%',
          backgroundColor: '#78CAD2',
          alignSelf: 'center',
          borderRadius: 15,
          marginTop: 15,
        },
        rStyle,
      ]}
    />
  )
}

export default memo(ListItem)
