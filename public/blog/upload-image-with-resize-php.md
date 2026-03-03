---
title: "Upload Image with Resize in PHP"
slug: "upload-image-with-resize-php"
date: "2015-11-24"
excerpt: "Handle image uploads with automatic resizing using PHP's GD library."
cover: "/blog/images/php-image-cover.jpg"
readTime: "5 min read"
category: "PHP"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

This tutorial demonstrates how to handle image uploads with automatic resizing functionality in PHP using the GD library.

## Overview

When handling user uploads, especially profile pictures or avatars, you often need to resize images to maintain consistency and save storage. This PHP implementation handles JPEG, PNG, and GIF formats while maintaining aspect ratios.

## The Resize Function

```php
function resize_image($file, $max_width = 200, $max_height = 200) {
    // Get image info
    $image_info = getimagesize($file);
    $width = $image_info[0];
    $height = $image_info[1];
    $mime = $image_info['mime'];

    // Calculate new dimensions
    $ratio = min($max_width / $width, $max_height / $height);
    $new_width = round($width * $ratio);
    $new_height = round($height * $ratio);

    // Create new image
    $new_image = imagecreatetruecolor($new_width, $new_height);

    // Load source image based on type
    switch ($mime) {
        case 'image/jpeg':
            $source = imagecreatefromjpeg($file);
            break;
        case 'image/png':
            $source = imagecreatefrompng($file);
            // Preserve transparency
            imagealphablending($new_image, false);
            imagesavealpha($new_image, true);
            break;
        case 'image/gif':
            $source = imagecreatefromgif($file);
            break;
        default:
            return false; // Unsupported file type
    }

    // Resize
    imagecopyresampled(
        $new_image, $source,
        0, 0, 0, 0,
        $new_width, $new_height,
        $width, $height
    );

    return $new_image;
}
```

## Helper Function for Dimensions

```php
function get_image_ratio_height_width($file, $max_size = 200) {
    list($width, $height) = getimagesize($file);

    if ($width > $height) {
        $new_width = $max_size;
        $new_height = round($height * ($max_size / $width));
    } else {
        $new_height = $max_size;
        $new_width = round($width * ($max_size / $height));
    }

    return array(
        'width' => $new_width,
        'height' => $new_height
    );
}
```

## Complete Upload Handler

```php
function handle_avatar_upload($file, $user_id) {
    $allowed_types = array('image/jpeg', 'image/png', 'image/gif');

    // Validate file type
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, $allowed_types)) {
        return array('error' => 'Unsupported file type');
    }

    // Resize image
    $resized = resize_image($file['tmp_name'], 200, 200);

    if (!$resized) {
        return array('error' => 'Failed to process image');
    }

    // Save resized image
    $upload_dir = "uploads/avatars/{$user_id}/";
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }

    $filename = $upload_dir . time() . '-avatar.jpg';

    // Save as JPEG for consistency
    imagejpeg($resized, $filename, 90);
    imagedestroy($resized);

    return array('success' => true, 'path' => $filename);
}
```

## Usage Example

```php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['avatar'])) {
    $user_id = get_current_user_id();
    $result = handle_avatar_upload($_FILES['avatar'], $user_id);

    if (isset($result['error'])) {
        echo "Error: " . $result['error'];
    } else {
        echo "Avatar uploaded successfully!";
    }
}
```

## Key Points

1. **Always validate file types** - Check MIME type, not just extension
2. **Maintain aspect ratio** - Don't distort images when resizing
3. **Handle transparency** - PNG files need special handling for alpha channels
4. **Use quality settings** - Balance file size vs image quality
5. **Organize uploads** - Use user-specific directories

---

*Need help with image processing in your PHP application? [Get in touch](/contact).*
