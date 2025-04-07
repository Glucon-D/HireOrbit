import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../lib/appwrite';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth()
            .then(user => {
                if (user) {
                    setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                    // Redirect to dashboard if on login/signup pages
                    const path = window.location.pathname;
                    if (path === '/login' || path === '/signup') {
                        navigate('/dashboard');
                    }
                }
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    const value = {
        user,
        setUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
