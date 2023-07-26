from django.shortcuts import render,redirect
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate,login,logout
from django.contrib.auth.decorators import login_required
from .models import Profile,Post,LikePost,CommentPost,Notification

from .forms import CustomUserCreationForm,UploadPostForm
from django.db.models import Q , Count 
import uuid , os







# login Page 
def loginPage(request):
    form = CustomUserCreationForm()
    page='login'
    if request.method == 'POST':
        username = request.POST.get('username').lower()
        password = request.POST.get('password')
    
        try:
            user = User.objects.get(username=username)
            user = authenticate(request,username=username,password=password)
            if user is not None:
                login(request,user)
                return redirect('home')
            else:
                messages.error(request,'Credentials Invalid')
        except:
            messages.error(request,"User does not exist")
    context={'page':page,'form':form}
    # return render(request,'base/loginpage.html',context)
    return render(request,'newlogin.html',context)




# logout page
@login_required(login_url='login')
def logoutUser(request):
    logout(request)
    return redirect('home')



# Home Page View
@login_required(login_url='login')
def home(request):
    #get user
    user=request.user
    user_profile = Profile.objects.get(user=user)
    followed_users = user_profile.follows.all()
    followed_usernames = list(followed_users.values_list('user__username', flat=True))
    followed_usernames.append(user.username)
    q=request.GET.get('q') if request.GET.get('q') else ''
    sort_by = request.GET.get('sort_by')

    posts=Post.objects.filter(
         Q(user__in=followed_usernames) & (Q(user__icontains=q) | Q(caption__icontains=q) )).order_by('-created_at')
    
    if sort_by == 'popular':
        posts = posts.order_by('-no_of_likes')

    all_user = Profile.objects.all()
    
    liked_post_ids = LikePost.objects.filter(username=user.username).values_list('post_id', flat=True)
    liked_post_ids = [uuid.UUID(post_id) for post_id in liked_post_ids]  # Convert post IDs to UUID format



    context={'posts':posts,'user_profile':user_profile,'all_user':all_user,'liked_post_ids': liked_post_ids,}

    newUser = followed_users.count() == 0 and user_profile.Followed_by.count() == 0

    if newUser:
        context['is_new_user'] = True

    return render(request,'base_app/home.html',context)





# Discover Page view
@login_required(login_url='login')
def suggestionFeed(request):

    if request.method == 'POST':
        pass

    user_profile = Profile.objects.get(user=request.user)
    q=request.GET.get('q') if request.GET.get('q') else ''

    followed_profiles = user_profile.follows.all()
    users = [profile.user for profile in followed_profiles]
    all_users = Profile.objects.filter(Q(user__username__icontains=q)).exclude(user=request.user).exclude(user__in=users).annotate(num_followers=Count('Followed_by')).order_by('-num_followers')



    context = {"all_users":all_users,'user_profile':user_profile}
    return render(request,'base_app/suggestions.html',context)




@login_required(login_url='login')
def upload(request):
    form = UploadPostForm()
    user_profile = Profile.objects.get(user=request.user)

    if request.method == 'POST':
        form = UploadPostForm(request.POST, request.FILES)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user.username


            post.save()
            return redirect('home')

    context = {'form': form, 'user_profile': user_profile}
    return render(request, 'base_app/upload.html', context)





@login_required(login_url='login')
def newsettings(request):
    user=request.user
    user_profile = Profile.objects.get(user=user)

    if 'name-form' in request.POST:
        user.first_name = request.POST.get('first_name')
        user.last_name = request.POST.get('last_name')
        user.save()
        messages.success(request,"Name changed successfully !")
        return redirect('settings')
    

    if request.method == 'POST':
        user_profile.bio = request.POST.get('bio')
        user_profile.location = request.POST.get('location')

        if len(request.FILES) != 0:
            if len(user_profile.profileimg):
                os.remove(user_profile.profileimg.path)
            profileimg=request.FILES.get('profileimg')
            user_profile.profileimg = profileimg
        user_profile.save()
        messages.success(request,"Profile Updated !")

    
    context={'user_profile':user_profile,'user':user}
    return render(request,'base_app/edit-profile.html',context)







# Register Page
def registerUser(request):
    page='register'
    form = CustomUserCreationForm()
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        
        if form.is_valid():
            user = form.save(commit=False)#to clean the data like username to all lowercase
            user.username=user.username.lower()
            email = form.cleaned_data.get('email')
            if User.objects.filter(email=email).exists():
                messages.error(request,'Email Taken')
                return redirect('register')
            # user.email = email
            user.save()

            #login the user
            login(request,user)


            #create a profile object for the new user
            uprofile = User.objects.get(username=user.username)
            new_profile = Profile.objects.create(user=uprofile,id_user=uprofile.id)
            new_profile.save()

            
            return redirect('settings') 
        else:
            #flash them that some error occured
            messages.error(request,'Something went wrong ! Try Again.')


    context={'form':form,'page':page}
    # return render(request,'base/loginpage.html',context)
    return render(request,'newlogin.html',context)

