import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mcq_backend.settings')
django.setup()

from core.models import User, QuestionBank, Question, Option

def clean_text(text):
    return text.replace('**', '').strip()

SUBJECT_MAP = {
    'MCQ_Advances_in_Deep_Learning.md': 'Advances in Deep Learning',
    'MCQ_Cloud_Computing.md': 'Handbook of Cloud Computing',
    'MCQ_Cryptography.md': 'Cryptography and Network Security',
    'MCQ_Data_Mining.md': 'Data Mining',
    'MCQ_IoT.md': 'Internet of Things',
    'MCQ_Multimedia.md': 'Fundamentals of Multimedia'
}

def run():
    admin, _ = User.objects.get_or_create(username='admin', defaults={'role': 'Admin'})
    
    # DO NOT DELETE EXISTING QUESTIONS OR BANKS

    with open(r'f:\PHD-MSQ\All_200_MCQs.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_bank = None
    bank_name = "Default"
    
    questions_data = []
    current_q = None
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        if line.startswith('## Source:'):
            raw_bank_name = line.replace('## Source:', '').strip()
            bank_name = SUBJECT_MAP.get(raw_bank_name, raw_bank_name)
            current_bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin})
            continue
            
        q_start = re.match(r'^(?:\*\*|##)?\s*(?:Q|Question)\s*\d+[.:]?\s*(.*)', line, re.IGNORECASE)
        if q_start:
            if current_q:
                questions_data.append(current_q)
            current_q = {
                'bank': current_bank,
                'bank_name': bank_name,
                'content': clean_text(q_start.group(1)),
                'options': {},
                'correct': None,
                'explanations': {},
                'state': 'Q_TEXT'
            }
            continue
            
        if not current_q:
            continue
            
        if current_q['state'] == 'Q_TEXT' or current_q['state'] == 'OPTIONS':
            opt_m = re.match(r'^(?:\*\*\s*)?([A-D])(?:\)|\.)\s*(.*)', line, re.IGNORECASE)
            if opt_m:
                current_q['state'] = 'OPTIONS'
                current_q['options'][opt_m.group(1).upper()] = clean_text(opt_m.group(2))
                continue
                
            corr_m = re.search(r'Correct Answer:\**\s*\*?\s*([A-D])', line, re.IGNORECASE)
            if corr_m:
                current_q['correct'] = corr_m.group(1).upper()
                current_q['state'] = 'EXPLANATIONS'
                continue
                
            if re.match(r'^(?:\*\*|)Explanations', line, re.IGNORECASE):
                current_q['state'] = 'EXPLANATIONS'
                continue
                
            if current_q['state'] == 'Q_TEXT' and not line.startswith('#'):
                current_q['content'] += " " + clean_text(line)
                
        elif current_q['state'] == 'EXPLANATIONS':
            exp_m = re.search(r'^[*-]?\s*\**([A-D])\s*(?:\)|\**\s*is)\s*\**\s*(True|False|correct|incorrect|Correct)\b[^a-zA-Z0-9]*(.*)', line, re.IGNORECASE)
            if exp_m:
                current_q['explanations'][exp_m.group(1).upper()] = clean_text(exp_m.group(3))
                if not current_q['correct']:
                    if re.search(r'\b(?:True|correct)\b', exp_m.group(2), re.IGNORECASE):
                        current_q['correct'] = exp_m.group(1).upper()
            else:
                if len(current_q['explanations']) > 0 and not re.match(r'^(?:\*\*|##)?\s*(?:Q|Question)\s*\d+', line, re.IGNORECASE):
                    last_key = list(current_q['explanations'].keys())[-1]
                    current_q['explanations'][last_key] += " " + clean_text(line)
                    
    if current_q:
        questions_data.append(current_q)
        
    print(f"Parsed {len(questions_data)} questions from All_200_MCQs.md.")
    
    total = 0
    for q in questions_data:
        if q['content'] and len(q['options']) >= 2 and q['correct']:
            q_obj = Question.objects.create(
                bank=q['bank'], content=q['content'].strip(), difficulty='Medium', tags=q['bank_name']
            )
            for l in ['A', 'B', 'C', 'D']:
                if l in q['options']:
                    Option.objects.create(question=q_obj, content=q['options'][l], is_correct=(l == q['correct']), explanation=q['explanations'].get(l, ''))
            total += 1
        else:
            print(f"Failed to save: {q['content'][:50]}... | Options: {len(q['options'])} | Correct: {q['correct']}")

    print(f"Total old questions successfully re-added: {total}")

if __name__ == '__main__':
    run()
