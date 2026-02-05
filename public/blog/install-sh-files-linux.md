A quick guide to installing shell script (.sh) files on Linux.

## Overview

Many software packages for Linux come as shell scripts (.sh files). Here's how to install them.

## Step-by-Step Guide

### Step 1: Download the File

Download the `.sh` file and save it to a known location, such as your Desktop.

### Step 2: Open Terminal

Open the Terminal application from your system menu (usually under Accessories or System Tools).

### Step 3: Navigate to the File Location

```bash
cd ~/Desktop
```

This changes your working directory to the Desktop where the file is saved.

### Step 4: Make the File Executable

```bash
chmod +x name_of_file.sh
```

This grants execute permissions to the script.

### Step 5: Run the Installation

```bash
sh ./name_of_file.sh
```

Or alternatively:

```bash
./name_of_file.sh
```

### Step 6: Follow the Prompts

The installer will guide you through the rest of the process.

## Quick Reference

```bash
# All commands in sequence
cd ~/Desktop
chmod +x installer.sh
./installer.sh
```

## Running with sudo

Some installers require administrator privileges:

```bash
sudo ./name_of_file.sh
```

You'll be prompted for your password.

## Common Issues

### Permission Denied

If you get "Permission denied", make sure you ran `chmod +x`:

```bash
chmod +x script.sh
```

### Bad Interpreter

If you see "bad interpreter" error, the script may have Windows line endings. Fix with:

```bash
sed -i 's/\r$//' script.sh
```

---

*Working with Linux? [Get in touch](/contact).*
