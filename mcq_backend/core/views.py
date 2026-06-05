from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import User, QuestionBank, Question, Option, Exam, ExamAttempt, AttemptAnswer
from .serializers import (
    UserSerializer, QuestionBankSerializer, QuestionSerializer, 
    OptionSerializer, ExamSerializer, ExamAttemptSerializer, AttemptAnswerSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class QuestionBankViewSet(viewsets.ModelViewSet):
    queryset = QuestionBank.objects.all()
    serializer_class = QuestionBankSerializer

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
        # Custom logic to auto-grade the attempt
        correct_count = attempt.answers.filter(is_correct=True).count()
        attempt.total_score = correct_count
        attempt.save()
        return Response({'status': 'submitted', 'score': correct_count})

class AttemptAnswerViewSet(viewsets.ModelViewSet):
    queryset = AttemptAnswer.objects.all()
    serializer_class = AttemptAnswerSerializer
