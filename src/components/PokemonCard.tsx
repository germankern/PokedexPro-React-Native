import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import FadeInImage from './FadeInImage';
import ImageColors from 'react-native-image-colors';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const PokemonCard = ({pokemon}: Props) => {
  //
  const [bgColor, setBgColor] = useState('grey');
  const isMounted = useRef(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
      cache: true,
      key: pokemon.picture,
    }).then((colors: any) => {
      if (!isMounted.current) return;

      colors.platform === 'ios';
      switch (colors.platform) {
        case 'android':
          setBgColor(colors.dominant || bgColor);
          break;
        case 'ios':
          setBgColor(colors.background || bgColor);
          break;
        case 'web':
          setBgColor(colors.dominant || bgColor);
          break;
        default:
          setBgColor(bgColor);
          break;
      }
    });
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    marginBottom: 25,
    borderRadius: 10,
    //Sombra de ShadowGenerator
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 8,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
    zIndex: 999,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    opacity: 0.5,
    overflow: 'hidden',
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
});
