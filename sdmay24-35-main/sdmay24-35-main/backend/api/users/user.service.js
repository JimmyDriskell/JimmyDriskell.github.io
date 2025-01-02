const getPool = require("../../dbconfig.js");

const executeQuery = async (sql, params = []) => {
    const pool = await getPool();
    return new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results) => {
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
};

module.exports = {
    create: async (data) => {
        const sql = `INSERT INTO users (password, email, net_ID, age, gender, ethnicity, credits, stem_interest, institution, role, program) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return await executeQuery(sql, [data.password, data.email, data.net_ID, data.age, data.gender, data.ethnicity, data.credits, data.stem_interest, data.institution, data.role, data.program]);
    },

    getUsers: async () => {
        const sql = 'SELECT * FROM users';
        return await executeQuery(sql);
    },

    deleteUserByNetID: async (net_ID) => {
        const sql = 'DELETE FROM users WHERE net_ID = ?';
        return await executeQuery(sql, [net_ID]);
    },

    getUserByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return await executeQuery(sql, [email]);
    },

    getUserByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        return await executeQuery(sql, [email]);
    },

    signup: async (data) => {
        const sql = `INSERT INTO users (email, password, role) VALUES (?, ?, ?)`;
        return await executeQuery(sql, [data.email, data.password, 'user']);
    },

    updateUser: async (data) => {
        const sql = `UPDATE users SET email = ?, net_ID = ?, age = ?, gender = ?, ethnicity = ?, credits = ?, stem_interest = ?, institution = ?, role = ?, program = ? WHERE email = ?`;
        return await executeQuery(sql, [data.email, data.net_ID, data.age, data.gender, data.ethnicity, data.credits, data.stem_interest, data.institution, data.role, data.program, data.email]);
    },

    newAdmin: async (email) => {
        const sql = `UPDATE users SET role = 'admin' WHERE email = ?`;
        return await executeQuery(sql, [email]);
    },

    resetPassword: async (email, password) => {
        const sql = `UPDATE users SET password = ? WHERE email = ?`;
        return await executeQuery(sql, [password, email])
    }
};