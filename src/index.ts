// Packages
import mongoose from 'mongoose';
import { MainOptions } from '../types';

// Files
import CommandHandler from './CommandHandler';

class Main {
  constructor({ client, mongoUri, commandsDir }: MainOptions) {
    if (!client) {
      throw new Error('A client is required.');
    }

    if (commandsDir) {
      new CommandHandler(commandsDir, client);
    }

    if (mongoUri) {
      this.connectToMongo(mongoUri);
    }
  }

  connectToMongo(mongoUri: string) {
    mongoose.connect(mongoUri, {
      keepAlive: true,
    });
  }
}

export default Main;
