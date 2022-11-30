/** @format */

// prettier-ignore
import { Animated, FlatList, Image, ImageBackground, Platform, SafeAreaView, Text, TouchableOpacity, View, } from "react-native";
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import Spacing from '../constants/Spacing'

// prettier-ignore
import { categories, categoryInterface, collectionInterface, collections, user } from '../data'
import Font from '../constants/Font'
import Layout from '../constants/Layout'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'

import { SelectedDateActionType as SelectedDate } from '../state/action-types/index'
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
const SIZE = Spacing * 6
const CARD_HEIGHT = Spacing * 45
const CARD_WIDTH = Layout.window.width - Spacing * 4

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation: { navigate } }) => {
  const [activeCategory, setActiveCategory] = useState<categoryInterface | undefined>(undefined)
  const [collectionList, setCollectionList] = useState<collectionInterface[]>([])

  const nowReduxCard = useSelector<RootState, CardAction>((state) => state.cardAnimation.value)

  //prettier-ignore
  const cardAnimState = useAnimationState({
    default: {
      transition: { type: 'timing', duration: 100},
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
      transition: { type: 'timing', duration: 100},
      transform: [
        {
          "rotateX": [0, 0.3, { value: '0.3', duration: 100}],
        },
        {
          "translateY": [0, 0.3, { value: Spacing * 13, duration: 100}],
        },
      ],
    },
  })
  // redux
  const dispatch = useDispatch()
  useEffect(() => {
    if (nowReduxCard === CardAction.FLIP) cardAnimState.transitionTo('active')
    if (nowReduxCard === CardAction.REGULAR) cardAnimState.transitionTo('default')
  }, [dispatch, nowReduxCard])

  useEffect(() => {
    setCollectionList(collections.filter((collection) => collection.category.id === activeCategory?.id))
  }, [activeCategory?.id])

  useEffect(() => {
    setActiveCategory(categories[0])
  }, [])

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? Spacing * 4 : 0 }}>
      <WideSpacingView viewStyles={{ paddingTop: Spacing * 2, alignItems: 'center' }}>
        <TouchableOpacity>
          <MaterialCommunityIcons name='dots-grid' color={Colors.text} size={Spacing * 3} />
        </TouchableOpacity>
        <BigText>{user.name}</BigText>
        <TouchableOpacity
          onPress={() => navigate('CollectionScreen')}
          style={{
            height: SIZE,
            width: SIZE,
            overflow: 'hidden',
            borderRadius: SIZE / 2,
          }}>
          <Image
            source={user.image}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
      </WideSpacingView>

      <Animated.View
        style={{
          backgroundColor: Colors.background,
          marginVertical: Spacing * 2,
        }}>
        <FlatList
          data={categories}
          style={{
            paddingVertical: Spacing * 2,
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity key={item.id.toString()} onPress={() => setActiveCategory(item)} style={{ paddingHorizontal: Spacing * 3 }}>
                <RegularText
                  textStyles={[
                    { color: Colors.darkText },
                    activeCategory?.id === item.id && {
                      fontFamily: Font.gilroyBold,
                      color: Colors.darkText,
                    },
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
          <MotiView
            state={cardAnimState}
            key={collection.id}
            transition={{ duration: 100, type: 'timing' }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}>
            {collection.cards.map((card, index) => (
              <ImageBackground
                style={{
                  height: CARD_HEIGHT,
                  width: CARD_WIDTH,
                  position: 'absolute',
                  zIndex: collection.cards.length + 3 - index,
                  transform: [
                    {
                      translateY: index * 10,
                    },
                    {
                      scaleX: 1 - index / 10,
                    },
                  ],
                  opacity: 1 - 0.1 * index,
                  borderRadius: Spacing * 2,
                  overflow: 'hidden',
                  justifyContent: 'flex-end',
                }}
                key={card.id}
                source={card.image}>
                {index === 0 && (
                  <RegularBlurView
                    dark={true}
                    intensity={90}
                    blurViewStyle={{
                      bottom: Spacing * 3,
                      marginHorizontal: Spacing * 2,
                      padding: Spacing,
                      borderRadius: Spacing * 2,
                    }}>
                    <View
                      style={{
                        paddingHorizontal: Spacing,
                        paddingVertical: Spacing,
                      }}>
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

export default HomeScreen
