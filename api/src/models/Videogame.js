const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull:false,
    },
    platforms:{
      type:DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
    },
    image:{
      type: DataTypes.STRING(2000),
      allowNull: false,
      validate:{
        isUrl: true,
      }
    },
    released:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdInDb:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true
    }
    
  },
  {
    timestamps: false,
  }
  );
};
