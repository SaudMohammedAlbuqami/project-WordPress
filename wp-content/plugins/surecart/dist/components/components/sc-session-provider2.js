import{proxyCustomElement,HTMLElement,createEvent,h}from"@stencil/core/internal/client";import{s as state,r as removeQueryArgs}from"./mutations2.js";import{c as clearCheckout}from"./mutations4.js";import{s as state$1}from"./watchers5.js";import"./watchers4.js";import{s as state$2}from"./getters5.js";import{u as updateFormState}from"./mutations5.js";import{p as parseFormData}from"./form-data.js";import{f as finalizeCheckout,g as fetchCheckout,h as createCheckout,d as createOrUpdateCheckout}from"./index4.js";import{r as removeNotice,c as createErrorNotice,a as createInfoNotice}from"./mutations3.js";import{d as defineCustomElement$1}from"./sc-line-items-provider2.js";import{a as addQueryArgs,g as getQueryArgs}from"./add-query-args.js";import{g as getQueryArg}from"./get-query-arg.js";const ScSessionProvider=proxyCustomElement(class extends HTMLElement{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.scUpdateOrderState=createEvent(this,"scUpdateOrderState",7),this.scUpdateDraftState=createEvent(this,"scUpdateDraftState",7),this.scPaid=createEvent(this,"scPaid",7),this.scSetState=createEvent(this,"scSetState",7),this.prices=[],this.persist=!0}handlePricesChange(){let e=this.addInitialPrices()||[];if(null==e?void 0:e.length)return this.loadUpdate({line_items:e})}async finalize(){return await this.handleFormSubmit()}async getFormData(){let e={};const t=this.el.querySelector("sc-form");if(t){const o=await t.getFormJson();e=parseFormData(o)}return e}async handleFormSubmit(){var e,t,o,i,a,r,s,n,d,c,u,l;if(removeNotice(),updateFormState("FINALIZE"),(null===(e=null==state?void 0:state.checkout)||void 0===e?void 0:e.payment_method_required)&&"stripe"===(null==state$1?void 0:state$1.id)&&state$2.config.stripe.paymentElement){if(!(null===(t=null==state$2?void 0:state$2.instances)||void 0===t?void 0:t.stripeElements))return updateFormState("REJECT"),this.handleErrorResponse({message:"Stripe Elements not found.",code:"stripe_elements_not_found"}),new Error("Stripe Elements not found.");const{error:e}=await(null===(o=null==state$2?void 0:state$2.instances)||void 0===o?void 0:o.stripeElements.submit());if(e)return console.error({error:e}),updateFormState("REJECT"),void createErrorNotice(e)}let h=await this.getFormData();if((null===(i=null===window||void 0===window?void 0:window.scData)||void 0===i?void 0:i.recaptcha_site_key)&&(null===window||void 0===window?void 0:window.grecaptcha))try{h.grecaptcha=await window.grecaptcha.execute(window.scData.recaptcha_site_key,{action:"surecart_checkout_submit"})}catch(e){return console.error(e),updateFormState("REJECT"),this.handleErrorResponse(e),new Error(null==e?void 0:e.message)}try{await this.update(h)}catch(e){console.error(e),updateFormState("REJECT"),this.handleErrorResponse(e)}try{return state.checkout=await finalizeCheckout({id:null===(a=null==state?void 0:state.checkout)||void 0===a?void 0:a.id,query:{...(null==state$1?void 0:state$1.method)?{payment_method_type:null==state$1?void 0:state$1.method}:{},return_url:addQueryArgs(window.location.href,{...(null===(r=null==state?void 0:state.checkout)||void 0===r?void 0:r.id)?{checkout_id:null===(s=null==state?void 0:state.checkout)||void 0===s?void 0:s.id}:{},is_surecart_payment_redirect:!0})},data:h,processor:{id:state$1.id,manual:state$1.manual}}),(null===(u=null===(c=null===(d=null===(n=state.checkout)||void 0===n?void 0:n.payment_intent)||void 0===d?void 0:d.processor_data)||void 0===c?void 0:c.mollie)||void 0===u?void 0:u.checkout_url)?(updateFormState("PAYING"),setTimeout((()=>{var e,t,o,i;return window.location.assign(null===(i=null===(o=null===(t=null===(e=state.checkout)||void 0===e?void 0:e.payment_intent)||void 0===t?void 0:t.processor_data)||void 0===o?void 0:o.mollie)||void 0===i?void 0:i.checkout_url)}),50)):(["paid","processing"].includes(null===(l=state.checkout)||void 0===l?void 0:l.status)&&this.scPaid.emit(),setTimeout((()=>{updateFormState("PAYING")}),50),state.checkout)}catch(e){return console.error(e),this.handleErrorResponse(e),new Error(null==e?void 0:e.message)}}async handlePaid(){updateFormState("PAID")}async handleAbandonedCartUpdate(e){const t=e.detail;this.loadUpdate({abandoned_checkout_enabled:t})}async handleCouponApply(e){const t=e.detail;removeNotice(),this.loadUpdate({discount:{...t?{promotion_code:t}:{}}})}componentDidLoad(){this.findOrCreateOrder()}async findOrCreateOrder(){var e;const{redirect_status:t,checkout_id:o,line_items:i,coupon:a,is_surecart_payment_redirect:r}=getQueryArgs(window.location.href);if(window.history.replaceState({},document.title,removeQueryArgs(window.location.href,"redirect_status","coupon","line_items","confirm_checkout_id","checkout_id","no_cart")),r&&o)return updateFormState("FINALIZE"),updateFormState("PAYING"),this.handleCheckoutIdFromUrl(o,a);if(t)return this.handleRedirectStatus(t,o);if(o)return this.handleCheckoutIdFromUrl(o,a);if(i)return this.handleInitialLineItems(i,a);const s=null===(e=null==state?void 0:state.checkout)||void 0===e?void 0:e.id;return s&&this.persist?this.handleExistingCheckout(s,a):this.handleNewCheckout(a)}async handleRedirectStatus(e,t){var o,i;if(console.info("Handling payment redirect."),"failed"!==e)if(t)try{updateFormState("FINALIZE"),state.checkout=await fetchCheckout({id:t,query:{refresh_status:!0}}),(null===(o=state.checkout)||void 0===o?void 0:o.status)&&["paid","processing"].includes(null===(i=state.checkout)||void 0===i?void 0:i.status)&&setTimeout((()=>{updateFormState("PAID"),this.scPaid.emit()}),100)}catch(e){this.handleErrorResponse(e)}else createErrorNotice(wp.i18n.__("Could not find checkout. Please contact us before attempting to purchase again.","surecart"));else createErrorNotice(wp.i18n.__("Payment unsuccessful. Please try again.","surecart"))}async handleCheckoutIdFromUrl(e,t=""){var o,i;if(console.info("Handling existing checkout from url.",t,e),t)return this.loadUpdate({id:e,discount:{promotion_code:t},refresh_line_items:!0});try{if(updateFormState("FETCH"),state.checkout=await fetchCheckout({id:e,query:{refresh_status:!0}}),state.mode!==((null===(o=state.checkout)||void 0===o?void 0:o.live_mode)?"live":"test"))return console.info("Mode mismatch, creating new checkout."),clearCheckout(),state.checkout=null,void await this.handleNewCheckout(t);updateFormState("RESOLVE")}catch(e){this.handleErrorResponse(e)}switch(null===(i=state.checkout)||void 0===i?void 0:i.status){case"paid":case"processing":return setTimeout((()=>{updateFormState("FINALIZE"),updateFormState("PAID"),this.scPaid.emit()}),100);case"payment_failed":return clearCheckout(),createErrorNotice({message:wp.i18n.__("Payment unsuccessful.","surecart")}),void updateFormState("REJECT");case"payment_intent_canceled":return void updateFormState("REJECT");case"canceled":return clearCheckout(),createErrorNotice({message:wp.i18n.__("Payment canceled. Please try again.","surecart")}),void updateFormState("REJECT");case"finalized":return createErrorNotice({message:wp.i18n.__("Payment unsuccessful. Please try again.","surecart")}),void updateFormState("REJECT")}}async handleInitialLineItems(e,t){console.info("Handling initial line items.");const o=this.el.querySelector("sc-order-shipping-address");return clearCheckout(),this.loadUpdate({line_items:e,refresh_line_items:!0,...t?{discount:{promotion_code:t}}:{},...(null==o?void 0:o.defaultCountry)?{shipping_address:{country:null==o?void 0:o.defaultCountry}}:{}})}async handleNewCheckout(e){var t,o,i;const a=this.getFormData();let r=state.initialLineItems||[];const s=this.el.querySelector("sc-order-shipping-address");try{updateFormState("FETCH"),state.checkout=await createCheckout({data:{...a,...e?{discount:{promotion_code:e}}:{},...(null==s?void 0:s.defaultCountry)?{shipping_address:{country:null==s?void 0:s.defaultCountry}}:{},line_items:r,...(null===(t=state.taxProtocol)||void 0===t?void 0:t.eu_vat_required)?{tax_identifier:{number_type:"eu_vat"}}:{}}}),updateFormState("RESOLVE")}catch(e){console.error(e),this.handleErrorResponse(e),"checkout.discount.coupon.blank"===(null===(i=null===(o=null==e?void 0:e.additional_errors)||void 0===o?void 0:o[0])||void 0===i?void 0:i.code)&&(await this.handleNewCheckout(!1),createErrorNotice(e))}}async handleExistingCheckout(e,t){var o,i,a;if(!e)return this.handleNewCheckout(t);console.info("Handling existing checkout.");try{updateFormState("FETCH"),state.checkout=await createOrUpdateCheckout({id:e,data:{...t?{discount:{promotion_code:t}}:{},...(null===(o=state.taxProtocol)||void 0===o?void 0:o.eu_vat_required)?{tax_identifier:{number_type:"eu_vat"}}:{},refresh_line_items:!0}}),updateFormState("RESOLVE")}catch(t){console.error(t),this.handleErrorResponse(t),"checkout.discount.coupon.blank"===(null===(a=null===(i=null==t?void 0:t.additional_errors)||void 0===i?void 0:i[0])||void 0===a?void 0:a.code)&&(await this.handleExistingCheckout(e,!1),createErrorNotice(t))}}async handleErrorResponse(e){var t,o,i,a,r,s;if(["checkout.not_found"].includes(null==e?void 0:e.code))return clearCheckout(),this.handleNewCheckout(!1);const n=((null==e?void 0:e.additional_errors)||[]).some((e=>{var t,o;const i=(null===(o=null===(t=null==e?void 0:e.data)||void 0===t?void 0:t.options)||void 0===o?void 0:o.purchasable_statuses)||[];return["price_old_version","variant_old_version"].some((e=>i.includes(e)))}));if(n)return await this.loadUpdate({id:null===(t=null==state?void 0:state.checkout)||void 0===t?void 0:t.id,refresh_line_items:!0,status:"draft"}),createInfoNotice((null===(i=null===(o=null==e?void 0:e.additional_errors)||void 0===o?void 0:o[0])||void 0===i?void 0:i.message)||wp.i18n.__("Some products in your order were outdated and have been updated. Please review your order summary before proceeding to payment.","surecart")),void updateFormState("REJECT");if("checkout.product.out_of_stock"===(null===(r=null===(a=null==e?void 0:e.additional_errors)||void 0===a?void 0:a[0])||void 0===r?void 0:r.code))return this.fetch(),void updateFormState("REJECT");if(["order.invalid_status_transition"].includes(null==e?void 0:e.code))return await this.loadUpdate({id:null===(s=null==state?void 0:state.checkout)||void 0===s?void 0:s.id,status:"draft"}),void this.handleFormSubmit();if("rest_cookie_invalid_nonce"!==(null==e?void 0:e.code)){if("readonly"===(null==e?void 0:e.code))return clearCheckout(),void window.location.assign(removeQueryArgs(window.location.href,"order"));createErrorNotice(e),updateFormState("REJECT")}else updateFormState("EXPIRE")}async initialize(e={}){let t=state.initialLineItems||[];return this.loadUpdate({...(null==t?void 0:t.length)?{line_items:t}:{},...e})}addInitialPrices(){var e;return(null===(e=null==this?void 0:this.prices)||void 0===e?void 0:e.length)?this.prices.some((e=>!(null==e?void 0:e.id)))?void 0:this.prices.map((e=>({price_id:e.id,quantity:e.quantity,variant:e.variant}))):[]}getSessionId(){var e,t;return getQueryArg(window.location.href,"checkout_id")||((null===(e=null==state?void 0:state.checkout)||void 0===e?void 0:e.id)?null===(t=null==state?void 0:state.checkout)||void 0===t?void 0:t.id:null)}async fetchCheckout(e,{query:t={},data:o={}}={}){try{updateFormState("FETCH");const i=await createOrUpdateCheckout({id:e,query:t,data:o});return updateFormState("RESOLVE"),i}catch(e){this.handleErrorResponse(e)}}async fetch(e={}){try{updateFormState("FETCH"),state.checkout=await fetchCheckout({id:this.getSessionId(),query:e}),updateFormState("RESOLVE")}catch(e){this.handleErrorResponse(e)}}async update(e={},t={}){try{state.checkout=await createOrUpdateCheckout({id:(null==e?void 0:e.id)?e.id:this.getSessionId(),data:e,query:t})}catch(e){if(["checkout.not_found"].includes(null==e?void 0:e.code))return clearCheckout(),this.initialize();throw console.error(e),e}}async loadUpdate(e={}){try{updateFormState("FETCH"),await this.update(e),updateFormState("RESOLVE")}catch(e){this.handleErrorResponse(e)}}render(){return h("sc-line-items-provider",{order:null==state?void 0:state.checkout,onScUpdateLineItems:e=>this.loadUpdate({line_items:e.detail})},h("slot",null))}get el(){return this}static get watchers(){return{prices:["handlePricesChange"]}}},[1,"sc-session-provider",{prices:[16],persist:[4],finalize:[64]},[[0,"scFormSubmit","handleFormSubmit"],[0,"scPaid","handlePaid"],[0,"scUpdateAbandonedCart","handleAbandonedCartUpdate"],[0,"scApplyCoupon","handleCouponApply"]]]);function defineCustomElement(){"undefined"!=typeof customElements&&["sc-session-provider","sc-line-items-provider"].forEach((e=>{switch(e){case"sc-session-provider":customElements.get(e)||customElements.define(e,ScSessionProvider);break;case"sc-line-items-provider":customElements.get(e)||defineCustomElement$1()}}))}export{ScSessionProvider as S,defineCustomElement as d};