import styles from './Estilos/TabuleiroAnimacao.module.css'

export default function TabuleiroAnimacao() {
  return (
    <div className="tabuleiro-animacao">
      <div className="quadrado quadrado-superior-esquerdo"><span className={`${styles.objeto} ${styles['quadrado-superior-esquerdo__objeto']}`}>X</span></div>
      <div className="quadrado quadrado-superior"></div>
      <div className="quadrado quadrado-superior-direito"><span className={`${styles.objeto} ${styles['quadrado-superior-direito__objeto']}`}>O</span></div>
      <div className="quadrado quadrado-esquerdo"></div>
      <div className="quadrado quadrado-meio"><span className={`${styles.objeto} ${styles['quadrado-meio__objeto']}`}>X</span></div>
      <div className="quadrado quadrado-direito"><span className={`${styles.objeto} ${styles['quadrado-direito__objeto']}`}>X</span></div>
      <div className={`quadrado quadrado-inferior-esquerdo ${styles['quadrado-inferior-esquerdo']}`}><span className={`${styles.objeto} ${styles['quadrado-inferior-esquerdo__objeto']}`}>O</span></div>
      <div className={`quadrado quadrado-inferior ${styles['quadrado-inferior']}`}><span className={`${styles.objeto} ${styles['quadrado-inferior__objeto']}`}>O</span></div>
      <div className={`quadrado quadrado-inferior-direito ${styles['quadrado-inferior-direito']}`}><span className={`${styles.objeto} ${styles['quadrado-inferior-direito__objeto']}`}>O</span></div>
    </div>
  )
}

// import React from 'react';
// import './Estilos/Tabuleiro.css';
// import styles from './Estilos/TabuleiroAnimacao.module.css';

// export default function TabuleiroAnimacao() {
//   return (
//     <div className={styles['tabuleiro-animacao']}>
//       <div className={`${styles.quadrado} ${styles['quadrado-superior-esquerdo']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-superior-esquerdo__objeto']}`}>X</span>
//       </div>
//       <div className={`${styles.quadrado} ${styles['quadrado-superior']}`}></div>
//       <div className={`${styles.quadrado} ${styles['quadrado-superior-direito']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-superior-direito__objeto']}`}>O</span>
//       </div>
//       <div className={`${styles.quadrado} ${styles['quadrado-esquerdo']}`}></div>
//       <div className={`${styles.quadrado} ${styles['quadrado-meio']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-meio__objeto']}`}>X</span>
//       </div>
//       <div className={`${styles.quadrado} ${styles['quadrado-direito']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-direito__objeto']}`}>X</span>
//       </div>
//       <div className={`${styles.quadrado} ${styles['quadrado-inferior-esquerdo']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-inferior-esquerdo__objeto']}`}>O</span>
//       </div>
//       <div className={`${styles.quadrado} ${styles['quadrado-inferior']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-inferior__objeto']}`}>O</span>
//       </div>
//       <div className={`${styles.quadrado} ${styles['quadrado-inferior-direito']}`}>
//         <span className={`${styles.objeto} ${styles['quadrado-inferior-direito__objeto']}`}>O</span>
//       </div>
//     </div>
//   )
// }
