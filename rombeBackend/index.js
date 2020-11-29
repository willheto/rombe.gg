const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const morgan = require('morgan')

require('dotenv').config()

app.use(cors())
app.use(morgan('tiny'))

const token = process.env.KEY

app.get('/api/matches', (req, res) => {
    axios.get(`https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.headers.summonerid}`, {
        headers: {
            'X-Riot-Token': token
        }
    }).then(resp => {
        res.send(resp.data)
    })


})

app.get('/api/matchDetails', (req, res) => {
    axios.get(`https://eun1.api.riotgames.com/lol/match/v4/matches/${req.headers.matchid}`, {
        headers: {
            'X-Riot-Token': token
        }
    }).then(resp => {
        res.send(resp.data)
    })
})

app.get('/rank', (req, res) => {
    axios.get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.headers.summonerid}`, {
        headers: {
            'X-Riot-Token': token
        }
    }).then(resp => {
        res.send(resp.data)
    })
})

app.get('/summonerIdByName', (req, res) => {
    axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.headers.summonername}`, {
        headers: {
            'X-Riot-Token': token
        }
    }).then(resp => {
        res.send(resp.data)
    }).catch(error => {
        return res.status(404).json({ error: error })
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
