import os
import django
import docx
import json
import re
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mcq_backend.settings')
django.setup()

from core.models import QuestionBank, SubjectSummary, User

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SUMMARY_DIR = os.path.join(BASE_DIR, 'book_summary')

def runs_to_markdown(para):
    md_text = ""
    for run in para.runs:
        text = run.text
        if not text.strip():
            md_text += text
            continue
            
        if run.bold:
            left_space = len(text) - len(text.lstrip())
            right_space = len(text) - len(text.rstrip())
            core = text.strip()
            if core:
                md_text += (" " * left_space) + f"**{core}**" + (" " * right_space)
            else:
                md_text += text
        elif run.italic:
            left_space = len(text) - len(text.lstrip())
            right_space = len(text) - len(text.rstrip())
            core = text.strip()
            if core:
                md_text += (" " * left_space) + f"_{core}_" + (" " * right_space)
            else:
                md_text += text
        else:
            md_text += text
    return md_text

def parse_docx_to_layered_json(file_path):
    doc = docx.Document(file_path)
    
    level_1_points = []
    level_2_paragraphs = []
    mistakes = []
    definitions = []
    
    current_topic = os.path.basename(file_path).replace('.docx', '').replace('_', ' ')
    
    for para in doc.paragraphs:
        plain_text = para.text.strip()
        if not plain_text:
            continue
            
        md_text = runs_to_markdown(para).strip()
            
        # Detect bullets
        is_list = para.style and para.style.name and para.style.name.startswith('List')
        if is_list or plain_text.startswith('-') or plain_text.startswith('•'):
            clean_text = md_text.lstrip('-•* \t')
            # Look for mistake markers
            if 'mistake' in clean_text.lower() or 'error' in clean_text.lower() or '⚠' in clean_text:
                mistakes.append(clean_text)
            else:
                level_1_points.append(clean_text)
            level_2_paragraphs.append(f"- {clean_text}")
            continue
            
        # Detect bold runs for definitions
        has_bold = any(run.bold for run in para.runs)
        if has_bold and ':' in plain_text and len(plain_text) < 150:
            parts = plain_text.split(':', 1)
            definitions.append({
                'term': parts[0].strip(),
                'meaning': parts[1].strip()
            })
            level_1_points.append(plain_text)
            # Definitions can be formatted as blockquotes or bold headers later, let's keep it in md
        
        # Heading and Blockquote logic
        is_heading = False
        lower_md = plain_text.lower()
        if lower_md.startswith("chapter "):
            md_text = f"# {md_text}"
            is_heading = True
        elif re.match(r"^\d+\.\d+\.\d+\s", plain_text):
            md_text = f"### {md_text}"
            is_heading = True
        elif re.match(r"^\d+\.\d+\s", plain_text):
            md_text = f"## {md_text}"
            is_heading = True
        elif re.match(r"^\d+\.\s", plain_text) and len(plain_text.split()) < 10:
            md_text = f"## {md_text}"
            is_heading = True
            
        if not is_heading:
            if lower_md.startswith("definition:") or lower_md.startswith("example:") or lower_md.startswith("mistake:") or lower_md.startswith("concept:"):
                md_text = f"> {md_text}"
                
        level_2_paragraphs.append(md_text)
        
    # If no bullet points found, extract sentences from first paragraph
    if not level_1_points and level_2_paragraphs:
        first_para = level_2_paragraphs[0]
        sentences = [s.strip() + '.' for s in first_para.split('.') if s.strip()]
        level_1_points = sentences[:3]
        
        
    # Level 2 is Summary (first 60%)
    total_paras = len(level_2_paragraphs)
    split_idx = int(total_paras * 0.6)
    
    l2_content = level_2_paragraphs[:split_idx]
    
    # Level 3 is the FULL text of the document to serve as a deep dive
    l3_content = level_2_paragraphs
    
    if not l2_content:
        l2_content = ["No detailed summary available."]
    if not l3_content:
        l3_content = ["Further deep explanations were not found in the original document."]
        
    full_text = " ".join(level_1_points + level_2_paragraphs)
    word_count = len(full_text.split())
    read_time_mins = max(1, round(word_count / 200)) # Avg reading speed 200 wpm
        
    return {
        'topic_title': current_topic,
        'read_time': f"{read_time_mins} mins",
        'word_count': word_count,
        'content_json': {
            'level_1': level_1_points[:5], # Keep it concise for level 1
            'level_2': "\n\n".join(l2_content),
            'level_3': "\n\n".join(l3_content),
            'definitions': definitions,
            'mistakes': mistakes
        }
    }

def run_import():
    if not os.path.exists(SUMMARY_DIR):
        print(f"Directory not found: {SUMMARY_DIR}")
        return
        
    admin_user, _ = User.objects.get_or_create(username='admin', defaults={'role': 'Admin'})
    
    # Simple mapping of filename keywords to subjects
    subject_keywords = {
        'Deep_learning': 'Advances in Deep Learning',
        'Data_mining': 'Data Mining',
        'Cloud_Computing': 'Handbook of Cloud Computing',
        'Internet_of_Things': 'Internet of Things',
        'Multimedia': 'Fundamentals of Multimedia',
        'security': 'Cryptography and Network Security',
    }
    
    count = 0
    for filename in os.listdir(SUMMARY_DIR):
        if not filename.endswith('.docx'):
            continue
            
        file_path = os.path.join(SUMMARY_DIR, filename)
        print(f"Processing {filename}...")
        
        parsed_data = parse_docx_to_layered_json(file_path)
        
        # Determine bank
        mapped_subject = 'Uncategorized'
        for key, subj in subject_keywords.items():
            if key in filename:
                mapped_subject = subj
                break
                
        bank, _ = QuestionBank.objects.get_or_create(
            subject=mapped_subject,
            defaults={'created_by': admin_user}
        )
        
        # Determine difficulty based on length and topic
        diff = 'Medium'
        if parsed_data['word_count'] > 8000 or 'Deep Learning' in mapped_subject or 'Crypto' in mapped_subject:
            diff = 'Hard'
        elif parsed_data['word_count'] < 2000:
            diff = 'Easy'
            
        # Determine focus area
        focus = f"{mapped_subject} Fundamentals"
        if parsed_data['content_json']['definitions']:
            focus = f"Key Definitions & {mapped_subject.split()[-1]}"
        
        # Create summary
        SubjectSummary.objects.update_or_create(
            bank=bank,
            topic_title=parsed_data['topic_title'],
            defaults={
                'read_time': parsed_data['read_time'],
                'difficulty': diff,
                'focus_area': focus,
                'content_json': parsed_data['content_json']
            }
        )
        count += 1
        
    print(f"Successfully processed {count} document(s).")

if __name__ == '__main__':
    run_import()
