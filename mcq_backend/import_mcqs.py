import os
import django
import re

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mcq_backend.settings')
django.setup()

from core.models import QuestionBank, Question, Option

def import_mcqs(filepath):
    print(f"Reading {filepath}...")
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into different sources/banks based on "## Source:"
    sources = re.split(r'## Source: ', content)[1:]
    
    total_imported = 0

    for source_block in sources:
        lines = source_block.strip().split('\n')
        bank_name = lines[0].strip()
        print(f"Processing Bank: {bank_name}")
        
        from core.models import User
        admin_user, _ = User.objects.get_or_create(username='admin', defaults={'role': 'Admin'})
        
        bank, created = QuestionBank.objects.get_or_create(
            subject=bank_name,
            defaults={'created_by': admin_user}
        )

        # Split into individual questions. A question usually starts with something like Q1 or Question 1
        # Let's use a regex to find all chunks starting with **Q or **Question
        pattern = re.compile(r'\*\*(?:Q|Question)\s*\d+[^A-Za-z0-9]*(.*?)\*\*', re.IGNORECASE)
        
        # Actually, let's split the source block by "Correct Answer:" or "**Correct Answer:**"
        # Since we know each question has exactly one correct answer block.
        # But wait, it's easier to iterate through lines and maintain state.
        
        current_question = None
        current_options = {}
        current_correct = None
        current_explanations = {}
        
        lines = source_block.split('\n')
        state = 'SEARCHING' # SEARCHING, OPTIONS, EXPLANATIONS
        
        for line in lines:
            line = line.strip()
            if not line: continue
            
            # Start of a question
            q_match = re.match(r'\*\*(?:Q|Question)\s*\d+[^A-Za-z0-9]*(.*?)\*\*', line, re.IGNORECASE)
            if not q_match:
                # Some formatting might just be "Question 1: text"
                q_match = re.match(r'(?:Q|Question)\s*\d+[^A-Za-z0-9]*(.*)', line, re.IGNORECASE)
            
            if q_match and not line.startswith('A)') and not line.startswith('*'):
                if current_question and current_correct:
                    # Save previous question
                    save_question(bank, current_question, current_options, current_correct, current_explanations, bank_name)
                    total_imported += 1
                
                # Clean up the text
                current_question = q_match.group(1).replace('**', '').strip()
                if not current_question:
                    # The text might be on the next line
                    current_question = line.replace('**', '')
                current_options = {}
                current_correct = None
                current_explanations = {}
                state = 'OPTIONS'
                continue
                
            if state == 'OPTIONS':
                opt_match = re.match(r'^([A-D])\)\s*(.*)', line, re.IGNORECASE)
                if opt_match:
                    current_options[opt_match.group(1).upper()] = opt_match.group(2).strip()
                    continue
                
                corr_match = re.search(r'Correct Answer:\s*\**([A-D])\**', line, re.IGNORECASE)
                if corr_match:
                    current_correct = corr_match.group(1).upper()
                    state = 'EXPLANATIONS'
                    continue
            
            if state == 'EXPLANATIONS':
                # look for "* A) True. text" or "- A is correct: text"
                exp_match = re.search(r'([A-D])\)[^A-Za-z0-9]*(True|False|is correct|is incorrect)[^A-Za-z0-9]*(.*)', line, re.IGNORECASE)
                if exp_match:
                    letter = exp_match.group(1).upper()
                    exp_text = exp_match.group(3).strip()
                    current_explanations[letter] = exp_text
                else:
                    # Sometimes it's like "- A is incorrect: ..."
                    exp_match_2 = re.search(r'-\s*\**([A-D])\**\s+is\s+(correct|incorrect):\s*(.*)', line, re.IGNORECASE)
                    if exp_match_2:
                        letter = exp_match_2.group(1).upper()
                        exp_text = exp_match_2.group(3).strip()
                        current_explanations[letter] = exp_text
                        
        if current_question and current_correct:
            save_question(bank, current_question, current_options, current_correct, current_explanations, bank_name)
            total_imported += 1

def save_question(bank, q_text, options, correct_letter, explanations, bank_name):
    # Skip invalid parses
    if not q_text or len(options) < 2 or not correct_letter: return
    
    question = Question.objects.create(
        bank=bank,
        content=q_text,
        difficulty='Medium',
        tags=bank_name.replace('MCQ_', '').replace('.md', '')
    )

    for letter, opt_text in options.items():
        Option.objects.create(
            question=question,
            content=opt_text,
            is_correct=(letter == correct_letter),
            explanation=explanations.get(letter, '')
        )

    print(f"Success! Imported {total_imported} questions into the database.")

if __name__ == '__main__':
    file_path = r'f:\PHD-MSQ\All_200_MCQs.md'
    if os.path.exists(file_path):
        import_mcqs(file_path)
    else:
        print(f"File not found: {file_path}")
