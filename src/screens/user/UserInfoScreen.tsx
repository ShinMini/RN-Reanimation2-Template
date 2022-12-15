/** @format */

import { Image, View, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform, Alert } from 'react-native'
import React from 'react'
import type { FC } from 'react'
import { MotiView } from 'moti'
import { SafeAreaView } from '@motify/components'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../../types'
import styled from 'styled-components/native'
import RegularText from '../../components/text/RegularText'
import Font from '../../constants/Font'
import Spacing from '../../constants/Spacing'
import Colors from '../../constants/Colors'
import RegularBlurView from '../../components/view/RegularBlurView'
import ChevronIcon from '../../components/icon/ChevronIcon'
import BigText from '../../components/text/BigText'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

const BUTTON_SIZE = Spacing * 7
const { width } = Dimensions.get('screen')

const TextContainer = styled.View`
  background-color: ${Colors.grayDark};
  padding: ${Spacing * 2}px;
  display: flex;
  width: ${width - Spacing * 4}px;
  padding-bottom: ${Spacing * 4}px;
  border-radius: ${Spacing}px;

  font-family: ${Font.gilroyMedium};
`

type UserInfoScreenProps = NativeStackScreenProps<RootStackParamList, 'UserInfoScreen'>

const UserView: FC<UserInfoScreenProps> = (props) => {
  const userInfo = props.route.params.userInfo
  const navigation = props.navigation

  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <ScrollView>
        <View style={styles.rowView}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <RegularBlurView
              intensity={50}
              blurViewStyle={{
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: BUTTON_SIZE / 2,
              }}>
              <ChevronIcon color={Colors.darkText} />
            </RegularBlurView>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('image Clicked')} style={styles.rightAvatar}>
            <Image style={styles.mainAvatar} source={userInfo.image} />
          </TouchableOpacity>
        </View>
        <MotiView style={styles.imgContainer}>
          <TouchableOpacity style={styles.editIcon}>
            <MaterialCommunityIcons name='square-edit-outline' size={Spacing * 3} color={Colors.grayLight} />
          </TouchableOpacity>

          <Image source={userInfo.image} style={[styles.imgStyle]} />
        </MotiView>
        <MotiView>
          <TextContainer>
            <BigText textStyles={{ color: Colors.yellow }}>ID</BigText>
            <RegularText textStyles={styles.userInfoStyle}> {userInfo.id} </RegularText>
            <BigText textStyles={{ color: Colors.yellow }}>NAME</BigText>
            <RegularText textStyles={styles.userInfoStyle}> {userInfo.name} </RegularText>
            <BigText textStyles={{ color: Colors.yellow }}>AGE</BigText>
            <RegularText textStyles={styles.userInfoStyle}> {userInfo.age} </RegularText>
            <BigText textStyles={{ color: Colors.yellow }}>PHONE </BigText>
            <RegularText textStyles={styles.userInfoStyle}>{userInfo.phone} </RegularText>
            <BigText textStyles={{ color: Colors.yellow }}>GIT</BigText>
            <RegularText textStyles={styles.userInfoStyle}>{userInfo.git}</RegularText>
          </TextContainer>
        </MotiView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',

    backgroundColor: Colors.onBackground,
    alignItems: 'center',

    paddingTop: Platform.OS === 'android' ? Spacing * 4 : 0,
  },
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgStyle: {
    width: 250,
    height: 250,

    borderWidth: Spacing / 2,
    borderRadius: 250,
    borderColor: Colors.grayDark,

    margin: Spacing * 2,
    marginBottom: Spacing * 4,
  },
  rowView: {
    width: width - Spacing * 4,
    marginTop: Spacing,
    borderRadius: Spacing * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfoStyle: {
    fontSize: 25,
    color: Colors.grayLight,
    marginBottom: Spacing,
  },
  mainAvatar: {
    marginTop: Spacing / 2,
    width: Spacing * 7.5,
    height: Spacing * 7.5,
    overflow: 'hidden',
  },
  rightAvatar: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    right: Spacing * 4,
    top: Spacing * 1,
    width: Spacing * 5,
    height: Spacing * 5,

    borderRadius: Spacing * 4,
    borderWidth: 3,
    borderColor: Colors.yellow,

    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.onSurface,
  },
})
export default UserView
