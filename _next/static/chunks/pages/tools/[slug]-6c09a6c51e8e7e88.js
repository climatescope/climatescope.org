(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[969],{87435:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tools/[slug]",function(){return n(62200)}])},18177:function(e,t,n){"use strict";n.d(t,{g:function(){return h},mr:function(){return u},nU:function(){return g},vC:function(){return j},xu:function(){return m}});var r=n(85893),a=n(57747),i=n(22338),s=n(5674),l=n(55281),o=n(34292),c=n(14225),d=n(46693),x=n(5301);function u(e){return(0,r.jsx)(a.xu,{as:"header",children:(0,r.jsx)(i.W,{children:(0,r.jsx)(s.M,{columns:8,gridColumnGap:10,gridRowGap:0,...e})})})}function h(e){return(0,r.jsx)(l.K,{spacing:5,py:10,gridColumn:["1 / -1",null,null,"1 / span 5"],...e})}function g(e){return(0,r.jsx)(o.U,{h:16,spacing:10,justifyContent:"space-between",borderTop:"0.0625rem solid",borderColor:"gray.200",gridColumn:"1 / -1",...e})}function j(e){return(0,r.jsx)(d.ZP,{href:"/",colorScheme:"gray",variant:"ghost",borderRadius:"sm",leftIcon:(0,r.jsx)(x.Y4,{size:"1.25rem"}),pl:3,...e})}function m(e){return(0,r.jsx)(c.z,{colorScheme:"gray",borderRadius:"sm",rightIcon:(0,r.jsx)(x.jN,{size:"1.25rem"}),...e})}},9669:function(e,t,n){"use strict";var r=n(85893),a=n(9008),i=n(11163),s=n(67294),l=n(62520);let o="https://global-climatescope.org/";t.Z=e=>{let{title:t="",description:n="Discover the most attractive markets for energy transition investment.",cover:c="cover-lg.jpg",type:d="website",lang:x="en"}=e,{basePath:u,asPath:h}=(0,i.useRouter)(),g=(0,l.parse)(c||""),j=["-sm","-md","-lg"].includes(g.name.slice(-3))?c:g.name+"-lg"+g.ext,m=o+u+("/"===h[0]?h.slice(1):h),p=j?o+u+"images/"+j:"",f=t?"Climatescope ".concat(2024," | ").concat(t):"Climatescope ".concat(2024);return(0,s.useEffect)(()=>{document.documentElement.setAttribute("lang",x)},[x]),(0,r.jsxs)(a,{children:[(0,r.jsx)("meta",{content:x,httpEquiv:"Content-Language"}),(0,r.jsx)("title",{children:f}),(0,r.jsx)("meta",{name:"description",content:n}),(0,r.jsx)("meta",{property:"og:type",content:d}),(0,r.jsx)("meta",{property:"og:url",content:m}),(0,r.jsx)("meta",{property:"og:title",content:f}),(0,r.jsx)("meta",{property:"og:description",content:n}),c&&(0,r.jsx)("meta",{name:"image",property:"og:image",content:p}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,r.jsx)("meta",{name:"twitter:url",content:m}),(0,r.jsx)("meta",{name:"twitter:title",content:f}),(0,r.jsx)("meta",{name:"twitter:description",content:n}),c&&(0,r.jsx)("meta",{name:"twitter:image",content:p}),(0,r.jsx)("link",{rel:"canonical",href:m}),"\\",(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]})}},62200:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return T},default:function(){return K}});var r=n(85893),a=n(57747),i=n(22757),s=n(71293),l=n(18177),o=n(9669),c=n(67294),d=n(48940),x=n(55281),u=n(22338),h=n(34292),g=n(66712),j=n(91170),m=n(14225),p=n(4040),f=n(1991),v=n(88667),y=n(32568),b=n(49289),_=n(9089),k=n(9443),w=n(14177),C=n(13114),M=n(57584),S=n(48204),E=n(89734),W=n(20213);let z=[{val:"",label:"All regions"},{val:"emea",label:"Europe"},{val:"mena",label:"Middle-East"},{val:"apac",label:"Asia-Pacific"},{val:"ssa",label:"Africa"},{val:"latam",label:"Latin America"}];function U(){let{colors:e}=(0,d.F)(),t=e.regions,n=e.gray[500],[i,l]=(0,c.useState)("2024"),[o,U]=(0,c.useState)(z[0]),[A,F]=(0,c.useState)([]),I=[2021,2022,2023,2024],N=I.indexOf(parseInt(i)),Z=A.filter(e=>{var t,n;let r=!o.val||e.region_id===o.val,a=(null===(t=e.data[N])||void 0===t?void 0:t.y_val)&&(null===(n=e.data[N])||void 0===n?void 0:n.x_val);return r&&a});(0,c.useEffect)(()=>{(0,W.Z)("/data/ets-data.txt","json").then(e=>{F(e.filter(e=>"cn"!==e.iso))})},[]);let R=A.flatMap(e=>e.data.map(e=>e.x_val||0)),B=A.flatMap(e=>e.data.map(e=>e.r_val||0)),T=(0,_.Z)(R),K=(0,_.Z)(B),O=(0,k.Z)().domain([0,5]).range([360,40]),P=(0,w._b)().domain([0,T[1]]).range([40,760]),G=(0,w._b)().domain([0,1e-7,K[1]]).range([0,2,40]);return(0,r.jsx)(x.K,{children:(0,r.jsxs)(u.W,{children:[(0,r.jsxs)(h.U,{spacing:3,borderY:"0.0625rem solid",borderColor:"gray.200",py:3,children:[(0,r.jsx)(a.xu,{flex:1,color:"gray.500",fontWeight:600,children:"Filters"}),(0,r.jsxs)(g.v,{children:[(0,r.jsx)(j.j,{as:m.z,colorScheme:"gray",rightIcon:(0,r.jsx)(S.v,{boxSize:6}),pr:3,children:i}),(0,r.jsx)(p.q,{children:(0,r.jsx)(f._,{type:"radio",value:"".concat(i),onChange:e=>{l(e)},children:I.map(e=>(0,r.jsx)(v.i,{value:"".concat(e),children:e},e))})})]}),(0,r.jsxs)(g.v,{children:[(0,r.jsx)(j.j,{as:m.z,colorScheme:"gray",rightIcon:(0,r.jsx)(S.v,{boxSize:6}),pr:3,children:o.label}),(0,r.jsx)(p.q,{children:(0,r.jsx)(f._,{type:"radio",value:"".concat(o.val),onChange:e=>{U(z.find(t=>t.val===e))},children:z.map(e=>(0,r.jsx)(v.i,{value:"".concat(e.val),children:e.label},e.val))})})]})]}),(0,r.jsx)(a.xu,{py:10,children:(0,r.jsxs)("svg",{viewBox:"0 0 ".concat(800," ").concat(400),children:[(0,r.jsxs)("g",{stroke:e.gray[200],strokeWidth:.5,children:[(0,r.jsx)("line",{vectorEffect:"non-scaling-stroke",x1:80,x2:720,y1:200,y2:200}),(0,r.jsx)("line",{vectorEffect:"non-scaling-stroke",x1:400,x2:400,y1:24,y2:376})]}),(0,r.jsxs)("g",{fontSize:8,fontWeight:600,fill:e.gray[500],children:[(0,r.jsxs)("g",{transform:"translate(".concat(400," 10)"),children:[(0,r.jsx)("line",{x1:0,x2:0,y1:-4,y2:-10,stroke:e.gray[200]}),(0,r.jsx)("text",{textAnchor:"middle",alignmentBaseline:"hanging",y:1,children:"Stronger enabling environment"})]}),(0,r.jsxs)("g",{transform:"translate(".concat(400," ").concat(390,")"),children:[(0,r.jsx)("line",{x1:0,x2:0,y1:4,y2:10,stroke:e.gray[200]}),(0,r.jsx)("text",{textAnchor:"middle",alignmentBaseline:"baseline",y:-1,children:"Weaker enabling environment"})]}),(0,r.jsxs)("g",{transform:"translate(10 ".concat(200,")"),children:[(0,r.jsx)("line",{x1:-4,x2:-10,y1:0,y2:0,stroke:e.gray[200]}),(0,r.jsx)("text",{textAnchor:"start",alignmentBaseline:"central",children:"Less experience"})]}),(0,r.jsxs)("g",{transform:"translate(".concat(790," ").concat(200,")"),children:[(0,r.jsx)("line",{x1:4,x2:10,y1:0,y2:0,stroke:e.gray[200]}),(0,r.jsx)("text",{textAnchor:"end",alignmentBaseline:"central",children:"More experience"})]})]}),(0,r.jsx)("g",{opacity:.8,children:(0,r.jsx)(C.M,{children:E(Z,e=>{var t;return-(null===(t=e.data[N])||void 0===t?void 0:t.r_val)||0}).map(e=>{let i=e.data[N];if(!i.x_val||!i.y_val)return null;let s=P(i.x_val)||0,l=O(i.y_val)||0,o=G(i.r_val)||0,c=s/2e3;return(0,r.jsx)(y.u,{label:(0,r.jsxs)(x.K,{spacing:2,p:3,children:[(0,r.jsx)(a.xu,{fontWeight:600,children:e.name}),(0,r.jsx)(b.i,{borderColor:"gray.500"}),(0,r.jsxs)(x.K,{spacing:0,children:[(0,r.jsxs)(h.U,{spacing:5,justifyContent:"space-between",children:[(0,r.jsx)(a.xu,{children:"Investment (".concat(i.x_unit,"):")}),(0,r.jsx)(a.xu,{fontWeight:600,children:Math.round(100*i.x_val)/100})]}),(0,r.jsxs)(h.U,{spacing:2,justifyContent:"space-between",children:[(0,r.jsxs)(a.xu,{children:[i.y_unit,":"]}),(0,r.jsx)(a.xu,{fontWeight:600,children:Math.round(100*i.y_val)/100})]}),(0,r.jsxs)(h.U,{spacing:2,justifyContent:"space-between",children:[(0,r.jsxs)(a.xu,{children:["Renewables capacity (".concat(i.r_unit,")"),":"]}),(0,r.jsx)(a.xu,{fontWeight:600,children:Math.round(100*i.r_val)/100})]})]})]}),hasArrow:!0,placement:"top",children:(0,r.jsx)(M.E.circle,{cx:s,cy:l,r:o,fill:t[e.region_id]||n,stroke:"#FFF",strokeWidth:2,paintOrder:"stroke fill",initial:{cx:s,cy:l,r:0},animate:{cx:s,cy:l,r:o},exit:{cx:s,cy:l,r:0},transition:{duration:.6,bounce:0,type:"spring",delay:c}},e.iso+"-motion")},e.iso)})})})]})}),(0,r.jsx)(h.U,{spacing:5,mb:5,borderY:"0.0625rem solid",borderColor:"gray.200",py:5,children:z.slice(1).map(t=>(0,r.jsxs)(h.U,{spacing:3,children:[(0,r.jsx)(a.xu,{w:5,h:5,borderRadius:"full",style:{opacity:.8,background:e.regions[t.val]||e.gray[500]}}),(0,r.jsx)(a.xu,{fontWeight:600,children:t.label},t.val)]},t.val))}),(0,r.jsx)(s.x,{mb:20,color:"gray.500",children:"Please note that the investment data presented in each year reflects investment trends from the five preceding years, not the year itself, and the capacity data presented in the 2024 filter reflects total renewables capacity by prior year-end."})]})})}var A=n(31993),F=n(5674),I=n(27239);let N=(0,A.U)((e,t)=>({highlightedMarket:"",selectedMarket:"",setHighlightedMarket:t=>{e({highlightedMarket:t})},setSelectedMarket:t=>{e({selectedMarket:t})}})),Z=[2021,2022,2023,2024];function R(e){let{data:t}=e,n=Z.map(e=>{let n=E(t.reduce((t,n)=>{var r;let a=null===(r=n.score)||void 0===r?void 0:r.find(t=>parseInt(t.year)===parseInt(e));return a&&t.push({...n,relevantData:a}),t},[]),e=>parseFloat(e.relevantData.global.rank)||0);return{year:e,items:n}});return(0,r.jsx)(u.W,{children:(0,r.jsx)(F.M,{columns:4,gridGap:10,pb:20,borderTop:"0.0625rem solid",borderColor:"gray.200",children:n.map(e=>(0,r.jsxs)(x.K,{spacing:3,pt:3,children:[(0,r.jsx)(I.M,{fontWeight:600,children:e.year}),(0,r.jsx)(b.i,{}),e.items.map(e=>(0,r.jsx)(B,{item:e},e.iso))]},e.year))})})}let B=(0,c.memo)(e=>{let{item:t}=e,n=N(e=>e.highlightedMarket),i=N(e=>e.selectedMarket),s=N(e=>e.setHighlightedMarket),l=N(e=>e.setSelectedMarket),{colors:o}=(0,d.F)(),c=n===t.iso,x=i===t.iso;return(0,r.jsxs)(h.U,{fontSize:"sm",fontWeight:600,pr:2,spacing:2,h:8,cursor:"pointer",onMouseEnter:()=>{s(t.iso)},onMouseLeave:()=>{s("")},onClick:()=>{l(t.iso)},userSelect:"none",style:{background:x?o.brand[500]:c?o.gray[200]:o.gray[100]},children:[(0,r.jsx)(I.M,{w:8,h:8,borderRight:"0.0625rem solid",borderColor:"white",children:t.relevantData.global.rank}),(0,r.jsx)(a.xu,{children:t.market})]})});var T=!0;function K(e){let{source:t,data:n}=e,{frontmatter:c}=t,d=c.slug.split("/").slice(-1)[0];return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o.Z,{title:c.title,description:c.description}),(0,r.jsxs)(a.xu,{minH:"100vh",children:[(0,r.jsxs)(l.mr,{children:[(0,r.jsxs)(l.nU,{children:[(0,r.jsx)(l.vC,{href:"/tools",children:"Tools"}),(0,r.jsx)(l.xu,{children:"Share"})]}),(0,r.jsxs)(l.g,{children:[(0,r.jsx)(i.X,{fontSize:"5xl",children:c.title}),(0,r.jsx)(s.x,{fontSize:"2xl",color:"gray.500",children:c.description})]})]}),"progress-tracker-fundamentals-investments"===d&&(0,r.jsx)(U,{}),"rank-over-time"===d&&(0,r.jsx)(R,{data:n})]})]})}},20213:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(57453),a=n(21876).Buffer;async function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"json";return await fetch(e).then(e=>{if(!e.ok)throw Error(e.statusText);return e.text()}).then(e=>{var n;let i=(n=e.split("").reverse().join(""),a.from(n,"base64").toString());return"csv"===t?(0,r.ue)(i):JSON.parse(i)}).catch(()=>[])}}},function(e){e.O(0,[88,17,443,597,803,888,774,179],function(){return e(e.s=87435)}),_N_E=e.O()}]);