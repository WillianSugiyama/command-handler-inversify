export class CreateTestCommand {
  public readonly task?: string;

  constructor(data: CreateTestCommand) {
    this.task = data.task;
  }
}
