#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('../package.json');
const sot = require('../lib/version-sot.js');
const sotFileName = 'package.json';

program
  .name('version-sot')
  .description('Maintain version information across different configuration files')
  .version(version)
  .option('-s, --sot <string>', 'define the source of truth', sotFileName)
  .requiredOption('-d --destination <string>', 'define the destination')
  .showHelpAfterError();

program.parse();

const options = program.opts();

const sotVersion = sot.getFrom(options.sot);

if (sot.pushTo(options.destination, sotVersion)) {
  console.log(`Pushed version ${sotVersion} to ${options.destination}`);
} else {
  console.error('Error pushing version to destination');
}