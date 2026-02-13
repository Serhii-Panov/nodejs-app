import path from 'node:path';

const pathToWorkDir = path.join(process.cwd());
const somePath = path.join(pathToWorkDir, 'src', 'index.js');

console.log(somePath);