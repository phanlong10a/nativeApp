import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Block, theme } from 'galio-framework';
import { nowTheme } from '../../constants';
import { TextInput } from 'react-native-paper';
import moment from "moment";



const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;


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

  toMonney = (num) => {
    return num ? (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';
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
            label="Nguyên giá (VNĐ)"
            disabled
            value={this.toMonney(value?.originalCost)}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Đơn giá (VNĐ)"
            disabled
            value={this.toMonney(value?.unitPrice)}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Thời gian sử dụng (Tháng)"
            disabled
            value={value?.usedTime ? value?.usedTime.toString() : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Thời gian tính khấu hao (Tháng)"
            disabled
            value={value?.depreciationPeriod ? value?.depreciationPeriod.toString() : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Tỷ lệ khấu hao (%)"
            disabled
            value={value?.depreciationRate ? value?.depreciationRate.toString() : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Ngày bắt đầu tính khấu hao"
            disabled
            value={value?.depreciationDate ? moment(value?.depreciationDate).format('DD-MM-yyyy') : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Giá trị khấu hao tích lũy"
            disabled
            value={value?.accumulatedDepreciationAmount ? value?.accumulatedDepreciationAmount.toString() : ''}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Giá trị còn lại (VNĐ)"
            disabled
            value={this.toMonney(value?.carryingAmount)}
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
