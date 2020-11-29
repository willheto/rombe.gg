import axios from 'axios'
const baseUrl = 'http://localhost:3001'

const getIdByName = (summonername) => {
    return axios.get(`${baseUrl}/summoneridbyname`, {
        headers: {
            summonerName: summonername
        }
    })
}

const getRankById = (summonerid) => {
    return axios.get(`${baseUrl}/rank`, {
        headers: {
            summonerid: summonerid
        }
    })
}

const getMatchesByAccountId = (accountid) => {
    return axios.get(`${baseUrl}/api/matches`, {
        headers: {
            summonerId: accountid
        }
    })
}

const getMatchDetailsByGameId = (gameid) => {
    return axios.get(`${baseUrl}/api/matchDetails`, {
        headers: {
            matchId: gameid
        }
    })
}



export default {
    getIdByName,
    getRankById,
    getMatchesByAccountId,
    getMatchDetailsByGameId
}