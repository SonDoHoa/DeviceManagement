import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {ReactNode} from 'react';
import { globalStyles } from '../utilities/styles/globalStyles';
import TextComponent from './TextComponent';

interface Props {
  isBackgroundImage?: boolean;
  isScroll?: boolean;
  children: ReactNode;
  left?: ReactNode;
  onPressLeft?: () => void;
  right?: ReactNode;
  onPressRight?: () => void;
  headerTitle?: string;
}

const ContainerComponent = (props: Props) => {
  const {
    isBackgroundImage,
    isScroll,
    children,
    left,
    headerTitle,
    right,
    onPressLeft,
    onPressRight,
  } = props;

  const returnHeader = () => {
    return (
      <View style={[globalStyles.container]}>
        {left || right || headerTitle ? (
          <>
            <View style={{height: StatusBar.currentHeight}} />
            <View
              style={[
                {
                  minHeight: 80,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                },
              ]}>
              {left ? (
                <TouchableOpacity
                  onPress={onPressLeft}
                  style={{
                    padding: 15,
                  }}>
                  {left}
                </TouchableOpacity>
              ) : (
                <View style={{width: 10}} />
              )}
              {headerTitle ? (
                <View style={[{justifyContent: 'flex-start'}]}>
                  <TextComponent text={headerTitle} isTitle />
                </View>
              ) : (
                <View style={{width: 10}} />
              )}
              {right ? (
                <TouchableOpacity
                  style={{
                    padding: 15,
                  }}
                  onPress={onPressRight}>
                  {right}
                </TouchableOpacity>
              ) : (
                <View style={{width: 10}} />
              )}
            </View>
          </>
        ) : null}
        {returnContainer()}
      </View>
    );
  };

  const returnContainer = () => {
    return isScroll ? (
      <ScrollView style={[globalStyles.container]}>{children}</ScrollView>
    ) : (
      <View style={[globalStyles.container]}>{children}</View>
    );
  };

  return isBackgroundImage && (
    <SafeAreaView style={{flex: 1}}>{returnHeader()}</SafeAreaView>
  );
};

export default ContainerComponent;
