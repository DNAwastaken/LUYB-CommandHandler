import {
  Client,
  CommandInteraction,
  Guild,
  GuildMember,
  Message,
  TextChannel,
  User,
} from 'discord.js';

export default class DNA {
  constructor({ client, commandsDir }: Options);
}

export interface Options {
  client: Client; // Discord.js bot client
  commandsDir: string; // Path to commands directory
  mongoUri?: string; // MongoDB connection URI
}

// Command object types
export interface CommandObject {
  minArgs?: number;
  maxArgs?: number;
  correctSyntax?: string;
  callback: (commandUsage: CommandUsage) => unknown;
}

// Command callback argument (usage) types
export interface CommandUsage {
  client: Client;
  message?: Message | null;
  args: string[];
  text: string;
}
