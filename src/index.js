import React from 'react';
import ReactDOM from 'react-dom';

// styling
import 'rsuite/dist/styles/rsuite-default.css';
import './index.css';

// components
import App from './components/App.jsx';
import '@specialdoom/docure-button';
import '@specialdoom/docure-header';
import '@specialdoom/docure-icon';
import '@specialdoom/docure-list';
import '@specialdoom/docure-article-card';
import '@specialdoom/docure-article';
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
