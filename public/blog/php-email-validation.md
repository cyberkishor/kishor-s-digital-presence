---
title: "Validate Email Format with PHP"
slug: "php-email-validation"
date: "2013-06-06"
excerpt: "Use PHP's built-in filter_var function for simple and reliable email validation."
cover: "/blog/images/php-cover.jpg"
readTime: "3 min read"
category: "PHP"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to validate email addresses in PHP using built-in filter functions.

## Overview

PHP 5 and greater provides handy built-in functions for email validation. No need for complex regex patterns.

## The Simple Solution

Use PHP's `FILTER_VALIDATE_EMAIL` filter:

```php
<?php
$email_address = "user@example.com";

if (filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
    echo "Valid email address";
} else {
    echo "Invalid email address";
}
?>
```

## Practical Form Example

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];

    if (empty($email)) {
        $error = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format";
    } else {
        // Email is valid, proceed with processing
        echo "Email is valid: " . htmlspecialchars($email);
    }
}
?>

<form method="post">
    <input type="email" name="email" placeholder="Enter email" />
    <button type="submit">Submit</button>
    <?php if (isset($error)) echo "<p style='color:red;'>$error</p>"; ?>
</form>
```

## Validation Function

Create a reusable function:

```php
<?php
function validateEmail($email) {
    $email = trim($email);

    if (empty($email)) {
        return array('valid' => false, 'message' => 'Email is required');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return array('valid' => false, 'message' => 'Invalid email format');
    }

    return array('valid' => true, 'message' => 'Email is valid');
}

// Usage
$result = validateEmail("user@example.com");
if ($result['valid']) {
    // Proceed
} else {
    echo $result['message'];
}
?>
```

## Sanitize and Validate

For extra safety, sanitize before validating:

```php
<?php
$email = $_POST['email'];

// Remove illegal characters
$email = filter_var($email, FILTER_SANITIZE_EMAIL);

// Validate
if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "Valid: " . $email;
} else {
    echo "Invalid email";
}
?>
```

## Why Use filter_var?

- Built into PHP (no external libraries)
- Handles edge cases properly
- More reliable than custom regex
- Regularly updated with PHP

Enjoy!

---

*Building PHP applications? [Get in touch](/contact).*
