import React, { useEffect, useCallback, useState } from "react";
import Wrapper from "../sections/Wrapper";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import axios from "axios";
import { pokemonsRoute, pokemonSpeciesRoute } from "../utils/Constant";
import { defaultImages, images } from "../utils/getPokemonImages";
import { extractColors } from "extract-colors";
import Description from "./PokemonPages/Description";
import Location from "./PokemonPages/Location";
import CapableMoves from "./PokemonPages/CapableMoves";
import Evolution from "./PokemonPages/Evolution";
import { setCurrentPokemon } from "../app/slices/PokemonSlice";
import Loader from "../components/Loader";

function Pokemon() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { currentPokemonTab } = useAppSelector(({ app }) => app);
  const currentPokemon = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  const getRecursiveEvolution: any = useCallback(
    (evolutionChain: any, level: number, evolutionData: any) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain: any) => {
      const evolutionData: any[] = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const [isDataLoading, setIsDataLoading] = useState(true);

  const getPokemonInfo = useCallback(
    async (image: string) => {
      const { data } = await axios.get(`${pokemonsRoute}/${params.id}`);
      const { data: dataEncounters } = await axios.get(
        data.location_area_encounters
      );
      const {
        data: {
          evolution_chain: { url: evolutionURL },
        },
      } = await axios.get(`${pokemonSpeciesRoute}/${data.id}`);
      const { data: evolutionData } = await axios.get(evolutionURL);

      const encounters: string[] = [];
      dataEncounters.forEach((encounter: any) => {
        encounters.push(
          encounter.location_area.name.toUpperCase().split("-").join(" ")
        );
      });
      console.log({ data });
      const pokemonAbilities: { abilities: string[]; moves: string[] } = {
        abilities: data.abilities.map(
          ({ ability }: { ability: { name: string } }) => ability.name
        ),
        moves: data.moves.map(
          ({ move }: { move: { name: string } }) => move.name
        ),
      };
      const evolution = getEvolutionData(evolutionData.chain);
      const evolutionLevel = evolution.find(
        ({ pokemon }) => pokemon.name === data.name
      ).level;
      dispatch(
        setCurrentPokemon({
          id: data.id,
          name: data.name,
          types: data.types.map(
            ({ type: { name } }: { type: { name: string } }) => name
          ),
          image,
          stats: data.stats.map(
            ({
              stat,
              base_stat,
            }: {
              stat: { name: string };
              base_stat: number;
            }) => ({
              name: stat.name,
              value: base_stat,
            })
          ),
          encounters,
          evolutionLevel,
          evolution,
          pokemonAbilities,
        })
      );
      setIsDataLoading(false);
    },
    [getEvolutionData, params.id, dispatch]
  );

  useEffect(() => {
    const imageElemet = document.createElement("img");
    // @ts-ignore
    imageElemet.src = images[params.id];
    if (!imageElemet.src) {
      // @ts-ignore
      imageElemet.src = defaultImages[params.id];
    }

    const options = {
      pixels: 10000,
      distance: 1,
      splitPower: 10,
      colorValidator: (red: number, green: number, blue: number, alpha = 255) =>
        alpha > 250,
      saturationDistance: 0.2,
      lightnessDistance: 0.2,
      hueDistance: 0.083333333,
    };

    const getColor = async () => {
      const color = await extractColors(imageElemet.src, options);
      const root = document.documentElement;
      root.style.setProperty("--accent-color", color[0].hex.split('"')[0]);
    };
    getColor();

    getPokemonInfo(imageElemet.src);
  }, [params, getPokemonInfo]);

  return (
    <>
      {!isDataLoading && currentPokemon ? (
        <>
          {currentPokemonTab === pokemonTabs.description && <Description />}
          {currentPokemonTab === pokemonTabs.evolution && <Evolution />}
          {currentPokemonTab === pokemonTabs.locations && <Location />}
          {currentPokemonTab === pokemonTabs.moves && <CapableMoves />}
        </>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Wrapper(Pokemon);

// Tabbing Structure

export const pokemonTabs = {
  description: "description",
  evolution: "evolution",
  locations: "locations",
  moves: "moves",
};

const routes = [
  {
    name: pokemonTabs.description,
    value: "Description",
  },
  {
    name: pokemonTabs.evolution,
    value: "Evolution",
  },
  {
    name: pokemonTabs.locations,
    value: "Catching",
  },
  {
    name: pokemonTabs.moves,
    value: "Capable Moves",
  },
];
