A quick guide to installing mod_wsgi on macOS for running Django applications with Apache.

## Prerequisites

- macOS with Homebrew installed
- Apache (comes pre-installed on macOS)
- Python installed

## Installation Steps

### Step 1: Add Homebrew Apache Tap

```bash
brew tap homebrew/apache
```

### Step 2: Install mod_wsgi

```bash
brew install mod_wsgi
```

This installs mod_wsgi compiled against your system's Python.

### Step 3: Configure Apache

Edit your Apache configuration file:

```bash
sudo nano /etc/apache2/httpd.conf
```

Add the LoadModule directive. The path depends on your Homebrew installation:

```apache
LoadModule wsgi_module /usr/local/Cellar/mod_wsgi/4.9.4/libexec/mod_wsgi.so
```

**Note:** Check your actual installed version:
```bash
ls /usr/local/Cellar/mod_wsgi/
```

### Step 4: Test Configuration

Before restarting Apache, test the configuration:

```bash
apachectl configtest
```

You should see `Syntax OK`.

### Step 5: Restart Apache

```bash
sudo apachectl restart
```

## Verify Installation

Check if mod_wsgi is loaded:

```bash
apachectl -M | grep wsgi
```

You should see `wsgi_module (shared)`.

## Basic Django Configuration

Create a WSGI configuration for your Django project:

```apache
# /etc/apache2/other/myproject.conf

<VirtualHost *:80>
    ServerName myproject.local
    DocumentRoot /path/to/myproject

    WSGIDaemonProcess myproject python-path=/path/to/myproject python-home=/path/to/venv
    WSGIProcessGroup myproject
    WSGIScriptAlias / /path/to/myproject/myproject/wsgi.py

    <Directory /path/to/myproject/myproject>
        <Files wsgi.py>
            Require all granted
        </Files>
    </Directory>

    Alias /static /path/to/myproject/static
    <Directory /path/to/myproject/static>
        Require all granted
    </Directory>

    Alias /media /path/to/myproject/media
    <Directory /path/to/myproject/media>
        Require all granted
    </Directory>

    ErrorLog "/var/log/apache2/myproject-error.log"
    CustomLog "/var/log/apache2/myproject-access.log" common
</VirtualHost>
```

## Troubleshooting

### Python Version Mismatch

If you get Python version errors, ensure mod_wsgi was compiled with the same Python version:

```bash
# Check mod_wsgi Python version
python -c "import sys; print(sys.version)"

# Reinstall with specific Python
brew reinstall mod_wsgi --with-python@3.9
```

### Permission Issues

Ensure Apache can read your project files:

```bash
chmod -R 755 /path/to/myproject
```

### Check Apache Error Log

```bash
tail -f /var/log/apache2/error_log
```

## Alternative: Use mod_wsgi-express

For development, `mod_wsgi-express` is simpler:

```bash
pip install mod-wsgi
mod_wsgi-express start-server myproject/wsgi.py --port 8000
```

## References

- [mod_wsgi Documentation](https://modwsgi.readthedocs.io/)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)

---

*Need help deploying Django applications? [Get in touch](/contact).*
