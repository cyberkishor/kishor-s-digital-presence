Learn how to implement WordPress's native ThickBox modal functionality without requiring additional plugins.

## Overview

ThickBox is a jQuery-based modal window built into WordPress. It's perfect for displaying content, forms, or media in a lightbox without external dependencies.

## Basic Implementation

### Step 1: Enqueue ThickBox

Add ThickBox scripts and styles:

```php
<?php
// In your theme's functions.php or plugin file
function enqueue_thickbox() {
    add_thickbox();
}
add_action('wp_enqueue_scripts', 'enqueue_thickbox');
```

Or directly in your template:

```php
<?php add_thickbox(); ?>
```

### Step 2: Create Hidden Content

Add the content that will appear in the modal:

```html
<div id="my-modal-content" style="display:none;">
    <h2>Modal Title</h2>
    <p>This content will appear in the ThickBox modal.</p>
    <form>
        <input type="text" placeholder="Enter something..." />
        <button type="submit">Submit</button>
    </form>
</div>
```

### Step 3: Create Trigger Link

Add a link that opens the modal:

```html
<a href="#TB_inline?&width=500&height=300&inlineId=my-modal-content"
   class="thickbox"
   title="My Modal Title">
    Open Modal
</a>
```

## URL Parameters

ThickBox supports several URL parameters:

- `width` - Modal width in pixels
- `height` - Modal height in pixels
- `inlineId` - ID of the hidden content div
- `modal` - Set to `true` to disable close on background click

Example:
```html
<a href="#TB_inline?width=600&height=400&inlineId=my-content&modal=true"
   class="thickbox">
    Open Modal
</a>
```

## Opening External Content

Load content from another URL:

```html
<!-- Load a page in iframe -->
<a href="https://example.com?TB_iframe=true&width=800&height=600"
   class="thickbox"
   title="External Page">
    Open External
</a>

<!-- Load via AJAX -->
<a href="/ajax-content.php?TB_ajax=true&width=500&height=400"
   class="thickbox">
    Load via AJAX
</a>
```

## JavaScript Control

Open and close ThickBox programmatically:

```javascript
// Open ThickBox
tb_show('Modal Title', '#TB_inline?width=500&height=300&inlineId=my-content');

// Close ThickBox
tb_remove();

// With jQuery
jQuery(document).ready(function($) {
    $('#open-modal-btn').click(function(e) {
        e.preventDefault();
        tb_show('My Title', '#TB_inline?width=600&height=400&inlineId=my-content');
    });
});
```

## Complete Example

```php
<?php
// functions.php
function my_thickbox_demo() {
    add_thickbox();
}
add_action('wp_enqueue_scripts', 'my_thickbox_demo');
?>

<!-- In your template -->
<div class="modal-demo">
    <!-- Trigger Button -->
    <a href="#TB_inline?width=500&height=350&inlineId=contact-form-modal"
       class="thickbox button"
       title="Contact Us">
        Open Contact Form
    </a>

    <!-- Hidden Modal Content -->
    <div id="contact-form-modal" style="display:none;">
        <div class="modal-content">
            <h3>Contact Us</h3>
            <form id="modal-contact-form">
                <p>
                    <label>Name:</label>
                    <input type="text" name="name" required />
                </p>
                <p>
                    <label>Email:</label>
                    <input type="email" name="email" required />
                </p>
                <p>
                    <label>Message:</label>
                    <textarea name="message" rows="4" required></textarea>
                </p>
                <p>
                    <button type="submit">Send Message</button>
                    <button type="button" onclick="tb_remove();">Cancel</button>
                </p>
            </form>
        </div>
    </div>
</div>

<style>
.modal-content {
    padding: 20px;
}
.modal-content label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}
.modal-content input,
.modal-content textarea {
    width: 100%;
    padding: 8px;
    margin-bottom: 15px;
}
</style>
```

## Image Gallery

ThickBox also works for image galleries:

```html
<a href="large-image-1.jpg"
   class="thickbox"
   rel="gallery"
   title="Image 1">
    <img src="thumbnail-1.jpg" alt="Thumbnail 1" />
</a>

<a href="large-image-2.jpg"
   class="thickbox"
   rel="gallery"
   title="Image 2">
    <img src="thumbnail-2.jpg" alt="Thumbnail 2" />
</a>
```

The `rel="gallery"` attribute groups images for navigation.

## Notes

- ThickBox is included in WordPress admin by default
- For frontend use, you must call `add_thickbox()`
- Consider alternatives like Fancybox for more features

---

*Building custom WordPress functionality? [Get in touch](/contact).*
