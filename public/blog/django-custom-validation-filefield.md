---
title: "Django Custom Validation for FileField"
slug: "django-custom-validation-filefield"
date: "2015-07-09"
excerpt: "Restrict file uploads to specific formats using custom validators."
cover: "/blog/images/django-cover.jpg"
readTime: "4 min read"
category: "Django"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to implement custom validation rules for Django's FileField to restrict uploads to specific file types.

## Overview

Django's FileField accepts any file type by default. For security and business requirements, you often need to restrict uploads to specific formats like PDF, DOC, or DOCX.

## Creating a Custom Validator

Create a validation function that checks file extensions:

```python
import os
from django.core.exceptions import ValidationError

def validate_file_extension(value):
    ext = os.path.splitext(value.name)[1].lower()
    valid_extensions = ['.pdf', '.doc', '.docx']

    if ext not in valid_extensions:
        raise ValidationError(
            'File not supported! Please upload PDF, DOC, or DOCX files only.'
        )
```

## Using the Validator in a Model

Apply the validator to your FileField:

```python
from django.db import models
from .validators import validate_file_extension

class LoanApplication(models.Model):
    registration_number = models.CharField(max_length=50, unique=True)
    applicant_name = models.CharField(max_length=200)
    loan_type = models.CharField(max_length=100)
    application_document = models.FileField(
        upload_to='applications/',
        blank=True,
        validators=[validate_file_extension]
    )
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.registration_number} - {self.applicant_name}"
```

## Multiple Validators

You can combine multiple validators:

```python
from django.core.validators import FileExtensionValidator

def validate_file_size(value):
    max_size = 5 * 1024 * 1024  # 5 MB
    if value.size > max_size:
        raise ValidationError('File size must be less than 5 MB.')

class Document(models.Model):
    file = models.FileField(
        upload_to='documents/',
        validators=[
            validate_file_extension,
            validate_file_size,
        ]
    )
```

## Using Django's Built-in Validator

Django 1.11+ includes `FileExtensionValidator`:

```python
from django.core.validators import FileExtensionValidator

class Document(models.Model):
    file = models.FileField(
        upload_to='documents/',
        validators=[
            FileExtensionValidator(allowed_extensions=['pdf', 'doc', 'docx'])
        ]
    )
```

## Validating MIME Types

For better security, validate MIME types instead of just extensions:

```python
import magic
from django.core.exceptions import ValidationError

def validate_file_mimetype(value):
    allowed_mimetypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    # Read file content to determine MIME type
    file_mime = magic.from_buffer(value.read(1024), mime=True)
    value.seek(0)  # Reset file pointer

    if file_mime not in allowed_mimetypes:
        raise ValidationError(
            f'Invalid file type: {file_mime}. Allowed types: PDF, DOC, DOCX'
        )
```

## Form-Level Validation

You can also validate in forms:

```python
from django import forms

class DocumentForm(forms.ModelForm):
    class Meta:
        model = Document
        fields = ['file']

    def clean_file(self):
        file = self.cleaned_data.get('file')
        if file:
            ext = os.path.splitext(file.name)[1].lower()
            if ext not in ['.pdf', '.doc', '.docx']:
                raise forms.ValidationError('Invalid file type.')
        return file
```

## Error Messages in Templates

Display validation errors in your template:

```html
<form method="post" enctype="multipart/form-data">
    {% csrf_token %}
    {{ form.file }}
    {% if form.file.errors %}
        <ul class="errors">
        {% for error in form.file.errors %}
            <li>{{ error }}</li>
        {% endfor %}
        </ul>
    {% endif %}
    <button type="submit">Upload</button>
</form>
```

## Best Practices

1. **Validate both extension and MIME type** for security
2. **Set appropriate max file size** limits
3. **Use meaningful error messages**
4. **Validate on both client and server side**
5. **Store files outside the web root** when possible

---

*Need help with Django file handling? [Get in touch](/contact).*
