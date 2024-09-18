import { StyleProp, Text, TextStyle } from 'react-native';
import React from 'react';
import { globalStyles } from '../utilities/Styles/globalStyles';
import { appColors } from '../utilities/Contants/appColor';

interface Props {
   text: string;
   color?: string;
   fontFamily?: string;
   style?: StyleProp<TextStyle>;
   isTitle?: boolean;
   flex?: number;
   size?: number;
   numberOfLines?: number | undefined;
}

const TextComponent = (props: Props) => {

   const { text, color, style, isTitle, flex, size, numberOfLines } = props;

   return (
      <Text
         style={[
            globalStyles.text,
            {
               flex: flex ?? 0,
               color: color ?? appColors.black,
               fontSize: size ? size : isTitle ? 24 : 14,
            },
            style,
         ]}
         numberOfLines={numberOfLines}
         ellipsizeMode={numberOfLines ? 'tail' : undefined}
      >
         {text}
      </Text>
   );
};

export default TextComponent;
