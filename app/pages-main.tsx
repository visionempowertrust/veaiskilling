import React from 'react';import{createRoot}from'react-dom/client';import Portal from './portal';import './globals.css';
const route=window.location.pathname.replace(/^\/veaiskilling\/?/,'/').replace(/\/$/,'')||'/';
const sections:Record<string,any>={'/':'home','/module-1':'module1','/module-2':'module2','/module-3':'module3','/feedback':'feedback','/assessment':'assessment','/sessions':'sessions','/attendance':'attendance','/announcements':'announcements'};
createRoot(document.getElementById('root')!).render(<React.StrictMode><Portal section={sections[route]||'home'}/></React.StrictMode>);
