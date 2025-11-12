import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { ref, set, push, onValue } from "firebase/database";
import { realtimeDB } from "../database/firebaseconfig"; 



const IMC = () => {
  const [nombre, setNombre] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [registros, setRegistros] = useState([]);

  const calcularYGuardarIMC = async () => {
    if (!nombre || !peso || !altura) {
      alert("Por favor rellene todos los campos");
      return;
    }

    const imc = (Number(peso) / (Number(altura) * Number(altura))).toFixed(2);

    let categoria = "";
    if (imc < 18.5) categoria = "Bajo peso";
    else if (imc < 24.9) categoria = "Normal";
    else if (imc < 29.9) categoria = "Sobrepeso";
    else categoria = "Obesidad";

    try {
      const referencia = ref(realtimeDB, "registros_imc");
      const nuevoRef = push(referencia); // crea un ID automático

      await set(nuevoRef, {
        nombre,
        peso: Number(peso),
        altura: Number(altura),
        imc: Number(imc),
        categoria,
      });

      setNombre("");
      setPeso("");
      setAltura("");

      alert("IMC calculado y guardado correctamente");
    } catch (error) {
      console.log("Error al guardar:", error);
    }
  };

  const leerIMC = () => {
    const referencia = ref(realtimeDB, "registros_imc");

    onValue(referencia, (snapshot) => {
      if (snapshot.exists()) {
        const dataObj = snapshot.val();
        const lista = Object.entries(dataObj).map(([id, datos]) => ({
          id,
          ...datos,
        }));
        setRegistros(lista);
      } else {
        setRegistros([]);
      }
    });
  };

  useEffect(() => {
    leerIMC(); // se conecta a los cambios en tiempo real
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Peso (kg)"
        keyboardType="numeric"
        value={peso}
        onChangeText={setPeso}
      />

      <TextInput
        style={styles.input}
        placeholder="Altura (m)"
        keyboardType="numeric"
        value={altura}
        onChangeText={setAltura}
      />

      <Button title="Calcular y Guardar IMC" onPress={calcularYGuardarIMC} />

      <Text style={styles.subtitulo}>Registros guardados:</Text>

      {registros.length === 0 ? (
        <Text>No hay registros</Text>
      ) : (
        registros.map((r) => (
          <Text key={r.id}>
            {r.nombre} - Peso: {r.peso}kg, Altura: {r.altura}m, IMC: {r.imc} ({r.categoria})
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  subtitulo: { fontSize: 18, marginTop: 20, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 8,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default IMC;
