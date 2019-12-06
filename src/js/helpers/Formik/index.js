import React from 'react';
import { Formik as Form } from 'formik';

const Formik = ({ initialValues, validationSchema, validate, onSubmit, children }) => (
  <Form
    initialValues={initialValues}
    validationSchema={validationSchema}
    validate={validate}
    onSubmit={(values, actions) => {
      onSubmit(values);
      setTimeout(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      }, 400);
    }}
  >
    {children}
  </Form>
);

export default Formik;
