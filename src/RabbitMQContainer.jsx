import React, { useState } from 'react';
import './RabbitMQContainer.css';

const RabbitMQContainer = ({ name, status, ttl, messages, consumers, maxLength, maxPriority, deadLetterExchange, deadLetterRoutingKey }) => {
    const [newTTL, setNewTTL] = useState('');

    const handleTTLChange = async () => {
        console.log("nuevoTTL: ", newTTL);
        try {
            const response = await fetch(`http://localhost:8000/retry_queues?module=${name}&attribute=qty&value=${newTTL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el TTL');
            }

            alert('TTL actualizado exitosamente');
        } catch (error) {
            console.error('Error updating TTL:', error);
            alert('Error al actualizar el TTL');
        }
    };

    return (
        <div className="container-card">
            <div className="container-header">
                <h2>{name}</h2>
                <span className={`status ${status.toLowerCase()}`}>{status}</span>
            </div>
            <div className="container-body">
                <p><strong>TTL:</strong> {ttl} ms</p>
                <p><strong>Mensajes:</strong> {messages}</p>
                <p><strong>Consumidores:</strong> {consumers}</p>
                <p><strong>Longitud máxima:</strong> {maxLength}</p>
                <p><strong>Prioridad máxima:</strong> {maxPriority}</p>
                <p><strong>Dead Letter Exchange:</strong> {deadLetterExchange}</p>
                <p><strong>Dead Letter Routing Key:</strong> {deadLetterRoutingKey}</p>
                <input
                    type="number"
                    value={newTTL}
                    onChange={(e) => setNewTTL(e.target.value)}
                    placeholder="Nuevo TTL (ms)"
                />
                <button onClick={handleTTLChange}>Actualizar TTL</button>
            </div>
        </div>
    );
};

export default RabbitMQContainer;
