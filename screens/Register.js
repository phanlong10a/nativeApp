import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback, View,
  Keyboard, CheckBox
} from 'react-native';
import { Block, Checkbox, Text, Button as GaButton, theme } from 'galio-framework';

import { Button, Icon, Input } from '../components';
import { Images, nowTheme } from '../constants';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

import ConstantList from "../constants/appConfig";
import { searchByPage } from "../serivce/AssetService";
import * as Progress from 'react-native-progress';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic Y29yZV9jbGllbnQ6c2VjcmV0'
  }
}



export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      rowsPerPage: 10,
      page: 0,
      username: "bvranghammat",
      password: "bvrhm@123",
    };
  }

  setSession(token) {
    if (token) {
      try {
        AsyncStorage.setItem(
          'jwt_token',
          token
        );
      } catch (error) {
        // Error saving data
      }
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      AsyncStorage.removeItem("jwt_token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };


  login() {
    const { navigation } = this.props;
    this.setState({ loading: true })
    let requestBody = 'client_id=core_client&grant_type=password&client_secret=secret';
    requestBody = requestBody + '&username=' + this.state.username + '&password=' + this.state.password;
    axios.post(ConstantList.API_ENPOINT + '/oauth/token', requestBody, config).then(response => {
      this.setSession(response.data.access_token)
      this.setState({ loading: false })
      navigation.navigate('App')
    }).catch(error => {
      alert("Sai tài khoản hoặc mật khẩu")
      this.setState({ error: "Sai tài khoản hoặc mật khẩu" })
      this.setState({ loading: false })
    });

  }


  componentDidMount() {
  }

  handleTextChangeUsername = (event) => {
    this.setState({
      username: event,
    });
  };

  handleTextChangePassword = (event) => {
    this.setState({
      password: event,
    });
  };

  setSelection = (event) => {
    if (this.state.isSaveAccount == true) {
      this.setState({ isSaveAccount: false })
    } else {
      this.setState({ isSaveAccount: true })
    }
  }


  render() {
    let {
      password,
      username, error, loading, isSaveAccount
    } = this.state;


    return (
      <DismissKeyboard>
        <Block flex middle>
          <ImageBackground
            source={Images.RegisterBackground}
            style={styles.imageBackgroundContainer}
            imageStyle={styles.imageBackground}
          >
            <Block flex middle>
              <Block style={styles.registerContainer}>
                <Block flex space="evenly">
                  <Block flex={0.4} middle style={styles.socialConnect}>
                    <Block flex={0.5} middle>
                      <Text
                        style={{
                          textAlign: 'center'
                        }}
                        color="#333"
                        size={24}
                      >
                        Đăng nhập
                      </Text>
                    </Block>

                  </Block>

                  <Block flex={1} middle space="between">
                    <Block center flex={0.9}>
                      <Block flex space="between">
                        <Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Tài khoản"
                              style={styles.inputs}
                              onChangeText={this.handleTextChangeUsername}
                              name="username"
                              value={username}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="profile-circle"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Block width={width * 0.8} style={{ marginBottom: 5 }}>
                            <Input
                              placeholder="Mật khẩu"
                              style={styles.inputs}
                              secureTextEntry={true}
                              onChangeText={this.handleTextChangePassword}
                              name="password"
                              value={password}
                              iconContent={
                                <Icon
                                  size={16}
                                  color="#ADB5BD"
                                  name="caps-small2x"
                                  family="NowExtra"
                                  style={styles.inputIcons}
                                />
                              }
                            />
                          </Block>
                          <Text style={{ height: 40, color: 'red', }}>{error}</Text>
                        </Block>

                        <Block center>
                          {loading ?
                            <Progress.Circle size={30} indeterminate={true} /> :
                            <TouchableOpacity
                              activeOpacity={0.7}
                              onPress={this.login.bind(this)}
                            >
                              <Button color="primary" round style={styles.createButton}>
                                <Text
                                  size={14}
                                  color={nowTheme.COLORS.WHITE}

                                >
                                  Đăng nhập
                                </Text>
                              </Button>
                            </TouchableOpacity>

                          }
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ImageBackground>
        </Block>
      </DismissKeyboard>
    );
  }
}



const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  imageBackground: {
    width: width,
    height: height
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden'
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
    marginBottom: 40
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10
  }, checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});