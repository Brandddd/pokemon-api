// El contexto es crear un estado por otro archivo, un archivo que este por fuera.
import { createContext, useContext, useEffect, useState } from "react"; // Funcion que me crea el contexto para saber si hay un usuario logeado o no.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // Devuelve el estado del usuario si se logea o si cierra sesión
} from "firebase/auth"; // Funcion que crea un usuario con email y correo electronico, y funcion que inicia sesión con email y password
import { auth } from "../firebase-config"; // Importamos el Auth, ya que la funcion de registro de firebase lo necesita.

export const authContext = createContext(); // Al ejecutar el createContext() nos devolverá un objeto, que será almacenado en la variable context

// Hook useAuth para exportar a los demás componentes
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

// Funcion que me retorna un componente que viene desde context
export function AuthProvider({ children }) {
  // Función que me definirá el estado del usuario: Inicia en null porque cuando se inicia la app, el usuario no esta logeado
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Este objeto tipo user se podrá importar a todos los componentes
  // Funcion signUp register
  const signUp = (email, password) =>
    // Esta funcion de firebase me crea un usuario dentro de la base de datos
    createUserWithEmailAndPassword(auth, email, password);

  // Funcion login: login
  const login = (email, password) =>
    // Esta funcion de firebase comprueba su el usuario está dentro de la base de datos
    signInWithEmailAndPassword(auth, email, password);

  const logout = () => signOut(auth);

  // Hook useEffect() me permite llevar acabo eventos secundarios en componentes funcionales, en este caso, signin o signout con la funcion de firebase
  useEffect(() => {
    console.log("Ejecutando Auth Provider... Preparado para escuchar cambios");
    // Cuando cargue el auth provider, definiremos una "escucha"
    // onAuthStateChanged recibe un auth, y devuelve una funcion que es un observador, el cual se queda pendiente de los cambios que se hagan
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  return (
    // Exportación return de las funciones, se exporta user para saber si su estado cambió
    <authContext.Provider value={{ signUp, login, user, logout , loading }}>
      {children}
    </authContext.Provider>
  );
}

// El objeto Provider sirve para que adentro se pongan componentes como el Home, Login, Alert y demás
// y todo lo que tenga este provider, los componentes hijos van a poder accederlo.
// En este caso la propiedad llamada children y está será la que podrá tener acceso, en otras palabras
// cualquier componente hijo children, va poder tener acceso a los datos del componente padre provider.
