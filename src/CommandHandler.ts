import { Client, Events } from 'discord.js';
import getAllFiles from './utils/get-all-files';

class CommandHandler {
  // <commandName, commandObject>
  commands = new Map();
  commandsDir: string;

  constructor(commandsDir: string, client: Client) {
    this.commandsDir = commandsDir;
    this.readFiles();
    this.messageListener(client);
  }

  readFiles() {
    const files = getAllFiles(this.commandsDir);

    for (const file of files) {
      // Since we're using ES6 modules, we need to access the default exported object
      const commandObject = require(file).default;

      // ping/pong.ts -> ping
      const commandName = file.split(/[/\\]/)?.pop()?.split('.')[0];

      // All commands need to do something as a callback function
      if (!commandObject.callback) {
        throw new Error(
          `Command "${commandName}" does not have a callback function.`,
        );
      }

      // Adds to the command map
      this.commands.set(commandName?.toLowerCase(), commandObject);
    }
  }

  messageListener(client: Client) {
    client.on(Events.MessageCreate, (message) => {
      const { content } = message;

      // Sets the prefix for the bot
      if (!content.startsWith('!')) return;

      const args = content.split(/\s+/);
      const commandName = args.shift()?.substring(1).toLowerCase();

      const commandObject = this.commands.get(commandName);
      if (!commandObject) return;

      // Destructuring values from commandObject
      const { callback } = commandObject;

      callback({ message });
    });
  }
}

export default CommandHandler;
