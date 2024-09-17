import { View, StyleSheet, FlatList, StatusBar } from 'react-native';
import React, { useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent';
import DeviceComponent from '../../components/DeviceComponent';
import RowComponent from '../../components/RowComponent';
import { appInfo } from '../../utilities/contants/appInfo';
import TextComponent from '../../components/TextComponent';
import { NavigationConstants } from '../../navigation/NavigationConstants';
import { useAppSelector } from '../../redux/Hooks';

const SummaryScreen = ({ navigation }: any) => {
   const [data, setData] = useState(useAppSelector((state) => state.devices).devices.map(it => { return { ...it, isSelected: false }; }));
   const [isSelected, setSelected] = useState(false);

   // useEffect(() => {
   //    console.log('new device info: ', route);
   //    if (route.params?.deviceData) {
   //       const updatedItem = route.params.deviceData;

   //       setData((prevData) =>
   //          prevData.map((item) =>
   //             (typeof (item) === typeof (updatedItem)) && (item.id === updatedItem.id) ? updatedItem : item
   //          )
   //       );
   //    }
   // }, [route]);

   const goToDetailDeviceItem = (item: any) => {
      if (!isSelected) {
         console.log('goToDetailDeviceItem: ', item);
         navigation.navigate(NavigationConstants.DetailDeviceScreen, { item });
      } else {
         setData(data.map(it => {
            return (it.id === item.id) ? { ...it, isSelected: true } : it;
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
      navigation.navigate(NavigationConstants.ReceiptScreen, { data: getSelectedData() });
   };

   function handleRemoveDevices(): void {
      if (data.length > 0) {
         setData(data.filter(i => i.isSelected !== true));
      }
   }

   const checkSelectedItem = (item: any) => {
      return data[data.indexOf(item)].isSelected;
   };

   return (
      <View style={styles.container}>
         <View style={styles.header}>
            <TextComponent text="Summary" isTitle />
            <ButtonComponent onPress={() => { setSelected(!isSelected); }}
               title="Select"
               type="text"
               textStyle={styles.buttonSelect}
            />
         </View>
         <FlatList
            data={data}
            renderItem={(item) => <DeviceComponent item={item.item} onPress={goToDetailDeviceItem} isSelect={checkSelectedItem(item.item)} />}
            keyExtractor={(item, index) => (item?.id + index).toString()}
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
                     title="Add to Cart"
                     type="text"
                     textStyle={styles.button}
                  />
               </RowComponent>
            </View>
         }

      </View>
   );
};

const styles = StyleSheet.create({
   container: { paddingTop: StatusBar.currentHeight, flex: 1, paddingHorizontal: 20 },
   header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
   buttonSelect: { padding: 20, fontSize: 17 },
   flatlist: { alignSelf: 'center' },
   button: { padding: 15, fontSize: 17 },
});

export default SummaryScreen;
