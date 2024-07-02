import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import iconEmail from "../../assets/utils/img/iconEmail.png";
import iconPassword from "../../assets/utils/img/iconPassword.png";
import axios from "axios";
import './login.css';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => { document.title = "Calendar" });
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email && password) {

      axios.post("/api/login", { email: email, password: password })

        .then(() => {

          console.log("logado");
          navigate("/calendar", { replace: true });
        })
        .catch((err) => {
          console.log(err);
          alert("Usuário ou senha incorretos!")
        });

    }
    else {
      alert("Preencha todos os campos!");
    }

  }

  return (

    <main className="mainContentLogin">
      <div className="containerLogin">
        <h1>Login</h1>
        <form className="formLogin" onSubmit={handleLogin}>
          <div className="inputAndIcon">
            <img src={iconEmail} alt="" />
            <input className="input" type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="EMAIL" />
          </div>
          <div className="inputAndIcon">
            <img src={iconPassword} alt="" />
            <input className="input" type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="SENHA" />
          </div>

          <input className="inputButton" type="submit" value="Entrar" />


        </form>
        <p>Ainda não possui sua conta?</p>
        <Link className="link-signUp" to="/">Cria sua conta agora</Link>
      </div>
    </main>

  );
}
