import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useTransactions() {
  return useQuery({
    queryKey: [api.transactions.list.path],
    queryFn: async () => {
      const res = await fetch(api.transactions.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch transactions");
      return api.transactions.list.responses[200].parse(await res.json());
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: [api.transactions.stats.path],
    queryFn: async () => {
      const res = await fetch(api.transactions.stats.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch dashboard stats");
      return api.transactions.stats.responses[200].parse(await res.json());
    },
  });
}
