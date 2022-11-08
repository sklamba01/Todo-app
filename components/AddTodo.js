import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Button, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


const AddTodo = (props) => {
    const [title, setTitle] = useState("")
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const [timePicker, setTimePicker] = useState(false);
    const [time, setTime] = useState(new Date(Date.now()));

    const navigation = useNavigation();

    function showDatePicker() {
        setDatePicker(true);
    };

    function showTimePicker() {
        setTimePicker(true);
    };

    function onDateSelected(event, value) {
        setDate(value);
        setDatePicker(false);
    };

    function onTimeSelected(event, value) {
        setTime(value);
        setTimePicker(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) return;
        const _todo = {};
        _todo['title'] = title;
        _todo['status'] = 1;
        _todo['date'] = date.toDateString();
        _todo['time'] = time.toLocaleTimeString('en-US');
        props.addTodo(_todo);
        props.setOnAddTodo(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.innerContainer}>
                <TextInput
                    autoFocus={true}
                    style={styles.input}
                    value={title}
                    onChangeText={(text) => { setTitle(text) }}
                    label="Title"
                    placeholder='Title'
                />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.dateTimeShow}>Date = {date.toDateString()}</Text>
                    {!datePicker && (
                        <View style={styles.dateTimePicker}>
                            <Button title="Pick Date" color="green" onPress={showDatePicker} />
                        </View>
                    )}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.dateTimeShow}>Time = {time.toLocaleTimeString('en-US')}</Text>
                    {!timePicker && (
                        <View style={styles.dateTimePicker}>
                            <Button title="Pick Time" color="green" onPress={showTimePicker} />
                        </View>
                    )}
                </View>

                {datePicker && (
                    <DateTimePicker
                        value={date}
                        mode={'date'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={true}
                        minimumDate={new Date()}
                        onChange={onDateSelected}
                    />
                )}
                {timePicker && (
                    <DateTimePicker
                        value={time}
                        mode={'time'}
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        is24Hour={false}
                        minimumDate={new Date()}
                        onChange={onTimeSelected}
                    />
                )}


                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>
                        Save
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => props.setOnAddTodo(false)}>
                    <Text style={styles.btnText}>
                        Back
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView >
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
    dateTimeShow: {
        height: 35,
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        padding: 0,
        flex: 2,
    },
    dateTimePicker: {
        height: 35,
        marginTop: 10,
        marginBottom: 10,
        padding: 0,
        flex: 1,
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
        justifyContent: 'center',
    },
    btnText2: {
        color: '#841584',
        fontSize: 14
    }
});

export default AddTodo