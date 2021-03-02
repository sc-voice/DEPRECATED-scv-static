#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { Files } = require('memo-again');
const { APP_DIR } = Files;
const contentPath = path.join(APP_DIR, 'content');

var files = [...Files.filesSync(contentPath)];
var routes = files.reduce((a,f)=> {
    if (/\.md/.test(f)) {
        let fparts = f.split('/');
        let fname = fparts.pop().replace('.md', '');
        a.push(`_content/${fname}`);
        if (fparts.length === 0) {
            a.push(`wiki/${fname}`);
        } else if (fparts.length === 1) {
            a.push(`${fparts[0]}/${fname}`);
        } else {
            console.log(`skipping ${f}`, fparts);
        }
    }
    return a;
}, []);

let routesPath = path.join(APP_DIR, 'nuxt-routes.json');
console.log('routes: ', routes);
fs.writeFileSync(routesPath, JSON.stringify(routes, null, '\t'));
