
import os
import re

src_dir = r"c:\Users\gebca\Desktop\iş,\otelcrmerp\src"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".jsx") or file.endswith(".js"):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
                if "<CheckCircle" in content:
                    # Check if CheckCircle is imported from lucide-react
                    if not re.search(r"import\s+\{[^}]*CheckCircle[^}]*\}\s+from\s+['\"]lucide-react['\"]", content):
                         # Also check if it's defined manually
                         if not re.search(r"const\s+CheckCircle\s+=", content) and not re.search(r"function\s+CheckCircle", content):
                             print(f"MISSING: {path}")
                    else:
                        print(f"OK: {path}")
