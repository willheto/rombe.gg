import React, { useState, useEffect } from 'react'
import './sidepanel.css'
import './MatchFolder'
import Axios from 'axios'

const Sidepanel = (props) => {

 
    const [division1, setDivision1] = useState(0)
    const [division2, setDivision2] = useState(0)
    console.log(division1 === 0)
    if (division1 === 0) {
        switch (props.rank.division1) {
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
        switch (props.rank.division2) {
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
    console.log(`https://opgg-static.akamaized.net/images/medals/${props.rank.tier1}_${division1}.png?image=q_auto:best&v=1`)


    return (
        <div class="sidepanel">
            <h2>Solo/Duo Queue</h2>
            <img class="rankImg" src={`https://opgg-static.akamaized.net/images/medals/${props.rank.tier1}_${division1}.png?image=q_auto:best&v=1`} />
            <h1>{props.rank.tier1} {props.rank.division1} {props.rank.lp1} LP</h1>
            <hr></hr>
            <h2>Flex Queue</h2>
            <img class="rankImg" src={`https://opgg-static.akamaized.net/images/medals/${props.rank.tier2}_${division2}.png?image=q_auto:best&v=1`} />
            <h1>{props.rank.tier2} {props.rank.division2} {props.rank.lp2} LP</h1>
        </div>
    )

}

export default Sidepanel;
