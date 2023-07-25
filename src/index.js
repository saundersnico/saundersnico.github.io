import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import styles from './styles/global.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Navigation from './modules/nav';
import Profile from './routes/profile';
import Certs from './routes/certs';
import Juegos from './routes/juegos';
import Snake from './routes/juegos/snake';
import Lore from './routes/loreoflegends';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Profile/>,
    errorElement:<h1>Error</h1>
  },
  {
    path: "/certs",
    element: <Certs/>,
    errorElement:<h1>Error</h1>
  },
  {
    path: "/juegos",
    element: <Juegos/>,
    errorElement:<h1>Error</h1>
  },
  {
    path: "/juegos/snake",
    element: <Snake/>,
    errorElement:<h1>Error</h1>
  },
  {
    path: "/LoreofLegends",
    element: <Lore/>,
    errorElement:<h1>Error</h1>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <RouterProvider router={router}/>
  //</React.StrictMode>
);
reportWebVitals();
