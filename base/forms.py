from django.forms import ModelForm
# from .models import
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Profile,Post
from django.shortcuts import redirect


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=20, required=True)
    last_name = forms.CharField(max_length=20, required=True)

    class Meta:
        model = User
        fields = UserCreationForm.Meta.fields + ('email','first_name','last_name')

    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        # if User.objects.filter(email=email).exists():
            # raise forms.ValidationError("This email is already in use.")
        return email



class AccountForm(ModelForm):
    class Meta:
        model = Profile
        # fields = '__all__'
        exclude = ['user', 'id_user','follows']
        labels = {
            'profileimg': 'Profile Image'
        }

class UploadPostForm(ModelForm):
    class Meta:
        model = Post
        fields = ['image','caption']



