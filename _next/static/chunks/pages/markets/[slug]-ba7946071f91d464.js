(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[602],{60798:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/markets/[slug]",function(){return a(33892)}])},83462:function(e,t,a){"use strict";a.d(t,{Z:function(){return M}});var n=a(20309);let r=Math.abs,o=Math.atan2,l=Math.cos,i=Math.max,s=Math.min,c=Math.sin,d=Math.sqrt,u=Math.PI,m=u/2,p=2*u;function h(e){return e>=1?m:e<=-1?-m:Math.asin(e)}var g=a(52882);function x(e){return e.innerRadius}function b(e){return e.outerRadius}function f(e){return e.startAngle}function y(e){return e.endAngle}function v(e){return e&&e.padAngle}function k(e,t,a,n,r,o,l){var s=e-a,c=t-n,u=(l?o:-o)/d(s*s+c*c),m=u*c,p=-u*s,h=e+m,g=t+p,x=a+m,b=n+p,f=(h+x)/2,y=(g+b)/2,v=x-h,k=b-g,M=v*v+k*k,j=r-o,S=h*b-x*g,w=(k<0?-1:1)*d(i(0,j*j*M-S*S)),z=(S*k-v*w)/M,B=(-S*v-k*w)/M,A=(S*k+v*w)/M,R=(-S*v+k*w)/M,C=z-f,P=B-y,U=A-f,_=R-y;return C*C+P*P>U*U+_*_&&(z=A,B=R),{cx:z,cy:B,x01:-m,y01:-p,x11:z*(r/j-1),y11:B*(r/j-1)}}function M(){var e=x,t=b,a=(0,n.Z)(0),i=null,M=f,j=y,S=v,w=null,z=(0,g.d)(B);function B(){var n,g,x=+e.apply(this,arguments),b=+t.apply(this,arguments),f=M.apply(this,arguments)-m,y=j.apply(this,arguments)-m,v=r(y-f),B=y>f;if(w||(w=n=z()),b<x&&(g=b,b=x,x=g),b>1e-12){if(v>p-1e-12)w.moveTo(b*l(f),b*c(f)),w.arc(0,0,b,f,y,!B),x>1e-12&&(w.moveTo(x*l(y),x*c(y)),w.arc(0,0,x,y,f,B));else{var A,R,C=f,P=y,U=f,_=y,F=v,Z=v,I=S.apply(this,arguments)/2,W=I>1e-12&&(i?+i.apply(this,arguments):d(x*x+b*b)),E=s(r(b-x)/2,+a.apply(this,arguments)),T=E,L=E;if(W>1e-12){var N=h(W/x*c(I)),G=h(W/b*c(I));(F-=2*N)>1e-12?(N*=B?1:-1,U+=N,_-=N):(F=0,U=_=(f+y)/2),(Z-=2*G)>1e-12?(G*=B?1:-1,C+=G,P-=G):(Z=0,C=P=(f+y)/2)}var H=b*l(C),O=b*c(C),K=x*l(_),X=x*c(_);if(E>1e-12){var q,D=b*l(P),Q=b*c(P),J=x*l(U),Y=x*c(U);if(v<u){if(q=function(e,t,a,n,r,o,l,i){var s=a-e,c=n-t,d=l-r,u=i-o,m=u*s-d*c;if(!(m*m<1e-12))return m=(d*(t-o)-u*(e-r))/m,[e+m*s,t+m*c]}(H,O,J,Y,D,Q,K,X)){var V,$=H-q[0],ee=O-q[1],et=D-q[0],ea=Q-q[1],en=1/c(((V=($*et+ee*ea)/(d($*$+ee*ee)*d(et*et+ea*ea)))>1?0:V<-1?u:Math.acos(V))/2),er=d(q[0]*q[0]+q[1]*q[1]);T=s(E,(x-er)/(en-1)),L=s(E,(b-er)/(en+1))}else T=L=0}}Z>1e-12?L>1e-12?(A=k(J,Y,H,O,b,L,B),R=k(D,Q,K,X,b,L,B),w.moveTo(A.cx+A.x01,A.cy+A.y01),L<E?w.arc(A.cx,A.cy,L,o(A.y01,A.x01),o(R.y01,R.x01),!B):(w.arc(A.cx,A.cy,L,o(A.y01,A.x01),o(A.y11,A.x11),!B),w.arc(0,0,b,o(A.cy+A.y11,A.cx+A.x11),o(R.cy+R.y11,R.cx+R.x11),!B),w.arc(R.cx,R.cy,L,o(R.y11,R.x11),o(R.y01,R.x01),!B))):(w.moveTo(H,O),w.arc(0,0,b,C,P,!B)):w.moveTo(H,O),x>1e-12&&F>1e-12?T>1e-12?(A=k(K,X,D,Q,x,-T,B),R=k(H,O,J,Y,x,-T,B),w.lineTo(A.cx+A.x01,A.cy+A.y01),T<E?w.arc(A.cx,A.cy,T,o(A.y01,A.x01),o(R.y01,R.x01),!B):(w.arc(A.cx,A.cy,T,o(A.y01,A.x01),o(A.y11,A.x11),!B),w.arc(0,0,x,o(A.cy+A.y11,A.cx+A.x11),o(R.cy+R.y11,R.cx+R.x11),B),w.arc(R.cx,R.cy,T,o(R.y11,R.x11),o(R.y01,R.x01),!B))):w.arc(0,0,x,_,U,B):w.lineTo(K,X)}}else w.moveTo(0,0);if(w.closePath(),n)return w=null,n+""||null}return B.centroid=function(){var a=(+e.apply(this,arguments)+ +t.apply(this,arguments))/2,n=(+M.apply(this,arguments)+ +j.apply(this,arguments))/2-u/2;return[l(n)*a,c(n)*a]},B.innerRadius=function(t){return arguments.length?(e="function"==typeof t?t:(0,n.Z)(+t),B):e},B.outerRadius=function(e){return arguments.length?(t="function"==typeof e?e:(0,n.Z)(+e),B):t},B.cornerRadius=function(e){return arguments.length?(a="function"==typeof e?e:(0,n.Z)(+e),B):a},B.padRadius=function(e){return arguments.length?(i=null==e?null:"function"==typeof e?e:(0,n.Z)(+e),B):i},B.startAngle=function(e){return arguments.length?(M="function"==typeof e?e:(0,n.Z)(+e),B):M},B.endAngle=function(e){return arguments.length?(j="function"==typeof e?e:(0,n.Z)(+e),B):j},B.padAngle=function(e){return arguments.length?(S="function"==typeof e?e:(0,n.Z)(+e),B):S},B.context=function(e){return arguments.length?(w=null==e?null:e,B):w},B}},92853:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var n=a(85893),r=a(9443),o=a(83462),l=a(67294),i=a(48940),s=a(32568);function c(e){let{r:t,startAngle:a=0,endAngle:n=2*Math.PI}=e;return(0,o.Z)()({innerRadius:0,outerRadius:t,startAngle:a,endAngle:n})}function d(e){let{data:t,simplified:a=!1,...o}=e,{colors:d}=(0,i.F)(),[m,p]=(0,l.useState)(null),h=(0,r.Z)().domain([0,5]).range([0,9]),g=[c({r:Math.round(1e4*h(5))/1e4}),c({r:Math.round(1e4*h(3))/1e4}),c({r:Math.round(1e4*h(1))/1e4})].join(" "),x=["M".concat(10,",").concat(10,"L").concat(u(0,h(5),[10,10]).join(",")),"M".concat(10,",").concat(10,"L").concat(u(120,h(5),[10,10]).join(",")),"M".concat(10,",").concat(10,"L").concat(u(240,h(5),[10,10]).join(","))].join(" "),b=[t.find(e=>"Fundamentals"===e.label),t.find(e=>"Opportunities"===e.label),t.find(e=>"Experience"===e.label)],f="M"+[u(0,h(b[0].value),[10,10]),u(120,h(b[1].value),[10,10]),u(240,h(b[2].value),[10,10])].join("L")+"Z",y=2*Math.PI/3,v=[{data:b[0],path:c({r:Math.round(1e4*h(5))/1e4,startAngle:-y/2,endAngle:-y/2+y})},{data:b[1],path:c({r:Math.round(1e4*h(5))/1e4,startAngle:-y/2+y,endAngle:-y/2+2*y})},{data:b[2],path:c({r:Math.round(1e4*h(5))/1e4,startAngle:-y/2+2*y,endAngle:-y/2+3*y})}];return(0,n.jsxs)("svg",{viewBox:"0 0 ".concat(20," ").concat(20),fill:"none",stroke:"var(--chakra-colors-gray-400)",strokeWidth:.25,...o,children:[(0,n.jsx)("path",{d:g,vectorEffect:"non-scaling-stroke",transform:"translate(".concat(10," ").concat(10,")")}),(0,n.jsx)("path",{d:x,strokeWidth:2,stroke:"#FFF",strokeLinecap:"square",vectorEffect:"non-scaling-stroke"}),(0,n.jsx)("path",{d:x,vectorEffect:"non-scaling-stroke"}),!a&&(0,n.jsxs)("g",{children:[[1,3,5].map(e=>{let[t,a]=u(0,h(e),[10,10]);return(0,n.jsx)("text",{x:t-.0625,y:a,stroke:"#FFF",strokeWidth:8,fontSize:1,fontWeight:600,fill:d.gray[300],alignmentBaseline:"central",textAnchor:"middle",paintOrder:"stroke fill",vectorEffect:"non-scaling-stroke",children:e},e)}),[1,3,5].map(e=>{let[t,a]=u(120,h(e),[10,10]);return(0,n.jsx)("text",{x:t-.0625,y:a,stroke:"#FFF",strokeWidth:8,fontSize:1,fontWeight:600,fill:d.gray[300],alignmentBaseline:"central",textAnchor:"middle",paintOrder:"stroke fill",vectorEffect:"non-scaling-stroke",children:e},e)}),[1,3,5].map(e=>{let[t,a]=u(240,h(e),[10,10]);return(0,n.jsx)("text",{x:t-.0625,y:a,stroke:"#FFF",strokeWidth:8,fontSize:1,fontWeight:600,fill:d.gray[300],alignmentBaseline:"central",textAnchor:"middle",paintOrder:"stroke fill",vectorEffect:"non-scaling-stroke",children:e},e)})]}),(0,n.jsx)("path",{d:f,fill:"var(--chakra-colors-brand-500)",fillOpacity:.5,stroke:"var(--chakra-colors-brand-700)",strokeWidth:.5,vectorEffect:"non-scaling-stroke"}),(0,n.jsx)("g",{transform:"translate(".concat(10," ").concat(10,")"),stroke:"none",children:v.map((e,t)=>{var a,r;return(0,n.jsx)(s.u,{label:(0,n.jsx)("div",{style:{textAlign:"center",padding:"0.5rem",fontWeight:600},children:(0,n.jsx)("div",{children:"".concat(e.data.label,": ").concat(Math.round(100*e.data.value)/100)})}),placement:t?"bottom":"top",children:(0,n.jsx)("path",{d:e.path,fill:(null==m?void 0:null===(a=m.data)||void 0===a?void 0:a.label)===(null==e?void 0:null===(r=e.data)||void 0===r?void 0:r.label)?"rgba(0,0,0,0.1)":"transparent",stroke:"none",onMouseEnter:()=>{p(e)},onMouseLeave:()=>{p(null)}})},e.data.label)})})]})}function u(e,t){let a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[0,0],n=e*Math.PI/180;return[a[0]+t*Math.sin(n),a[1]+-(t*Math.cos(n))].map(e=>Math.round(1e4*e)/1e4)}},33892:function(e,t,a){"use strict";a.r(t),a.d(t,{__N_SSG:function(){return B},default:function(){return A}});var n=a(85893),r=a(14349),o=a(22338),l=a(5674),i=a(9669),s=a(68017),c=a(49181),d=a(57747),u=a(55281),m=a(71293),p=a(22757),h=a(27239),g=a(89734),x=a(18177),b=a(92853);let f=["bs","ky","cf","ky","km","do","fk","gm","im","cg","cd","lw","mv","mh","nl","an","ph","sb","tc","ae","gb","us","vi"];var y=a(67294),v=a(6158),k=a(9443);let M=[{id:"europe",name:"albers",center:[10,30],parallels:[43,62],regions:["eu"],countries:["ch","de","fr","it","nl"]},{id:"russia",name:"albers",center:[100,58],parallels:[46,70],regions:[],countries:["ru"]},{id:"usa",name:"albers",center:[-95,36.75],parallels:[27.25,46.25],regions:["northamer"],countries:["us"]},{id:"central-america",name:"albers",center:[-89,19],parallels:[8.3333333,29.6666667],regions:[],countries:["mx"]},{id:"south-america-north",name:"mercator",center:[-61,-17],regions:["amer","latam"],countries:["co","br"]},{id:"south-america-south",name:"albers",center:[-62,-36],parallels:[-50,-22],regions:[],countries:["ar","cl","uy"]},{id:"africa-center",name:"mercator",center:[28,-19.5],parallels:[-32.5,-6.5],regions:["ssa"],countries:["cd"]},{id:"africa-south",name:"albers",center:[28,-19.5],parallels:[-32.5,-6.5],regions:[],countries:["za"]},{id:"africa-north",name:"albers",center:[14,19.5],parallels:[6.5,32.5],regions:[],countries:["ng"]},{id:"middle-east",name:"albers",center:[53,28.75],parallels:[17.25,40.25],regions:["mena"],countries:["af"]},{id:"india",name:"albers",center:[80,20.25],parallels:[9.75,30.75],regions:[],countries:["in"]},{id:"southeast-asia",name:"mercator",center:[118,9],regions:["apac"],countries:["id"]},{id:"china",name:"albers",center:[105,36],parallels:[23.5,48.5],regions:[],countries:["cn"]},{id:"east-asia",name:"albers",center:[135,37.5],parallels:[30.5,44.5],regions:["asia"],countries:["jp"]},{id:"australia",name:"albers",center:[135,-28],parallels:[-40,-16],regions:[],countries:["au"]},{id:"oceania",name:"albers",center:[155,-26.4],parallels:[-40.8,-12],regions:[],countries:["nz"]},{id:"canada",name:"albers",center:[-97,57.5],parallels:[46.5,68.5],regions:[],countries:["ca"]}],j=(e,t)=>{let{name:a,center:n,parallels:r}=M.find(t=>t.countries.includes(e.toLowerCase()))||M.find(e=>e.regions.includes(t))||M[0];return{name:a,center:n,parallels:r}},S=(0,k.Z)().domain([1,45]).range([6,2]);var w=e=>{let{market:t}=e,[a,r]=(0,y.useState)(0),o=(0,y.useRef)(),l=(0,y.useRef)(),{bbox:i,iso:s,region:c}=t;return(0,y.useEffect)(()=>{if(!o.current)return;v.accessToken="pk.eyJ1IjoiY2xpbWF0ZXNjb3BlIiwiYSI6ImNpdzJmb2dwcjBhMzQyenBia2E1azBjODUifQ.9I6shKgqM1xeBA13VX5a4g";let{name:e,center:t,parallels:a}=j(s,c.id),n=i[2]-Math.abs(Math.abs(i[2])-Math.abs(i[0]))/2,d=i[3]-Math.abs(Math.abs(i[3])-Math.abs(i[1]))/2,u=Math.max(Math.abs(Math.abs(i[2])-Math.abs(i[0])),Math.abs(Math.abs(i[3])-Math.abs(i[1]))),m=window.innerWidth<1e3,p={CN:[2.8,3],CL:[2.8,3],IN:[3.4,3.6],RU:[2.2,2],MX:[3.6,3.8],US:[2.8,3],BR:[2.8,3],ID:[2.8,3],CD:[4,4.2],CA:[2.6,2.8]}[s.toUpperCase()]||[S(u)-.2,S(u)];if(!n||!d)return;let h={US:.2,BR:.3,CD:1,CA:.2},g=new v.Map({container:o.current,style:{version:8,name:"cs-base-map",metadata:{"mapbox:autocomposite":!0,"mapbox:type":"template","mapbox:sdk-support":{android:"10.0.0",ios:"10.0.0",js:"2.3.0"},"mapbox:uiParadigm":"components","mapbox:groups":{"Administrative boundaries, admin":{name:"Administrative boundaries, admin",collapsed:!0},"Place labels, place-labels":{name:"Place labels, place-labels",collapsed:!0}},"mapbox:decompiler":{id:"ckx4rve8e4g3h15p5ng8y8tzp",strata:[{id:"ckx4krhfm496215p5p2si32uw",order:["mapbox-satellite","water",["admin-boundaries","admin"],["place-labels","place-labels"]]}],components:{"admin-boundaries":"11.1.1","place-labels":"11.1.1"},propConfig:{"admin-boundaries":{colorBase:"hsla(200, 19%, 18%, 0.39)",colorPlaceLabel:"hsl(0, 0%, 100%)",admin1:!1,colorAdminBoundary:"hsla(0, 0%, 100%, 0.35)",worldview:"US"},"place-labels":{states:!1,countriesFont:["IBM Plex Sans SemiBold","Arial Unicode MS Regular"],settlementSubdivisions:!1,colorPlaceLabel:"hsl(0, 0%, 100%)",statesFont:["IBM Plex Sans SemiBold","Arial Unicode MS Bold"],countryLabelStyle:"Text and icon",colorBase:"hsla(200, 19%, 18%, 0.39)",countries:!1,worldview:"US",settlementsMinorFont:["IBM Plex Sans SemiBold","Arial Unicode MS Regular"],settlementsMajorFont:["IBM Plex Sans Bold","Arial Unicode MS Regular"],settlementsDensity:1,settlementSubdivisionsFont:["IBM Plex Sans SemiBold","Arial Unicode MS Regular"]}}}},center:[6.818318212136092,47.49206023840209],zoom:5.132514078568663,bearing:0,pitch:0,light:{anchor:"viewport",color:"hsl(0, 0%, 100%)"},sources:{"mapbox://mapbox.satellite":{url:"mapbox://mapbox.satellite",type:"raster",tileSize:256},composite:{url:"mapbox://mapbox.mapbox-streets-v8",type:"vector"}},sprite:"mapbox://sprites/climatescope/ckx4rve8e4g3h15p5ng8y8tzp/ephaas7u9k7qsgvb1e9dfc0k4",glyphs:"mapbox://fonts/climatescope/{fontstack}/{range}.pbf",projection:{name:"equalEarth"},layers:[{id:"mapbox-satellite",type:"raster",source:"mapbox://mapbox.satellite",paint:{"raster-opacity":1,"raster-saturation":-.4}},{id:"water",type:"fill",source:"composite","source-layer":"water",layout:{},paint:{"fill-color":"#002d33","fill-outline-color":"#002024"}},{id:"settlement-minor-label",type:"symbol",metadata:{"mapbox:featureComponent":"place-labels","mapbox:group":"Place labels, place-labels"},source:"composite","source-layer":"place_label",minzoom:3,maxzoom:13,filter:["all",["<=",["get","filterrank"],1],["match",["get","class"],"settlement",["match",["get","worldview"],["all","US"],!0,!1],"disputed_settlement",["all",["==",["get","disputed"],"true"],["match",["get","worldview"],["all","US"],!0,!1]],!1],["step",["zoom"],[">",["get","symbolrank"],6],4,[">=",["get","symbolrank"],7],6,[">=",["get","symbolrank"],8],7,[">=",["get","symbolrank"],10],10,[">=",["get","symbolrank"],11],11,[">=",["get","symbolrank"],13],12,[">=",["get","symbolrank"],15]]],layout:{"text-line-height":1.1,"text-size":["interpolate",["cubic-bezier",.2,0,.9,1],["zoom"],3,["step",["get","symbolrank"],12,9,11,10,10.5,12,9.5,14,8.5,16,6.5,17,4],13,["step",["get","symbolrank"],23,9,21,10,19,11,17,12,16,13,15,15,13]],"text-radial-offset":["step",["zoom"],["match",["get","capital"],2,.6,.55],8,0],"icon-image":["step",["zoom"],["case",["==",["get","capital"],2],"border-dot-13",["step",["get","symbolrank"],"dot-11",9,"dot-10",11,"dot-9"]],8,""],"text-font":["IBM Plex Sans SemiBold","Arial Unicode MS Regular"],"text-justify":"auto","text-anchor":["step",["zoom"],["get","text_anchor"],8,"center"],"text-field":["coalesce",["get","name_en"],["get","name"]],"text-max-width":7},paint:{"text-color":"hsl(0, 0%, 95%)","text-halo-color":"hsla(200, 24%, 3%, 0.39)","text-halo-width":1,"text-halo-blur":1}},{id:"settlement-major-label",type:"symbol",metadata:{"mapbox:featureComponent":"place-labels","mapbox:group":"Place labels, place-labels"},source:"composite","source-layer":"place_label",minzoom:3,maxzoom:15,filter:["all",["<=",["get","filterrank"],1],["match",["get","class"],"settlement",["match",["get","worldview"],["all","US"],!0,!1],"disputed_settlement",["all",["==",["get","disputed"],"true"],["match",["get","worldview"],["all","US"],!0,!1]],!1],["step",["zoom"],!1,3,["<=",["get","symbolrank"],6],4,["<",["get","symbolrank"],7],6,["<",["get","symbolrank"],8],7,["<",["get","symbolrank"],10],10,["<",["get","symbolrank"],11],11,["<",["get","symbolrank"],13],12,["<",["get","symbolrank"],15],13,[">=",["get","symbolrank"],11],14,[">=",["get","symbolrank"],15]]],layout:{"text-line-height":1.1,"text-size":["interpolate",["cubic-bezier",.2,0,.9,1],["zoom"],3,["step",["get","symbolrank"],13,6,12],6,["step",["get","symbolrank"],16,6,15,7,14],8,["step",["get","symbolrank"],18,9,17,10,15],15,["step",["get","symbolrank"],23,9,22,10,20,11,18,12,16,13,15,15,13]],"text-radial-offset":["step",["zoom"],["match",["get","capital"],2,.6,.55],8,0],"icon-image":["step",["zoom"],["case",["==",["get","capital"],2],"border-dot-13",["step",["get","symbolrank"],"dot-11",9,"dot-10",11,"dot-9"]],8,""],"text-font":["IBM Plex Sans Bold","Arial Unicode MS Regular"],"text-justify":["step",["zoom"],["match",["get","text_anchor"],["left","bottom-left","top-left"],"left",["right","bottom-right","top-right"],"right","center"],8,"center"],"text-anchor":["step",["zoom"],["get","text_anchor"],8,"center"],"text-field":["coalesce",["get","name_en"],["get","name"]],"text-max-width":7},paint:{"text-color":"hsl(0, 0%, 95%)","text-halo-color":"hsla(200, 24%, 3%, 0.39)","text-halo-width":1,"text-halo-blur":1}}],created:"2021-12-13T14:29:38.150Z",modified:"2021-12-13T14:36:28.314Z",id:"ckx4rve8e4g3h15p5ng8y8tzp",owner:"climatescope",visibility:"private",protected:!1,draft:!1},zoom:m?p[0]-(h[s.toUpperCase()]||0):p[0],interactive:!0,projection:{name:e,center:t,parallels:a},center:{RU:[m?74:78,m?66:58],US:[m?-96:-93,38]}[s.toUpperCase()]||[n,d],localFontFamily:"'IBM Plex Sans', 'system-ui', sans-serif"});return l.current=g,g.once("load",()=>{r(1),l.current.flyTo({zoom:m?p[1]-(h[s.toUpperCase()]||0):p[1],speed:.1})}),()=>{g.remove()}},[s,i]),(0,n.jsx)("div",{ref:o,style:{width:"100%",height:"100%",opacity:a,transition:"opacity 2s"}})};function z(e){var t,a;let{frontmatter:r,data:o,marketCount:i,bbox:s}=e,c=o.score.find(e=>2024==e.year),y=c.sectors.find(e=>"power"===e.id),v=["With a power score of",Math.round(100*y.global.value)/100+",",(t=r.iso,a=r.market,f.includes(t)?"the ".concat(a):a),"ranks number",y.tradebloc.rank,"among",o.tradebloc.name," and number",y.region.rank,"in the ",o.region.name," region"].join(" "),k=o.score.map(e=>e.year),M=g(o.score,e=>e.year);return(0,n.jsxs)(d.xu,{children:[(0,n.jsxs)(x.nU,{children:[(0,n.jsx)(x.vC,{href:"/results",children:"All results"}),(0,n.jsx)(x.xu,{children:"Share"})]}),(0,n.jsxs)(l.M,{columns:8,gridGap:10,children:[(0,n.jsx)(d.xu,{gridColumn:["1 / -1",null,null,"4 / -1"],gridRow:"1",bg:"gray.500",alignSelf:"stretch",h:"90vh",minH:"100%",position:"relative",pointerEvents:"none",sx:{".mapboxgl-ctrl-bottom-right":{position:"absolute",bottom:2,right:2,color:"white",fontSize:"xs",lineHeight:"short",fontWeight:600}},children:(0,n.jsx)(w,{market:{iso:r.iso,region:r.region,bbox:s}})}),(0,n.jsxs)(l.M,{columns:4,gridGap:10,gridColumn:["1 / -1",null,null,"1 / span 4"],gridRow:"1",alignSelf:["end",null,null,"stretch"],pt:[40,null,null,0],position:"relative",children:[(0,n.jsxs)(u.K,{spacing:3,gridColumn:"1 / -2",alignSelf:"start",pt:[5,null,null,40],bg:"white",pr:10,mr:-10,children:[(0,n.jsx)(m.x,{fontSize:"lg",fontWeight:600,lineHeight:"shorter",children:o.region.name}),(0,n.jsx)(p.X,{textStyle:"pageHeading",children:r.market}),(0,n.jsx)(m.x,{textStyle:"pageSubheading",children:v})]}),(0,n.jsxs)(l.M,{columns:2,gridGap:10,bg:"white",gridColumn:"1 / -1",alignSelf:"end",pt:10,mt:-10,pr:10,mr:-10,children:[(0,n.jsxs)(u.K,{spacing:3,children:[(0,n.jsxs)(u.K,{spacing:1,children:[(0,n.jsx)(m.x,{textStyle:"cardButtonHeading",children:"Power score"}),(0,n.jsx)(m.x,{textStyle:"sectionHeading",children:"".concat(Math.round(100*y.global.value)/100,"/5")})]}),(0,n.jsx)(h.M,{bg:"white",aspectRatio:1,children:(0,n.jsx)(b.Z,{data:c.topics.filter(e=>e.id.startsWith("power-")).map(e=>({label:e.name,value:e.global.value}))})})]}),(0,n.jsxs)(u.K,{spacing:3,children:[(0,n.jsxs)(u.K,{spacing:1,children:[(0,n.jsx)(m.x,{textStyle:"cardButtonHeading",children:"Score over time"}),(0,n.jsx)(m.x,{textStyle:"sectionHeading",children:"".concat(k.slice(-1)[0]," - ").concat(k[0])})]}),(0,n.jsx)(h.M,{aspectRatio:1,children:(0,n.jsx)(l.M,{columns:4,gridGap:1,w:"100%",children:M.map(e=>(0,n.jsxs)(l.M,{columns:1,gridGap:0,gridTemplateRows:"repeat(".concat(i,", 0.125rem) 2.5rem"),bg:"gray.50",children:[(0,n.jsx)(d.xu,{bg:"brand.500",gridRow:"".concat(e.global.rank," / span 1"),position:"relative",children:(0,n.jsx)(h.M,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",bg:"brand.500",color:"brand.1000",w:8,h:8,fontWeight:600,borderRadius:"full",border:"0.125rem solid",borderColor:"white",children:e.global.rank})}),(0,n.jsx)(h.M,{gridRow:"-2 / -1",borderTop:"0.125rem solid white",color:"gray.500",fontWeight:600,children:e.year})]},e.year))})})]})]})]})]})]})}var B=!0;function A(e){let{slug:t,source:a,relevantResults:d,capGen:u,etfData:m,investment:p,policies:h,indicators:g,regionalPowerScoreData:x,marketCount:b,electricityPrices:f,bbox:y}=e;return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(i.Z,{title:a.frontmatter.market}),(0,n.jsx)("div",{children:(0,n.jsxs)(o.W,{children:[(0,n.jsx)(z,{frontmatter:a.frontmatter,data:d,marketCount:b,bbox:y}),(0,n.jsx)(s.eQ,{value:{slug:t,frontmatter:a.frontmatter||{},data:{...d,capGen:u,etfData:m,investment:p,policies:h,indicators:g,marketCount:b,regionalPowerScoreData:x,electricityPrices:f}},children:(0,n.jsx)(l.M,{columns:8,gridColumnGap:10,gridRowGap:8,pt:20,pb:40,children:(0,n.jsx)(r.R,{...a,components:c.ZP})})})]})})]})}}},function(e){e.O(0,[634,88,17,443,522,44,888,774,179],function(){return e(e.s=60798)}),_N_E=e.O()}]);