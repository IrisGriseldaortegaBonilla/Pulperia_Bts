import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from "react-native";
import { db } from "../database/firebaseconfig.js";
import { doc, updateDoc } from "firebase/firestore";

const BotonEditarEdad = ({ id, nombreInicial, edadInicial, cargarDatos }) => {
  const [visible, setVisible] = useState(false);
  const [nombre, setNombre] = useState(nombreInicial);
  const [edad, setEdad] = useState(edadInicial ? edadInicial.toString() : "");

  const guardarCambios = async () => {
    try {
      const edadRef = doc(db, "Edades", id);
      await updateDoc(edadRef, {
        nombre: nombre,
        edad: Number(edad),
      });
      setVisible(false);
      cargarDatos(); // recargar lista después de editar
    } catch (error) {
      console.error("Error al editar edad:", error);
    }
  };

  return (
    <View>
      {/* Botón de editar */}
      <TouchableOpacity style={styles.boton} onPress={() => setVisible(true)}>
        <Text style={styles.textoBoton}>✏️</Text>
      </TouchableOpacity>

      {/* Modal para editar */}
      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.titulo}>Editar Edad</Text>

            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Edad"
              keyboardType="numeric"
              value={edad}
              onChangeText={setEdad}
            />

            <View style={styles.fila}>
              <TouchableOpacity
                style={[styles.botonAccion, styles.cancelar]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.textoAccion}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.botonAccion, styles.confirmar]}
                onPress={guardarCambios}
              >
                <Text style={styles.textoAccion}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  boton: {
    padding: 4,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#00c203ff",
  },
  textoBoton: { color: "white", fontSize: 14 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  botonAccion: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelar: {
    backgroundColor: "#ccc",
  },
  confirmar: {
    backgroundColor: "#4caf50",
  },
  textoAccion: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BotonEditarEdad;
