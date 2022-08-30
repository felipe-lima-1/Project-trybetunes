import React from 'react';
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
        {loading ? (<Loading />) : (<p data-testid="header-user-name">{nome.name}</p>)}
      </header>
    );
  }
}

export default Header;
