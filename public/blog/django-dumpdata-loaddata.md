---
title: "Django dumpdata and loaddata"
slug: "django-dumpdata-loaddata"
date: "2015-08-06"
excerpt: "Master Django's database backup and restoration commands for data migration."
cover: "/blog/images/django-cover.jpg"
readTime: "5 min read"
category: "Django"
author: "Kishor Kumar Mahato"
status: "published"
featured: "false"
---

Django's `dumpdata` and `loaddata` management commands are essential tools for database backup, data migration, and fixture management. This guide covers practical usage patterns.

## dumpdata Command

The `dumpdata` command exports database records to serialized formats (JSON, XML, or YAML).

### Basic Usage

**Export entire database:**
```bash
./manage.py dumpdata > db.json
```

**Export specific app:**
```bash
./manage.py dumpdata admin > admin.json
./manage.py dumpdata auth > auth.json
```

**Export specific model:**
```bash
./manage.py dumpdata admin.logentry > logentry.json
./manage.py dumpdata auth.user > users.json
```

### Formatting Options

**With indentation (readable output):**
```bash
./manage.py dumpdata auth.user --indent 2 > users.json
```

**Different formats:**
```bash
# JSON (default)
./manage.py dumpdata auth.user --indent 2 --format json > users.json

# XML
./manage.py dumpdata auth.user --indent 2 --format xml > users.xml

# YAML (requires PyYAML)
./manage.py dumpdata auth.user --indent 2 --format yaml > users.yaml
```

### Excluding Models

**Exclude specific models:**
```bash
./manage.py dumpdata --exclude auth.permission > db.json
./manage.py dumpdata --exclude contenttypes > db.json
```

**Multiple exclusions:**
```bash
./manage.py dumpdata --exclude auth.permission --exclude contenttypes --exclude admin.logentry > db.json
```

## loaddata Command

The `loaddata` command imports fixtures into the database.

### Basic Usage

```bash
./manage.py loaddata db.json
./manage.py loaddata users.json
```

### Loading Multiple Fixtures

```bash
./manage.py loaddata users.json products.json orders.json
```

## Common Scenarios

### Scenario 1: Full Database Backup

```bash
# Backup
./manage.py dumpdata --indent 2 > backup_$(date +%Y%m%d).json

# Restore
./manage.py loaddata backup_20150806.json
```

### Scenario 2: Transfer Data to New Project

When moving data to a fresh database, exclude auto-generated tables:

```bash
# Export (excluding problematic tables)
./manage.py dumpdata \
    --exclude auth.permission \
    --exclude contenttypes \
    --indent 2 > data.json

# On new project, first run migrations
./manage.py migrate

# Then load data
./manage.py loaddata data.json
```

### Scenario 3: Create Test Fixtures

```bash
# Export specific test data
./manage.py dumpdata myapp.Product --indent 2 > myapp/fixtures/products.json

# Load in tests
./manage.py loaddata products
```

### Scenario 4: User Data Migration

```bash
# Export users without permissions
./manage.py dumpdata auth.user --indent 2 > users.json

# Export groups
./manage.py dumpdata auth.group --indent 2 > groups.json
```

## Avoiding IntegrityError

The most common issue when loading data is `IntegrityError` related to content types and permissions. Always exclude these when creating portable fixtures:

```bash
./manage.py dumpdata \
    --exclude auth.permission \
    --exclude contenttypes \
    --exclude admin.logentry \
    --exclude sessions.session \
    --indent 2 > portable_backup.json
```

## Using Natural Keys

For more portable fixtures, use natural keys:

```bash
./manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission > db.json
```

## Pro Tips

1. **Always use `--indent`** for human-readable backups
2. **Exclude session data** - it's temporary and user-specific
3. **Test your fixtures** - try loading on a fresh database
4. **Version control fixtures** - keep test fixtures in your repo
5. **Use app-specific dumps** - easier to manage than full database dumps

## Example Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="backups"

mkdir -p $BACKUP_DIR

./manage.py dumpdata \
    --exclude auth.permission \
    --exclude contenttypes \
    --exclude admin.logentry \
    --exclude sessions.session \
    --indent 2 \
    > "$BACKUP_DIR/backup_$DATE.json"

echo "Backup created: $BACKUP_DIR/backup_$DATE.json"
```

---

*Need help with Django data management? [Get in touch](/contact).*
