import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner } from '../common';
import styles from './postStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  createPost: PropTypes.func.isRequired,
};

class PostCreate extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(props) {
    const { title} = props;

    this.props.createPost({ title });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <Container>
        <Item>
          <Field
            name="title"
            placeholder="Nome da linguagem de programacao"
            component={Input}
          />
        </Item>

        {this.props.postError
          ?
            <Text style={styles.error}>
              {this.props.postError}
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
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Cadastrar</Button>
            </Item>}
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['title'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} obrigatorio`;
    }
  });

  if (props.title && props.title.length < 4) {
    errors.title = 'Minimo 4 caracteres';
  } else if (props.title && props.title.length > 20) {
    errors.title = 'maximo 20';
  }
  return errors;
};

PostCreate.propTypes = propTypes;
PostCreate = reduxForm({ form: 'postcreate', validate })(PostCreate);

export default PostCreate;
