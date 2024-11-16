import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RabbitMQContainer from './RabbitMQContainer';
import { useNavigate } from 'react-router-dom';
import './RabbitMQContainers.css';

const RabbitMQContainers = () => {
    const [queues, setQueues] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchQueues = async () => {
        const colasPredefinidas = [
            { nombre: 'e_commerce', ttl: 3, qty: 3 },
            { nombre: 'gestion_interna', ttl: 3, qty: 3 },
            { nombre: 'gestion_financiera', ttl: 3, qty: 3 },
            { nombre: 'usuario', ttl: 3, qty: 3 }
        ];
        setQueues(colasPredefinidas);
    };

    useEffect(() => {
        fetchQueues();
        const intervalId = setInterval(() => {
            fetchQueues();
        }, 10000);

        return () => clearInterval(intervalId);
    }, []);

    const handleGoBack = () => {
        navigate('/');
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    const buttonStyle = {
        backgroundColor: '#1b1b1f',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        marginBottom: '20px',
    };

    return (
        <div className="rabbitmq-containers">
            <button style={buttonStyle} onClick={handleGoBack}>Volver al Inicio</button>
            <div className="containers-list">
                {queues.map((queue) => (
                    <RabbitMQContainer
                        nombre={queue.nombre}
                        ttl={queue.ttl}
                        qty={queue.qty || 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default RabbitMQContainers;
