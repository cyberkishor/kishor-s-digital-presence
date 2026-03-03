---
title: "Mouse Hover Message Display with JavaScript"
slug: "javascript-mouse-hover-message"
date: "2013-12-04"
excerpt: "Display custom tooltips when users hover over links using vanilla JavaScript."
cover: "/blog/images/javascript-cover.jpg"
readTime: "4 min read"
category: "JavaScript"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to display custom messages when users hover over links using JavaScript.

## Overview

Create interactive tooltips that appear when users hover over links, providing additional context without external libraries.

## Basic Implementation

### HTML Structure

```html
<p>
    <a onmouseover="show(this, 'This is message #1')" href="https://google.com">
        Link 1: Go to Google
    </a>
</p>
<p>
    <a onmouseover="show(this, 'This is message #2')" href="https://github.com">
        Link 2: Go to GitHub
    </a>
</p>
<p>
    <a onmouseover="show(this, 'This is message #3')" href="https://stackoverflow.com">
        Link 3: Go to Stack Overflow
    </a>
</p>

<!-- Message container -->
<div id="message-box" style="display: none;">
    <div id="message-header">
        Info <span onclick="hideMessage()">[x]</span>
    </div>
    <div id="message-content"></div>
</div>
```

### CSS Styling

```css
#message-box {
    position: absolute;
    width: 217px;
    min-height: 100px;
    background: #C0C0C0;
    border: 1px solid #808080;
    z-index: 1000;
}

#message-header {
    background: #808080;
    color: white;
    padding: 5px 10px;
}

#message-header span {
    float: right;
    cursor: pointer;
}

#message-content {
    padding: 10px;
}
```

### JavaScript

```javascript
function show(element, message) {
    var box = document.getElementById('message-box');
    var content = document.getElementById('message-content');

    // Get element position
    var rect = element.getBoundingClientRect();

    // Position the message box
    box.style.left = rect.left + 'px';
    box.style.top = (rect.bottom + 5) + 'px';

    // Set message content
    content.innerHTML = message;

    // Show the box
    box.style.display = 'block';
}

function hideMessage() {
    document.getElementById('message-box').style.display = 'none';
}
```

## Enhanced Version

A more polished tooltip with hover detection:

```html
<style>
.tooltip-trigger {
    position: relative;
    cursor: pointer;
}

.tooltip {
    position: absolute;
    background: #333;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s;
    z-index: 1000;
    top: 100%;
    left: 0;
    margin-top: 5px;
}

.tooltip-trigger:hover .tooltip {
    opacity: 1;
    visibility: visible;
}
</style>

<a href="#" class="tooltip-trigger">
    Hover over me
    <span class="tooltip">This is a tooltip message!</span>
</a>
```

## jQuery Version

```javascript
$(document).ready(function() {
    $('.hover-message').hover(
        function() {
            var message = $(this).data('message');
            var tooltip = $('<div class="tooltip">' + message + '</div>');

            $(this).append(tooltip);
            tooltip.fadeIn(200);
        },
        function() {
            $(this).find('.tooltip').fadeOut(200, function() {
                $(this).remove();
            });
        }
    );
});
```

```html
<a href="#" class="hover-message" data-message="Click to visit Google">
    Go to Google
</a>
```

## Notes

- Use CSS-only tooltips for simple cases
- JavaScript provides more control for complex scenarios
- Consider accessibility - tooltips should be keyboard accessible

Happy Coding!

---

*Building interactive interfaces? [Get in touch](/contact).*
