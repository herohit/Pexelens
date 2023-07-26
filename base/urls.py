from . import views
from django.urls import path
from django.contrib.auth import views as auth_views

from django.shortcuts import redirect

def logout_required(view_func):
    def wrapper(request, *args, **kwargs):
        if request.user.is_authenticated:
            # User is logged in, redirect to a different URL
            return redirect('home')  # Replace 'home' with the desired URL name
        return view_func(request, *args, **kwargs)
    return wrapper




urlpatterns = [
    path('',views.home,name="home"),
    # login View
    path('login/',views.loginPage,name="login"),
    # logout view
    path('logout/',views.logoutUser,name='logout'),
    # register page
    path('register',views.registerUser,name='register'),
    path('settings',views.newsettings,name='settings'),
    path('profile/<str:pk>/',views.userProfile,name='user-profile'),
    path('upload/',views.upload,name='upload-post'),
    path('discover/',views.suggestionFeed,name='suggestion-feed'),
    path('like-post/',views.like_post,name='like-post'),
    path('like-postt/',views.like_post_nonajax,name='like-post'),
    path('delete-post/<str:pk>',views.deletePost,name='delete-post'),
    path('comment-post/<str:pk>',views.postcomment,name='comment-post'),
    # path('ajax/',views.checkforajax,name='ajax'),
    path('notification/',views.notification,name='notification'),

    path('password_reset/', logout_required(auth_views.PasswordResetView.as_view(template_name="base_app/password_reset.html")), name='password_reset'),
    path('password_reset/done/', logout_required(auth_views.PasswordResetDoneView.as_view(template_name="base_app/password_reset_sent.html")), name='password_reset_done'),
    path('reset/<uidb64>/<token>/', logout_required(auth_views.PasswordResetConfirmView.as_view(template_name="base_app/password_reset_form.html")), name='password_reset_confirm'),
    path('reset/done/', logout_required(auth_views.PasswordResetCompleteView.as_view(template_name="base_app/password_reset_done.html")), name='password_reset_complete'),
]