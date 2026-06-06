import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';
import { getSubjectColor } from './utils/colors';

const QuestionViewer = () => {
    const location = useLocation();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subjectName, setSubjectName] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const targetSubject = queryParams.get('subject');
        setSubjectName(targetSubject || 'All Subjects');

        axios.get('/api/questions/')
            .then(res => {
                let allQ = res.data;
                if (targetSubject) {
                    allQ = allQ.filter(q => q.subject === targetSubject);
                }
                setQuestions(allQ);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch questions", err);
                setLoading(false);
            });
    }, [location.search]);

    if (loading) return <div className="container"><p>Loading Questions...</p></div>;

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0 }}>
                    MSQs for {subjectName}
                </h1>
                <Link to={`/exam?subject=${encodeURIComponent(subjectName)}`} className="btn btn-primary">
                    Take Exam in this Subject
                </Link>
            </div>
            
            <p className="text-muted mb-4">Total Questions: {questions.length}</p>

            {questions.length === 0 ? (
                <div className="card">
                    <p>No questions found for this subject.</p>
                </div>
            ) : (
                questions.map((q, idx) => (
                    <div key={q.id} className="card mb-4" style={{ border: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                            <div style={{ background: getSubjectColor(q.subject || 'General'), color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block' }}>
                                {q.subject || 'General'}
                            </div>
                            {q.tags && (
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tags: {q.tags}</div>
                            )}
                        </div>
                        <h3 className="mb-2" style={{color: 'var(--text-primary)', fontSize: '1.25rem', marginTop: '0.5rem'}}>{idx + 1}. {q.content}</h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1.5rem' }}>
                            {q.options?.map((opt, oIdx) => (
                                <div key={opt.id} style={{ 
                                    padding: '1rem', 
                                    background: opt.is_correct ? 'rgba(16, 185, 129, 0.1)' : 'rgba(0,0,0,0.2)', 
                                    border: opt.is_correct ? '1px solid var(--success-color)' : '1px solid transparent',
                                    borderRadius: '8px'
                                }}>
                                    <div style={{ fontWeight: opt.is_correct ? 'bold' : 'normal', color: opt.is_correct ? 'var(--success-color)' : 'var(--text-primary)' }}>
                                        {String.fromCharCode(65 + oIdx)}. {opt.content} {opt.is_correct && ' (Correct)'}
                                    </div>
                                    {opt.explanation && (
                                        <div style={{ marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                            Explanation: {opt.explanation}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default QuestionViewer;
