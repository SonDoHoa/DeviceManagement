import { FlatList, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import ContainerComponent from '../../components/ContainerComponent';
import TextComponent from '../../components/TextComponent';
import RowComponent from '../../components/RowComponent';
import SectionComponent from '../../components/SectionComponent';
import DeviceComponent from '../../components/DeviceComponent';
import { appInfo } from '../../utilities/Contants/appInfo';
import { ArrowLeft, ArrowRight } from 'iconsax-react-native';
import { appColors } from '../../utilities/Contants/appColor';
import { useAppSelector } from '../../redux/Hooks';
import { RootState } from '../../redux/store';
import { DeviceState } from '../../redux/Reducers/DevicesSlice';
import { TouchableOpacity } from 'react-native';
import { NavigationConstants } from '../../navigation/NavigationConstants';

const ReceiptScreen = ({ navigation }: any) => {

   const selectedDevices = useAppSelector((state) => state.devices.devices);
   const data = useRef<DeviceState[]>(selectedDevices);
   const customerInfo = useAppSelector((state: RootState) => state.customer);

   const leftPressed = () => {
      navigation.navigate(NavigationConstants.SummaryScreen);
   };

   const getTotal = () => {
      let total = 0;
      data.current.forEach(e => { total += Number(e.fee.slice(1)); });
      return total;
   };

   const updateCustomerInfo = () => {
      navigation.navigate(NavigationConstants.CustomerInfoScreen, { prevScreen: NavigationConstants.ReceiptScreen });
   };

   console.log('---------- ReceiptScreen ----------');
   return (
      <ContainerComponent
         isBackgroundImage
         left={<ArrowLeft size={35} color={appColors.black} />} onPressLeft={leftPressed}
      >
         <TextComponent isTitle text="Receipt" style={styles.headerTitle} />
         <SectionComponent style={styles.section}>
            <TouchableOpacity onPress={updateCustomerInfo} style={styles.customerInfo}>
               <RowComponent justify="space-between">
                  <TextComponent text={`full name: ${customerInfo.fullName}`} />
                  <ArrowRight size={30} color={appColors.black} />
               </RowComponent>
               <RowComponent justify="space-between">
                  <TextComponent text={`Phone number: ${customerInfo.phoneNumber}`} />
                  <TextComponent text={`email: ${customerInfo.email}`} />
               </RowComponent>
               <RowComponent justify="space-between">
                  <TextComponent text={`address: ${customerInfo.address}`} />
                  <TextComponent text={`Day of birth: ${customerInfo.dayOfBirth}`} />
               </RowComponent>
            </TouchableOpacity>

         </SectionComponent>
         <SectionComponent style={styles.section}>
            <FlatList
               data={data.current}
               renderItem={(item) => <DeviceComponent item={item.item} onPress={() => { }} disabled={true} />}
               keyExtractor={item => item.id.toString()}
               getItemLayout={(_data, index) => ({
                  length: appInfo.ITEM_HEIGHT,
                  offset: appInfo.ITEM_HEIGHT * index,
                  index,
               })}
               initialNumToRender={8}
               maxToRenderPerBatch={8}
               windowSize={8}
               removeClippedSubviews={true}
               showsVerticalScrollIndicator={false}
               style={styles.flatList}
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
   flatList: {
      alignSelf: 'center',
      maxHeight: appInfo.sizes.HEIGHT * 0.62,
   },
   customerInfo: {
      borderWidth: 1,
      borderRadius: 15,
      padding: 15,
   },
});
