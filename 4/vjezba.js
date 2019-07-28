const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const vjezba = sequelize.define("vjezba",{
        naziv:{
            type:Sequelize.STRING(126),
            unique:true},
        spirala: Sequelize.BOOLEAN
       
    })
    return vjezba;
};
