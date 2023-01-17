export class FindTestByIdCommand {
  public readonly id?: string;

  constructor(data: FindTestByIdCommand) {
    this.id = data.id;
  }
}
