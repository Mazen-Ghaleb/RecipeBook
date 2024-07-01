import{c as B,d as J,g as K}from"./chunk-WJKLNZU6.js";import{a as R,c as D,d as T,f as j,h as q,i as H,o as P,p as Q,q as k,t as O}from"./chunk-Q73L2NTX.js";import{Ba as E,Ca as L,Da as F,Ea as y,Fa as l,Ha as _,Jb as N,Kb as U,Lb as G,Mb as f,Ob as z,S as w,Wa as V,X as C,Y as x,aa as h,ba as g,ka as a,la as b,ma as M,qa as v,qb as I,sa as p,ua as s,va as r,wa as d,xa as A,ya as S,za as u}from"./chunk-BKH2LAIR.js";function Y(o,i){}function Z(o,i){o&1&&(s(0,"div",6),d(1,"app-loading-spinner"),r())}function $(o,i){if(o&1){let c=A();s(0,"form",7,0),S("ngSubmit",function(){h(c);let t=y(1),n=u();return g(n.onSubmit(t))}),s(2,"div",8)(3,"label",9),l(4,"E-Mail"),r(),d(5,"input",10),r(),s(6,"div",8)(7,"label",11),l(8,"Password"),r(),d(9,"input",12),r(),s(10,"div")(11,"button",13),l(12),r(),l(13," | "),s(14,"button",14),S("click",function(){h(c);let t=u();return g(t.onSwitchMode())}),l(15),r()()()}if(o&2){let c=y(1),e=u();a(11),p("disabled",!c.valid),a(),_(" ",e.isLoginMode?"Login":"Sign Up"," "),a(3),_(" Switch to ",e.isLoginMode?"Sign Up":"Login"," ")}}var W=(()=>{let i=class i{constructor(e,t){this.componentFactoryResolver=e,this.store=t,this.isLoginMode=!0,this.isLoading=!1}ngOnInit(){this.storeSub=this.store.select("auth").subscribe(e=>{this.isLoading=e.loading,e.authError&&this.showErrorAlert(e.authError)})}onSwitchMode(){this.isLoginMode=!this.isLoginMode}onSubmit(e){if(!e.valid)return;let t=e.value.email,n=e.value.password;this.isLoginMode?this.store.dispatch(J({email:t,password:n})):this.store.dispatch(B({email:t,password:n})),e.reset()}showErrorAlert(e){let t=this.componentFactoryResolver.resolveComponentFactory(U),n=this.alertHost.viewContainerRef;n.clear();let m=n.createComponent(t);m.instance.message=e,this.closeSub=m.instance.close.subscribe(()=>{this.closeSub.unsubscribe(),n.clear(),this.onHandleError()})}onHandleError(){this.store.dispatch(K())}ngOnDestroy(){this.closeSub&&this.closeSub.unsubscribe(),this.storeSub&&this.storeSub.unsubscribe()}};i.\u0275fac=function(t){return new(t||i)(b(M),b(I))},i.\u0275cmp=C({type:i,selectors:[["app-auth"]],viewQuery:function(t,n){if(t&1&&E(f,5),t&2){let m;L(m=F())&&(n.alertHost=m.first)}},decls:5,vars:2,consts:[["authForm","ngForm"],["appPlaceholder",""],[1,"row"],[1,"col-xs-12","col-md-6","col-md-offset-3"],["style","text-align: center",4,"ngIf"],[3,"ngSubmit",4,"ngIf"],[2,"text-align","center"],[3,"ngSubmit"],[1,"form-group"],["for","email"],["type","email","id","email","ngModel","","name","email","required","","email","",1,"form-control"],["for","password"],["type","password","id","password","ngModel","","name","password","required","","minlength","6",1,"form-control"],["type","submit",1,"btn","btn-primary",3,"disabled"],["type","button",1,"btn","btn-primary",3,"click"]],template:function(t,n){t&1&&(v(0,Y,0,0,"ng-template",1),s(1,"div",2)(2,"div",3),v(3,Z,2,0,"div",4)(4,$,16,3,"form",5),r()()),t&2&&(a(3),p("ngIf",n.isLoading),a(),p("ngIf",!n.isLoading))},dependencies:[G,f,V,H,R,D,T,P,k,Q,q,j],encapsulation:2});let o=i;return o})();var ue=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=x({type:i}),i.\u0275inj=w({imports:[z,O,N.forChild([{path:"",component:W}])]});let o=i;return o})();export{ue as AuthModule};
