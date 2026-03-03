---
title: "Dynamic Form Fields with PHP and jQuery"
slug: "php-jquery-dynamic-fields"
date: "2014-11-20"
excerpt: "Create repeatable form fields that users can add and remove dynamically."
cover: "/blog/images/php-cover.jpg"
readTime: "6 min read"
category: "PHP"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to create dynamic repeater fields in HTML forms using PHP and jQuery, allowing users to add and remove field sets on the fly.

## Overview

Dynamic form fields are essential for scenarios like:
- Adding multiple team members
- Managing product variants
- Creating flexible data entry forms

This tutorial shows how to build a repeatable field set system.

## HTML Structure

```html
<form id="dynamic-form" method="post">
    <div id="field-wrapper">
        <!-- Fields will be added here -->
        <div class="field-group" data-index="0">
            <input type="text" name="items[0][name]" placeholder="Name" />
            <input type="text" name="items[0][email]" placeholder="Email" />
            <button type="button" class="remove-field">Remove</button>
        </div>
    </div>

    <button type="button" id="add-field">Add More</button>
    <button type="submit">Submit</button>
</form>
```

## jQuery Implementation

```javascript
jQuery(document).ready(function($) {
    var fieldIndex = 1;

    // Add new field
    $('#add-field').on('click', function() {
        var template = `
            <div class="field-group" data-index="${fieldIndex}">
                <input type="text" name="items[${fieldIndex}][name]" placeholder="Name" />
                <input type="text" name="items[${fieldIndex}][email]" placeholder="Email" />
                <button type="button" class="remove-field">Remove</button>
            </div>
        `;

        $('#field-wrapper').append(template);
        fieldIndex++;
    });

    // Remove field
    $(document).on('click', '.remove-field', function() {
        $(this).closest('.field-group').remove();
    });
});
```

## PHP Processing

```php
<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $items = isset($_POST['items']) ? $_POST['items'] : array();

    foreach ($items as $index => $item) {
        $name = sanitize_text_field($item['name']);
        $email = sanitize_email($item['email']);

        // Process each item
        echo "Item $index: $name - $email<br>";
    }
}
?>
```

## Advanced: Template-Based Approach

Using PHP output buffering for cleaner templates:

```php
<?php
// Create template
ob_start();
?>
<div class="field-group" data-index="{{INDEX}}">
    <div class="field-row">
        <label>Name</label>
        <input type="text" name="items[{{INDEX}}][name]" />
    </div>
    <div class="field-row">
        <label>Email</label>
        <input type="email" name="items[{{INDEX}}][email]" />
    </div>
    <div class="field-row">
        <label>Role</label>
        <select name="items[{{INDEX}}][role]">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
        </select>
    </div>
    <button type="button" class="remove-field">Remove</button>
</div>
<?php
$template = ob_get_clean();

// Escape for JavaScript
$js_template = str_replace(
    array("\n", "\r", "'"),
    array('', '', "\\'"),
    $template
);
?>

<script>
var fieldTemplate = '<?php echo $js_template; ?>';
var fieldIndex = 1;

jQuery('#add-field').on('click', function() {
    var newField = fieldTemplate.replace(/\{\{INDEX\}\}/g, fieldIndex);
    jQuery('#field-wrapper').append(newField);
    fieldIndex++;
});
</script>
```

## Complete Example with Validation

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Form Fields</title>
    <style>
        .field-group {
            padding: 15px;
            margin: 10px 0;
            border: 1px solid #ddd;
            border-radius: 4px;
            background: #f9f9f9;
        }
        .field-row {
            margin-bottom: 10px;
        }
        .field-row label {
            display: block;
            margin-bottom: 5px;
        }
        .field-row input,
        .field-row select {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .remove-field {
            background: #e74c3c;
            color: white;
            border: none;
            padding: 8px 16px;
            cursor: pointer;
            border-radius: 4px;
        }
        #add-field {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 20px;
            cursor: pointer;
            border-radius: 4px;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <form id="team-form" method="post">
        <h2>Team Members</h2>

        <div id="field-wrapper">
            <div class="field-group" data-index="0">
                <div class="field-row">
                    <label>Name *</label>
                    <input type="text" name="members[0][name]" required />
                </div>
                <div class="field-row">
                    <label>Email *</label>
                    <input type="email" name="members[0][email]" required />
                </div>
                <div class="field-row">
                    <label>Position</label>
                    <input type="text" name="members[0][position]" />
                </div>
                <button type="button" class="remove-field">Remove</button>
            </div>
        </div>

        <button type="button" id="add-field">+ Add Team Member</button>
        <br><br>
        <button type="submit">Save Team</button>
    </form>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
    jQuery(document).ready(function($) {
        var index = 1;

        $('#add-field').on('click', function() {
            var template = `
                <div class="field-group" data-index="${index}">
                    <div class="field-row">
                        <label>Name *</label>
                        <input type="text" name="members[${index}][name]" required />
                    </div>
                    <div class="field-row">
                        <label>Email *</label>
                        <input type="email" name="members[${index}][email]" required />
                    </div>
                    <div class="field-row">
                        <label>Position</label>
                        <input type="text" name="members[${index}][position]" />
                    </div>
                    <button type="button" class="remove-field">Remove</button>
                </div>
            `;

            $('#field-wrapper').append(template);
            index++;
        });

        $(document).on('click', '.remove-field', function() {
            if ($('.field-group').length > 1) {
                $(this).closest('.field-group').fadeOut(300, function() {
                    $(this).remove();
                });
            } else {
                alert('You must have at least one team member.');
            }
        });
    });
    </script>
</body>
</html>
```

---

*Need help with dynamic forms? [Get in touch](/contact).*
