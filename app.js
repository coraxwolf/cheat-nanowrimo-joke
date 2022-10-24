/**
 * @File
 * App to generate a text file of 50,000 words
 * 
 * @Param stats Boolean Optional Command Option to generate Stat File
 * @Param output String Path to place output file and stats file
 */

const path = require('path');
const fs = require('fs');
const readline = require('readline');
const randomWords = require('random-words');

let textData = ''; // Container for final text output
const wordStats = {app: {}, words: {}}; // Object to contain words and stats for each word

/**
 * Function to generate a single word
 * Adds word to the Stats set or increments word count
 */
const generateWord = () => {
  const word = randomWords();
  textData = textData + ` ${word}`; // add word to text string
  // Check if word has already been used
  if (wordStats.words.hasOwnProperty(word)) {
    // Word already used (in stat object) Increment Count
    wordStats.words[word]++;
  } else {
    // Word hasn't been used yet
    wordStats.words[word] = 1;
  }
};

/**
 * Main Function to drive Application
 */
const main = () => {
  const start = process.hrtime.bigint(); // and we're off
  // Make OutFiles
  const outFile = process.argv.length > 2 ?
    path.resolve((process.argv[2] || '.'), 'cheat-novel.txt') :
    path.resolve('.', 'cheat-novel.txt');
  const statsFile = process.argv.length > 2 ?
    path.resolve((process.argv[2] || '.'), 'words-stats.json') :
    path.resolve('.', 'words-stats.json');
  const stats = process.argv[1]? true : false;
  // Check Outfile for existing file and if Directories exist
  if (!fs.existsSync(outFile)) {
    // Check if Path is valid
    if (process.argv[2] && !fs.existsSync(process.argv[2])) {
      // Create Directory
      fs.mkdirSync(process.argv[2], {recursive: true});
    }
  } else {
    // Outfile already exists Ask to overwrite
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(`file ${outFile} already exits. Overwrite this file (y|n)? `, (proceed) => {
      const answer = process.toUpperCase() || '';
      if (answer === 'Y' || answer === 'YES' || answer === 'OK') {
        rl.close(); // Close Readline
      } else {
        rl.close(); // Close Readline then exit app
        console.info("Aborting App. Output File already exists");
        process.exit();
      }
    });
  }
  // Generate the words
  console.info("Creating Your Novel :P");
  for (let i=0; i < 50000; i++) {
    generateWord();
  }
  console.info("Novel Generated");
  fs.writeFileSync(outFile, textData, 'utf8');
  if (stats) {
    console.info("Generating Stat File");
    wordStats.app.wordCount = textData.split(' ').length;
    wordStats.app.generateTime = parseInt((process.hrtime.bigint() - start));
    fs.writeFileSync(statsFile, JSON.stringify(wordStats, null, 2), 'utf8');
  }
  const runtime = (process.hrtime.bigint() - start);
  const runtimeMS = parseInt(runtime)/1000;
  console.log(`Finished in ${runtime}ns (${runtimeMS}ms)`);
  process.exit();
};

main(); // run this app
