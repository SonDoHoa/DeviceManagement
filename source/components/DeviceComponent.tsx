import { Image, StyleSheet } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { appColors } from '../utilities/contants/appColor';
import ButtonComponent from './ButtonComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';
import { appInfo } from '../utilities/contants/appInfo';
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
            <SectionComponent>
               <Image source={require('../assets/images/DefaultImage.png')} resizeMethod="auto" resizeMode="contain"
                  style={styles.image} />
            </SectionComponent>

            <SectionComponent style={styles.sectionView}>
               <TextComponent text={item.name} isTitle />
               <RowComponent justify="flex-start">
                  <TextComponent text="Amount: " />
                  <TextComponent text={!item.status ? 'Out of stock' : item.quantity.toString()} />
               </RowComponent>
               <TextComponent text={item.description} color={appColors.gray} numberOfLines={3} />
            </SectionComponent>
         </RowComponent>
      </ButtonComponent>
   );
};

const styles = StyleSheet.create({
   image: {
      flexGrow: 1,
      opacity: 1,
      width: undefined,
      height: undefined,
      aspectRatio: 1,
   },
   button: {
      marginBottom: 20, padding: 10, maxHeight: appInfo.ITEM_HEIGHT, alignItems: 'center',
      justifyContent: 'center',
      width: appInfo.sizes.WIDTH * 0.87,
   },
   sectionView: { alignContent: 'flex-start' },
});

export default DeviceComponent;
