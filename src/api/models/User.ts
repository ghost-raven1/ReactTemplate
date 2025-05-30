import { BaseModel } from '../BaseModel';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export class UserModel extends BaseModel<User> {
  constructor() {
    super('users');
  }

  // Add any user-specific methods here
  async getCurrentUser(): Promise<User> {
    const response = await this.requestManager.get<User>('me');
    return response.data;
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await this.requestManager.patch<User>('me', data);
    return response.data;
  }
} 