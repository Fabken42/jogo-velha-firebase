import { useEffect, useState } from "react"
import Quadrado from '../Quadrado';
import { collection, onSnapshot, where, query } from "firebase/firestore";
import { atualizaUsuariosOnline, removeUIDJogadores, atualizaTabuleiro, atualizaUIDJogadorAtual, consultaUIDJogadores } from '../../funcoesFirebase';
import { db } from "../../firebase-config";
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import '../Estilos/SalaJogoPage.css'
/*------------------------------------------------------------- */

export default function SalaJogoPage() {
  const [redirecionamento, setRedirecionamento] = useState(false)
  const rotaSalaAtual = useLocation().pathname
  const idSalaAtual = rotaSalaAtual.match(/\d+/)[0]

  const quadradoClassNames = [
    "quadrado-superior-esquerdo",
    "quadrado-superior",
    "quadrado-superior-direito",
    "quadrado-esquerdo",
    "quadrado-meio",
    "quadrado-direito",
    "quadrado-inferior-esquerdo",
    "quadrado-inferior",
    "quadrado-inferior-direito"
  ];

  const [quadradosVitoria, setQuadradosVitoria] = useState([]);
  const [UIDJogadorAtual, setUIDJogadorAtual] = useState();
  const [pontuacaoJogador, setPontuacaoJogador] = useState(0);
  const [pontuacaoAdversario, setPontuacaoAdversario] = useState(0);
  const [empate, setEmpate] = useState(false);
  const [fimJogo, setFimJogo] = useState(false)
  const [simboloJogador, setSimboloJogador] = useState('');
  const [mensagemAlerta, setMensagemAlerta] = useState('Carregando...');
  const [usuariosOnline, setUsuariosOnline] = useState(0);
  const [usuarioUID, setUsuarioUID] = useState('');
  const [jogou, setJogou] = useState(false)

  /*------------------------------------------------------------- */
  const [tabuleiro, setTabuleiro] = useState(Array(9).fill(''))
  const salaCollection = collection(db, "salas");
  const q = query(salaCollection, where('numero_sala', '==', idSalaAtual))
  let unsubscribe;

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
    unsubscribe = onSnapshot(q, async (querySnapshot) => {
      setTabuleiro(querySnapshot.docs[0].data().tabuleiro);
      setUsuariosOnline(querySnapshot.docs[0].data().usuarios_online);
      setUIDJogadorAtual(querySnapshot.docs[0].data().uid_jogador_atual);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [])

  useEffect(() => {
    if(usuarioUID){
      const handleOnBeforeUnload = (ev) => {
        ev.preventDefault();
        atualizaUsuariosOnline(idSalaAtual, -1);
        removeUIDJogadores(idSalaAtual,usuarioUID);
        return (ev.returnValue = '');
      }
      window.addEventListener('beforeunload', handleOnBeforeUnload, { capture: true })
      return ()=> {
        window.removeEventListener('beforeunload', handleOnBeforeUnload)
      }
    }
  }, [usuarioUID]);

  useEffect(() => {
    verificaTermino()

    if (!fimJogo && usuariosOnline === 2) {
      setMensagemAlerta(usuarioUID === UIDJogadorAtual ? 'Sua vez...' : 'Esperando adversário jogar...')

      if (jogou) {
        setJogou(false)
        //ATUALIZA JOGADOR ATUAL
        const attJogadorAtual = async () => {
          await atualizaUIDJogadorAtual(idSalaAtual, usuarioUID);
        }
        attJogadorAtual()
      }
    }
  }, [tabuleiro])

  useEffect(() => {
    if (fimJogo) {
      //ALTERA MENSAGEM 
      if (!(quadradosVitoria.length)) { //EMPATE
        setMensagemAlerta('Empate!')
        setEmpate(true)
      } else {
        setMensagemAlerta(usuarioUID === UIDJogadorAtual ? 'Você venceu!' : 'Você perdeu!')
        alteraPlacar()
      }

      setTimeout(() => {
        limpaVariaveis()

        if (usuarioUID !== UIDJogadorAtual) {
          setMensagemAlerta('Sua vez...')
        } else {
          setMensagemAlerta('Esperando adversário jogar...')
        }
      }, 3000)
    }
  }, [fimJogo])

  useEffect(() => {
    if (usuariosOnline === 2) {
      const fetchUIDJogadores = async () => {
        const res = await consultaUIDJogadores(idSalaAtual);
        if (res[0] === usuarioUID) {
          setSimboloJogador('X')
          await atualizaUIDJogadorAtual(idSalaAtual, usuarioUID);

        } else if (res[1] === usuarioUID) {
          setSimboloJogador('O')
        } else { //expulsa se 3o usuário tentar entrar na sala
          setRedirecionamento(true);
        }
      }
      fetchUIDJogadores()
    }

    //CASO UM DOS JOGADORES SAIA DA SALA
    if (usuariosOnline === 1) {
      limpaVariaveis()
      setPontuacaoJogador(0)
      setPontuacaoAdversario(0)
      setPontuacaoJogador(0)
      setSimboloJogador('X')
      setMensagemAlerta('Esperando alguém entrar na sala...')
    }
  }, [usuariosOnline])
  /*------------------------------------------------------------- */
  const verificaTermino = () => {
    //VERIFICA VITÓRIA
    if (tabuleiro[0] && tabuleiro[0] === tabuleiro[1] && tabuleiro[1] === tabuleiro[2]) {
      setQuadradosVitoria([0, 1, 2])
      setFimJogo(true)
    } else if (tabuleiro[3] && tabuleiro[3] === tabuleiro[4] && tabuleiro[4] === tabuleiro[5]) {
      setQuadradosVitoria([3, 4, 5])
      setFimJogo(true)
    } else if (tabuleiro[6] && tabuleiro[6] === tabuleiro[7] && tabuleiro[7] === tabuleiro[8]) {
      setQuadradosVitoria([6, 7, 8])
      setFimJogo(true)
    } else if (tabuleiro[0] && tabuleiro[0] === tabuleiro[3] && tabuleiro[3] === tabuleiro[6]) {
      setQuadradosVitoria([0, 3, 6])
      setFimJogo(true)
    } else if (tabuleiro[1] && tabuleiro[1] === tabuleiro[4] && tabuleiro[4] === tabuleiro[7]) {
      setQuadradosVitoria([1, 4, 7])
      setFimJogo(true)
    } else if (tabuleiro[2] && tabuleiro[2] === tabuleiro[5] && tabuleiro[5] === tabuleiro[8]) {
      setQuadradosVitoria([2, 5, 8])
      setFimJogo(true)
    } else if (tabuleiro[0] && tabuleiro[0] === tabuleiro[4] && tabuleiro[4] === tabuleiro[8]) {
      setQuadradosVitoria([0, 4, 8])
      setFimJogo(true)
    } else if (tabuleiro[2] && tabuleiro[2] === tabuleiro[4] && tabuleiro[4] === tabuleiro[6]) {
      setQuadradosVitoria([2, 4, 6])
      setFimJogo(true)
    } else if (tabuleiro.length === 9 && tabuleiro.indexOf('') === -1) { //EMPATE
      setFimJogo(true)
    }
  }

  const limpaVariaveis = () => {
    atualizaTabuleiro(idSalaAtual, Array(9).fill(''))
    setFimJogo(false)
    setEmpate(false)
    setQuadradosVitoria([])
  }

  const handleClick = (indice) => {
    if (!tabuleiro[indice] && usuarioUID === UIDJogadorAtual && usuariosOnline === 2) {
      setJogou(true)
      atualizaTabuleiro(idSalaAtual, tabuleiro.map((item, key) => key === indice ? simboloJogador : item))
    }
  }

  const alteraPlacar = () => {
    if (usuarioUID === UIDJogadorAtual) {
      setPontuacaoJogador(() => pontuacaoJogador + 1)
    } else {
      setPontuacaoAdversario(() => pontuacaoAdversario + 1)
    }
  }
  /*------------------------------------------------------------- */

  if (redirecionamento) {
    return <Navigate to="/salas" />
  }

  return (<>
    <div className="placar-container">
  <p className="placar-text">({simboloJogador}) Você {pontuacaoJogador} - {pontuacaoAdversario} Adversário ({simboloJogador === 'X' ? 'O' : 'X'})</p>
  <p className="alerta-text">{mensagemAlerta}</p>
</div>


    <div className="tabuleiro">
      {quadradoClassNames.map((classeQuadrado, indice) => (
        <Quadrado key={indice} classeQuadrado={classeQuadrado} onClick={() => handleClick(indice)} conteudo={tabuleiro[indice]} classeBgVitoria={quadradosVitoria.includes(indice) ? 'quadrado__bgVitoria' : ''} classeBgEmpate={empate ? 'quadrado__bgEmpate' : ''} />
      ))}
    </div>
  </>)
}