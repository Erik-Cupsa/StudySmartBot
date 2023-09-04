import React, { useEffect } from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Progress from './components/Progress'
import ChatComponent from './components/ChatComponent';

function App() {
  useEffect(() => {
    document.title = 'StudySmartBot';
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route index element={<Progress />} path = "/progress"/>
          <Route index element={<ChatComponent />} path = "/bot"/>
        </Route>
      </Routes>
    </>
  );
}

export default App;