# ASCII Studio Makefile

.PHONY: help serve setup download-fonts clean

# Default target
help:
	@echo "Usage:"
	@echo "  make serve          Start a local web server to view the app"
	@echo "  make setup          Create a virtual environment and install dependencies"
	@echo "  make download-fonts Download the default font collection"
	@echo "  make clean          Remove temporary files and virtual environment"

# Start a local web server
serve:
	@echo "Starting server at http://localhost:8000..."
	@python3 -m http.server 8000

# Setup the Python environment
setup:
	@echo "Creating virtual environment..."
	@python3 -m venv venv
	@echo "Installing dependencies..."
	@./venv/bin/pip install requests

# Download fonts using the script
download-fonts:
	@if [ ! -d "venv" ]; then make setup; fi
	@echo "Downloading fonts..."
	@./venv/bin/python scripts/download_fonts.py

# Clean up
clean:
	@echo "Cleaning up..."
	@rm -rf venv
	@find . -type d -name "__pycache__" -exec rm -rf {} +
