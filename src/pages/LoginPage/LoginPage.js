import { Helmet } from 'react-helmet';
import { LoginForm } from 'components/LoginForm/LoginForm';
import { Fragment } from 'react';

export default function Login() {
  return (
    <Fragment>
      <Helmet>
        <title>Login Page</title>
      </Helmet>
      <LoginForm />
    </Fragment>
  );
}
