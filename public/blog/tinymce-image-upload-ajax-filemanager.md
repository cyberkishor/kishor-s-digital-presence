---
title: "TinyMCE Image Upload with Ajax File Manager"
slug: "tinymce-image-upload-ajax-filemanager"
date: "2013-06-05"
excerpt: "Add image upload functionality to TinyMCE editor using Ajax File Manager plugin."
cover: "/blog/images/javascript-cover.jpg"
readTime: "5 min read"
category: "JavaScript"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to add image upload functionality to TinyMCE editor using Ajax File Manager plugin.

## Overview

TinyMCE is a powerful rich text editor, but it lacks built-in image upload functionality. This tutorial shows how to integrate Ajax File Manager to enable image uploads directly within the editor.

## The Solution

Integrate Ajax File Manager by implementing a custom callback function.

### Step 1: Configure TinyMCE

Add the file browser callback to your TinyMCE initialization:

```javascript
tinyMCE.init({
    theme: "advanced",
    mode: "textareas",
    plugins: "advimage,advlink,media,contextmenu",

    // Enable file browser callback
    file_browser_callback: "ajaxfilemanager",

    // URL settings for full paths
    relative_urls: false,
    remove_script_host: false,
    convert_urls: true
});
```

### Step 2: Create the Callback Function

```javascript
function ajaxfilemanager(field_name, url, type, win) {
    var fileBrowserWindow;

    switch (type) {
        case "image":
            fileBrowserWindow = "path/to/ajaxfilemanager/ajaxfilemanager.php";
            break;
        case "media":
            fileBrowserWindow = "path/to/ajaxfilemanager/ajaxfilemanager.php";
            break;
        case "flash":
            fileBrowserWindow = "path/to/ajaxfilemanager/ajaxfilemanager.php";
            break;
        case "file":
            fileBrowserWindow = "path/to/ajaxfilemanager/ajaxfilemanager.php";
            break;
        default:
            return false;
    }

    tinyMCE.activeEditor.windowManager.open({
        title: "Ajax File Manager",
        url: fileBrowserWindow,
        width: 782,
        height: 440,
        inline: "yes",
        close_previous: "no"
    }, {
        window: win,
        input: field_name
    });

    return false;
}
```

## Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>TinyMCE with Image Upload</title>
    <script src="tinymce/tinymce.min.js"></script>
    <script>
    tinyMCE.init({
        selector: "textarea",
        theme: "advanced",
        plugins: [
            "advimage advlink media contextmenu paste"
        ],
        toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright | bullist numlist | link image media",

        file_browser_callback: "ajaxfilemanager",

        relative_urls: false,
        remove_script_host: false,
        convert_urls: true
    });

    function ajaxfilemanager(field_name, url, type, win) {
        tinyMCE.activeEditor.windowManager.open({
            title: "Ajax File Manager",
            url: "ajaxfilemanager/ajaxfilemanager.php",
            width: 782,
            height: 440,
            inline: "yes"
        }, {
            window: win,
            input: field_name
        });
    }
    </script>
</head>
<body>
    <form method="post">
        <textarea name="content" rows="15"></textarea>
        <button type="submit">Save</button>
    </form>
</body>
</html>
```

## Configuration Options

For proper URL handling, these settings are important:

- `relative_urls: false` - Use absolute URLs
- `remove_script_host: false` - Keep the domain in URLs
- `convert_urls: true` - Convert URLs to proper format

## Notes

- Ajax File Manager must be installed separately
- Configure file upload permissions on your server
- Set appropriate file size limits in PHP

---

*Building a content management system? [Let's discuss](/contact).*
