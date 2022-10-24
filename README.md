# cheat-nanowrimo-joke
joke app to generate 50K novel consisting of more than one word 50,000 times

This app will generate 50,001 words with a space between each word.

## Command Options
**stats**: boolean value to generate the stats file or not.  Anything for this will generate the stats file
**path**: string value for path to place the output files.  Output files will be cheat-novel.txt and words-stats.json

## Examples
'''
# Creates Output File and Stats File in Data Folder
node app.js true data
'''

'''
# Creates Output File and Stats File in same directory
node app.js true
'''

'''
# Creates only output file in same directory
node app.js
'''
