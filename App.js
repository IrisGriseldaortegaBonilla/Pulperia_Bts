import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from "react-native";
import Productos from "./src/views/Productos";
import Clientes from "./src/views/Clientes";
import Promedio from "./src/views/Promedio";
import Usuarios from "./src/views/Usuarios";
import ProductosRealtime from "./src/views/ProductosRealtime"; 
import IMC from "./src/views/IMC";
import Encabezado from "./src/components/Encabezado";
import Login from "./src/views/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./src/database/firebaseconfig";

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [pantalla, setPantalla] = useState("productos");

  const anchoPantalla = Dimensions.get("window").width;
  const numBotones = 6; // productos, clientes, promedio, usuarios, productosRT, IMC
  const anchoBoton = anchoPantalla / numBotones; // ajusta automáticamente

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return unsubscribe;
  }, []);

  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
  };

  if (!usuario) {
    return <Login onLoginSuccess={() => setUsuario(auth.currentUser)} />;
  }

  const renderPantalla = () => {
    switch (pantalla) {
      case "productos": return <Productos cerrarSesion={cerrarSesion} />;
      case "clientes": return <Clientes />;
      case "promedio": return <Promedio />;
      case "usuarios": return <Usuarios />;
      case "productosRealtime": return <ProductosRealtime />;
      case "imc": return <IMC />;
      default: return <Productos cerrarSesion={cerrarSesion} />;
    }
  };

  const getTitulo = () => {
    switch (pantalla) {
      case "productos": return "Gestión de Productos";
      case "clientes": return "Gestión de Clientes";
      case "promedio": return "Promedios";
      case "usuarios": return "Gestión de Usuarios";
      case "productosRealtime": return "Productos Realtime";
      case "imc": return "Calculadora de IMC";
      default: return "Gestión de Productos";
    }
  };

  return (
    <View style={styles.container}>
      <Encabezado titulo={getTitulo()} />

      <View style={styles.menu}>
        <TouchableOpacity style={[styles.boton, pantalla === "productos" && styles.activo, { width: anchoBoton }]} onPress={() => setPantalla("productos")}>
          <Text style={styles.textoBoton}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, pantalla === "clientes" && styles.activo, { width: anchoBoton }]} onPress={() => setPantalla("clientes")}>
          <Text style={styles.textoBoton}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, pantalla === "promedio" && styles.activo, { width: anchoBoton }]} onPress={() => setPantalla("promedio")}>
          <Text style={styles.textoBoton}>Promedios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, pantalla === "usuarios" && styles.activo, { width: anchoBoton }]} onPress={() => setPantalla("usuarios")}>
          <Text style={styles.textoBoton}>Usuarios</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, pantalla === "productosRealtime" && styles.activo, { width: anchoBoton }]} onPress={() => setPantalla("productosRealtime")}>
          <Text style={styles.textoBoton}>Productos RT</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.boton, pantalla === "imc" && styles.activo, { width: anchoBoton }]} onPress={() => setPantalla("imc")}>
          <Text style={styles.textoBoton}>IMC</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenido}>{renderPantalla()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  menu: {
    flexDirection: "row",
    backgroundColor: "#e5e5e5",
    paddingVertical: 4,
  },

  boton: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 6,
  },

  textoBoton: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
  },

  activo: {
    borderBottomWidth: 2,
    borderBottomColor: "#00ff8cff",
  },

  contenido: {
    flex: 1,
  },
});
