- .flf font file magic first line format for the records (research), as stated in the header comments of some font files:
  ```
  Explanation of first line:
  flf2 - "magic number" for file identification
  a    - should always be `a', for now
  $    - the "hardblank" -- prints as a blank, but can't be smushed
  7    - height of a character
  6    - height of a character, not including descenders
  100  -  max line length (excluding comment lines) + a fudge factor
  15   - default smushmode for this font
  31   - number of comment lines
  1    - print right-to-left (figlet 2.1 or later only)
  ```
