(typeof describe === 'function') && describe("example-seeker", function() {
    const should = require("should");
    const fs = require('fs');
    const path = require('path');
    const { MerkleJson } = require('merkle-json');
    const {
        ExampleSeeker,
    } = require("../index");
    const { logger, LogInstance } = require('log-instance');
    const axios = require('axios');
    logger.logLevel = 'warn';

    it("default ctor", async()=>{
        let skr = new ExampleSeeker();
        should(skr.logLevel).equal(false);
        should.deepEqual(Object.keys(skr.examples), ['de','en']);
    });
    it("isExample", async()=>{
        var skr = new ExampleSeeker({
            lang: 'en', // English default
        });
        should(skr.isExample('root of suffering')).equal(true);
        should(skr.isExample('ROOT OF SUFFERING')).equal(true);
        should(skr.isExample('\\bROOT OF SUFFERING')).equal(true);
        should(skr.isExample('\\bROOT OF SUFFERING\\b')).equal(true);
        should(skr.isExample('root suffering')).equal(false);
        should(skr.isExample('Wurzel des Leidens')).equal(true);
        should(skr.isExample('wurzel des leidens')).equal(true);
    });
    it("exampleGuid(...) => en guid", async()=>{
        let skr = new ExampleSeeker();
        let example = 'root of suffering';
        let lang = 'en';
        let guid = '44d48024d5d6fce7e330eeb98382b291';
        should(skr.exampleGuid(example, lang)).equal(guid);
    });
    it("exampleGuid(...) => de guid", async()=>{
        let skr = new ExampleSeeker();
        let example = 'sei.* abhängig entstanden';
        let lang = 'de';
        let guid = '00573864f912535f6266440c1c89a471';
        should(skr.exampleGuid(example, lang)).equal(guid);
    });
    it("TESTTESTfind(...) finds example", async()=>{
        var skr = new ExampleSeeker({axios});

        var pattern = "root of suffering"; 
        var res = await skr.find({
            pattern,
        });
        should.deepEqual(res.suttaRefs, [
            'sn42.11/en/sujato',
            'mn105/en/sujato',
            'mn1/en/sujato',
            'sn56.21/en/sujato',
            'mn66/en/sujato',
            'mn116/en/sujato',
            'dn16/en/sujato',
        ]);
        should(res.bilaraPaths.length).equal(14);
    });
})
