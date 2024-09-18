import { Image, StyleSheet } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { appColors } from '../utilities/Contants/appColor';
import ButtonComponent from './ButtonComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import { appInfo } from '../utilities/Contants/appInfo';
import { DeviceState } from '../redux/Reducers/DevicesSlice';

interface DeviceComponentProps {
   isSelect?: boolean,
   item: DeviceState,
   isEdit?: boolean,
   onRemove?: () => void,
   onPress: (i: DeviceState) => void;
   disabled?: Boolean;
}

const DeviceComponent = (prop: DeviceComponentProps) => {
   const { isSelect, item, onPress, disabled } = prop;

   return (
      <ButtonComponent type="item"
         disabled={disabled && false}
         onPress={() => onPress(item)}
         title={item.name} backgroundColor={isSelect ? appColors.blue2 : appColors.blue6}
         style={styles.button}>
         <RowComponent>
            <Image source={require('../assets/images/DefaultImage.png')} resizeMethod="resize" resizeMode="contain"
               style={styles.image} />
            <SectionComponent style={styles.sectionView}>
               <TextComponent text={item.name} />
               <RowComponent justify="flex-start">
                  <TextComponent text="Amount: " />
                  <TextComponent text={!item.status ? 'Out of stock' : item.quantity.toString()} />
               </RowComponent>
               <TextComponent text={item.description} color={appColors.gray} numberOfLines={2} />
            </SectionComponent>
         </RowComponent>
      </ButtonComponent>
   );
};

const styles = StyleSheet.create({
   image: {
      flexGrow: 1,
      opacity: 1,
      maxWidth: 80,
      maxHeight: 80,
      aspectRatio: 1,
      borderWidth: 1,
      borderRadius: 15,
   },
   button: {
      marginBottom: 20,
      marginHorizontal: 20,
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,
      width: appInfo.sizes.WIDTH * 0.85,
   },
   sectionView: { flex: 1 },
});

export default DeviceComponent;
