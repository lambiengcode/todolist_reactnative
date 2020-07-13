import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import colors from './Colors'
import tempData from './tempData'
import TodoList from './src/TodoList'
import AddListModal from './src/AddListModal'

export default class App extends React.Component {

  state = {
    addToDoVisible: false,
    lists: tempData,
    user: {},
    loading: false
  }

  toggleAddToDoModal() {
    this.setState({addToDoVisible: !this.addToDoVisible})
  }

  closeModalToggle() {
    this.setState({addToDoVisible: false})
  }

  addList = list => {
    this.setState({lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos:[] }]})
  };

  deleteItemById = id => {
    const filteredData = this.state.lists.filter(item => item.id !== id);
    this.setState({ lists: filteredData });
  }

  updateList = list => {
    this.setState({
      lists: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    })
  };

  render() {
    return (
      <View style={styles.container}>
        <Modal 
          animationType="slide" 
          visible={this.state.addToDoVisible} 
          onRequestClose={() => this.closeModalToggle()}>
          <AddListModal closeModal={() => this.closeModalToggle()} addList={this.addList}/>
        </Modal>
      
        <View style = {{flexDirection: "row"}}>
          <View style={styles.divider}/>
          <Text style={styles.title}>
            Todo <Text style={{fontWeight: "300", color: colors.blue}}> Lists</Text>
          </Text>
          <View style={styles.divider}/>
        </View>

        <View style={{marginVertical: 48}}>
          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddToDoModal()}>
            <AntDesign name="plus" size={16} color={colors.blue}/>
          </TouchableOpacity>

          <Text style={styles.add}>Add List</Text>
        </View>

        <View style={{height: 275, paddingLeft: 32}}>
          <FlatList 
            data={this.state.lists} 
            keyExtractor={item => item.name} 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => <TodoList list={item} updateList={this.updateList} deleteItemById={this.deleteItemById}/>}
            keyboardShouldPersistTaps="always"
            />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },

  divider: {
    backgroundColor: colors.lightblue,
    flex: 1,
    height: 1,
    alignSelf: "center",
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: colors.black,
    paddingHorizontal: 48,
  },

  addList: {
    borderWidth: 2,
    borderColor: colors.lightblue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8,
  },
});
