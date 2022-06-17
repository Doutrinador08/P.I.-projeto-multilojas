import express from 'express';
import morgan from 'morgan';
import cookieParser from "cookie-parser";
import router_empresario from './controller/empresario.js';
import router_loja from './controller/loja.js';
import router_cliente from './controller/cliente.js';
import Empresario from './model/empresario.js';
import DB from './database/migration.js';

const app = express();

app.use(cookieParser())

app.use(express.json());

app.use(morgan('tiny'));

app.use(express.static('src/view'));

app.use(router_empresario);
app.use(router_loja);
app.use(router_cliente);

app.post('/empresario/createAcess', async (req, res) => {
    const result = await Empresario.permissionAccess(req,res);
    
    if (result.error == 1){
        return res.send(result);
    } else if(result.error == 0){
        const code = await Empresario.createToken(result.id, result.email);
        res.cookie("access_token",code).send({error: 0});
    }
});
//DB.up(); // Executar a criação do Banco de Dados

app.listen(3000, () => console.log('http://localhost:3000/'));