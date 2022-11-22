// El contexto es crear un estado por otro archivo, un archivo que este por fuera.
import { createContext, useContext } from "react"; // Funcion que me crea el contexto para saber si hay un usuario logeado o no.
import { createUserWithEmailAndPassword } from "firebase/auth"; // Funcion que crea un usuario con email y correo electronico.
import { auth } from "../firebase-config"; // Importamos el Auth, ya que la funcion de registro de firebase lo necesita.

export const authContext = createContext(); // Al ejecutar el createContext() nos devolverá un objeto, que será almacenado en la variable context

// Hook useAuth para exportar a los demás componentes
export const useAuth = () => {
  const context = useContext(authContext);
  return context;
};

// Funcion que me retorna un componente que viene desde context
export function AuthProvider({ children }) {
  // Este objeto tipo user se podrá importar a todos los componentes
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  return (
    <authContext.Provider value={{ signUp }}>{children}</authContext.Provider>
  );
}

// El objeto Provider sirve para que adentro se pongan componentes como el Home, Login, Alert y demás
// y todo lo que tenga este provider, los componentes hijos van a poder accederlo.
// En este caso la propiedad llamada children y está será la que podrá tener acceso, en otras palabras
// cualquier componente hijo children, va poder tener acceso a los datos del componente padre provider.
