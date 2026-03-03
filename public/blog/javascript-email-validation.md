---
title: "JavaScript Email Validation"
slug: "javascript-email-validation"
date: "2014-02-07"
excerpt: "Validate email addresses using JavaScript with regular expressions."
cover: "/blog/images/javascript-cover.jpg"
readTime: "4 min read"
category: "JavaScript"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to validate email addresses using JavaScript with regular expressions.

## Overview

Email validation is a common requirement in web forms. Here's a simple yet effective JavaScript function to validate email formats before form submission.

## Basic Email Validation

```javascript
function checkEmail(email) {
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
        alert('Please provide a valid email address');
        return false;
    }
    return true;
}

// Usage
checkEmail('user@example.com'); // true
checkEmail('invalid-email');    // false, shows alert
```

## Understanding the Regex Pattern

The regular expression breaks down as follows:

- `^([a-zA-Z0-9_\.\-])+` - Start with one or more alphanumeric characters, underscores, dots, or hyphens
- `\@` - The @ symbol
- `(([a-zA-Z0-9\-])+\.)+` - Domain name with dots
- `([a-zA-Z0-9]{2,4})+$` - TLD of 2-4 characters at the end

## Enhanced Validation Function

A more robust version with additional checks:

```javascript
function validateEmail(email) {
    // Trim whitespace
    email = email.trim();

    // Check if empty
    if (!email) {
        return { valid: false, message: 'Email is required' };
    }

    // Check basic format
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email)) {
        return { valid: false, message: 'Invalid email format' };
    }

    // Check length
    if (email.length > 254) {
        return { valid: false, message: 'Email too long' };
    }

    return { valid: true, message: 'Valid email' };
}

// Usage
var result = validateEmail('user@example.com');
if (result.valid) {
    // Proceed with form submission
} else {
    alert(result.message);
}
```

## Form Integration Example

```html
<form id="contact-form" onsubmit="return validateForm()">
    <input type="text" id="email" placeholder="Enter email" />
    <button type="submit">Submit</button>
</form>

<script>
function validateForm() {
    var email = document.getElementById('email').value;
    var result = validateEmail(email);

    if (!result.valid) {
        alert(result.message);
        return false;
    }

    return true;
}
</script>
```

## Modern HTML5 Approach

For modern browsers, you can also use HTML5 validation:

```html
<input type="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
```

However, JavaScript validation provides more control and better user feedback.

---

*Need help with form validation? [Get in touch](/contact).*
