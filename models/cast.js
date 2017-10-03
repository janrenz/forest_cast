'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('casts', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    castingvideo: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    telefon_mobil: {
      type: DataTypes.STRING,
    },
    telefon_privat: {
      type: DataTypes.STRING,
    },
    kinder: {
      type: DataTypes.INTEGER,
    },
    strasse: {
      type: DataTypes.STRING,
    },
    plz: {
      type: DataTypes.STRING,
    },
    ort: {
      type: DataTypes.STRING,
    },
    alter: {
      type: DataTypes.STRING,
    },
    geburtsdatum: {
      type: DataTypes.STRING,
    },
    nationalitaet: {
      type: DataTypes.STRING,
    },
    telefon_arbeit: {
      type: DataTypes.STRING,
    },
    fax: {
      type: DataTypes.STRING,
    },
    groesse_cm: {
      type: DataTypes.INTEGER,
    },
    gewicht_kg: {
      type: DataTypes.INTEGER,
    },
    familienstand: {
      type: DataTypes.STRING,
    },
    beruf: {
      type: DataTypes.STRING,
    },
    taetigkeit: {
      type: DataTypes.STRING,
    },
    geschlecht: {
      type: DataTypes.STRING,
    },
    kandidat: {
      type: DataTypes.STRING,
    },
    casting_ort: {
      type: DataTypes.STRING,
    },
    casting: {
      type: DataTypes.STRING,
    },
    recherche: {
      type: DataTypes.STRING,
    },
    streetcaster: {
      type: DataTypes.STRING,
    },
    notizen: {
      type: DataTypes.STRING,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    pictureurl: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'casts',
    underscored: true,
    
    schema: process.env.DATABASE_SCHEMA,
  });

  Model.associate = (models) => {
  };

  return Model;
};

