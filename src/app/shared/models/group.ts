export class Group {
  uuid: string;
  name: string;
  priority: number;
  propertyUuid: string;
  errors: Array<string>;

  constructor(uuid: string, name: string, priority: number) {
    this.uuid = uuid;
    this.name = name;
    this.priority = priority;

    this.errors = [];
    this.validate(name, priority);
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  private validate(name: string, priority: number): void {

    this.verifyField(name, 'Nome é obrigatório');
    this.verifyField(priority, 'Prioridade é obrigatória');
  }

  private verifyField(field: any, message: string) {
    if (field === null || field === '' || field <= 0) {
      this.errors.push(message);
    }
  }
}

