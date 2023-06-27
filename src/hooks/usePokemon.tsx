import React, {useState, useEffect} from 'react';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {pokemonAPI} from '../api/pokemonAPI';

const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonFull, setPokemonFull] = useState<PokemonFull>(
    {} as PokemonFull,
  );

  const loadPokemon = async () => {
    const resp = await pokemonAPI.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );
    setPokemonFull(resp.data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  return {
    isLoading,
    pokemonFull,
  };
};

export default usePokemon;
