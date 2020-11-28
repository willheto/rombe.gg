const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')

app.use(cors())

app.get('/api/matches', (req, res) => {
    console.log('GET MATSIEN TIEDOT')
    axios.get(`https://eun1.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.headers.summonerid}`, {
        headers: {
            'X-Riot-Token': 'RGAPI-f735d4c5-35c6-4db3-8451-275be4d835a6'
        }
    }).then(resp => {
        
        res.send(resp.data)
    })


})

app.get('/api/matchDetails', (req, res) => {
    console.log('GET MATSIN TIEDOT')
    axios.get(`https://eun1.api.riotgames.com/lol/match/v4/matches/${req.headers.matchid}`, {
        headers: {
            'X-Riot-Token': 'RGAPI-f735d4c5-35c6-4db3-8451-275be4d835a6'
        }
    }).then(resp => {
        res.send(resp.data)
    })
})

app.get('/rank', (req, res) => {
    console.log('GET RANK')
    axios.get(`https://eun1.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.headers.summonerid}`, {
        headers: {
            'X-Riot-Token': 'RGAPI-f735d4c5-35c6-4db3-8451-275be4d835a6'
        }
    }).then(resp => {
        res.send(resp.data)
    })
})

app.get('/summonerIdByName', (req, res) => {
    console.log('GET SUMMONER NAME BY ID')

    axios.get(`https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${req.headers.summonername}`, {
        headers: {
            'X-Riot-Token': 'RGAPI-f735d4c5-35c6-4db3-8451-275be4d835a6'
        }
    }).then(resp => {

        res.send(resp.data)
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
