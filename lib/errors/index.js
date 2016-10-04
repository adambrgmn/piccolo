const createError = (name, baseError = Error) => {
  function newError(message) {
    this.message = message || '';

    const lastPart = new Error().stack.match(/[^\s]+$/);
    this.stack = `${this.name} at ${lastPart}`;
  }

  Object.setPrototypeOf(newError, baseError);
  newError.prototype = Object.create(Error.prototype);
  newError.prototype.name = name;
  newError.prototype.message = '';
  newError.prototype.constructor = newError;

  return newError;
};

export const ConnectionError = createError('ConnectionError');
export const CommandError = createError('CommandError');
