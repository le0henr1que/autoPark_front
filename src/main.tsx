import React from 'react'
import Task from './views/HomePage/index'

import ReactDOM from 'react-dom/client';

import Rout from './Routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Rout />
  </React.StrictMode>
)