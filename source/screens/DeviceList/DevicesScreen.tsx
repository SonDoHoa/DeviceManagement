import { FlatList, StyleSheet } from 'react-native';
import React, {useState}  from 'react';
import { appColors } from '../../utilities/contants/appColor';
import SectionComponent from '../../components/SectionComponent';
// import { DATA } from '../../assets/deviceDatas/DATA';
import TextComponent from '../../components/TextComponent';
import { View } from 'react-native';
import { StatusBar } from 'react-native';
import DeviceComponent from '../../components/DeviceComponent';
import { globalStyles } from '../../utilities/styles/globalStyles';
import InputComponent from '../../components/InputComponent';
import { SearchNormal1 } from 'iconsax-react-native';
import { NavigationConstants } from '../../navigation/NavigationConstants';
import { DATA } from '../../assets/deviceDatas/DATA';
import { appInfo } from '../../utilities/contants/appInfo';

const DevicesScreen = ({navigation} : any) => {
   const [searchDevice, setSearchDevice] = useState('');
   const goToDetailDeviceItem = (item: any) => {
      console.log('goToDetailDeviceItem: ', item);
      navigation.navigate(NavigationConstants.DetailDeviceScreen,{item});
   };
  return (
    <View style={globalStyles.container}>
      <SectionComponent>
         <TextComponent text="Devices" isTitle/>
         <InputComponent
           onChange={val => {
            setSearchDevice(val);
           }}
           value={searchDevice}
           placeholder="Search device"
           isClear
           style={{marginBottom: 20}}
           frontIcon={<SearchNormal1 size={22} color={appColors.gray} />}
         />
      </SectionComponent>
      <SectionComponent>
      <FlatList
        data={DATA}
        renderItem={(item) => <DeviceComponent item={item.item} onPress={goToDetailDeviceItem}/>}
        keyExtractor={item => item.id.toString()}
        getItemLayout={(data, index) => ({
         length: appInfo.ITEM_HEIGHT,
         offset: appInfo.ITEM_HEIGHT * index,
         index,
       })}
       initialNumToRender={10}
         maxToRenderPerBatch={10}
         windowSize={10}
         removeClippedSubviews={true}
         showsVerticalScrollIndicator={false}
      />
      </SectionComponent>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
});

export default DevicesScreen;
