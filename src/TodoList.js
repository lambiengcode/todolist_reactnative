import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Modal, Alert} from 'react-native'
import colors from '../Colors'
import TodoModal from './TodoModal'

export default class TodoList extends React.Component {

    state = {
        showListVisible: false
    };

    toggleListModal() {
        this.setState({showListVisible: !this.showListVisible});
    }

    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.filter(todo => todo.completed == false).length;

        return (
            <View>
                <Modal 
                    animationType="slide" 
                    visible={this.state.showListVisible} 
                    onRequestClose={() => this.toggleListModal()}>
                    <TodoModal 
                        list={list} 
                        closeModal={() => this.setState({showListVisible: false})} 
                        updateList={this.props.updateList}
                    />
                </Modal>
                <TouchableOpacity 
                    style={[styles.listContainer, {backgroundColor: list.color}]} 
                    onPress={() => this.toggleListModal()}
                    onLongPress={() => Alert.alert("Remove TodoList", "Do you want remove " + list.name + "?", [
                        {text: 'OK', onPress: () => this.props.deleteItemById(list.id)},
                        {text: 'Cancel'}
                    ])}
                >
                <Text style={styles.listTitle} numberOfLines={1}>{list.name}</Text>
    
                <View>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.count}>{remainingCount}</Text>
                        <Text style={styles.subtitile}>Remaining</Text>
                    </View>
                    <View style={{alignItems:"center"}}>
                        <Text style={styles.count}>{completedCount}</Text>
                        <Text style={styles.subtitile}>Completed</Text>
                    </View>
                </View>
            </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: colors.white,
        marginBottom: 18,
    },

    count: {
        fontSize: 48,
        fontWeight: "200",
        color: colors.white,
    },

    subtitile: {
        fontSize: 12,
        fontWeight: "700",
        color: colors.white,
    }
});