import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    checkedSong: false,
    loading: false,
  };

  click = async ({ target: { value } }) => {
    const { obj } = this.props;
    const track = obj.find((element) => element.trackId === value);
    this.setState({ loading: true });
    await addSong(track);
    this.setState({ loading: false, checkedSong: true });
  };

  render() {
    const { trackName, previewUrl, trackId, checked } = this.props;
    const { checkedSong, loading } = this.state;
    return (
      <div>
        {
          loading ? <Loading /> : (
            <div>
              <h4>{ trackName }</h4>
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
              </audio>
              <label htmlFor={ trackId }>
                Favorita
                <input
                  type="checkbox"
                  id={ trackId }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ checked || checkedSong }
                  onChange={ this.click }
                />
              </label>
            </div>)
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
  obj: PropTypes.shape,
  checked: PropTypes.bool,
}.isRequired;

export default MusicCard;
