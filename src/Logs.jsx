import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogsPage.css'; // Asegúrate de crear este archivo CSS para estilos

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [senderFilter, setSenderFilter] = useState('');
    const [receiverFilter, setReceiverFilter] = useState('');
    const [statusCodeFilter, setStatusCodeFilter] = useState('');

    const fetchLogs = async (filtro = '', campo = '', offset = 0) => {
        try {
            const response = await axios.get('http://localhost:8000/logs', {
                params: {
                    filtro,
                    campo,
                    offset,
                },
            });
            setLogs(response.data);
            setFilteredLogs(response.data); // Inicialmente, mostrar todos los logs
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs(); // Llama a la función sin filtros al cargar
    }, []);

    const handleFilter = () => {
        let filtro = '';
        let campo = '';

        if (dateFilter) {
            filtro = dateFilter; // Puedes ajustar esto según cómo quieras filtrar por fecha
            campo = 'date'; // Campo a filtrar
        } else if (senderFilter) {
            filtro = senderFilter;
            campo = 'sender';
        } else if (receiverFilter) {
            filtro = receiverFilter;
            campo = 'receiver';
        } else if (statusCodeFilter) {
            filtro = statusCodeFilter;
            campo = 'statusCode';
        }

        fetchLogs(filtro, campo); // Llama a fetchLogs con los filtros
    };

    return (
        <div className="logs-page">
            <h1>Logs</h1>
            <div className="filters">
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    placeholder="Filtrar por fecha"
                />
                <input
                    type="text"
                    value={senderFilter}
                    onChange={(e) => setSenderFilter(e.target.value)}
                    placeholder="Filtrar por Sender"
                />
                <input
                    type="text"
                    value={receiverFilter}
                    onChange={(e) => setReceiverFilter(e.target.value)}
                    placeholder="Filtrar por Receiver"
                />
                <input
                    type="text"
                    value={statusCodeFilter}
                    onChange={(e) => setStatusCodeFilter(e.target.value)}
                    placeholder="Filtrar por Status Code"
                />
                <button onClick={handleFilter}>Filtrar</button>
            </div>
            <ul>
                {filteredLogs.map((log, index) => (
                    <li key={index}>
                        <strong>Fecha:</strong> {log.date} |
                        <strong> Sender:</strong> {log.sender} |
                        <strong> Receiver:</strong> {log.receiver} |
                        <strong> Status Code:</strong> {log.statusCode} |
                        <strong> Mensaje:</strong> {log.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogsPage;
