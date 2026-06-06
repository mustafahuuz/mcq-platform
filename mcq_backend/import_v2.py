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
    
    with open(r'f:\PHD-MSQ\All_200_MCQs.md', 'r', encoding='utf-8') as f:
        content = f.read()

    blocks = re.split(r'## Source: ', content)[1:]
    
    added = 0
    for block in blocks:
        bank_name = block.split('\n')[0].strip()
        bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin})
        
        # Every question has an exact `**Correct Answer: X**`
        # We can split the block by `**Correct Answer:`
        parts = re.split(r'\*\*Correct Answer:\s*([A-D])\*\*', block, flags=re.IGNORECASE)
        # parts[0] is the intro and first question text + options
        # parts[1] is the correct letter for Q1
        # parts[2] is the explanations for Q1 + Q2 text + options
        
        for i in range(1, len(parts), 2):
            correct_letter = parts[i].upper()
            
            # The text preceding this correct answer contains the question and options
            preceding = parts[i-1]
            
            # Find the question and options from preceding text.
            # Look backwards from the end of preceding text to find A), B), C), D)
            options_dict = {}
            for letter in ['D', 'C', 'B', 'A']:
                # find the last occurrence of {letter}) 
                match = re.search(r'\n([* ]*)'+letter+r'\)\s*(.*)(?=\Z|\n)', preceding, re.IGNORECASE)
                if match:
                    options_dict[letter] = match.group(2).strip()
                    # Truncate preceding so we don't accidentally match the question text
                    preceding = preceding[:match.start()]
            
            # After removing options, what's left at the end of preceding is the question text
            # Usually starts with `**Q` or `**Question`
            q_match = re.search(r'\*\*(?:Q|Question)\s*\d+[^A-Za-z0-9]*(.*?)\*\*', preceding, flags=re.IGNORECASE|re.DOTALL)
            if q_match:
                q_text = clean_text(q_match.group(1))
            else:
                # fallback
                q_text = clean_text(preceding.split('\n')[-2]) if len(preceding.split('\n'))>1 else "Unknown Question"
                
            # The explanations are at the beginning of parts[i+1]
            # They usually start with `**Explanations:**` and end before the next `**Q...`
            succeeding = parts[i+1] if (i+1) < len(parts) else ""
            exp_dict = {}
            for letter in ['A', 'B', 'C', 'D']:
                exp_m = re.search(r'\*?\s*\*\*' + letter + r'\)\s*(True|False|is correct|is incorrect)[^A-Za-z0-9]*(.*?)(?=\n\*?\s*\*\*|$)', succeeding, re.IGNORECASE|re.DOTALL)
                if exp_m:
                    exp_dict[letter] = clean_text(exp_m.group(2))
                else:
                    # Alternative format
                    exp_m2 = re.search(r'-\s*\**' + letter + r'\**\s+is\s+(?:correct|incorrect):\s*(.*?)(?=\n|$)', succeeding, re.IGNORECASE)
                    if exp_m2:
                        exp_dict[letter] = clean_text(exp_m2.group(1))
            
            if q_text and options_dict:
                q_obj = Question.objects.create(
                    bank=bank,
                    content=q_text,
                    difficulty='Medium',
                    tags=bank_name.replace('MCQ_', '').replace('.md', '')
                )
                for letter in ['A', 'B', 'C', 'D']:
                    if letter in options_dict:
                        Option.objects.create(
                            question=q_obj,
                            content=options_dict[letter],
                            is_correct=(letter == correct_letter),
                            explanation=exp_dict.get(letter, '')
                        )
                added += 1

    print(f"Total newly added: {added}")

if __name__ == '__main__':
    run()
