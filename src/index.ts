import express from 'express'
import mysql from 'mysql2/promise'
import 'dotenv/config'

//laaaaaaaaaaaaaaaaaaaaaaa

const app = express()
app.get('/', async (req, res) => {
      if (process.env.DBHOST === undefined){
            res.status(500).send('DBHOST não está definido nas variáveis de ambiente!')
            return
        }
        if (process.env.DBUSER === undefined){
            res.status(500).send('DBUSER não está definido nas variáveis de ambiente!') 
            return
        }
        if (process.env.DBPASSWORD === undefined){
            res.status(500).send('DBPASSWORD não está definido nas variáveis de ambiente!') 
            return
        }
        if (process.env.DBNAME === undefined){
            res.status(500).send('DBNAME não está definido nas variáveis de ambiente!') 
            return
        }
        if (process.env.DBPORT === undefined){
            res.status(500).send('DBPORT não está definido nas variáveis de ambiente!') 
            return
        }
        
        try{
        const conn = await mysql.createConnection({
        host: process.env.DBHOST,
        user: process.env.DBUSER,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        port: Number(process.env.DBPORT)
        })
        res.send('Conectado ao banco de dados com sucesso!') 
        }

    catch (err) {
        if(err instanceof Error === false){
            res.status(500).send('Erro desconhecido ao conectar ao banco de dados') 
        }
        const error = err as Error
        res.status(500).send('Erro ao conectar ao banco de dados: ' + error.message)
}
})


app.get('/produtos', async (req, res) => {
    try {
        const conn = await mysql.createConnection({
            host: process.env.DBHOST!,
            user: process.env.DBUSER!,
            password: process.env.DBPASSWORD!,
            database: process.env.DBNAME!,
            port: Number(process.env.DBPORT!)
        })
        const [rows] = await conn.query('SELECT id, nome, preco FROM produtos')
        res.json(rows)
    } catch (err) {
        if (err instanceof Error === false) {
            res.status(500).send('Erro desconhecido ao conectar ao banco de dados')
        }
        const error = err as Error
        res.status(500).send('Erro ao conectar ao banco de dados: ' + error.message)
    }
})

app.listen(8000, () => {
    console.log('Server is running on port 8000')
})

//Tarefa: Criar uma rota get para produtos que retorne a lista de produtos do banco de dados
//O produto deve ter id, nome, preco, urlfoto, descricao
//Deve-se criar uma tabela no banco de dados AIVEN para armazenar os produtos
//A resposta deve ser um array de produtos em formato JSON
//Crie o código sql para criar a tabela de produtos
//Faz pelo menos 3 inserções nessa tabela

// CREATE TABLE produtos (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     nome VARCHAR(100) NOT NULL,
//     preco DECIMAL(10, 2) NOT NULL,
//     urlfoto VARCHAR(255) NOT NULL,
//     descricao TEXT
// );

