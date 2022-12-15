import  Sequelize  from "sequelize";

export const db = new Sequelize('neondb', 'anugrahputra17', 'tJa3wMFXj2zc', {
  host: 'ep-little-sea-445865.ap-southeast-1.aws.neon.tech',
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
