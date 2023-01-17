export class FindTestChildByIdCommand {
  public readonly id?: string;

  constructor(data: FindTestChildByIdCommand) {
    this.id = data.id;
  }
}
