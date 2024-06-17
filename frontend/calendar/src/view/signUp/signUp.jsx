import { useState } from "react";
import '../../assets/utils/css/configGerais.css'
import './signUp.css'




export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState("");


  
  async function handleSignUp(e) {
    e.preventDefault();
    
    if(name && email && password){
        console.log(name, email, password);
    }


    
  }

  return (
    <div className="Container"> 
    
    <section className="sideSection">
        <div className="container">
            <h1>Bem-vindo de volta!</h1>
            <p>acesse sua conta agora</p>
            <a href="./login.html">
                <button>Login</button>
            </a>
        </div>
    </section>
    <main className="mainContent">
        <h1>Crie sua conta</h1>
        <form className="formSignUp" onSubmit={handleSignUp}>
            <div className="inputAndIcon">
                <img src="../img/iconName.png" alt=""/>
                <input className="input" type="text" id="name" value = {name} onChange = {(e) => {setName(e.target.value)}} placeholder="Nome"/>
            </div>
            <div className="inputAndIcon">
                <img src="../img/iconEmail.png" alt=""/>
                <input className="input" type="email" id="email"  value ={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="Email"/>
            </div>
            <div className="inputAndIcon">
                <img src="../img/iconPassword.png" alt=""/>
                <input className="input" type="password" id="password" value = {password} onChange = {(e) => {setPassword(e.target.value)}} placeholder="Senha"/>
            </div>
            <input className="buttonInput" type="submit" value="Cadastrar"/>
        </form>
    </main>

</div>
  );
}