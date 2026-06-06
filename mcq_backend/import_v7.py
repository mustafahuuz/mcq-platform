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
    Question.objects.all().delete()
    QuestionBank.objects.all().delete()

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
            bank_name = line.replace('## Source:', '').strip()
            current_bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin})
            continue
            
        # Check if line is start of a question
        # It must start with **Q1. or **Question 1: or ## Question 1:
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
            opt_m = re.match(r'^(?:\*\*\s*)?([A-D])\)\s*(.*)', line, re.IGNORECASE)
            if opt_m:
                current_q['state'] = 'OPTIONS'
                current_q['options'][opt_m.group(1).upper()] = clean_text(opt_m.group(2))
                continue
                
            corr_m = re.search(r'Correct Answer:\s*\**([A-D])\**', line, re.IGNORECASE)
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
            exp_m = re.search(r'(?:\*|-)?\s*\**([A-D])\s*(?:\)|\**\s*is)\s*(?:True|False|correct|incorrect|Correct)[^A-Za-z0-9]*(.*)', line, re.IGNORECASE)
            if exp_m:
                current_q['explanations'][exp_m.group(1).upper()] = clean_text(exp_m.group(2))
                
                # If we don't have a correct answer yet, we can infer it from the explanation text saying 'True' or 'correct'
                if not current_q['correct']:
                    if re.search(r'\b(?:True|correct)\b', line, re.IGNORECASE) and not re.search(r'\b(?:False|incorrect)\b', line, re.IGNORECASE):
                        current_q['correct'] = exp_m.group(1).upper()
            else:
                # Add to last explanation
                if len(current_q['explanations']) > 0 and not re.match(r'^(?:\*\*|##)?\s*(?:Q|Question)\s*\d+', line, re.IGNORECASE):
                    last_key = list(current_q['explanations'].keys())[-1]
                    current_q['explanations'][last_key] += " " + clean_text(line)
                    
    if current_q:
        questions_data.append(current_q)
        
    print(f"Parsed {len(questions_data)} questions.")
    
    total = 0
    for q in questions_data:
        if q['content'] and len(q['options']) >= 2 and q['correct']:
            q_obj = Question.objects.create(
                bank=q['bank'], content=q['content'], difficulty='Medium', tags=q['bank_name'].replace('MCQ_', '').replace('.md', '')
            )
            for l in ['A', 'B', 'C', 'D']:
                if l in q['options']:
                    Option.objects.create(question=q_obj, content=q['options'][l], is_correct=(l == q['correct']), explanation=q['explanations'].get(l, ''))
            total += 1
        else:
            print(f"Failed to save: {q['content'][:50]}... | Options: {len(q['options'])} | Correct: {q['correct']}")

    print(f"Total newly added: {total}")

if __name__ == '__main__':
    run()
