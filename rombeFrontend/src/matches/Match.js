import React from 'react'
import './match.css'

const Match = (props) => {



    if (props.win === "Voitto") {
        return (

            <div class="matchWon">

                <img alt="champion played" class="championImg" src={`https://opgg-static.akamaized.net/images/lol/champion/${props.champion}.png?image=c_scale,q_auto,w_46&v=1606405946`} />
                <b>
                    <p>

                        {props.gameMode} {props.win}
                        <br></br>
                        {props.duration.toFixed(0)} Minuuttia
                        <br></br>
                        {props.kills}/{props.deaths}/{props.assists}
                    </p>
                </b>
            </div>
        );
    } else if (props.win === "Häviö") {
        return (

            <div class="matchLost">
                <img alt="champion played" class="championImg" src={`https://opgg-static.akamaized.net/images/lol/champion/${props.champion}.png?image=c_scale,q_auto,w_46&v=1606405946`} />
                <b>
                    <p>
                        {props.gameMode} {props.win}
                        <br></br>
                        {props.duration.toFixed(0)} Minuuttia
                        <br></br>
                        {props.kills}/{props.deaths}/{props.assists}
                    </p>
                </b>

            </div>
        );
    } else {
        return (

            <div class="matchLoading">
                <b>
                    <p>
                        Ladataan...
                    </p>
                </b>

            </div>
        );
    }
}

export default Match;
