import React, { useState } from 'react';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import axios from 'axios';

const QuestionBankManager = () => {
    const [status, setStatus] = useState('');

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
        // In a real app, send `questions` to Django API bulk import endpoint.
        try {
            // await axios.post('/api/question-banks/bulk_import/', { questions });
            setStatus('Import successful! (Mocked endpoint for now)');
        } catch (error) {
            setStatus('Import failed. Please check network logs.');
        }
    };

    return (
        <div style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '2rem auto' }}>
            <h2>Question Bank Manager</h2>
            <p style={{ color: 'gray' }}>Use Excel to bulk upload questions.</p>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button 
                    onClick={handleExportTemplate}
                    style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '4px' }}
                >
                    Download Template
                </button>
                
                <label style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#28A745', color: '#fff', border: 'none', borderRadius: '4px' }}>
                    Upload Excel
                    <input type="file" accept=".xlsx" onChange={handleImport} style={{ display: 'none' }} />
                </label>
            </div>
            {status && <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{status}</p>}
        </div>
    );
};

export default QuestionBankManager;
