/**
 * @Author JohnLi
 * @Date 2018/2/7 14:11
 */
const shell = require('shelljs');

const env = process.env.NODE_ENV;
const src = `src/environments/environment.${env}.ts`;
const to = `src/environments/environment.ts`;

shell.cp('-R', src, to);
