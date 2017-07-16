import { MyArray } from '../util/my-array';

export class CategoryType {
    uuid: string;
    name: string;
    errors: Array<string>;

    public static getTypes(): Array<CategoryType> {
        return [
            new CategoryType('credit', 'Crédito'),
            new CategoryType('debit', 'Débito'),
            new CategoryType('creditTransfer', 'Tranferência de crédito'),
            new CategoryType('debitTransfer', 'Tranferência de débito')];
    }

    public static getTypeIndex(key: string): number {
        const types = this.getTypes();
        return MyArray.findIndex(key, types);
    }

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
    }
}
