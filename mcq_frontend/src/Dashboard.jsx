import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getSubjectColor } from './utils/colors';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalQuestions: 0, totalBanks: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/api/question-banks/');
        const banks = res.data;
        
        let totalQ = 0;
        const data = banks.map((bank, index) => {
          const qCount = bank.questions ? bank.questions.length : 0;
          totalQ += qCount;
          return {
            name: bank.subject,
            Questions: qCount,
            fill: getSubjectColor(bank.subject)
          };
        });

        setStats({ totalQuestions: totalQ, totalBanks: banks.length });
        setChartData(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '2rem', marginTop: '1rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome to MCQ Platform</h1>
        <p className="text-muted" style={{ fontSize: '1rem' }}>A premium, offline-ready examination system for advanced academic testing.</p>
      </div>

      <div className="dashboard-grid" style={{ marginBottom: '2rem', gap: '1rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 className="mb-2">Instructor Portal</h2>
          <p className="text-muted mb-4">Manage question banks, import questions via Excel, and monitor student analytics.</p>
          <Link to="/manage" className="btn btn-primary">Manage Question Banks</Link>
        </div>
        
        <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid var(--secondary-color)' }}>
          <h2 className="mb-2">Study Portal</h2>
          <p className="text-muted mb-4">Review layered summaries, core concepts, and high-yield exam definitions.</p>
          <Link to="/study" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--secondary-color), var(--primary-color))' }}>Read Summaries</Link>
        </div>

        <div className="card" style={{ padding: '1.5rem', borderTop: '4px solid var(--success-color)' }}>
          <h2 className="mb-2">Student Portal</h2>
          <p className="text-muted mb-4">Take secure, randomized exams and receive personalized weakness analysis and reading guides.</p>
          <Link to="/exam" className="btn btn-success" style={{ boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)' }}>Take Practice Exam</Link>
        </div>
      </div>

      {/* Subjects Section */}
      <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1.2rem' }}>Browse by Subject</h2>
        {loading ? (
            <p className="text-muted">Loading subjects...</p>
        ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {chartData.map((bank, index) => (
                    <div key={index} style={{ padding: '1rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', borderLeft: `4px solid ${bank.fill}` }}>
                        <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{bank.name}</h3>
                        <p className="text-muted" style={{ marginBottom: '1rem' }}>{bank.Questions} Questions</p>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Link to={`/view-questions?subject=${encodeURIComponent(bank.name)}`} className="btn btn-primary" style={{ flex: 1, padding: '0.5rem', textAlign: 'center', fontSize: '0.85rem' }}>View MSQs</Link>
                            <Link to={`/exam?subject=${encodeURIComponent(bank.name)}`} className="btn btn-success" style={{ flex: 1, padding: '0.5rem', textAlign: 'center', fontSize: '0.85rem' }}>Take Exam</Link>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* Analytics Section */}
      <div className="card" style={{ padding: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1.2rem' }}>System Analytics</h2>
        
        {loading ? (
          <p className="text-muted">Loading statistics...</p>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div className="stat-card">
                <h3>Total Questions</h3>
                <div className="stat-value text-gradient">{stats.totalQuestions}</div>
              </div>
              <div className="stat-card">
                <h3>Total Subjects</h3>
                <div className="stat-value" style={{ color: 'var(--success-color)' }}>{stats.totalBanks}</div>
              </div>
            </div>

            <div className="chart-container" style={{ marginTop: '1rem', padding: '1rem' }}>
              <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '1rem' }}>Questions Distribution by Subject</h3>
              <div style={{ width: '100%', height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--text-secondary)" 
                      angle={-45} 
                      textAnchor="end" 
                      tick={{ fill: 'var(--text-secondary)' }}
                      interval={0}
                      height={60}
                    />
                    <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)' }}
                      itemStyle={{ color: 'var(--text-primary)' }}
                      cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
                    />
                    <Bar dataKey="Questions" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
