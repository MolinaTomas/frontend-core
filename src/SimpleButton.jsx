import React from 'react';

const SimpleButton = ({ label, onClick }) => {
  return (
    <button style={styles.button} onClick={onClick}>
      {label}
    </button>
  );
};

const styles = {
  button: {
    backgroundColor: '#4CAF50',  // Color verde
    color: 'white',              // Texto blanco
    padding: '10px 20px',        // Espacio interno
    border: 'none',              // Sin borde
    borderRadius: '5px',         // Bordes redondeados
    cursor: 'pointer',           // Cursor de "mano"
    fontSize: '16px',            // Tamaño del texto
    marginBottom: '20px',
  }
};

export default SimpleButton;
