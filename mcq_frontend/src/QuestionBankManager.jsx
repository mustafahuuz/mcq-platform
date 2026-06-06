import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import axios from 'axios';

const QuestionBankManager = () => {
    const [status, setStatus] = useState('');
    const [stats, setStats] = useState({ totalQ: 0, totalBanks: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('/api/question-banks/');
                const banks = res.data;
                const totalQ = banks.reduce((sum, b) => sum + (b.questions ? b.questions.length : 0), 0);
                setStats({ totalQ, totalBanks: banks.length });
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        };
        fetchStats();
    }, []);

    const handleExportTemplate = async () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('MCQ_Template');

        sheet.columns = [
            { header: 'Subject', key: 'subject', width: 20 },
            { header: 'Tags', key: 'tags', width: 20 },
            { header: 'Difficulty', key: 'difficulty', width: 15 },
            { header: 'Question Content', key: 'content', width: 40 },
            { header: 'Option 1', key: 'opt1', width: 30 },
            { header: 'IsCorrect 1', key: 'isCorr1', width: 12 },
            { header: 'Explanation 1', key: 'exp1', width: 30 },
            { header: 'Option 2', key: 'opt2', width: 30 },
            { header: 'IsCorrect 2', key: 'isCorr2', width: 12 },
            { header: 'Explanation 2', key: 'exp2', width: 30 },
            { header: 'Option 3', key: 'opt3', width: 30 },
            { header: 'IsCorrect 3', key: 'isCorr3', width: 12 },
            { header: 'Explanation 3', key: 'exp3', width: 30 },
            { header: 'Option 4', key: 'opt4', width: 30 },
            { header: 'IsCorrect 4', key: 'isCorr4', width: 12 },
            { header: 'Explanation 4', key: 'exp4', width: 30 },
        ];

        sheet.addRow({
            subject: 'Deep Learning',
            tags: 'Backpropagation',
            difficulty: 'Medium',
            content: 'What is the purpose of backpropagation?',
            opt1: 'To initialize weights', isCorr1: 'FALSE', exp1: 'Weights are initialized randomly.',
            opt2: 'To minimize loss', isCorr2: 'TRUE', exp2: 'It calculates gradients to minimize loss.',
            opt3: 'To reduce dimensions', isCorr3: 'FALSE', exp3: 'PCA is used for dimensionality reduction.',
            opt4: 'To clean data', isCorr4: 'FALSE', exp4: 'Data cleaning is preprocessing.'
        });

        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), 'MCQ_Template.xlsx');
    };

    const handleExportCurrent = async () => {
        setStatus('Fetching current questions...');
        try {
            const res = await axios.get('/api/question-banks/');
            const banks = res.data;
            
            const workbook = new ExcelJS.Workbook();
            const sheet = workbook.addWorksheet('Current_MCQs');

            sheet.columns = [
                { header: 'Subject', key: 'subject', width: 20 },
                { header: 'Tags', key: 'tags', width: 20 },
                { header: 'Difficulty', key: 'difficulty', width: 15 },
                { header: 'Question Content', key: 'content', width: 40 },
                { header: 'Option 1', key: 'opt1', width: 30 },
                { header: 'IsCorrect 1', key: 'isCorr1', width: 12 },
                { header: 'Explanation 1', key: 'exp1', width: 30 },
                { header: 'Option 2', key: 'opt2', width: 30 },
                { header: 'IsCorrect 2', key: 'isCorr2', width: 12 },
                { header: 'Explanation 2', key: 'exp2', width: 30 },
                { header: 'Option 3', key: 'opt3', width: 30 },
                { header: 'IsCorrect 3', key: 'isCorr3', width: 12 },
                { header: 'Explanation 3', key: 'exp3', width: 30 },
                { header: 'Option 4', key: 'opt4', width: 30 },
                { header: 'IsCorrect 4', key: 'isCorr4', width: 12 },
                { header: 'Explanation 4', key: 'exp4', width: 30 },
            ];

            let count = 0;
            banks.forEach(bank => {
                const subject = bank.subject;
                bank.questions.forEach(q => {
                    const row = {
                        subject: subject,
                        tags: q.tags,
                        difficulty: q.difficulty,
                        content: q.content,
                    };
                    
                    q.options.forEach((opt, idx) => {
                        if (idx < 4) {
                            row[`opt${idx + 1}`] = opt.content;
                            row[`isCorr${idx + 1}`] = opt.is_correct ? 'TRUE' : 'FALSE';
                            row[`exp${idx + 1}`] = opt.explanation || '';
                        }
                    });
                    
                    sheet.addRow(row);
                    count++;
                });
            });

            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'Current_MCQs.xlsx');
            setStatus(`Successfully exported ${count} questions.`);
        } catch (error) {
            console.error(error);
            setStatus('Export failed. Please check network logs.');
        }
    };

    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setStatus('Parsing Excel file...');
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(file);
        const sheet = workbook.getWorksheet(1);
        
        let questions = [];
        sheet.eachRow((row, rowNumber) => {
            if (rowNumber === 1) return; // Skip header

            const vals = row.values;
            const isCorr = (val) => String(val).toUpperCase() === 'TRUE';

            questions.push({
                subject: vals[1],
                tags: vals[2],
                difficulty: vals[3],
                content: vals[4],
                options: [
                    { content: vals[5], is_correct: isCorr(vals[6]), explanation: vals[7] },
                    { content: vals[8], is_correct: isCorr(vals[9]), explanation: vals[10] },
                    { content: vals[11], is_correct: isCorr(vals[12]), explanation: vals[13] },
                    { content: vals[14], is_correct: isCorr(vals[15]), explanation: vals[16] },
                ]
            });
        });

        setStatus(`Found ${questions.length} questions. Uploading to server...`);
        try {
            const res = await axios.post('/api/question-banks/bulk_import/', { questions });
            setStatus(`Import successful! Added ${res.data.imported_count} questions.`);
        } catch (error) {
            console.error(error);
            setStatus('Import failed. Please check network logs.');
        }
    };

    return (
        <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.2rem' }}>Question Bank Manager</h2>
                    <p className="text-muted" style={{ fontSize: '0.9rem' }}>Use Excel to bulk upload and manage questions.</p>
                </div>
                
                {/* Mini Dashboard */}
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Subjects</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>{stats.totalBanks}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Questions</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--success-color)' }}>{stats.totalQ}</div>
                    </div>
                </div>
            </div>
            
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center' }}>
                <button 
                    onClick={handleExportTemplate}
                    className="btn btn-primary"
                    style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                >
                    Download Template
                </button>

                <button 
                    onClick={handleExportCurrent}
                    className="btn btn-info"
                    style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}
                >
                    Export Current
                </button>
                
                <label className="btn btn-success" style={{ cursor: 'pointer', padding: '0.4rem 1rem', fontSize: '0.9rem', margin: 0 }}>
                    Upload Excel
                    <input type="file" accept=".xlsx" onChange={handleImport} style={{ display: 'none' }} />
                </label>
            </div>
            {status && <p style={{ marginTop: '1.5rem', fontWeight: 'bold', textAlign: 'center', color: 'var(--text-secondary)' }}>{status}</p>}
        </div>
    );
};

export default QuestionBankManager;
