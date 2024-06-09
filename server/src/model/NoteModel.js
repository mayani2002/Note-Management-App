import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

// const sequelize = new Sequelize("postgres://postgres.guisdvuurkqmyozvrjlo:WXN9.fUqDN@y2r.@aws-0-ap-south-1.pooler.supabase.com:5432/postgres")

export default class Note extends Sequelize.Model { }
Note.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        },
        tag: {
            type: DataTypes.STRING
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'note',
    },
);
// Note.sync({ alter: true });