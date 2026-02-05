Sometimes you need to access the current authenticated user from places where the request object isn't available, like models or utility functions. This tutorial shows how to create middleware that makes the current user accessible globally.

## The Problem

In Django, the current user is available through `request.user`. But what if you need to access it from:

- Model `save()` methods
- Signal handlers
- Utility functions
- Celery tasks

## The Solution: Thread-Local Storage

We'll create middleware that stores the current user in thread-local storage, making it accessible from anywhere in your application.

### Step 1: Create the Middleware

Create `middleware.py` in your app:

```python
# myapp/middleware.py

try:
    from threading import local, current_thread
except ImportError:
    from django.utils._threading_local import local

_thread_locals = local()


class GlobalUserMiddleware:
    """
    Middleware that stores the current authenticated user
    in thread-local storage for global access.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Store user before processing request
        self._set_current_user(request.user)

        response = self.get_response(request)

        # Clean up after response
        self._clear_current_user()

        return response

    def _set_current_user(self, user):
        setattr(
            _thread_locals,
            f'user_{current_thread().name}',
            user
        )

    def _clear_current_user(self):
        key = f'user_{current_thread().name}'
        if hasattr(_thread_locals, key):
            delattr(_thread_locals, key)


def get_current_user():
    """
    Retrieve the current user from thread-local storage.
    Returns None if no user is set.
    """
    return getattr(
        _thread_locals,
        f'user_{current_thread().name}',
        None
    )
```

### Step 2: Register the Middleware

Add to your `settings.py`:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'myapp.middleware.GlobalUserMiddleware',  # Add after AuthenticationMiddleware
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
```

### Step 3: Usage Examples

**In a Model:**

```python
from django.db import models
from myapp.middleware import get_current_user


class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_by = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        null=True, blank=True
    )
    updated_by = models.ForeignKey(
        'auth.User',
        on_delete=models.CASCADE,
        null=True, blank=True,
        related_name='updated_articles'
    )

    def save(self, *args, **kwargs):
        user = get_current_user()
        if user and user.is_authenticated:
            if not self.pk:
                self.created_by = user
            self.updated_by = user
        super().save(*args, **kwargs)
```

**In a Signal Handler:**

```python
from django.db.models.signals import pre_save
from django.dispatch import receiver
from myapp.middleware import get_current_user


@receiver(pre_save, sender=AuditLog)
def set_audit_user(sender, instance, **kwargs):
    user = get_current_user()
    if user and user.is_authenticated:
        instance.modified_by = user
```

**In a Utility Function:**

```python
from myapp.middleware import get_current_user


def log_action(action, obj):
    user = get_current_user()
    ActionLog.objects.create(
        user=user,
        action=action,
        content_object=obj
    )
```

## Alternative: Using Signals

For audit trails, Django signals can be cleaner:

```python
from django.db.models.signals import pre_save
from django.dispatch import receiver


@receiver(pre_save)
def auto_set_user(sender, instance, **kwargs):
    if not hasattr(instance, 'updated_by'):
        return

    user = get_current_user()
    if user and user.is_authenticated:
        instance.updated_by = user
```

## Caveats

1. **Not thread-safe for async** - This approach works for synchronous Django. For async views, consider alternative approaches.

2. **Management commands** - There's no user in management commands. Handle `None` cases.

3. **Celery tasks** - The user won't be available in background tasks. Pass user ID explicitly.

4. **Testing** - In tests, you may need to mock `get_current_user()`.

## Testing Helper

```python
from unittest.mock import patch
from django.test import TestCase


class MyTestCase(TestCase):
    @patch('myapp.middleware.get_current_user')
    def test_with_user(self, mock_get_user):
        mock_get_user.return_value = self.user
        # Your test code
```

---

*Building complex Django applications? [Let's discuss](/contact).*
