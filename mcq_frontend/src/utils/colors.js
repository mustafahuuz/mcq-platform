export const getSubjectColor = (subjectName) => {
    if (!subjectName) return 'var(--primary-color)';
    
    // Hardcode beautiful, highly distinct premium colors for known subjects
    const premiumPalette = {
        'Advances in Deep Learning': 'hsl(340, 82%, 52%)', // Vivid Pink/Red
        'Cryptography and Network Security': 'hsl(260, 80%, 60%)', // Rich Purple
        'Data Mining': 'hsl(20, 95%, 55%)', // Bright Orange (distinct from Cyan)
        'Handbook of Cloud Computing': 'hsl(50, 95%, 50%)', // Vibrant Yellow
        'Internet of Things': 'hsl(140, 80%, 45%)', // Emerald Green
        'Fundamentals of Multimedia': 'hsl(190, 85%, 45%)', // Cyan/Light Blue
    };

    if (premiumPalette[subjectName]) {
        return premiumPalette[subjectName];
    }
    
    // Fallback: better string hashing for unknown subjects using golden ratio
    let hash = 0;
    for (let i = 0; i < subjectName.length; i++) {
        hash = subjectName.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const h = Math.abs(hash * 137.5) % 360;
    const s = 70 + (Math.abs(hash) % 20); 
    const l = 50 + (Math.abs(hash) % 15); 
    
    return `hsl(${h}, ${s}%, ${l}%)`;
};
