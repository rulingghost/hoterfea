import os
import re

search_dir = r"c:\Users\gebca\Desktop\iş,\otelcrmerp\src"
target_icon = "CheckCircle"

files_with_icon_but_no_import = []

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".jsx") or file.endswith(".js"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    lines = f.readlines()
                    content = "".join(lines)
                    if target_icon in content:
                        # Find the import block for lucide-react
                        match = re.search(r"import\s+\{([^}]+)\}\s+from\s+['\"]lucide-react['\"]", content, re.DOTALL)
                        if not match or target_icon not in match.group(1):
                            print(f"File: {path}")
                            # Print lines containing the icon
                            for i, line in enumerate(lines):
                                if target_icon in line:
                                    print(f"  Line {i+1}: {line.strip()}")
            except Exception as e:
                pass
