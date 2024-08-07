import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getPokemonData } from "../../app/reducers/getPokemonData";
import Pokemon from "../Pokemon";
import PokemonCardGrid from "../../components/PokemonCardGrid";

const Evolution = () => {
  const [isloaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const { currentPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );
  useEffect(() => {
    const fetchData = async () => {
      const pokemons = currentPokemon?.evolution.map(({ pokemon }) => pokemon);
      await dispatch(getPokemonData(pokemons!));
      setIsLoaded(true);
    };

    fetchData();
  }, [dispatch, currentPokemon]);
  return (
    <div className="page">
      {isloaded && <PokemonCardGrid pokemons={randomPokemons!} />}
    </div>
  );
};

export default Evolution;
