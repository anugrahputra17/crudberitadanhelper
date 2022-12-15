import  Sequelize  from "sequelize";

export const db = new Sequelize('neondb', 'bct808', 'gWBYcu3d8alA', {
  host: 'ep-late-glitter-714111.us-east-2.aws.neon.tech',
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
   },
 },
})

export default db;

