import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Productos from "./src/views/Productos";
import Clientes from "./src/views/Clientes";
import Promedio from "./src/views/Promedio";
import Usuarios from "./src/views/Usuarios";
import Encabezado from "./src/components/Encabezado";
import Login from "./src/views/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./src/database/firebaseconfig";

export default function App() {
  const [usuario, setUsuario] = useState(null); // ⚡ null por defecto
  const [pantalla, setPantalla] = useState("productos");

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

  // Mostrar Login si no hay usuario
  if (!usuario) {
    return <Login onLoginSuccess={() => setUsuario(auth.currentUser)} />;
  }

  // Mostrar la app principal si hay usuario
  const renderPantalla = () => {
    switch (pantalla) {
      case "productos":
        return <Productos cerrarSesion={cerrarSesion} />;
      case "clientes":
        return <Clientes />;
      case "promedio":
        return <Promedio />;
      case "usuarios":
        return <Usuarios />;
      default:
        return <Productos cerrarSesion={cerrarSesion} />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <Encabezado
        titulo={
          pantalla === "productos"
            ? "Gestión de Productos"
            : pantalla === "clientes"
            ? "Gestión de Clientes"
            : pantalla === "promedio"
            ? "Promedios"
            : "Gestión de Usuarios"
        }
      />

      {/* Menú de navegación */}
      <View style={styles.menu}>
        <TouchableOpacity
          style={[styles.boton, pantalla === "productos" && styles.activo]}
          onPress={() => setPantalla("productos")}
        >
          <Text style={styles.textoBoton}>Productos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, pantalla === "clientes" && styles.activo]}
          onPress={() => setPantalla("clientes")}
        >
          <Text style={styles.textoBoton}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, pantalla === "promedio" && styles.activo]}
          onPress={() => setPantalla("promedio")}
        >
          <Text style={styles.textoBoton}>Promedios</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, pantalla === "usuarios" && styles.activo]}
          onPress={() => setPantalla("usuarios")}
        >
          <Text style={styles.textoBoton}>Usuarios</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido dinámico */}
      <View style={styles.contenido}>{renderPantalla()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },

  menu: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#e5e5e5",
    paddingVertical: 10,
  },

  boton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },

  textoBoton: {
    fontSize: 14,
    color: "#333",
  },

  activo: {
    borderBottomWidth: 2,
    borderBottomColor: "#00ff8cff",
  },

  contenido: {
    flex: 1,
  },
});
