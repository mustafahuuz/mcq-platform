import os
import django
import re

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mcq_backend.settings')
django.setup()

from core.models import User, QuestionBank, Question, Option

def run():
    admin, _ = User.objects.get_or_create(username='admin', defaults={'role': 'Admin'})
    Question.objects.all().delete()
    QuestionBank.objects.all().delete()

    with open(r'f:\PHD-MSQ\All_200_MCQs.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()

    current_bank = None
    bank_name = "Default"
    
    q_text = None
    options = {}
    correct = None
    explanations = {}
    
    total = 0
    
    def save_q():
        nonlocal total, q_text, options, correct, explanations, current_bank
        if q_text and len(options) >= 2 and correct:
            if not current_bank:
                current_bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin})
            
            q_obj = Question.objects.create(
                bank=current_bank, content=q_text.strip(), difficulty='Medium', tags=bank_name.replace('MCQ_', '').replace('.md', '')
            )
            for l in ['A', 'B', 'C', 'D']:
                if l in options:
                    Option.objects.create(question=q_obj, content=options[l], is_correct=(l == correct), explanation=explanations.get(l, ''))
            total += 1
            
        q_text = None
        options = {}
        correct = None
        explanations = {}

    state = None
    
    for line in lines:
        line = line.strip()
        if not line: continue
        
        if line.startswith('## Source:'):
            bank_name = line.replace('## Source:', '').strip()
            current_bank = None
            continue
            
        # Match question start
        q_m1 = re.match(r'\*\*(?:Q|Question)\s*\d+[.:]?\s*(.*?)\*\*', line, re.IGNORECASE)
        q_m2 = re.match(r'(?:Q|Question)\s*\d+[.:]?\s*(.*)', line, re.IGNORECASE)
        
        if q_m1 or q_m2:
            save_q()
            text_part = q_m1.group(1).strip() if q_m1 else q_m2.group(1).strip()
            q_text = text_part
            state = 'Q_TEXT_OR_OPTIONS'
            continue
            
        if state == 'Q_TEXT_OR_OPTIONS' or state == 'OPTIONS':
            opt_m = re.match(r'^([A-D])\)\s*(.*)', line, re.IGNORECASE)
            if opt_m:
                state = 'OPTIONS'
                options[opt_m.group(1).upper()] = opt_m.group(2).strip()
                continue
            
            corr_m = re.search(r'Correct Answer:\**\s*\*?\s*([A-D])', line, re.IGNORECASE)
            if corr_m:
                correct = corr_m.group(1).upper()
                state = 'EXPLANATIONS'
                continue
                
            if state == 'Q_TEXT_OR_OPTIONS' and not line.startswith('**Explanations'):
                q_text += (" " if q_text else "") + line.replace('**', '')
                continue
                
        if state == 'EXPLANATIONS':
            exp_m = re.search(r'\*?\s*\*\*([A-D])\)\s*(?:True|False|is correct|is incorrect)[^A-Za-z0-9]*(.*)', line, re.IGNORECASE)
            if exp_m:
                explanations[exp_m.group(1).upper()] = exp_m.group(2).strip()
                continue
                
            exp_m2 = re.search(r'-\s*\**([A-D])\**\s+is\s+(?:correct|incorrect):\s*(.*)', line, re.IGNORECASE)
            if exp_m2:
                explanations[exp_m2.group(1).upper()] = exp_m2.group(2).strip()
                continue
                
            # If it's just a continued explanation from the previous bullet point
            if not line.startswith('**') and len(explanations) > 0 and not re.match(r'^([A-D])\)', line):
                last_key = list(explanations.keys())[-1]
                explanations[last_key] += " " + line

    save_q() # flush last
    print(f"Total newly added: {total}")

if __name__ == '__main__':
    run()
