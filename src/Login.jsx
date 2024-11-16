import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Iniciando Sesion...");
        try {
            const response = await fetch(`http://3.142.225.39:8000/authlogin?username=${username}&password=${password}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const responseData = await response.text();
                if (responseData.trim() === '') {
                    setError('Credenciales incorrectas. Inténtalo de nuevo.');
                } else {
                    onLogin();
                }
            } else {
                setError('Credenciales incorrectas. Inténtalo de nuevo.');
            }
        } catch (err) {
            setError('Error al intentar iniciar sesión. Inténtalo de nuevo.');
            console.error(err);
        }
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        if (username !== 'admin' || password !== '59482*M97&!@3@%$2$r@') {
            setError('Credenciales incorrectas. Inténtalo de nuevo.');
            return;
        }
        onLogin();
    };*/



    return (
        <div>
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
