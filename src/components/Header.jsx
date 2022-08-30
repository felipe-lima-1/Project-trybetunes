import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    nome: '',
    loading: false,
  };

  componentDidMount() {
    this.userName();
  }

  userName = async () => {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      nome: userInfo,
      loading: false,
    });
  };

  render() {
    const { nome, loading } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/search" data-testid="link-to-search">Busca</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        {loading ? (<Loading />) : (<p data-testid="header-user-name">{nome.name}</p>)}
      </header>
    );
  }
}

export default Header;
