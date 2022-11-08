import React from 'react'
import { View, SafeAreaView, Text, StyleSheet, Image } from 'react-native'

const TodoItem = (props) => {
  return (
    <SafeAreaView>
      <View>
        <View style={styles.todoList}>
          <Text style={styles.todoColor}>
          </Text>
          <Text style={styles.todoIcon}>
            <Image style={styles.addTodoImage} source={require('../images/briefcase.png')} />
          </Text>
          <View style={{ flexDirection: 'column', flex: 50, }}>
            <Text style={styles.todoTitle}>
              {props.todo.title}
            </Text>
            <View style={{ flexDirection: 'row', flex: 1, }}>
              <Text style={{ flex: .2 }}></Text>
              <Text style={{ flex: 2, fontSize: 11.6, }}>
                {props.todo.date}
              </Text>
              <Text style={{ flex: 1, fontSize: 11.6, }}>
                {props.todo.time}
              </Text>
            </View>
          </View>
          <Text style={styles.todoDueDate}>
            {props.todo.dueDate}
          </Text>
          {props.todo.status != 3 && <Text style={styles.markTodo} onPress={() => props.updateTodo(props.todo.id)}>
            <Image style={styles.doneImage} source={require('../images/done.png')} />
          </Text>
          }
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 30,
  },
  todoList: {
    flexDirection: 'row',
    backgroundColor: '#d9d9d9',
    margin: 5,
    height: 80,
    borderRadius: 10,
  },
  todoColor: {
    flex: 1,
    backgroundColor: 'green',
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
  },
  todoIcon: {
    flex: 10,
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#bfbfbf',
    textAlignVertical: 'center',
  },
  todoTitle: {
    flex: 2,
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  todoDueDate: {
    flex: 10,
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  markTodo: {
    flex: 10,
    backgroundColor: '#bfbfbf',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  addTodoImage: {
    height: 30,
    width: 30,
  },
  doneImage: {
    height: 30,
    width: 30,
    textAlignVertical: 'center',
  },
});

export default TodoItem