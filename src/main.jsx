import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev/index.js";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext.jsx";
import { Provider } from "react-redux";
import Store from './redux/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <Provider store={Store}>
                <AuthProvider>
                    <ThemeProvider>
                        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
                            <App />
                        </DevSupport>
                    </ThemeProvider>
                </AuthProvider>
            </Provider>
        </Router>
    </React.StrictMode>,
)
