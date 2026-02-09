#!/bin/bash

# Check if TRACK argument is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <track_id>"
  echo "Example: $0 my_track_20260101"
  exit 1
fi

TRACK_ID="$1"
TRACKS_DIR="conductor/tracks"
ARCHIVE_DIR="conductor/archive"
REGISTRY_FILE="conductor/tracks.md"

SOURCE_PATH="${TRACKS_DIR}/${TRACK_ID}"
DEST_PATH="${ARCHIVE_DIR}/${TRACK_ID}"

# 1. Validate paths
if [ ! -d "$SOURCE_PATH" ]; then
  echo "Error: Track directory '${SOURCE_PATH}' does not exist."
  exit 1
fi

if [ ! -d "$ARCHIVE_DIR" ]; then
  mkdir -p "$ARCHIVE_DIR"
fi

# 2. Git Move (Preserves history)
echo "Archiving ${SOURCE_PATH} to ${DEST_PATH}..."
git mv "$SOURCE_PATH" "$DEST_PATH"

# 3. Update Registry (conductor/tracks.md)
# We use sed to delete the block.
# The pattern looks for the line containing the track ID and the preceding lines up to "- [ ] **Track:"
# This is tricky with sed. A simpler approach for the registry format we have:
# Find the line with the link to the track, and the line before it (the title), and delete them.
# The format is:
# - [ ] **Track: ...**
#   *Link: ...*

echo "Removing entry from ${REGISTRY_FILE}..."

# Create a temp file
TMP_FILE="${REGISTRY_FILE}.tmp"

# We read the file line by line. If we find the track ID in a link, we skip that line 
# AND we assume the previous line was the title, so we need a way to not print it.
# A robust way in bash is to read the whole file into memory or use python/node. 
# Since we want to avoid deps, let's use a simple node one-liner since we will have node.

node -e "
const fs = require('fs');
const trackId = '${TRACK_ID}';
const lines = fs.readFileSync('${REGISTRY_FILE}', 'utf8').split('
');
const out = [];
let skip = false;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Check if this line is a track title start
    if (line.trim().startsWith('- [') && line.includes('**Track:')) {
        // Look ahead for the link
        if (i + 1 < lines.length && lines[i+1].includes(trackId)) {
            // Found our track block. Skip this line and the next one (the link)
            // Also skip potentially empty lines or context lines if they exist? 
            // The current format is strict: Title line, then Link line.
            // Let's just skip these two.
            i++; 
            console.log('Removed registry entry for ' + trackId);
            continue;
        }
    }
    // Also handle the case where the context/description lines follow
    // If we just skipped the title/link, we might want to skip subsequent indented lines?
    // For now, the simple Title+Link removal is safe for the standard format.
    out.push(line);
}
fs.writeFileSync('${REGISTRY_FILE}', out.join('
'));
"

# 4. Stage Registry Change
git add "$REGISTRY_FILE"
echo "Track ${TRACK_ID} archived successfully."
