import { useEffect } from 'react';
import './styles/global.scss';
import './App.scss';
import $ from 'jquery';
import Index from './pages/Index';

function App() {
    useEffect(() => {
        $('.App').css('color', 'blue');
    }, []);
    return (
        <Index />
    );
}

export default App;
