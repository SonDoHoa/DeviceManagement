import { Image } from 'react-native';
import React from 'react';
import TextComponent from './TextComponent';
import { appColors } from '../utilities/contants/appColor';
import ButtonComponent from './ButtonComponent';
import RowComponent from './RowComponent';
import SectionComponent from './SectionComponent';

export interface DeviceItem {
   id: number,
   name: string,
   description: string,
   quantity: number,
   status: boolean,
   note: string,
   fee: string,
   image: string
}

interface DeviceComponentProps {
   isSelect?: boolean,
   item: DeviceItem,
   isEdit?: boolean,
   onRemove?: () => void,
   onPress: (i: DeviceItem) => void
}

const DeviceComponent = (prop: DeviceComponentProps) => {
   const {isSelect, item, onPress} = prop;

  return (
    <ButtonComponent type="item" onPress={() => onPress(item)} title={item.name} backgroundColor={isSelect ? appColors.blue2 : appColors.blue6} style={{marginBottom: 20, padding: 15, maxHeight: 130}}>
      <RowComponent>
         <SectionComponent>
            <Image source={require('../assets/images/DefaultImage.png')} resizeMethod="auto" resizeMode="cover" style={{width: 100, height: 100}}/>
         </SectionComponent>

         <SectionComponent style={{alignContent: 'flex-start' }}>
            <TextComponent text={item.name} isTitle/>
            <RowComponent justify="flex-start">
               <TextComponent text="Số lượng: "/>
               <TextComponent text={!item.status ? 'Hết hàng' : item.quantity.toString()}/>
            </RowComponent>
            <TextComponent text={item.description} color={appColors.gray} numberOfLines={3}/>
         </SectionComponent>
      </RowComponent>
    </ButtonComponent>
  );
};

export default DeviceComponent;
