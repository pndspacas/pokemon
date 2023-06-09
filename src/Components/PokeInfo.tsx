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

interface Pokemon {
    name: string;
    id: number;
    abilities: Ability[];
    stats: Stat[];
}

interface Props {
    data: Pokemon | null | undefined;
}

const PokeInfo = ({ data }: Props) => {
    return (
        <>

            {
                (!data) ? "" : (
                    <>
                        <h1>{data.name}</h1>
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`} alt="" />
                        <div className="abilities">
                            {
                                data.abilities.map((item) => {
                                    return (
                                        <>
                                            <div className="group">
                                                <h2>{item.ability.name}</h2>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <div className="base-stat">
                            {
                                data.stats.map((item) => {
                                    return (
                                        <>
                                            <h3>{item.stat.name} : {item.base_stat}</h3>
                                        </>
                                    )
                                })
                            }
                        </div>
                    </>
                )
            }

        </>
    )
}

export default PokeInfo