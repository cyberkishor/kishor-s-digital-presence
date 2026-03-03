---
title: "Assigning PHP Variables to JavaScript"
slug: "php-variable-in-javascript"
date: "2013-05-22"
excerpt: "Properly pass PHP data to JavaScript using json_encode for safe data transfer."
cover: "/blog/images/php-cover.jpg"
readTime: "3 min read"
category: "PHP"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to properly pass PHP variables to JavaScript using json_encode.

## Overview

A common challenge in web development is accessing PHP data within JavaScript code. Here's the recommended approach.

## The Solution

Use PHP's `json_encode()` function to properly format variables for JavaScript:

```php
<?php
$cname = "kishorkumar";
?>
<script>
var spge = <?php echo json_encode($cname); ?>;
console.log(spge); // Output: kishorkumar
</script>
```

## Why json_encode?

Using `json_encode()` ensures:
- Proper string escaping
- Correct handling of special characters
- Valid JavaScript syntax
- Support for arrays and objects

## Examples with Different Data Types

### String

```php
<?php $name = "John's Store"; ?>
<script>
var name = <?php echo json_encode($name); ?>;
// Result: "John's Store" (properly escaped)
</script>
```

### Array

```php
<?php
$colors = array("red", "green", "blue");
?>
<script>
var colors = <?php echo json_encode($colors); ?>;
// Result: ["red", "green", "blue"]
</script>
```

### Associative Array (Object)

```php
<?php
$user = array(
    "name" => "Kishor",
    "email" => "kishor@example.com",
    "age" => 30
);
?>
<script>
var user = <?php echo json_encode($user); ?>;
// Result: {"name":"Kishor","email":"kishor@example.com","age":30}

console.log(user.name); // Kishor
</script>
```

### Boolean and Null

```php
<?php
$isActive = true;
$data = null;
?>
<script>
var isActive = <?php echo json_encode($isActive); ?>; // true
var data = <?php echo json_encode($data); ?>;         // null
</script>
```

## Common Mistake to Avoid

Don't do this:

```php
// Wrong - can break with special characters
<script>
var name = "<?php echo $name; ?>";
</script>
```

If `$name` contains quotes or newlines, it will break your JavaScript.

## Best Practice

Always use `json_encode()` when passing any PHP data to JavaScript:

```php
<script>
var config = <?php echo json_encode(array(
    'apiUrl' => '/api/v1',
    'debug' => true,
    'maxItems' => 100
)); ?>;
</script>
```

---

*Building PHP applications? [Get in touch](/contact).*
