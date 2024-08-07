import React from "react";
import { useAppSelector } from "../../app/hooks";
import { limit } from "firebase/firestore";

function Location() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );

  return (
    <div className="pokemon-locations">
      <ul className="pokemon-locations-list">
        {pokemonData?.encounters.map((encounter: string) => (
          <li className="pokemon-location" key={encounter}>
            {encounter}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Location;
