import mysql from "serverless-mysql";

const MySQL = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
});

const executeQuery = async ({ query }) => {
  try {
    // return query;
    const results = await MySQL.query(query);
    await MySQL.end();
    return results;
  } catch (error) {
    return { error: error };
  }
};

export default executeQuery;
