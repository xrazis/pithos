#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');

const path = require('path');

const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, fileNames) => {
    if (err) {
        throw new Error(err);
    }

    const statPromises = fileNames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(chalk.red(fileNames[index]));
        } else {
            console.log(chalk.blue(fileNames[index]));
        }
    }
});