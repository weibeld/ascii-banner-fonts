import os
import sys
import subprocess

def run_command(command):
    try:
        subprocess.check_call(command, shell=True)
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        sys.exit(1)

def archive_track(track_id):
    tracks_dir = "conductor/tracks"
    archive_dir = "conductor/archive"
    registry_file = "conductor/tracks.md"

    # 1. Validate paths
    source_path = os.path.join(tracks_dir, track_id)
    dest_path = os.path.join(archive_dir, track_id)

    if not os.path.exists(source_path):
        print(f"Error: Track directory '{source_path}' does not exist.")
        sys.exit(1)

    if not os.path.exists(archive_dir):
        os.makedirs(archive_dir)

    # 2. Git Move (Preserves history)
    print(f"Archiving {source_path} to {dest_path}...")
    run_command(f"git mv {source_path} {dest_path}")

    # 3. Update Registry (conductor/tracks.md)
    print(f"Removing entry from {registry_file}...")
    with open(registry_file, 'r') as f:
        lines = f.readlines()

    output_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Check if this line is the start of a track entry
        if line.strip().startswith("- [") and "**Track:" in line:
            # Look ahead to see if this block belongs to our track_id
            is_target = False
            for j in range(i + 1, min(i + 10, len(lines))):
                if f"tracks/{track_id}" in lines[j]:
                    is_target = True
                    break
                # Stop looking ahead if we hit another track or section
                if lines[j].strip().startswith("- [") or lines[j].strip().startswith("---"):
                    break
            
            if is_target:
                print(f"Found registry entry for {track_id}. Removing block...")
                # Skip lines until the next track, section divider, or EOF
                i += 1
                while i < len(lines):
                    next_line = lines[i]
                    if next_line.strip().startswith("- [") or next_line.strip().startswith("---") or next_line.strip().startswith("#"):
                        break
                    i += 1
                continue

        output_lines.append(line)
        i += 1

    with open(registry_file, 'w') as f:
        f.writelines(output_lines)

    # 4. Stage Registry Change
    run_command(f"git add {registry_file}")
    print(f"Track {track_id} archived successfully.")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 scripts/archive_track.py <track_id>")
        print("Example: python3 scripts/archive_track.py my_track_20260101")
        sys.exit(1)
    
    archive_track(sys.argv[1])
