---
title: "Django ImageField Show Image in Admin"
slug: "django-imagefield-show-image-admin"
date: "2015-03-30"
excerpt: "Display ImageField as actual image thumbnails in Django admin."
cover: "/blog/images/django-cover.jpg"
readTime: "5 min read"
category: "Django"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to display ImageField as actual image thumbnails in Django admin instead of just showing file paths.

## The Problem

By default, Django admin displays ImageField as a file path or upload widget. For better UX, you want to see actual image previews.

## Solution 1: Custom Admin Widget

Create a custom widget that displays the image:

```python
# myapp/widgets.py

from django.contrib.admin.widgets import AdminFileWidget
from django.utils.safestring import mark_safe


class AdminImageWidget(AdminFileWidget):
    """
    A widget that displays an image preview alongside the file upload field.
    """

    def render(self, name, value, attrs=None, renderer=None):
        output = []

        if value and hasattr(value, 'url'):
            output.append(
                f'<a href="{value.url}" target="_blank">'
                f'<img src="{value.url}" height="50" style="margin-right: 10px;" />'
                f'</a>'
            )

        output.append(super().render(name, value, attrs, renderer))

        return mark_safe(''.join(output))
```

## Solution 2: Use in ModelAdmin

Apply the widget in your admin:

```python
# myapp/admin.py

from django.contrib import admin
from django.db import models
from .models import Product
from .widgets import AdminImageWidget


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'image_preview', 'price']

    formfield_overrides = {
        models.ImageField: {'widget': AdminImageWidget},
    }

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src="{obj.image.url}" height="50" />'
            )
        return "No image"

    image_preview.short_description = 'Preview'
```

## Solution 3: Using formfield_for_dbfield

For more control over specific fields:

```python
from django.contrib import admin
from django.db import models
from .widgets import AdminImageWidget


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    def formfield_for_dbfield(self, db_field, request, **kwargs):
        if db_field.name == 'image':
            kwargs['widget'] = AdminImageWidget
        return super().formfield_for_dbfield(db_field, request, **kwargs)
```

## Solution 4: Display in List View

Show images in the admin list view:

```python
from django.contrib import admin
from django.utils.html import format_html
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'image_tag', 'price', 'stock']
    readonly_fields = ['image_tag']

    def image_tag(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" width="50" height="50" style="object-fit: cover;" />',
                obj.image.url
            )
        return "-"

    image_tag.short_description = 'Image'
    image_tag.allow_tags = True
```

## Solution 5: Inline Image Preview

For related models with images:

```python
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    readonly_fields = ['image_preview']

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" height="100" />',
                obj.image.url
            )
        return "No image yet"

    image_preview.short_description = 'Preview'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]
```

## Handling Missing Images

Always handle cases where images might not exist:

```python
def image_preview(self, obj):
    try:
        if obj.image and obj.image.url:
            return format_html(
                '<img src="{}" height="50" />',
                obj.image.url
            )
    except (ValueError, FileNotFoundError):
        pass
    return format_html('<span style="color: #999;">No image</span>')
```

## Complete Example

```python
# myapp/admin.py

from django.contrib import admin
from django.db import models
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import Product
from .widgets import AdminImageWidget


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'image_thumbnail', 'category', 'price', 'is_active']
    list_filter = ['category', 'is_active']
    search_fields = ['name', 'description']
    readonly_fields = ['image_preview']

    formfield_overrides = {
        models.ImageField: {'widget': AdminImageWidget},
    }

    fieldsets = (
        (None, {
            'fields': ('name', 'description', 'category')
        }),
        ('Media', {
            'fields': ('image', 'image_preview')
        }),
        ('Pricing', {
            'fields': ('price', 'sale_price')
        }),
    )

    def image_thumbnail(self, obj):
        """Small thumbnail for list view."""
        if obj.image:
            return format_html(
                '<img src="{}" width="40" height="40" '
                'style="object-fit: cover; border-radius: 4px;" />',
                obj.image.url
            )
        return "-"

    image_thumbnail.short_description = ''

    def image_preview(self, obj):
        """Larger preview for detail view."""
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width: 300px; max-height: 300px;" />',
                obj.image.url
            )
        return "No image uploaded"

    image_preview.short_description = 'Current Image'
```

---

*Need help customizing Django admin? [Get in touch](/contact).*
