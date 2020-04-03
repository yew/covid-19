import React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/init.css';
import './assets/css/index.css';
import App from './App';

//全国哀悼日期间全站色彩设置为黑白
try {
    const now = Date.now();
    const start = 1585929600000; // 2020-04-04
    const end = 1586016000000; // 2020-04-05
    if (now > start && now < end) {
        const styles = 'html {-webkit-filter: grayscale(1);filter: grayscale(1);}';
        const styleSheet = document.createElement("style");
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }
} catch (e) {
}

ReactDOM.render(<App/>, document.getElementById('root'));
