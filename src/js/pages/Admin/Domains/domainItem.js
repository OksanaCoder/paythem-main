import React from 'react';
import { Input } from 'components/Form';
import { Button } from '@material-ui/core';
import Formik from 'helpers/Formik';
import strings from 'translations';

class domainItem extends React.Component {
  state = {
    showForm: false,
  };

  handleEdit = () => {
    this.setState({ showForm: true });
  };

  handleSubmit = values => {
    const {
      handleEditDomain,
      item: { _id },
    } = this.props;
    console.log(values.domain);
    this.setState({ showForm: false });
    const data = {
      domain: values.domain,
    };
    handleEditDomain(_id, data);
  };

  render() {
    const { showForm } = this.state;
    const {
      item: { domain },
    } = this.props;
    return (
      <li>
        {domain}
        <Button variant="contained" color="primary" type="submit" onClick={this.handleEdit}>
          Edit
        </Button>
        {showForm && (
          <React.Fragment>
            <Formik initialValues={{ domain }} onSubmit={this.handleSubmit}>
              {({ values, handleChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <Input
                    label={`${strings.form.domain} *`}
                    variant="outlined"
                    type="text"
                    name="domain"
                    onChange={handleChange}
                    value={values.domain}
                  />
                </form>
              )}
            </Formik>
          </React.Fragment>
        )}
      </li>
    );
  }
}

export default domainItem;
