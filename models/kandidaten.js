'use strict';

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('cast', {
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
    'Fernseherfahrung': {
      type: DataTypes.STRING,
    },
    'Bearbeiter': {
      type: DataTypes.STRING,
    },
    'Anz Kinder': {
      type: DataTypes.INTEGER,
    },
    'Notizen Kinder': {
      type: DataTypes.STRING,
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
    'bild_1': {
      type: DataTypes.STRING,
    },
    'bild_2': {
      type: DataTypes.STRING,
    },
    'bild_3': {
      type: DataTypes.STRING,
    },
    'bild_4': {
      type: DataTypes.STRING,
    },
    'bild_5': {
      type: DataTypes.STRING,
    },
    'bild_6': {
      type: DataTypes.STRING,
    },
    'bild_7': {
      type: DataTypes.STRING,
    },
    'bild_8': {
      type: DataTypes.STRING,
    },
    'video_1': {
      type: DataTypes.STRING,
    },
    'video_2': {
      type: DataTypes.STRING,
    },
    'video_3': {
      type: DataTypes.STRING,
    },
    'video_4': {
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

