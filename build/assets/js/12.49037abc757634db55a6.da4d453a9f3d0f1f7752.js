(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{624:function(e,a,t){"use strict";var r=t(92),h=t.n(r),n=t(74),p=t.n(n),o=t(0),d=t.n(o),v=t(925);a.a=function(e){var a=e.variant,t=void 0===a?"outlined":a,r=e.label,n=e.name,o=e.value,l=e.onChange,i=e.error,s=e.errorText,m=e.placeholder,u=(e.inputPropsPosition,e.helperText),c=p()(e,["variant","label","name","value","onChange","error","errorText","placeholder","inputPropsPosition","helperText"]);return d.a.createElement(v.a,h()({variant:t,label:r,name:n,value:o,fullWidth:!0,margin:"normal",placeholder:m,error:i,helperText:s||u,onChange:l},c))}},908:function(e,a,t){"use strict";t.r(a);var r=t(0),s=t.n(r),n=t(72),o=t(62),m=t(300),u=t(2),c=t(624),l=t(109),h=t(93),i=t(35),p=t.n(i);a.default=Object(o.g)(function(e){var a=e.onSubmit,i=e.isLoadingAuth;return s.a.createElement("div",{className:p.a.auth__content},s.a.createElement("h2",{className:p.a.auth__title},u.a.other.login_account),s.a.createElement("h3",{className:p.a.auth__subtitle},"Welcome to Playthem service! Please login to start using our service"),s.a.createElement(l.a,{initialValues:{email:"",password:""},validationSchema:h.h,onSubmit:a},function(e){var a=e.values,t=e.errors,r=e.touched,n=e.handleChange,o=e.handleSubmit,l=e.isSubmitting;return s.a.createElement("form",{className:p.a.auth__form},s.a.createElement(c.a,{className:p.a.auth__form_input,label:u.a.form.email,type:"email",name:"email",variant:"outlined",error:t.email&&r.email,errorText:t.email&&r.email&&t.email,value:a.email,onChange:n}),s.a.createElement(c.a,{className:p.a.auth__form_input,label:u.a.form.password,type:"password",name:"password",variant:"outlined",error:t.password&&r.password,errorText:t.password&&r.password&&t.password,value:a.password,onChange:n}),s.a.createElement(m.a,{type:"submit",className:p.a.auth__button,variant:"contained",disabled:l||i,color:"primary",onClick:o},s.a.createElement("span",{className:p.a.auth__button_icon}),u.a.buttons.login))}),s.a.createElement(n.b,{to:"/register"},u.a.other.registration),s.a.createElement(n.b,{to:"/forgot"},u.a.buttons.forgot_password))})}}]);