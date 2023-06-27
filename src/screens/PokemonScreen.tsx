import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigator/Navigator';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FadeInImage from '../components/FadeInImage';
import usePokemon from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {id, name, picture} = simplePokemon;
  const {top} = useSafeAreaInsets();

  const {isLoading, pokemonFull} = usePokemon(id);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
        {/* BackButton */}
        <TouchableOpacity
          onPress={() => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 10,
          }}>
          <Icon name="arrow-back-outline" size={30} color={'#FF0F0F'} />
        </TouchableOpacity>

        {/* Nombre del Pokemon */}
        <Text
          style={{
            ...styles.pokemonName,
            top: top + 45,
          }}>
          {name + '\n'} #{id}
        </Text>
        {/* Pokebola Blanca */}
        <View>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
          <FadeInImage uri={picture} style={styles.pokemonImage} />
        </View>
      </View>
      {/* Detalles y Loading */}
      {isLoading ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator color={color} size={50} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemonFull} />
      )}
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    height: 370,
    zIndex: 998,
    borderBottomRightRadius: 800,
    borderBottomLeftRadius: 800,
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20,
  },
  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
