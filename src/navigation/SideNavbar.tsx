/** @format */

import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { FC } from 'react'
import { MotiView } from 'moti'
import { BlurView } from 'expo-blur'
import BigText from '../components/text/BigText'
import Layout from '../constants/Layout'
import Spacing from '../constants/Spacing'
import Colors from '../constants/Colors'

import { categories, categoryInterface, collectionInterface, collections, user } from '../data'
import { useNavigation } from '@react-navigation/native'

const SIZE = Spacing * 6
const CARD_HEIGHT = Spacing * 45
const CARD_WIDTH = Layout.window.width - Spacing * 4

type SideNavBarProps = {
  menuToggleBtn: () => void
}

const SideNavbar: FC<SideNavBarProps> = ({ menuToggleBtn }) => {
  const navigate = useNavigation().navigate

  return (
    <MotiView from={{ width: 0, opacity: 0 }} animate={{ width: Layout.window.width, opacity: 1 }} style={styles.sideMenu}>
      <BlurView tint='dark' intensity={122} style={styles.menuView}>
        <TouchableOpacity
          onPress={() => {
            menuToggleBtn()
            navigate('Home')
          }}>
          <BigText textStyles={[styles.menuText, { color: Colors.yellow }]}>Home</BigText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            menuToggleBtn()
            navigate('UserCarScreen', { userInfo: user })
          }}>
          <BigText textStyles={[styles.menuText]}>My Car</BigText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            menuToggleBtn()
            navigate('CollectionScreen')
          }}>
          <BigText textStyles={[styles.menuText]}>Collection</BigText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('신현민', 'Git: ShinMini.git \n phone: 010-8794-3202')}>
          <BigText textStyles={[styles.menuText]}>Contact</BigText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Used Skills', ' React-Native, Redux, Typescript, ReAnimated, babel, webpack ')}>
          <BigText textStyles={[styles.menuText]}>About</BigText>
        </TouchableOpacity>
      </BlurView>
      <TouchableOpacity
        style={styles.exitMenuBtn}
        onPress={() => {
          menuToggleBtn()
        }}
      />
    </MotiView>
  )
}

export default SideNavbar
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
    width: '60%',
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
    width: '40%',
    height: '130%',
    left: Layout.window.width / 2,
  },
})
