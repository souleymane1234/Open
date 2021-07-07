import React from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import films from '../Helpers/filmsData';
import FilmItem from './FilmItem';
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {films: [], isLoading: false};
    this.searchedText = '';
    this.totalPages = 0;
  }

  _loadfilms() {
    if (this.searchedText.length > 0) {
      this.setState({isLoading: true});
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false,
          });
        },
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }

_searchFilms() {
  this.page = 0
  this.totalPages = 0
  this.setState({
    films: [],
  }, () => { 
      console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombre de films : " + this.state.films.length)
      this._loadfilms() 
  })
}

  render() {
    console.log(this.state.isLoading);
    return (
      <View>
        <TextInput
          style={{
            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: '#000000',
            borderWidth: 1,
            paddingLeft: 5,
          }}
          placeholder="Titre du film"
          onChangeText={text => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadfilms()}
        />
        <Button title="Rechercher"onPress={() => this._searchFilms()} />

        <FlatList
          data={this.state.films}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item} />}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              // On vérifie qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadfilms();
            }
          }}
        />
        {this._displayLoading()}
      </View>
    );
  }
}

// Components/Search.js

const styles = StyleSheet.create({
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Search;
