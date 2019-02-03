// Load Sequelize module
const Sequelize = require('sequelize')

// Set up sequelize to use SQLite from .data/database.sqlite
const sequelize = new Sequelize('sqlite:./.data/database.sqlite', {
    logging: console.log
})


const db = {}


db.BlogUser = sequelize.define('BlogUser', {
  id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
   },
   username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }

})

db.BlogPost = sequelize.define('BlogPost', {
  id: {
     type: Sequelize.INTEGER,
     autoIncrement: true,
     primaryKey: true
   },
   title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }

})

// Add the Sequelize instance to the object
db.sequelize = sequelize

module.exports = db
