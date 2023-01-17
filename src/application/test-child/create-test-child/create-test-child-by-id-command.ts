export class CreateTestChildCommand {
  public readonly value?: string;
  public readonly testId: string;

  constructor(data: CreateTestChildCommand) {
    this.value = data.value;
    this.testId = data.testId;
  }
}
