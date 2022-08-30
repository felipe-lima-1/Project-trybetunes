import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
    disableButton: true,
    redirect: false,
  };

  onChange = ({ target }) => {
    const { value } = target;
    this.setState({ nome: value }, () => this.disableButton());
  };

  disableButton = () => {
    const { nome } = this.state;
    const minValue = 3;
    if (nome.length >= minValue) {
      this.setState({ disableButton: false });
    } else {
      this.setState({ disableButton: true });
    }
  };

  render() {
    const { nome, disableButton, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        {
          loading ? <Loading /> : (
            <form>
              <input
                type="text"
                data-testid="login-name-input"
                onChange={ this.onChange }
              />
              <button
                type="button"
                disabled={ disableButton }
                data-testid="login-submit-button"
                onClick={ async () => {
                  this.setState({ loading: true });
                  await createUser({ name: nome });
                  this.setState({ loading: false, redirect: true });
                } }
              >
                Entrar
              </button>
              {
                redirect && <Redirect to="/search" />
              }

            </form>
          )
        }
      </div>
    );
  }
}

export default Login;

// Ajuda do Andre na Mentoria
