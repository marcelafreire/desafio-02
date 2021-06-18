import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Button } from './components/Button';
import { MovieCard } from './components/MovieCard';

// import { SideBar } from './components/SideBar';
// import { Content } from './components/Content';


import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';
import { Content } from './components/Content';
import { MovieProvider } from './useMovie';
import { SideBar } from './components/SideBar';

export function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <MovieProvider>
        <SideBar />
        <Content />
      </MovieProvider>
    </div>
  )
}