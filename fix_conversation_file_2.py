
import os

filepath = r"f:\genmini\japness\변환\fam\js\learning\conversation.js"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We want to remove lines 15519 to 15564 (1-indexed)
# 0-indexed: 15518 to 15563

cut_start_index = 15518 # Line 15519
cut_end_index = 15564   # Line 15565 (The line AFTER the cut)

print(f"Line at cut start ({cut_start_index}): {lines[cut_start_index].strip()}")
print(f"Line at cut end ({cut_end_index}): {lines[cut_end_index].strip()}")

# We want to keep lines before cut_start, and lines from cut_end onwards.
new_lines = lines[:cut_start_index] + lines[cut_end_index:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Removed lines {cut_start_index+1} to {cut_end_index}")
