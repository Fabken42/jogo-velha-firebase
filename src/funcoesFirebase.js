import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from './firebase-config';

export const consultaUsuariosOnline = async (salaId) => {
    const salaRef = doc(db, 'salas', salaId)
    const salaSnap = await getDoc(salaRef)
    return salaSnap.data().usuarios_online
}

export const atualizaUsuariosOnline = async (salaId, incremento) => {
    const salaRef = doc(db, 'salas', salaId)
    var usuarios_online = await consultaUsuariosOnline(salaId) + incremento

    if (usuarios_online < 0) usuarios_online = 0;

    try {
        await updateDoc(salaRef, {
            usuarios_online: usuarios_online
        })
    } catch (error) {
        console.log(error);
    }
}

export const consultaTabuleiro = async (salaId) => {
    const salaRef = doc(db, 'salas', salaId)
    const salaSnap = await getDoc(salaRef)
    return salaSnap.data().tabuleiro
}

export const atualizaTabuleiro = async (salaId, novoTabuleiro) => {
    const salaRef = doc(db, 'salas', salaId);
    try {
        await updateDoc(salaRef, {
            tabuleiro: novoTabuleiro
        });
    } catch (error) {
        console.error('Erro ao atualizar tabuleiro:', error);
    }
};

export const consultaUIDJogadorAtual = async (salaId) => {
    const salaRef = doc(db, 'salas', salaId)
    const salaSnap = await getDoc(salaRef)
    return salaSnap.data().uid_jogador_atual
}

export const atualizaUIDJogadorAtual = async (salaId, usuario_uid) => {
    const salaRef = doc(db, 'salas', salaId)

    const usuarios_uid = await consultaUIDJogadores(salaId);
    const proximo_jogador = usuarios_uid.filter(uid => uid !== usuario_uid)[0]

    try {
        await updateDoc(salaRef, {
            uid_jogador_atual: proximo_jogador
        })
    } catch (error) {
        console.log(error);
    }
}

export const consultaUIDJogadores = async (salaId) => {
    const salaRef = doc(db, 'salas', salaId)
    const salaSnap = await getDoc(salaRef)
    return salaSnap.data().uid_jogadores
}

export const adicionaUIDJogadores = async (salaId, jogadorUID) => {
    const salaRef = doc(db, 'salas', salaId)
    var jogadoresUID = await consultaUIDJogadores(salaId)
    jogadoresUID.push(jogadorUID)
    try {
        await updateDoc(salaRef, {
            uid_jogadores: jogadoresUID
        })
    } catch (error) {
        console.log(error);
    }
}

export const removeUIDJogadores = async (salaId, jogadorUID) => {
    const salaRef = doc(db, 'salas', salaId)
    var jogadoresUID = await consultaUIDJogadores(salaId)
    var index = jogadoresUID.indexOf(jogadorUID)
    if (index !== -1) jogadoresUID.splice(index, 1)

    try {
        await updateDoc(salaRef, {
            uid_jogadores: jogadoresUID
        })
    } catch (error) {
        console.log(error);
    }
}