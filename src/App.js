import React, { useState, useEffect } from 'react';
import logo from './escudo.png';
import SimpleButton from './SimpleButton';
import GrafanaDashboard from './grafanaDashboard';
import './App.css';
import AvisosButton from './AvisosButton';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import RabbitMQContainers from './RabbitMQContainers';
import LogsPage from './LogsPage';
import Login from './Login';
import LoginPage from './LoginPage';

function Home() {
  const apiKey = 'eyJrIjoibUZKaE9IVFVQTWlJYzFmR09kdW1yRmJUbVhNZ1IzRXAiLCJuIjoibWFpbiIsImlkIjoxfQ==';
  const dashboardUid = '6r8UKCRHz';
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/rabbitmq-containers');
  };
  const handleLogsClick = () => {
    navigate('/logs');
  };
  const fetchDashboardData = async () => {
    fetch(`http://grafana:3000/api/dashboards/uid/${dashboardUid}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // informacion del dashboard
        const panels = data.dashboard.panels; // array de paneles
      })
      .catch(error => console.error('Error:', error));
  };
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isHoveredRabbit, setIsHoveredRabbit] = useState(false);
  const [isHoveredLogs, setIsHoveredLogs] = useState(false);
  const [alertLevel, setAlertLevel] = useState('Normal');
  const [alertDetails, setAlertDetails] = useState('Todo está funcionando correctamente');

  useEffect(() => {
    // funcion actualizar el nivel de alerta
    const updateAlertLevel = () => {
      // TODO modificar logica con api real, esto es aleatorio y para pruebas
      const levels = ['Normal', 'Bajo', 'Medio', 'Alto', 'Crítico'];
      const randomLevel = levels[Math.floor(Math.random() * levels.length)];
      setAlertLevel(randomLevel);

      switch (randomLevel) {
        case 'Normal':
          setAlertDetails('Todo está funcionando correctamente');
          break;
        case 'Bajo':
          setAlertDetails('Se han detectado anomalías menores');
          break;
        case 'Medio':
          setAlertDetails('Hay problemas que requieren atención');
          break;
        case 'Alto':
          setAlertDetails('Se requiere intervención inmediata');
          break;
        case 'Crítico':
          setAlertDetails('¡Situación crítica! Actuar de inmediato');
          break;
        default:
          setAlertDetails('Estado desconocido');
      }
    };

    // actualiza el nivel de alerta cada 10 segundos
    const intervalId = setInterval(updateAlertLevel, 10000);

    // limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeError(true);
      }
    }, 5000); // 5 segundos de espera

    return () => clearTimeout(timer);
  }, [iframeLoaded]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />

            <div className="alert-panel">
              <h2 style={{ color: 'red', fontWeight: 'bold', textAlign: 'center' }}>¡FUNCIÓN EN DESARROLLO!</h2>
              <h4>Nivel de Alerta: {alertLevel}</h4>
              <p>Detalles: {alertDetails}</p>
            </div>
          </div>

          <h1>Dashboard de Monitoreo</h1>
          <div
            className={`icon-container ${isHoveredRabbit ? 'neon' : ''}`}
            onMouseEnter={() => setIsHoveredRabbit(true)}
            onMouseLeave={() => setIsHoveredRabbit(false)}
            onClick={handleClick}
          >
            <span className="material-symbols-outlined icon">
              manage_search
            </span>
            <span className="icon-text">Colas RabbitMQ</span>
          </div>
          <div
            className={`icon-container ${isHoveredLogs ? 'neon' : ''}`}
            onMouseEnter={() => setIsHoveredLogs(true)}
            onMouseLeave={() => setIsHoveredLogs(false)}
            onClick={handleLogsClick}
          >
            <span className="material-symbols-outlined icon">
              manage_search
            </span>
            <span className="icon-text">Ver Logs</span>
          </div>


        </div>
        <AvisosButton />
        {iframeError ? (
          <div>Error al cargar el contenido. Por favor, inténtalo más tarde.</div>
        ) : (
          <iframe
            src="http://3.142.225.39:3000/d/lJNlSmkNk/futbol?orgId=1&kiosk"
            width="100%"
            height="800"
            frameBorder="0"
            title="Grafana 1"
            marginBottom="0"
            onLoad={handleIframeLoad}
          />
        )}
      </header>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Home /> : <Login onLogin={handleLogin} />} />
        <Route path="/loginTest" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/rabbitmq-containers" element={<RabbitMQContainers />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </Router>
  );
}
export default App;
//API Key Grafana:
//eyJrIjoibUZKaE9IVFVQTWlJYzFmR09kdW1yRmJUbVhNZ1IzRXAiLCJuIjoibWFpbiIsImlkIjoxfQ==
//<GrafanaDashboard dashboardUID="6r8UKCRHz" />

