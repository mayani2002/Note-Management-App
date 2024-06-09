import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

// const sequelize = new Sequelize("postgres://postgres.guisdvuurkqmyozvrjlo:WXN9.fUqDN@y2r.@aws-0-ap-south-1.pooler.supabase.com:5432/postgres")

export default class User extends Sequelize.Model{}
User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'user',
    },

);

// User.sync({ alter: true });
