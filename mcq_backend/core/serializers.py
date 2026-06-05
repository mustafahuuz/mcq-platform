from rest_framework import serializers
from .models import User, QuestionBank, Question, Option, Exam, ExamAttempt, AttemptAnswer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role', 'first_name', 'last_name']

class OptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ['id', 'content', 'is_correct', 'explanation']

class QuestionSerializer(serializers.ModelSerializer):
    options = OptionSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ['id', 'bank', 'content', 'difficulty', 'tags', 'options']

class QuestionBankSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = QuestionBank
        fields = ['id', 'subject', 'created_by', 'created_at', 'questions']

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'title', 'duration_minutes', 'start_window', 'end_window', 'created_by', 'questions']

class AttemptAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttemptAnswer
        fields = ['id', 'attempt', 'question', 'selected_option', 'is_correct']

class ExamAttemptSerializer(serializers.ModelSerializer):
    answers = AttemptAnswerSerializer(many=True, read_only=True)

    class Meta:
        model = ExamAttempt
        fields = ['id', 'user', 'exam', 'start_time', 'end_time', 'total_score', 'answers']
