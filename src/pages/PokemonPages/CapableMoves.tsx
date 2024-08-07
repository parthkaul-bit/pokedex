import React from "react";
import { useAppSelector } from "../../app/hooks";
import { limit } from "firebase/firestore";

function CapableMoves() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  return (
    <div className="capable-moves">
      <h1 className="capable-moves-title">Abilities</h1>
      <ul className="capable-moves-list">
        {pokemonData?.pokemonAbilities?.abilities.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="capable-moves-title">Moves</h1>
      <ul className="capable-moves-list">
        {pokemonData?.pokemonAbilities?.moves.map((move: string) => (
          <li className="move" key={move}>
            {move}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CapableMoves;
