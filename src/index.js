import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
//import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from './App';
//import Navigation from './Navigation'
//import Menu from './pages/Menu';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
  <App />
</React.StrictMode>
);


//<React.StrictMode>
//<Menu />
//</React.StrictMode>


//import {useHistory} from "react-router-dom";

//let history = useHistory();


//<Button onclick={() => {history.push("/Login")}}>Test</Button>;