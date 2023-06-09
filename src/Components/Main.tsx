import { useEffect, useState } from 'react'
import Card from './Card'
import PokeInfo from './PokeInfo'
import axios from 'axios'

interface Ability {
    ability: {
        name: string;
    };
}

interface Stat {
    stat: {
        name: string;
    };
    base_stat: number;
}

interface Sprite {
    front_default: string;
}

interface Pokemon {
    id: number;
    name: string;
    abilities: Ability[];
    stats: Stat[];
    sprites: Sprite;
    url: string
}


const Main = () => {
    const [pokeData, setPokedata] = useState<Pokemon[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [url, setUrl] = useState<string>("https://pokeapi.co/api/v2/pokemon")
    const [nextUrl, setNextUrl] = useState<string | null>()
    const [prevUrl, setPrevUrl] = useState<string | null>()
    const [pokeDex, setPokeDex] = useState<Pokemon | null>()

    const pokeFun = async () => {
        setLoading(true)
        const result = await axios.get(url)
        setNextUrl(result.data.next)
        setPrevUrl(result.data.previous)
        getPokemon(result.data.results)
        setLoading(false)
    }

    const getPokemon = async (result: Pokemon[]) => {
        result.map(async (item) => {
            const res = await axios.get(item.url)
            setPokedata(state => {
                state = [...state, res.data]
                state.sort((a, b) => a.id - b.id)
                return state
            })
        })
    }

    useEffect(() => {
        pokeFun()
    }, [url])

    return (
        <>
            <div className="container">
                <div className="left-content">
                    <Card pokemon={pokeData} loading={loading} infoPokemon={(poke: any) => setPokeDex(poke)} />
                    <div className="btn-group">
                        {prevUrl && <button onClick={() => {
                            setPokedata([])
                            setUrl(prevUrl)
                        }}>Previous</button>}
                        {nextUrl && <button onClick={() => {
                            setPokedata([])
                            setUrl(nextUrl)
                        }}>Next</button>}
                    </div>
                </div>
                <div className="right-content">
                    <PokeInfo data={pokeDex} />
                </div>
            </div>
        </>
    )
}

export default Main