/** @format */

import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import WideSpacingView from '../components/view/WideSpacingView'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import BigText from '../components/text/BigText'
import Colors from '../constants/Colors'
import Spacing from '../constants/Spacing'
import { userInterface } from '../data'
import { useNavigation } from '@react-navigation/native'

interface TopNavbarProps {
  menuToggleBtn: () => void
  userInfo: userInterface
}
const TopNavbar: FC<TopNavbarProps> = ({ menuToggleBtn, userInfo }) => {
  const navigate = useNavigation().navigate
  return (
    <WideSpacingView viewStyles={{ alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          menuToggleBtn()
        }}>
        <MaterialCommunityIcons name='menu' color={Colors.text} size={Spacing * 3} />
      </TouchableOpacity>
      <BigText>{userInfo.name}</BigText>
      <TouchableOpacity onPress={() => navigate('UserInfoScreen', { userInfo })} style={styles.viewBtn}>
        <Image source={userInfo.image} style={[styles.profileImage]} />
      </TouchableOpacity>
    </WideSpacingView>
  )
}

export default TopNavbar

const styles = StyleSheet.create({
  viewBtn: {
    height: Spacing * 6,
    width: Spacing * 6,
    overflow: 'hidden',
    borderRadius: Spacing * 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
})
