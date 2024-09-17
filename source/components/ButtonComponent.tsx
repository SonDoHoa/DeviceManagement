import {StyleProp, ViewStyle, StyleSheet, TouchableOpacity} from 'react-native';
import React, {ReactNode} from 'react';
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
  textStyle?: StyleProp<ViewStyle>,
  disabled?: Boolean
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
    textStyle,
    disabled,
  } = props;

  return type === 'button' ? (
    <TouchableOpacity
      style={[
        globalStyles.button,
        globalStyles.shadow,
        style,
        {backgroundColor: backgroundColor ?? appColors.blue},
        styles.touchButton,
      ]}
      activeOpacity={disabled ? 1 : 0.5}
      disabled={disabled && false}
      onPress={onPress}>
      {frontIcon && frontIcon}
      <TextComponent
        text={title}
        style={[styles.title, {flex: frontIcon ? 0 : 1}, styles.titleButton]}
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
            styles.touchItem,
            ]}
            activeOpacity={disabled ? 1 : 0.5}
            disabled={disabled && false}
            onPress={onPress}>
            {children}
         </TouchableOpacity>
      :
      (
    <TouchableOpacity disabled={disabled && false} onPress={onPress}>
      <TextComponent
        text={title}
        style={[
          styles.text,
          textStyle,
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
  touchButton: {justifyContent: 'center'},
  touchItem: {alignItems: 'center', flexDirection: 'column', justifyContent: 'center'},
  titleButton: {paddingHorizontal: 15},
});

export default ButtonComponent;
