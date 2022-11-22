import { useState } from "react";
import { useAuth } from "../context/Authentication"; // Llamamos el useAuth para el Auth de firebase para poder registrar el usuario
import { useNavigate } from "react-router-dom"; // Hook de navegación entre paginas

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
      navigate("/");
    } catch (error) {
      setError(error.code); // Capturando y asignando el codigo de los errores para mostrarlos en el body
      if (error.code === "auth/internal-error") {
        setError("Correo inválido");
      }
    }
  };

  //Retorna formulario de registro
  return (
    <div>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          placeholder="email@domain.com"
          onChange={handleChange}
        />

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={handleChange}
        />

        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          placeholder="tu nombre"
          onChange={handleChange}
        />

        <label htmlFor="lastname">Apellido</label>
        <input
          type="text"
          name="lastname"
          placeholder="tu apellido"
          onChange={handleChange}
        />

        <button>Registrarse</button>
      </form>
    </div>
  );
}