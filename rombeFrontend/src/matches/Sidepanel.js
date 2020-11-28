import React, { useState, useEffect } from 'react'
import './sidepanel.css'
import './MatchFolder'
import Axios from 'axios'

const Sidepanel = (props) => {

    console.log(props)
 
    const [division1, setDivision1] = useState(0)
    const [division2, setDivision2] = useState(0)
    console.log(division1 === 0)
    if (division1 === 0) {
        switch (props.rank.div1) {
            case "II":
                setDivision1(2)
                break;
            case "I":
                setDivision1(1)
                break;
            case "IV":
                setDivision1(4)
                break;
            case "III":
                setDivision1(3)
                break;
            default:
                break;
        }
    }
    if (division2 === 0) {
        switch (props.rank.div2) {
            case "II":
                setDivision2(2)
                break;
            case "I":
                setDivision2(1)
                break;
            case "IV":
                setDivision2(4)
                break;
            case "III":
                setDivision2(3)
                break;
            default:
                break;
        }
    }


    function returnIconOfDivision(props) {

        let rankingSolo = 'default'
        let rankingFlex = 'default'

        console.log(typeof(props.rank.div1))
        if(typeof(props.rank.div1) !== 'undefined')
        {
            rankingSolo = props.rank.tier1
            rankingSolo = rankingSolo + "_"
            rankingSolo = rankingSolo + division1
        }
        console.log(rankingSolo)

        console.log(typeof(props.rank.div2))
        if(typeof(props.rank.div2) !== 'undefined') 
        {
            rankingFlex = props.rank.tier2
            rankingFlex = rankingFlex + "_"
            rankingFlex = rankingFlex + division2
            console.log(division2)
        }

        console.log(rankingFlex)
        return <div class="sidepanel">
            <h2>Solo/Duo Queue</h2>
            <img class="rankImg" src={`https://opgg-static.akamaized.net/images/medals/${rankingSolo}.png?image=q_auto:best&v=1`} />
            <h1>{props.rank.tier1} {props.rank.div1} {props.rank.lp1} LP</h1>
            <hr></hr>
            <h2>Flex Queue</h2>
            <img class="rankImg" src={`https://opgg-static.akamaized.net/images/medals/${rankingFlex}.png?image=q_auto:best&v=1`} />
            <h1>{props.rank.tier2} {props.rank.div2} {props.rank.lp2} LP</h1>
        </div>
    }


    return (

        returnIconOfDivision(props)
    )

}

export default Sidepanel;
