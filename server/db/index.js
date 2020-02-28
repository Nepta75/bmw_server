import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'bmwv2',
    host: 'localhost',
});


let bmwdb = {};

bmwdb.vehicules = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM vehicule`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

bmwdb.vehicule = (id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM vehicule where id_vehicule = ?`, [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

bmwdb.vehiculeUser = (iduser) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_veh_client where id_user = ?`, [iduser], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

bmwdb.vehiculesType = (type) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_veh_${type}`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

bmwdb.vehiculesTypeById = (type, id) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_veh_${type} where id_vehicule = ?`, [id],  (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

bmwdb.viewsByType = (view) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_${view}`,  (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

bmwdb.viewByParams = (view, params, value) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_${view} where ${params} = ?`, [value], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        })
    })
}

bmwdb.clients = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_client`, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

module.exports = bmwdb;