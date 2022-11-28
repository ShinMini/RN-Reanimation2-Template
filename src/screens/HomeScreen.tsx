/** @format */

// prettier-ignore
import { Animated, FlatList, Image, ImageBackground, Platform, Pressable, SafeAreaView, Text, TouchableOpacity, View, } from "react-native";
import React, { useEffect, useState } from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors'
import Spacing from '../constants/Spacing'

// prettier-ignore
import { categories, categoryInterface, collectionInterface, collections, user } from '../data'
import Font from '../constants/Font'
import Layout from '../constants/Layout'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'

import RegularText from '../components/text/RegularText'
import SmallText from '../components/text/SmallText'
import BigText from '../components/text/BigText'
import UserIcon from '../components/icon/UserIcon'
import RegularBlurView from '../components/view/RegularBlurView'
import RegularButton from '../components/button/RegularButton'
import WideSpacingView from '../components/view/WideSpacingView'
import { Entypo } from '@expo/vector-icons'
import SelectDate, { SelectedProps } from '../components/SelectDate'
import { MotiView, useAnimationState } from 'moti'

const SIZE = Spacing * 6
const NFT_HEIGHT = Spacing * 45
const NFT_WIDTH = Layout.window.width - Spacing * 4

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>
enum ArrowDirection {
  UP = 'chevron-up',
  DOWN = 'chevron-down',
  RIGHT = 'chevron-right',
  LEFT = 'chevron-left',
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation: { navigate } }) => {
  const [activeCategory, setActiveCategory] = useState<categoryInterface | undefined>(undefined)
  const [collectionList, setCollectionList] = useState<collectionInterface[]>([])
  const [nowDisplayDate, setDisplayDate] = useState<SelectedProps>(SelectedProps.WEEK)

  const toggleAnimation = () => {
    if (animationState.current === 'active') {
      animationState.transitionTo('to')
    } else {
      animationState.transitionTo('active')
    }
  }
  const animationState = useAnimationState({
    from: {
      opacity: 0,
      scale: 0.9,
      rotateX: '0deg',
    },
    to: {
      opacity: 1,
      scale: 1,
    },
    active: {
      rotateX: '25deg',
    },
  })
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
        <RegularText>Hey {user.name}</RegularText>
        <UserIcon image={user.image} />
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
        <Pressable onPress={toggleAnimation} style={{ flexDirection: 'column' }}>
          <SelectDate isSelected={nowDisplayDate} />
          <Entypo name={ArrowDirection.DOWN} size={Spacing * 3} color={Colors.text} style={{ left: Spacing }} />
        </Pressable>
      </WideSpacingView>

      <View>
        {collectionList.map((collection) => (
          <MotiView
            state={animationState}
            delay={120}
            key={collection.id}
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}>
            {collection.nfts.map((nft, index) => (
              <ImageBackground
                style={{
                  height: NFT_HEIGHT,
                  width: NFT_WIDTH,
                  position: 'absolute',
                  zIndex: Spacing - index,
                  transform: [
                    {
                      translateY: index * 10,
                    },
                    {
                      scaleX: 1 - index / 10,
                    },
                  ],
                  opacity: 1,
                  borderRadius: Spacing * 2,
                  overflow: 'hidden',
                  justifyContent: 'flex-end',
                }}
                key={nft.id}
                source={nft.image}>
                {index === 0 && (
                  <RegularBlurView
                    dark={true}
                    intensity={90}
                    blurViewStyle={{
                      bottom: Spacing * 3,
                      marginHorizontal: Spacing * 2,
                      padding: Spacing / 2,
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
                      btnStyles={{ backgroundColor: Colors.secondary }}>
                      <SmallText> View Detail </SmallText>
                    </RegularButton>
                  </RegularBlurView>
                )}
              </ImageBackground>
            ))}
          </MotiView>
        ))}
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen
