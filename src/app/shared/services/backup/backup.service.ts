import { Injectable } from '@angular/core';
import { CsvCreatorService } from './csv/csv-creator.service';
import { AccountRepository } from '../repository/account-repository';
import { CategoryRepository } from '../repository/category-repository';
import { TransactionRepository } from '../repository/transaction-repository';

@Injectable()
export class BackupService {
  private csvService: CsvCreatorService;
  private accountRepository: AccountRepository;
  private categoryRepository: CategoryRepository;
  private transactionRepository: TransactionRepository;

  constructor(csvService: CsvCreatorService, accountRepository: AccountRepository,
      categoryRepository: CategoryRepository, transactionRepository: TransactionRepository) {
      this.csvService = csvService;
      this.accountRepository = accountRepository;
      this.categoryRepository = categoryRepository;
      this.transactionRepository = transactionRepository;
   }

   public generate(): string {
     let accounts = this.accountRepository.getAll();
     let categories = this.categoryRepository.getAll();
     let transactions = this.transactionRepository.getAll();

     let accountsCsv = this.csvService.convert(accounts);
     let categoriesCsv = this.csvService.convert(categories);
     let transactionsCsv = this.csvService.convert(transactions);

     return 'accounts\n\n' + accountsCsv +
            '\n\ncategories\n\n' + categoriesCsv +
            '\n\ntransactions\n\n' + transactionsCsv;
   }
}
