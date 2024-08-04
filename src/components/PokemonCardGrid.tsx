import { pokemonTypeInterface, userPokemonsType } from "../utils/Types";

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  return (
    <div className="pokemon-card-grid-container">
      <div className="pokemon-card-grid">
        {pokemons &&
          pokemons.length > 0 &&
          pokemons?.map((pokemon: userPokemonsType) => {
            return (
              <div className="pokemon-card" key={pokemon.id}>
                <div className="pokemon-card-list"></div>
                <div className="pokemon-card-compare"></div>
                <h3 className="pokemon-class-title">{pokemon.name}</h3>
                <img
                  src={pokemon.image}
                  alt="pokemon image"
                  className="pokemon-card-image"
                />
                <div className="pokemon-card-types">
                  {pokemon.types.map(
                    (type: pokemonTypeInterface, index: number) => {
                      const keys = Object.keys(type);
                      return (
                        <div className="pokemon-card-types-type" key={index}>
                          <img
                            src={type[keys[0]].image}
                            alt="pokemon type"
                            className="pokemon-card-types-type-image"
                            loading="lazy"
                          />
                          <h6 className="pokemon-card-types-type-text">
                            {keys[0]}
                          </h6>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default PokemonCardGrid;
