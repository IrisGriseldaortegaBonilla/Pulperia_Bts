import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth"; // ✅ corregido
import { auth } from "../database/firebaseconfig";

const Login = ({ onLoginSuccess }) => { // ✅ corregido nombre del prop
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingrese ambos campos.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess(); // ✅ corregido nombre
    } catch (error) {
      console.log(error);
      let mensajeError = "Error al iniciar sesión.";

      if (error.code === "auth/invalid-email") {
        mensajeError = "Correo inválido.";
      } else if (error.code === "auth/user-not-found") {
        mensajeError = "Usuario no encontrado.";
      } else if (error.code === "auth/wrong-password") {
        mensajeError = "Contraseña incorrecta.";
      }

      Alert.alert("Error", mensajeError);
    }
  };

  // ✅ El return DEBE estar dentro del componente
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Iniciar Sesión</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.boton} onPress={manejarLogin}>
        <Text style={styles.textoBoton}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "white",
  },
  boton: {
    backgroundColor: "#2196F3",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Login;
