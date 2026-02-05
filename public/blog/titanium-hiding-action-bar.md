Learn how to hide the Action Bar in Titanium mobile applications using JavaScript and theme modifications.

## Overview

When building Android apps with Titanium, you may want to hide the Action Bar for a cleaner full-screen experience. Here are two approaches.

## Method 1: JavaScript (Runtime)

Hide the Action Bar after the window opens:

```javascript
var win = Ti.UI.createWindow({
    backgroundColor: '#fff',
    title: 'My App'
});

win.addEventListener('open', function() {
    if (win.activity && win.activity.actionBar) {
        win.activity.actionBar.hide();
    }
});

win.open();
```

For a TabGroup:

```javascript
var tabGroup = Ti.UI.createTabGroup();

tabGroup.addEventListener('open', function() {
    if (tabGroup.activity && tabGroup.activity.actionBar) {
        tabGroup.activity.actionBar.hide();
    }
});
```

## Method 2: Theme Modification (Recommended)

For automatic hiding on all windows, create a custom theme.

### Step 1: Create Custom Theme

Create the file `platform/android/res/values/custom_theme.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <style name="Theme.NoActionBar" parent="@style/Theme.AppCompat">
        <item name="android:windowActionBar">false</item>
        <item name="android:windowNoTitle">true</item>
    </style>

    <!-- For full-screen without status bar -->
    <style name="Theme.Fullscreen" parent="@style/Theme.AppCompat">
        <item name="android:windowActionBar">false</item>
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowFullscreen">true</item>
    </style>
</resources>
```

### Step 2: Update tiapp.xml

Apply the theme in your `tiapp.xml`:

```xml
<android xmlns:android="http://schemas.android.com/apk/res/android">
    <manifest>
        <application android:theme="@style/Theme.NoActionBar"/>
    </manifest>
</android>
```

Or apply to specific activities:

```xml
<android xmlns:android="http://schemas.android.com/apk/res/android">
    <manifest>
        <application>
            <activity android:name=".MyActivity"
                      android:theme="@style/Theme.NoActionBar"/>
        </application>
    </manifest>
</android>
```

## Customizing Cursor Color

While modifying themes, you can also customize input cursor color:

### Create colors.xml

Create `platform/android/res/values/colors.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="cursor_color">#FF5722</color>
    <color name="primary_color">#3F51B5</color>
    <color name="accent_color">#FF5722</color>
</resources>
```

### Create cursor drawable

Create `platform/android/res/drawable/cursor.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <size android:width="2dp" />
    <solid android:color="@color/cursor_color" />
</shape>
```

### Apply in theme

Update your `custom_theme.xml`:

```xml
<style name="Theme.Custom" parent="@style/Theme.AppCompat">
    <item name="android:windowActionBar">false</item>
    <item name="android:windowNoTitle">true</item>
    <item name="android:textCursorDrawable">@drawable/cursor</item>
    <item name="colorPrimary">@color/primary_color</item>
    <item name="colorAccent">@color/accent_color</item>
</style>
```

## Conditional Action Bar

Show/hide Action Bar based on conditions:

```javascript
function toggleActionBar(win, show) {
    if (win.activity && win.activity.actionBar) {
        if (show) {
            win.activity.actionBar.show();
        } else {
            win.activity.actionBar.hide();
        }
    }
}

// Usage
toggleActionBar(win, false); // Hide
toggleActionBar(win, true);  // Show
```

## Notes

- Theme modifications require a clean rebuild
- JavaScript method may show a brief flash of the Action Bar
- Theme method is more reliable for consistent behavior

---

*Building mobile apps with Titanium? [Let's discuss](/contact).*
