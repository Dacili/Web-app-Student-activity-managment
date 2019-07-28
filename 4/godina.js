const Sequelize = require("sequelize");

module.exports = function(sequelize,DataTypes){
    const godina = sequelize.define("godina",{
       nazivGod:{
        type:Sequelize.STRING(126),
        //kad je unique mora se ograniciti, inace baca exception key je too longg
        unique:true},
        nazivRepSpi:Sequelize.STRING,
        nazivRepVje:Sequelize.STRING
    })
    return godina;
};
