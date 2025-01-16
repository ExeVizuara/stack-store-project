import User from '../models/User';

export class UserService {
  // Crear un nuevo usuario
  static async createUser(data: {
    name: string;
    email: string;
    password_hash: string;
    role: 'admin' | 'user';
  }) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      throw new Error('Error al crear el usuario');
    }
  }

  static async getUserById(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
      return user;
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error}`);
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw new Error('Error al obtener los usuarios');
    }
  }

  static async updateUser(
    id: number,
    data: { name?: string; email?: string; password_hash?: string }
  ) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
      await user.update(data);
      return user;
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error}`);
    }
  }

  static async deleteUser(id: number) {
    try {
      const user = await User.findByPk(id);
      if (!user) throw new Error('Usuario no encontrado');
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error}`);
    }
  }
}
