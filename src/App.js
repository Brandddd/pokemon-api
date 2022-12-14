import { Route, Routes } from "react-router-dom"; // Dos componentes, Routes para definir multiples rutas, y Route para definir una sola ruta
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Pokemon } from "./components/Pokemon";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./components/Register";
import { AuthProvider } from "./context/Authentication"; // Importación del componente que se creó, AuthProvider

export default function App() {
  return (
    <div className="bg-red-600 h-screen text-black flex">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pokemon/:name"
            element={
              <ProtectedRoute>
                <Pokemon />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

// Note 1: Se importa Route y Routes desde react-router-dom
// Se llama <Routes> dentro de function App de tal forma que nos retorne las rutas
// Se le asignan los Path, primer caso: /home element: Home, y así sucesivamente.
