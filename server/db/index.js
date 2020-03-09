import mysql from 'mysql';

const pool = mysql.createPool({
    connectionLimit: 10,
    password: 'lokman',
    user: 'lokman',
    database: 'bmwv2',
    host: 'localhost',
});


console.log('pool', pool);

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

bmwdb.connect = (mail, mdp) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM user WHERE mail = ? AND mdp = ?`, [mail, mdp], (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

bmwdb.addVehicule = (body, type) => {
    const { marque, modele, immatriculation, cylindree, prix, img1, img2, typeBoite, energie, typeVeh } = body;
    return new Promise((resolve, reject) => {
        try {
            switch (type) {
                case 'client':
                pool.insert(`call insert_veh_client(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [3, marque, modele, '2018-09-24', immatriculation, typeVeh, cylindree, energie, typeBoite, 'bon etat', '', 78500, img1, img2], (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return [{ status: "success" }];
                });
                break;
                default: break;
            }
        } catch (error) {
            return [{ error }];
        }
    });
};

bmwdb.viewVehicules = (view) => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM view_veh_${view}`, (err, results) => {
            if (err) {
                return reject(err)
            }
            return resolve(results);
        });
    });
};

module.exports = bmwdb;