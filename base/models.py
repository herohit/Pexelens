from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
import uuid

from PIL import Image
from io import BytesIO
from django.core.files import File

# Create your models here.

class Profile(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    id_user = models.IntegerField()
    follows = models.ManyToManyField("self",symmetrical=False,blank=True,related_name="Followed_by")
    bio = models.CharField(max_length=50,blank=True)
    profileimg=models.ImageField(upload_to='profile-images',default='blank-profile-picture.png')
    location = models.CharField(max_length=100,blank=True)

     # before saving the instance we’re reducing the image
    def save(self, *args, **kwargs):
        new_image = self.reduce_image_size(self.profileimg)
        self.profileimg = new_image
        super().save(*args, **kwargs)


    def reduce_image_size(self, profileimg):
        img = Image.open(profileimg)
        thumb_io = BytesIO()
        img.save(thumb_io, 'jpeg', quality=20)
        new_image = File(thumb_io, name=profileimg.name)
        return new_image

    def __str__(self):
        return self.user.username
    

    

class Post(models.Model):
    id= models.UUIDField(primary_key=True,default=uuid.uuid4)
    user = models.CharField(max_length=100)
    image = models.ImageField(upload_to='post_images')
    caption = models.TextField(blank=True)
    created_at =models.DateTimeField(auto_now_add=True)
    no_of_likes = models.IntegerField(default=0)
    no_of_comments =models.IntegerField(default=0)

     # before saving the instance we’re reducing the image
    def save(self, *args, **kwargs):
        new_image = self.reduce_image_size(self.image)
        self.image = new_image
        super().save(*args, **kwargs)


    def reduce_image_size(self, image):
        img = Image.open(image)
        thumb_io = BytesIO()
        img.save(thumb_io, 'jpeg', quality=30)
        new_image = File(thumb_io, name=image.name)
        return new_image

    def __str__(self):
        return self.caption

# model for like post
class LikePost(models.Model):
    post_id = models.CharField(max_length=500)
    username  = models.CharField(max_length=100)

    def __str__(self):
        return self.username
    
class CommentPost(models.Model):
    id= models.UUIDField(primary_key=True,default=uuid.uuid4)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE) 
    user = models.CharField(max_length=30)
    body = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.body
    
class Notification(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='received_notifications')
    post = models.ForeignKey(Post,on_delete=models.CASCADE)
    liked_by = models.ForeignKey(User,on_delete=models.CASCADE, related_name='liked_notifications')
    seen = models.BooleanField(default=False)
    iscomment = models.BooleanField(default=False)
    comment_detail = models.ForeignKey(CommentPost,on_delete=models.CASCADE,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username