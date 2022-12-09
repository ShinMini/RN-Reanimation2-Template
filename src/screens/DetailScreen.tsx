/** @format */

// prettier-ignore
import { Dimensions, Image, ImageBackground, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Platform} from 'react-native';

import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../types'
import { Ionicons, Entypo } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'

import Colors from '../constants/Colors'
import Spacing from '../constants/Spacing'
import Font from '../constants/Font'
import RegularBlurView from '../components/view/RegularBlurView'
import WideSpacingView from '../components/view/WideSpacingView'
import BigText from '../components/text/BigText'
import RegularText from '../components/text/RegularText'
import ChevronIcon from '../components/icon/ChevronIcon'

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>

const BUTTON_SIZE = Spacing * 7
const { width, height } = Dimensions.get('screen')

const DetailScreen: React.FC<DetailScreenProps> = ({ navigation: { goBack, navigate }, route }) => {
  const collection = route.params.collection

  return (
    <View style={{ paddingTop: Platform.OS === 'android' ? Spacing * 4 : 0 }}>
      <ImageBackground
        source={collection.image}
        blurRadius={1}
        style={{
          height: height * 0.65,
          width: '100%',
          borderRadius: Spacing * 3,
          overflow: 'hidden',
        }}>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View style={styles.rowView}>
            <TouchableOpacity onPress={() => goBack()}>
              <RegularBlurView
                intensity={90}
                blurViewStyle={{
                  height: BUTTON_SIZE,
                  width: BUTTON_SIZE,
                  borderRadius: BUTTON_SIZE / 2,
                }}>
                <ChevronIcon color={Colors.darkText} />
              </RegularBlurView>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('CollectionScreen')}
              style={{
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: BUTTON_SIZE / 2,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors.light,
              }}>
              <Ionicons
                style={{
                  marginTop: Spacing / 2,
                }}
                size={Spacing * 4}
                name='heart-outline'
                color={Colors.darkText}
              />
            </TouchableOpacity>
          </View>
          <WideSpacingView
            viewStyles={{
              backgroundColor: 'black',
              opacity: 0.8,

              marginHorizontal: Spacing * 2,
              paddingVertical: Spacing * 2,
              justifyContent: 'space-around',
              bottom: Spacing * 5,
            }}>
            <View>
              <Text
                style={{
                  color: Colors.text,
                  fontFamily: Font.gilroyBold,
                  fontSize: Spacing * 5,
                }}>
                {collection.name}
              </Text>
              <Text
                style={{
                  color: Colors.text,
                  fontFamily: Font.gilroyMedium,
                  fontSize: Spacing * 2,
                }}>
                {collection.handle}
              </Text>
            </View>
            <RegularBlurView
              intensity={70}
              blurViewStyle={{
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: BUTTON_SIZE / 2,
              }}>
              <Image
                style={{
                  width: '50%',
                  height: '50%',
                }}
                resizeMode='contain'
                source={collection.logo.image}
              />
            </RegularBlurView>
          </WideSpacingView>
        </SafeAreaView>
      </ImageBackground>

      <View
        style={{
          paddingHorizontal: Spacing * 2,
          paddingVertical: Spacing * 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <View style={{ flexDirection: 'row' }}>
          <BigText>By </BigText>
          <BigText textStyles={{ marginLeft: Spacing / 2 }}>{collection.author}</BigText>
        </View>
        <RegularText textStyles={{ marginTop: Spacing }}>Star Rate: {collection.star}</RegularText>

        <TouchableOpacity
          onPress={() =>
            navigate('PurchaseScreen', {
              image: collection.image,
              logo: collection.logo,
            })
          }
          style={{ marginTop: Spacing * 2 }}>
          <RegularBlurView
            blurViewStyle={{
              padding: Spacing,
              justifyContent: 'space-between',
              borderRadius: Spacing * 5,
            }}>
            <RegularBlurView
              intensity={70}
              blurViewStyle={{
                height: BUTTON_SIZE,
                width: BUTTON_SIZE,
                borderRadius: BUTTON_SIZE / 2,
                justifyContent: 'center',

                marginRight: Spacing,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode='contain'
                source={collection.logo.image}
              />
            </RegularBlurView>
            <BigText textStyles={{ color: Colors.textGray }}>Get it now !</BigText>
            <View
              style={{
                flexDirection: 'row',
                width: Spacing * 7,
              }}>
              <Entypo name='chevron-right' size={Spacing * 4} color={Colors.yellow} style={{ marginLeft: Spacing }} />
            </View>
          </RegularBlurView>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  rowView: {
    marginTop: Spacing,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing * 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
