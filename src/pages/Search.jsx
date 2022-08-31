import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artista: '',
    name: '',
    album: [],
  };

  handleClick = () => {
    const { artista } = this.state;
    const teste = async () => {
      const album = await searchAlbumsAPI(artista);
      this.setState({
        name: artista,
        album,
        artista: '',
      });
    };
    teste();
  };

  render() {
    const { artista, name, album } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <form>
          Search
          <Header />
          <input
            type="text"
            data-testid="search-artist-input"
            value={ artista }
            onChange={ ({ target }) => this.setState({ artista: target.value }) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artista.length < minLength }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
          {!album.length ? 'Nenhum álbum foi encontrado' : (
            <div>
              <h4>{`Resultado de álbuns de: ${name}`}</h4>
              {album.map(({
                artistName,
                collectionId,
                collectionName,
                collectionPrice,
                artworkUrl100,
                releaseDate,
                trackCount,
              }) => (
                <div key={ collectionId }>
                  <img src={ artworkUrl100 } alt={ artistName } />
                  <h2>{ artistName }</h2>
                  <p>{ collectionPrice }</p>
                  <p>{ trackCount }</p>
                  <p>{ releaseDate }</p>
                  <Link
                    to={ `/album/${collectionId}` }
                    data-testid={ `link-to-album-${collectionId}` }
                  >
                    { collectionName }
                  </Link>
                </div>
              ))}
            </div>
          )}
        </form>
      </div>
    );
  }
}

export default Search;
