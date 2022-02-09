import Dashboard from './pages/Dashboard';
import { Routes, Route } from "react-router-dom";
import './App.css'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
        </Routes>
    );
}

export default App;
