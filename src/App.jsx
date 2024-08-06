import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Nav from './assets/components/nav'
import { useNavigate } from 'react-router-dom'



function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsloggedIn] = useState();
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsloggedIn(true);
    }
  }, [])
  const handleLogin = () => {
    setIsloggedIn(true);
  }
  const handleLogout = () => {
    navigate("/");
    setIsloggedIn(false);
  }

  return (
    <>
      {isLoggedIn && <Nav handleLogout={handleLogout} />}
      <Outlet context={{ handleLogin }} />
      <ToastContainer />
    </>
  )
}

export default App
