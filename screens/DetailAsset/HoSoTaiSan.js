import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { searchByPageAssetDocument } from "../../serivce/AssetService";


class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkSelected: [],
      'switch-1': true,
      'switch-2': false,
      id: this.props.propName,
      tableData: [],
      content: []
    };
  }

  updatePageData = () => {
    var searchObject = {};
    searchObject.id = this.state.id;
    searchObject.pageIndex = 1;
    searchObject.pageSize = 9999;
    searchObject.documentType =1;

    searchByPageAssetDocument(searchObject).then(({ data }) => { 
        this.setState({  content: [...data.content]}) ;
        console.log([...data.content])
    });
  }


  componentDidMount() {
    this.updatePageData()
  }


  render() {

    let { tableData, content } = this.state
    let tableHead = ['STT', 'Mã hồ sơ', 'Tên hồ sơ', 'Mô tả']
    let widthArr = [40, 100, 100, 300]
    content.forEach((e, index) => {
      const rowData = [index, e?.code, e?.name, e?.description];
      tableData.push(rowData);
    });
    return (
      <View style={styles.container}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text} />
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={widthArr}
                      style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});

export default Components;
