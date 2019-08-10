import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import { Container, Item, Button, Input, Spinner, Confirm } from '../common';
import styles from './postStyle';

const propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  postError: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updatePost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

  onAccept() {
    this.props.deletePost({ uid: this.props.post.uid });
  }

  onDecline() {
    this.setState({ modal: false });
  }

  handleFormSubmit(props) {
    const { title,uid } = props;

    this.props.updatePost({ title,uid });
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
              <Button onPress={handleSubmit(this.handleFormSubmit)}>Atualizar</Button>
            </Item>}

        <Item>
          <Button
            buttonStyle={{ backgroundColor: '#e62117' }}
            onPress={() => this.setState({ modal: !this.state.modal })}
          >
            Excluir
          </Button>
        </Item>

        <Confirm
          visible={this.state.modal}
          onAccept={this.onAccept}
          onDecline={this.onDecline}
        >
          Tem certeza que quer excluir??
        </Confirm>
      </Container>
    );
  }
}

const validate = (props) => {
  const errors = {};
  const fields = ['title'];

  fields.forEach((f) => {
    if (!(f in props)) {
      errors[f] = `${f} campo obrigatorio`;
    }
  });

  if (props.title && props.title.length < 4) {
    errors.title = 'minimo 4 caracteres';
  } else if (props.title && props.title.length > 20) {
    errors.title = 'maximo 20 caracteres';
  }

  return errors;
};

PostEdit.propTypes = propTypes;
PostEdit = reduxForm({ form: 'postedit', validate })(PostEdit);

export default PostEdit;
