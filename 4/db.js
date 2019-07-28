

var Sequelize = require("sequelize");
//rucno napravimo database na phpmyadmin, i on onda trazi da li ima pod ovim imenom
var sequel = new Sequelize("wt2018","root","root",{host:"127.0.0.1",dialect:"mysql",logging:false
,operatorsAliases: false 
//da warninge ne ispisuje
});
var db={};

db.Sequelize = Sequelize;  
db.sequel = sequel;

//import modela
db.vjezba = sequel.import(__dirname+'/vjezba.js');
db.zadatak = sequel.import(__dirname+'/zadatak.js');
db.godina = sequel.import(__dirname+'/godina.js');
db.student = sequel.import(__dirname+'/student.js');


//fk - foreign key, as - alias, mt - međutabela


//student -- vise na 1 -- godina
//fk studentGod, as studenti

db.godina.hasMany(db.student, {as:'studenti', foreignKey:'studentGod'});

//ne ovako
//db.godina.hasMany(db.student, {as:'studenti', foreignKey:'godina_id'});
//db.godina.hasMany(db.student, {as:'studenti'});

/*
confusinggg :

mod1.belongsTo(mod2) //kreira u mod1 fk -> mod2_id
mod1.hasMany(mod2) //kreira u mod2 fk -> mod1_id

*/

/*godina -- vise na vise -- vjezba
mt godina_vjezba, fk idgodina i idvjezba, as godine i vjezbe
*/

//belongsToMany vs hasMany
/*
belongsToMany - za veze vise na vise
hasMany - za vezu 1 na vise
 */
db.godina.belongsToMany(db.vjezba, {as:'vjezbe', foreignKey:'idgodina', through:'godina_vjezba'});

//moramo za medjutabelu dodati ovo lijevo od jednakosti
db.godina_vjezba=db.vjezba.belongsToMany(db.godina, {as:'godine', foreignKey:'idvjezba', through:'godina_vjezba'});
/*vjezba -- vise na vise -- zadatak
mt vjezba_zadatak, fk idvjezba i idzadatak, as vjezbe i zadaci, 
*/

db.vjezba.belongsToMany(db.zadatak, {as:'zadaci', foreignKey:'idvjezba', through:'vjezba_zadatak'});
db.zadatak.belongsToMany(db.vjezba, {as:'vjezbe', foreignKey:'idzadatak', through:'vjezba_zadatak'});


db.sequel.sync({force:true}).then();
module.exports=db;
