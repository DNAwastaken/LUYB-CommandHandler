// Packages
import { Client } from 'discord.js';
import { MainOptions } from '../types';

// Files
import CommandHandler from './CommandHandler';

class Main {
  constructor({ client, commandsDir }: MainOptions) {
    if (!client) {
      throw new Error('A client is required.');
    }

    if (commandsDir) {
      new CommandHandler(commandsDir, client);
    }
  }
}

export default Main;
