import express from "express"
import cors from "cors"
import fs from "fs" // usado para ler o arquivo JSON

const app = express()

app.use(cors())
app.use(express.json())

//rota principal
app.get("/", (req, res) => {
    res.json("Tela Principal")
})

// Rota que lê o json e retorna todas as informações do membros da equipe
app.get('/api/vingadores', (req, res) =>
{
    try{
        //le o arquivo json de forma sincrona
        const data = fs.readFileSync('vingadores.json', 'utf8')
        const vingadores = JSON.parse(data)

        res.json(vingadores)
    }catch(error){
        //Se ocore o erro retorna uma mensagem de erro
        res.status(500).json({error: 'Erro ao ler o arquivo JSON'})
    }

})

app.get('/api/vingadores/identidades', (req, res) => {
    try{
        const data = fs.readFileSync('vingadores.json', 'utf8')
        const vingadores = JSON.parse(data)
        //console.log(vingadores[0].identidadesSecreta);
        //extrai apena as identidades secretas dos membros
        const identidadeSecreta = vingadores.membros.map(membro => membro.identidadeSecreta)  

        res.json(identidadeSecreta)
    }catch(error){
        //se ocorre o erro retorna uma mensagem de erro
        res.status(500).json({error: 'Erro ao ler o arquivo JSON'})
    }
})

// Nova rota --> Retornando idades e poderes
app.get('/api/vingadores/idade-poderes', (req, res) => {
    try{
        const data = fs.readFileSync('vingadores.json', 'utf8')
        const vingadores = JSON.parse(data)

        const idadePoderes = vingadores.membros.map(membro => ({
        nome : membro.nome,
        idade : membro.idade,
        poderes : membro.Poderes
        }));
        res.json({idadePoderes})
    }catch(error){
        //se ocorre o erro retorna uma mensagem de erro
        res.status(500).json({error: 'Erro ao ler o arquivo JSON'})
    }
})



const port = 3000
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`)
})
