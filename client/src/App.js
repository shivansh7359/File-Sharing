import Login from './components/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup';
import Homepage from './components/Homepage';
import { useState } from 'react';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  }

  return (
    <BrowserRouter>
      <div style={{height: '100%', width: '100%'}}>
        <Routes>
          <Route path='/' element={<Navigate to="/login"/>}/>
          <Route 
            path='/login' 
            element={
              <Login/>
            }
          />
          <Route 
            path='/home' 
            element={<Homepage/>}
          />
          <Route 
            path='/signup' 
            element={<Signup/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
