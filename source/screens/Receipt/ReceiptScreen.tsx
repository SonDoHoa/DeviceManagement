import { FlatList, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import TextComponent from '../../components/TextComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import DeviceComponent from '../../components/DeviceComponent';
import { appInfo } from '../../utilities/contants/appInfo';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '../../utilities/contants/appColor';
import { useAppSelector } from '../../redux/Hooks';
import { RootState } from '../../redux/store';
import { DeviceState } from '../../redux/Reducers/DevicesSlice';

const ReceiptScreen = ({ navigation, route }: any) => {
   console.log('----------ReceiptScreen----------');
   const data = useRef<DeviceState[]>(route.params.data);
   const customerInfo = useAppSelector((state: RootState) => state.customer);

   const leftPressed = () => {
      navigation.goBack();
   };

   const getTotal = () => {
      let total = 0;
      data.current.forEach(e => { total += Number(e.fee.slice(1)); });
      return total;
   };

   return (
      <ContainerComponent
         isBackgroundImage
         isScroll left={<ArrowLeft size={35} color={appColors.black} />} onPressLeft={leftPressed}
      >
         <TextComponent isTitle text="Receipt" style={styles.headerTitle} />
         <SectionComponent style={styles.section}>
            <TextComponent text={`full name: ${customerInfo.fullName}`} />
            <RowComponent justify="space-between">
               <TextComponent text={`Phone number: ${customerInfo.phoneNumber}`} />
               <TextComponent text={`email: ${customerInfo.email}`} />
            </RowComponent>
            <RowComponent justify="space-between">
               <TextComponent text={`address: ${customerInfo.address}`} />
               <TextComponent text={`Day of birth: ${customerInfo.dayOfBirth}`} />
            </RowComponent>
         </SectionComponent>
         <SectionComponent style={styles.section}>
            <FlatList
               data={data.current}
               renderItem={(item) => <DeviceComponent item={item.item} onPress={() => { }} disabled={true} />}
               keyExtractor={item => item.id.toString()}
               getItemLayout={(data, index) => ({
                  length: appInfo.ITEM_HEIGHT,
                  offset: appInfo.ITEM_HEIGHT * index,
                  index,
               })}
               initialNumToRender={8}
               maxToRenderPerBatch={8}
               windowSize={8}
               removeClippedSubviews={true}
               showsVerticalScrollIndicator={false}
               style={styles.flatlist}
            />
         </SectionComponent>
         <SectionComponent style={styles.section}>
            <RowComponent justify="space-between">
               <TextComponent text="Total" />
               <TextComponent text={`$ ${getTotal()}`} />
            </RowComponent>

         </SectionComponent>
      </ContainerComponent>
   );
};

export default ReceiptScreen;

const styles = StyleSheet.create({
   section: {
      marginBottom: 20,
   },
   headerTitle: {
      marginBottom: 30,
      paddingHorizontal: 20,
   },
   flatlist: { alignSelf: 'center' },
});
