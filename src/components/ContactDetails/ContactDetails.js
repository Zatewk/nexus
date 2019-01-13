import React, { Component } from 'react';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from '../Icon';
import Link from '../Link';

import Contacts from '../../services/contacts';

const Container = styled('section')``;
const Header = styled('header')``;

class ContactDetails extends Component {
  static defaultProps = {
    className: '',
    match: {
      params: {
        id: '',
      },
    },
  };

  static propTypes = {
    className: PropTypes.string,
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string,
      }),
    }),
  };

  constructor(props) {
    super(props);

    this.state = {
      data: { name: '[User]' },
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const contacts = await Contacts.read(match.params.id);

    this.setState({
      data: {
        name:
          contacts.name.first.charAt(0).toUpperCase() +
          contacts.name.first.slice(1),
        last:
          contacts.name.last.charAt(0).toUpperCase() +
          contacts.name.last.slice(1),
        user: contacts.login.username,
        email: contacts.email,
        phone: contacts.phone,
        mobile: contacts.cell,
      },
    });
  }

  /* This one should not be necessary, but componentDidMount is not 
  the solution since the component mounts just once. It is necessary 
  to repeat the process with every update.
  */
  async componentDidUpdate(prevProps) {
    const { match } = this.props;

    if (match.params.id !== prevProps.match.params.id) {
      const contacts = await Contacts.read(match.params.id);
      this.setState({
        data: {
          name:
            contacts.name.first.charAt(0).toUpperCase() +
            contacts.name.first.slice(1),
          last:
            contacts.name.last.charAt(0).toUpperCase() +
            contacts.name.last.slice(1),
          user: contacts.login.username,
          email: contacts.email,
          phone: contacts.phone,
          mobile: contacts.cell,
        },
      });
    }
  }

  render() {
    const { className } = this.props;
    const { data } = this.state;

    return (
      <article className={className}>
        <Header>
          <Link to="/">
            <Icon>arrow_back_ios</Icon>
          </Link>
          {data.name} 
          {' '}
          {data.last}
        </Header>
        <Container>
          <ul>
            <li>
              <strong>User</strong>
:
              {data.user}
            </li>
            <li>
              <strong>E-mail</strong>
:
              {data.email}
            </li>
            <li>
              <strong>Home Phone</strong>
:
              {data.phone}
            </li>
            <li>
              <strong>Mobile Phone</strong>
:
              {data.mobile}
            </li>
          </ul>
        </Container>
      </article>
    );
  }
}

export default styled(ContactDetails)`
  background: ${props => props.theme['--color-light']};
  height: calc(100% - 2.5rem);
  position: fixed;
  top: 2.5rem;
  width: 100%;
  //
  ${Header} {
    ${props => props.theme['--font-extra-large']};
    align-items: center;
    display: flex;
    height: 5rem;
    justify-content: center;
    text-align: center;

    ${Icon} {
      height: 5rem;
      left: 0;
      line-height: 5rem;
      position: absolute;
      top: 0;
      width: 5rem;
    }
  }

  ${Container} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (${props => props.theme['--screen-medium']}) {
    border-left: 1px solid ${props => rgba(props.theme['--color-dark'], 0.1)};
    left: 32rem;
    width: calc(100% - 32rem);
  }
`;
