import {
   View,
   ScrollView,
   SafeAreaView,
   TouchableOpacity,
   StatusBar,
   StyleProp,
   ViewStyle,
   StyleSheet,
} from 'react-native';
import React, { ReactNode } from 'react';
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
   headerStyle?: StyleProp<ViewStyle>;
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
      headerStyle,
   } = props;

   const returnHeader = () => {
      return (
         <View style={[globalStyles.container]}>
            {left || right || headerTitle ? (
               <>
                  <View style={{ height: StatusBar.currentHeight }} />
                  <View
                     style={
                        styles.view
                     }>
                     {left ? (
                        <TouchableOpacity
                           onPress={onPressLeft}
                           style={styles.paddingBtn}>
                           {left}
                        </TouchableOpacity>
                     ) : (
                        <View style={styles.widthView} />
                     )}
                     {headerTitle ? (
                        <View style={[headerStyle]}>
                           <TextComponent text={headerTitle} isTitle />
                        </View>
                     ) : (
                        <View style={styles.widthView} />
                     )}
                     {right ? (
                        <TouchableOpacity
                           style={styles.paddingBtn}
                           onPress={onPressRight}>
                           {right}
                        </TouchableOpacity>
                     ) : (
                        <View style={styles.widthView} />
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
      <SafeAreaView style={globalStyles.container}>{returnHeader()}</SafeAreaView>
   );
};

const styles = StyleSheet.create({
   paddingBtn: {
      padding: 15,
   },
   widthView: { width: 10 },
   view: {
      minHeight: 80,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
});

export default ContainerComponent;
