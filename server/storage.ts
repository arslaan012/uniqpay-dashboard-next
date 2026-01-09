import { db } from "./db";
import {
  transactions,
  type Transaction,
  type InsertTransaction,
  type DashboardStats
} from "@shared/schema";

export interface IStorage {
  getTransactions(): Promise<Transaction[]>;
  getStats(): Promise<DashboardStats>;
  seedData(): Promise<void>;
}

export class MemStorage implements IStorage {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.transactions;
  }

  async getStats(): Promise<DashboardStats> {
    return {
      totalBalance: "1,250,400.00",
      todayDeposited: "45,230.00"
    };
  }

  async seedData(): Promise<void> {
    if (this.transactions.length > 0) return;

    // Generate realistic dummy data
    const statuses = ['Success', 'Pending', 'Failed'];
    const types = ['Payin', 'Payout'];
    const currencies = ['USD', 'EUR', 'GBP'];

    for (let i = 1; i <= 50; i++) {
      const gross = (Math.random() * 1000 + 100).toFixed(2);
      const mdr = (Number(gross) * 0.02).toFixed(2);
      const net = (Number(gross) - Number(mdr)).toFixed(2);
      
      this.transactions.push({
        id: i,
        user: `User ${i}`,
        orderId: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        txnRef: `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`,
        uniqueRef: `UNQ-${Math.random().toString(36).substring(7).toUpperCase()}`,
        bankRef: `UTR-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        currency: currencies[Math.floor(Math.random() * currencies.length)],
        type: types[Math.floor(Math.random() * types.length)],
        gross,
        mdr,
        net,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000))
      });
    }
  }
}

export const storage = new MemStorage();
