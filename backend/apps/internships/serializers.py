from rest_framework import serializers
from .models import Internship

class InternshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Internship
        fields = ['id', 'title', 'description', 'start_date']
