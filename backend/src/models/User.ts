import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: 'admin' | 'user';
    created_at?: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'created_at'>;

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public password_hash!: string;
    public role!: 'admin' | 'user';
    public readonly created_at!: Date;

    public async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password_hash);
    }
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: false,
    }
  );
  
  export const encryptPassword = async (password: string) => {
    const salt = 10;
    return bcrypt.hash(password, salt);
  }
  
  export default User;