import os
import re

# Google Analytics code to insert
google_analytics_code = '''
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-LR6C288XK0"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-LR6C288XK0');
    </script>
'''

def add_google_analytics_to_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Check if Google Analytics is already present
        if 'googletagmanager.com/gtag/js' in content:
            print(f"Skipping {file_path} - Google Analytics already exists")
            return False
            
        # Insert after the <head> tag
        new_content = re.sub(r'(<head[^>]*>)', 
                           r'\1\n' + google_analytics_code, 
                           content, 
                           flags=re.IGNORECASE)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {file_path}")
            return True
        else:
            print(f"Could not find <head> tag in {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return False

def main():
    # Get all HTML files in the current directory and subdirectories
    html_files = []
    for root, _, files in os.walk('.'):
        for file in files:
            if file.lower().endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    # Process each HTML file
    updated_count = 0
    for file_path in html_files:
        if add_google_analytics_to_file(file_path):
            updated_count += 1
    
    print(f"\nProcessing complete. Updated {updated_count} out of {len(html_files)} HTML files.")

if __name__ == "__main__":
    main()
