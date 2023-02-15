import { CommandObject } from '../../types';

class Command {
  private _commandName: string;
  private _commandObject: CommandObject;

  constructor(commandName: string, commandObject: CommandObject) {
    this._commandName = commandName.toLowerCase();
    this._commandObject = commandObject;

    this.verifySyntax();
  }

  verifySyntax() {
    // All commands need to do something as a callback function
    if (!this.commandObject.callback) {
      throw new Error(
        `Command "${this.commandName}" does not have a callback function.`,
      );
    }
  }

  get commandName() {
    return this._commandName;
  }

  get commandObject() {
    return this._commandObject;
  }
}

export default Command;
