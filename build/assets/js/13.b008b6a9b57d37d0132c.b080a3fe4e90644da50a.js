(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{622:function(e,a,t){"use strict";var n=t(92),h=t.n(n),r=t(74),d=t.n(r),l=t(0),p=t.n(l),v=t(922);a.a=function(e){var a=e.variant,t=void 0===a?"outlined":a,n=e.label,r=e.name,l=e.value,i=e.onChange,o=e.error,m=e.errorText,u=e.placeholder,c=(e.inputPropsPosition,e.helperText),s=d()(e,["variant","label","name","value","onChange","error","errorText","placeholder","inputPropsPosition","helperText"]);return p.a.createElement(v.a,h()({variant:t,label:n,name:r,value:l,fullWidth:!0,margin:"normal",placeholder:u,error:o,helperText:m||c,onChange:i},s))}},906:function(e,a,t){"use strict";t.r(a);var n=t(0),m=t.n(n),r=t(72),u=t(597),c=t(4),s=t(622),l=t(108),i=t(93),o=t(35),h=t.n(o);a.default=function(e){var a=e.onSubmit,o=e.isLoadingAuth;return m.a.createElement("div",{className:h.a.content},m.a.createElement("h2",{className:h.a.auth__title},c.a.other.recovery),m.a.createElement(l.a,{initialValues:{email:""},validationSchema:i.d,onSubmit:a},function(e){var a=e.values,t=e.errors,n=e.touched,r=e.handleChange,l=e.handleSubmit,i=e.isSubmitting;return m.a.createElement("form",{className:h.a.auth__form},m.a.createElement(s.a,{className:h.a.auth__form_input,label:"".concat(c.a.form.email," *"),type:"email",name:"email",variant:"outlined",error:t.email&&n.email,errorText:t.email&&n.email&&t.email,value:a.email,onChange:r}),m.a.createElement(u.a,{type:"submit",color:"primary",variant:"contained",className:h.a.auth__button,disabled:i||o,onClick:l},m.a.createElement("span",{className:h.a.auth__button_icon}),c.a.buttons.send))}),m.a.createElement(r.b,{to:"/login"},c.a.buttons.back_login))}}}]);