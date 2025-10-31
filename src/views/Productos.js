import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button } from "react-native"; 
import { db } from "../database/firebaseconfig.js";
import { collection, getDocs, doc, deleteDoc, addDoc, updateDoc, query, where, orderBy, limit } from "firebase/firestore";
import ListaProductos from "../components/ListaProductos";
import FormularioProductos from "../components/FormularioProductos";
import TablaProductos from "../components/TablaProductos.js";

const Productos = ({ cerrarSesion }) => { 
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoId, setProductoId] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
  });

  const cargarDatos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Productos"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
      console.log("Productos traídos:", data);
    } catch (error) {
      console.error("Error al obtener documentos: ", error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await deleteDoc(doc(db, "Productos", id));
      cargarDatos();
    } catch (error) {
      console.error("Error al eliminar:", error);
    }
  };

  const manejoCambio = (nombre, valor) => {
    setNuevoProducto((prev) => ({
      ...prev,
      [nombre]: valor,
    }));
  };

  const guardarProducto = async () => {
    try {
      if (nuevoProducto.nombre && nuevoProducto.precio) {
        await addDoc(collection(db, "Productos"), {
          nombre: nuevoProducto.nombre,
          precio: parseFloat(nuevoProducto.precio),
        });
        cargarDatos();
        setNuevoProducto({ nombre: "", precio: "" });
      } else {
        alert("Por favor, complete todos los campos.");
      }
    } catch (error) {
      console.error("Error al registrar producto: ", error);
    }
  };

  const actualizarProducto = async () => {
    try {
      if (nuevoProducto.nombre && nuevoProducto.precio) {
        await updateDoc(doc(db, "Productos", productoId), {
          nombre: nuevoProducto.nombre,
          precio: parseFloat(nuevoProducto.precio),
        });
        setNuevoProducto({ nombre: "", precio: "" });
        setModoEdicion(false);
        setProductoId(null);
        cargarDatos();
      } else {
        alert("Por favor, complete todos los campos");
      }
    } catch (error) {
      console.error("Error al actualizar producto: ", error);
    }
  };

  const editarProducto = (producto) => {
    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio.toString(),
    });
    setProductoId(producto.id);
    setModoEdicion(true);
  };

    // Consultas
    const Consulta1 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        where("pais", "==", "Guatemala"),
        orderBy("poblacion", "desc"),
        limit(2)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 1 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 1:", error);
    }
  };

      const Consulta2 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        where("pais", "==", "Honduras"),
        where("poblacion", ">", 700),
        orderBy("nombre", "asc"),
        limit(3)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 2 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 2:", error);
    }
  };

      const Consulta3 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        where("pais", "==", "El Salvador"),
        orderBy("poblacion", "asc"),
        limit(2)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 3 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 3:", error);
    }
  };

      const Consulta4 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        where("poblacion", "<=", 300),
        orderBy("pais", "desc"),
        limit(4)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 4 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 4:", error);
    }
  };

      const Consulta5 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        where("poblacion", ">", 900),
        orderBy("nombre", "asc"),
        limit(3)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 5 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 5:", error);
    }
  };

      const Consulta6 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        where("pais", "==", "Guatemala"),
        orderBy("poblacion", "desc"),
        limit(5)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 6 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 6:", error);
    }
  };

    const Consulta7 = async () => {
  try {
    const q = query(
      collection(db, "Ciudades"),
      where("poblacion", ">=", 200),
      where("poblacion", "<=", 600),
      orderBy("pais", "asc"),
      limit(5)
    );
    const snapshot = await getDocs(q);
    console.log("---------- Consulta 7 ----------");
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(
        `ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Población: ${data.poblacion}`
      );
    });
  } catch (error) {
    console.error("Error en consulta 7:", error);
  }
};

  const Consulta8 = async () => {
    try {
      const q = query(
        collection(db, "Ciudades"),
        orderBy("poblacion", "desc"),
        orderBy("region", "desc"),
        limit(5)
      );
      const snapshot = await getDocs(q);
      console.log("---------- Consulta 8 ----------");
      snapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`ID: ${doc.id}, Nombre: ${data.nombre}, País: ${data.pais}, Región: ${data.region}, Población: ${data.poblacion}`);
      });
    } catch (error) {
      console.error("Error en consulta 8:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
    Consulta1();
    Consulta2();
    Consulta3();
    Consulta4();
    Consulta5();
    Consulta6();
    Consulta7();
    Consulta8();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Cerrar Sesión" onPress={cerrarSesion} color="#d9534f" />

      <FormularioProductos
        nuevoProducto={nuevoProducto}
        manejoCambio={manejoCambio}
        guardarProducto={guardarProducto}
        actualizarProducto={actualizarProducto}
        modoEdicion={modoEdicion}
      />

      <ListaProductos productos={productos} />

      <TablaProductos
        productos={productos}
        eliminarProducto={eliminarProducto}
        editarProducto={editarProducto}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
});

export default Productos;