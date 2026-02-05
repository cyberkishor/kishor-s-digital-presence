Build an autocomplete search feature using jQuery, AJAX, PHP, and MySQL.

## Overview

Autocomplete functionality improves user experience by suggesting matches as users type. This tutorial explains how to build one from scratch, focusing on understanding the "how and why" rather than just providing code.

## Database Setup

First, create a simple database table:

```sql
CREATE DATABASE autoComplete;
USE autoComplete;

CREATE TABLE countries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    value VARCHAR(100) NOT NULL
);

INSERT INTO countries (value) VALUES
('Afghanistan'),
('Albania'),
('United States'),
('United Kingdom'),
('Nepal'),
('India'),
('Australia');
```

## HTML Structure

```html
<!DOCTYPE html>
<html>
<head>
    <title>Autocomplete Demo</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
        .suggestions {
            border: 1px solid #ccc;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        }
        .suggestions ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        .suggestions li {
            padding: 8px 12px;
            cursor: pointer;
        }
        .suggestions li:hover {
            background: #f0f0f0;
        }
    </style>
</head>
<body>
    <input type="text" id="search" onkeyup="lookup(this.value)" autocomplete="off" />
    <div id="suggestions" class="suggestions"></div>

    <script src="autocomplete.js"></script>
</body>
</html>
```

## JavaScript (autocomplete.js)

```javascript
function lookup(query) {
    if (query.length < 2) {
        $('#suggestions').hide();
        return;
    }

    $.ajax({
        url: 'search.php',
        type: 'POST',
        data: { query: query },
        success: function(data) {
            if (data) {
                $('#suggestions').html(data).show();
            } else {
                $('#suggestions').hide();
            }
        }
    });
}

function selectItem(value) {
    $('#search').val(value);
    $('#suggestions').hide();
}
```

## PHP Backend (search.php)

```php
<?php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'autoComplete');

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}

if (isset($_POST['query']) && strlen($_POST['query']) >= 2) {
    $query = $mysqli->real_escape_string($_POST['query']);

    $sql = "SELECT value FROM countries WHERE value LIKE '$query%' LIMIT 10";
    $result = $mysqli->query($sql);

    if ($result->num_rows > 0) {
        echo '<ul>';
        while ($row = $result->fetch_assoc()) {
            $value = htmlspecialchars($row['value']);
            echo "<li onclick=\"selectItem('$value')\">$value</li>";
        }
        echo '</ul>';
    }
}

$mysqli->close();
?>
```

## How It Works

1. **User Types** - The `onkeyup` event triggers the `lookup()` function
2. **AJAX Request** - jQuery sends the query to `search.php`
3. **Database Query** - PHP searches for matches using `LIKE` with wildcard
4. **Display Results** - Matching results appear in a dropdown
5. **Selection** - Clicking an item populates the input field

## The SQL LIKE Operator

```sql
SELECT value FROM countries WHERE value LIKE 'Uni%' LIMIT 10
```

The `%` wildcard matches any characters after "Uni", returning:
- United States
- United Kingdom

## Enhanced Version with Debouncing

```javascript
var timeout = null;

function lookup(query) {
    clearTimeout(timeout);

    if (query.length < 2) {
        $('#suggestions').hide();
        return;
    }

    timeout = setTimeout(function() {
        $.ajax({
            url: 'search.php',
            type: 'POST',
            data: { query: query },
            success: function(data) {
                if (data) {
                    $('#suggestions').html(data).show();
                } else {
                    $('#suggestions').hide();
                }
            }
        });
    }, 300); // Wait 300ms after typing stops
}
```

Debouncing reduces server requests by waiting until the user pauses typing.

---

*Building interactive web applications? [Get in touch](/contact).*
