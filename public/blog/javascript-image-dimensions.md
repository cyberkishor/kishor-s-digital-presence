---
title: "Get Image Dimensions with JavaScript"
slug: "javascript-image-dimensions"
date: "2014-06-05"
excerpt: "Multiple methods to get image width and height dynamically using JavaScript."
cover: "/blog/images/javascript-cover.jpg"
readTime: "6 min read"
category: "JavaScript"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Learn how to get image dimensions (width and height) dynamically using JavaScript.

## Overview

When working with images in JavaScript, you often need to know their dimensions before displaying or processing them. Here are several methods to achieve this.

## Method 1: Using Image Object

```javascript
function getImageSize(imgSrc) {
    var img = new Image();

    img.onload = function() {
        console.log('Width:', this.width);
        console.log('Height:', this.height);
    };

    img.src = imgSrc;
}

// Usage
getImageSize('path/to/image.jpg');
```

## Method 2: With Callback

```javascript
function getImageDimensions(url, callback) {
    var img = new Image();

    img.onload = function() {
        callback({
            width: this.width,
            height: this.height
        });
    };

    img.onerror = function() {
        callback(null);
    };

    img.src = url;
}

// Usage
getImageDimensions('image.jpg', function(dimensions) {
    if (dimensions) {
        console.log('Size:', dimensions.width + 'x' + dimensions.height);
    } else {
        console.log('Failed to load image');
    }
});
```

## Method 3: Using Promises

```javascript
function getImageSize(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
            resolve({
                width: img.width,
                height: img.height,
                aspectRatio: img.width / img.height
            });
        };

        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };

        img.src = url;
    });
}

// Usage with async/await
async function processImage(url) {
    try {
        const size = await getImageSize(url);
        console.log(`Image is ${size.width}x${size.height}`);
        console.log(`Aspect ratio: ${size.aspectRatio.toFixed(2)}`);
    } catch (error) {
        console.error(error.message);
    }
}

processImage('photo.jpg');
```

## Method 4: From DOM Element

```javascript
// For images already in the DOM
function getDOMImageSize(imgElement) {
    // Natural dimensions (actual image size)
    console.log('Natural:', imgElement.naturalWidth, 'x', imgElement.naturalHeight);

    // Displayed dimensions (CSS affected)
    console.log('Displayed:', imgElement.width, 'x', imgElement.height);

    return {
        natural: {
            width: imgElement.naturalWidth,
            height: imgElement.naturalHeight
        },
        displayed: {
            width: imgElement.width,
            height: imgElement.height
        }
    };
}

// Usage
var img = document.getElementById('myImage');
var sizes = getDOMImageSize(img);
```

## Method 5: File Input Preview

Get dimensions when user selects a file:

```javascript
document.getElementById('fileInput').addEventListener('change', function(e) {
    var file = e.target.files[0];

    if (file && file.type.match('image.*')) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var img = new Image();

            img.onload = function() {
                console.log('Selected image:', this.width, 'x', this.height);

                // Validate dimensions
                if (this.width < 100 || this.height < 100) {
                    alert('Image too small! Minimum 100x100 required.');
                }
            };

            img.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});
```

## Method 6: jQuery Version

```javascript
function getImgSize(imgSrc) {
    var newImg = new Image();
    newImg.src = imgSrc;

    $(newImg).on('load', function() {
        var width = this.width;
        var height = this.height;

        alert('Image size: ' + width + ' x ' + height);

        return { width: width, height: height };
    });
}
```

## Practical Example: Image Validator

```javascript
class ImageValidator {
    constructor(options = {}) {
        this.minWidth = options.minWidth || 0;
        this.maxWidth = options.maxWidth || Infinity;
        this.minHeight = options.minHeight || 0;
        this.maxHeight = options.maxHeight || Infinity;
        this.maxFileSize = options.maxFileSize || Infinity;
    }

    validate(file) {
        return new Promise((resolve, reject) => {
            // Check file size
            if (file.size > this.maxFileSize) {
                reject(new Error(`File too large. Max size: ${this.maxFileSize} bytes`));
                return;
            }

            // Check dimensions
            const reader = new FileReader();

            reader.onload = (e) => {
                const img = new Image();

                img.onload = () => {
                    const errors = [];

                    if (img.width < this.minWidth) {
                        errors.push(`Width must be at least ${this.minWidth}px`);
                    }
                    if (img.width > this.maxWidth) {
                        errors.push(`Width must be at most ${this.maxWidth}px`);
                    }
                    if (img.height < this.minHeight) {
                        errors.push(`Height must be at least ${this.minHeight}px`);
                    }
                    if (img.height > this.maxHeight) {
                        errors.push(`Height must be at most ${this.maxHeight}px`);
                    }

                    if (errors.length > 0) {
                        reject(new Error(errors.join(', ')));
                    } else {
                        resolve({
                            width: img.width,
                            height: img.height,
                            size: file.size,
                            type: file.type
                        });
                    }
                };

                img.onerror = () => reject(new Error('Invalid image file'));
                img.src = e.target.result;
            };

            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsDataURL(file);
        });
    }
}

// Usage
const validator = new ImageValidator({
    minWidth: 800,
    minHeight: 600,
    maxWidth: 4000,
    maxHeight: 3000,
    maxFileSize: 5 * 1024 * 1024 // 5MB
});

document.getElementById('upload').addEventListener('change', async (e) => {
    try {
        const result = await validator.validate(e.target.files[0]);
        console.log('Valid image:', result);
    } catch (error) {
        alert(error.message);
    }
});
```

---

*Need help with image processing in JavaScript? [Get in touch](/contact).*
