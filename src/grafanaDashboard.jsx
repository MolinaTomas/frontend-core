import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GrafanaDashboard = ({ dashboardUID }) => {
    const [panels, setPanels] = useState([]);

    useEffect(() => {
        // Cambia la URL de Grafana y el API Key si es necesario
        const fetchDashboard = async () => {
            try {
                const response = await axios.get(`http://3.142.225.39:3000/api/dashboards/uid/${dashboardUID}`, {
                    headers: {
                        Authorization: 'Bearer <eyJrIjoibUZKaE9IVFVQTWlJYzFmR09kdW1yRmJUbVhNZ1IzRXAiLCJuIjoibWFpbiIsImlkIjoxfQ==>',
                    },
                });

                const dashboard = response.data.dashboard;
                // Extraer los paneles del dashboard
                const extractedPanels = dashboard.panels.map((panel) => ({
                    id: panel.id,
                    title: panel.title,
                }));

                setPanels(extractedPanels);
            } catch (error) {
                console.error('Error fetching dashboard:', error);
            }
        };

        fetchDashboard();
    }, [dashboardUID]);

    return (
        <div>
            <h1>Paneles del Dashboard</h1>
            <div style={styles.grid}>
                {panels.map((panel) => (
                    <div key={panel.id} style={styles.panel}>
                        <h3>{panel.title}</h3>
                        {/* iFrame para cada panel */}
                        <iframe
                            src={`http://localhost:3000/d-solo/${dashboardUID}?orgId=1&panelId=${panel.id}`}
                            width="450"
                            height="200"
                            frameBorder="0"
                            title={panel.title}
                        ></iframe>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Estilos para los paneles
const styles = {
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))',
        gap: '20px',
        margin: '20px 0',
    },
    panel: {
        padding: '10px',
        backgroundColor: '#2e2e2e',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default GrafanaDashboard;
