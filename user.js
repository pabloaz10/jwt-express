const { DataTypes } = require('sequelize');
const db = require('./database'); // Importando o banco de dados
// Definindo o modelo User                                  

const User = db.define("user", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
    }
}
)
module.exports = User;