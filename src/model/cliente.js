import Database from '../database/database.js';

async function createCliente(body){
  const { cpf, email, nome, senha, telefone, endereco } = body;
  
  if (!cpf || !email || !senha || !nome || !telefone || !endereco){
    return { error: 1,mensage: 'Dados insuficientes' };
  }
  
  const db = await Database.connect();

  const sql = `
    SELECT
      *
    FROM
      cliente
    WHERE
      cpf = ?
  `;

  const result = await db.get(sql, [cpf]);
  
  if(result){
    
    return { error: 2, mensage: 'Já existe cadastro com esse CPF.' };
  } else {

    const sql = `
    INSERT INTO
      cliente (cpf, email, nome, senha, telefone, endereco)
    VALUES
      (?, ?, ?, ?, ?, ?)
    `;

    await db.run(sql, [cpf, email, nome, senha, telefone, endereco]);

    return { error: 0, mensage: 'Cadastro Realizado com Sucesso!' };
  }
}

export default { createCliente };