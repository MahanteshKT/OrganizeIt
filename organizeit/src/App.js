import { useEffect } from 'react';
import './styles/global.scss';
import './App.scss';
import $ from 'jquery';
import Index from './pages/Index';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from './pages/Login/Login';
function App() {
    useEffect(() => {
        $('.App').css('color', 'blue');
    }, []);
    return (<>
             {/* <Index /> */}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
    </>
    );
}

export default App;
