import { useState } from "react";

export function Login() {

    // Variable en React, usuario user y su funcion para actualizarlo setUser
    const [user, setUser] = useState({  // useState para guardar los datos
        email: "",
        password: ""
    })

  return (
    <div>
      <form>
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
      </form>
    </div>
  );
}
