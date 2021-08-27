import React from 'react';
import {
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Block } from 'galio-framework';
import { TextInput } from 'react-native-paper';


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
            label="Model tài sản"
            disabled
            value={value?.model}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Hãng sản xuất"
            disabled
            value={value?.manufacturer?.name}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Xuất xứ"
            disabled
            value={value?.madeIn}
            onChangeText={text => setText(text)}
          />
        </Block>
        <Block style={{ marginTop: 5, marginLeft: 10, marginBottom: 10, marginRight: 10, borderRadius: 50 }} >
          <TextInput
            label="Năm sản xuất"
            disabled
            value={value?.yearOfManufacture ? value?.yearOfManufacture.toString() : ''}
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
