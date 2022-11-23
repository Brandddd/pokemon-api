import { useState } from "react";
import { useAuth } from "../context/Authentication"; // Llamamos el useAuth para el Auth de firebase para poder registrar el usuario
import { Link, useNavigate } from "react-router-dom"; // Hook de navegación entre paginas
import { Alert } from "./Alert";

export function Register() {
  // Funcion para actualizar la información del usuario que se registre
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    lastname: "",
  });

  const { signUp } = useAuth(); // Se ejecuta useAuth y el devuelve un objeto tipo signUp
  const navigate = useNavigate(); // Navegación por las rutas
  const [error, setError] = useState(); // Estado de los errores, para poder obtenerlos y mostrarlos

  // Manejar los cambios dentro de los input del form de html con el onChange={handleChange} y actualizar el estado
  const handleChange = ({ target: { name, value } }) => {
    // Extraer valores con target
    setUser({ ...user, [name]: value }); // ...user -> copiar datos para evitar que se sobrescriba, y asignar correctamente los valores con setUser
  };

  // Al momento de enviarse el formulario, se verá el valor del objeto
  // handleSubmit maneja los datos del objeto que se llene en el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      // await por la función asincrona, ya que es una petición hacía un backend.
      await signUp(user.email, user.password); // Al momento de hacer el submit en el form, se hara la funcion de autenticacion de firebase
      navigate("/login");
    } catch (error) {
      setError(error.code); // Capturando y asignando el codigo de los errores para mostrarlos en el body
      if (error.code === "auth/internal-error") {
        setError("Correo inválido");
      }
    }
  };

  //Retorna formulario de registro
  return (
    <div className="w-full max-w-xs m-auto">
      {error && (
        <p>
          <Alert message={error} />
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-8 pb-10 mb-10"
      >
        <p className="text-lg font-semibold mb-4 flex justify-center m-auto">
          Pokemon API Registro
        </p>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-sans mb-2"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@domain.com"
            onChange={handleChange}
            className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline_none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-sans mb-2"
          >
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            placeholder="********"
            onChange={handleChange}
            className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline_none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 text-sm font-sans mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            name="name"
            placeholder="tu nombre"
            onChange={handleChange}
            className="shadow appeareance-none border rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline_none focus:shadow-outline"
          />
        </div>

        <div className="mb-6 flex items-center justify-center">
          <button className="bg-red-600 font-sans flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
            Registrarse
          </button>
        </div>

        <p className="text-sm flex justify-between px-3 text-black">
            ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="font-sans hover:text-blue-500">
            Inicia sesión
          </Link>
        </p>
      </form>
    </div>
  );
}
