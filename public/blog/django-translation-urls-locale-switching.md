---
title: "Django Translation URLs with Locale Switching"
slug: "django-translation-urls-locale-switching"
date: "2015-01-18"
excerpt: "Implement internationalized URLs with language switching in Django applications."
cover: "/blog/images/django-cover.jpg"
readTime: "6 min read"
category: "Django"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to implement language locale switching in Django applications with translated URLs, allowing users to navigate between language versions seamlessly.

## Overview

Django's internationalization (i18n) framework supports URL translation and locale switching. This tutorial shows how to set up a language switcher that preserves the current page when changing languages.

## URL Configuration

First, configure your URLs to use `i18n_patterns`:

```python
# urls.py
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls.i18n import i18n_patterns

# Non-localized URLs
urlpatterns = [
    url(r'^i18n/', include('django.conf.urls.i18n')),
]

# Localized URLs (will be prefixed with language code)
urlpatterns += i18n_patterns(
    url(r'^admin/', admin.site.urls),
    url(r'^$', 'myapp.views.home', name='home'),
    url(r'^about/$', 'myapp.views.about', name='about'),
)

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
```

## Settings Configuration

Update your `settings.py`:

```python
from django.utils.translation import ugettext_lazy as _

# Enable internationalization
USE_I18N = True
USE_L10N = True

# Available languages
LANGUAGES = [
    ('en', _('English')),
    ('ne', _('Nepali')),
    ('hi', _('Hindi')),
]

# Default language
LANGUAGE_CODE = 'en'

# Path to locale files
LOCALE_PATHS = [
    os.path.join(BASE_DIR, 'locale'),
]

# Required middleware
MIDDLEWARE = [
    # ... other middleware
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # Add this
    'django.middleware.common.CommonMiddleware',
    # ... other middleware
]
```

## Custom Middleware for Path Tracking

Create middleware to track the non-language-prefixed path:

```python
# middleware/language_change.py
from django.conf import settings


class LanguagePathMiddleware:
    """
    Stores the path without language prefix in session
    for use in language switching.
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Get language codes
        language_codes = [code for code, name in settings.LANGUAGES]

        # Parse path
        path_parts = request.path.split('/')
        no_lang_path = request.path

        # Remove language prefix if present
        if len(path_parts) > 1 and path_parts[1] in language_codes:
            path_parts.pop(1)
            no_lang_path = '/'.join(path_parts) or '/'

        # Store in session
        request.session['no_lang_path'] = no_lang_path

        response = self.get_response(request)
        return response
```

Add to settings:

```python
MIDDLEWARE = [
    # ... other middleware
    'middleware.language_change.LanguagePathMiddleware',
]
```

## Template Language Switcher

Create a language switcher in your template:

```html
{% load i18n %}

<form action="{% url 'set_language' %}" method="post">
    {% csrf_token %}
    <input type="hidden" name="next" value="{{ request.session.no_lang_path|default:'/' }}" />

    <select name="language" onchange="this.form.submit()">
        {% get_current_language as LANGUAGE_CODE %}
        {% get_available_languages as LANGUAGES %}
        {% get_language_info_list for LANGUAGES as languages %}

        {% for language in languages %}
            <option value="{{ language.code }}"
                    {% if language.code == LANGUAGE_CODE %}selected{% endif %}>
                {{ language.name_local }} ({{ language.code }})
            </option>
        {% endfor %}
    </select>

    <noscript>
        <button type="submit">Change Language</button>
    </noscript>
</form>
```

## Alternative: Dropdown with Flags

```html
{% load i18n %}

<div class="language-switcher">
    {% get_current_language as LANGUAGE_CODE %}

    <form action="{% url 'set_language' %}" method="post" id="language-form">
        {% csrf_token %}
        <input type="hidden" name="next" value="{{ request.session.no_lang_path }}" />
        <input type="hidden" name="language" id="language-input" value="{{ LANGUAGE_CODE }}" />
    </form>

    <div class="dropdown">
        <button class="dropdown-toggle">
            {{ LANGUAGE_CODE|upper }}
        </button>
        <ul class="dropdown-menu">
            {% get_language_info_list for LANGUAGES as languages %}
            {% for lang in languages %}
                <li>
                    <a href="#" onclick="switchLanguage('{{ lang.code }}'); return false;">
                        {{ lang.name_local }}
                    </a>
                </li>
            {% endfor %}
        </ul>
    </div>
</div>

<script>
function switchLanguage(code) {
    document.getElementById('language-input').value = code;
    document.getElementById('language-form').submit();
}
</script>
```

## Translating URL Patterns

You can also translate URL patterns:

```python
from django.utils.translation import ugettext_lazy as _

urlpatterns += i18n_patterns(
    url(_(r'^about/$'), 'myapp.views.about', name='about'),
    url(_(r'^contact/$'), 'myapp.views.contact', name='contact'),
)
```

Then in your `.po` files:

```
msgid "^about/$"
msgstr "^acerca-de/$"

msgid "^contact/$"
msgstr "^contacto/$"
```

## Creating Translation Files

```bash
# Create locale directory
mkdir -p locale

# Generate .po files
django-admin makemessages -l ne
django-admin makemessages -l hi

# After translating, compile
django-admin compilemessages
```

---

*Building multilingual Django applications? [Get in touch](/contact).*
