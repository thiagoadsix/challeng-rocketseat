import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionRepository: TransactionsRepository) {
    this.transactionsRepository = transactionRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    if (!['income', 'outcome'].includes(type)) {
      throw new Error('This type is not able');
    }
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new Error('You do not have enough balance');
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
