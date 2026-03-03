---
title: "Django Real-Time Notifications with SwampDragon"
slug: "django-realtime-notifications-swampdragon"
date: "2015-09-06"
excerpt: "Implementing real-time notifications in Django applications using SwampDragon and WebSockets."
cover: "/blog/images/django-swampdragon-cover.jpg"
readTime: "10 min read"
category: "Django"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

This tutorial demonstrates how to implement real-time notifications in Django applications using SwampDragon. The solution supports browser notifications and persistent message display across multiple browsers simultaneously.

## Overview

Real-time notifications are essential for modern web applications. In this tutorial, we'll build a notification system that:

- Broadcasts messages to all connected users instantly
- Supports browser notifications via the Notifications API
- Persists notifications in the database
- Works across multiple browsers simultaneously

## Requirements

Before we start, make sure you have:

- Django 1.6.8+ or 1.7.1+
- Python 2.7.4
- Redis server (required for message queuing)

**Tested browsers:**
- Chrome 39.0
- Safari 8.0
- Firefox 36.0a2

## Step 1: Installation & Project Setup

First, install SwampDragon and create a new project:

```bash
pip install swampdragon
dragon-admin startproject notifications
cd notifications
django-admin.py startapp demo
```

## Step 2: Configuration

Update your `settings.py` with the required configuration:

```python
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Static files
STATIC_ROOT = os.path.join(BASE_DIR, 'static_root')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Templates
TEMPLATE_DIRS = [
    os.path.join(BASE_DIR, 'templates'),
]

# SwampDragon settings
SWAMP_DRAGON_CONNECTION = ('swampdragon.connections.sockjs_connection.DjangoSubscriberConnection', '/data')
DRAGON_URL = 'http://localhost:9999/'
```

Add SwampDragon and your app to `INSTALLED_APPS`:

```python
INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'swampdragon',
    'demo',
)
```

## Step 3: Create the Notification Model

Create a model that uses `SelfPublishModel` mixin for automatic broadcasting:

```python
# demo/models.py
from django.db import models
from swampdragon.models import SelfPublishModel
from demo.serializers import NotificationSerializer


class Notification(SelfPublishModel, models.Model):
    serializer_class = NotificationSerializer

    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.message[:50]
```

## Step 4: Create the Serializer

The serializer defines which fields are published via WebSocket:

```python
# demo/serializers.py
from swampdragon.serializers.model_serializer import ModelSerializer


class NotificationSerializer(ModelSerializer):
    class Meta:
        model = 'demo.Notification'
        publish_fields = ('id', 'message', 'created_at')
        update_fields = ('message',)
```

## Step 5: Create the Router

The router handles incoming WebSocket subscriptions:

```python
# demo/routers.py
from swampdragon import route_handler
from swampdragon.route_handler import ModelRouter
from demo.models import Notification
from demo.serializers import NotificationSerializer


class NotificationRouter(ModelRouter):
    route_name = 'notifications'
    serializer_class = NotificationSerializer
    model = Notification

    def get_object(self, **kwargs):
        return self.model.objects.get(pk=kwargs['pk'])

    def get_query_set(self, **kwargs):
        return self.model.objects.all()


route_handler.register(NotificationRouter)
```

## Step 6: Create the View

A simple class-based view to display existing notifications:

```python
# demo/views.py
from django.views.generic import ListView
from demo.models import Notification


class NotificationListView(ListView):
    model = Notification
    template_name = 'notifications/list.html'
    context_object_name = 'notifications'
```

## Step 7: Frontend Implementation

Create the HTML template with JavaScript for WebSocket handling:

```html
<!-- templates/notifications/list.html -->
{% load static %}
<!DOCTYPE html>
<html>
<head>
    <title>Real-Time Notifications</title>
    <script src="{% static 'swampdragon/js/dist/swampdragon.min.js' %}"></script>
</head>
<body>
    <h1>Notifications</h1>

    <div id="notifications">
        {% for notification in notifications %}
        <div class="notification">
            {{ notification.message }}
        </div>
        {% endfor %}
    </div>

    <script>
        // Connect to SwampDragon
        swampdragon.ready(function() {
            swampdragon.subscribe('notifications', 'notifications', null, function(context, data) {
                console.log('Subscribed to notifications');
            });
        });

        // Handle incoming notifications
        swampdragon.onChannelMessage(function(channels, message) {
            if (channels.indexOf('notifications') > -1) {
                addNotification(message.data);
                showBrowserNotification(message.data.message);
            }
        });

        function addNotification(data) {
            var container = document.getElementById('notifications');
            var div = document.createElement('div');
            div.className = 'notification new';
            div.textContent = data.message;
            container.insertBefore(div, container.firstChild);
        }

        // Browser notifications
        function showBrowserNotification(message) {
            if (!("Notification" in window)) {
                return;
            }

            if (Notification.permission === "granted") {
                new Notification("New Notification", { body: message });
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(function(permission) {
                    if (permission === "granted") {
                        new Notification("New Notification", { body: message });
                    }
                });
            }
        }

        // Request notification permission on page load
        if ("Notification" in window && Notification.permission === "default") {
            Notification.requestPermission();
        }
    </script>
</body>
</html>
```

## Step 8: Configure URLs

Set up your URL routing:

```python
# notifications/urls.py
from django.conf.urls import include, url
from django.contrib import admin
from demo.views import NotificationListView

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', NotificationListView.as_view(), name='notification-list'),
]
```

## Step 9: Register Model in Admin

Make notifications manageable via Django admin:

```python
# demo/admin.py
from django.contrib import admin
from demo.models import Notification


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('message', 'created_at')
    readonly_fields = ('created_at',)
```

## Running the Application

You need to run three services:

```bash
# Terminal 1: Redis server
redis-server

# Terminal 2: Django development server
python manage.py runserver

# Terminal 3: SwampDragon server
python server.py
```

## Testing

1. Open `http://localhost:8000` in multiple browser windows
2. Go to Django admin at `http://localhost:8000/admin`
3. Create a new notification
4. Watch it appear instantly in all browser windows!

## Advanced: User-Specific Notifications

For user-specific notifications, you can use `swampdragon-auth`:

```bash
pip install swampdragon-auth
```

Then modify your router to filter by user:

```python
class NotificationRouter(ModelRouter):
    # ... existing code ...

    def get_query_set(self, **kwargs):
        user = kwargs.get('user')
        if user and user.is_authenticated():
            return self.model.objects.filter(user=user)
        return self.model.objects.none()
```

## Source Code

The complete implementation is available on [Bitbucket](https://bitbucket.org/cyberkishor/swampdragon-django-notifications-demo).

---

*Have questions about real-time Django applications? [Get in touch](/contact).*
