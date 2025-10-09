import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Productos from "./src/views/Productos";
import Clientes from "./src/views/Clientes";
import Promedio from "./src/views/Promedio";
import Encabezado from "./src/components/Encabezado";

export default function App() {
  const [pantalla, setPantalla] = useState("productos");

  const renderPantalla = () => {
    switch (pantalla) {
      case "productos":
        return <Productos />;
      case "clientes":
        return <Clientes />;
      case "promedio":
        return <Promedio />;
      default:
        return <Productos />;
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
            : "Promedio"
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