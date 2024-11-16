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
            { nombre: 'e_commerce', estado: 'running', ttl: 3, cantidad: 3, consumidores: 5, longitudMaxima: 1000, prioridadMaxima: 10, intercambioCartaMuerta: 'dlx_e_commerce', claveEnrutamientoCartaMuerta: 'dlrk_e_commerce' },
            { nombre: 'gestion_interna', estado: 'running', ttl: 3, cantidad: 3, consumidores: 3, longitudMaxima: 800, prioridadMaxima: 8, intercambioCartaMuerta: 'dlx_gestion_interna', claveEnrutamientoCartaMuerta: 'dlrk_gestion_interna' },
            { nombre: 'gestion_financiera', estado: 'stopped', ttl: 3, cantidad: 3, consumidores: 2, longitudMaxima: 500, prioridadMaxima: 5, intercambioCartaMuerta: 'dlx_gestion_financiera', claveEnrutamientoCartaMuerta: 'dlrk_gestion_financiera' },
            { nombre: 'usuario', estado: 'running', ttl: 3, cantidad: 3, consumidores: 10, longitudMaxima: 2000, prioridadMaxima: 15, intercambioCartaMuerta: 'dlx_usuario', claveEnrutamientoCartaMuerta: 'dlrk_usuario' }
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
                        name={queue.name}
                        ttl={queue.ttl}
                        qty={queue.qty || 0}
                    />
                ))}
            </div>
        </div>
    );
};

export default RabbitMQContainers;
