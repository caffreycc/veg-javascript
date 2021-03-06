import React, { useEffect, useState } from "react";
import Core2048 from "./logic";
import Tile from "./Tile";
import './index.css'

const instance = new Core2048()

export default function() {
    const [data, setData] = useState(instance.getMap())
    const [score, setScore] = useState(0)
    const handleKeyDown = (e: any) => {
        const code = e.keyCode
        if (code > 36 && code < 41) {
            const state = instance.getState()
            if (state === 'normal') {
                instance.move(e.keyCode)
                setData(() => instance.getMap())
                setScore(() => instance.getScore())
            } else {
                const timer = setTimeout(() => {
                    if (state === 'fail') {
                        alert('Game over!')
                    } else if (state === 'finished') {
                        alert('恭喜完成挑战!')
                    }
                    clearTimeout(timer)
                }, 300)
            }
        }
    }
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        };
    }, [])
    return (
        <div className='game2048 '>
            <div>
                <span>分数{score}</span>
            </div>
            <div className="pane">
                {
                    data.map((tile, index) => (
                        <Tile value={tile} key={index} position={index} />
                    ))
                }
            </div>
        </div>
    )
}