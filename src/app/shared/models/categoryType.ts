import { MyArray } from '../util/my-array';
import { Type } from './type'

export class CategoryType {
    uuid: number;
    name: string;
    errors: Array<string>;

    public static getTypes(): Array<CategoryType> {
        return [
            new CategoryType(Type.Credit, 'Crédito'),
            new CategoryType(Type.Debit, 'Débito'),
            new CategoryType(Type.CreditTransfer, 'Tranferência de crédito'),
            new CategoryType(Type.DebitTransfer, 'Tranferência de débito')];
    }

    // public static getTypeIndex(key: string): number {
    //     const types = this.getTypes();
    //     return MyArray.findIndex(key, types);
    // }

    constructor(uuid: number, name: string) {
        this.uuid = uuid;
        this.name = name;
    }
}
