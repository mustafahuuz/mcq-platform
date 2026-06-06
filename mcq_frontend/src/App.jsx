import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

const QuestionBankManager = lazy(() => import('./QuestionBankManager'));
const ExamView = lazy(() => import('./ExamView'));
const SummaryViewer = lazy(() => import('./SummaryViewer'));
const Dashboard = lazy(() => import('./Dashboard'));
const QuestionViewer = lazy(() => import('./QuestionViewer'));

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <h1>MCQ Platform</h1>
      <div className="nav-links">
        <Link to="/" className={isActive('/')}>Dashboard</Link>
        <Link to="/manage" className={isActive('/manage')}>Question Bank</Link>
        <Link to="/study" className={isActive('/study')}>Study Portal</Link>
        <Link to="/exam" className={isActive('/exam')}>Take Exam</Link>
      </div>
    </nav>
  );
};


function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}><h2>Loading View...</h2></div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manage" element={<div className="container"><QuestionBankManager /></div>} />
          <Route path="/study" element={<SummaryViewer />} />
          <Route path="/exam" element={<ExamView />} />
          <Route path="/view-questions" element={<QuestionViewer />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
