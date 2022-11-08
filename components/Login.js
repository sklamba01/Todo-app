import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Text, StyleSheet, TextInput, View, Button, Pressable, TouchableOpacity } from 'react-native'

const Login = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [onLogin, setOnLogin] = useState(true);
    const navigation = useNavigation();

    const toggle = () => {
        setOnLogin(!onLogin)
        setName("");
        setEmail("");
        setPassword("");
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validatePassword = (password) => {
        const ret = { value: false, message: "" };
        if (password.length < 2 || password.length > 11) {
            ret.message = "Password length must be between 3 and 10";
        } else {
            ret.value = true;
            ret.message = "Valid password"
        }
        return ret;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((!onLogin && !name) || !email || !password) return;
        if (!onLogin) {
            alert("Sign-up");
            return;
        }
        if (!validateEmail(email)) {
            const passValidation = validatePassword(password);
            if (passValidation.value) {
                fetch('http://10.0.2.2:8080/login?username=' + encodeURIComponent(email) +
                    '&password=' + encodeURIComponent(password), {
                    method: 'POST'
                }).then((res) => {
                    console.log(res.status === 200);
                    if (res.status === 200) {
                        alert("Login success");
                        navigation.navigate('TodoList');
                    } else {
                        alert("Invalid Credentials");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                alert(passValidation.message);
            }
        } else {
            alert("Invalid email");
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'grey' }}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'grey' }}>
                <Text style={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    marginVertical: 8,
                    fontSize: 50
                }}>
                    {props.heading}
                </Text>
            </View>
            <View style={styles.container}>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>
                        {onLogin ? 'Log-in' : 'Sign-up'}
                    </Text>
                    {!onLogin && <TextInput
                        // autoFocus={true}
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => { setName(text) }}
                        label="Name"
                        placeholder='Name'
                    />}
                    <TextInput
                        value={email}
                        // autoFocus={true}
                        style={styles.input}
                        onChangeText={(text) => { setEmail(text) }}
                        label="Email"
                        placeholder='Email'
                        keyboardType='email-address'
                    />
                    <TextInput
                        secureTextEntry
                        autoCorrect={false}
                        value={password}
                        style={styles.input}
                        onChangeText={(text) => { setPassword(text) }}
                        label="Password"
                        placeholder='Password'
                        keyboardType="password"
                    />

                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>{onLogin ? 'Log-in' : 'Sign-up'}</Text>
                    </TouchableOpacity>
                    <View style={{ textAlign: 'center' }}>
                        <Text>
                            {onLogin ? "Don't have an account? " : "Already have an account? "}
                            <Text style={styles.btnText2} onPress={toggle}>
                                {onLogin ? 'Sign-up' : 'Log-in'}
                            </Text>
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

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
        fontSize: 14
    }
});

export default Login