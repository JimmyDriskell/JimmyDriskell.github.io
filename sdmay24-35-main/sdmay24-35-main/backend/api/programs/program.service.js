const getPool = require("../../dbconfig");

module.exports = {
    create: async (data) => {
        const pool = await getPool();
        const query = `INSERT INTO programs(program_name) VALUES (?)`;

        return new Promise((resolve, reject) => {
            pool.query(query, [data.program_name], (error, results) => {
                if (error) {
                    pool.end();
                    console.log('Pool has ended');
                    
                    if (error.code === 'ER_DUP_ENTRY') {
                        reject({
                            code: error.code,
                            errno: error.errno,
                            sqlState: error.sqlState,
                            message: `Cannot add duplicate program: ${data.program_name}. Please use a unique name.`
                        });
                    } else {
                        reject(error);
                    }
                } else {
                    pool.end();
                    console.log('Pool has ended');
                    resolve(results);
                }
            });
        });
    },
    getProgram: async () => {
        const pool = await getPool();
        const query = `SELECT * FROM programs`;

        return new Promise((resolve, reject) => {
            pool.query(query, (error, results) => {
                if (error) {
                    pool.end();
                    console.log('Pool has ended');
                    reject(error);
                } else {
                    pool.end();
                    console.log('Pool has ended');
                    resolve(results);
                }
            });
        });
    }
};
