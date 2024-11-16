import React, { useState } from 'react';
import './RabbitMQContainer.css';

const RabbitMQContainer = ({ nombre, ttl, qty }) => {
    const [newTTL, setNewTTL] = useState('');
    const [newQTY, setNewQTY] = useState('');
    const [currentTTL, setCurrentTTL] = useState(ttl);
    const [currentQTY, setCurrentQTY] = useState(qty);

    const handleTTLChange = async () => {
        const ttlValue = parseInt(newTTL) * 1000;
        console.log("nuevoTTL: ", ttlValue);
        try {
            const response = await fetch(`http://3.142.225.39:8000/retry_queues?module=${nombre}&attribute=ttl&value=${ttlValue}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el TTL');
            }

            setCurrentTTL(parseInt(newTTL));
            setNewTTL('');
            alert('TTL actualizado exitosamente');
        } catch (error) {
            console.error('Error updating TTL:', error);
            alert('Error al actualizar el TTL');
        }
    };

    const handleQTYChange = async () => {
        console.log("nuevoQTY: ", newQTY);
        try {
            const response = await fetch(`http://3.142.225.39:8000/retry_queues?module=${nombre}&attribute=qty&value=${newQTY}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el QTY');
            }

            setCurrentQTY(parseInt(newQTY));
            setNewQTY('');
            alert('QTY actualizado exitosamente');
        } catch (error) {
            console.error('Error updating QTY:', error);
            alert('Error al actualizar el QTY');
        }
    };

    const handleRelease = async () => {
        try {
            const response = await fetch(`http://3.142.225.39:8000/dead-letter/release?module=${nombre}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al liberar la cola');
            }

            alert('Cola liberada exitosamente');
        } catch (error) {
            console.error('Error al liberar la cola:', error);
            alert('Error al liberar la cola');
        }
    };

    return (
        <div className="container-card">
            <div className="container-header">
                <h2>{nombre}</h2>
            </div>
            <div className="container-body">
                <p><strong>TTL:</strong> {currentTTL} secs</p>
                <p><strong>Quantity:</strong> {currentQTY} colas de reintento en vigor</p>
                <input
                    type="number"
                    value={newTTL}
                    onChange={(e) => setNewTTL(e.target.value)}
                    placeholder="Nuevo TTL (ms)"
                />
                <button onClick={handleTTLChange}>Actualizar TTL</button>
                <input
                    type="number"
                    value={newQTY}
                    onChange={(e) => setNewQTY(e.target.value)}
                    placeholder="Nueva cantidad de colas de retry"
                />
                <button onClick={handleQTYChange}>Actualizar cantidad de colas retry</button>
                <button onClick={handleRelease}>Liberar Mensajes</button>
            </div>
        </div>
    );
};

export default RabbitMQContainer;
