/** @format */

import { Image, ImageBackground, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import { BlurView } from 'expo-blur'
import Spacing from '../constants/Spacing'

import { Ionicons } from '@expo/vector-icons'
import { user } from '../data'
import Font from '../constants/Font'
import robot from '../assets/images/bgs/robot.jpg'
import window from '../constants/Layout'

import { Colors } from '../constants/Colors'

type PurchaseScreenProps = NativeStackScreenProps<RootStackParamList, 'PurchaseScreen'>

const BUTTON_SIZE = Spacing * 7

const PurchaseScreen: React.FC<PurchaseScreenProps> = ({
  navigation: { goBack },
  route: {
    params: { image, logo },
  },
}) => {
  return (
    <ImageBackground
      source={robot}
      blurRadius={Spacing}
      style={{
        flex: 1,
      }}>
      <BlurView
        intensity={3}
        style={{
          flex: 1,
        }}>
        <SafeAreaView style={{ paddingTop: Platform.OS === 'android' ? Spacing * 5 : 0 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: Spacing * 2,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 1,
                }}
                onPress={() => goBack()}>
                <BlurView
                  tint='light'
                  intensity={80}
                  style={{
                    height: BUTTON_SIZE,
                    width: BUTTON_SIZE,
                    borderRadius: BUTTON_SIZE / 2,
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Ionicons size={Spacing * 3} name='close' color={Colors.text} />
                </BlurView>
              </TouchableOpacity>
              <View
                style={{
                  height: BUTTON_SIZE,
                  width: BUTTON_SIZE,
                  borderRadius: BUTTON_SIZE / 2,
                  overflow: 'hidden',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.light,
                  marginLeft: BUTTON_SIZE - Spacing * 2,
                }}>
                <Image
                  source={image}
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                />
              </View>
            </View>

            <View
              style={{
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: BUTTON_SIZE / 2,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.light,
              }}>
              <Image
                source={user.image}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: Spacing * 2,
              marginVertical: Spacing * 4,
            }}>
            <Text
              style={{
                color: Colors.text,
                fontSize: Spacing * 5,
                fontFamily: Font.gilroyBold,
              }}>
              Make this art
            </Text>
            <Text
              style={{
                color: Colors.text,
                fontSize: Spacing * 5,
                fontFamily: Font.gilroyBold,
              }}>
              your own!
            </Text>

            <View
              style={{
                marginVertical: Spacing * 4,
              }}>
              <Image
                style={{
                  overflow: 'hidden',
                  width: window.window.width - Spacing * 4,
                  height: window.window.height / 2.5,
                  borderRadius: Spacing * 2,
                }}
                source={image}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.secondary,
                paddingVertical: Spacing * 2,
                borderRadius: Spacing * 3,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: Spacing * 3,
                  fontWeight: '700',
                  color: Colors.text,
                  fontFamily: Font.gilroyBold,
                }}>
                Get it !
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </BlurView>
    </ImageBackground>
  )
}

export default PurchaseScreen
