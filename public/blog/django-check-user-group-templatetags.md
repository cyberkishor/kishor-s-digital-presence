Learn how to check if a user belongs to a specific group directly in Django templates using a custom template filter.

## The Problem

Sometimes you need to show or hide content in templates based on user group membership. While you could pass this information from views, a template filter is more reusable.

## Creating the Template Filter

Create a `templatetags` directory in your app with an `__init__.py` file, then create your filter:

```python
# myapp/templatetags/group_filters.py

from django import template
from django.contrib.auth.models import Group

register = template.Library()


@register.filter(name='has_group')
def has_group(user, group_name):
    """
    Check if user belongs to a specific group.

    Usage: {% if request.user|has_group:"GroupName" %}
    """
    try:
        group = Group.objects.get(name=group_name)
        return group in user.groups.all()
    except Group.DoesNotExist:
        return False
```

## Using in Templates

First, load the template tags:

```django
{% load group_filters %}

{% if request.user|has_group:"Administrator" %}
    <a href="/admin/">Admin Panel</a>
{% endif %}

{% if request.user|has_group:"Editor" %}
    <button>Edit Content</button>
{% else %}
    <p>View only mode</p>
{% endif %}
```

## Multiple Group Check

Create a filter for checking multiple groups:

```python
@register.filter(name='has_any_group')
def has_any_group(user, group_names):
    """
    Check if user belongs to any of the specified groups.

    Usage: {% if request.user|has_any_group:"Admin,Editor,Manager" %}
    """
    if not user.is_authenticated:
        return False

    group_list = [g.strip() for g in group_names.split(',')]
    user_groups = set(user.groups.values_list('name', flat=True))

    return bool(user_groups & set(group_list))
```

Usage:

```django
{% if request.user|has_any_group:"Admin,Editor" %}
    <div class="admin-tools">...</div>
{% endif %}
```

## Alternative: Simple Tag

For more complex logic, use a simple tag:

```python
@register.simple_tag(takes_context=True)
def user_has_group(context, group_name):
    """
    Usage: {% user_has_group "Admin" as is_admin %}
           {% if is_admin %}...{% endif %}
    """
    user = context['request'].user
    if not user.is_authenticated:
        return False

    try:
        group = Group.objects.get(name=group_name)
        return group in user.groups.all()
    except Group.DoesNotExist:
        return False
```

## Performance Optimization

For frequently used checks, prefetch groups:

```python
# In your view
def my_view(request):
    # Prefetch groups to avoid N+1 queries
    user = request.user
    if user.is_authenticated:
        user = User.objects.prefetch_related('groups').get(pk=user.pk)

    return render(request, 'template.html', {'user': user})
```

Or use a context processor:

```python
# myapp/context_processors.py
def user_groups(request):
    if request.user.is_authenticated:
        return {
            'user_groups': set(request.user.groups.values_list('name', flat=True))
        }
    return {'user_groups': set()}
```

Then in templates:

```django
{% if "Admin" in user_groups %}
    ...
{% endif %}
```

## Complete Example

```python
# myapp/templatetags/auth_extras.py

from django import template
from django.contrib.auth.models import Group

register = template.Library()


@register.filter(name='has_group')
def has_group(user, group_name):
    if not user.is_authenticated:
        return False
    try:
        group = Group.objects.get(name=group_name)
        return group in user.groups.all()
    except Group.DoesNotExist:
        return False


@register.filter(name='has_perm')
def has_perm(user, perm):
    """Check if user has a specific permission."""
    return user.has_perm(perm)
```

---

*Building role-based Django applications? [Let's discuss](/contact).*
