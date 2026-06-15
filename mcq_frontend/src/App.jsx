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
      <div className="brand-container">
        <h1>MCQ Platform</h1>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem', letterSpacing: '0.5px' }}>
          &copy; {new Date().getFullYear()} Mustafa Hussein Zwayyer
        </div>
      </div>
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
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ flex: '1 0 auto' }}>
          <Suspense fallback={<div className="container" style={{ textAlign: 'center', marginTop: '10vh' }}><h2>Loading View...</h2></div>}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/manage" element={<div className="container"><QuestionBankManager /></div>} />
              <Route path="/study" element={<SummaryViewer />} />
              <Route path="/exam" element={<ExamView />} />
              <Route path="/view-questions" element={<QuestionViewer />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
}

export default App;
