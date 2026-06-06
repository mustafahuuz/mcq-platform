import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mcq_backend.settings')
django.setup()

from core.models import User, QuestionBank, Question, Option

def clean_text(text):
    return text.replace('**', '').strip()

def run():
    admin, _ = User.objects.get_or_create(username='admin', defaults={'role': 'Admin'})

    file_path = r'f:\PHD-MSQ\MCQ_System\New_200_MCQs.md'
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_bank = None
    bank_name = "Default"
    
    questions_data = []
    current_q = None
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        # Parse section for subject
        sec_m = re.match(r'^##\s*SECTION\s+[A-Z]\s*[-—]\s*(.*?)(?:\s*\(Questions|\s*$)', line, re.IGNORECASE)
        if sec_m:
            bank_name = sec_m.group(1).strip()
            current_bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin})
            continue
            
        q_start = re.match(r'^\*\*Q\d+\.\*\*\s*(.*)', line, re.IGNORECASE)
        if q_start:
            if current_q:
                questions_data.append(current_q)
            current_q = {
                'bank': current_bank,
                'bank_name': bank_name,
                'content': clean_text(q_start.group(1)),
                'options': {},
                'correct': None,
                'explanation': '',
                'state': 'Q_TEXT'
            }
            continue
            
        if not current_q:
            continue
            
        if current_q['state'] == 'Q_TEXT' or current_q['state'] == 'OPTIONS':
            opt_m = re.match(r'^-\s+([A-D])\)\s*(.*)', line, re.IGNORECASE)
            if opt_m:
                current_q['state'] = 'OPTIONS'
                current_q['options'][opt_m.group(1).upper()] = clean_text(opt_m.group(2))
                continue
                
            ans_m = re.match(r'^\*\*✓\s*Answer:\s*([A-D])\*\*(?:\s*→\s*(.*))?', line, re.IGNORECASE)
            if ans_m:
                current_q['correct'] = ans_m.group(1).upper()
                current_q['state'] = 'EXPLANATION'
                if ans_m.group(2):
                    current_q['explanation'] = clean_text(ans_m.group(2))
                continue
                
            if current_q['state'] == 'Q_TEXT' and not line.startswith('#') and not line.startswith('---'):
                current_q['content'] += " " + clean_text(line)
                
        elif current_q['state'] == 'EXPLANATION':
            if not line.startswith('---') and not re.match(r'^\*\*Q\d+\.\*\*', line):
                current_q['explanation'] += " " + clean_text(line)
                
    if current_q:
        questions_data.append(current_q)
        
    print(f"Parsed {len(questions_data)} questions.")
    
    total = 0
    for q in questions_data:
        if q['content'] and len(q['options']) >= 2 and q['correct']:
            q_obj = Question.objects.create(
                bank=q['bank'], content=q['content'].strip(), difficulty='Medium', tags=q['bank_name']
            )
            for l in ['A', 'B', 'C', 'D']:
                if l in q['options']:
                    is_correct = (l == q['correct'])
                    # Assign the explanation to the correct option, or a general explanation.
                    # Since this format gives one general explanation for the whole question, 
                    # we can put it on the correct option.
                    expl = q['explanation'] if is_correct else ''
                    Option.objects.create(question=q_obj, content=q['options'][l], is_correct=is_correct, explanation=expl)
            total += 1
        else:
            print(f"Failed to save: {q['content'][:50]}... | Options: {len(q['options'])} | Correct: {q['correct']}")

    print(f"Total newly added: {total}")

if __name__ == '__main__':
    run()
