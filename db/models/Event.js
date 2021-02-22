const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const EventModal = sequelize.define("Event", {

    organizer: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notContains:"event"
      },
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    numOfSeats: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
      },
    },
    bookedSeats: {
      type: DataTypes.INTEGER,
      validate: {
        isGreaterThanNumOfSeats(value) {
          if (value > this.numOfSeats) {
            throw new Error(
              "Booked seats can't be greater than number of seats "
            );
          }
        },
      },
    },
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isAfter: new Date().toLocaleDateString(),
      },
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
      },
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    }
  },{
      timestamps:false
  });

  SequelizeSlugify.slugifyModel(EventModal, {
    source: ["name"],
  });

  return EventModal;
};
