#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { logger } = require('log-instance');
const { Memoizer } = require('memo-again');
const {
    BilaraData,
    Seeker,
} = require('scv-bilara');
const APP_DIR = path.join(__dirname, '..');
const API_DIR = path.join(APP_DIR, 'api');
const EXAMPLES_PATH = path.join(API_DIR, 'examples.json');

logger.logLevel = 'warn';

(async function(){
    let bilaraData = await new BilaraData().initialize();
    await fs.promises.writeFile(EXAMPLES_PATH, 
        JSON.stringify(bilaraData.examples,null,2));
    let storeName = 'api';
    let storePath = path.join(APP_DIR, storeName);
    let writeFile = true;
    let readFile = false; // force re-write
    let memoizer = new Memoizer({
        writeMem: false, // avoid monotonic increasing memory usage
        writeFile,
        readFile,
        serialize: Seeker.serialize,
        deserialize: Seeker.deserialize,
        storeName,
        storePath,
    });
    let matchHighlight = '<span class="scv-matched">$&</span>';
    let skr = await new Seeker({
        bilaraData,
        memoizer,
    }).initialize();
    skr.logLevel = 'info';
    let examples = bilaraData.examples;
    for (let lang in examples) {
        for (let eg of examples[lang]) {
            var res = await skr.find({
                pattern: eg,
                lang,
                matchHighlight,
            });
        }
    }
})();
