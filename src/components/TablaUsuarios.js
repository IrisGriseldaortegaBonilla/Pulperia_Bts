import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import BotonEliminarUsuarios from './BotonEliminarUsuarios';

const TablaUsuarios = ({ usuarios, eliminarUsuario, editarUsuario }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tabla de Usuarios</Text>

      {/* Encabezado de la tabla */}
      <View style={[styles.fila, styles.encabezado]}>
        <Text style={[styles.celda, styles.textoEncabezado]}>Nombre</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Correo</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Teléfono</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Edad</Text>
        <Text style={[styles.celda, styles.textoEncabezado]}>Acciones</Text>
      </View>

      {/* Contenido de la tabla */}
      <ScrollView>
        {usuarios.map((item) => (
          <View key={item.id} style={styles.fila}>
            <Text style={[styles.celda, styles.celdaConBorde]}>{item.nombre}</Text>
            <Text style={[styles.celda, styles.celdaConBorde]}>{item.correo}</Text>
            <Text style={[styles.celda, styles.celdaConBorde]}>{item.telefono}</Text>
            <Text style={[styles.celda, styles.celdaConBorde]}>{item.edad}</Text>

            {/* Celda de acciones */}
            <View style={[styles.celdaAcciones, styles.celdaConBorde]}>
              <TouchableOpacity
                style={styles.botonActualizar}
                onPress={() => editarUsuario(item)}
              >
                <Text>✏️</Text>
              </TouchableOpacity>

              {/* ✅ Prop corregida */}
              <BotonEliminarUsuarios
                id={item.id}
                eliminarUsuarios={eliminarUsuario} // 👈 nombre correcto
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: "stretch",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  fila: {
    flexDirection: "row",
    borderBottomWidth: 1,     // ✅ línea inferior de cada fila
    borderLeftWidth: 1,       // ✅ línea izquierda
    borderRightWidth: 1,      // ✅ línea derecha
    borderColor: "#ccc",
    paddingVertical: 6,
    alignItems: "center",
  },
  encabezado: {
    backgroundColor: "#dcedf3ff",
    borderTopWidth: 1,        // ✅ borde superior del encabezado
    borderColor: "#ccc",
  },
  celda: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
    paddingVertical: 6,
  },
  // ✅ Cada celda con línea divisoria vertical
  celdaConBorde: {
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  celdaAcciones: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  textoEncabezado: {
    fontWeight: "bold",
    fontSize: 17,
    textAlign: "center",
  },
  botonActualizar: {
    padding: 4,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#99c99aff",
  },
});

export default TablaUsuarios;
