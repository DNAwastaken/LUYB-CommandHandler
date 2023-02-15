import Command from '../Command';
import { CommandUsage } from '../../../types';

export default (command: Command, usage: CommandUsage, prefix: string) => {
  const {
    minArgs = 0,
    maxArgs = -1,
    correctSyntax = 'Correct syntax: {PREFIX}{COMMAND} {ARGS}',
  } = command.commandObject;
  const { length } = usage.args;

  if (length < minArgs || (length > maxArgs && maxArgs !== -1)) {
    usage.message!.reply(
      correctSyntax
        .replace('{PREFIX}', prefix)
        .replace('{COMMAND}', command.commandName)
        .replace('{ARGS}', '{args correctSyntax not implemented yet}'),
    );
    return false;
  }

  return true;
};
