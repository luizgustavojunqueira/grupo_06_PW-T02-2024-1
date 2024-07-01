import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import iconEmail from "../../assets/utils/img/iconEmail.png"
import iconName from "../../assets/utils/img/iconName.png"
import iconPassword from "../../assets/utils/img/iconPassword.png"
import axios from "axios";
import './signUp.css'


export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  useEffect(() => { document.title = "Calendar" })
  const navigate =  useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

 
    if (true) {
      axios.post("/api/register", { name: name,email: email, password: password })
      .then((res)=> {
        console.log(res);
        console.log("cadastrado");
        navigate("/login", {replace : true});
      })
      .catch((err)=>{
        if (err.response && err.response.data && err.response.data.errors) {
            err.response.data.errors.forEach((err) => {
              console.log(err);
            if (err === "Requires a name"){
              setErrorName(true);
            }
            else if (err === "Requires an email"){
              setErrorEmail(true);
            }
            else if (err == "Invalid email"){
              setErrorEmail(true);
            }
            else if (err == "Requires a password"){
              setErrorPassword(true);
            }
          });
        } else {
          console.error('Erro desconhecido:', err);
        }

      })
    }
    
  }

  return (

    <div className="mainContainer">
      <section className="sideSection">
        <div className="containerSignUp">
          <h1>Bem-vindo de volta!</h1>
          <p>acesse sua conta agora</p>
          
          <button className="button">
            <Link className="button-link" to="/login">
             Login
            </Link>
          </button>
           
        </div>
      </section>
      <main className="mainContentSignUp">
        <h1>Crie sua conta</h1>
        <form className="formSignUp" onSubmit={handleSignUp}>
          <div className="errors">
            {errorName && <p>Campo obrigatório, por favor informe seu nome!</p>}
            </div> 
          <div className="inputAndIcon">
            <img src={iconName} alt="" />
            <input className="input" type="text" id="nameInput" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Nome" />
          </div>
          <div className="errors">
            {errorEmail && <p>Por favor, Informe seu email ou verifique se ele está correto</p>}
            </div> 
          <div className="inputAndIcon">
            <img src={iconEmail} alt="" />
            <input className="input" type="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" />
          </div>
          <div className="errors">
            {errorPassword&& <p>Campo obrigatório, por favor insira sua senha!</p>}
            </div> 
          <div className="inputAndIcon">
            <img src={iconPassword} alt="" />
            <input className="input" type="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Senha" />
          </div>
          <input className="buttonInput" type="submit" value="Cadastrar" />
        </form>
      </main>
    </div>
  );
}
