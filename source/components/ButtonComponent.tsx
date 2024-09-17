import {StyleProp, ViewStyle, StyleSheet, TouchableOpacity} from 'react-native';
import React, {Children, ReactNode} from 'react';
import TextComponent from './TextComponent';
import { globalStyles } from '../utilities/styles/globalStyles';
import { appColors } from '../utilities/contants/appColor';

interface Props {
  onPress: () => void;
  title: string;
  titleColor?: string;
  frontIcon?: ReactNode;
  backIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
  type: 'button' | 'text' | 'link' | 'item';
  backgroundColor?: string;
  children?: ReactNode;
}

const ButtonComponent = (props: Props) => {
  const {
    onPress,
    title,
    titleColor,
    children,
    backIcon,
    frontIcon,
    style,
    type,
    backgroundColor,
  } = props;

  return type === 'button' ? (
    <TouchableOpacity
      style={[
        globalStyles.button,
        globalStyles.shadow,
        style,
        {backgroundColor: backgroundColor ?? appColors.blue},
        {justifyContent: 'center'},
      ]}
      activeOpacity={0.5}
      onPress={onPress}>
      {frontIcon && frontIcon}
      <TextComponent
        text={title}
        style={[styles.title, {flex: frontIcon ? 0 : 1, paddingHorizontal: 15}]}
        color={titleColor ?? appColors.white}
      />
      {backIcon && backIcon}
    </TouchableOpacity>
      ) : type === 'item' ?
      <TouchableOpacity
            style={[
            globalStyles.button,
            globalStyles.shadow,
            style,
            {backgroundColor: backgroundColor ?? appColors.blue},
            {justifyContent: 'center'},
            {alignItems: 'center', flexDirection: 'column'},
            ]}
            activeOpacity={0.5}
            onPress={onPress}>
            {children}
         </TouchableOpacity>
      :
      (
    <TouchableOpacity onPress={onPress}>
      <TextComponent
        text={title}
        style={[
          styles.text,
          {
            color:
              titleColor ?? type === 'link'
                ? appColors.blue
                : appColors.typography,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  text: {
    fontSize: 14,
  },
});

export default ButtonComponent;
