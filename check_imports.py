
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
                    if "CheckCircle" not in content.split("import")[1].split(";")[0] if "import" in content else True:
                         print(f"MISSING IMPORT: {path}")
                    else:
                        print(f"OK: {path}")
