import React, { useState } from 'react';
import './LoginPage.css';
import escudo from './escudo.png'
import { AnimatedBackground } from 'animated-backgrounds';

const LoginPage = ({ onLogin }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState('');
    const [altura, setAltura] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("Iniciando Sesion...");
        try {
            const response = await fetch(`http://3.142.225.39:8000/authlogin?username=${nombreUsuario}&password=${contrasena}`, {
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

    return (
        <div className="login-container">
            <AnimatedBackground animationName="auroraBorealis" />
            <img src={escudo} className='escudoLogo' alt="Escudo"></img>
            <h1 className='titulo'>Bienvenido al centro de Gestión</h1>
            <h2>{isRegistering ? 'Crear Cuenta' : 'Inicio de Sesión'}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                {isRegistering ? (
                    <>
                        <label className='label-field'>
                            <span>Correo Electrónico</span>
                            <input
                                type="email"
                                required
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className='label-field'>
                            <span>Edad</span>
                            <input
                                type="number"
                                required
                                className="input-field"
                                value={edad}
                                onChange={(e) => setEdad(e.target.value)}
                            />
                        </label>
                        <label className='label-field'>
                            <span>Altura (cm)</span>
                            <input
                                type="number"
                                required
                                className="input-field"
                                value={altura}
                                onChange={(e) => setAltura(e.target.value)}
                            />
                        </label>
                    </>
                ) : (
                    <>
                        <label className='label-field'>
                            <span>Nombre de Usuario</span>
                            <input
                                type="text"
                                required
                                className="input-field"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                            />
                        </label>
                    </>
                )}
                <label className='label-field'>
                    <span>Contraseña</span>
                    <input
                        type="password"
                        required
                        className="input-field"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </label>
                <button type="submit" className="submit-button">
                    {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                </button>
                {error && <p className="error-message">{error}</p>}
            </form>
            <button className="toggle-button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
            </button>
        </div>
    );
};

export default LoginPage;
