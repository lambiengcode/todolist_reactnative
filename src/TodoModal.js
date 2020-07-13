import React from 'react'
import {View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform, FlatList, KeyboardAvoidingView, TextInput, Keyboard, Animated, Alert} from 'react-native'
import {AntDesign, Ionicons} from '@expo/vector-icons'
import colors from '../Colors';
import Swipeable from 'react-native-gesture-handler/Swipeable'

export default class TodoModal extends React.Component {

    state = {
        newToDo: ""
    };

    addTodo = () => {
        let list = this.props.list;
        list.todos.push({title: this.state.newToDo, completed: false});

        this.props.updateList(list);
        this.setState({newToDo: ""});

        Keyboard.dismiss();
    }

    removeTodo = index => {
        let list = this.props.list;
        list.todos.pop(index);

        this.props.updateList(list);
    }

    renderTodo = (todo, index) => {
        return (
            <TouchableOpacity 
                onPress={() => this.toggleTodoCompleted(index)} 
                onLongPress={() => Alert.alert("Remove Task", "Do you want remove this task?", [
                    {text: 'OK', onPress: () => this.removeTodo(index)},
                    {text: 'Cancel'}
                ])
            }>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                        <Ionicons name={todo.completed ? "ios-square" : "ios-square-outline"} size={24} color={colors.gray} style={{width: 32}}/>
                    </TouchableOpacity>


                    <Text 
                        style={[styles.todo, 
                            {color: todo.completed ? colors.gray : colors.black, 
                            textDecorationLine: todo.completed ? 'line-through' : 'none' }]}>{todo.title}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    };

    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;

        this.props.updateList(list);
    }

    render() {
        const list = this.props.list

        const taskCount = list.todos.length
        const completedCount = list.todos.filter(todos => todos.completed).length

        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity 
                    style={{position: "absolute", top: 64, right: 32, zIndex: 10}} 
                    onPress = {this.props.closeModal}>
                    <AntDesign name = "close" size={24} color={colors.black}/>
                </TouchableOpacity>

                <View style={[styles.section, styles.header, {borderBottomColor: list.color}]}>
                    <View>
                        <Text style={styles.title}>{list.name}</Text>
                        <Text style={styles.taskCount}>
                            {completedCount} of {taskCount} tasks
                        </Text>
                    </View>
                </View>

                <View style={[styles.section, {flex: 3}]}>
                    <FlatList 
                        data={list.todos} 
                        renderItem={({item, index}) => this.renderTodo(item, index)} 
                        keyExtractor={item => item.title}
                        contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                        showsVerticalScrollIndicator={false}
                    />
                </View>

                <View style={[styles.section, styles.footer]}>
                    <TextInput 
                        style={[styles.input, {borderColor: list.color}]} 
                        onChangeText={text =>this.setState({newToDo: text})}
                        value={this.state.newToDo}
                    />
                    <TouchableOpacity 
                        style={[styles.addToDo, {backgroundColor: list.color}]} 
                        onPress={() => this.addTodo()}
                    >
                        <AntDesign name="plus" size={16} color={colors.white}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    section: {
        flex: 1,
        alignSelf: "stretch"
    },

    header: {
        justifyContent: "flex-end",
        marginLeft: 72,
        borderBottomWidth: 5,
    },

    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: colors.black
    },

    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        color: colors.gray,
        fontWeight: "600",
    },

    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center",
    },

    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8,
    },

    addToDo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },

    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },

    todo: {
        color: colors.black,
        fontWeight: "700",
        fontSize: 16
    },

    btnDelete: {
        flex: 1,
        backgroundColor: colors.red,
        justifyContent: 'center',
        alignItems: "center",
        width: 80,
    },
});