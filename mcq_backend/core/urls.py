from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, QuestionBankViewSet, QuestionViewSet, 
    OptionViewSet, ExamViewSet, ExamAttemptViewSet, AttemptAnswerViewSet, SubjectSummaryViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'question-banks', QuestionBankViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'options', OptionViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'exam-attempts', ExamAttemptViewSet)
router.register(r'attempt-answers', AttemptAnswerViewSet)
router.register(r'summaries', SubjectSummaryViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
