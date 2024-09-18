import {StyleSheet} from 'react-native';
import {appColors} from '../Contants/appColor';
import {appInfo} from '../Contants/appInfo';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    color: '#000000',
  },
  button: {
    alignSelf: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
    backgroundColor: appColors.blue,
    borderRadius: 15,
    //  minHeight: 58,
    //  minWidth: appInfo.sizes.WIDTH * 0.8,
    alignItems: 'center',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
