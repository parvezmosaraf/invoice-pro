import { Client } from "@/types/client";
import { v4 as uuidv4 } from "uuid";

export const ClientService = {
  STORAGE_KEY: "clients",

  init() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  },

  getAll(): Client[] {
    this.init();
    const clients = localStorage.getItem(this.STORAGE_KEY);
    return clients ? JSON.parse(clients) : [];
  },

  getById(id: string): Client | null {
    this.init();
    const clients = this.getAll();
    return clients.find(client => client.id === id) || null;
  },

  add(client: Omit<Client, "id">): Client {
    this.init();
    const clients = this.getAll();
    const newClient = {
      ...client,
      id: uuidv4(),
    };
    
    clients.push(newClient);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clients));
    
    return newClient;
  },

  update(id: string, updates: Partial<Client>): Client | null {
    this.init();
    const clients = this.getAll();
    const index = clients.findIndex(client => client.id === id);
    
    if (index === -1) return null;
    
    const updatedClient = {
      ...clients[index],
      ...updates,
    };
    
    clients[index] = updatedClient;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(clients));
    
    return updatedClient;
  },

  delete(id: string): boolean {
    this.init();
    const clients = this.getAll();
    const filteredClients = clients.filter(client => client.id !== id);
    
    if (filteredClients.length === clients.length) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredClients));
    return true;
  }
};
