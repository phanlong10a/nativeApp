import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  ImageBackground, View
} from 'react-native';

import Articles from '../screens/Articles';
// Galio components
import { Block, Text, Button as GaButton, theme } from 'galio-framework';
import Tabs from '../components/Tabs';

// Now UI themed components
import { Images, nowTheme, articles, tabs as listTabs } from '../constants';
import { Button, Select, Input, Header, Switch } from '../components';

import Img from '../components/Img';
import { Card } from '../components';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TextInput } from 'react-native-paper';
import ThongTinTaiSan from '../screens/DetailAsset/ThongTinTaiSan'
import ThongTinKhauHao from '../screens/DetailAsset/ThongTinKhauHao'
import ThongTinSanPham from '../screens/DetailAsset/ThongTinSanPham'
import NguonGocTaiSan from '../screens/DetailAsset/NguonGocTaiSan'
import HoSoTaiSan from '../screens/DetailAsset/HoSoTaiSan'
import Icon from 'react-native-vector-icons/Ionicons';



const { width } = Dimensions.get('screen');

const Tab = createBottomTabNavigator();
const thumbMeasure = (width - 48 - 32) / 3;


function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
    };
  }



  toggleSwitch = switchId => this.setState({ [switchId]: !this.state[switchId] });


  componentDidMount() {

  }


  render() {

    // alert(JSON.stringify(this.props.value.route.params.value)) 
    let value = this.props?.value?.route?.params?.value
    let tabsList = listTabs.beauty
    const defaultTab = tabsList && tabsList[0] && tabsList[0].id;
    return (

      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Thông tin chung') {
                iconName = focused
                  ? 'list'
                  : 'folder';
              } else if (route.name === 'TT khấu hao') {
                iconName = focused ? 'list' : 'folder';
              }else if (route.name === 'TT sản phẩm') {
                iconName = focused ? 'list' : 'folder';
              }else if (route.name === 'Nguồn gốc TS') {
                iconName = focused ? 'list' : 'folder';
              }else if (route.name === 'Hồ sơ tài sản') {
                iconName = focused ? 'list' : 'folder';
              }

              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Thông tin chung" children={() => <ThongTinTaiSan propName={value} />} />
          <Tab.Screen name="TT khấu hao" children={() => <ThongTinKhauHao propName={value} />} />
          <Tab.Screen name="TT sản phẩm" children={() => <ThongTinSanPham propName={value} />} />
          <Tab.Screen name="Nguồn gốc TS"  children={() => <NguonGocTaiSan propName={value} />} />
          <Tab.Screen name="Hồ sơ tài sản"  children={() => <HoSoTaiSan propName={value.id} />} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'montserrat-bold',
    paddingBottom: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    marginTop: 44,
    color: nowTheme.COLORS.HEADER
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center'
  },
  group: {
    paddingTop: theme.SIZES.BASE * 2
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
    marginHorizontal: 10
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
  productTitle: {
    color: nowTheme.COLORS.PRIMARY,
    textAlign: 'center',
    fontFamily: 'montserrat-bold',
    fontSize: 18
  }
});

export default Components;
