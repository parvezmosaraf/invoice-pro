interface User {
  name: string;
  email: string;
  company?: string;
  website?: string;
  avatarUrl?: string;
  businessName?: string;
  businessAddress?: string;
  businessPhone?: string;
  businessEmail?: string;
  taxId?: string;
}

const STORAGE_KEY = 'invoicesxpert_user';

export const UserService = {
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  },

  updateUser: (data: Partial<User>): User => {
    const currentUser = UserService.getCurrentUser() || {};
    const updatedUser = {
      ...currentUser,
      ...data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  setUser: (user: User): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  },

  clearUser: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};

export default UserService; 