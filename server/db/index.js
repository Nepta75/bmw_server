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

bmwdb.getdashboard = () => {
    return new Promise((resolve, reject) => {
        pool.query(`SELECT
        (SELECT COUNT(*) FROM view_devis) as devis,
        (SELECT COUNT(*) FROM view_veh_neuf) as vehiculeNeuf,
        (SELECT COUNT(*) FROM view_veh_occas) as vehiculeOccasion,
        (SELECT COUNT(*) FROM view_veh_client) as vehiculeClient,
        (SELECT COUNT(*) FROM view_essayer) as essai,
        (SELECT COUNT(*) FROM view_client) as client,
        (SELECT COUNT(*) FROM view_technicien) as technicien,
        (SELECT COUNT(*) FROM view_admin) as admin,
        (SELECT COUNT(*) FROM vehicule) as vehicules,
        (SELECT COUNT(*) FROM user) as users;`, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

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
    const { idUser, marque, modele, immatriculation, dateImmat, cylindree, etat, info, km, img1, img2, typeBoite, energie, typeVeh } = body;
    return new Promise((resolve, reject) => {
        try {
            switch (type) {
                case 'client':
                pool.query(`call insert_veh_client(${idUser}, '${marque}', '${modele}', '${dateImmat}', '${immatriculation}', '${typeVeh}', '${cylindree}', '${energie}', '${typeBoite}', '${etat}', '${info}', '${km}', '${img1}', '${img2}')`, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve([{ status: "success" }]);
                });
                break;

                case 'occasion':
                pool.query(`call insert_veh_client(3, '${marque}', '${modele}', '2018-09-24', '${immatriculation}', '${typeVeh}', ${cylindree}, '${energie}', '${typeBoite}', 'bon etat', '', 78500, '${img1}', '${img2}')`, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve([{ status: "success" }]);
                });
                break;

                case 'neuf':
                pool.query(`call insert_veh_client(3, '${marque}', '${modele}', '2018-09-24', '${immatriculation}', '${typeVeh}', ${cylindree}, '${energie}', '${typeBoite}', 'bon etat', '', 78500, '${img1}', '${img2}')`, (err, results) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve([{ status: "success" }]);
                });
                break;
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