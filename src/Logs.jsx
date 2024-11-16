import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LogsPage.css'; // Asegúrate de crear este archivo CSS para estilos

const LogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [filteredLogs, setFilteredLogs] = useState([]);
    const [fechaHoraFilter, setFechaHoraFilter] = useState('');
    const [senderFilter, setSenderFilter] = useState('');
    const [receiverFilter, setReceiverFilter] = useState('');
    const [mensajeFilter, setMensajeFilter] = useState('');

    const fetchLogs = async (filtro = '', campo = '', offset = 0) => {
        try {
            const response = await axios.get('http://3.142.225.39:8000/logs', {
                params: {
                    filtro,
                    campo,
                    offset,
                },
            });

            // Asegurarse de que response.data sea un array
            const logsData = Array.isArray(response.data) ? response.data : [response.data];

            // Procesar los logs recibidos
            const logsFormateados = logsData.map(log => {
                // Remover corchetes y comillas si existen
                const cleanLog = log.replace(/[\[\]'"]/g, '');
                const [fechaHora, sender, receiver, mensaje] = cleanLog.split(';');
                return {
                    fechaHora: fechaHora || 'N/A',
                    sender: sender || 'N/A',
                    receiver: receiver || 'N/A',
                    mensaje: mensaje || 'N/A'
                };
            });

            console.log('Logs formateados:', logsFormateados); // Para debug
            setLogs(logsFormateados);
            setFilteredLogs(logsFormateados);
        } catch (error) {
            console.error('Error obteniendo logs:', error);
            console.log('Response data:', error.response?.data); // Para debug
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleFilter = () => {
        let filtro = '';
        let campo = '';

        if (fechaHoraFilter) {
            filtro = fechaHoraFilter;
            campo = 'fechaHora';
        } else if (senderFilter) {
            filtro = senderFilter;
            campo = 'sender';
        } else if (receiverFilter) {
            filtro = receiverFilter;
            campo = 'receiver';
        } else if (mensajeFilter) {
            filtro = mensajeFilter;
            campo = 'mensaje';
        }

        fetchLogs(filtro, campo);
    };

    return (
        <div className="logs-page">
            <h1>Logs</h1>
            <div className="filters">
                <input
                    type="datetime-local"
                    value={fechaHoraFilter}
                    onChange={(e) => setFechaHoraFilter(e.target.value)}
                    placeholder="Filtrar por fecha y hora"
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
                    value={mensajeFilter}
                    onChange={(e) => setMensajeFilter(e.target.value)}
                    placeholder="Filtrar por Mensaje"
                />
                <button onClick={handleFilter}>Filtrar</button>
            </div>
            <ul>
                {filteredLogs.map((log, index) => (
                    <li key={index}>
                        <strong>Fecha y Hora:</strong> {log.fechaHora} |
                        <strong> Sender:</strong> {log.sender} |
                        <strong> Receiver:</strong> {log.receiver} |
                        <strong> Mensaje:</strong> {log.mensaje}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LogsPage;
