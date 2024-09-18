import { View, StyleSheet, FlatList, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import DeviceComponent from '../../components/DeviceComponent';
import RowComponent from '../../components/RowComponent';
import { appInfo } from '../../utilities/Contants/appInfo';
import TextComponent from '../../components/TextComponent';
import { NavigationConstants } from '../../navigation/NavigationConstants';
import { useAppSelector } from '../../redux/Hooks';
import ContainerComponent from '../../components/ContainerComponent';
import { ArrowLeft } from 'iconsax-react-native';
import { appColors } from '../../utilities/Contants/appColor';

const SummaryScreen = ({ navigation, route }: any) => {

   const selectedDevices = useAppSelector((state) => state.devices.devices).map(it => { return { ...it, isSelected: false }; });
   const [data, setData] = useState(selectedDevices);
   const [isSelected, setSelected] = useState(false);

   useEffect(() => {
      console.log('new device info: ', route);
      if (route.params?.deviceUpdated) {
         const updatedItem = route.params.deviceUpdated;

         setData((prevData) =>
            prevData.map((item) =>
               (typeof (item) === typeof (updatedItem)) && (item.id === updatedItem.id) ? updatedItem : item
            )
         );
      }
   }, [route]);

   const goToDetailDeviceItem = (item: any) => {
      if (!isSelected) {
         console.log('goToDetailDeviceItem: ', item);
         navigation.navigate(NavigationConstants.DetailDeviceScreen, { item, prevScreen: NavigationConstants.SummaryScreen });
      } else {
         setData(data.map(it => {
            return (it.id === item.id) ? { ...it, isSelected: !item.isSelected } : it;
         }));
      }
   };

   const handleCancelBtn = () => {
      if (data.length > 0) {
         setData(data.map(it => {
            if (it.isSelected) {
               return { ...it, isSelected: false };
            } else {
               return it;
            }
         }));
      }
      setSelected(false);
   };

   const getSelectedData = () => {
      if (data.length > 0) {
         return data.filter(i => i.isSelected === true);
      }
   };

   const goToReceipt = () => {
      setData(data.map(it => { return { ...it, isSelected: false }; }));
      setSelected(false);
      navigation.navigate(NavigationConstants.ReceiptScreen, { data: getSelectedData() });
   };

   function handleRemoveDevices(): void {
      if (data.length > 0) {
         setData(data.filter(i => i.isSelected !== true));
      }
      if (data.filter(i => (i.isSelected !== false)).length === 0) {
         setSelected(false);
      }
   }

   const checkSelectedItem = (item: any) => {
      return data[data.indexOf(item)].isSelected;
   };

   const selectPressed = () => {
      setSelected(!isSelected);
      setData(data.map(it => { return { ...it, isSelected: false }; }));
   };

   const goToDevicesScreen = () => {
      setData(data.map(it => { return { ...it, isSelected: false }; }));
      setSelected(false);
      navigation.navigate(NavigationConstants.DevicesScreen);
   };

   console.log('---------- SummaryScreen ----------');
   return (
      <ContainerComponent isBackgroundImage
         left={<ArrowLeft size={35} color={appColors.black} />}
         onPressLeft={goToDevicesScreen}>
         <View style={styles.header}>
            <TextComponent text="Summary" isTitle style={styles.headerTitle} />
            <ButtonComponent onPress={selectPressed}
               title="Select"
               type="button"
               backgroundColor={isSelected ? appColors.blue2 : appColors.blue4}
               textStyle={styles.buttonSelect}
               style={styles.selectBtn}
            />
         </View>
         <FlatList
            data={data}
            renderItem={(item) => <DeviceComponent item={item.item} onPress={goToDetailDeviceItem} isSelect={checkSelectedItem(item.item)} />}
            keyExtractor={(item, index) => (item?.id + index).toString()}
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
         {
            (isSelected && data.some(e => e.isSelected === true)) &&
            <View>
               <RowComponent justify="space-between">
                  <ButtonComponent onPress={handleCancelBtn}
                     title="Cancel"
                     type="text"
                     textStyle={styles.button}
                  />
                  <ButtonComponent onPress={handleRemoveDevices}
                     title="Remove"
                     type="text"
                     textStyle={styles.button}
                  />
                  <ButtonComponent onPress={goToReceipt}
                     title="Receipt"
                     type="text"
                     textStyle={styles.button}
                  />
               </RowComponent>
            </View>
         }

         {/* </View> */}
      </ContainerComponent>


   );
};

const styles = StyleSheet.create({
   container: { paddingTop: StatusBar.currentHeight, flex: 1, paddingHorizontal: 20 },
   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
   buttonSelect: { paddingHorizontal: 20, fontSize: 17 },
   flatList: { alignSelf: 'center' },
   button: { padding: 15, fontSize: 17 },
   headerTitle: {
      paddingHorizontal: 15,
   },
   selectBtn: {
      width: 100,
      height: 40,
      marginRight: 30,
   },
});

export default SummaryScreen;
