import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogsPage.css';

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [senderFilter, setSenderFilter] = useState('');
    const [receiverFilter, setReceiverFilter] = useState('');
    const [caseFilter, setCaseFilter] = useState('');
    const [reasonFilter, setReasonFilter] = useState('');

    const fetchLogs = async (filtro = '', campo = '', date = '', offset = '') => {
        try {
            const response = await fetch(`http://3.142.225.39:8000/logs?filtro=${filtro}&campo=${campo}&offset=${offset}&date=${date}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Error al obtener los logs');
            }
            const data = await response.json();
            console.log("Logs recibidos:", data);

            // Procesar los logs recibidos
            const logsFormateados = data.map(log => {
                const [fecha, sender, receiver, caso, mensaje] = log.split(';');
                return {
                    fecha: fecha || 'N/A',
                    sender: sender || 'N/A',
                    receiver: receiver || 'N/A',
                    caso: caso || 'N/A',
                    mensaje: mensaje || 'N/A'
                };
            });

            setLogs(logsFormateados);
            setFilteredLogs(logsFormateados);
        } catch (error) {
            console.error('Error fetching logs:', error);
            setLogs([]);
            setFilteredLogs([]);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleFilter = () => {
        let filtro = '';
        let campo = '';
        let date = dateFilter || '';

        if (senderFilter) {
            filtro = senderFilter;
            campo = 'origin';
        } else if (receiverFilter) {
            filtro = receiverFilter;
            campo = 'destination';
        } else if (caseFilter) {
            filtro = caseFilter;
            campo = 'case';
        } else if (reasonFilter) {
            filtro = reasonFilter;
            campo = 'reason';
        }

        fetchLogs(filtro, campo, date);
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="logs-page">
            <div className="header">
                <button className="back-button" onClick={handleGoBack}>Volver</button>
                <h1>Logs</h1>
            </div>
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
                    value={caseFilter}
                    onChange={(e) => setCaseFilter(e.target.value)}
                    placeholder="Filtrar por Caso"
                />
                <button onClick={handleFilter}>Filtrar</button>
            </div>
            <ul>
                {Array.isArray(filteredLogs) && filteredLogs.length > 0 ? (
                    filteredLogs.map((log, index) => (
                        <li key={index}>
                            <strong>Fecha:</strong> {log.fecha} |
                            <strong> Sender:</strong> {log.sender} |
                            <strong> Receiver:</strong> {log.receiver} |
                            <strong> Caso:</strong> {log.caso} |
                            <strong> Mensaje:</strong> {log.mensaje} |
                        </li>
                    ))
                ) : (
                    <p>No hay logs disponibles.</p>
                )}
            </ul>
        </div>
    );
};

export default LogsPage;
