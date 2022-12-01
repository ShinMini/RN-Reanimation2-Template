/** @format */

// prettier-ignore
import { Animated, FlatList, Image, StyleSheet, ImageBackground, Platform, SafeAreaView, Text, TouchableOpacity, View, Alert, } from "react-native";
import React, { useEffect, useMemo, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import Spacing from '../constants/Spacing'

// prettier-ignore
import { categories, categoryInterface, collectionInterface, collections, user } from '../data'
import Font from '../constants/Font'
import Layout from '../constants/Layout'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList, RootStackScreenProps } from '../../types'

import RegularText from '../components/text/RegularText'
import SmallText from '../components/text/SmallText'
import BigText from '../components/text/BigText'
import RegularBlurView from '../components/view/RegularBlurView'
import RegularButton from '../components/button/RegularButton'
import WideSpacingView from '../components/view/WideSpacingView'
import SelectDate from '../components/SelectDate'
import { MotiView, useAnimationState } from 'moti'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state'

import { CardAnimationActionType as CardAction, SelectedDateActionType as DateAction } from '../state/action-types/index'
import { BlurView } from 'expo-blur'
const SIZE = Spacing * 6
const CARD_HEIGHT = Spacing * 45
const CARD_WIDTH = Layout.window.width - Spacing * 4

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation: { navigate } }) => {
  const [activeCategory, setActiveCategory] = useState<categoryInterface | undefined>(undefined)
  const [collectionList, setCollectionList] = useState<collectionInterface[]>([])
  const [activeMenu, setActiveMenu] = useState(false)

  const nowReduxCard = useSelector<RootState, CardAction>((state) => state.cardAnimation.value)
  const nowReduxDate = useSelector<RootState, DateAction>((state) => state.selectedDate.value)

  //prettier-ignore
  const cardAnimState = useAnimationState({
    default: {
      transition: { type: 'timing', duration: 300},
      transform: [
        {
          "rotateX": '0deg',
        },
        {
          "translateY": 0,
        },
      ],
    },
    active: {
      transition: { type: 'timing', duration: 300},
      transform: [
        {
        "rotateX": '15deg',
        },
        {
          "translateY": Spacing * 15,
        },
        {
          scale: 0.8
        }
      ],
    },
  })
  // redux
  const dispatch = useDispatch()
  useEffect(() => {
    if (nowReduxCard === CardAction.FLIP) cardAnimState.transitionTo('active')
    if (nowReduxCard === CardAction.REGULAR) cardAnimState.transitionTo('default')
  }, [dispatch, nowReduxCard])

  const cardCollections = useMemo(() => collections, [])
  useEffect(() => {
    setCollectionList(cardCollections.filter((collection) => collection.category.id === activeCategory?.id))
  }, [activeCategory?.id])

  useEffect(() => {
    switch (nowReduxDate) {
      case DateAction.DAY:
        setCollectionList(cardCollections.filter((collection) => collection.category.name === 'Recent'))
        break
      case DateAction.WEEK:
        setCollectionList(cardCollections.filter((collection) => collection.category.name === 'Top'))
        break
      case DateAction.MONTH:
        setCollectionList(cardCollections.filter((collection) => collection.category.name === 'Trending'))
        break
      case DateAction.YEAR:
        setCollectionList(cardCollections.filter((collection) => collection.category.name === 'Recommend'))
        break
    }
  }, [nowReduxCard])

  useEffect(() => {
    setActiveCategory(categories[0])
  }, [])
  const menuOptionBtn = (goTo: any) => {
    navigate(goTo)
    setActiveMenu((prevState) => !prevState)
  }

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? Spacing * 4 : 0 }}>
      {activeMenu && (
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.sideMenu}>
          <BlurView tint='dark' intensity={122} style={styles.menuView}>
            <TouchableOpacity onPress={() => menuOptionBtn('Home')}>
              <BigText textStyles={[styles.menuText, { color: Colors.yellow }]}>Home</BigText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => menuOptionBtn('CollectionScreen')}>
              <BigText textStyles={[styles.menuText]}>Collection</BigText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('신현민 ShinMini.git \n phone: 010-8794-3202')}>
              <BigText textStyles={[styles.menuText]}>Contact</BigText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('준비중인 페이지입니다 :(')}>
              <BigText textStyles={[styles.menuText]}>Setting</BigText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Use Skill, React-Native, Redux, Typescript, ReAnimated, babel, webpack ')}>
              <BigText textStyles={[styles.menuText]}>About</BigText>
            </TouchableOpacity>
          </BlurView>
          <TouchableOpacity
            style={styles.exitMenuBtn}
            onPress={() => {
              console.log('clicked menu side')
              setActiveMenu((prevState) => !prevState)
            }}
          />
        </MotiView>
      )}
      <WideSpacingView viewStyles={{ paddingTop: Spacing * 2, alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => {
            console.log('menu clicked')
            setActiveMenu((prevState) => !prevState)
          }}>
          <MaterialCommunityIcons name='menu' color={Colors.text} size={Spacing * 3} />
        </TouchableOpacity>
        <BigText>{user.name}</BigText>
        <TouchableOpacity onPress={() => navigate('UserInfoScreen', { userInfo: user })} style={styles.viewBtn}>
          <Image source={user.image} style={{ width: '100%', height: '100%' }} />
        </TouchableOpacity>
      </WideSpacingView>

      <Animated.View style={{ backgroundColor: Colors.background, marginVertical: Spacing * 2 }}>
        <FlatList
          data={categories}
          style={{ paddingVertical: Spacing * 2 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity key={item.id.toString()} onPress={() => setActiveCategory(item)} style={{ paddingHorizontal: Spacing * 3 }}>
                <RegularText
                  textStyles={[
                    { color: Colors.darkText },
                    activeCategory?.id === item.id && { fontFamily: Font.gilroyBold, color: Colors.darkText },
                  ]}>
                  {item.name}
                </RegularText>
              </TouchableOpacity>
            )
          }}
        />
      </Animated.View>
      <WideSpacingView viewStyles={{ paddingVertical: Spacing * 1 }}>
        <RegularText>{activeCategory?.name} collections</RegularText>
        <SelectDate />
      </WideSpacingView>

      <Animated.View>
        {collectionList.map((collection) => (
          <MotiView state={cardAnimState} key={collection.id} transition={{ duration: 100, type: 'timing' }} style={styles.motiView}>
            {collection.cards.map((card, index) => (
              <ImageBackground
                style={[
                  styles.backImg,
                  {
                    zIndex: collection.cards.length + 3 - index,
                    transform: [{ translateY: index * 10 }, { scaleX: 1 - index / 10 }],
                    opacity: 1 - 0.1 * index,
                  },
                ]}
                key={card.id}
                source={card.image}>
                {index === 0 && (
                  <RegularBlurView dark={true} intensity={90} blurViewStyle={styles.blurView}>
                    <View style={{ paddingHorizontal: Spacing, paddingVertical: Spacing }}>
                      <BigText> {collection.name} </BigText>
                      <SmallText> {collection.handle} </SmallText>
                    </View>
                    <RegularButton
                      onPress={() => navigate('DetailScreen', { collection: collection })}
                      btnStyles={{ backgroundColor: 'hsl(258, 74%, 63%)' }}>
                      <RegularText textStyles={{ fontWeight: '700', fontFamily: Font.gilroyBold }}> Detail </RegularText>
                    </RegularButton>
                  </RegularBlurView>
                )}
              </ImageBackground>
            ))}
          </MotiView>
        ))}
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  blurView: {
    bottom: Spacing * 3,
    marginHorizontal: Spacing * 2,
    padding: Spacing,
    borderRadius: Spacing * 2,
  },
  backImg: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    position: 'absolute',
    borderRadius: Spacing * 2,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  motiView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  viewBtn: {
    height: SIZE,
    width: SIZE,
    overflow: 'hidden',
    borderRadius: SIZE / 2,
  },
  sideMenu: {
    position: 'absolute',
    display: 'flex',

    width: Layout.window.width,
    height: Layout.window.height,
    zIndex: Spacing * 10,
    paddingVertical: Spacing * 6,
  },
  menuView: {
    display: 'flex',
    width: '50%',
    height: '110%',
    paddingVertical: Spacing * 2,

    borderRadius: Spacing,

    flexDirection: 'column',
    alignItems: 'center',

    marginLeft: Spacing,
  },
  menuText: {
    padding: Spacing * 2,
  },
  exitMenuBtn: {
    position: 'absolute',
    width: '50%',
    height: '130%',
    left: Layout.window.width / 2,
  },
})
export default HomeScreen
