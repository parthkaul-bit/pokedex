import { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { useAppDispatch } from "../app/hooks";
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData";
import { useAppSelector } from "../app/hooks";
import { getPokemonData } from "../app/reducers/getPokemonData";
import Pokemon from "./Pokemon";
import PokemonCardGrid from "../components/PokemonCardGrid";

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );
  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonData(randomPokemonsId));
    }
  }, [allPokemon, dispatch]);

  return (
    <>
      <div className="search">
        <input type="text" id="" />
        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  );
}

export default Wrapper(Search);
