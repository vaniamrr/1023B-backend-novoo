import express from 'express'
import 'dotenv/config'
import { MongoClient } from 'mongodb'
import { Request, Response } from 'express'

const client = new MongoClient(process.env.MONGO_URI!)
await client.connect()
const db = client.db(process.env.MONGO_DB!)

const app = express()
//Explique o que esse middleware faz: Permite que o express entenda JSON e faça o parse do body na requisição
app.use(express.json())
//Criando uma rota para acesso pelo navegador
app.get('/produtos', async (req:Request, res:Response) => {
    const produtos = await db.collection('produtos').find().toArray()
    res.json(produtos)
})

app.post('/produtos', async (req:Request, res:Response) => {
    const {nome,preco,urlfoto,descricao} = req.body
    if(!nome || !preco || !urlfoto || !descricao) {
        return res.status(400).json({error: 'Nome, preço, urlfoto e descrição são obrigatórios'})
    }
    const produto = {nome,preco,urlfoto,descricao}
    const resultado = await db.collection('produtos').insertOne(produto)
    res.status(201).json({nome,preco,urlfoto,descricao,_id: resultado.insertedId})
})


//Criando o servidor na porta 8000 com express
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})