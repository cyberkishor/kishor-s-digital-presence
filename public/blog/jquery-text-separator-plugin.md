---
title: "jQuery Text Separator Plugin"
slug: "jquery-text-separator-plugin"
date: "2013-09-14"
excerpt: "Create a custom jQuery plugin to format text with separators for voucher codes and numbers."
cover: "/blog/images/javascript-cover.jpg"
readTime: "5 min read"
category: "JavaScript"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Create a custom jQuery plugin to separate text or numbers into groups with hyphens.

## Overview

This tutorial shows how to build a jQuery plugin that formats text by adding separators, useful for displaying voucher codes, phone numbers, or card numbers.

## The Plugin Code

```javascript
(function($) {
    $.fn.Vaucher = function(options) {
        var st = $.extend({
            'seprate': 4,
        }, options);

        return this.each(function() {
            var cur_ele = $(this);
            var val = cur_ele.text().trim();

            if (val.length <= 13) {
                var arr = Array.prototype.slice.call(val);
                var output = [];

                while (arr.length) {
                    output.push(arr.splice(0, st.seprate).join(''));
                }

                var result = output.join('-');
                cur_ele.text(result);
            }
        });
    }
})(jQuery);
```

## Usage

### Default (4-character groups)

```html
<span class="voucher">ABCD1234EFGH</span>

<script>
$('.voucher').Vaucher();
// Result: ABCD-1234-EFGH
</script>
```

### Custom Group Size

```html
<span id="code">1234567890</span>

<script>
$('#code').Vaucher({ 'seprate': 2 });
// Result: 12-34-56-78-90
</script>
```

## How It Works

1. Gets the text content of the element
2. Splits it into an array of characters
3. Groups characters based on the `seprate` option
4. Joins groups with hyphens
5. Updates the element text

## Enhanced Version

Here's an improved version with more options:

```javascript
(function($) {
    $.fn.textSeparator = function(options) {
        var settings = $.extend({
            groupSize: 4,
            separator: '-',
            maxLength: null
        }, options);

        return this.each(function() {
            var $el = $(this);
            var text = $el.text().trim().replace(/\s/g, '');

            // Apply max length if specified
            if (settings.maxLength && text.length > settings.maxLength) {
                text = text.substring(0, settings.maxLength);
            }

            var chars = text.split('');
            var groups = [];

            while (chars.length) {
                groups.push(chars.splice(0, settings.groupSize).join(''));
            }

            $el.text(groups.join(settings.separator));
        });
    }
})(jQuery);

// Usage examples
$('.phone').textSeparator({ groupSize: 3, separator: ' ' });
// 1234567890 -> 123 456 789 0

$('.card').textSeparator({ groupSize: 4, separator: ' ' });
// 1234567890123456 -> 1234 5678 9012 3456

$('.code').textSeparator({ groupSize: 4, separator: '-' });
// ABCD1234EFGH -> ABCD-1234-EFGH
```

## Practical Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>Text Separator Demo</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
    <h3>Voucher Codes</h3>
    <p class="voucher">GIFT2024HOLIDAY</p>
    <p class="voucher">SAVE50PERCENT</p>

    <h3>Phone Numbers</h3>
    <p class="phone">9876543210</p>

    <script>
    (function($) {
        $.fn.textSeparator = function(options) {
            var settings = $.extend({
                groupSize: 4,
                separator: '-'
            }, options);

            return this.each(function() {
                var $el = $(this);
                var text = $el.text().trim();
                var chars = text.split('');
                var groups = [];

                while (chars.length) {
                    groups.push(chars.splice(0, settings.groupSize).join(''));
                }

                $el.text(groups.join(settings.separator));
            });
        }
    })(jQuery);

    $(document).ready(function() {
        $('.voucher').textSeparator({ groupSize: 4, separator: '-' });
        $('.phone').textSeparator({ groupSize: 3, separator: '-' });
    });
    </script>
</body>
</html>
```

---

*Building jQuery plugins? [Get in touch](/contact).*
