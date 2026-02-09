import os
import requests

# The official repository for all FIGlet fonts
BASE_URL = "https://raw.githubusercontent.com/patorjk/figlet.js/master/fonts/"

# We'll get the list of fonts from the GitHub API
API_URL = "https://api.github.com/repos/patorjk/figlet.js/contents/fonts"

def download_fonts():
    if not os.path.exists('public/fonts'):
        os.makedirs('public/fonts')
        print("Created public/fonts/ directory.")

    print("Fetching font list...")
    response = requests.get(API_URL)
    if response.status_code != 200:
        print("Failed to fetch font list. Try again later.")
        return

    fonts = response.json()
    count = 0

    for file in fonts:
        if file['name'].endswith('.flf'):
            font_name = file['name']
            file_url = BASE_URL + font_name
            
            print(f"Downloading {font_name}...")
            r = requests.get(file_url)
            with open(f"public/fonts/{font_name}", 'wb') as f:
                f.write(r.content)
            count += 1

    print(f"\nFinished! Downloaded {count} fonts into the 'public/fonts/' folder.")

if __name__ == "__main__":
    download_fonts()
