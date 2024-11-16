import React, { useState } from 'react';
import './LoginPage.css';
import escudo from './escudo.png'
import { AnimatedBackground } from 'animated-backgrounds';

const LoginPage = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState('');
    const [altura, setAltura] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (isRegistering) {
            // creacion de cuenta
            console.log('Creando cuenta:', { email, edad, altura, password });
            // TODO agregar logica de creacion, decidir si es con mail o username
        } else {
            // iniciar sesión
            try {
                const response = await fetch('http://localhost:8080/api/socios/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ nombreUsuario, password }),
                });

                if (!response.ok) {
                    throw new Error('Error en la autenticación');
                }

                const data = await response.json();
                console.log('Inicio de sesión exitoso:', data);
                setIsLoggedIn(true);
                window.location.href = '/main';
            } catch (error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <AnimatedBackground animationName="auroraBorealis" />
            <img src={escudo} className='escudoLogo'></img>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
