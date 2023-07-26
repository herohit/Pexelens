from django.urls import resolve

def notifications(request):
    if resolve(request.path_info).url_name != 'notification':
        if request.user.is_authenticated:
            notifications = request.user.received_notifications.filter(seen=False)
            count_unseen_notifications = notifications.count()

        else:
            notifications = None
            count_unseen_notifications = 0
    else:
        notifications = None
        count_unseen_notifications = 0
    
    if count_unseen_notifications > 0:
        return {'count_unseen_notifications': count_unseen_notifications}
    else:
        return {'count_unseen_notifications': ""}
