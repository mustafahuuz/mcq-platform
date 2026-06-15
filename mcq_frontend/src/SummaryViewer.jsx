import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getSubjectColor } from './utils/colors';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

const SummaryViewer = () => {
    const [summaries, setSummaries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [examMode, setExamMode] = useState(false);
    const [expandedLayers, setExpandedLayers] = useState({}); // { summaryId: currentLevel (1, 2, or 3) }

    useEffect(() => {
        axios.get('/api/summaries/')
            .then(res => {
                // Fetch banks to map bank id to subject name
                axios.get('/api/question-banks/').then(bankRes => {
                    const bankMap = {};
                    bankRes.data.forEach(b => bankMap[b.id] = b.subject);
                    
                    const summariesWithSubject = res.data.map(s => ({
                        ...s,
                        subject_name: bankMap[s.bank] || s.topic_title
                    }));
                    setSummaries(summariesWithSubject);
                    
                    const initLayers = {};
                    summariesWithSubject.forEach(s => initLayers[s.id] = 1);
                    setExpandedLayers(initLayers);
                    setLoading(false);
                });
            })
            .catch(err => {
                console.error("Failed to fetch summaries:", err);
                setLoading(false);
            });
    }, []);

    const toggleLayer = (id, level) => {
        setExpandedLayers(prev => ({ ...prev, [id]: level }));
    };

    const renderLevel2 = (text) => {
        if (!text) return "No detailed summary available.";
        const blocks = text.split('\n').filter(b => b.trim().length > 0);
        return blocks.map((block, idx) => {
            const t = block.trim();
            if (t.endsWith(':') && t.length < 100) {
                return <h5 key={idx} style={{ color: 'var(--text-primary)', marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.05rem' }}>{t}</h5>;
            } else if (t.startsWith('-') || t.startsWith('•')) {
                return <div key={idx} style={{ marginLeft: '1.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'flex-start' }}><span style={{ color: 'var(--primary-color)', marginRight: '0.5rem' }}>•</span> <span>{t.replace(/^[-•]\s*/, '')}</span></div>;
            } else {
                return <p key={idx} style={{ marginBottom: '1rem' }}>{t}</p>;
            }
        });
    };

    if (loading) return <div className="container"><p>Loading Study Materials...</p></div>;

    if (summaries.length === 0) return (
        <div className="container">
            <h2>Study Materials</h2>
            <div className="card">
                <p>No study materials have been generated yet. Please run the summary import script.</p>
            </div>
        </div>
    );

    return (
        <div className="container" style={{ maxWidth: '900px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                    <h1 className="text-gradient" style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Study Portal</h1>
                    <p className="text-muted" style={{ fontSize: '1.1rem' }}>High-efficiency layered reading format.</p>
                </div>
                
                {/* Exam Mode Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontWeight: !examMode ? 'bold' : 'normal', color: !examMode ? 'var(--primary-color)' : 'var(--text-secondary)' }}>Study Mode</span>
                    <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '40px', height: '20px' }}>
                        <input type="checkbox" checked={examMode} onChange={() => setExamMode(!examMode)} style={{ opacity: 0, width: 0, height: 0 }} />
                        <span className="slider round" style={{ position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: examMode ? 'var(--danger-color)' : 'var(--border-color)', borderRadius: '20px', transition: '.4s' }}>
                            <span style={{ position: 'absolute', content: '""', height: '14px', width: '14px', left: examMode ? '22px' : '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '.4s' }}></span>
                        </span>
                    </label>
                    <span style={{ fontWeight: examMode ? 'bold' : 'normal', color: examMode ? 'var(--danger-color)' : 'var(--text-secondary)' }}>Exam Mode ⚡</span>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {summaries.map(summary => {
                    const data = summary.content_json || {};
                    const level = expandedLayers[summary.id] || 1;
                    const subjectColor = getSubjectColor(summary.topic_title); // Or we could use bank subject color if we linked it

                    return (
                        <div key={summary.id} className="card" style={{ borderTop: `4px solid ${subjectColor}`, position: 'relative' }}>
                            
                            {/* Convert to MCQ Button */}
                            <Link to={`/exam?subject=${encodeURIComponent(summary.subject_name)}`} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid var(--border-color)' }}>
                                <span>Convert to MCQ ➔</span>
                            </Link>

                            <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem', paddingRight: '120px' }}>
                                {summary.topic_title.replace(/_/g, ' ')}
                            </h2>

                            {/* Quick Scan Panel */}
                            <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(0,0,0,0.2)', padding: '0.8rem 1.2rem', borderRadius: '8px', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                                <div style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text-secondary)' }}>⏱ Read Time:</strong> {summary.read_time}</div>
                                <div style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text-secondary)' }}>🎯 Focus:</strong> {summary.focus_area}</div>
                                <div style={{ fontSize: '0.9rem' }}><strong style={{ color: 'var(--text-secondary)' }}>🔥 Difficulty:</strong> <span style={{ color: summary.difficulty === 'Hard' ? 'var(--danger-color)' : 'var(--success-color)' }}>{summary.difficulty}</span></div>
                            </div>

                            {/* EXAM MODE VIEW */}
                            {examMode ? (
                                <div style={{ background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '8px', border: '1px dashed var(--danger-color)' }}>
                                    <h3 style={{ color: 'var(--danger-color)', marginBottom: '1rem' }}>⚡ High-Yield Facts Only</h3>
                                    
                                    {/* Definitions First */}
                                    {data.definitions && data.definitions.length > 0 && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>📚 Key Definitions</h4>
                                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)' }}>
                                                {data.definitions.map((df, i) => (
                                                    <li key={i} style={{ marginBottom: '0.5rem' }}>
                                                        <strong style={{ color: subjectColor }}>{df.term}:</strong> {df.meaning}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Key Points */}
                                    {data.level_1 && data.level_1.length > 0 && (
                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>★ Core Concepts</h4>
                                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)' }}>
                                                {data.level_1.map((pt, i) => (
                                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Mistakes */}
                                    {data.mistakes && data.mistakes.length > 0 && (
                                        <div>
                                            <h4 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>⚠ Common Mistakes</h4>
                                            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-primary)' }}>
                                                {data.mistakes.map((pt, i) => (
                                                    <li key={i} style={{ marginBottom: '0.5rem' }}>{pt}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {(!data.mistakes || data.mistakes.length === 0) && (!data.level_1 || data.level_1.length === 0) && (
                                        <p className="text-muted">No key points extracted for exam mode yet.</p>
                                    )}
                                </div>
                            ) : (
                                /* STUDY MODE VIEW (Layered Read Format) */
                                <div>
                                    {/* Progressive Disclosure Controls */}
                                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                                        <button 
                                            onClick={() => toggleLayer(summary.id, 1)}
                                            style={{ flex: 1, padding: '0.8rem', background: level === 1 ? 'rgba(255,255,255,0.05)' : 'transparent', color: level === 1 ? 'var(--primary-color)' : 'var(--text-secondary)', border: 'none', borderBottom: level === 1 ? '2px solid var(--primary-color)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}>
                                            Level 1: Key Points
                                        </button>
                                        <button 
                                            onClick={() => toggleLayer(summary.id, 2)}
                                            style={{ flex: 1, padding: '0.8rem', background: level === 2 ? 'rgba(255,255,255,0.05)' : 'transparent', color: level === 2 ? 'var(--success-color)' : 'var(--text-secondary)', border: 'none', borderBottom: level === 2 ? '2px solid var(--success-color)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}>
                                            Level 2: Summary
                                        </button>
                                        <button 
                                            onClick={() => toggleLayer(summary.id, 3)}
                                            style={{ flex: 1, padding: '0.8rem', background: level === 3 ? 'rgba(255,255,255,0.05)' : 'transparent', color: level === 3 ? 'var(--secondary-color)' : 'var(--text-secondary)', border: 'none', borderBottom: level === 3 ? '2px solid var(--secondary-color)' : '2px solid transparent', cursor: 'pointer', fontWeight: 'bold' }}>
                                            Level 3: Deep Dive
                                        </button>
                                    </div>

                                    {/* Content Rendering based on Level */}
                                    <div style={{ minHeight: '150px' }}>
                                        {level === 1 && (
                                            <div>
                                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>✔ Core Idea</h4>
                                                {data.level_1 && data.level_1.length > 0 ? (
                                                    <ul style={{ paddingLeft: '1.2rem', lineHeight: '1.8' }}>
                                                        {data.level_1.map((pt, i) => (
                                                            <li key={i} style={{ marginBottom: '0.5rem' }}>{pt}</li>
                                                        ))}
                                                    </ul>
                                                ) : <p className="text-muted">No high-level points extracted.</p>}
                                                
                                                {data.mistakes && data.mistakes.length > 0 && (
                                                    <div style={{ marginTop: '1.5rem', background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: '8px' }}>
                                                        <h4 style={{ color: 'var(--danger-color)', marginBottom: '0.5rem' }}>⚠ Common Mistake</h4>
                                                        <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                                            {data.mistakes.map((pt, i) => <li key={i}>{pt}</li>)}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {level === 2 && (
                                            <div>
                                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Detailed Summary</h4>
                                                {data.definitions && data.definitions.length > 0 && (
                                                    <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--surface-color)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                                        {data.definitions.map((df, i) => (
                                                            <p key={i} style={{ marginBottom: '0.5rem' }}>
                                                                <strong style={{ color: subjectColor }}>{df.term}:</strong> {df.meaning}
                                                            </p>
                                                        ))}
                                                    </div>
                                                )}
                                                <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                                                    {renderLevel2(data.level_2)}
                                                </div>
                                            </div>
                                        )}

                                        {level === 3 && (
                                            <div>
                                                <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '1.1rem' }}>Deep Explanations & Full Document</h4>
                                                <div className="markdown-body" style={{ lineHeight: '1.8', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkMath]}
                                                        rehypePlugins={[rehypeKatex]}
                                                        components={{
                                                            p: ({node, ...props}) => <p style={{marginBottom: '1rem'}} {...props} />,
                                                            li: ({node, ...props}) => <li style={{marginBottom: '0.5rem', marginLeft: '1.5rem'}} {...props} />,
                                                            h1: ({node, ...props}) => <h1 style={{marginTop: '2rem', marginBottom: '1rem', color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem'}} {...props} />,
                                                            h2: ({node, ...props}) => <h2 style={{marginTop: '1.8rem', marginBottom: '0.8rem', color: 'var(--text-primary)'}} {...props} />,
                                                            h3: ({node, ...props}) => <h3 style={{marginTop: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-primary)'}} {...props} />,
                                                        }}
                                                    >
                                                        {data.level_3}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SummaryViewer;
