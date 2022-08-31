import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    dados: [],
  };

  componentDidMount() {
    this.catchMusic();
  }

  catchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ dados: musics });
  };

  render() {
    const { dados } = this.state;
    return (
      <main data-testid="page-album">
        Album
        <Header />
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
        {
          dados.length > 0 && (
            dados.map((e, index) => (
              index > 0 && (
                <MusicCard
                  trackName={ e.trackName }
                  previewUrl={ e.previewUrl }
                />
              )
            ))
          )
        }
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
