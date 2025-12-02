
import os

filepath = r"f:\genmini\japness\변환\fam\js\learning\conversation.js"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# We want to keep lines 0 to 15483 (inclusive, 0-indexed)
# And lines from 15721 onwards (inclusive)
# Note: line numbers in my view were 1-indexed.
# So 1-indexed 15483 is index 15482.
# 1-indexed 15721 is index 15720.

# Let's verify the content at the cut points to be safe.
cut_start_index = 15483 # Line 15484
cut_end_index = 15720   # Line 15721

print(f"Line at cut start ({cut_start_index}): {lines[cut_start_index].strip()}")
print(f"Line at cut end ({cut_end_index}): {lines[cut_end_index].strip()}")

# Adjusting indices if needed based on content
# We expect cut_start to be the start of the duplicate block (my comment or 'function initConversation')
# We expect cut_end to be '// =========================================='

new_lines = lines[:cut_start_index] + lines[cut_end_index:]

with open(filepath, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print(f"Removed lines {cut_start_index+1} to {cut_end_index}")
