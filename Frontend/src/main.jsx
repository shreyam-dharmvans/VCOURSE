import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import { Provider } from 'react-redux'
import { store } from './store/store.js'


axios.defaults.baseURL = 'https://vcourse.onrender.com';
axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster position='top-center'></Toaster>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
