import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './css/main.css'
import * as serviceWorkerRegistration from './serviceWorkerRegistration.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)


serviceWorkerRegistration.register();
