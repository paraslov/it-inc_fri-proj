(this["webpackJsonpit-inc_fri-proj"]=this["webpackJsonpit-inc_fri-proj"]||[]).push([[0],{12:function(e,t,n){e.exports={superInput:"SuperInputText_superInput__2sfUC",errorInput:"SuperInputText_errorInput__l4FEI",error:"SuperInputText_error__1KF4g"}},13:function(e,t,n){e.exports={default:"SuperButton_default__21DAH",red:"SuperButton_red__1XkeE",disabled:"SuperButton_disabled__UOTTs"}},16:function(e,t,n){e.exports={checkbox:"SuperCheckbox_checkbox__3EdMs",spanClassName:"SuperCheckbox_spanClassName__20bG7"}},23:function(e,t,n){e.exports={navbarContainer:"NavBar_navbarContainer__2FqhM"}},28:function(e,t,n){},29:function(e,t,n){},36:function(e,t,n){"use strict";n.r(t);var r=n(1),c=n.n(r),s=n(21),a=n.n(s),o=(n(28),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,37)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),s(e),a(e)}))}),j=(n(29),n(2)),i=n(0),b=function(){return Object(i.jsx)("div",{children:"Login page."})},u=function(){return Object(i.jsx)("div",{children:"Registration page."})},d=function(){return Object(i.jsx)("div",{children:"Profile page."})},l=function(){return Object(i.jsx)("div",{children:"Restore password page."})},p=function(){return Object(i.jsx)("div",{children:"Enter new password page."})},x=n(19),h=n(9),O=n(10),f=n(12),g=n.n(f),C=function(e){e.type;var t=e.onChange,n=e.onChangeText,r=e.onKeyPress,c=e.onEnter,s=e.error,a=e.className,o=e.spanClassName,j=Object(O.a)(e,["type","onChange","onChangeText","onKeyPress","onEnter","error","className","spanClassName"]),b="".concat(s?g.a.error:""," ").concat(o||""),u="".concat(g.a.superInput," ").concat(s?g.a.errorInput:""," ").concat(a);return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("input",Object(h.a)({type:"text",onChange:function(e){t&&t(e),n&&n(e.currentTarget.value)},onKeyPress:function(e){r&&r(e),c&&"Enter"===e.key&&c()},className:u},j)),s&&Object(i.jsx)("span",{className:b,children:s})]})},_=n(13),m=n.n(_),N=function(e){var t=e.red,n=e.className,r=e.disabled,c=Object(O.a)(e,["red","className","disabled"]),s=r?"".concat(m.a.disabled):"".concat(m.a.default," ").concat(t?m.a.red:""," ").concat(n);return Object(i.jsx)("button",Object(h.a)({disabled:r,className:s},c))},v=n(16),k=n.n(v),y=function(e){e.type;var t=e.onChange,n=e.onChangeChecked,r=e.className,c=(e.spanClassName,e.children),s=Object(O.a)(e,["type","onChange","onChangeChecked","className","spanClassName","children"]),a="".concat(k.a.checkbox," ").concat(r||"");return Object(i.jsxs)("label",{children:[Object(i.jsx)("input",Object(h.a)({type:"checkbox",onChange:function(e){t&&t(e),n&&n(e.currentTarget.checked)},className:a},s)),c&&Object(i.jsx)("span",{className:k.a.spanClassName,children:c})]})},T=function(){var e=Object(r.useState)(""),t=Object(x.a)(e,2),n=t[0],c=t[1],s=Object(r.useState)(!1),a=Object(x.a)(s,2),o=a[0],j=a[1],b={margin:"10px"};return Object(i.jsxs)("div",{style:b,children:[Object(i.jsx)(C,{value:n,onChangeText:c,style:b})," ",Object(i.jsx)("br",{}),Object(i.jsx)(y,{checked:o,onChangeChecked:j,style:b,children:"disable"}),Object(i.jsx)("br",{}),Object(i.jsx)(N,{onClick:function(){return alert("You've printed: ".concat(n))},disabled:o,style:b,children:"Send"})]})},S="/login",I="/registration",w="/profile",F="/restore",E="/enter_new_password",P="/tests",B="/404",K=function(){return Object(i.jsx)("div",{children:Object(i.jsxs)(j.d,{children:[Object(i.jsx)(j.b,{exact:!0,path:"/",render:function(){return Object(i.jsx)(j.a,{to:w})}}),Object(i.jsx)(j.b,{path:S,render:function(){return Object(i.jsx)(b,{})}}),Object(i.jsx)(j.b,{path:I,render:function(){return Object(i.jsx)(u,{})}}),Object(i.jsx)(j.b,{path:w,render:function(){return Object(i.jsx)(d,{})}}),Object(i.jsx)(j.b,{path:F,render:function(){return Object(i.jsx)(l,{})}}),Object(i.jsx)(j.b,{path:E,render:function(){return Object(i.jsx)(p,{})}}),Object(i.jsx)(j.b,{path:P,render:function(){return Object(i.jsx)(T,{})}}),Object(i.jsx)(j.b,{path:B,render:function(){return Object(i.jsx)("h1",{children:"PAGE NOT FOUND"})}}),Object(i.jsx)(j.b,{path:"/*",render:function(){return Object(i.jsx)(j.a,{to:B})}})]})})},L=n(7),R=n(23),A=n.n(R),D=function(){return Object(i.jsxs)("div",{className:A.a.navbarContainer,children:[Object(i.jsx)(L.b,{to:w,children:"Profile"}),Object(i.jsx)(L.b,{to:S,children:"Login"}),Object(i.jsx)(L.b,{to:I,children:"Registration"}),Object(i.jsx)(L.b,{to:F,children:"Restore password"}),Object(i.jsx)(L.b,{to:E,children:"New password"}),Object(i.jsx)(L.b,{to:P,children:"Tests"})]})},M=function(){return Object(i.jsx)(L.a,{children:Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)("h6",{children:"FP.v.1.04"}),Object(i.jsx)(D,{}),Object(i.jsx)(K,{})]})})};a.a.render(Object(i.jsx)(c.a.StrictMode,{children:Object(i.jsx)(M,{})}),document.getElementById("root")),o()}},[[36,1,2]]]);
//# sourceMappingURL=main.a3de5faa.chunk.js.map