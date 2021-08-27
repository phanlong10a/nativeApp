import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  CheckBox, 
} from 'react-native';
import { Block, Text } from 'galio-framework';

import { TextInput, RadioButton } from 'react-native-paper';
import moment from "moment";

const { width } = Dimensions.get('screen');


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

    let value = this.props.propName
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Mã tài sản"
            disabled
            value={value?.code}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Mã quản lý"
            disabled
            value={value?.managementCode}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Sản phẩm"
            disabled
            value={value?.name}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Ngày thêm mới"
            disabled
            value={moment(value?.createDate).subtract(1, 'month').format("DD-MM-yyyy")}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Số serial"
            disabled
            value={value?.serialNumber}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Năm đưa vào sử dụng"
            disabled
            value={value?.yearPutIntoUse + ""}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Nhóm tài sản"
            disabled
            multiline
            numberOfLines={value?.assetGroup?.name.length <=120 ? 3 : 5}
            value={value?.assetGroup?.name}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Trạng thái"
            disabled
            value={value?.status?.name}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50, flexDirection: 'row' }} >
          <CheckBox
            disabled
            value={value?.isManageAccountant}
          />
          <Text style={{marginTop: 7}}>Kế toán quản lý</Text>
          <CheckBox
            disabled
            value={value?.isTemporary}
          />
          <Text style={{marginTop: 7}}>Tạm giao</Text>
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Tháng bảo hành"
            disabled
            value={value?.warrantyMonth ? value?.warrantyMonth.toString() : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Ngày hết hạn bảo hành"
            disabled
            value={value?.warrantyExpiryDate ? moment(value?.warrantyExpiryDate).format("DD-MM-yyyy") : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Vị trí lắp đặt"
            disabled
            value={value?.installationLocation}
            onChangeText={text => setText(text)}
          />
        </Block>
        {value?.status && value?.status?.indexOrder && value?.status?.indexOrder != 0 ?
          (
            <Block>
              <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
                <Text>Cấp phát cho: </Text>
              </Block>
              <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50, flexDirection: 'row' }} >
                <RadioButton
                  disabled
                  value={1}
                  status={value?.allocationFor == 1 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(1)}
                />
                <Text style={{marginTop: 7}}>Phòng ban</Text>
                <RadioButton
                  disabled
                  value={2}
                  status={value?.allocationFor == 2 ? 'checked' : 'unchecked'}
                  onPress={() => setChecked(2)}
                />
                <Text style={{marginTop: 7}}>Người sử dụng</Text>
              </Block>
            </Block>
          ) : (
            <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
              <TextInput
                label="Tên kho"
                disabled
                value={value?.store?.name}
                onChangeText={text => setText(text)}
              />
            </Block>
          )}
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Phòng ban quản lý"
            disabled
            value={value?.managementDepartment?.name}
            onChangeText={text => setText(text)}
          />
        </Block>
        {value?.allocationFor && value?.allocationFor === 1 ?
          (
            <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
              <TextInput
                label="Phòng ban sử dụng"
                disabled
                value={value?.useDepartment?.name}
                onChangeText={text => setText(text)}
              />
            </Block>
          ) : (
            <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
              <TextInput
                label="Người sử dụng"
                disabled
                value={value?.usePerson?.displayName}
                onChangeText={text => setText(text)}
              />
            </Block>
          )}
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Tên nhà cung cấp"
            disabled
            value={value?.supplyUnit?.name}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Ghi chú"
            disabled
            multiline
            numberOfLines={10}
            value={value?.note}
            onChangeText={text => setText(text)}
          />
        </Block>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
});

export default Components;
