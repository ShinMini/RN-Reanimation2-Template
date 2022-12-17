/** @format */

// prettier-ignore
import { Text, StyleSheet, ImageBackground, Platform, SafeAreaView, ViewToken, FlatList, } from "react-native";
import React, { useCallback, useEffect, useMemo, useState, memo } from 'react'
import Spacing from '../../constants/Spacing'

// prettier-ignore
import { categories, categoryInterface, collectionInterface, collections, user } from '../../data'
import Font from '../../constants/Font'
import Layout from '../../constants/Layout'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types'

// user components
import RegularText from '../../components/text/RegularText'
import WideSpacingView from '../../components/view/WideSpacingView'
import SelectDate from '../../components/SelectDate'

import SideNavbar from '../../navigation/SideNavbar'
import Animated, { useSharedValue } from 'react-native-reanimated'
import TopNavbar from '../../navigation/TopNavbar'
import CollectionList from './CollectionList'
import { SelectedDateActionType as DateActionType } from '../../state/action-types/index'
import ListItem from './ListItem'

const BackgroundImage = Animated.createAnimatedComponent(ImageBackground)
const data = new Array(50).fill(0).map((_, index) => ({ id: index }))

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation: { navigate } }) => {
  const categoryList = useMemo(() => categories, [categories])
  const collectionList = useMemo(() => collections, [collections])

  const [activeCategory, setActiveCategory] = useState<categoryInterface>(categories[0])
  const [activeSideBar, setActiveSideBar] = useState(false)

  // collections
  const [displayCollection, setDisplayCollection] = useState<collectionInterface>(collections[0])
  const selectedCards = useMemo(() => displayCollection.cards, [displayCollection])

  // Date list toggle
  const [activeDate, setActiveDate] = useState<DateActionType>(DateActionType.DAY)
  const [showDateList, toggleDateList] = useState(false)
  const dateListToggleBtn = useCallback(() => {
    toggleDateList((prev) => !prev)
  }, [])

  // FlatList ViewableItems
  const viewableItems = useSharedValue<ViewToken[]>([])

  useEffect(() => {
    const selectedCategory = collectionList[activeCategory.id - 1]
    setDisplayCollection((prevCollection) => (prevCollection = selectedCategory))
    return () => {
      setDisplayCollection(collectionList[0])
    }
  }, [activeCategory])

  const menuToggleBtn = useCallback(() => {
    setActiveSideBar((prevState) => !prevState)
  }, [])

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? Spacing * 4 : 0 }}>
      {activeSideBar && <SideNavbar menuToggleBtn={() => menuToggleBtn()} />}
      <TopNavbar menuToggleBtn={() => menuToggleBtn()} userInfo={user} />

      <CollectionList categoryList={categoryList} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

      <WideSpacingView viewStyles={{ paddingVertical: Spacing * 1 }}>
        <RegularText>{activeCategory?.name} collections</RegularText>
        <SelectDate
          activeDate={activeDate}
          setActiveDate={setActiveDate}
          showDateList={showDateList}
          toggleBtn={dateListToggleBtn}
        />
      </WideSpacingView>

      <FlatList
        data={displayCollection.cards}
        contentContainerStyle={styles.cardContainer}
        renderItem={({ item, index }) => {
          return (
            <BackgroundImage
              borderRadius={10}
              source={item.image}
              style={[styles.cardView, { top: index * 30, zIndex: 30 - index, width: CARD_SIZE - index * 30 }]}
              key={`Image_${item.id.toString()}`}>
              <Text>{item.name}</Text>
            </BackgroundImage>
          )
        }}
      />

      {/* <Animated.View style={[styles.cardContainer]}>
        {displayCollection.cards.map(({ image, id, name }, index) => (
          <BackgroundImage
            borderRadius={10}
            source={image}
            style={[styles.cardView, { top: index * 30, zIndex: 30 - index, width: CARD_SIZE - index * 30 }]}
            key={`Image_${id.toString()}`}>
            <Text>{name}</Text>
          </BackgroundImage>
        ))}
      </Animated.View> */}
    </SafeAreaView>
  )
}

const { width, height } = Layout.window
const CARD_SIZE = width * 0.8

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  cardView: {
    position: 'absolute',
    width: CARD_SIZE,
    height: CARD_SIZE + 40,
  },
  menuText: {
    padding: Spacing * 2,
  },
})
export default memo(HomeScreen)
