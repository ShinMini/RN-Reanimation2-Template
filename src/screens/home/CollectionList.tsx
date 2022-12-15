/** @format */

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import Spacing from '../../constants/Spacing'
import Colors from '../../constants/Colors'
import { categoryInterface } from '../../data/index'
import RegularText from '../../components/text/RegularText'
import Font from '../../constants/Font'

interface CollectionListProps {
  categoryList: categoryInterface[]
  activeCategory: categoryInterface
  setActiveCategory: (activeCategory: categoryInterface) => void
}
const CollectionList: FC<CollectionListProps> = ({ categoryList, setActiveCategory, activeCategory }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.background,
        marginVertical: Spacing * 2,
      }}>
      <FlatList
        data={categoryList}
        style={{ paddingVertical: Spacing * 2 }}
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              key={item.id.toString()}
              onPress={() => setActiveCategory(item)}
              style={{ paddingHorizontal: Spacing * 3 }}>
              <RegularText
                textStyles={[
                  { color: Colors.gray },
                  activeCategory?.id === item.id && {
                    fontFamily: Font.gilroyBold,
                    color: Colors.text,
                  },
                ]}>
                {item.name}
              </RegularText>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

export default CollectionList
