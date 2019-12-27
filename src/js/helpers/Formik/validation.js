import * as Yup from 'yup';

import strings from 'translations';

const SignupSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(strings.validation.invalid_email)
      .required(strings.validation.required),
    password: Yup.string()
      .min(8, strings.formatString(strings.validation.min, { num: 8 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .required(strings.validation.required),
    confirmPassword: Yup.string()
      .min(8, strings.formatString(strings.validation.min, { num: 8 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .oneOf([Yup.ref('password'), null], strings.validation.password_not_match)
      .required(strings.validation.required),
    name: Yup.string().max(100, strings.formatString(strings.validation.max, { num: 100 })),
    // .required(strings.validation.required),
  });

export const LoginSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(strings.validation.invalid_email)
      .required(strings.validation.required),
    password: Yup.string().required(strings.validation.required),
  });

export const ForgotPasswordSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(strings.validation.invalid_email)
      .required(strings.validation.required),
  });

export const ResetPasswordSchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .min(5, strings.formatString(strings.validation.min, { num: 5 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .required(strings.validation.required),
    confirmPassword: Yup.string()
      .min(5, strings.formatString(strings.validation.min, { num: 5 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .oneOf([Yup.ref('password'), null], strings.validation.password_not_match)
      .required(strings.validation.required),
  });

export const CurrentUserProfileSchema = () =>
  Yup.object().shape({
    email: Yup.string()
      .email(strings.validation.invalid_email)
      .required(strings.validation.required),
  });

export const CurrentUserPassRecoverySchema = () =>
  Yup.object().shape({
    password: Yup.string()
      .min(5, strings.formatString(strings.validation.min, { num: 5 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .required(strings.validation.required),
    confirmPassword: Yup.string()
      .min(5, strings.formatString(strings.validation.min, { num: 5 }))
      .oneOf([Yup.ref('password'), null], strings.validation.password_not_match)
      .required(strings.validation.required),
  });

export const CreateDomainSchema = (values, domains) => {
  const errors = {};
  const isUniqueDomain = domains && domains.some(item => values.domain.includes(item.domain));
  if (!values.domain) {
    errors.domain = 'Required';
  } else if (!/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(values.domain)) {
    errors.domain = 'Invalid domain address';
  } else if (isUniqueDomain) {
    errors.domain = 'Not unique domain address';
  }
  return errors;
};

export const TriggerButtonTextSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .min(5, strings.formatString(strings.validation.min, { num: 5 }))
      .max(20, strings.formatString(strings.validation.max, { num: 20 }))
      .required(strings.validation.required),
  });

export const CouponsSchema = () =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(20, strings.formatString(strings.validation.max, { num: 20 }))
      .required(strings.validation.required),
    code: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(20, strings.formatString(strings.validation.max, { num: 20 }))
      .required(strings.validation.required),
  });

export const StartScreenSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(30, strings.formatString(strings.validation.max, { num: 30 }))
      .required(strings.validation.required),
    subtitle: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(70, strings.formatString(strings.validation.max, { num: 70 }))
      .required(strings.validation.required),
    button: Yup.string()
      .min(2, strings.formatString(strings.validation.min, { num: 2 }))
      .max(10, strings.formatString(strings.validation.max, { num: 10 }))
      .required(strings.validation.required),
  });

export const ProgressScreenSchema = () =>
  Yup.object().shape({
    title: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(50, strings.formatString(strings.validation.max, { num: 50 }))
      .required(strings.validation.required),
    subtitle: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .max(50, strings.formatString(strings.validation.max, { num: 50 }))
      .required(strings.validation.required),
  });

export const GeneralSettingsSchema = () =>
  Yup.object().shape({
    show_count: Yup.number()
      .min(1, strings.formatString(strings.validation.min, { num: 1 }))
      .max(100, strings.formatString(strings.validation.max, { num: 100 }))
      .positive("Number can't be negative")
      .required(strings.validation.required),
    exp_copied: Yup.number()
      .min(1, strings.formatString(strings.validation.min, { num: 1 }))
      .max(999, strings.formatString(strings.validation.max, { num: 999 }))
      .positive("Number can't be negative")
      .required(strings.validation.required),
  });

export const AddSiteUrlSchema = () =>
  Yup.object().shape({
    siteUrl: Yup.string()
      .min(3, strings.formatString(strings.validation.min, { num: 3 }))
      .required(strings.validation.required),
  });

export default SignupSchema;
