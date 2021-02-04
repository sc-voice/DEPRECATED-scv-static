#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const Axios = require('axios');
const { logger } = require('log-instance');
const { Memoizer } = require('memo-again');
const {
    BilaraData,
    Seeker,
} = require('scv-bilara');
const APP_DIR = path.join(__dirname, '..');
const API_DIR = path.join(APP_DIR, 'api');
const SRC_DIR = path.join(APP_DIR, 'src');
const EXAMPLES_PATH = path.join(SRC_DIR, 'examples.js');
const SUID_MAP_PATH = path.join(API_DIR, 'suid-map-bilara-data.json');
const BILARA_PATH = path.join(APP_DIR, 'local', 'bilara-data');
const EXAMPLES_DIR = path.join(APP_DIR, 'src', 'examples');
const EXAMPLES_BASEURL = 
    'https://raw.githubusercontent.com/sc-voice/scv-static/main/src/examples';

logger.logLevel = 'info';

(async function(){
    let bilaraData = await new BilaraData().initialize(true);
    await fs.promises.writeFile(SUID_MAP_PATH, 
        JSON.stringify(bilaraData.bilaraPathMap.suidMap, null, 2));

    let exampleFiles = await fs.promises.readdir(EXAMPLES_DIR);
    let examples = {};
    let languages = [];
    for (exampleFile of exampleFiles) {
        let examplePath = path.join(EXAMPLES_DIR, exampleFile);
        let langExamples = (await fs.promises.readFile(examplePath))
            .toString()
            .split('\n')
            .filter(ex=>!!ex);
        if (langExamples.length) {
            let lang = exampleFile.split('-')[1].split('.')[0];
            languages.push(lang);
            examples[lang] = langExamples;
            logger.log(`${exampleFile}: ${langExamples.length}`);
        }
    }
    await fs.promises.writeFile(EXAMPLES_PATH, JSON.stringify(examples,null,2));

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
    logger.logLevel = 'warn';
    skr.logLevel = 'info';
    for (let lang in examples) {
        for (let eg of examples[lang]) {
            try {
                var res = eg && await skr.find({
                    pattern: eg,
                    lang,
                    matchHighlight,
                });
            } catch(e){
                logger.warn(e.message);
            }
        }
    }
})();
