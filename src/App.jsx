import { useEffect, useState } from 'react';
import LoginPage from './LoginPage.jsx';
import TodoPage from './TodoPage.jsx';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('daymark-authenticated') === 'true');
  const [page, setPage] = useState(() => window.location.hash === '#/todos' ? 'todos' : 'login');

  useEffect(() => {
    function syncPage() {
      setPage(window.location.hash === '#/todos' ? 'todos' : 'login');
    }
    window.addEventListener('hashchange', syncPage);
    return () => window.removeEventListener('hashchange', syncPage);
  }, []);

  function login() {
    sessionStorage.setItem('daymark-authenticated', 'true');
    setIsLoggedIn(true);
    window.location.hash = '/todos';
  }

  function logout() {
    sessionStorage.removeItem('daymark-authenticated');
    setIsLoggedIn(false);
    window.location.hash = '/login';
  }

  useEffect(() => {
    if (page === 'todos' && !isLoggedIn) window.location.hash = '/login';
  }, [page, isLoggedIn]);

  return page === 'todos' && isLoggedIn ? <TodoPage onLogout={logout} /> : <LoginPage onLogin={login} />;
}
