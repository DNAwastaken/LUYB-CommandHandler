// Packages
import mongoose from 'mongoose';

// Files
import CommandHandler from './command-handler/CommandHandler';
import { CommandObject, Options } from '../types';

class Main {
  constructor({ client, commandsDir, mongoUri }: Options) {
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

// Exporting the types from the main file so projects `npm link` can properly import/export them
export { CommandObject, Options };
