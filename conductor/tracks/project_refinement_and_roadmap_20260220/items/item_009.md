- Analysing https://github.com/xero/figlet-fonts fonts
  1. Repo structure:
     - There are some .flc files, what are they? Are they required for anything?
     - There are also som .tlf files. I guess they are Toilet fonts, should we ignore them?
  2. Duplicates within the repo: it seems that there are duplicate versions of supposedly the same font where one file name is in lower case and the other file name is in in title case with spaces, etc. I saw that some of these corresponding file contents are identical, others differ slightly or have notes in the comments saying that one version fixes some bugs in another version, etc. I think we should get a clear overview of this situation, i.e. clone the repo and analyse all the fonts one by one, find lower-case/title-case pairs, and answer questions like:
    - What are the title-case file name fonts and what are the lower-case file name fonts? Does always one preceed the other (e.g. lower-case being an iteration of title-case, title-case being the original version, etc)? Is one supposed to be the final publishable version? Also consider looking at the Git history to answer these questions.
    - Do all title-case fonts have a corresponding lower-case version and vice versa? Are there title-case fonts with no lower-case font, or are there lower-case fonts with no title-case fonts?
    - What are the differences of corresponding lower-case/title-case font versions (if any)? Is it just bug fixes or formatting? Or are there significant changes? Also look at the comment sections of the font files
    - As a result of this, we should be able to create a final canonical list of unique fonts that we can get out of this repository
  3. Overlap with https://github.com/patorjk/figlet.js
    - Calculate what fonts of xero/figlet-fonts already exist in patorjk/figlet.js, what fonts do only exist in xero/figlet-fonts, and what fonts do only exist in patorjk/figlet.js
    - We consider patorjk/figlet.js the more authoritative source since it is more active, so the goal would only be to take the fonts from xero/figlet-fonts that don't exist in patorjk/figlet.js. We would always give preference to the fonts in patorjk/figlet.js
