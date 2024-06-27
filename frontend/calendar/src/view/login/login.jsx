import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import iconEmail from "../../assets/utils/img/iconEmail.png";
import undraw_online_calendar_re_wk3t from "../../assets/utils/img/undraw_online_calendar_re_wk3t.svg";//ffrontend/calendar/src/assets/utils/img/undraw_online_calendar_re_wk3t.svg
import iconPassword from "../../assets/utils/img/iconPassword.png";
import axios from "axios";
import './login.css';


export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => { document.title = "Calendar" });
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        if(email && password){

            axios.post("/api/login", { email: email, password: password })
        
            .then(() => {

                console.log("logado");
               navigate("/calendar", { replace: true });
            })
            .catch((err) => {
                console.log(err);
                toast.error();("Usuário ou senha incorretos!", {
                position: "top-right",
            });
            });

            }
            else{
                toast.warn("Preencha todos os campos!", {
                    position: "top-right",
                  });
            }

    }
    
    return(
        
       <main className="mainContentLogin">
        <div className="containerLogin">
            <h1>Login</h1>
            <form className="formLogin" onSubmit={handleLogin}>
                <div className="inputAndIcon">
                    <img src={iconEmail} alt=""/>
                    <input className="input" type="email" id="email" value = {email} onChange = {(e) =>{setEmail(e.target.value)}} placeholder="EMAIL"/>
                </div>
                <div className="inputAndIcon">
                    <img src={iconPassword} alt=""/>
                    <input className="input" type="password" id="password" value = {password}  onChange = {(e) => { setPassword(e.target.value)}} placeholder="SENHA"/>
                </div>
                    
                <input className="inputButton" type="submit" value="Entrar"/>
                
            </form>
            
        </div>
    </main>

    );
}