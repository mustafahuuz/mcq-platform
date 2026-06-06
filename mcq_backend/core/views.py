from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, QuestionBank, Question, Option, Exam, ExamAttempt, AttemptAnswer, SubjectSummary
from .serializers import (
    UserSerializer, QuestionBankSerializer, QuestionSerializer, 
    OptionSerializer, ExamSerializer, ExamAttemptSerializer, AttemptAnswerSerializer, SubjectSummarySerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class QuestionBankViewSet(viewsets.ModelViewSet):
    queryset = QuestionBank.objects.all()
    serializer_class = QuestionBankSerializer

    @action(detail=False, methods=['post'])
    def bulk_import(self, request):
        questions_data = request.data.get('questions', [])
        if not questions_data:
            return Response({'error': 'No questions provided'}, status=400)
            
        admin_user, _ = User.objects.get_or_create(username='admin', defaults={'role': 'Admin'})
        imported_count = 0
        
        for q_data in questions_data:
            bank_name = q_data.get('subject', 'Imported Bank')
            bank, _ = QuestionBank.objects.get_or_create(subject=bank_name, defaults={'created_by': admin_user})
            
            question = Question.objects.create(
                bank=bank,
                content=q_data.get('content', ''),
                difficulty=q_data.get('difficulty', 'Medium'),
                tags=q_data.get('tags', '')
            )
            
            for opt in q_data.get('options', []):
                Option.objects.create(
                    question=question,
                    content=opt.get('content', ''),
                    is_correct=opt.get('is_correct', False),
                    explanation=opt.get('explanation', '')
                )
            imported_count += 1
            
        return Response({'status': 'success', 'imported_count': imported_count})

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class OptionViewSet(viewsets.ModelViewSet):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class ExamAttemptViewSet(viewsets.ModelViewSet):
    queryset = ExamAttempt.objects.all()
    serializer_class = ExamAttemptSerializer

    @action(detail=True, methods=['post'])
    def submit(self, request, pk=None):
        attempt = self.get_object()
        
        # Grading and Tag Analytics
        tag_stats = {}
        correct_count = 0
        total_questions = 0

        for answer in attempt.answers.all():
            total_questions += 1
            is_correct = answer.is_correct
            if is_correct:
                correct_count += 1
            
            # Group by tags (assuming comma separated tags or single tag)
            tags = answer.question.tags.split(',') if answer.question.tags else ['Uncategorized']
            for tag in tags:
                tag = tag.strip()
                if tag not in tag_stats:
                    tag_stats[tag] = {'total': 0, 'correct': 0}
                tag_stats[tag]['total'] += 1
                if is_correct:
                    tag_stats[tag]['correct'] += 1
        
        attempt.total_score = correct_count
        attempt.save()

        # Identify weaknesses (< 60% success rate)
        weaknesses = []
        for tag, stats in tag_stats.items():
            success_rate = (stats['correct'] / stats['total']) * 100
            if success_rate < 60:
                weaknesses.append({
                    'topic': tag,
                    'score_percentage': round(success_rate, 2),
                    'suggestion': f"Review study materials related to {tag}."
                })

        return Response({
            'status': 'submitted', 
            'score': correct_count, 
            'total': total_questions,
            'weaknesses': weaknesses
        })

class AttemptAnswerViewSet(viewsets.ModelViewSet):
    queryset = AttemptAnswer.objects.all()
    serializer_class = AttemptAnswerSerializer

class SubjectSummaryViewSet(viewsets.ModelViewSet):
    queryset = SubjectSummary.objects.all()
    serializer_class = SubjectSummarySerializer
