import React from 'react';
import { getSubjectColor } from './utils/colors';

const ExamResults = ({ resultData }) => {
    if (!resultData) return <p>Loading results...</p>;

    const { score, total, weaknesses } = resultData;
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '2.5rem', margin: 0 }}>Exam Complete!</h1>
                <p className="text-muted" style={{ fontSize: '1.2rem' }}>
                    You scored <strong>{score}</strong> out of <strong>{total}</strong> ({percentage}%)
                </p>
            </div>

            <div className="card" style={{ borderLeft: '5px solid var(--secondary-color)' }}>
                <h2 style={{ marginTop: 0, color: 'var(--text-primary)' }}>Reading Guide & Weakness Analysis</h2>
                {weaknesses && weaknesses.length > 0 ? (
                    <div>
                        <p>Based on your performance, we identified the following areas for improvement:</p>
                        <ul style={{ lineHeight: '1.8' }}>
                            {weaknesses.map((w, idx) => (
                                <li key={idx} style={{ marginBottom: '1rem' }}>
                                    <span style={{ fontWeight: 'bold', color: getSubjectColor(w.topic), padding: '2px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)' }}>{w.topic}</span>
                                    <span className="text-muted" style={{ marginLeft: '0.5rem' }}>({w.score_percentage}% correct)</span>
                                    <br />
                                    <em>Guidance: {w.suggestion}</em>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p style={{ color: 'var(--success-color)', fontWeight: 'bold' }}>
                        Great job! No significant weaknesses identified. Keep up the good work!
                    </p>
                )}
            </div>

            {resultData.questions && (
                <div style={{ marginTop: '3rem' }}>
                    <h2 className="mb-4">Detailed Review</h2>
                    {resultData.questions.map((q, idx) => {
                        const userAnswerId = resultData.userAnswers[q.id];
                        const isCorrect = q.options.find(o => o.id === userAnswerId)?.is_correct;

                        return (
                            <div key={q.id} className="card mb-4" style={{ border: '1px solid var(--border-color)', background: 'var(--surface-color)', position: 'relative' }}>
                                <div style={{ position: 'absolute', top: '-12px', right: '20px', background: getSubjectColor(q.tags || 'General'), color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                    {q.tags || 'General'}
                                </div>
                                <h3 className="mb-2" style={{color: 'var(--text-primary)', fontSize: '1.25rem', marginTop: '0.5rem'}}>{idx + 1}. {q.content}</h3>
                                <p style={{ fontWeight: 'bold', color: isCorrect ? 'var(--success-color)' : 'var(--danger-color)', marginBottom: '1rem' }}>
                                    {isCorrect ? 'Correct' : 'Incorrect'}
                                </p>
                                
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {q.options.map(opt => {
                                        let bg = 'rgba(0,0,0,0.2)';
                                        if (opt.is_correct) bg = 'rgba(16, 185, 129, 0.2)';
                                        else if (userAnswerId === opt.id) bg = 'rgba(239, 68, 68, 0.2)';

                                        return (
                                            <div key={opt.id} style={{ padding: '1rem', background: bg, borderRadius: '8px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                    <strong>{opt.content}</strong>
                                                    {userAnswerId === opt.id && <span style={{ fontSize: '0.8rem', background: 'var(--surface-color)', padding: '2px 6px', borderRadius: '4px' }}>Your Answer</span>}
                                                    {opt.is_correct && <span style={{ fontSize: '0.8rem', background: 'var(--success-color)', color: '#fff', padding: '2px 6px', borderRadius: '4px' }}>Correct Answer</span>}
                                                </div>
                                                {opt.explanation && (
                                                    <p className="text-muted" style={{ fontSize: '0.9rem', fontStyle: 'italic', margin: 0 }}>
                                                        Explanation: {opt.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ExamResults;
