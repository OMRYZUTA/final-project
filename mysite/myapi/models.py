from django.db import models

class Position(models.Model):
    job_title = models.CharField(max_length=100)
    company_name = models.CharField(max_length=100)
    user_id = models.IntegerField(null=True)
    #ForeignKey(UserSocialAuth.uid, on_delete=models.CASCADE)

    # email_address = forms.EmailField() #delete later

    def __str__(self):
        return self.job_title  # yet to be defined, delete later
