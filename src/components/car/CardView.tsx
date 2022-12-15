/** @format */

import { Image, ImageURISource, View, ImageSourcePropType } from 'react-native'
import React from 'react'
import type { FC, ReactNode } from 'react'
import styled from 'styled-components/native'
import Colors from '../../constants/Colors'
import BigText from '../text/BigText'
import RegularText from '../text/RegularText'
import SmallText from '../text/SmallText'

export const Card = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.lightCard};
  padding: 35px;

  border-radius: 15px;
`

type CardViewProps = {
  radius: number
  backgroundColor?: string
  mainText?: string
  imageSourceUri?: ImageURISource
  contentText?: string
  commentText?: string
  children?: ReactNode
}
const CardView: FC<CardViewProps> = (props) => {
  const [imageUri, setImageUri] = React.useState<ImageSourcePropType>()

  React.useEffect(() => {
    const getUri = props.imageSourceUri
    if (getUri) setImageUri(getUri)
  }, [imageUri])

  return (
    <Card style={{ backgroundColor: props.backgroundColor }}>
      <View style={{ width: props.radius * 2.2, height: props.radius * 2.2 }}>
        {imageUri && <Image source={imageUri} style={{ height: '50%', width: '88%' }} resizeMode='cover' />}
        <BigText textStyles={{ color: Colors.deepGreen, fontSize: 45 }}>{props.mainText}</BigText>
        {props.children}
        <RegularText textStyles={{ marginBottom: 15, fontSize: 23, color: Colors.green, fontWeight: '700' }}>
          {props.contentText}
        </RegularText>
        <SmallText textStyles={{ color: Colors.grayDark }}>{props.commentText}</SmallText>
      </View>
    </Card>
  )
}

export default CardView
