import { auth, provider } from '../../firebase-config'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import '../Estilos/loginRegister.css'

export default function LoginPage(props) {
    const [isAuth, setIsAuth] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const signIn = async (ev) => {
        ev.preventDefault()

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            console.log('Usuário logado:', user);
            setIsAuth(true)
        } catch (error) {//erro 2 tipos: email invalido, ou senha errada
            if (error.code === 'auth/user-not-found') {
                window.alert('Email não cadastrado!')
            } else if (error.code === 'auth/wrong-password') {
                window.alert('Senha inválida!')
            } else {
                window.alert('Erro ao fazer login!')
            }
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            setIsAuth(true)
        } catch (error) {
            console.log(error);
        }
    }

    if (isAuth) {
        return <Navigate to="/salas" />
    }

    return (
        <div className="auth">
      
          <form className="auth-form" onSubmit={signIn}>
            <label className="auth-label">
              Email: <input className="auth-input" type='text' value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} placeholder='Email...' />
            </label>
            <label className="auth-label">
              Senha: <input className="auth-input" type='password' value={senha} onChange={(ev) => setSenha(ev.currentTarget.value)} placeholder='Senha...' />
            </label>
            <button className="auth-button" type='submit'>Entrar</button>
          </form>
      
          <p className="auth-text">OU</p>
          
          <button className="google-button" onClick={signInWithGoogle}>Continuar com Google</button>
      
          <div className="separator">
            <div className="line"></div>
            <span className="separator-text">Não tem uma conta?</span>
            <div className="line"></div>
          </div>
      
          <Link to="/register" className="auth-link">Criar conta</Link>
      
        </div>
      );
      
    // return (<div className="auth">

    //     <form onSubmit={signIn}>
    //         <label>
    //             Email: <input type='text' value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} placeholder='Email...' />
    //         </label>
    //         <label>
    //             Senha: <input type='password' value={senha} onChange={(ev) => setSenha(ev.currentTarget.value)} placeholder='Senha...' />
    //         </label>
    //         <button type='submit'>Entrar</button>
    //     </form>
    //     <p>OU</p>
    //     <button onClick={signInWithGoogle}>Sign in with google</button>

    //     <div className="separator">
    //         <div className="line"></div>
    //         <span>Não tem uma conta?</span>
    //         <div className="line"></div>
    //     </div>


    //     <Link to="/register">Criar conta</Link>
    // </div>)
}