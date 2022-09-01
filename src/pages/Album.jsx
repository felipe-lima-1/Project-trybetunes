import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from './Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    dados: [],
    loading: true,
    favoriteSongs: [],
  };

  componentDidMount() {
    this.catchMusic();
    this.songsFavorites();
  }

  catchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ dados: musics });
  };

  songsFavorites = async () => {
    const favoritos = await getFavoriteSongs();
    const songs = favoritos.map((element) => element.trackId);
    this.setState({ loading: false, favoriteSongs: songs });
  };

  render() {
    const { dados, loading, favoriteSongs } = this.state;
    return (
      <main data-testid="page-album">
        Album
        <Header />
        {loading ? <Loading /> : (
          <div>
            {dados.length > 0 && (
              <section>
                <h5 data-testid="artist-name">
                  {dados[0].artistName}
                </h5>
                <h6 data-testid="album-name">
                  {dados[0].collectionName}
                </h6>
              </section>
            )}
            {dados.length > 0 && (
              dados.map((e, index) => (
                index > 0 && (
                  <MusicCard
                    trackName={ e.trackName }
                    previewUrl={ e.previewUrl }
                    trackId={ e.trackId }
                    obj={ dados }
                    checked={ favoriteSongs.find((song) => (
                      song === e.trackId)) }
                  />
                )
              ))
            )}
          </div>
        )}
      </main>
    );
  }
}
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
