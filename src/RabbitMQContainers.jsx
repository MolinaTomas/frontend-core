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
        try {
            const response = await axios.get('http://localhost:3001/queues');
            if (response.data && typeof response.data === 'object') {
                const queuesArray = Object.entries(response.data).map(([name, details]) => ({
                    name,
                    ...details,
                }));
                setQueues(queuesArray);
            } else {
                setError('La respuesta de la API no tiene el formato esperado');
            }
        } catch (error) {
            setError('Error al obtener las colas de RabbitMQ');
            console.error('Error fetching RabbitMQ queues:', error);
        }
    };

    useEffect(() => {
        fetchQueues(); // función para montar
        const intervalId = setInterval(() => {
            fetchQueues();
        }, 10000); // refresca cada 10 segundos

        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
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
                        key={queue.name}
                        name={queue.name}
                        status={queue.state || 'Unknown'}
                        ttl={queue.ttl}
                        messages={queue.messages}
                        consumers={queue.consumers}
                        maxLength={queue.maxLength}
                        maxPriority={queue.maxPriority}
                        deadLetterExchange={queue.deadLetterExchange}
                        deadLetterRoutingKey={queue.deadLetterRoutingKey}
                    />
                ))}
            </div>
        </div>
    );
};

export default RabbitMQContainers;
