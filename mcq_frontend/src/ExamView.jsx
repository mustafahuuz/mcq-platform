import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ExamResults from './ExamResults';
import { getSubjectColor } from './utils/colors';

const ExamView = () => {
    const location = useLocation();
    const [allQuestions, setAllQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('scroll'); // 'scroll' or 'focus'
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    
    const [availableSubjects, setAvailableSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    useEffect(() => {
        // Fetch questions from the backend
        axios.get('/api/questions/')
            .then(res => {
                let allQ = res.data.map(q => {
                    const opts = [...(q.options || [])];
                    
                    // Separate out "All of the above" or "None of the above" to keep them at the bottom
                    const regularOpts = opts.filter(o => !o.content.toLowerCase().includes('of the above'));
                    const specialOpts = opts.filter(o => o.content.toLowerCase().includes('of the above'));
                    
                    return {
                        ...q,
                        options: [...regularOpts.sort(() => 0.5 - Math.random()), ...specialOpts]
                    };
                });
                const shuffled = allQ.sort(() => 0.5 - Math.random());
                setAllQuestions(shuffled);
                
                const subjects = [...new Set(allQ.map(q => q.subject).filter(Boolean))];
                setAvailableSubjects(subjects);
                
                // If a subject is specified in the URL query, pre-select it
                const queryParams = new URLSearchParams(location.search);
                const targetSubject = queryParams.get('subject');
                
                if (targetSubject && subjects.includes(targetSubject)) {
                    setSelectedSubjects([targetSubject]);
                } else {
                    setSelectedSubjects(subjects);
                }

                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch questions", err);
                setLoading(false);
            });
    }, [location.search]);

    const toggleSubject = (subject) => {
        setSelectedSubjects(prev => 
            prev.includes(subject) 
                ? prev.filter(s => s !== subject)
                : [...prev, subject]
        );
    };

    const filteredQuestions = selectedSubjects.length === availableSubjects.length
        ? allQuestions 
        : allQuestions.filter(q => selectedSubjects.includes(q.subject));

    // Reset currentIdx when subjects change to avoid going out of bounds
    useEffect(() => {
        setCurrentIdx(0);
    }, [selectedSubjects]);

    const handleSelect = (qId, optionId) => {
        setAnswers(prev => ({ ...prev, [qId]: optionId }));
    };

    const handleSubmit = async () => {
        let correctCount = 0;
        let tagStats = {};

        filteredQuestions.forEach(q => {
            const selectedOptId = answers[q.id];
            const selectedOpt = q.options?.find(o => o.id === selectedOptId);
            const isCorrect = selectedOpt ? selectedOpt.is_correct : false;

            if (isCorrect) correctCount++;

            const tags = q.tags ? q.tags.split(',') : ['Uncategorized'];
            tags.forEach(t => {
                const tag = t.trim();
                if (!tagStats[tag]) tagStats[tag] = { total: 0, correct: 0 };
                tagStats[tag].total += 1;
                if (isCorrect) tagStats[tag].correct += 1;
            });
        });

        const weaknesses = [];
        for (const [tag, stats] of Object.entries(tagStats)) {
            const successRate = (stats.correct / stats.total) * 100;
            if (successRate < 60) {
                weaknesses.push({
                    topic: tag,
                    score_percentage: Math.round(successRate),
                    suggestion: `Review study materials related to ${tag}.`
                });
            }
        }

        setResults({
            score: correctCount,
            total: filteredQuestions.length,
            weaknesses: weaknesses,
            questions: filteredQuestions,
            userAnswers: answers
        });
        setSubmitted(true);
    };

    if (loading) return <div className="container"><p>Loading Practice Exam...</p></div>;
    if (submitted) return <ExamResults resultData={results} />;

    const renderQuestion = (q, idx, fillHeight = false) => {
        const hasAnswered = !!answers[q.id];
        
        return (
        <div key={q.id} className="card mb-4" style={{ border: '1px solid var(--border-color)', background: 'var(--surface-color)', position: 'relative', height: fillHeight ? '100%' : 'auto', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ background: getSubjectColor(q.subject || 'General'), color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'inline-block' }}>
                    {q.subject || 'General'}
                </div>
                {q.tags && q.tags !== q.subject && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right', flex: 1, marginLeft: '1rem' }}>{q.tags}</div>}
            </div>
            <h3 className="mb-2" style={{color: 'var(--text-primary)', fontSize: '1.25rem', marginTop: '0.5rem'}}>{idx + 1}. {q.content}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginTop: '1.5rem', flex: 1, alignContent: 'start' }}>
                {q.options?.map(opt => {
                    const isSelected = answers[q.id] === opt.id;
                    
                    let bg = 'rgba(0,0,0,0.2)';
                    let border = '1px solid transparent';
                    
                    if (hasAnswered) {
                        if (opt.is_correct) {
                            bg = 'rgba(16, 185, 129, 0.2)'; // Green
                            border = '2px solid var(--success-color)';
                        } else if (isSelected) {
                            bg = 'rgba(239, 68, 68, 0.2)'; // Red
                            border = '2px solid var(--danger-color)';
                        }
                    } else if (isSelected) {
                        border = '2px solid var(--primary-color)';
                    }

                    return (
                    <div key={opt.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '1.25rem', background: bg, borderRadius: '8px', cursor: hasAnswered ? 'default' : 'pointer', border: border, transition: 'all 0.2s', boxShadow: !hasAnswered && !isSelected ? '0 2px 4px rgba(0,0,0,0.1)' : 'none' }} onClick={() => !hasAnswered && handleSelect(q.id, opt.id)}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <input 
                                type="radio" 
                                name={`q_${q.id}`} 
                                checked={isSelected}
                                onChange={() => !hasAnswered && handleSelect(q.id, opt.id)}
                                disabled={hasAnswered}
                                style={{ accentColor: 'var(--primary-color)', width: '1.2rem', height: '1.2rem', marginTop: '0.1rem', cursor: 'pointer' }}
                            /> 
                            <span style={{ fontWeight: hasAnswered && opt.is_correct ? 'bold' : 'normal', lineHeight: '1.4' }}>{opt.content}</span>
                        </div>
                        {hasAnswered && opt.explanation && (
                            <div style={{ paddingLeft: '2.2rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                                {opt.explanation}
                            </div>
                        )}
                    </div>
                )})}
            </div>
        </div>
    )};

    return (
        <div className="container" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '1.8rem', margin: 0, flex: 1, minWidth: '250px' }}>Advanced Practice Exam <span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>({filteredQuestions.length} Qs)</span></h1>
                
                {/* Subject Chips Filter */}
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ color: 'var(--text-secondary)', fontWeight: 'bold', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Filter Subjects</label>
                        <button 
                            onClick={() => setSelectedSubjects(selectedSubjects.length === availableSubjects.length ? [] : availableSubjects)}
                            style={{ background: 'transparent', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' }}
                        >
                            {selectedSubjects.length === availableSubjects.length ? 'Deselect All' : 'Select All'}
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {availableSubjects.map(subject => {
                            const isSelected = selectedSubjects.includes(subject);
                            return (
                                <div 
                                    key={subject}
                                    onClick={() => toggleSubject(subject)}
                                    style={{ 
                                        padding: '0.4rem 1rem', 
                                        borderRadius: '20px', 
                                        border: `1px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`, 
                                        background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--surface-color)', 
                                        color: isSelected ? 'var(--primary-color)' : 'var(--text-secondary)', 
                                        cursor: 'pointer', 
                                        fontSize: '0.85rem',
                                        fontWeight: isSelected ? 'bold' : 'normal',
                                        transition: 'all 0.2s ease',
                                        userSelect: 'none',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.4rem'
                                    }}
                                >
                                    {isSelected && <span style={{ fontSize: '0.7rem' }}>✓</span>}
                                    {subject}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <p className="text-muted mb-0">Time Remaining: <strong style={{color: 'var(--danger-color)'}}>45:00</strong></p>
                
                <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--surface-color)', padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                    <button 
                        onClick={() => setViewMode('scroll')}
                        style={{ padding: '0.5rem 1rem', background: viewMode === 'scroll' ? 'var(--primary-color)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Scroll Mode
                    </button>
                    <button 
                        onClick={() => setViewMode('focus')}
                        style={{ padding: '0.5rem 1rem', background: viewMode === 'focus' ? 'var(--primary-color)' : 'transparent', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                        Focus Mode
                    </button>
                </div>
            </div>

            {filteredQuestions.length === 0 ? (
                <div className="card">
                    <p>No questions available in the database yet! Please use the Instructor Portal to import questions via Excel.</p>
                </div>
            ) : viewMode === 'scroll' ? (
                filteredQuestions.map((q, idx) => renderQuestion(q, idx))
            ) : (
                <div style={isFullscreen ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'var(--bg-color)', zIndex: 9999, padding: '2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' } : {}}>
                    <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', minHeight: isFullscreen ? '80vh' : 'auto' }}>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
                            <button onClick={() => setIsFullscreen(!isFullscreen)} className="btn" style={{ background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.9rem' }}>
                                {isFullscreen ? 'Exit Full Screen' : 'Enter Full Screen'}
                            </button>
                        </div>

                        <div style={{ flex: 1 }}>
                            {renderQuestion(filteredQuestions[currentIdx], currentIdx, isFullscreen)}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingBottom: isFullscreen ? '2rem' : '0' }}>
                            <button className="btn" style={{ background: 'var(--border-color)', color: '#fff' }} onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))} disabled={currentIdx === 0}>Previous</button>
                            <span className="text-muted" style={{ alignSelf: 'center' }}>Question {currentIdx + 1} of {filteredQuestions.length}</span>
                            <button className="btn" style={{ background: 'var(--border-color)', color: '#fff' }} onClick={() => setCurrentIdx(prev => Math.min(filteredQuestions.length - 1, prev + 1))} disabled={currentIdx === filteredQuestions.length - 1}>Next</button>
                        </div>
                    </div>
                </div>
            )}

            {filteredQuestions.length > 0 && !isFullscreen && (
                <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '2rem' }} onClick={handleSubmit}>
                    Submit Exam & Analyze Weaknesses
                </button>
            )}
        </div>
    );
};

export default ExamView;
