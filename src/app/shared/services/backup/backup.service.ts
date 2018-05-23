import { Injectable } from '@angular/core';
import { CsvCreatorService } from './csv/csv-creator.service';
import { AccountRepository } from '../repository/account-repository';
import { CategoryRepository } from '../repository/category-repository';
import { TransactionRepository } from '../repository/transaction-repository';
import { GroupRepository } from '../repository/group-repository';
import { OwnerRepository } from '../repository/owner-repository';

@Injectable()
export class BackupService {
  constructor(private csvService: CsvCreatorService,
    private accountRepository: AccountRepository,
    private categoryRepository: CategoryRepository,
    private transactionRepository: TransactionRepository,
    private groupRepository: GroupRepository,
    private ownerRepository: OwnerRepository) { }

  public generate(): string {
    const owners = this.ownerRepository.getAll();
    const groups = this.groupRepository.getAll();
    const accounts = this.accountRepository.getAll();
    const categories = this.categoryRepository.getAll();
    const transactions = this.transactionRepository.getAll();

    const ownersCsv = this.csvService.convert(owners);
    const groupsCsv = this.csvService.convert(groups);
    const accountsCsv = this.csvService.convert(accounts);
    const categoriesCsv = this.csvService.convert(categories);
    const transactionsCsv = this.csvService.convert(transactions);

    return 'owners\n\n' + ownersCsv +
      '\n\ngroups\n\n' + groupsCsv +
      '\n\naccounts\n\n' + accountsCsv +
      '\n\ncategories\n\n' + categoriesCsv +
      '\n\ntransactions\n\n' + transactionsCsv;
  }
}
