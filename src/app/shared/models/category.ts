export class Category {
  uuid: string;
  name: string;
  categoryType: string;
  priority: number;
  propertyUuid: string;
  errors: Array<string>;

  constructor(uuid: string, name: string, type: string, priority: number) {
    this.uuid = uuid;
    this.name = name;
    this.categoryType = type;
    this.priority = priority;

    this.errors = [];
    this.validate(name, type, priority);
  }

  isValid(): boolean {
    return this.errors.length === 0;
  }

  private validate(name: string, type: string, priority: number): void {

    this.verifyField(name, 'Nome é obrigatório');
    this.verifyField(type, 'Tipo é obrigatório');
    this.verifyField(priority, 'Prioridade é obrigatória');
  };

  private verifyField(field: any, message: string) {
    if (field === null || field === '' || field <= 0) {
      this.errors.push(message);
    }
  }
}
