(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{719:function(e,a,t){"use strict";var r=t(117),u=t.n(r),r=t(92),c=t.n(r),r=t(0),h=t.n(r),p=t(801),d=["variant","label","name","value","onChange","error","errorText","placeholder","inputPropsPosition","helperText"];a.a=function(e){var a=e.variant,t=void 0===a?"outlined":a,r=e.label,n=e.name,o=e.value,l=e.onChange,i=e.error,s=e.errorText,m=e.placeholder,a=(e.inputPropsPosition,e.helperText),e=c()(e,d);return h.a.createElement(p.a,u()({variant:t,label:r,name:n,value:o,fullWidth:!0,margin:"normal",placeholder:m,error:i,helperText:s||a,onChange:l},e))}},795:function(e,a,t){"use strict";t.r(a);var r=t(0),i=t.n(r),n=t(83),o=t(22),s=t(379),m=t(2),u=t(719),c=t(136),h=t(118),r=t(37),p=t.n(r);a.default=Object(o.g)(function(e){var a=e.onSubmit,l=e.isLoadingAuth;return i.a.createElement("div",{className:p.a.auth__content},i.a.createElement("h2",{className:p.a.auth__title},m.a.other.login_account),i.a.createElement("h3",{className:p.a.auth__subtitle},"Welcome to Playthem service! Please login to start using our service"),i.a.createElement(c.a,{initialValues:{email:"",password:""},validationSchema:h.h,onSubmit:a},function(e){var a=e.values,t=e.errors,r=e.touched,n=e.handleChange,o=e.handleSubmit,e=e.isSubmitting;return i.a.createElement("form",{className:p.a.auth__form},i.a.createElement(u.a,{className:p.a.auth__form_input,label:m.a.form.email,type:"email",name:"email",variant:"outlined",error:t.email&&r.email,errorText:t.email&&r.email&&t.email,value:a.email,onChange:n}),i.a.createElement(u.a,{className:p.a.auth__form_input,label:m.a.form.password,type:"password",name:"password",variant:"outlined",error:t.password&&r.password,errorText:t.password&&r.password&&t.password,value:a.password,onChange:n}),i.a.createElement(s.a,{type:"submit",className:p.a.auth__button,variant:"contained",disabled:e||l,color:"primary",onClick:o},i.a.createElement("span",{className:p.a.auth__button_icon}),m.a.buttons.login))}),i.a.createElement(n.b,{to:"/register"},m.a.other.registration),i.a.createElement(n.b,{to:"/forgot"},m.a.buttons.forgot_password))})}}]);