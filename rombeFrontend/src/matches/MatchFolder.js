import React, { useState } from 'react'
import Match from './Match'
import axios from 'axios'
import './matchfolder.css'
import './Sidepanel'
import Sidepanel from './Sidepanel'

const MatchFolder = (props) => {

    const champions =
    {
        "1": "Annie",
        "10": "Kayle",
        "101": "Xerath",
        "102": "Shyvana",
        "103": "Ahri",
        "104": "Graves",
        "105": "Fizz",
        "106": "Volibear",
        "107": "Rengar",
        "11": "Master Yi",
        "110": "Varus",
        "111": "Nautilus",
        "112": "Viktor",
        "113": "Sejuani",
        "114": "Fiora",
        "115": "Ziggs",
        "117": "Lulu",
        "119": "Draven",
        "12": "Alistar",
        "120": "Hecarim",
        "121": "Kha'Zix",
        "122": "Darius",
        "126": "Jayce",
        "127": "Lissandra",
        "13": "Ryze",
        "131": "Diana",
        "133": "Quinn",
        "134": "Syndra",
        "136": "Aurelion Sol",
        "14": "Sion",
        "143": "Zyra",
        "15": "Sivir",
        "150": "Gnar",
        "154": "Zac",
        "157": "Yasuo",
        "16": "Soraka",
        "161": "Vel'Koz",
        "163": "Taliyah",
        "164": "Camille",
        "17": "Teemo",
        "18": "Tristana",
        "19": "Warwick",
        "2": "Olaf",
        "20": "Nunu",
        "201": "Braum",
        "202": "Jhin",
        "203": "Kindred",
        "21": "Miss Fortune",
        "22": "Ashe",
        "222": "Jinx",
        "223": "Tahm Kench",
        "23": "Tryndamere",
        "236": "Lucian",
        "238": "Zed",
        "24": "Jax",
        "240": "Kled",
        "245": "Ekko",
        "25": "Morgana",
        "254": "Vi",
        "26": "Zilean",
        "266": "Aatrox",
        "267": "Nami",
        "268": "Azir",
        "27": "Singed",
        "28": "Evelynn",
        "29": "Twitch",
        "3": "Galio",
        "30": "Karthus",
        "31": "Cho'Gath",
        "32": "Amumu",
        "33": "Rammus",
        "34": "Anivia",
        "35": "Shaco",
        "36": "Dr. Mundo",
        "37": "Sona",
        "38": "Kassadin",
        "39": "Irelia",
        "4": "Twisted Fate",
        "40": "Janna",
        "41": "Gangplank",
        "412": "Thresh",
        "42": "Corki",
        "420": "Illaoi",
        "421": "Rek'Sai",
        "427": "Ivern",
        "429": "Kalista",
        "43": "Karma",
        "432": "Bard",
        "44": "Taric",
        "45": "Veigar",
        "48": "Trundle",
        "5": "Xin Zhao",
        "50": "Swain",
        "51": "Caitlyn",
        "53": "Blitzcrank",
        "54": "Malphite",
        "55": "Katarina",
        "56": "Nocturne",
        "57": "Maokai",
        "58": "Renekton",
        "59": "Jarvan IV",
        "6": "Urgot",
        "60": "Elise",
        "61": "Orianna",
        "62": "Wukong",
        "63": "Brand",
        "64": "Lee Sin",
        "67": "Vayne",
        "68": "Rumble",
        "69": "Cassiopeia",
        "7": "LeBlanc",
        "72": "Skarner",
        "74": "Heimerdinger",
        "75": "Nasus",
        "76": "Nidalee",
        "77": "Udyr",
        "78": "Poppy",
        "79": "Gragas",
        "8": "Vladimir",
        "80": "Pantheon",
        "81": "Ezreal",
        "82": "Mordekaiser",
        "83": "Yorick",
        "84": "Akali",
        "85": "Kennen",
        "86": "Garen",
        "89": "Leona",
        "9": "Fiddlesticks",
        "90": "Malzahar",
        "91": "Talon",
        "92": "Riven",
        "96": "Kog'Maw",
        "98": "Shen",
        "99": "Lux"
    }

    const [user, setUser] = useState([])
    const [matches, setMatches] = useState([])
    const [matchDetails, setMatchDetails] = useState([])
    const [rank, setRank] = useState([])

    const findUser = (event) => {

        event.preventDefault()
        console.log(user)
        axios.get('http://localhost:3001/summoneridbyname', {
            headers: {
                summonerName: user
            }
        }).then(resp => {
            axios.get('http://localhost:3001/rank', {
                headers: {
                    summonerid: resp.data.id
                }
            }).then(resp => {

                setRank({
                    tier1: resp.data[0].tier,
                    division1: resp.data[0].rank,
                    lp1: resp.data[0].leaguePoints,
                    tier2: resp.data[1].tier,
                    division2: resp.data[1].rank,
                    lp2: resp.data[1].leaguePoints
                })
            })
            console.log(resp.data)
            axios.get('http://localhost:3001/api/matches', {
                headers: {
                    summonerId: resp.data.accountId
                }
            }).then(resp => {

                setMatches(resp.data.matches)
                let gameInfo = [{}, {}, {}, {}, {}]
                console.log(gameInfo)

                for (let index = 0; index < 5; index++) {

                    axios.get('http://localhost:3001/api/matchDetails', {
                        headers: {
                            matchId: resp.data.matches[index].gameId
                        }
                    }).then(resp => {
                        console.log(resp.data)
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
                                        gameInfo[index].champion = champions[partiC.championId]
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
                        console.log(gameInfo[index])
                        gameInfo[index].id = index;
                        gameInfo[index].duration = resp.data.gameDuration / 60


                    }
                    )
                }
                setMatchDetails([])
                setMatchDetails(gameInfo)
                setTimeout(function () { setUser(''); }, 1000);
                console.log(matchDetails)

            })
        })
    }

    const changeUser = (event) => {
        event.preventDefault()

        setUser(event.target.value)
        console.log(user)
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
