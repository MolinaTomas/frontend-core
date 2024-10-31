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

    const fetchLogs = async (filtro = '', campo = '', offset = '', date = '') => {
        console.log("FECHA LOG: ", date)
        try {
            const response = await axios.get('http://localhost:8000/logs', {
                params: {
                    filtro,
                    campo,
                    offset,
                    date
                },
            });
            setLogs(response.data);
            setFilteredLogs(response.data);
        } catch (error) {
            console.error('Error fetching logs:', error);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleFilter = () => {
        let filtro = '';
        let campo = '';

        if (dateFilter) {
            filtro = dateFilter;
            campo = 'datetime';
        } else if (senderFilter) {
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
            campo = 'reason'
        }

        fetchLogs(filtro, campo);
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
                <input
                    type="text"
                    value={reasonFilter}
                    onChange={(e) => setReasonFilter(e.target.value)}
                    placeholder="Filtrar por Razon"
                />
                <button onClick={handleFilter}>Filtrar</button>
            </div>
            <ul>
                {filteredLogs.map((log, index) => (
                    <li key={index}>
                        <strong>Fecha:</strong> {log.date} |
                        <strong> Sender:</strong> {log.sender} |
                        <strong> Receiver:</strong> {log.receiver} |
                        <strong> Case:</strong> {log.case} |
                        <strong> Mensaje:</strong> {log.message} |
                        <strong> Razon:</strong> {log.reason}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogsPage;
