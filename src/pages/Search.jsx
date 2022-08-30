import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
  };

  render() {
    const { artistName } = this.state;
    const minLength = 2;
    return (
      <div data-testid="page-search">
        <form>
          Search
          <Header />
          <input
            type="text"
            data-testid="search-artist-input"
            onChange={ ({ target }) => this.setState({ artistName: target.value }) }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ artistName.length < minLength }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
