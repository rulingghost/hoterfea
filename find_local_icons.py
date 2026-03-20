import os
import re

search_dir = r"c:\Users\gebca\Desktop\iş,\otelcrmerp\src"

files_with_local_icons = []

pattern = re.compile(r"const\s+(\w+)\s*=\s*(?:\([^)]*\)|(\w+))\s*=>\s*\(\s*<svg", re.DOTALL)

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith(".jsx") or file.endswith(".js"):
            path = os.path.join(root, file)
            try:
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    matches = pattern.findall(content)
                    if matches:
                        icons = [m[0] for m in matches]
                        files_with_local_icons.append((path, icons))
            except Exception as e:
                pass

for path, icons in files_with_local_icons:
    print(f"FILE: {os.path.basename(path)}")
    print(f"ICONS: {','.join(icons)}")
