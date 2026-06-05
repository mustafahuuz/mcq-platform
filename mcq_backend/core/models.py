from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    ROLE_CHOICES = (
        ('Admin', 'Admin'),
        ('Instructor', 'Instructor'),
        ('Student', 'Student'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Student')

    def __str__(self):
        return f"{self.username} ({self.role})"


class QuestionBank(models.Model):
    subject = models.CharField(max_length=255)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='question_banks')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject

class Question(models.Model):
    DIFFICULTY_CHOICES = (
        ('Easy', 'Easy'),
        ('Medium', 'Medium'),
        ('Hard', 'Hard'),
    )
    bank = models.ForeignKey(QuestionBank, on_delete=models.CASCADE, related_name='questions')
    content = models.TextField()
    difficulty = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='Medium')
    tags = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return f"{self.content[:50]}..."

class Option(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='options')
    content = models.TextField()
    is_correct = models.BooleanField(default=False)
    explanation = models.TextField(blank=True)

    def __str__(self):
        return self.content[:50]

class Exam(models.Model):
    title = models.CharField(max_length=255)
    duration_minutes = models.IntegerField()
    start_window = models.DateTimeField()
    end_window = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exams')
    questions = models.ManyToManyField(Question, related_name='exams')

    def __str__(self):
        return self.title

class ExamAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='attempts')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='attempts')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    total_score = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.exam.title}"

class AttemptAnswer(models.Model):
    attempt = models.ForeignKey(ExamAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_option = models.ForeignKey(Option, on_delete=models.CASCADE, null=True, blank=True)
    is_correct = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.selected_option:
            self.is_correct = self.selected_option.is_correct
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.attempt.id} - {self.question.id}"
