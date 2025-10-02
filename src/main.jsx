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
              borderRadius: 10,
              controlHeight: 48,
              fontSize: 18,
              boxShadow: 'none',

              defaultBg: 'transparent',
              defaultHoverBg: 'transparent',
              defaultActiveBg: 'transparent',

              defaultBorderColor: '#db2777',
              defaultHoverBorderColor: '#be185d',
              defaultActiveBorderColor: '#9d174d',
              defaultColor: '#db2777',
              defaultHoverColor: '#be185d',
              defaultActiveColor: '#9d174d',
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
);
