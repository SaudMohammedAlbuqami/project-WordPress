import{proxyCustomElement,HTMLElement,h,Fragment,Host}from"@stencil/core/internal/client";import{s as state$1}from"./mutations2.js";import"./watchers4.js";import{s as state,e as hasOtherAvailableCreditCardProcessor,f as hasMultipleProcessorChoices,g as getAvailableProcessor,a as availableProcessors,b as availableManualPaymentMethods}from"./getters5.js";import{s as state$2}from"./watchers5.js";import{M as MockProcessor,a as ManualPaymentMethods,d as defineCustomElement$c}from"./sc-checkout-mollie-payment2.js";import{d as defineCustomElement$f}from"./sc-alert2.js";import{d as defineCustomElement$e}from"./sc-block-ui2.js";import{d as defineCustomElement$d}from"./sc-card2.js";import{d as defineCustomElement$b}from"./sc-checkout-paystack-payment-provider2.js";import{d as defineCustomElement$a}from"./sc-divider2.js";import{d as defineCustomElement$9}from"./sc-form-control2.js";import{d as defineCustomElement$8}from"./sc-icon2.js";import{d as defineCustomElement$7}from"./sc-payment-method-choice2.js";import{d as defineCustomElement$6}from"./sc-payment-selected2.js";import{d as defineCustomElement$5}from"./sc-skeleton2.js";import{d as defineCustomElement$4}from"./sc-spinner2.js";import{d as defineCustomElement$3}from"./sc-tag2.js";import{d as defineCustomElement$2}from"./sc-visually-hidden2.js";import{a as addQueryArgs}from"./add-query-args.js";const scPaymentCss=":host{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative;font-family:var(--sc-font-sans)}.sc-payment-toggle-summary{line-height:1;display:flex;align-items:center;gap:0.5em;font-weight:var(--sc-font-weight-semibold)}.sc-payment-label{display:flex;justify-content:space-between}.sc-payment-instructions{color:var(--sc-color-gray-600);font-size:var(--sc-font-size-small);line-height:var(--sc-line-height-dense)}.sc-payment__stripe-card-element{display:flex !important;flex-direction:column;gap:var(--sc-input-label-margin);position:relative}",ScPayment$1=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.stripePaymentElement=void 0,this.disabledProcessorTypes=void 0,this.secureNotice=void 0,this.label=void 0,this.hideTestModeBadge=void 0}componentWillLoad(){state.disabled.processors=this.disabledProcessorTypes}renderStripe(e){const t=hasOtherAvailableCreditCardProcessor("stripe")?wp.i18n.__("Credit Card (Stripe)","surecart"):wp.i18n.__("Credit Card","surecart");return h("sc-payment-method-choice",{key:null==e?void 0:e.id,"processor-id":"stripe",card:this.stripePaymentElement},h("span",{slot:"summary",class:"sc-payment-toggle-summary"},h("sc-icon",{name:"credit-card",style:{fontSize:"24px"},"aria-hidden":"true"}),h("span",null,t)),h("div",{class:"sc-payment__stripe-card-element"},h("slot",{name:"stripe"})))}renderPayPal(e){return h(Fragment,null,h("sc-payment-method-choice",{key:null==e?void 0:e.id,"processor-id":"paypal"},h("span",{slot:"summary",class:"sc-payment-toggle-summary"},h("sc-icon",{name:"paypal",style:{width:"80px",fontSize:"24px"},"aria-hidden":"true"}),h("sc-visually-hidden",null,wp.i18n.__("PayPal","surecart"))),h("sc-card",null,h("sc-payment-selected",{label:wp.i18n.__("PayPal selected for check out.","surecart")},h("sc-icon",{slot:"icon",name:"paypal",style:{width:"80px"},"aria-hidden":"true"}),wp.i18n.__("Another step will appear after submitting your order to complete your purchase details.","surecart")))),!hasOtherAvailableCreditCardProcessor("paypal")&&h("sc-payment-method-choice",{key:null==e?void 0:e.id,"processor-id":"paypal","method-id":"card"},h("span",{slot:"summary",class:"sc-payment-toggle-summary"},h("sc-icon",{name:"credit-card",style:{fontSize:"24px"},"aria-hidden":"true"}),h("span",null,wp.i18n.__("Credit Card","surecart"))),h("sc-card",null,h("sc-payment-selected",{label:wp.i18n.__("Credit Card selected for check out.","surecart")},h("sc-icon",{name:"credit-card",slot:"icon",style:{fontSize:"24px"},"aria-hidden":"true"}),wp.i18n.__("Another step will appear after submitting your order to complete your purchase details.","surecart")))))}renderMock(e){return h(MockProcessor,{processor:e})}renderPaystack(e){var t,s;const a=hasOtherAvailableCreditCardProcessor("paystack")?wp.i18n.__("Credit Card (Paystack)","surecart"):wp.i18n.__("Credit Card","surecart");if((null!==(t=null==e?void 0:e.supported_currencies)&&void 0!==t?t:[]).includes(null===(s=null===window||void 0===window?void 0:window.scData)||void 0===s?void 0:s.currency))return h("sc-payment-method-choice",{key:null==e?void 0:e.id,"processor-id":"paystack"},h("span",{slot:"summary",class:"sc-payment-toggle-summary"},h("sc-icon",{name:"credit-card",style:{fontSize:"24px"},"aria-hidden":"true"}),h("span",null,a)),h("sc-card",null,h("sc-payment-selected",{label:wp.i18n.__("Credit Card selected for check out.","surecart")},h("sc-icon",{slot:"icon",name:"credit-card","aria-hidden":"true"}),wp.i18n.__("Another step will appear after submitting your order to complete your purchase details.","surecart"))),h("sc-checkout-paystack-payment-provider",null))}render(){var e,t,s,a,o,r;if(!1===(null===(e=state$1.checkout)||void 0===e?void 0:e.payment_method_required))return null;const n=hasMultipleProcessorChoices()||"paypal"===(null==state$2?void 0:state$2.id)?"sc-toggles":"div",i=getAvailableProcessor("mollie");return h(Host,null,h("sc-form-control",{label:this.label,exportparts:"label, help-text, form-control"},h("div",{class:"sc-payment-label",slot:"label"},h("div",null,this.label),"test"===state$1.mode&&!this.hideTestModeBadge&&h("sc-tag",{type:"warning",size:"small",exportparts:"base:test-badge__base, content:test-badge__content"},wp.i18n.__("Test Mode","surecart"))),(null==i?void 0:i.id)?h("sc-checkout-mollie-payment",{"processor-id":null==i?void 0:i.id}):h(n,{collapsible:!1,theme:"container"},!(null===(t=availableProcessors())||void 0===t?void 0:t.length)&&!(null===(s=availableManualPaymentMethods())||void 0===s?void 0:s.length)&&h("sc-alert",{type:"info",open:!0},(null===(o=null===(a=null===window||void 0===window?void 0:window.scData)||void 0===a?void 0:a.user_permissions)||void 0===o?void 0:o.manage_sc_shop_settings)?h(Fragment,null,wp.i18n.__("You do not have any processors enabled for this mode and cart. ","surecart"),h("a",{href:addQueryArgs(`${null===(r=null===window||void 0===window?void 0:window.scData)||void 0===r?void 0:r.admin_url}admin.php`,{page:"sc-settings",tab:"processors"}),style:{color:"var(--sc-color-gray-700)"}},wp.i18n.__("Please configure your processors","surecart")),"."):wp.i18n.__("Please contact us for payment.","surecart")),(availableProcessors()||[]).map((e=>{switch(null==e?void 0:e.processor_type){case"stripe":return this.renderStripe(e);case"paypal":return this.renderPayPal(e);case"paystack":return this.renderPaystack(e);case"mock":return this.renderMock(e)}})),h(ManualPaymentMethods,{methods:availableManualPaymentMethods()}))))}get el(){return this}static get style(){return scPaymentCss}},[1,"sc-payment",{stripePaymentElement:[4,"stripe-payment-element"],disabledProcessorTypes:[16],secureNotice:[1,"secure-notice"],label:[1],hideTestModeBadge:[4,"hide-test-mode-badge"]}]);function defineCustomElement$1(){"undefined"!=typeof customElements&&["sc-payment","sc-alert","sc-block-ui","sc-card","sc-checkout-mollie-payment","sc-checkout-paystack-payment-provider","sc-divider","sc-form-control","sc-icon","sc-payment-method-choice","sc-payment-selected","sc-skeleton","sc-spinner","sc-tag","sc-visually-hidden"].forEach((e=>{switch(e){case"sc-payment":customElements.get(e)||customElements.define(e,ScPayment$1);break;case"sc-alert":customElements.get(e)||defineCustomElement$f();break;case"sc-block-ui":customElements.get(e)||defineCustomElement$e();break;case"sc-card":customElements.get(e)||defineCustomElement$d();break;case"sc-checkout-mollie-payment":customElements.get(e)||defineCustomElement$c();break;case"sc-checkout-paystack-payment-provider":customElements.get(e)||defineCustomElement$b();break;case"sc-divider":customElements.get(e)||defineCustomElement$a();break;case"sc-form-control":customElements.get(e)||defineCustomElement$9();break;case"sc-icon":customElements.get(e)||defineCustomElement$8();break;case"sc-payment-method-choice":customElements.get(e)||defineCustomElement$7();break;case"sc-payment-selected":customElements.get(e)||defineCustomElement$6();break;case"sc-skeleton":customElements.get(e)||defineCustomElement$5();break;case"sc-spinner":customElements.get(e)||defineCustomElement$4();break;case"sc-tag":customElements.get(e)||defineCustomElement$3();break;case"sc-visually-hidden":customElements.get(e)||defineCustomElement$2()}}))}const ScPayment=ScPayment$1,defineCustomElement=defineCustomElement$1;export{ScPayment,defineCustomElement};