import {
  Client,
  CommandInteraction,
  Guild,
  GuildMember,
  Message,
  TextChannel,
  User,
} from 'discord.js';

export default class Main {
  constructor({ client, commandsDir }: MainOptions);
}

export interface MainOptions {
  client: Client; // Discord.js bot client
  commandsDir: string; // Path to commands directory
  mongoUri?: string; // MongoDB connection URI
}

export interface CommandObject {
  callback: (commandUsage: commandUsage) => unknown;
}

export interface commandUsage {
  client: Client;
  message?: Message | null;
}
