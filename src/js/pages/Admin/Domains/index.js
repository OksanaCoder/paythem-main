import React from 'react';
import { connect } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { createDomain, getDomains, updateDomain } from 'actions';
import { Input } from 'components/Form';
import Fetching from 'components/Fetching';
import Formik from 'helpers/Formik';
import { CreateDomainSchema } from 'helpers/Formik/validation';
import strings from 'translations';
import DomainItem from './domainItem';

// import css from 'styles/pages/Domains.scss';
class Domains extends React.Component {
  componentDidMount() {
    this.getDomainsData();
  }

  getDomainsData = () => {
    const { getDomainsAction } = this.props;
    getDomainsAction();
  };

  getDomains = () => {
    const {
      domains: { data, loaded, loading },
    } = this.props;
    const domains = loaded && data.data.data;
    return { domains, loaded, loading };
  };

  handleSubmit = values => {
    console.log(values.domain);
    const { createDomainAction } = this.props;
    const data = {
      domain: values.domain,
    };
    createDomainAction(data).then(res => !res.error && this.getDomainsData());
  };

  handleEditDomain = (domainId, data) => {
    console.log('data', data);
    const { updateDomainAction } = this.props;
    updateDomainAction(domainId, data).then(res => !res.error && this.getDomainsData());
  };

  render() {
    const { domains, loaded, loading } = this.getDomains();

    return (
      <section>
        <h3>Domains</h3>
        <React.Fragment>
          <Formik
            initialValues={{ domain: '' }}
            validate={values => CreateDomainSchema(values)}
            onSubmit={this.handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <Input
                  label={`${strings.form.domain} *`}
                  variant="outlined"
                  type="url"
                  name="domain"
                  placeholder="f.e: domain.com"
                  error={errors.domain && touched.domain}
                  errorText={errors.domain && touched.domain && errors.domain}
                  value={values.domain}
                  onChange={handleChange}
                />

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {strings.buttons.save}
                </Button>
              </form>
            )}
          </Formik>
        </React.Fragment>
        <Container fixed>
          <ul className="test">
            <Fetching isFetching={loading}>
              {loaded &&
                domains.map(item => {
                  return (
                    <DomainItem
                      key={item._id}
                      item={item}
                      handleEditDomain={this.handleEditDomain}
                    />
                  );
                })}
            </Fetching>
          </ul>
        </Container>
      </section>
    );
  }
}

export default connect(
  state => ({
    domains: state.get.domains,
  }),
  dispatch => ({
    createDomainAction: data => dispatch(createDomain(data)),
    getDomainsAction: () => dispatch(getDomains()),
    updateDomainAction: (domainId, data) => dispatch(updateDomain(domainId, data)),
  }),
)(Domains);
