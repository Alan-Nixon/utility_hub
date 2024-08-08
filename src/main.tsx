import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }).catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
    });
  }
  