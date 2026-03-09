import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './Pages/Home'
import { Novel } from './Pages/Novel'
import { Comic } from './Pages/Comic'
import { Layout } from './Layout';
import { Login } from './Pages/Login';
import { SignUp } from './Pages/SignUp';
import { Dashboard } from './Pages/Dashboard';
import { NovelDetail } from './Pages/NovelDetail';
import { Reader } from './Pages/Reader';
import { MyWorks } from './Pages/MyWorks';
import { CreateStory } from './Pages/CreateStory';
import { StoryManagement } from './Pages/StoryManagement';
import { Writer } from './Pages/Writer';

import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <Routes>
        <Route element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="Novel" element={<Novel />} />
          <Route path="Comic" element={<Comic />} />
          <Route path="Login" element={<Login onLogin={handleLogin} />} />
          <Route path="SignUp" element={<SignUp onLogin={handleLogin} />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="NovelDetail" element={<NovelDetail />} />
          <Route path="NovelDetail/:novelId" element={<NovelDetail />} />
          <Route path="Reader/:chapterId" element={<Reader />} />
          <Route path="MyWorks" element={<MyWorks />} />
          <Route path="CreateStory" element={<CreateStory />} />
          <Route path="StoryManagement/:storyId" element={<StoryManagement />} />
          <Route path="Writer/:storyId/:chapterId" element={<Writer />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App;
