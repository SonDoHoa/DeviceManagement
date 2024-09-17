import { FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { appColors } from '../../utilities/contants/appColor';
import TextComponent from '../../components/TextComponent';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import DeviceComponent from '../../components/DeviceComponent';
import InputComponent from '../../components/InputComponent';
import { SearchNormal1 } from 'iconsax-react-native';
import { NavigationConstants } from '../../navigation/NavigationConstants';
import { DATA } from '../../assets/deviceDatas/DATA';
import { appInfo } from '../../utilities/contants/appInfo';
import RowComponent from '../../components/RowComponent';
import ButtonComponent from '../../components/ButtonComponent';
import { useDispatch } from 'react-redux';
import { DeviceState, addDevices, removeDevices } from '../../redux/Reducers/DevicesSlice';

const DevicesScreen = ({ navigation }: any) => {

   const [data, setData] = useState(DATA.map(it => { return { ...it, isSelected: false }; }));
   const [searchText, setSearchText] = useState('');
   const [filteredData, setFilteredData] = useState<any>([]);
   const [isSelected, setSelected] = useState(false);

   const dispatch = useDispatch();

   const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      if (filteredData.length > 0) {
         setFilteredData(filteredData.map((it: any) => {
            if (it.isSelected) {
               return { ...it, isSelected: false };
            } else {
               return it;
            }
         }));
      }
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

   const handleRemoveDevices = () => {
      if (searchText !== '') {
         setFilteredData(filteredData.filter((item: any) => item.isSelected !== true));
      } else {
         setData(data.filter(item => item.isSelected !== true));
      }
      dispatch(removeDevices(getSelectedData()));
   };

   const getSelectedData = () => {
      let selectedData = [];
      if (filteredData.length > 0) {
         selectedData = filteredData.filter((i: any) => i.isSelected === true);
      }
      if (data.length > 0) {
         selectedData = data.filter((i: any) => i.isSelected === true);
      }
      return selectedData;
   };

   const handleAddToCart = () => {
      dispatch(addDevices(getSelectedData().map((item: DeviceState) => {
         return {
            id: item.id,
            name: item.name,
            description: item.description,
            quantity: item.quantity,
            status: item.status,
            note: item.note,
            fee: item.fee,
            image: item.image,
         };
      })));
      navigation.navigate(NavigationConstants.SummaryScreen);
   };

   const handleSearch = () => {
      console.log('Search key: ', searchText);
      let filtered: any[] = [];
      data.forEach((item) => {
         if (item.name.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText) ||
            item.fee.toLowerCase().includes(searchText) ||
            item.note.toLowerCase().includes(searchText) ||
            item.quantity.toString().toLowerCase().includes(searchText)
         ) {
            filtered = [...filtered, item];
         }
      }
      );

      setFilteredData(filtered);
   };

   const debounce = useCallback((func: Function, delay: number) => {
      if (debounceTimeoutRef.current) {
         clearTimeout(debounceTimeoutRef.current);
      }

      debounceTimeoutRef.current = setTimeout(() => {
         func();
      }, delay);
   }, []);

   const onSearch = (text: string) => {
      setSearchText(text);
      debounce(() => handleSearch(), 500);
   };

   const checkSelectedItem = (item: any) => {
      if (filteredData.length > 0) {
         return filteredData[filteredData.indexOf(item)].isSelected;
      }
      return data[data.indexOf(item)].isSelected;
   };

   return (
      <View style={styles.container}>
         <View style={styles.headerView}>
            <TextComponent text="Devices" isTitle />
            <ButtonComponent onPress={() => { setSelected(!isSelected); }}
               title="Select"
               textStyle={styles.headerTitle}
               type="text"
            />
         </View>
         <InputComponent
            onChange={onSearch}
            value={searchText}
            placeholder="Search device"
            isClear
            style={styles.input}
            frontIcon={<SearchNormal1 size={22} color={appColors.gray} />}
         />
         <FlatList
            data={searchText ? filteredData : data}
            extraData={[searchText, data, filteredData]}
            renderItem={(item) => <DeviceComponent item={item.item} onPress={goToDetailDeviceItem} isSelect={checkSelectedItem(item.item)} />}
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
                     textStyle={styles.button}
                     type="text"
                  />
                  <ButtonComponent onPress={handleAddToCart}
                     title="Add to Cart"
                     textStyle={styles.button}
                     type="text"
                  />
               </RowComponent>
            </View>
         }

      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      paddingTop: StatusBar.currentHeight, flex: 1, paddingHorizontal: 20,
   },
   item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
   },
   title: {
      fontSize: 32,
   },
   headerView: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
   headerTitle: { padding: 20, fontSize: 17 },
   input: { marginBottom: 20 },
   flatlist: { alignSelf: 'center' },
   button: { padding: 15, fontSize: 17 },
});

export default DevicesScreen;
