from datetime import datetime, timedelta,timezone
from django import template

register = template.Library()

@register.filter(name='display_time_elapsed')
def display_time_elapsed(value):
    now = datetime.now(timezone.utc)
    elapsed_time = now - value

    if elapsed_time.total_seconds() < 60:
        seconds = int(elapsed_time.total_seconds())
        if seconds > 1:
            return f"{seconds} seconds"
        return f"{seconds} second"
    
    elif elapsed_time.total_seconds() < 3600:
        minutes = int(elapsed_time.total_seconds() // 60)
        if minutes > 1:
            return f"{minutes} minutes"
        return f"{minutes} minute"
    elif elapsed_time.total_seconds() < 86400:
        hours = int(elapsed_time.total_seconds() // 3600)
        if hours > 1:
            return f"{hours} hours"
        return f"{hours} hour"
    elif elapsed_time.total_seconds() < 604800:
        days = int(elapsed_time.total_seconds() // 86400)
        if days > 1:
            return f"{days} days"
        return f"{days} day"
    elif elapsed_time.total_seconds() < 2592000:
        weeks = int(elapsed_time.total_seconds() // 604800)
        if weeks > 1:
            return f"{weeks} weeks"
        return f"{weeks} week"
    elif elapsed_time.total_seconds() < 31536000:
        months = int(elapsed_time.total_seconds() // 2592000)
        if months > 1:
            return f"{months} months"
        return f"{months} month"
    else:
        years = int(elapsed_time.total_seconds() // 31536000)
        if years > 1:
            return f"{years} years"
        return f"{years} year"
