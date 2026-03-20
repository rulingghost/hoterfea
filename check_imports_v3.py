
import os
import re

src_dir = r"c:\Users\gebca\Desktop\iş,\otelcrmerp\src"

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(".jsx") or file.endswith(".js"):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if "<CheckCircle" in content:
                        import_match = re.search(r"import\s+\{([^}]*)\}\s+from\s+['\"]lucide-react['\"]", content, re.DOTALL)
                        imported_icons = []
                        if import_match:
                            imported_icons = [i.strip() for i in import_match.group(1).split(',')]
                        
                        if "CheckCircle" not in imported_icons:
                            if not re.search(r"(const|function)\s+CheckCircle", content):
                                print(f"MISSING: {file}")
            except:
                pass
