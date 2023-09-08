from django.contrib import admin
from django.contrib.auth import get_user_model
from django import forms
User = get_user_model()

class UserAdminForm(forms.ModelForm):

    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput(render_value=False),
        required=False
    )

    class Meta:
        model = User
        fields = ['first_name','last_name','email','password','is_active','role']

    def save(self,commit = True):
        instance = super(UserAdminForm, self).save(commit=False)
        password = self.cleaned_data["password"]
  
        if password:
            instance.set_password(password)  
        else:
            del instance.password
        
        if commit:
            instance.save()
        return instance

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)


class UserAdmin(admin.ModelAdmin):
    form = UserAdminForm
    list_display = ('first_name', 'last_name', 'email', 'is_active', 'last_login')
    list_display_links = ('first_name', 'last_name', 'email',)
    search_fields = ('first_name', 'last_name', 'email', 'is_active', 'last_login')
    list_per_page = 25
    
admin.site.register(User, UserAdmin)