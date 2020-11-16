#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Memoizer } = require('memo-again');
const {
    BilaraData,
    Seeker,
} = require('scv-bilara');
const APP_DIR = path.join(__dirname, '..');

(async function(){
    let bilaraData = await new BilaraData().initialize();
    let storeName = 'api';
    let storePath = path.join(APP_DIR, storeName);
    let writeFile = true;
    let readFile = true;
    let memoizer = new Memoizer({
        writeMem: false, // avoid monotonic increasing memory usage
        writeFile,
        readFile,
        serialize: Seeker.serialize,
        deserialize: Seeker.deserialize,
        storeName,
        storePath,
    });
    let skr = await new Seeker({
        bilaraData,
        memoizer,
    }).initialize();
    let examples = bilaraData.examples;
    for (let lang in examples) {
        for (let eg of examples[lang]) {
            var res = await skr.find({
                pattern: eg,
                lang,
            });
            skr.info(`loadExamples`, eg);
        }
    }
    console.log(examples);
})();
