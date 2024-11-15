// ts-node-register.mjs
import { register } from 'ts-node';
import { pathToFileURL } from 'node:url';

console.log('Registering ts-node loader...');

register({
  project: './tsconfig.json',
  transpileOnly: true, // Optional
});
