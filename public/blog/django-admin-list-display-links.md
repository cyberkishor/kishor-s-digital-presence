Learn how to dynamically control which columns are clickable links in Django's admin list view based on user permissions.

## Overview

By default, Django admin makes the first column clickable to edit records. Using `get_list_display_links`, you can customize this behavior based on user roles.

## Basic Usage

In your `admin.py`:

```python
from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Employee


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ['get_full_name', 'email', 'department', 'is_active']

    def get_list_display_links(self, request, list_display):
        """
        Return list of fields that should be clickable links.
        """
        # Check if user is Administrator or superuser
        admin_group = Group.objects.filter(name="Administrator").first()

        is_admin = (
            request.user.is_superuser or
            (admin_group and admin_group in request.user.groups.all())
        )

        if is_admin:
            return ['get_full_name', 'email']

        # Return None to disable all links (view-only)
        return None
```

## Different Permissions, Different Links

```python
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number', 'customer', 'total', 'status', 'created_at']

    def get_list_display_links(self, request, list_display):
        user = request.user

        if user.is_superuser:
            # Superusers can click any column
            return ['order_number', 'customer']

        if user.has_perm('orders.change_order'):
            # Staff with change permission
            return ['order_number']

        if user.has_perm('orders.view_order'):
            # View-only users - no clickable links
            return None

        return None
```

## Group-Based Access Control

```python
from django.contrib.auth.models import Group

@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'created_at']

    def get_list_display_links(self, request, list_display):
        user = request.user
        user_groups = set(user.groups.values_list('name', flat=True))

        # Define group permissions
        full_access_groups = {'Administrator', 'Editor'}
        limited_access_groups = {'Reviewer'}

        if user.is_superuser or user_groups & full_access_groups:
            return ['title', 'author']

        if user_groups & limited_access_groups:
            return ['title']

        return None
```

## Combining with Other Admin Methods

```python
@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'status', 'published_at']
    list_filter = ['status', 'author']
    search_fields = ['title', 'content']

    def get_list_display_links(self, request, list_display):
        if request.user.is_superuser:
            return ['title']
        return None

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        # Non-superusers only see their own articles
        return qs.filter(author=request.user)

    def has_change_permission(self, request, obj=None):
        if request.user.is_superuser:
            return True
        if obj and obj.author == request.user:
            return True
        return False
```

## Making All Columns Clickable

```python
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'sku', 'price', 'stock']

    def get_list_display_links(self, request, list_display):
        # Make all displayed columns clickable
        return list_display
```

## Conditional Based on Object Status

While `get_list_display_links` doesn't have access to individual objects, you can use CSS or JavaScript for row-level control, or override the changelist template.

## Complete Example

```python
from django.contrib import admin
from django.contrib.auth.models import Group
from .models import Project


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = [
        'name', 'client', 'manager', 'status',
        'budget', 'start_date', 'end_date'
    ]
    list_filter = ['status', 'manager']
    search_fields = ['name', 'client__name']
    date_hierarchy = 'start_date'

    def get_list_display_links(self, request, list_display):
        """
        Control clickable columns based on user role:
        - Superusers: name and client columns
        - Project Managers: name column only
        - Others: no clickable links (view only)
        """
        user = request.user

        if user.is_superuser:
            return ['name', 'client']

        pm_group = Group.objects.filter(name='Project Managers').first()
        if pm_group and pm_group in user.groups.all():
            return ['name']

        # View-only for everyone else
        return None
```

## Key Points

1. **Return `None`** to disable all clickable links
2. **Return a list** of field names to make those columns clickable
3. **Fields must be in `list_display`** to be linkable
4. **Check permissions** using `is_superuser`, groups, or `has_perm()`

---

*Building custom Django admin interfaces? [Let's discuss](/contact).*
