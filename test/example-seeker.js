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

    it("default ctor", ()=>{
        let skr = new ExampleSeeker();
        should(skr.logLevel).equal(false);
        should.deepEqual(Object.keys(skr.examples), ['de','en']);
    });
    it("custom ctor", ()=>{
        let examples = {
            de:[],
            en:[],
        };
        let skr = new ExampleSeeker({examples, axios});
        should(skr.examples).equal(examples);
        should(skr.axios).equal(axios);
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
        should(skr.isExample('Wurzel des Leidens')).equal(false);
        should(skr.isExample('Wurzel des Leidens', 'de')).equal(true);
        should(skr.isExample('wurzel des leidens', 'de')).equal(true);
    });
    it("exampleGuid(...) => en guid", async()=>{
        let skr = new ExampleSeeker();
        let example = 'root of suffering';
        let lang = 'en';
        let guid = 'f0f933e47f162a7a7824c1378804efbf';
        should(skr.exampleGuid(example, lang)).equal(guid);
    });
    it("exampleGuid(...) => de guid", async()=>{
        let skr = new ExampleSeeker();
        let example = 'sei.* abhängig entstanden';
        let lang = 'de';
        let guid = 'e68b92c404fbf58e108917ab8d493c03';
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
    it("TESTTESThighlightExamples(...) adds HTML links for examples", ()=>{
        let examples = {
            en: [
                'is.*\\bfeeling',
                'perception',
            ],
        };
        var skr = new ExampleSeeker({axios, examples});
        should(skr.isExample('perception')).equal(true);
        let segments = [
            {scid: 'sn12.23:1.5', pli: 'iti vedanā …pe…', en: 'Such is feeling …',},
            {scid: 'sn12.23:1.6', pli: 'iti saññā …', en: 'Such is perception …',},
            {scid: 'sn12.23:1.7', pli: 'iti saṅkhārā …', en: 'Such are choices …',},
        ];
        let lang = 'en';
        let text = "This is feeling, not unfeeling";
        let re = skr.reExample[lang];
        should(text.replace(re,'ASDF')).equal('This ASDF, not unfeeling');

        let segments2 = skr.highlightExamples({segments,lang});
        should.deepEqual(segments2[0], {
            scid: 'sn12.23:1.5', 
            pli: 'iti vedanā …pe…', 
            en: 'Such <span class="scv-matched">is feeling</span> …',
        });
        
    });
    it("TESTTESTexampleOfMatch(...) returns example", ()=>{
        let examples = {
            en: [
                'is.*\\bfeeling',
                'perception',
            ],
        };
        var skr = new ExampleSeeker({axios, examples});
        should(skr.exampleOfMatch("Is a good Feeling")).equal(examples.en[0]);
    });
})