@login_required(login_url='login')
def userProfile(request,pk):
    user=User.objects.get(username=pk)
    user_profile =  Profile.objects.get(user=user)
    user_post = Post.objects.filter(user=pk)
    logged_user = Profile.objects.get(user=request.user)

    

    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        # if 'follow' in request.POST:
        action = request.POST.get('action')
        if action == 'follow':
            logged_user.follows.add(user_profile)
            return JsonResponse({'status': 'success', 'message': 'Followed successfully'})
        # elif 'unfollow' in request.POST:
        elif action == 'unfollow':
            logged_user.follows.remove(user_profile)
            return JsonResponse({'status': 'success', 'message': 'Unfollowed successfully'})
    
    it_follows = logged_user.follows.filter(user=user).exists()
    #posts
    #posts_comments
    #hashtags
    context={'user':user,'user_profile':user_profile,'user_post':user_post,'it_follows':it_follows}
    return render(request,'base_app/profile.html',context)
    # return render(request,'base/custom_profile.html',context)










@login_required(login_url='login')
def like_post_nonajax(request):
    username = request.user.username
    post_id = request.GET.get('post_id')
    # post = Post.objects.get(id=pk)
    post = Post.objects.get(id=post_id)
    # post_id = post.id


    # if the post is liked by user or not
    like_filter = LikePost.objects.filter(post_id=post_id,username=username).first()
    if like_filter is None:
        new_like = LikePost.objects.create(post_id=post_id,username=username)
        new_like.save()
        post.no_of_likes += 1
        post.save()
        return redirect(request.META['HTTP_REFERER'])
    else:
        like_filter.delete()
        post.no_of_likes-= 1
        post.save()
        return redirect(request.META['HTTP_REFERER'])

@login_required(login_url='login')
def like_post(request):
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':

        username = request.user.username
        post_id = request.POST.get('post_id')

        post = Post.objects.get(id=post_id)
        user_instance = User.objects.get(username = post.user)



        like_filter = LikePost.objects.filter(post_id=post_id, username=username).first()

        if like_filter is None:
            new_like = LikePost.objects.create(post_id=post_id, username=username)
            new_like.save()
            post.no_of_likes += 1
            post.save()
            new_notification = Notification.objects.create(user=user_instance, post=post, liked_by=request.user)
            new_notification.save()
            # return JsonResponse({'likes_count': post.no_of_likes})
        else:
            like_filter.delete()
            post.no_of_likes -= 1
            post.save()
            Notification.objects.filter(user=user_instance, post=post, liked_by= request.user).delete()


        notifications = request.user.received_notifications.filter(seen=False)
        count_unseen_notifications = notifications.count()
        return JsonResponse({'likes_count': post.no_of_likes,"count_unseen_notifications":count_unseen_notifications})
    else:
        return JsonResponse({'error': 'Invalid request'})









@login_required(login_url='/login')
def deletePost(request,pk):
    
    user_profile =  Profile.objects.get(user=request.user)
    post = Post.objects.get(id=pk)

    if request.user.username != post.user:
        return HttpResponse("You are not allowed here")

    if request.method == 'POST':
        if len(post.image):
            os.remove(post.image.path)
        post.delete()
        return redirect('/profile/' + str(post.user))
    context={'obj':post,'user-profile':user_profile}

    return render(request,'base/delete_post.html',context)


@login_required(login_url='login')
def postcomment(request,pk):
    user_profile =  Profile.objects.get(user=request.user)
    post=Post.objects.get(id=pk)

    post_owner = Profile.objects.get(user__username=post.user)
    user_instance = User.objects.get(username = post.user)
    # To handle ajax request
    if request.method == 'POST' and request.headers.get('x-requested-with') == 'XMLHttpRequest':
        post_id = request.POST.get('post_id')
        target_post = Post.objects.get(id=post_id)
        target_post_user = User.objects.get(username = target_post.user)
        commentValue = request.POST.get('commentValue')
        commentValue = commentValue.strip()
        if commentValue:
            new_comment = CommentPost.objects.create(user=user_profile.user.username,post_id=target_post,body=commentValue)
            new_comment.save()
            target_post.no_of_comments +=1
            target_post.save()
            new_notification = Notification.objects.create(user=target_post_user, post=post, liked_by=request.user,iscomment=True,comment_detail=new_comment)
            new_notification.save()
            return JsonResponse({'comment_count':target_post.no_of_comments,'success': 'Comment Posted !'})
        elif not commentValue:
            return JsonResponse({'error': 'Comment cannot be empty'})
        else:
            return JsonResponse({'other_error': 'Unknown error occurred'})

    entered_comment=request.GET.get('enter_comment') if request.GET.get('enter_comment') else ''
    if entered_comment:
        new_comment = CommentPost.objects.create(user=user_profile.user.username,post_id=post,body=entered_comment)
        # Increase comment count
        new_comment.save()
        post.no_of_comments +=1
        post.save()
        new_notification = Notification.objects.create(user=user_instance, post=post, liked_by=request.user,iscomment=True,comment_detail=new_comment)
        new_notification.save()
        return redirect(request.path)
    
    comments = CommentPost.objects.filter(post_id=post.id)

    liked_post_id = LikePost.objects.filter(username=request.user.username,post_id=post.id)
    is_liked = True if liked_post_id else False


    context={'post':post,'user_profile':user_profile,'comments':comments,'post_owner':post_owner,'is_liked':is_liked}
    return render(request,'base_app/comment.html',context)


@login_required(login_url='login')
def notification(request):
    user=request.user
    user_profile = Profile.objects.get(user=user)
    notifications = user.received_notifications.all().order_by('-created_at')
    user_profiles = Profile.objects.filter(user__in=notifications.values_list('liked_by', flat=True))
    # activity = user.liked_notifications.all()
    for n in notifications:
        n.seen = True
        n.save()

    context={'user_profile':user_profile,'notifications':notifications,'user_profiles':user_profiles}
    return render(request,'base_app/notification.html',context)



