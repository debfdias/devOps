import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Field, reduxForm } from 'redux-form';
import { Container, Input, Button, Item, Spinner } from '../common';
import styles from './authStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  clearState: PropTypes.func.isRequired,
  signUpUser: PropTypes.func.isRequired,
  authError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

class Signup extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearState();
  }

  handleFormSubmit(props) {
    const { email, password, firstname, lastname, birth } = props;

    this.props.signUpUser({ email, password, firstname, lastname, birth });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>

        <Item>
          <Field
            name="firstname"
            component={Input}
            placeholder="Nome"
          />
        </Item>

        <Item>
          <Field
            name="lastname"
            component={Input}
            placeholder="Sobrenome"
          />
        </Item>

        <Item>
          <Field
            name="email"
            component={Input}
            placeholder="E-mail"
            autoCapitalize={'none'}
          />
        </Item>

        <Item>
          <Field
            name="birth"
            component={Input}
            placeholder="Data de nascimento"
            autoCapitalize={'none'}
          />
        </Item>


        <Item>
          <Field
            name="password"
            component={Input}
            secureTextEntry
            placeholder="Senha"
          />
        </Item>

        <Item>
          <Field
            name="repassword"
            component={Input}
            secureTextEntry
            placeholder="Confirme a senha"
          />
        </Item>

        {this.props.authError
          ?
            <Text style={styles.error}>
              {this.props.authError}
            </Text>
          :
            <View />}

        {this.props.loading
          ?
            <Item style={styles.loadingContainer}>
              <Spinner />
            </Item>
          :
            <Item>
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Cadastre</Button>
            </Item>}

        <Item>
          <TouchableOpacity
            onPress={() => Actions.signin()}
            style={styles.questionContainer}
          >
            <Text style={styles.questionText}>
             Login se já for cadastrado
            </Text>
          </TouchableOpacity>
        </Item>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['firstname', 'lastname', 'birth', 'email', 'password'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} campo obrigatorio`;
    }
  });

  if (props.firstname && props.firstname.length < 3) {
    errors.firstname = 'Minimo de 3 caracteres';
  } else if (props.firstname && props.firstname.length > 20) {
    errors.firstname = 'Maximo de 20 caracteres';
  }

  if (props.lastname && props.lastname.length < 3) {
    errors.lastname = 'Minimo de 3 caracteres';
  } else if (props.lastname && props.lastname.length > 20) {
    errors.lastname = 'Maximo de 20 caracteres';
  }

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = 'forneca email valido';
  }

  if (props.password && props.password.length < 3) {
    errors.password = 'minimo de 3 caracteres';
  }

  if (props.password !== props.repassword) {
    errors.repassword = "senhas nao sao iguais";
  }

  return errors;
};

Signup.propTypes = propTypes;
Signup = reduxForm({ form: 'signup', validate })(Signup);

export default Signup;
