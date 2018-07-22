'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('kandidaten', {
    'ext_id': {
      type: DataTypes.INTEGER,
    },
    'Vorname': {
      type: DataTypes.STRING,
    },
    'Nachname': {
      type: DataTypes.STRING,
    },
    'Castingvideo vorhanden': {
      type: DataTypes.STRING,
    },
    'E_Mail': {
      type: DataTypes.STRING,
    },
    'Telefon Mobil': {
      type: DataTypes.STRING,
    },
    'Telefon Privat': {
      type: DataTypes.STRING,
    },
    'Anz Kinder': {
      type: DataTypes.INTEGER,
    },
    'Straße': {
      type: DataTypes.STRING,
    },
    'PLZ': {
      type: DataTypes.INTEGER,
    },
    'Ort': {
      type: DataTypes.STRING,
    },
    'Alter': {
      type: DataTypes.INTEGER,
    },
    'Geburtsdatum': {
      type: DataTypes.DATE,
    },
    'Nationalität': {
      type: DataTypes.STRING,
    },
    'Telefon Arbeit': {
      type: DataTypes.STRING,
    },
    'Fax': {
      type: DataTypes.STRING,
    },
    'Groeße in cm': {
      type: DataTypes.INTEGER,
    },
    'Gewicht in kg': {
      type: DataTypes.INTEGER,
    },
    'Familienstand': {
      type: DataTypes.STRING,
    },
    'Beruf Ausbildung Studium': {
      type: DataTypes.STRING,
    },
    'Derzeitige Tätigkeit': {
      type: DataTypes.STRING,
    },
    'Geschlecht': {
      type: DataTypes.STRING,
    },
    'Kandidat': {
      type: DataTypes.STRING,
    },
    'Castingort': {
      type: DataTypes.STRING,
    },
    'Casting': {
      type: DataTypes.STRING,
    },
    'Recherche': {
      type: DataTypes.STRING,
    },
    'Streetcaster': {
      type: DataTypes.STRING,
    },
    'Bemerkung': {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'kandidaten',
    underscored: true,
    timestamps: true,
    
  });

  Model.associate = (models) => {
  };

  return Model;
};

