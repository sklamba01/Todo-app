import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { deleteRealm, fetchObjects, realm, save } from '../service/realm';
import AddTodo from './AddTodo';
import TodoItem from './TodoItem';

const STORAGE_KEY = '@todos';

function TodoList(props) {
  const [id, setId] = useState(0);
  const [todos, setTodos] = useState([]);
  const navigation = useNavigation();
  const [onAddTodo, setOnAddTodo] = useState(false);
  const [currentList, setCurrentList] = useState(1);
  const [flag, setFlag] = useState(1);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      // alert("Data successfully saved!");
    } catch (e) {
      console.error(e);
    }
  }
  const retrieveData = async () => {
    // try {
    //   const value = await AsyncStorage.getItem(STORAGE_KEY)
    //   if (value !== null) {
    //     setTodos(JSON.parse(value));
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
    const value = fetchObjects('Todo');
    setTodos(value);
  }
  const clearData = async () => {
    try {
      AsyncStorage.clear();
      setTodos([]);
      alert("data cleared");
    } catch (e) {
      console.error(e);
    }
  }

  const addTodo = (todo) => {
    todo['id'] = id;
    console.log(todo)
    save('Todo', todo)
    setFlag(flag + 1);
    setId(id + 1);
  }

  const updateTodo = (_id) => {
    let todo = {};
    todos.forEach(t => {
      if (t.id === _id) {
        todo = t;
      }
    })
    console.log(todo)
    save('Todo', {
      id: todo.id,
      status: todo.status + 1,
      title: todo.title,
      date: todo.date.toDateString(),
      time: todo.time.toLocaleTimeString('en-US'),
    });
    deleteRealm(todo)
    setFlag(flag + 1);
  }

  const deleteAll = () => {
    todos.forEach(e => deleteRealm(e));
    setFlag(flag + 1);
  }

  useEffect(() => {
    setTodos(fetchObjects('Todo'));
    if (todos) {
      todos.forEach(todo => {
        if (todo.id > id) {
          setId(todo.id + 1);
        }
      })
    } else {
      setId(0);
    }
  }, [useIsFocused(), flag]);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', backgroundColor: 'grey' }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'grey' }}>
        <Text style={{
          justifyContent: 'center',
          textAlign: 'center',
          marginVertical: 8,
          fontSize: 50
        }}>
          Todo List
        </Text>
      </View>

      {onAddTodo ? <AddTodo addTodo={addTodo} setOnAddTodo={setOnAddTodo} /> :

        <View style={styles.container}>
          <View style={{
            flexDirection: 'row',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            position: 'absolute',
            top: -20,
            left: 60,
            width: 300,
            height: 40,
            backgroundColor: '#6699ff',
          }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setCurrentList(1)}>
              <Text style={{ textAlign: 'center', fontSize: 25, color: currentList == 1 ? 'blue' : 'black' }}>
                Todo
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setCurrentList(2)}>
              <Text style={{ textAlign: 'center', fontSize: 25, color: currentList == 2 ? 'blue' : 'black' }}>
                Doing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => setCurrentList(3)}>
              <Text style={{ textAlign: 'center', fontSize: 25, color: currentList == 3 ? 'blue' : 'black' }}>
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.innerContainer}>
            {/* <FlatList> */}
            {todos && todos.map((todo, index) => (
              todo.status === currentList && <TodoItem key={index} updateTodo={updateTodo} currentList={currentList} todo={todo} index={index} />
            ))}
            {/* </FlatList> */}
            <TouchableOpacity style={styles.btn} onPress={() => deleteAll()}>
              <Text style={styles.btnText}>
                Clear all data
              </Text>
            </TouchableOpacity>
            <Text style={styles.addTodo} onPress={() => setOnAddTodo(true)}>
              +
            </Text>
            <Text style={styles.btnText2} onPress={() => navigation.navigate('Login')}>
              Log-out
            </Text>
          </View>
        </View>
      }
    </SafeAreaView>
  )
};



const styles = StyleSheet.create({
  container: {
    flex: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  innerContainer: {
    flex: 2,
    margin: 40
  },
  title: {
    textAlign: 'center',
    fontSize: 25
  },
  input: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 0,
  },
  btn: {
    marginTop: 10,
    backgroundColor: '#841584',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  btnText: {
    color: 'white',
    fontSize: 17
  },
  btn2: {
    backgroundColor: 'white',
    borderRadius: 4,
  },
  btnText2: {
    color: '#841584',
    fontSize: 14,
    position: 'absolute',
    bottom: -20,
    right: 10,
  },
  addTodo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#6699ff',
    borderRadius: 100,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 45,
    color: 'white',
  },
});



export default TodoList;