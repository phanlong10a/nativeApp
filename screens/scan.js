import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import ConstantList from "../constants/appConfig";
import * as Progress from 'react-native-progress';
import { searchByPage } from "../serivce/AssetService";
import BarcodeMask from 'react-native-barcode-mask';

export default class Scan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: false,
      scanned: true,
      data: [],
      isLoading: true,
      rowsPerPage: 10,
      page: 0,
      username: "bvranghammat",
      password: "bvrhm@123",
      message: "Chạm để quét mã QR tài sản!",
      type: BarCodeScanner.Constants.Type.back
    };
  }


  componentDidMount() {
    let status = BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: (status != null) });
  }

  setType(typeForm) {
    this.setState({ type: typeForm })
  }

  search = (key) => {
    const { navigation } = this.props;
    let { useDepartment, yearPutIntoUse, originalCost } = this.state;
    var searchObject = {};
    searchObject.keyword = key;
    searchObject.pageIndex = this.state.page + 1;
    searchObject.pageSize = this.state.rowsPerPage;
    searchByPage(searchObject).then(({ data }) => {
      if (data.totalElements > 0) {
        this.setState({ scanned: false })
        navigation.navigate('Components', { value: [...data.content][0] });
      } else {
        this.setState({ message: "Không tìm thấy tài sản, ấn để quét lại", scanned: true })
      }
    });
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.search(data)
  };



  render() {
    let {
      password,
      username, error, loading, scanned, message, hasPermission, type
    } = this.state;


    return (
      <View style={styles.container}>
        {!hasPermission ?
          <Text>Vui lòng cấp quyền sử dụng camera cho ứng dụng</Text>
          :
          <>

            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
              type={type}
            >
              <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
            </BarCodeScanner>
            {scanned &&
              <TouchableOpacity
                style={styles.appButtonContainerScan}
                onPress={() => this.setState({ scanned: false })}>
                <Text style={styles.appButtonText}>{message + ""} </Text>
              </TouchableOpacity>
            }

            <TouchableOpacity
              style={styles.appButtonContainer}
              onPress={() => {
                this.setType(
                  type === BarCodeScanner.Constants.Type.back
                    ? BarCodeScanner.Constants.Type.front
                    : BarCodeScanner.Constants.Type.back
                );
              }}>
              <Text style={styles.appButtonText}> Đổi chiều camera </Text>
            </TouchableOpacity>
          </>
        }
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 300,
    width: 200,
  },
  appButtonText: {
    fontSize: 18,
    paddingTop: 4,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  appButtonContainerScan: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FF6300",
    borderRadius: 10,
  },
  appButtonText: {
    fontSize: 18,
    paddingTop: 4,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
