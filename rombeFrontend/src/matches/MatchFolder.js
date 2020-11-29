import React, { useState } from 'react'
import Match from './Match'
import matchService from '../services/matches'
import axios from 'axios'
import './matchfolder.css'
import './Sidepanel'
import Sidepanel from './Sidepanel'
import Champions from '../champions.json'

const DATATYPE_SOLOQ = 1
const DATATYPE_FLEXQ = 0

const MatchFolder = (props) => {

    const [user, setUser] = useState([])
    const [matches, setMatches] = useState([])
    const [matchDetails, setMatchDetails] = useState([])
    const [rank, setRank] = useState([])

    function checkQueueValidity(queueData) {
        // check according to queuetype
        if (typeof (queueData) === 'undefined') return false

        return true
    }

    /// Set players tier, division and league points
    const setPlayerRank = (resp) => {

        let type = DATATYPE_FLEXQ
        let flexTier
        let flexDiv
        let flexLp
        let soloTier
        let soloDiv
        let soloLp
        if (checkQueueValidity(resp.data[type])) {
            flexTier = resp.data[type].tier
            flexDiv = resp.data[type].rank
            flexLp = resp.data[type].leaguePoints
        }
        type = DATATYPE_SOLOQ
        if (checkQueueValidity(resp.data[type])) {
            soloTier = resp.data[type].tier
            soloDiv = resp.data[type].rank
            soloLp = resp.data[type].leaguePoints
        }

        setRank({
            tier1: soloTier,
            div1: soloDiv,
            lp1: soloLp,
            tier2: flexTier,
            div2: flexDiv,
            lp2: flexLp
        })
    }

    const findUser = (event) => {

        event.preventDefault()

        matchService
            .getIdByName(user)
            .then(resp => {
                matchService
                    .getRankById(resp.data.id)
                    .then(resp => {
                        setPlayerRank(resp)
                    })

                matchService.getMatchesByAccountId(resp.data.accountId)
                    .then(resp => {
                        setMatches(resp.data.matches)
                        let gameInfo = [{}, {}, {}, {}, {}]

                        for (let index = 0; index < 5; index++) {

                            matchService.getMatchDetailsByGameId(resp.data.matches[index].gameId)
                                .then(resp => {

                                    switch (resp.data.queueId) {
                                        case 440:
                                            gameInfo[index].gameMode = "Ranked Flex"
                                            break;
                                        case 400:
                                            gameInfo[index].gameMode = "Draft Pick"
                                            break;
                                        case 420:
                                            gameInfo[index].gameMode = "Ranked Solo/Duo Queue"
                                            break;
                                        case 430:
                                            gameInfo[index].gameMode = "Blind Pick"
                                            break;
                                        case 450:
                                            gameInfo[index].gameMode = "ARAM"
                                            break;
                                        default:
                                            gameInfo[index].gameMode = "Ei tiedossa :D"

                                    }
                                    resp.data.participantIdentities.map(name => {


                                        if (name.player.summonerName.toLowerCase() == user.toLowerCase()) {
                                            resp.data.participants.map(partiC => {
                                                if (partiC.participantId == name.participantId) {
                                                    gameInfo[index].champion = Champions[partiC.championId]
                                                    if (partiC.stats.win == true) {
                                                        gameInfo[index].win = "Voitto"
                                                    } else if (partiC.stats.win == false) {
                                                        gameInfo[index].win = "Häviö"
                                                    }
                                                    gameInfo[index].kills = partiC.stats.kills
                                                    gameInfo[index].deaths = partiC.stats.deaths
                                                    gameInfo[index].assists = partiC.stats.assists


                                                }
                                            })
                                        }
                                    })

                                    gameInfo[index].id = index;
                                    gameInfo[index].duration = resp.data.gameDuration / 60


                                }
                                )
                        }
                        setMatchDetails([])
                        setMatchDetails(gameInfo)
                        setTimeout(function () { setUser(''); }, 1000);

                    })
            })
            .catch(error => {
                console.log(error)
                alert('Summoneria ei löytynyt')
            })
    }

    const changeUser = (event) => {
        event.preventDefault()
        setUser(event.target.value)
    }

    return (
        <div>
            <Sidepanel matches={matches} rank={rank}></Sidepanel>
            <div class="matchFolder">
                <h1>Etsi käyttäjä:</h1>
                <form onSubmit={findUser}>
                    <input value={user} onChange={changeUser}></input>
                    <button type="submit">Etsi</button>
                </form>
                <h1>Match history</h1>

                {matchDetails.map(match =>
                    <Match gameMode={match.gameMode} win={match.win} kills={match.kills} deaths={match.deaths} assists={match.assists} duration={match.duration} champion={match.champion}></Match>
                )}
            </div>
        </div>
    );
}


export default MatchFolder;
