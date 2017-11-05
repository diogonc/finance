export class TransactionVm {
  uuid: string;
  value: number;
  description: string;
  date: string;
  propertyUuid: string;
  accountIndex: number;
  categoryIndex: number;

  constructor(uuid: string, value: number, description: string, date: string, propertyUuid: string,
    accounIndex: number, categoryIndex: number) {
    this.uuid = uuid;
    this.value = value;
    this.description = description;
    this.date = date;
    this.propertyUuid = propertyUuid;
    this.accountIndex = accounIndex;
    this.categoryIndex = categoryIndex;
  }
}
