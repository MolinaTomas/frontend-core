import React, { useState } from 'react';
import './AvisosButton.css'; // Asegúrate de crear este archivo CSS

const AvisosButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="avisos-container">
            <button className="avisos-button" onClick={togglePopup}>
                <span className="exclamation-icon">❗</span> Avisos
            </button>
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="close" onClick={togglePopup}>&times;</span>
                        <h2>Avisos</h2>
                        <p>Pasando por encima del escudo se puede ver el nivel de alerta actual.</p>
                        <p>Si se selecciona un panel para ver en perspectiva grande, usar la tecla "V" o "ESC"para minimizar dicho panel.</p>
                        <p>Los cambios se guardan activamente para todos los usuarios, los paneles se refrescan automaticamente.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvisosButton;
