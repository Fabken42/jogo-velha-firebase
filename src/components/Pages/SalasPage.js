import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase-config';
import '../Estilos/SalasPage.css'
/*------------------------------------------------------------- */

function SalasPage() {
    const NUM_MAX_JOGADORES = 2
    const [numJogadores, setNumJogadores] = useState(Array(4).fill(0))

    const salaCollection = collection(db, "salas");
    let unsubscribe;

    useEffect(() => {
        unsubscribe = onSnapshot(salaCollection, (querySnapshot) => {
            const temp = []
            querySnapshot.forEach((doc) => {
                temp.push(doc.data().usuarios_online)
            });
            setNumJogadores(temp);
        });

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        }
    }, [])

    return (
        <div className='salas'>
            <h1 className='salas__titulo'>Salas de Jogo</h1>
            <ul className='salas__lista-salas'>
                {[1, 2, 3, 4].map((salaNumero, index) => (
                    <Link to={`/salas/${salaNumero}`} className={`sala__link ${numJogadores[index] >= NUM_MAX_JOGADORES ? 'sala--disabled' : ''}`}>
                        <li key={salaNumero} className={`sala`}>
                            <span className={`sala__span ${numJogadores[index] >= NUM_MAX_JOGADORES ? 'sala__span--disabled' : ''}`}>
                                Sala {salaNumero}. Jogadores ({numJogadores[index]}/2)
                            </span>
                        </li>
                    </Link>
                ))}
            </ul>
        </div>
    );

}

export default SalasPage;