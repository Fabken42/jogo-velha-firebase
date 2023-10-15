import React from 'react';

function Quadrado({ classeQuadrado, classeBgVitoria, classeBgEmpate, classeBgDerrota, conteudo, onClick }) {
  return <div className={`quadrado ${classeQuadrado}`} onClick={onClick}><span className={`${classeBgVitoria} ${classeBgEmpate} ${classeBgDerrota}`}>{conteudo}</span></div>;
}

export default Quadrado;
