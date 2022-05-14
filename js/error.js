class CustomError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
    }
  }


export class EmailError extends CustomError {
    constructor(message) {
        super(message);
        this.stack = stack;
    } 
}