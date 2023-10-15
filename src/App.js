import './components/Estilos/style.css'
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { auth } from './firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { atualizaUsuariosOnline, consultaUIDJogadores, adicionaUIDJogadores, removeUIDJogadores } from './funcoesFirebase';
import { Navigate } from 'react-router-dom';

function App() {
  const rotaSalaAtual = useLocation().pathname
  const NUMERO_SALAS = 4;

  const [redirecionamentoLogin, setRedirecionamentoLogin] = useState(false)
  const [redirecionamentoSalas, setRedirecionamentoSalas] = useState(false)
  const [usuarioUID, setUsuarioUID] = useState('')
  const [aux, setAux] = useState(0)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid !== usuarioUID) {
          setUsuarioUID(user.uid);
        }
      } else {
        setUsuarioUID(null);
      }
    });
    return () => unsubscribe();
  }, [usuarioUID]);

  useEffect(() => {
    if(!usuarioUID && /^\/salas/.test(rotaSalaAtual)){
      setRedirecionamentoLogin(true);
      setRedirecionamentoSalas(false);
    } 
    else if(usuarioUID && /^\/(register|login)/.test(rotaSalaAtual)){
      setRedirecionamentoSalas(true);
      setRedirecionamentoLogin(false);
    } else{
      setRedirecionamentoLogin(false);
      setRedirecionamentoSalas(false);
    }

    const fetchUIDJogadores = async (usuarioUID) => {
      for (let i = 1; i <= NUMERO_SALAS; i++) {
        const idSala = i.toString();
        const res = await consultaUIDJogadores(idSala);
  
        if (res.includes(usuarioUID) && usuarioUID) {
          const idSalaAtualArr = rotaSalaAtual.match(/\d+/);
          const idSalaAtual = idSalaAtualArr ? idSalaAtualArr[0] : null;
  
          if (idSala === idSalaAtual) break;
  
          await atualizaUsuariosOnline(idSala, -1);
          await removeUIDJogadores(idSala, usuarioUID);
        }
      }
      setAux(aux + 1);
    };
  
    fetchUIDJogadores(usuarioUID);
  }, [rotaSalaAtual, usuarioUID]);
  
  useEffect(() => {
    const attUsuariosOnline = async () => {
      const idSalaAtual = rotaSalaAtual.match(/\d+/)?.[0];
      if (idSalaAtual && !(await consultaUIDJogadores(idSalaAtual)).includes(usuarioUID)) {
        await Promise.all([
          atualizaUsuariosOnline(idSalaAtual, 1),
          adicionaUIDJogadores(idSalaAtual, usuarioUID)
        ]);
      }
    };
  
    if (/^\/salas\/\d+$/.test(rotaSalaAtual) && usuarioUID) {
      attUsuariosOnline();
    }
  }, [aux]);
  
  if (redirecionamentoLogin) {
    return <Navigate to="/login" />
  } 
  if (redirecionamentoSalas) {
    return <Navigate to="/salas" />
  } 
  return (
    <div className="App">
    </div>
  );
}

export default App;