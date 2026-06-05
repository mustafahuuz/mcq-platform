import React from 'react';

const ExamResults = ({ resultData }) => {
    if (!resultData) return <p>Loading results...</p>;

    const { score, total, weaknesses } = resultData;
    const percentage = Math.round((score / total) * 100);

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2.5rem', margin: 0 }}>Exam Complete!</h1>
                <p style={{ fontSize: '1.2rem', color: '#555' }}>
                    You scored <strong>{score}</strong> out of <strong>{total}</strong> ({percentage}%)
                </p>
            </div>

            <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px', borderLeft: '5px solid #ffc107' }}>
                <h2 style={{ marginTop: 0, color: '#856404' }}>Reading Guide & Weakness Analysis</h2>
                {weaknesses && weaknesses.length > 0 ? (
                    <div>
                        <p>Based on your performance, we identified the following areas for improvement:</p>
                        <ul style={{ lineHeight: '1.8' }}>
                            {weaknesses.map((w, idx) => (
                                <li key={idx} style={{ marginBottom: '1rem' }}>
                                    <span style={{ fontWeight: 'bold', color: '#d9534f' }}>{w.topic}</span>
                                    <span style={{ color: '#777', marginLeft: '0.5rem' }}>({w.score_percentage}% correct)</span>
                                    <br />
                                    <em>Guidance: {w.suggestion}</em>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p style={{ color: '#28a745', fontWeight: 'bold' }}>
                        Great job! No significant weaknesses identified. Keep up the good work!
                    </p>
                )}
            </div>
        </div>
    );
};

export default ExamResults;
