import { useState } from 'react';
import { auth } from '../../firebase-config'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import '../Estilos/loginRegister.css'

export default function RegisterPage() {
    const [isAuth, setIsAuth] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    const signUp = async (ev) => {
        ev.preventDefault()

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;
            window.alert('Usuário registrado com sucesso!')
            setIsAuth(true)
        } catch (error) {
            if(error.code==='auth/email-already-in-use')
                window.alert('Email já cadastrado!');
            else if(error.code==='auth/weak-password')
                window.alert('Senha deve conter mínimo de 6 caracteres!');
            else
                window.alert('Erro ao cadastrar usuário!')
        }
    };

    if (isAuth) {
        return <Navigate to="/salas" />
    }

    return (<div className='auth'>
        <form onSubmit={signUp} className='auth-form'>
        <label className='auth-label'>
            Email: <input className='auth-input' type='text' value={email} onChange={(ev)=>setEmail(ev.currentTarget.value)} placeholder='Email...'/>
        </label>
            <label className='auth-label'>
                Crie uma senha: <input className='auth-input' type='password' value={senha} onChange={(ev)=>setSenha(ev.currentTarget.value)} placeholder='Senha...'/>
            </label>
            <button className='auth-button' type='submit'>Registrar</button>
        </form>
    </div>)
}