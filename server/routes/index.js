import express from 'express';
import bmwdb from '../db';

const rooter = express.Router();

rooter.get('/', (req, res, next) => {
    res.send('acceuil');
});

console.log('bmwdb', bmwdb);

rooter.get('/getdashboard', async (req, res, next) => {
    try {
        const results = await bmwdb.getdashboard();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

.get('/vehicules', async (req, res, next) => {
    try {
        const results = await bmwdb.vehicules();
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

.delete('/deletevehicule/:id', async (req, res, next) => {
    try {
        const results = await bmwdb.deleteVehicule(req.params.id);
        res.json(results);
        console.log(res.json(results));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

.get('/vehicule/:id', async (req, res, next) => {
    try {
        const results = await bmwdb.vehicule(req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})
.get('/vehicule/client/:id', async (req, res, next) => {
    try {
        const results = await bmwdb.vehiculeUser(req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})
.get('/vehicules/type/:type', async (req, res, next) => {
    try {
        const results = await bmwdb.vehiculesType(req.params.type);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})
.get('/vehicules/type/:type/:id', async (req, res, next) => {
    try {
        const results = await bmwdb.vehiculesTypeById(req.params.type, req.params.id);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})
.get('/views/:view', async (req, res, next) => {
    try {
        const results = await bmwdb.viewsByType(req.params.view);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})
.get('/view/:view/:params/:value', async (req, res, next) => {
    try {
        const results = await bmwdb.viewByParams(req.params.view, req.params.params, req.params.value);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

.get('/view/:view/:params/:value', async (req, res, next) => {
    try {
        const results = await bmwdb.viewByParams(req.params.view, req.params.params, req.params.value);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

.get('/viewvehicules/:view/', async (req, res, next) => {
    try {
        const results = await bmwdb.viewVehicules(req.params.view);
        res.json(results);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})



rooter.get('/clients', async (req, res, next) => {
    try {
        const results = await bmwdb.clients();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})


rooter.post('/connect/', async (req, res, next) => {
    try {
        const results = await bmwdb.connect(req.body[0].mail, req.body[0].mdp);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

rooter.put('/addvehicule/:type', async (req, res, next) => {
    try {
        const results = await bmwdb.addVehicule(req.body[0], req.params.type);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = rooter;