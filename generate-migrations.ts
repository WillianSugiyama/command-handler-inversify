import { exec } from 'child_process';

const command = `./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -d src/infrastructure/database/config/datasource.ts src/infrastructure/database/migrations/${process.argv[2]}`;

(() =>
  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(stderr);
    }
    console.log(stdout);
  }))();
