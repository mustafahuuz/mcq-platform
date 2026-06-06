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
        content = f.read()

    # Split by bank
    banks = re.split(r'## Source:', content)[1:]
    
    total = 0
    for bank_text in banks:
        lines = bank_text.strip().split('\n')
        bank_name = lines[0].strip()
        current_bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin})
        
        # Split by **Correct Answer**
        q_blocks = re.split(r'\*\*Correct Answer[^*]*\*\*', bank_text, flags=re.IGNORECASE)
        
        for i in range(len(q_blocks)-1):
            # q_blocks[i] contains the question and options
            # q_blocks[i+1] contains the correct letter (at the very beginning) and explanations
            
            part1 = q_blocks[i].strip()
            part2 = q_blocks[i+1].strip()
            
            # Extract options from part1 (A), B), C), D))
            # Options are usually at the end of part1
            # Let's find A) ... B) ... C) ... D) ...
            options_match = list(re.finditer(r'^([A-D])\)\s*(.*)', part1, re.MULTILINE | re.IGNORECASE))
            
            if len(options_match) < 2:
                # Sometimes options are bolded: **A)**
                options_match = list(re.finditer(r'^\*\*\s*([A-D])\)\s*\*\*\s*(.*)', part1, re.MULTILINE | re.IGNORECASE))
                if len(options_match) < 2:
                    continue
            
            options_dict = {}
            for match in options_match:
                options_dict[match.group(1).upper()] = match.group(2).strip().replace('**', '')
            
            # The text before the first option is the question
            first_opt_idx = options_match[0].start()
            q_text_raw = part1[:first_opt_idx].strip()
            
            # Clean up q_text_raw (remove Q1., Question 1:, **, etc)
            q_text_raw = re.sub(r'^\*\*\s*(?:Q|Question)\s*\d+[.:]?\s*\**\s*', '', q_text_raw, flags=re.IGNORECASE | re.MULTILINE)
            q_text_raw = re.sub(r'^(?:Q|Question)\s*\d+[.:]?\s*', '', q_text_raw, flags=re.IGNORECASE | re.MULTILINE)
            q_text_raw = q_text_raw.replace('**', '').strip()
            
            # If q_text_raw is empty, maybe it's just multiline, try to just use it
            if not q_text_raw:
                continue
                
            # Extract correct letter from the beginning of part2
            corr_match = re.match(r'^[^A-D]*([A-D])', part2, re.IGNORECASE)
            if not corr_match:
                continue
            correct_letter = corr_match.group(1).upper()
            
            # Extract explanations from part2
            explanations_dict = {}
            for l in ['A', 'B', 'C', 'D']:
                # match * **A) False.** text
                # or - A is incorrect: text
                exp_pattern = r'(?:\*|-)\s*\**' + l + r'(?:\)|\**\s+is)\s*(?:True|False|correct|incorrect)[^A-Za-z0-9]*(.*?)(?=\n(?:\*|-)\s*\**[A-D]|\Z)'
                exp_m = re.search(exp_pattern, part2, re.IGNORECASE | re.DOTALL)
                if exp_m:
                    explanations_dict[l] = exp_m.group(1).replace('**', '').strip()
                else:
                    # try a simpler fallback
                    exp_m2 = re.search(r'\b' + l + r'\)[^A-Za-z0-9]*(?:True|False)[^A-Za-z0-9]*(.*?)(?=\n[A-D]\)|\Z)', part2, re.IGNORECASE | re.DOTALL)
                    if exp_m2:
                        explanations_dict[l] = exp_m2.group(1).replace('**', '').strip()
            
            # Create object
            q_obj = Question.objects.create(
                bank=current_bank, content=q_text_raw, difficulty='Medium', tags=bank_name.replace('MCQ_', '').replace('.md', '')
            )
            for l in ['A', 'B', 'C', 'D']:
                if l in options_dict:
                    Option.objects.create(question=q_obj, content=options_dict[l], is_correct=(l == correct_letter), explanation=explanations_dict.get(l, ''))
            
            total += 1

    print(f"Total newly added: {total}")

if __name__ == '__main__':
    run()
