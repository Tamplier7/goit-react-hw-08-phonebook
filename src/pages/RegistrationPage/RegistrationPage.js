import { Helmet } from 'react-helmet';
import { RegisterForm } from 'components/RegisterForm/RegisterForm';
import { Fragment } from 'react';

export default function Register() {
  return (
    <Fragment>
      <Helmet>
        <title>Registration Page</title>
      </Helmet>
      <RegisterForm />
    </Fragment>
  );
}
