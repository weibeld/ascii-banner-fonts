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
  # If it's already moved, we might just need to cleanup the registry
  if [ -d "$DEST_PATH" ]; then
    echo "Track already moved to archive. Proceeding with registry cleanup."
  else
    echo "Error: Track directory '${SOURCE_PATH}' does not exist."
    exit 1
  fi
else
  if [ ! -d "$ARCHIVE_DIR" ]; then
    mkdir -p "$ARCHIVE_DIR"
  fi
  # 2. Git Move (Preserves history)
  echo "Archiving ${SOURCE_PATH} to ${DEST_PATH}..."
  git mv "$SOURCE_PATH" "$DEST_PATH"
fi

# 3. Update Registry (conductor/tracks.md)
echo "Removing entry from ${REGISTRY_FILE}..."

node -e "
const fs = require('fs');
const trackId = process.argv[1];
const registryFile = process.argv[2];
const lines = fs.readFileSync(registryFile, 'utf8').split('\n');
const out = [];
for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim().startsWith('- [') && line.includes('**Track:')) {
        if (i + 1 < lines.length && lines[i+1].includes(trackId)) {
            console.log('Found entry for ' + trackId + '. Skipping...');
            i++; 
            while (i + 1 < lines.length && lines[i+1].trim() !== '' && !lines[i+1].startsWith('---') && !lines[i+1].startsWith('- [') && !lines[i+1].startsWith('#')) {
                i++;
            }
            continue;
        }
    }
    out.push(line);
}
fs.writeFileSync(registryFile, out.join('\n'));
" "$TRACK_ID" "$REGISTRY_FILE"

# 4. Stage Registry Change
git add "$REGISTRY_FILE"
echo "Track ${TRACK_ID} archived successfully."