import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, View, Button, Pressable, TouchableOpacity } from 'react-native'

const Login = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [onLogin, setOnLogin] = useState(true);

    const handleSubmit = () => {
        console.log(name);
        console.log(email + ' ' + password);
    }

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>
                    {onLogin ? 'Log-in' : 'Sign-up'}
                </Text>
                {!onLogin && <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => { setName(text) }}
                    label="Name"
                    placeholder='Name'
                />}
                <TextInput
                    value={email}
                    style={styles.input}
                    onChangeText={(text) => { setEmail(text) }}
                    label="Email"
                    placeholder='Email'
                />
                <TextInput
                    secureTextEntry={true}
                    autoCorrect={false}
                    value={password}
                    style={styles.input}
                    onChangeText={(text) => { setPassword(text) }}
                    label="Password"
                    placeholder='Password'
                // keyboardType="numeric"
                />
                <Button
                    style={{ paddingRight: 15, }}
                    name={true ? "eye" : 'eye-slash'}
                    size={20} color='gray'
                    onPress={() => { }}
                />

                <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>{onLogin ? 'Log-in' : 'Sign-up'}</Text>
                </TouchableOpacity>
                <View style={{ textAlign: 'center' }}>
                    <Text>
                        {onLogin ? "Don't have an account? " : "Already have an account? "}
                        <Text style={styles.btnText2} onPress={() => { setOnLogin(!onLogin) }}>
                            {onLogin ? 'Sign-up' : 'Log-in'}
                        </Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white'
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
        fontSize: 14
    }
});

export default Login