import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {ScrollView} from 'react-native-gesture-handler';
import FadeInImage from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types */}
      <View style={{...styles.container, marginTop: 360}}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => (
            <Text style={styles.regularText} key={type.name}>
              {type.name}
            </Text>
          ))}
        </View>

        {/* Peso */}
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight} kg</Text>
      </View>

      {/* Sprites */}
      <View style={styles.container}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView
        // style={}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Habilidades */}
      <View style={styles.container}>
        <Text style={styles.title}>Habilidades Basicas</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text style={styles.regularText} key={ability.name}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Movimientos */}
      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text style={styles.regularText} key={move.name}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.containerStats}>
        <Text style={styles.title}>Stats </Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}
              key={stat.stat.name + i}>
              <Text style={{...styles.regularText}}>{stat.stat.name}</Text>
              <Text style={{...styles.regularText, fontWeight: 'bold'}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>

        {/* Spray Final */}
        <View style={{marginBottom: 40, alignItems: 'center'}}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.bigSprite}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'black',
  },
  regularText: {
    fontSize: 20,
    marginRight: 10,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  bigSprite: {
    width: 140,
    height: 140,
  },
  containerStats: {
    alignItems: 'center',
    gap: 10,
  },
});
