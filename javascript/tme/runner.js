const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const render = require('./render');

const forbiddenDirs = ['node_modules'];

class Runner {
    constructor() {
        this.testFiles = [];
    }

    async runTests() {
        for (let file of this.testFiles) {
            console.log(chalk.bgGray(`~> ${file.shortName}`));
            const beforeEaches = [];
            global.render = render;
            global.beforeEach = (fn) => {
                beforeEaches.push(fn);
            };

            global.it = async (desc, fn) => {
                beforeEaches.forEach(func => func());
                try {
                    await fn();
                    console.log(chalk.green(`\tOK - ${desc}`));
                } catch (error) {
                    const message = error.message.replace(/\n/g, '\n\t\t');
                    console.log(chalk.redBright(`\tX - ${desc}`));
                    console.log(chalk.magentaBright('\t', message));
                }
            };

            try {
                require(file.name);
            } catch (error) {
                console.log(chalk.redBright('X - Error loading file', file.name));
                console.log(error.message);
            }
        }
    }

    async collectFiles(targetPath) {
        const files = await fs.promises.readdir(targetPath);

        for (let file of files) {
            const filepath = path.join(targetPath, file);
            const stats = await fs.promises.lstat(filepath);

            if (stats.isFile() && file.includes('.test.js')) {
                this.testFiles.push({ name: filepath, shortName: file });
            } else if (stats.isDirectory() && !forbiddenDirs.includes(file)) {
                const childFiles = await fs.promises.readdir(filepath);
                files.push(...childFiles.map(f => path.join(file, f)));
            }
        }
    }
}

module.exports = Runner;