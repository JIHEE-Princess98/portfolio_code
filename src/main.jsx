import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';

const { darkAlgorithm } = theme;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
          token: {
            fontFamily: 'NotoSansKR, Montserrat, sans-serif',
          },
          components: {
            Button: {
              colorPrimaryHover: "#db2777",   // pink-600
              colorPrimaryActive: "#be185d",  // pink-700
              borderRadius: 10,
              defaultBg: "transparent",
              controlHeight: 48,
              fontSize: 18,
              boxShadow: "none",
            }
          }
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
);
