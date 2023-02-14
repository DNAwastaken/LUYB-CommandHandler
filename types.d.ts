import { Client, Message } from 'discord.js';

export default class Main {
  constructor({ client, commandsDir }: MainOptions);
}

export interface MainOptions {
  client: Client; // Discord.js bot client
  commandsDir: string; // Path to commands directory
}

export interface CommandObject {
  callback: (commandUsage: commandUsage) => unknown;
}

export interface commandUsage {
  client: Client;
  message?: Message | null;
}
