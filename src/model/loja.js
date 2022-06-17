import Database from '../database/database.js';

async function createLoja(body){
  const { nome, descricao, telefone, termos, cnpj, id_empresario } = body;

  if (!nome || !telefone || !cnpj || !id_empresario){
    return { error: 1,mensage: 'Dados insuficientes.' };
  }
  
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      lojas
    WHERE
      id_empresario = ?
  `;

  const result = await db.get(sql, [id_empresario]);
  
  if(result){
    
    return { error: 1, mensage: 'Você já tem uma loja.' };

  } else {

    const sql = `
    INSERT INTO
      lojas (nome, descricao, telefone, termos, cnpj, id_empresario)
    VALUES
      (?, ?, ?, ?, ?, ?)
    `;

    await db.run(sql, [nome, descricao, telefone, termos, cnpj]);

    return { error: 0, mensage: 'Cadastro Realizado com Sucesso!' };
  }
}

async function verifyLoja(id){
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      lojas
    WHERE
      id_empresario = ?
  `;

  const result = await db.get(sql, [id]);
  
  if(result){
    
    return { result: 1 };

  } else {

    return { result: 0 };
  }
}

export default { createLoja, verifyLoja };