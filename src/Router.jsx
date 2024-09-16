import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Create from './Create';
import Table from './Table';

function AppRouter() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to='/'>Inicio</Link>
                        </li>
                        <li>
                            <Link to='/create'>Crear</Link>
                        </li>
                        <li>
                            <Link to='/table'>Listado</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/' element={<h2>Inicio</h2>} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/table' element={<Table />} />
                </Routes>
            </div>
        </Router>
    );
}

export default AppRouter;
