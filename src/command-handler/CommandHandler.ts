import path from 'path';

import { Client, Events } from 'discord.js';
import { CommandObject, CommandUsage } from '../../types';
import getAllFiles from '../utils/get-all-files';
import Command from './Command';

class CommandHandler {
  // <commandName, instance of the Command class>
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
      let commandObject: CommandObject = require(file).default;

      // ping/pong.ts -> ping
      const commandName = file
        .split(/[\/\\]/)
        .pop()!
        .split('.')[0];

      const command = new Command(commandName, commandObject);
      this.commands.set(command.commandName, command);
    }
  }

  messageListener(client: Client) {
    const validations = getAllFiles(path.join(__dirname, './validations')).map(
      (filePath) => require(filePath).default,
    );

    const prefix = '!';

    client.on(Events.MessageCreate, (message) => {
      const { content } = message;

      // Sets the prefix for the bot
      if (!content.startsWith(prefix)) {
        return;
      }

      const args = content.split(/\s+/);
      const commandName = args.shift()?.substring(prefix.length).toLowerCase();

      const command = this.commands.get(commandName);
      if (!command) {
        return;
      }

      // TODO: set type CommandUsage to usage
      const usage = {
        message,
        args,
        text: args.join(' '),
      };

      for (const validation of validations) {
        if (!validation(command, usage, prefix)) {
          return;
        }
      }

      // Destructuring values from commandObject
      const { callback } = command.commandObject;

      callback(usage);
    });
  }
}

export default CommandHandler;
