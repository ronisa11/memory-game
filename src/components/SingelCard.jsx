import React from 'react'
import './SingelCard.css'
export default function SingelCard({ card, handleChoice,  flipped, disabled}) {


    const handleClick = () => {
        if(!disabled){
            handleChoice(card)
        }
    }

    return (
        <div className="card"  >
            <div className={flipped ? " flipped" : ""}>
                <img className='front' src={card.src} alt="card front" />
                <img
                    className='back'
                    src="src/img/cover2.jpg"
                    onClick={handleClick}
                    alt="card back"/>
            </div>
        </div>
    )
}

