(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"3Pt+":function(t,e,n){"use strict";n.d(e,"a",function(){return g}),n.d(e,"b",function(){return f}),n.d(e,"c",function(){return St}),n.d(e,"d",function(){return c}),n.d(e,"e",function(){return F}),n.d(e,"f",function(){return R}),n.d(e,"g",function(){return Ct}),n.d(e,"h",function(){return Ot}),n.d(e,"i",function(){return H}),n.d(e,"j",function(){return Dt}),n.d(e,"k",function(){return Z}),n.d(e,"l",function(){return Q});var s=n("fXoL"),i=n("ofXK"),r=n("HDdC"),o=n("DH7j"),l=n("lJxs"),a=n("XoHu"),u=n("Cfvw");function h(t,e){return new r.a(n=>{const s=t.length;if(0===s)return void n.complete();const i=new Array(s);let r=0,o=0;for(let l=0;l<s;l++){const a=Object(u.a)(t[l]);let h=!1;n.add(a.subscribe({next:t=>{h||(h=!0,o++),i[l]=t},error:t=>n.error(t),complete:()=>{r++,r!==s&&h||(o===s&&n.next(e?e.reduce((t,e,n)=>(t[e]=i[n],t),{}):i),n.complete())}}))}})}const c=new s.q("NgValueAccessor"),d={provide:c,useExisting:Object(s.S)(()=>p),multi:!0};let p=(()=>{class t{constructor(t,e){this._renderer=t,this._elementRef=e,this.onChange=t=>{},this.onTouched=()=>{}}writeValue(t){this._renderer.setProperty(this._elementRef.nativeElement,"checked",t)}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l))},t.\u0275dir=s.Bb({type:t,selectors:[["input","type","checkbox","formControlName",""],["input","type","checkbox","formControl",""],["input","type","checkbox","ngModel",""]],hostBindings:function(t,e){1&t&&s.Rb("change",function(t){return e.onChange(t.target.checked)})("blur",function(){return e.onTouched()})},features:[s.vb([d])]}),t})();const _={provide:c,useExisting:Object(s.S)(()=>f),multi:!0},g=new s.q("CompositionEventMode");let f=(()=>{class t{constructor(t,e,n){this._renderer=t,this._elementRef=e,this._compositionMode=n,this.onChange=t=>{},this.onTouched=()=>{},this._composing=!1,null==this._compositionMode&&(this._compositionMode=!function(){const t=Object(i.t)()?Object(i.t)().getUserAgent():"";return/android (\d+)/.test(t.toLowerCase())}())}writeValue(t){this._renderer.setProperty(this._elementRef.nativeElement,"value",null==t?"":t)}registerOnChange(t){this.onChange=t}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_handleInput(t){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(t)}_compositionStart(){this._composing=!0}_compositionEnd(t){this._composing=!1,this._compositionMode&&this.onChange(t)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l),s.Gb(g,8))},t.\u0275dir=s.Bb({type:t,selectors:[["input","formControlName","",3,"type","checkbox"],["textarea","formControlName",""],["input","formControl","",3,"type","checkbox"],["textarea","formControl",""],["input","ngModel","",3,"type","checkbox"],["textarea","ngModel",""],["","ngDefaultControl",""]],hostBindings:function(t,e){1&t&&s.Rb("input",function(t){return e._handleInput(t.target.value)})("blur",function(){return e.onTouched()})("compositionstart",function(){return e._compositionStart()})("compositionend",function(t){return e._compositionEnd(t.target.value)})},features:[s.vb([_])]}),t})();function m(t){return null==t||0===t.length}function y(t){return null!=t&&"number"==typeof t.length}const v=new s.q("NgValidators"),C=new s.q("NgAsyncValidators"),b=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;class V{static min(t){return e=>{if(m(e.value)||m(t))return null;const n=parseFloat(e.value);return!isNaN(n)&&n<t?{min:{min:t,actual:e.value}}:null}}static max(t){return e=>{if(m(e.value)||m(t))return null;const n=parseFloat(e.value);return!isNaN(n)&&n>t?{max:{max:t,actual:e.value}}:null}}static required(t){return m(t.value)?{required:!0}:null}static requiredTrue(t){return!0===t.value?null:{required:!0}}static email(t){return m(t.value)||b.test(t.value)?null:{email:!0}}static minLength(t){return e=>m(e.value)||!y(e.value)?null:e.value.length<t?{minlength:{requiredLength:t,actualLength:e.value.length}}:null}static maxLength(t){return e=>y(e.value)&&e.value.length>t?{maxlength:{requiredLength:t,actualLength:e.value.length}}:null}static pattern(t){if(!t)return V.nullValidator;let e,n;return"string"==typeof t?(n="","^"!==t.charAt(0)&&(n+="^"),n+=t,"$"!==t.charAt(t.length-1)&&(n+="$"),e=new RegExp(n)):(n=t.toString(),e=t),t=>{if(m(t.value))return null;const s=t.value;return e.test(s)?null:{pattern:{requiredPattern:n,actualValue:s}}}}static nullValidator(t){return null}static compose(t){if(!t)return null;const e=t.filter(O);return 0==e.length?null:function(t){return w(E(t,e))}}static composeAsync(t){if(!t)return null;const e=t.filter(O);return 0==e.length?null:function(t){return function(...t){if(1===t.length){const e=t[0];if(Object(o.a)(e))return h(e,null);if(Object(a.a)(e)&&Object.getPrototypeOf(e)===Object.prototype){const t=Object.keys(e);return h(t.map(t=>e[t]),t)}}if("function"==typeof t[t.length-1]){const e=t.pop();return h(t=1===t.length&&Object(o.a)(t[0])?t[0]:t,null).pipe(Object(l.a)(t=>e(...t)))}return h(t,null)}(E(t,e).map(A)).pipe(Object(l.a)(w))}}}function O(t){return null!=t}function A(t){const e=Object(s.ob)(t)?Object(u.a)(t):t;return Object(s.nb)(e),e}function w(t){let e={};return t.forEach(t=>{e=null!=t?Object.assign(Object.assign({},e),t):e}),0===Object.keys(e).length?null:e}function E(t,e){return e.map(e=>e(t))}function S(t){return t.map(t=>function(t){return!t.validate}(t)?t:e=>t.validate(e))}function D(t){return null!=t?V.compose(S(t)):null}function k(t){return null!=t?V.composeAsync(S(t)):null}function T(t,e){return null===t?[e]:Array.isArray(t)?[...t,e]:[t,e]}let M=(()=>{class t{constructor(){this._rawValidators=[],this._rawAsyncValidators=[],this._onDestroyCallbacks=[]}get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_setValidators(t){this._rawValidators=t||[],this._composedValidatorFn=D(this._rawValidators)}_setAsyncValidators(t){this._rawAsyncValidators=t||[],this._composedAsyncValidatorFn=k(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_registerOnDestroy(t){this._onDestroyCallbacks.push(t)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(t=>t()),this._onDestroyCallbacks=[]}reset(t){this.control&&this.control.reset(t)}hasError(t,e){return!!this.control&&this.control.hasError(t,e)}getError(t,e){return this.control?this.control.getError(t,e):null}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275dir=s.Bb({type:t}),t})(),P=(()=>{class t extends M{get formDirective(){return null}get path(){return null}}return t.\u0275fac=function(e){return j(e||t)},t.\u0275dir=s.Bb({type:t,features:[s.tb]}),t})();const j=s.Mb(P);class x extends M{constructor(){super(...arguments),this._parent=null,this.name=null,this.valueAccessor=null}}class G{constructor(t){this._cd=t}get ngClassUntouched(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.untouched)&&void 0!==n&&n}get ngClassTouched(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.touched)&&void 0!==n&&n}get ngClassPristine(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.pristine)&&void 0!==n&&n}get ngClassDirty(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.dirty)&&void 0!==n&&n}get ngClassValid(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.valid)&&void 0!==n&&n}get ngClassInvalid(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.invalid)&&void 0!==n&&n}get ngClassPending(){var t,e,n;return null!==(n=null===(e=null===(t=this._cd)||void 0===t?void 0:t.control)||void 0===e?void 0:e.pending)&&void 0!==n&&n}}let F=(()=>{class t extends G{constructor(t){super(t)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(x,2))},t.\u0275dir=s.Bb({type:t,selectors:[["","formControlName",""],["","ngModel",""],["","formControl",""]],hostVars:14,hostBindings:function(t,e){2&t&&s.yb("ng-untouched",e.ngClassUntouched)("ng-touched",e.ngClassTouched)("ng-pristine",e.ngClassPristine)("ng-dirty",e.ngClassDirty)("ng-valid",e.ngClassValid)("ng-invalid",e.ngClassInvalid)("ng-pending",e.ngClassPending)},features:[s.tb]}),t})(),R=(()=>{class t extends G{constructor(t){super(t)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(P,10))},t.\u0275dir=s.Bb({type:t,selectors:[["","formGroupName",""],["","formArrayName",""],["","ngModelGroup",""],["","formGroup",""],["form",3,"ngNoForm",""],["","ngForm",""]],hostVars:14,hostBindings:function(t,e){2&t&&s.yb("ng-untouched",e.ngClassUntouched)("ng-touched",e.ngClassTouched)("ng-pristine",e.ngClassPristine)("ng-dirty",e.ngClassDirty)("ng-valid",e.ngClassValid)("ng-invalid",e.ngClassInvalid)("ng-pending",e.ngClassPending)},features:[s.tb]}),t})();const N={provide:c,useExisting:Object(s.S)(()=>U),multi:!0};let U=(()=>{class t{constructor(t,e){this._renderer=t,this._elementRef=e,this.onChange=t=>{},this.onTouched=()=>{}}writeValue(t){this._renderer.setProperty(this._elementRef.nativeElement,"value",null==t?"":t)}registerOnChange(t){this.onChange=e=>{t(""==e?null:parseFloat(e))}}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l))},t.\u0275dir=s.Bb({type:t,selectors:[["input","type","number","formControlName",""],["input","type","number","formControl",""],["input","type","number","ngModel",""]],hostBindings:function(t,e){1&t&&s.Rb("input",function(t){return e.onChange(t.target.value)})("blur",function(){return e.onTouched()})},features:[s.vb([N])]}),t})();const B={provide:c,useExisting:Object(s.S)(()=>W),multi:!0};let I=(()=>{class t{constructor(){this._accessors=[]}add(t,e){this._accessors.push([t,e])}remove(t){for(let e=this._accessors.length-1;e>=0;--e)if(this._accessors[e][1]===t)return void this._accessors.splice(e,1)}select(t){this._accessors.forEach(e=>{this._isSameGroup(e,t)&&e[1]!==t&&e[1].fireUncheck(t.value)})}_isSameGroup(t,e){return!!t[0].control&&t[0]._parent===e._control._parent&&t[1].name===e.name}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=s.Cb({token:t,factory:t.\u0275fac}),t})(),W=(()=>{class t{constructor(t,e,n,s){this._renderer=t,this._elementRef=e,this._registry=n,this._injector=s,this.onChange=()=>{},this.onTouched=()=>{}}ngOnInit(){this._control=this._injector.get(x),this._checkName(),this._registry.add(this._control,this)}ngOnDestroy(){this._registry.remove(this)}writeValue(t){this._state=t===this.value,this._renderer.setProperty(this._elementRef.nativeElement,"checked",this._state)}registerOnChange(t){this._fn=t,this.onChange=()=>{t(this.value),this._registry.select(this)}}fireUncheck(t){this.writeValue(t)}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_checkName(){!this.name&&this.formControlName&&(this.name=this.formControlName)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l),s.Gb(I),s.Gb(s.r))},t.\u0275dir=s.Bb({type:t,selectors:[["input","type","radio","formControlName",""],["input","type","radio","formControl",""],["input","type","radio","ngModel",""]],hostBindings:function(t,e){1&t&&s.Rb("change",function(){return e.onChange()})("blur",function(){return e.onTouched()})},inputs:{name:"name",formControlName:"formControlName",value:"value"},features:[s.vb([B])]}),t})();const $={provide:c,useExisting:Object(s.S)(()=>q),multi:!0};let q=(()=>{class t{constructor(t,e){this._renderer=t,this._elementRef=e,this.onChange=t=>{},this.onTouched=()=>{}}writeValue(t){this._renderer.setProperty(this._elementRef.nativeElement,"value",parseFloat(t))}registerOnChange(t){this.onChange=e=>{t(""==e?null:parseFloat(e))}}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l))},t.\u0275dir=s.Bb({type:t,selectors:[["input","type","range","formControlName",""],["input","type","range","formControl",""],["input","type","range","ngModel",""]],hostBindings:function(t,e){1&t&&s.Rb("change",function(t){return e.onChange(t.target.value)})("input",function(t){return e.onChange(t.target.value)})("blur",function(){return e.onTouched()})},features:[s.vb([$])]}),t})();const L={provide:c,useExisting:Object(s.S)(()=>Z),multi:!0};function z(t,e){return null==t?""+e:(e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let Z=(()=>{class t{constructor(t,e){this._renderer=t,this._elementRef=e,this._optionMap=new Map,this._idCounter=0,this.onChange=t=>{},this.onTouched=()=>{},this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){this.value=t;const e=this._getOptionId(t);null==e&&this._renderer.setProperty(this._elementRef.nativeElement,"selectedIndex",-1);const n=z(e,t);this._renderer.setProperty(this._elementRef.nativeElement,"value",n)}registerOnChange(t){this.onChange=e=>{this.value=this._getOptionValue(e),t(this.value)}}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_registerOption(){return(this._idCounter++).toString()}_getOptionId(t){for(const e of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(e),t))return e;return null}_getOptionValue(t){const e=function(t){return t.split(":")[0]}(t);return this._optionMap.has(e)?this._optionMap.get(e):t}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l))},t.\u0275dir=s.Bb({type:t,selectors:[["select","formControlName","",3,"multiple",""],["select","formControl","",3,"multiple",""],["select","ngModel","",3,"multiple",""]],hostBindings:function(t,e){1&t&&s.Rb("change",function(t){return e.onChange(t.target.value)})("blur",function(){return e.onTouched()})},inputs:{compareWith:"compareWith"},features:[s.vb([L])]}),t})(),H=(()=>{class t{constructor(t,e,n){this._element=t,this._renderer=e,this._select=n,this._select&&(this.id=this._select._registerOption())}set ngValue(t){null!=this._select&&(this._select._optionMap.set(this.id,t),this._setElementValue(z(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._setElementValue(t),this._select&&this._select.writeValue(this._select.value)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.l),s.Gb(s.D),s.Gb(Z,9))},t.\u0275dir=s.Bb({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),t})();const J={provide:c,useExisting:Object(s.S)(()=>K),multi:!0};function X(t,e){return null==t?""+e:("string"==typeof e&&(e=`'${e}'`),e&&"object"==typeof e&&(e="Object"),`${t}: ${e}`.slice(0,50))}let K=(()=>{class t{constructor(t,e){this._renderer=t,this._elementRef=e,this._optionMap=new Map,this._idCounter=0,this.onChange=t=>{},this.onTouched=()=>{},this._compareWith=Object.is}set compareWith(t){this._compareWith=t}writeValue(t){let e;if(this.value=t,Array.isArray(t)){const n=t.map(t=>this._getOptionId(t));e=(t,e)=>{t._setSelected(n.indexOf(e.toString())>-1)}}else e=(t,e)=>{t._setSelected(!1)};this._optionMap.forEach(e)}registerOnChange(t){this.onChange=e=>{const n=[];if(void 0!==e.selectedOptions){const t=e.selectedOptions;for(let e=0;e<t.length;e++){const s=t.item(e),i=this._getOptionValue(s.value);n.push(i)}}else{const t=e.options;for(let e=0;e<t.length;e++){const s=t.item(e);if(s.selected){const t=this._getOptionValue(s.value);n.push(t)}}}this.value=n,t(n)}}registerOnTouched(t){this.onTouched=t}setDisabledState(t){this._renderer.setProperty(this._elementRef.nativeElement,"disabled",t)}_registerOption(t){const e=(this._idCounter++).toString();return this._optionMap.set(e,t),e}_getOptionId(t){for(const e of Array.from(this._optionMap.keys()))if(this._compareWith(this._optionMap.get(e)._value,t))return e;return null}_getOptionValue(t){const e=function(t){return t.split(":")[0]}(t);return this._optionMap.has(e)?this._optionMap.get(e)._value:t}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.D),s.Gb(s.l))},t.\u0275dir=s.Bb({type:t,selectors:[["select","multiple","","formControlName",""],["select","multiple","","formControl",""],["select","multiple","","ngModel",""]],hostBindings:function(t,e){1&t&&s.Rb("change",function(t){return e.onChange(t.target)})("blur",function(){return e.onTouched()})},inputs:{compareWith:"compareWith"},features:[s.vb([J])]}),t})(),Q=(()=>{class t{constructor(t,e,n){this._element=t,this._renderer=e,this._select=n,this._select&&(this.id=this._select._registerOption(this))}set ngValue(t){null!=this._select&&(this._value=t,this._setElementValue(X(this.id,t)),this._select.writeValue(this._select.value))}set value(t){this._select?(this._value=t,this._setElementValue(X(this.id,t)),this._select.writeValue(this._select.value)):this._setElementValue(t)}_setElementValue(t){this._renderer.setProperty(this._element.nativeElement,"value",t)}_setSelected(t){this._renderer.setProperty(this._element.nativeElement,"selected",t)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(s.l),s.Gb(s.D),s.Gb(K,9))},t.\u0275dir=s.Bb({type:t,selectors:[["option"]],inputs:{ngValue:"ngValue",value:"value"}}),t})();function Y(t,e){et(t,e,!0),e.valueAccessor.writeValue(t.value),function(t,e){e.valueAccessor.registerOnChange(n=>{t._pendingValue=n,t._pendingChange=!0,t._pendingDirty=!0,"change"===t.updateOn&&nt(t,e)})}(t,e),function(t,e){const n=(t,n)=>{e.valueAccessor.writeValue(t),n&&e.viewToModelUpdate(t)};t.registerOnChange(n),e._registerOnDestroy(()=>{t._unregisterOnChange(n)})}(t,e),function(t,e){e.valueAccessor.registerOnTouched(()=>{t._pendingTouched=!0,"blur"===t.updateOn&&t._pendingChange&&nt(t,e),"submit"!==t.updateOn&&t.markAsTouched()})}(t,e),function(t,e){if(e.valueAccessor.setDisabledState){const n=t=>{e.valueAccessor.setDisabledState(t)};t.registerOnDisabledChange(n),e._registerOnDestroy(()=>{t._unregisterOnDisabledChange(n)})}}(t,e)}function tt(t,e){t.forEach(t=>{t.registerOnValidatorChange&&t.registerOnValidatorChange(e)})}function et(t,e,n){const s=function(t){return t._rawValidators}(t);null!==e.validator?t.setValidators(T(s,e.validator)):"function"==typeof s&&t.setValidators([s]);const i=function(t){return t._rawAsyncValidators}(t);if(null!==e.asyncValidator?t.setAsyncValidators(T(i,e.asyncValidator)):"function"==typeof i&&t.setAsyncValidators([i]),n){const n=()=>t.updateValueAndValidity();tt(e._rawValidators,n),tt(e._rawAsyncValidators,n)}}function nt(t,e){t._pendingDirty&&t.markAsDirty(),t.setValue(t._pendingValue,{emitModelToViewChange:!1}),e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1}const st=[p,q,U,Z,K,W];function it(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}const rt="VALID",ot="INVALID",lt="PENDING",at="DISABLED";function ut(t){return(pt(t)?t.validators:t)||null}function ht(t){return Array.isArray(t)?D(t):t||null}function ct(t,e){return(pt(e)?e.asyncValidators:t)||null}function dt(t){return Array.isArray(t)?k(t):t||null}function pt(t){return null!=t&&!Array.isArray(t)&&"object"==typeof t}class _t{constructor(t,e){this._hasOwnPendingAsyncValidator=!1,this._onCollectionChange=()=>{},this._parent=null,this.pristine=!0,this.touched=!1,this._onDisabledChange=[],this._rawValidators=t,this._rawAsyncValidators=e,this._composedValidatorFn=ht(this._rawValidators),this._composedAsyncValidatorFn=dt(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn}set validator(t){this._rawValidators=this._composedValidatorFn=t}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(t){this._rawAsyncValidators=this._composedAsyncValidatorFn=t}get parent(){return this._parent}get valid(){return this.status===rt}get invalid(){return this.status===ot}get pending(){return this.status==lt}get disabled(){return this.status===at}get enabled(){return this.status!==at}get dirty(){return!this.pristine}get untouched(){return!this.touched}get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:"change"}setValidators(t){this._rawValidators=t,this._composedValidatorFn=ht(t)}setAsyncValidators(t){this._rawAsyncValidators=t,this._composedAsyncValidatorFn=dt(t)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(t={}){this.touched=!0,this._parent&&!t.onlySelf&&this._parent.markAsTouched(t)}markAllAsTouched(){this.markAsTouched({onlySelf:!0}),this._forEachChild(t=>t.markAllAsTouched())}markAsUntouched(t={}){this.touched=!1,this._pendingTouched=!1,this._forEachChild(t=>{t.markAsUntouched({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}markAsDirty(t={}){this.pristine=!1,this._parent&&!t.onlySelf&&this._parent.markAsDirty(t)}markAsPristine(t={}){this.pristine=!0,this._pendingDirty=!1,this._forEachChild(t=>{t.markAsPristine({onlySelf:!0})}),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}markAsPending(t={}){this.status=lt,!1!==t.emitEvent&&this.statusChanges.emit(this.status),this._parent&&!t.onlySelf&&this._parent.markAsPending(t)}disable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=at,this.errors=null,this._forEachChild(e=>{e.disable(Object.assign(Object.assign({},t),{onlySelf:!0}))}),this._updateValue(),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors(Object.assign(Object.assign({},t),{skipPristineCheck:e})),this._onDisabledChange.forEach(t=>t(!0))}enable(t={}){const e=this._parentMarkedDirty(t.onlySelf);this.status=rt,this._forEachChild(e=>{e.enable(Object.assign(Object.assign({},t),{onlySelf:!0}))}),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent}),this._updateAncestors(Object.assign(Object.assign({},t),{skipPristineCheck:e})),this._onDisabledChange.forEach(t=>t(!1))}_updateAncestors(t){this._parent&&!t.onlySelf&&(this._parent.updateValueAndValidity(t),t.skipPristineCheck||this._parent._updatePristine(),this._parent._updateTouched())}setParent(t){this._parent=t}updateValueAndValidity(t={}){this._setInitialStatus(),this._updateValue(),this.enabled&&(this._cancelExistingSubscription(),this.errors=this._runValidator(),this.status=this._calculateStatus(),this.status!==rt&&this.status!==lt||this._runAsyncValidator(t.emitEvent)),!1!==t.emitEvent&&(this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._parent&&!t.onlySelf&&this._parent.updateValueAndValidity(t)}_updateTreeValidity(t={emitEvent:!0}){this._forEachChild(e=>e._updateTreeValidity(t)),this.updateValueAndValidity({onlySelf:!0,emitEvent:t.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?at:rt}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(t){if(this.asyncValidator){this.status=lt,this._hasOwnPendingAsyncValidator=!0;const e=A(this.asyncValidator(this));this._asyncValidationSubscription=e.subscribe(e=>{this._hasOwnPendingAsyncValidator=!1,this.setErrors(e,{emitEvent:t})})}}_cancelExistingSubscription(){this._asyncValidationSubscription&&(this._asyncValidationSubscription.unsubscribe(),this._hasOwnPendingAsyncValidator=!1)}setErrors(t,e={}){this.errors=t,this._updateControlsErrors(!1!==e.emitEvent)}get(t){return function(t,e,n){if(null==e)return null;if(Array.isArray(e)||(e=e.split(".")),Array.isArray(e)&&0===e.length)return null;let s=t;return e.forEach(t=>{s=s instanceof ft?s.controls.hasOwnProperty(t)?s.controls[t]:null:s instanceof mt&&s.at(t)||null}),s}(this,t)}getError(t,e){const n=e?this.get(e):this;return n&&n.errors?n.errors[t]:null}hasError(t,e){return!!this.getError(t,e)}get root(){let t=this;for(;t._parent;)t=t._parent;return t}_updateControlsErrors(t){this.status=this._calculateStatus(),t&&this.statusChanges.emit(this.status),this._parent&&this._parent._updateControlsErrors(t)}_initObservables(){this.valueChanges=new s.n,this.statusChanges=new s.n}_calculateStatus(){return this._allControlsDisabled()?at:this.errors?ot:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(lt)?lt:this._anyControlsHaveStatus(ot)?ot:rt}_anyControlsHaveStatus(t){return this._anyControls(e=>e.status===t)}_anyControlsDirty(){return this._anyControls(t=>t.dirty)}_anyControlsTouched(){return this._anyControls(t=>t.touched)}_updatePristine(t={}){this.pristine=!this._anyControlsDirty(),this._parent&&!t.onlySelf&&this._parent._updatePristine(t)}_updateTouched(t={}){this.touched=this._anyControlsTouched(),this._parent&&!t.onlySelf&&this._parent._updateTouched(t)}_isBoxedValue(t){return"object"==typeof t&&null!==t&&2===Object.keys(t).length&&"value"in t&&"disabled"in t}_registerOnCollectionChange(t){this._onCollectionChange=t}_setUpdateStrategy(t){pt(t)&&null!=t.updateOn&&(this._updateOn=t.updateOn)}_parentMarkedDirty(t){return!t&&!(!this._parent||!this._parent.dirty)&&!this._parent._anyControlsDirty()}}class gt extends _t{constructor(t=null,e,n){super(ut(e),ct(n,e)),this._onChange=[],this._applyFormState(t),this._setUpdateStrategy(e),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}setValue(t,e={}){this.value=this._pendingValue=t,this._onChange.length&&!1!==e.emitModelToViewChange&&this._onChange.forEach(t=>t(this.value,!1!==e.emitViewToModelChange)),this.updateValueAndValidity(e)}patchValue(t,e={}){this.setValue(t,e)}reset(t=null,e={}){this._applyFormState(t),this.markAsPristine(e),this.markAsUntouched(e),this.setValue(this.value,e),this._pendingChange=!1}_updateValue(){}_anyControls(t){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(t){this._onChange.push(t)}_unregisterOnChange(t){it(this._onChange,t)}registerOnDisabledChange(t){this._onDisabledChange.push(t)}_unregisterOnDisabledChange(t){it(this._onDisabledChange,t)}_forEachChild(t){}_syncPendingControls(){return!("submit"!==this.updateOn||(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),!this._pendingChange)||(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),0))}_applyFormState(t){this._isBoxedValue(t)?(this.value=this._pendingValue=t.value,t.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=t}}class ft extends _t{constructor(t,e,n){super(ut(e),ct(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}registerControl(t,e){return this.controls[t]?this.controls[t]:(this.controls[t]=e,e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange),e)}addControl(t,e){this.registerControl(t,e),this.updateValueAndValidity(),this._onCollectionChange()}removeControl(t){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],this.updateValueAndValidity(),this._onCollectionChange()}setControl(t,e){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),delete this.controls[t],e&&this.registerControl(t,e),this.updateValueAndValidity(),this._onCollectionChange()}contains(t){return this.controls.hasOwnProperty(t)&&this.controls[t].enabled}setValue(t,e={}){this._checkAllValuesPresent(t),Object.keys(t).forEach(n=>{this._throwIfControlMissing(n),this.controls[n].setValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){Object.keys(t).forEach(n=>{this.controls[n]&&this.controls[n].patchValue(t[n],{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}reset(t={},e={}){this._forEachChild((n,s)=>{n.reset(t[s],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this._reduceChildren({},(t,e,n)=>(t[n]=e instanceof gt?e.value:e.getRawValue(),t))}_syncPendingControls(){let t=this._reduceChildren(!1,(t,e)=>!!e._syncPendingControls()||t);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_throwIfControlMissing(t){if(!Object.keys(this.controls).length)throw new Error("\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");if(!this.controls[t])throw new Error(`Cannot find form control with name: ${t}.`)}_forEachChild(t){Object.keys(this.controls).forEach(e=>t(this.controls[e],e))}_setUpControls(){this._forEachChild(t=>{t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(t){for(const e of Object.keys(this.controls)){const n=this.controls[e];if(this.contains(e)&&t(n))return!0}return!1}_reduceValue(){return this._reduceChildren({},(t,e,n)=>((e.enabled||this.disabled)&&(t[n]=e.value),t))}_reduceChildren(t,e){let n=t;return this._forEachChild((t,s)=>{n=e(n,t,s)}),n}_allControlsDisabled(){for(const t of Object.keys(this.controls))if(this.controls[t].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_checkAllValuesPresent(t){this._forEachChild((e,n)=>{if(void 0===t[n])throw new Error(`Must supply a value for form control with name: '${n}'.`)})}}class mt extends _t{constructor(t,e,n){super(ut(e),ct(n,e)),this.controls=t,this._initObservables(),this._setUpdateStrategy(e),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!n})}at(t){return this.controls[t]}push(t){this.controls.push(t),this._registerControl(t),this.updateValueAndValidity(),this._onCollectionChange()}insert(t,e){this.controls.splice(t,0,e),this._registerControl(e),this.updateValueAndValidity()}removeAt(t){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),this.updateValueAndValidity()}setControl(t,e){this.controls[t]&&this.controls[t]._registerOnCollectionChange(()=>{}),this.controls.splice(t,1),e&&(this.controls.splice(t,0,e),this._registerControl(e)),this.updateValueAndValidity(),this._onCollectionChange()}get length(){return this.controls.length}setValue(t,e={}){this._checkAllValuesPresent(t),t.forEach((t,n)=>{this._throwIfControlMissing(n),this.at(n).setValue(t,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}patchValue(t,e={}){t.forEach((t,n)=>{this.at(n)&&this.at(n).patchValue(t,{onlySelf:!0,emitEvent:e.emitEvent})}),this.updateValueAndValidity(e)}reset(t=[],e={}){this._forEachChild((n,s)=>{n.reset(t[s],{onlySelf:!0,emitEvent:e.emitEvent})}),this._updatePristine(e),this._updateTouched(e),this.updateValueAndValidity(e)}getRawValue(){return this.controls.map(t=>t instanceof gt?t.value:t.getRawValue())}clear(){this.controls.length<1||(this._forEachChild(t=>t._registerOnCollectionChange(()=>{})),this.controls.splice(0),this.updateValueAndValidity())}_syncPendingControls(){let t=this.controls.reduce((t,e)=>!!e._syncPendingControls()||t,!1);return t&&this.updateValueAndValidity({onlySelf:!0}),t}_throwIfControlMissing(t){if(!this.controls.length)throw new Error("\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      ");if(!this.at(t))throw new Error("Cannot find form control at index "+t)}_forEachChild(t){this.controls.forEach((e,n)=>{t(e,n)})}_updateValue(){this.value=this.controls.filter(t=>t.enabled||this.disabled).map(t=>t.value)}_anyControls(t){return this.controls.some(e=>e.enabled&&t(e))}_setUpControls(){this._forEachChild(t=>this._registerControl(t))}_checkAllValuesPresent(t){this._forEachChild((e,n)=>{if(void 0===t[n])throw new Error(`Must supply a value for form control at index: ${n}.`)})}_allControlsDisabled(){for(const t of this.controls)if(t.enabled)return!1;return this.controls.length>0||this.disabled}_registerControl(t){t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange)}}const yt={provide:P,useExisting:Object(s.S)(()=>Ct)},vt=(()=>Promise.resolve(null))();let Ct=(()=>{class t extends P{constructor(t,e){super(),this.submitted=!1,this._directives=[],this.ngSubmit=new s.n,this.form=new ft({},D(t),k(e))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(t){vt.then(()=>{const e=this._findContainer(t.path);t.control=e.registerControl(t.name,t.control),Y(t.control,t),t.control.updateValueAndValidity({emitEvent:!1}),this._directives.push(t)})}getControl(t){return this.form.get(t.path)}removeControl(t){vt.then(()=>{const e=this._findContainer(t.path);e&&e.removeControl(t.name),it(this._directives,t)})}addFormGroup(t){vt.then(()=>{const e=this._findContainer(t.path),n=new ft({});(function(t,e){et(t,e,!1)})(n,t),e.registerControl(t.name,n),n.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(t){vt.then(()=>{const e=this._findContainer(t.path);e&&e.removeControl(t.name)})}getFormGroup(t){return this.form.get(t.path)}updateModel(t,e){vt.then(()=>{this.form.get(t.path).setValue(e)})}setValue(t){this.control.setValue(t)}onSubmit(t){return this.submitted=!0,e=this._directives,this.form._syncPendingControls(),e.forEach(t=>{const e=t.control;"submit"===e.updateOn&&e._pendingChange&&(t.viewToModelUpdate(e._pendingValue),e._pendingChange=!1)}),this.ngSubmit.emit(t),!1;var e}onReset(){this.resetForm()}resetForm(t){this.form.reset(t),this.submitted=!1}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.form._updateOn=this.options.updateOn)}_findContainer(t){return t.pop(),t.length?this.form.get(t):this.form}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(v,10),s.Gb(C,10))},t.\u0275dir=s.Bb({type:t,selectors:[["form",3,"ngNoForm","",3,"formGroup",""],["ng-form"],["","ngForm",""]],hostBindings:function(t,e){1&t&&s.Rb("submit",function(t){return e.onSubmit(t)})("reset",function(){return e.onReset()})},inputs:{options:["ngFormOptions","options"]},outputs:{ngSubmit:"ngSubmit"},exportAs:["ngForm"],features:[s.vb([yt]),s.tb]}),t})();const bt={provide:x,useExisting:Object(s.S)(()=>Ot)},Vt=(()=>Promise.resolve(null))();let Ot=(()=>{class t extends x{constructor(t,e,n,i){super(),this.control=new gt,this._registered=!1,this.update=new s.n,this._parent=t,this._setValidators(e),this._setAsyncValidators(n),this.valueAccessor=function(t,e){if(!e)return null;Array.isArray(e);let n=void 0,s=void 0,i=void 0;return e.forEach(t=>{var e;t.constructor===f?n=t:(e=t,st.some(t=>e.constructor===t)?s=t:i=t)}),i||s||n||null}(0,i)}ngOnChanges(t){this._checkForErrors(),this._registered||this._setUpControl(),"isDisabled"in t&&this._updateDisabled(t),function(t,e){if(!t.hasOwnProperty("model"))return!1;const n=t.model;return!!n.isFirstChange()||!Object.is(e,n.currentValue)}(t,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective&&this.formDirective.removeControl(this)}get path(){return this._parent?[...this._parent.path,this.name]:[this.name]}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(t){this.viewModel=t,this.update.emit(t)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&null!=this.options.updateOn&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!(!this.options||!this.options.standalone)}_setUpStandalone(){Y(this.control,this),this.control.updateValueAndValidity({emitEvent:!1})}_checkForErrors(){this._isStandalone()||this._checkParentType(),this._checkName()}_checkParentType(){}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),this._isStandalone()}_updateValue(t){Vt.then(()=>{this.control.setValue(t,{emitViewToModelChange:!1})})}_updateDisabled(t){const e=t.isDisabled.currentValue,n=""===e||e&&"false"!==e;Vt.then(()=>{n&&!this.control.disabled?this.control.disable():!n&&this.control.disabled&&this.control.enable()})}}return t.\u0275fac=function(e){return new(e||t)(s.Gb(P,9),s.Gb(v,10),s.Gb(C,10),s.Gb(c,10))},t.\u0275dir=s.Bb({type:t,selectors:[["","ngModel","",3,"formControlName","",3,"formControl",""]],inputs:{name:"name",isDisabled:["disabled","isDisabled"],model:["ngModel","model"],options:["ngModelOptions","options"]},outputs:{update:"ngModelChange"},exportAs:["ngModel"],features:[s.vb([bt]),s.tb,s.ub]}),t})();const At=new s.q("NgModelWithFormControlWarning");let wt=(()=>{class t{}return t.\u0275mod=s.Eb({type:t}),t.\u0275inj=s.Db({factory:function(e){return new(e||t)}}),t})(),Et=(()=>{class t{group(t,e=null){const n=this._reduceControls(t);let s=null,i=null,r=void 0;return null!=e&&(function(t){return void 0!==t.asyncValidators||void 0!==t.validators||void 0!==t.updateOn}(e)?(s=null!=e.validators?e.validators:null,i=null!=e.asyncValidators?e.asyncValidators:null,r=null!=e.updateOn?e.updateOn:void 0):(s=null!=e.validator?e.validator:null,i=null!=e.asyncValidator?e.asyncValidator:null)),new ft(n,{asyncValidators:i,updateOn:r,validators:s})}control(t,e,n){return new gt(t,e,n)}array(t,e,n){const s=t.map(t=>this._createControl(t));return new mt(s,e,n)}_reduceControls(t){const e={};return Object.keys(t).forEach(n=>{e[n]=this._createControl(t[n])}),e}_createControl(t){return t instanceof gt||t instanceof ft||t instanceof mt?t:Array.isArray(t)?this.control(t[0],t.length>1?t[1]:null,t.length>2?t[2]:null):this.control(t)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=s.Cb({token:t,factory:t.\u0275fac}),t})(),St=(()=>{class t{}return t.\u0275mod=s.Eb({type:t}),t.\u0275inj=s.Db({factory:function(e){return new(e||t)},providers:[I],imports:[wt]}),t})(),Dt=(()=>{class t{static withConfig(e){return{ngModule:t,providers:[{provide:At,useValue:e.warnOnNgModelWithFormControl}]}}}return t.\u0275mod=s.Eb({type:t}),t.\u0275inj=s.Db({factory:function(e){return new(e||t)},providers:[Et,I],imports:[wt]}),t})()}}]);