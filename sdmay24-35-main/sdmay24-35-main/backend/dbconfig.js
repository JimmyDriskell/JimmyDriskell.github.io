const { createPool }  = require('mysql');
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');

const secret_name = "test2/iinspire-backend/MySQL";
const client = new SecretsManagerClient({ region: "us-east-2" });

async function getPool() {
    let response;
    try {
        response = await client.send(
            new GetSecretValueCommand({
                SecretId: secret_name,
                VersionStage: "AWSCURRENT",
            })
        );
    } catch (error) {
        throw error;
    }

    const secret = response.SecretString;
    const secretJSON = JSON.parse(secret);

    return createPool({
        host: secretJSON.host,
        user: secretJSON.user,
        password: secretJSON.password,
        database: secretJSON.database,
    });
}

function closePool() {
    return new Promise((resolve, reject) => {
        if (!pool) {
            resolve();
            return;
        }
        pool.end(err => {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = getPool, closePool;
