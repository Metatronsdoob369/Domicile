;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="61645f57-3df7-8497-d323-db3c25b64a3c")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,167892,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(843778);let r="mx-auto w-full max-w-[1200px]",i="px-4 @lg:px-6 @xl:px-10",o=(0,s.forwardRef)(({className:e,bottomPadding:s,size:r="default",...o},n)=>(0,t.jsx)("div",{ref:n,...o,className:(0,a.cn)("mx-auto w-full @container",{small:"max-w-[768px]",default:"max-w-[1200px]",large:"max-w-[1600px]",full:"max-w-none"}[r],i,s&&"pb-16",e)})),n=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("header",{...s,ref:r,className:(0,a.cn)("w-full","flex-col gap-3 py-6",e)})),l=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("h1",{ref:r,...s,className:(0,a.cn)(e)})),c=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("p",{ref:r,...s,className:(0,a.cn)("text-sm text-foreground-light",e)})),u=(0,s.forwardRef)(({className:e,isFullWidth:s,topPadding:r,...i},o)=>(0,t.jsx)("div",{ref:o,...i,className:(0,a.cn)("flex flex-col first:pt-12 py-6",s?"w-full":"gap-3 @md:grid-cols-12 @lg:grid",e)})),d=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("div",{ref:r,...s,className:(0,a.cn)("w-full h-px bg-border shrink-0",e)})),m=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("h3",{ref:r,...s,className:(0,a.cn)("text-foreground text-xl",e)})),p=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("p",{ref:r,...s,className:(0,a.cn)("text-sm text-foreground-light",e)})),f=(0,s.forwardRef)(({className:e,children:s,title:r,...i},o)=>(0,t.jsxs)("div",{ref:o,...i,className:(0,a.cn)("col-span-4 xl:col-span-5 prose text-sm",e),children:[r&&(0,t.jsx)("h2",{children:r}),s]})),h=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("div",{ref:r,...s,className:(0,a.cn)("col-span-8 xl:col-span-7","flex flex-col gap-6",e)})),g=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("div",{ref:r,...s,className:(0,a.cn)("flex flex-col gap-3 items-center",e)})),_=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("div",{ref:r,...s,className:(0,a.cn)("flex w-full items-center",e)})),y=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("div",{ref:r,...s,className:(0,a.cn)("flex flex-row gap-3",e)})),b=(0,s.forwardRef)(({className:e,...s},r)=>(0,t.jsx)("div",{ref:r,...s,className:(0,a.cn)("flex flex-col gap-3","min-w-[420px]",e)})),x=(0,s.forwardRef)(({className:e,...s},o)=>(0,t.jsx)("div",{ref:o,...s,className:(0,a.cn)(r,i,"my-8 flex flex-col gap-8",e)}));n.displayName="ScaffoldHeader",l.displayName="ScaffoldTitle",c.displayName="ScaffoldDescription",o.displayName="ScaffoldContainer",d.displayName="ScaffoldDivider",u.displayName="ScaffoldSection",b.displayName="ScaffoldColumn",f.displayName="ScaffoldSectionDetail",h.displayName="ScaffoldSectionContent",g.displayName="ScaffoldFilterAndContent",_.displayName="ScaffoldActionsContainer",y.displayName="ScaffoldActionsGroup",x.displayName="ScaffoldContainerLegacy",m.displayName="ScaffoldSectionTitle",p.displayName="ScaffoldSectionDescription",e.s(["MAX_WIDTH_CLASSES",0,r,"PADDING_CLASSES",0,i,"ScaffoldActionsContainer",0,_,"ScaffoldActionsGroup",0,y,"ScaffoldColumn",0,b,"ScaffoldContainer",0,o,"ScaffoldContainerLegacy",0,x,"ScaffoldDescription",0,c,"ScaffoldDivider",0,d,"ScaffoldFilterAndContent",0,g,"ScaffoldHeader",0,n,"ScaffoldSection",0,u,"ScaffoldSectionContent",0,h,"ScaffoldSectionDescription",0,p,"ScaffoldSectionDetail",0,f,"ScaffoldSectionTitle",0,m,"ScaffoldTitle",0,l])},14703,e=>{"use strict";var t=e.i(242882),s=e.i(356003),a=e.i(234745),r=e.i(10429),i=e.i(389959),o=e.i(294285);async function n({projectRef:e},t){if(!e)throw Error("projectRef is required");let{data:s,error:r}=await (0,a.get)("/platform/auth/{ref}/config",{params:{path:{ref:e}},signal:t});return r&&(0,a.handleError)(r),s}e.s(["getProjectAuthConfig",()=>n,"useAuthConfigPrefetch",0,({projectRef:e})=>{let t=(0,s.useQueryClient)();return(0,i.useCallback)(()=>{e&&t.prefetchQuery({queryKey:o.authKeys.authConfig(e),queryFn:({signal:t})=>n({projectRef:e},t)})},[t,e])},"useAuthConfigQuery",0,({projectRef:e},{enabled:s=!0,...a}={})=>(0,t.useQuery)({queryKey:o.authKeys.authConfig(e),queryFn:({signal:t})=>n({projectRef:e},t),enabled:s&&r.IS_PLATFORM&&void 0!==e,...a})])},848616,(e,t,s)=>{var a=e.r(730007);t.exports=function(e){return(null==e?0:e.length)?a(e,1):[]}},984427,e=>{"use strict";var t=e.i(478902),s=e.i(172650),a=e.i(848616),r=e.i(389959),i=e.i(753515),o=e.i(440401),n=e.i(701823),l=e.i(938933),c=e.i(843778),u=e.i(140449);let d=(0,r.createContext)({onChange:e=>{},selected:void 0});var m=e.i(370410);function p({children:e,className:m,buttonClassName:p,descriptionText:f,error:h,icon:g,id:_="",name:y="",label:b,labelOptional:x,layout:v,value:S,onChange:j,onFocus:A,onBlur:E,style:k,size:C="medium",defaultValue:N,validation:T,disabled:w,optionsWidth:I}){let[R,q]=(0,r.useState)(void 0),[P,O]=(0,r.useState)({}),L=(0,l.default)("listbox"),$=(0,r.useRef)(null),{formContextOnChange:D,values:M,errors:F,handleBlur:U,touched:H,fieldLevelValidation:B}=(0,u.useFormContext)();M&&!S&&(S=M[_||y],N=M[_||y]),h||(F&&!h&&(h=F[_||y]),h=H&&H[_||y]?h:void 0),(0,r.useEffect)(()=>{void 0!==S&&q(S)},[S]),(0,r.useEffect)(()=>{function e(){document.documentElement.style.setProperty("--width-listbox",`${I||$.current?.offsetWidth}px`)}return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),(0,r.useEffect)(()=>{let t=(0,a.default)(e);function s(e){return t.find(t=>t.props.value===e)}if(S){q(S);let e=s(S);O(e?.props?e.props:void 0);return}if(R){let e=s(R);O(e?.props?e.props:void 0);return}if(!N)return void O(t[0]?.props);{q(N);let e=s(R);O(e?.props?e.props:void 0);return}},[R]);let G=[L.container,L.base,p],z=[L.addOnBefore];return h&&G.push(L.variants.error),h||G.push(L.variants.standard),g&&z.push(L.with_icon[C]),C&&G.push(L.size[C]),w&&G.push(L.disabled),(0,t.jsx)(i.FormLayout,{label:b,labelOptional:x,layout:v,id:_,error:h,descriptionText:f,className:m,style:k,size:C,children:(0,t.jsxs)(s.Root,{children:[(0,t.jsx)(s.Trigger,{asChild:!0,disabled:w,children:(0,t.jsxs)("button",{"data-size":C,ref:$,className:(0,c.cn)(G),onBlur:function(e){U&&U(e),E&&E(e)},onFocus:A,name:y,id:_,children:[(0,t.jsxs)("span",{className:(0,c.cn)(z),children:[g&&(0,t.jsx)(n.default,{size:C,icon:g}),P?.addOnBefore&&(0,t.jsx)(P.addOnBefore,{}),(0,t.jsx)("span",{className:L.label,children:P?.label})]}),(0,t.jsx)("span",{className:L.chevron_container,children:(0,t.jsx)("svg",{className:L.chevron,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",children:(0,t.jsx)("path",{fillRule:"evenodd",d:"M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"})})}),h&&(0,t.jsx)("div",{className:L.actions_container,children:h&&(0,t.jsx)(o.default,{size:C})})]})}),(0,t.jsx)(s.Content,{sideOffset:6,loop:!0,side:"bottom",align:"center",className:L.options_container,children:(0,t.jsx)("div",{children:(0,t.jsx)(d.Provider,{value:{onChange:function(e){j&&j(e),q(e);let t={};t.target={type:"select",name:y,id:_,value:e,checked:void 0},D&&D(t),T&&B(_,T(e))},selected:R},children:e})})})]})})}p.Option=function({id:e,value:a,label:r,disabled:i=!1,children:o,className:n="",addOnBefore:u}){let p=(0,l.default)("listbox");return(0,t.jsx)(d.Consumer,{children:({onChange:r,selected:l})=>{let d=l===a;return(0,t.jsxs)(s.Item,{className:(0,c.cn)(p.option,d?p.option_active:" ",i?p.option_disabled:" ",n),onSelect:()=>i?{}:r(a),children:[(0,t.jsxs)("div",{className:p.option_inner,children:[u&&u({active:d,selected:l}),(0,t.jsx)("span",{children:"function"==typeof o?o({active:d,selected:l}):o})]}),d?(0,t.jsx)("span",{className:(0,c.cn)(p.option_check,d?p.option_check_active:""),children:(0,t.jsx)(m.Check,{className:p.option_check_icon,"aria-hidden":"true"})}):null]},e)}})},e.s(["default",0,p],984427)},331077,e=>{"use strict";var t=e.i(984427);e.s(["Listbox",()=>t.default])},102703,e=>{"use strict";var t=e.i(478902),s=e.i(17203),a=e.i(180148),r=e.i(699879),i=e.i(215261),o=e.i(389959),n=e.i(837710);let l=(0,o.forwardRef)(({icon:e,title:l,description:c,url:u,urlLabel:d="Read more",defaultVisibility:m=!1,hideCollapse:p=!1,button:f,className:h="",block:g=!1},_)=>{let[y,b]=(0,o.useState)(m);return(0,t.jsx)("div",{ref:_,role:"alert",className:`${g?"block w-full":""}
      block w-full rounded-md border bg-surface-300/25 py-3 ${h}`,children:(0,t.jsxs)("div",{className:"flex flex-col px-4",children:[(0,t.jsxs)("div",{className:"flex items-center justify-between",children:[(0,t.jsxs)("div",{className:"flex w-full space-x-3 items-center",children:[e&&(0,t.jsx)("span",{className:"text-foreground-lighter",children:e}),(0,t.jsx)("div",{className:"flex-grow",children:(0,t.jsx)("h5",{className:"text-foreground",children:l})})]}),c&&!p?(0,t.jsx)("div",{className:"cursor-pointer text-foreground-lighter",onClick:()=>b(!y),children:y?(0,t.jsx)(r.Minimize2,{size:14,strokeWidth:1.5}):(0,t.jsx)(a.Maximize2,{size:14,strokeWidth:1.5})}):null]}),(c||u||f)&&(0,t.jsxs)("div",{className:`flex flex-col space-y-3 overflow-hidden transition-all ${y?"mt-3":""}`,style:{maxHeight:500*!!y},children:[(0,t.jsx)("div",{className:"text-foreground-light text-sm",children:c}),u&&(0,t.jsx)("div",{children:(0,t.jsx)(n.Button,{asChild:!0,type:"default",icon:(0,t.jsx)(s.ExternalLink,{}),children:(0,t.jsx)(i.default,{href:u,target:"_blank",rel:"noreferrer",children:d})})}),f&&(0,t.jsx)("div",{children:f})]})]})})});l.displayName="InformationBox",e.s(["default",0,l])},25123,e=>{"use strict";var t=e.i(265735);function s(){let{data:e}=(0,t.useSelectedOrganizationQuery)();return e?{plan:e?.plan,usageBillingEnabled:e?.usage_billing_enabled,isLoading:!1,isSuccess:!0}:{plan:null,usageBillingEnabled:null,isLoading:!0,isSuccess:!1}}e.s(["useCurrentOrgPlan",()=>s])},330287,e=>{"use strict";var t=e.i(242882),s=e.i(234745),a=e.i(10429),r=e.i(346691);async function i({projectRef:e},t){if(!e)throw Error("Project ref is required");let{data:a,error:r}=await (0,s.get)("/platform/projects/{ref}/load-balancers",{params:{path:{ref:e}},signal:t});return r&&(0,s.handleError)(r),a}e.s(["useLoadBalancersQuery",0,({projectRef:e},{enabled:s=!0,...o}={})=>(0,t.useQuery)({queryKey:r.replicaKeys.loadBalancers(e),queryFn:({signal:t})=>i({projectRef:e},t),enabled:s&&void 0!==e&&a.IS_PLATFORM,...o})])},388034,e=>{"use strict";let t=(0,e.i(388019).default)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["default",()=>t])},61187,e=>{"use strict";var t=e.i(388034);e.s(["RefreshCw",()=>t.default])},460988,e=>{"use strict";var t=e.i(156054),s=e.i(55956),a=e.i(807162),r=e.i(228598),i=e.i(389959);e.i(128328);var o=e.i(86086),n=e.i(884892),l=e.i(857054),c=e.i(993394);let u=e=>s.default.utc(Number(e)/1e3).toISOString(),d=e=>{let t=16===String(e).length;return!Number.isNaN(Number(e))&&t},m=(e,t)=>Object.keys(e).filter(t=>e[t]).flatMap(s=>{let a=t?`${t}.${s}`:s;return"object"==typeof e[s]?m(e[s],a):[a]}),p=(e,t)=>{let s=Object.keys(t),r=c.SQL_FILTER_TEMPLATES[e],i=e=>{let s=r[e],i=(0,a.default)(t,e);if(void 0!==i&&"function"==typeof s)return s(i);if(void 0===s)if("string"==typeof i)return`${e} = '${i}'`;else return`${e} = ${i}`;return void 0===i&&"function"==typeof s?null:s&&!1===i?null:s},o=s.map(e=>{if(void 0===t[e]||"string"==typeof t[e]&&0===t[e].length)return null;if("object"==typeof t[e]){let s=m(t[e],e).map(i).filter(Boolean);return s.length>0?`(${s.join(" or ")})`:null}{let t=i(e);return null===t?null:`(${t})`}}).filter(Boolean).join(" and ");return o?"where "+o:""},f=e=>{switch(e){case"edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.request) as request
  cross join unnest(m.response) as response`;case"pg_cron_logs":case"postgres_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.parsed) as parsed`;case"function_logs":case"auth_logs":return"cross join unnest(metadata) as metadata";case"function_edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.response) as response
  cross join unnest(m.request) as request`;case"supavisor_logs":return"cross join unnest(metadata) as m";default:return""}},h=o.IS_PLATFORM?"where ( parsed.application_name = 'pg_cron' or regexp_contains(event_message, 'cron job') )":"where ( parsed.application_name = 'pg_cron' or event_message::text LIKE '%cron job%' )",g=e=>{let t=e.reduce((e,t)=>{let s=_(t);return e[s]+=1,e},{second:0,minute:0,hour:0,day:0});return Object.keys(t).reduce((e,s)=>t[e]>t[s]?e:s)},_=e=>({0:"second",1:"minute",2:"hour",3:"day"})[["second","minute","hour"].map(t=>e.get(t)).reduce((e,t)=>(0===t&&(e+=1),e),0)];function y(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(WITH)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function b(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(ILIKE)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function x(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.apikey?.[0];if(!t)return;if(t.invalid)return"<invalid>";let s=t?.payload?.[0];return s&&"HS256"===s.algorithm&&"supabase"===s.issuer&&["anon","service_role"].includes(s.role)&&!s.subject?s.role:"<unrecognized>"}function v(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.apikey?.[0]?.apikey?.[0];if(t)return t.error?`${t.prefix}... <invalid: ${t.error}>`:`${t.prefix}...`}function S(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.authorization?.[0];if(!t||t.invalid)return;let s=t?.payload?.[0];if(s&&s.role)return s.role}e.s(["apiKey",()=>v,"checkForILIKEClause",()=>b,"checkForWithClause",()=>y,"fillTimeseries",0,(e,t,a,r,i,o,n=20,l)=>{let c;if(0===e.length&&!(i&&o))return[];if(e.length>n)return e.map(e=>{let a=e[t],r=d(a)?u(a):s.default.utc(a).toISOString();return e[t]=r,e});if(e.length<=1&&!(i&&o))return e;let m=e.map(e=>s.default.utc(e[t])),p=o?s.default.utc(o):s.default.utc(Math.max.apply(null,m)),f=i?s.default.utc(i):s.default.utc(Math.min.apply(null,m)),h=e.length>0?m:[f,p],_=1;if(l){let e=l.match(/^(\d+)(m|h|d|s)$/);e?(_=parseInt(e[1],10),c=({s:"second",m:"minute",h:"hour",d:"day"})[e[2]]):c=g(h)}else c=g(h);0!==e.length||l||(c="minute");let y=e.map(e=>{let r=e[t],i=d(r)?u(r):s.default.utc(r).toISOString();return Array.isArray(a)&&0===a.length?{[t]:i}:(e[t]=i,e)}),b=f;for(;b.isBefore(p)||b.isSame(p);){if(!m.find(e=>e.year()===b.year()&&e.month()===b.month()&&e.date()===b.date()&&e.hour()===b.hour()&&e.minute()===b.minute()&&e.second()===b.second())){let e=("string"==typeof a?[a]:a).reduce((e,t)=>({...e,[t]:r}),{});y.push({[t]:b.toISOString(),...e})}b=b.add(_,c)}return y},"genChartQuery",0,(e,t,a)=>{let r,i,o,n,l,u,[d,m]=(r=t.iso_timestamp_end?(0,s.default)(t.iso_timestamp_end):(0,s.default)(),i=t.iso_timestamp_start?(0,s.default)(t.iso_timestamp_start):(0,s.default)(),o="minute",n=360,l=r.diff(i,"minute"),u=r.diff(i,"hour"),l>720?(o="hour",n=120):u>72&&(o="day",n=7),[i.add(-n,o),o]),g=p(e,a),_=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 500";case"postgres_logs":case"pg_cron_logs":return"parsed.error_severity IN ('ERROR', 'FATAL', 'PANIC')";case"auth_logs":return"metadata.level = 'error' OR SAFE_CAST(metadata.status AS INT64) >= 400";case"function_logs":return"metadata.level IN ('error', 'fatal')";default:return"false"}}(e),y=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 400 AND response.status_code < 500";case"postgres_logs":return"parsed.error_severity IN ('WARNING')";case"auth_logs":return"metadata.level = 'warning'";case"function_logs":return"metadata.level IN ('warning')";default:return"false"}}(e);e===c.LogsTableName.PG_CRON&&(e=c.LogsTableName.POSTGRES,g=h);let b=f(e);return`
SELECT
-- log-event-chart
  timestamp_trunc(t.timestamp, ${m}) as timestamp,
  count(CASE WHEN NOT (${_} OR ${y}) THEN 1 END) as ok_count,
  count(CASE WHEN ${_} THEN 1 END) as error_count,
  count(CASE WHEN ${y} THEN 1 END) as warning_count,
FROM
  ${e} t
  ${b}
  ${g?g+` and t.timestamp > '${d.toISOString()}'`:`where t.timestamp > '${d.toISOString()}'`}
GROUP BY
timestamp
ORDER BY
  timestamp ASC
  `},"genCountQuery",0,(e,t)=>{let s=p(e,t);e===c.LogsTableName.PG_CRON&&(e=c.LogsTableName.POSTGRES,s=h);let a=f(e);return`SELECT count(*) as count FROM ${e} ${a} ${s}`},"genDefaultQuery",0,(e,t,s=100)=>{let a=p(e,t),r=f(e),i="order by timestamp desc";switch(e){case"edge_logs":if(!o.IS_PLATFORM)return`
-- local dev edge_logs query
select id, edge_logs.timestamp, event_message, request.method, request.path, request.search, response.status_code
from edge_logs
${r}
${a}
${i}
limit ${s};
`;return`select id, identifier, timestamp, event_message, request.method, request.path, request.search, response.status_code
  from ${e}
  ${r}
  ${a}
  ${i}
  limit ${s}
  `;case"postgres_logs":if(!o.IS_PLATFORM)return`
select postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint
from postgres_logs
${r}
${a}
${i}
limit ${s}
  `;return`select identifier, postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint from ${e}
  ${r}
  ${a}
  ${i}
  limit ${s}
  `;case"function_logs":return`select id, ${e}.timestamp, event_message, metadata.event_type, metadata.function_id, metadata.level from ${e}
  ${r}
  ${a}
  ${i}
  limit ${s}
    `;case"auth_logs":return`select id, ${e}.timestamp, event_message, metadata.level, metadata.status, metadata.path, metadata.msg as msg, metadata.error from ${e}
  ${r}
  ${a}
  ${i}
  limit ${s}
    `;case"function_edge_logs":if(!o.IS_PLATFORM)return`
select id, function_edge_logs.timestamp, event_message
from function_edge_logs
${i}
limit ${s}
`;return`select id, ${e}.timestamp, event_message, response.status_code, request.method, m.function_id, m.execution_time_ms, m.deployment_id, m.version from ${e}
  ${r}
  ${a}
  ${i}
  limit ${s}
  `;case"supavisor_logs":return`select id, ${e}.timestamp, event_message from ${e} ${r} ${a} ${i} limit ${s}`;case"pg_upgrade_logs":return`select id, ${e}.timestamp, event_message from ${e} ${r} ${a} ${i} limit 100`;default:return`select id, ${e}.timestamp, event_message from ${e}
  ${a}
  ${i}
  limit ${s}
  `;case"pg_cron_logs":let n=a?`${h} AND ${a.substring(6)}`:h;return`select id, postgres_logs.timestamp, event_message, parsed.error_severity, parsed.query
from postgres_logs
${r}
${n}
${i}
limit ${s}
`}},"genSingleLogQuery",0,(e,t)=>`select id, timestamp, event_message, metadata from ${e} where id = '${t}' limit 1`,"isDefaultLogPreviewFormat",0,e=>e&&e.timestamp&&e.event_message&&e.id,"isUnixMicro",0,d,"jwtAPIKey",()=>x,"maybeShowUpgradePrompt",0,(e,t)=>{let a=Math.abs((0,s.default)().diff((0,s.default)(e),"day"));return a>1&&"free"===t||a>7&&"pro"===t||a>28&&"team"===t||a>90&&"enterprise"===t},"maybeShowUpgradePromptIfNotEntitled",0,(e,t)=>!!t&&Math.abs((0,s.default)().diff((0,s.default)(e),"day"))>t,"role",()=>S,"unixMicroToIsoTimestamp",0,u,"useEditorHints",0,()=>{let e=(0,t.useMonaco)();(0,i.useEffect)(()=>{if(e){let t=e.languages.registerCompletionItemProvider("pgsql",{triggerCharacters:["`"," ","."],provideCompletionItems:function(t,s,a){let i=new n.default(t,s.column-2,s.lineNumber-1);if(i.isNextDQuote())return{suggestions:[]};let o=[],c=l.default.schemas.filter(e=>i._text.includes(e.reference));if(0===c.length&&(c=l.default.schemas),i.isNextPeriod()){let t=c.flatMap(e=>e.fields).flatMap(e=>{let[t,...s]=e.path.split(".");return s}).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));o=o.concat(t)}if("`"===a.triggerCharacter||" "===a.triggerCharacter){let t=l.default.schemas.map(t=>({label:t.reference,kind:e.languages.CompletionItemKind.Class,insertText:t.reference})),s=c.flatMap(e=>e.fields).flatMap(e=>e.path.split(".").slice(0,-1)).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));o=(o=o.concat(s)).concat(t)}return{suggestions:(0,r.default)(o,"label")}}});return()=>{t.dispose()}}},[e])}])},993394,e=>{"use strict";var t,s=e.i(55956),a=e.i(10429);e.i(128328);var r=e.i(86086);let i=`${a.DOCS_URL}/guides/platform/logs#querying-with-the-logs-explorer`,o=[{label:"Recent Errors",mode:"simple",searchString:"[Ee]rror|\\s[45][0-9][0-9]\\s",for:["api"]},{label:"Commits",mode:"simple",searchString:"COMMIT",for:["database"]},{label:"Commits By User",description:"Count of commits made by users on the database",mode:"custom",searchString:`select
  p.user_name,
  count(*) as count
from postgres_logs
  left join unnest(metadata) as m on true
  left join unnest(m.parsed) as p on true
where
  regexp_contains(event_message, 'COMMIT')
group by
  p.user_name
  `,for:["database"]},{label:"Metadata IP",description:"List all IP addresses that used the Supabase API",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  h.x_real_ip
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.headers) as h on true
where h.x_real_ip is not null
`,for:["api"]},{label:"Requests by Geography",description:"List all ISO 3166-1 alpha-2 country codes that used the Supabase API",mode:"custom",searchString:`select
  cf.country,
  count(*) as count
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.cf) as cf on true
group by
  cf.country
order by
  count desc
`,for:["api"]},{label:"Slow Response Time",mode:"custom",description:"List all Supabase API requests that are slow",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.origin_time
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.origin_time > 1000
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"500 Request Codes",description:"List all Supabase API requests that responded witha 5XX status code",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.status_code
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.status_code >= 500
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Top Paths",description:"List the most requested Supabase API paths",mode:"custom",searchString:`select
  r.path as path,
  r.search as params,
  count(timestamp) as c
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
group by
  path,
  params
order by
  c desc
limit 100
`,for:["api"]},{label:"REST Requests",description:"List all PostgREST requests",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
where
  path like '%rest/v1%'
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Errors",description:"List all Postgres error messages with ERROR, FATAL, or PANIC severity",mode:"custom",searchString:`select
  cast(t.timestamp as datetime) as timestamp,
  p.error_severity,
  event_message
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
order by
  timestamp desc
limit 100
`,for:["database"]},{label:"Error Count by User",description:"Count of errors by users",mode:"custom",searchString:`select
  count(t.timestamp) as count,
  p.user_name,
  p.error_severity
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
group by
  p.user_name,
  p.error_severity
order by
  count desc
limit 100
`,for:["database"]},{label:"Auth Endpoint Events",description:"Endpoint events filtered by path",mode:"custom",searchString:`select
  t.timestamp,
  event_message
from auth_logs as t
where
  regexp_contains(event_message,"level.{3}(info|warning||error|fatal)")
  -- and regexp_contains(event_message,"path.{3}(/token|/recover|/signup|/otp)")
limit 100
`,for:["database"]},{label:"Auth Audit Logs",description:"Audit logs for auth events",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message, metadata 
from auth_audit_logs 
limit 10
`,for:["database"]},{label:"Storage Object Requests",description:"Number of requests done on Storage Objects",mode:"custom",searchString:`select
  r.method as http_verb,
  r.path as filepath,
  count(*) as num_requests
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) AS r
  cross join unnest(r.headers) AS h
where
  path like '%storage/v1/object/%'
group by
  r.path, r.method
order by
  num_requests desc
limit 100
`,for:["api"]},{label:"Storage Egress Requests",description:"Check the number of requests done on Storage Affecting Egress",mode:"custom",searchString:`select
  request.method as http_verb,
  request.path as filepath,
  (responseHeaders.cf_cache_status = 'HIT') as cached,
  count(*) as num_requests
from
  edge_logs
  cross join unnest(metadata) as metadata
  cross join unnest(metadata.request) as request
  cross join unnest(metadata.response) as response
  cross join unnest(response.headers) as responseHeaders
where
  (path like '%storage/v1/object/%' or path like '%storage/v1/render/%')
  and request.method = 'GET'
group by 1, 2, 3
order by num_requests desc
limit 100;
`,for:["api"]},{label:"Storage Top Cache Misses",description:"The top Storage requests that miss caching",mode:"custom",searchString:`select
  r.path as path,
  r.search as search,
  count(id) as count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object')
  and r.method = 'GET'
  and h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
group by path, search
order by count desc
limit 100;
`,for:["api"]}],n={search_query:e=>`regexp_contains(event_message, '${e}')`},l={postgres_logs:{...n,database:e=>`identifier = '${e}'`,"severity.error":"parsed.error_severity in ('ERROR', 'FATAL', 'PANIC')","severity.noError":"parsed.error_severity not in ('ERROR', 'FATAL', 'PANIC')","severity.log":"parsed.error_severity = 'LOG'"},edge_logs:{...n,database:e=>`identifier = '${e}'`,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499","product.database":"request.path like '/rest/%' or request.path like '/graphql/%'","product.storage":"request.path like '/storage/%'","product.auth":"request.path like '/auth/%'","product.realtime":"request.path like '/realtime/%'","method.get":"request.method = 'GET'","method.post":"request.method = 'POST'","method.put":"request.method = 'PUT'","method.patch":"request.method = 'PATCH'","method.delete":"request.method = 'DELETE'","method.options":"request.method = 'OPTIONS'"},function_edge_logs:{...n,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499"},function_logs:{...n,"severity.error":"metadata.level = 'error'","severity.notError":"metadata.level != 'error'","severity.log":"metadata.level = 'log'","severity.info":"metadata.level = 'info'","severity.debug":"metadata.level = 'debug'","severity.warn":"metadata.level = 'warn'"},auth_logs:{...n,"severity.error":"metadata.level = 'error' or metadata.level = 'fatal'","severity.warning":"metadata.level = 'warning'","severity.info":"metadata.level = 'info'","status_code.server_error":"cast(metadata.status as int64) between 500 and 599","status_code.client_error":"cast(metadata.status as int64) between 400 and 499","status_code.redirection":"cast(metadata.status as int64) between 300 and 399","status_code.success":"cast(metadata.status as int64) between 200 and 299","endpoints.admin":'REGEXP_CONTAINS(metadata.path, "/admin")',"endpoints.signup":'REGEXP_CONTAINS(metadata.path, "/signup|/invite|/verify")',"endpoints.authentication":'REGEXP_CONTAINS(metadata.path, "/token|/authorize|/callback|/otp|/magiclink")',"endpoints.recover":'REGEXP_CONTAINS(metadata.path, "/recover")',"endpoints.user":'REGEXP_CONTAINS(metadata.path, "/user")',"endpoints.logout":'REGEXP_CONTAINS(metadata.path, "/logout")'},realtime_logs:{...n},storage_logs:{...n},postgrest_logs:{...n,database:e=>`identifier = '${e}'`},pgbouncer_logs:{...n},supavisor_logs:{...n,database:e=>`m.project like '${e}%'`},pg_upgrade_logs:{...n},pg_cron_logs:{...n},etl_replication_logs:{...n,pipeline_id:e=>`pipeline_id = ${e}`}};var c=((t={}).EDGE="edge_logs",t.POSTGRES="postgres_logs",t.FUNCTIONS="function_logs",t.FN_EDGE="function_edge_logs",t.AUTH="auth_logs",t.AUTH_AUDIT="auth_audit_logs",t.REALTIME="realtime_logs",t.STORAGE="storage_logs",t.POSTGREST="postgrest_logs",t.SUPAVISOR="supavisor_logs",t.PGBOUNCER="pgbouncer_logs",t.PG_UPGRADE="pg_upgrade_logs",t.PG_CRON="pg_cron_logs",t.ETL="etl_replication_logs",t);let u={postgres_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events with ERROR, PANIC, or FATAL"},{key:"noError",label:"No Error",description:"Show all non-error events"},{key:"log",label:"Log",description:"Show all events that are log severity"}]}},edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]},product:{label:"Product",key:"product",options:[{key:"database",label:"Database",description:""},{key:"auth",label:"Auth",description:""},{key:"storage",label:"Storage",description:""},{key:"realtime",label:"Realtime",description:""}]},method:{label:"Method",key:"method",options:[{key:"get",label:"GET",description:""},{key:"options",label:"OPTIONS",description:""},{key:"put",label:"PUT",description:""},{key:"post",label:"POST",description:""},{key:"patch",label:"PATCH",description:""},{key:"delete",label:"DELETE",description:""}]}},...r.IS_PLATFORM?{function_edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]}}}:{},function_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:'Show all events that are "error" severity'},{key:"warn",label:"Warning",description:'Show all events that are "warn" severity'},{key:"info",label:"Info",description:'Show all events that are "info" severity'},{key:"debug",label:"Debug",description:'Show all events that are "debug" severity'},{key:"log",label:"Log",description:'Show all events that are "log" severity'}]}},auth_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events that have error or fatal severity"},{key:"warning",label:"Warning",description:"Show all events that have warning severity"},{key:"info",label:"Info",description:"Show all events that have info severity"}]},status_code:{label:"Status Code",key:"status_code",options:[{key:"server_error",label:"Server Error",description:"Show all requests with 5XX status code"},{key:"client_error",label:"Client Error",description:"Show all requests with 4XX status code"},{key:"redirection",label:"Redirection",description:"Show all requests that have 3XX status code"},{key:"success",label:"Success",description:"Show all requests that have 2XX status code"}]},endpoints:{label:"Endpoints",key:"endpoints",options:[{key:"admin",label:"Admin",description:"Show all admin requests"},{key:"signup",label:"Sign up",description:"Show all signup and authorization requests"},{key:"recover",label:"Password Recovery",description:"Show all password recovery requests"},{key:"authentication",label:"Authentication",description:"Show all authentication flow requests (login, otp, and Oauth2)"},{key:"user",label:"User",description:"Show all user data requests"},{key:"logout",label:"Logout",description:"Show all logout requests"}]}}},d=[{text:"Last 15 minutes",calcFrom:()=>(0,s.default)().subtract(15,"minute").toISOString(),calcTo:()=>""},{text:"Last 30 minutes",calcFrom:()=>(0,s.default)().subtract(30,"minute").toISOString(),calcTo:()=>""},{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 2 days",calcFrom:()=>(0,s.default)().subtract(2,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 5 days",calcFrom:()=>(0,s.default)().subtract(5,"day").toISOString(),calcTo:()=>""}],m=[{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 7 days",calcFrom:()=>(0,s.default)().subtract(7,"day").toISOString(),calcTo:()=>""}];e.s(["EXPLORER_DATEPICKER_HELPERS",0,m,"FILTER_OPTIONS",0,u,"LOGS_EXPLORER_DOCS_URL",0,i,"LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD",0,2,"LOGS_SOURCE_DESCRIPTION",0,{edge_logs:"Logs obtained from the network edge, containing all API requests",postgres_logs:"Database logs obtained directly from Postgres",function_logs:"Function logs generated from runtime execution",function_edge_logs:"Function call logs, containing the request and response",auth_logs:"Errors, warnings, and performance details from the auth service",auth_audit_logs:"Audit records of user signups, logins, and account changes",realtime_logs:"Realtime server for Postgres logical replication broadcasting",storage_logs:"Object storage logs",postgrest_logs:"RESTful API web server logs",supavisor_logs:"Shared connection pooler logs for PostgreSQL",pgbouncer_logs:"Dedicated connection pooler for PostgreSQL",pg_upgrade_logs:"Logs generated by the Postgres version upgrade process",pg_cron_logs:"Postgres logs from pg_cron cron jobs",etl_replication_logs:"Logs from the replication process"},"LOGS_TABLES",0,{api:"edge_logs",database:"postgres_logs",functions:"function_logs",fn_edge:"function_edge_logs",auth:"auth_logs",realtime:"realtime_logs",storage:"storage_logs",postgrest:"postgrest_logs",supavisor:"supavisor_logs",pg_upgrade:"pg_upgrade_logs",pg_cron:"postgres_logs",pgbouncer:"pgbouncer_logs",etl:"etl_replication_logs"},"LOG_ROUTES_WITH_REPLICA_SUPPORT",0,["/project/[ref]/logs/edge-logs","/project/[ref]/logs/pooler-logs","/project/[ref]/logs/postgres-logs","/project/[ref]/logs/postgrest-logs"],"LogsTableName",()=>c,"PREVIEWER_DATEPICKER_HELPERS",0,d,"SQL_FILTER_TEMPLATES",0,l,"TEMPLATES",0,o,"TIER_QUERY_LIMITS",0,{FREE:{text:"1 day",value:1,unit:"day",promptUpgrade:!0},PRO:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},PAYG:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},TEAM:{text:"28 days",value:28,unit:"day",promptUpgrade:!0},ENTERPRISE:{text:"90 days",value:90,unit:"day",promptUpgrade:!1},PLATFORM:{text:"1 day",value:1,unit:"day",promptUpgrade:!1}},"getDefaultHelper",0,e=>e.find(e=>e.default)||e[0]])},884892,e=>{"use strict";let t=class{_line;_text;_lines;model;offset;lineNumber;constructor(e,t,s){this.model=e,this.offset=t,this.lineNumber=s,this._text=e.getValue(),this._lines=this._text.split(/\r?\n/g),this._line=this._lines[s]}hasNext(){return this.lineNumber>=0||this.offset>=0}isFowardDQuote(){return!!this.hasForward()&&34===this.peekForward()}isNextDQuote(){return!!this.hasNext()&&34===this.peekNext()}isNextPeriod(){return!!this.hasNext()&&46===this.peekNext()}peekNext(){return this.offset<0?10*(this.lineNumber>0):this._line.charCodeAt(this.offset)}hasForward(){return this.lineNumber<this._lines.length||this.offset<this._line.length}peekForward(){return this.offset===this._line.length?10*(this.lineNumber!==this._lines.length):this._line.charCodeAt(this.offset+1)}next(){if(this.offset<0)return this.lineNumber>0?(this.lineNumber--,this._line=this._lines[this.lineNumber],this.offset=this._line.length-1,10):(this.lineNumber=-1,0);let e=this._line.charCodeAt(this.offset);return this.offset--,e}readArguments(){let e=0,t=0,s=0,a=0;for(;this.hasNext();){let r=this.next();switch(r){case 40:if(--e<0)return a;break;case 41:e++;break;case 123:s--;break;case 125:s++;break;case 91:t--;break;case 93:t++;break;case 34:case 39:for(;this.hasNext()&&r!==this.next(););break;case 44:!e&&!t&&!s&&a++}}return -1}readIdent(){let e=!1,t=!1,s="";for(;this.hasNext();){let a=this.peekNext();if(e&&!t&&!this._isIdentPart(a))break;if(a=this.next(),!e&&t&&34===a){e=!0;continue}if(e||32!==a&&9!==a&&10!=a){if(!e&&(34===a||this._isIdentPart(a)))e=!0,t=34===a,s=String.fromCharCode(a)+s;else if(e)if(t){if(0===a||(s=String.fromCharCode(a)+s,34===a))break}else s=String.fromCharCode(a)+s}}return s}readIdents(e){let t=[];for(;e>0;){e--;let s=this.readIdent();if(!s||(t.push(s),!this.isNextPeriod()))break}return t.reverse()}_isIdentPart(e){return 95===e||e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}};e.s(["default",0,t])},520124,e=>{"use strict";var t=e.i(460988),s=e.i(389959);e.s(["useFillTimeseriesSorted",0,(...e)=>(0,s.useMemo)(()=>{let[s,a]=e;if(!s[0]?.[a])return{data:s,error:void 0,isError:!1};try{return{data:(0,t.fillTimeseries)(...e).sort((t,s)=>new Date(t[e[1]])-new Date(s[e[1]])),error:void 0,isError:!1}}catch(e){return{data:[],error:e,isError:!0}}},[JSON.stringify(e[0]),...e])])},238921,e=>{"use strict";var t=e.i(478902),s=e.i(55956),a=e.i(389959),r=e.i(151675),i=e.i(942032),o=e.i(30772),n=e.i(214765),l=e.i(941327),c=e.i(462273),u=e.i(843778);let d="hsl(var(--background-overlay-hover))",m="hsl(var(--brand-default))",p="hsl(var(--destructive-default))",f="hsl(var(--warning-default))";e.s(["LogsBarChart",0,({data:e,onBarClick:h,EmptyState:g,DateTimeFormat:_="MMM D, YYYY, hh:mma",isFullHeight:y=!1})=>{let[b,x]=(0,a.useState)(null);if(0===e.length)return g||null;let v=(0,s.default)(e[0].timestamp).format(_),S=(0,s.default)(e[e?.length-1]?.timestamp).format(_);return(0,t.jsxs)("div",{"data-testid":"logs-bar-chart",className:(0,u.cn)("flex flex-col gap-y-3",y?"h-full":"h-24"),children:[(0,t.jsx)(c.ChartContainer,{className:"h-full",config:{error_count:{label:"Errors"},ok_count:{label:"Ok"},warning_count:{label:"Warnings"}},children:(0,t.jsxs)(o.BarChart,{data:e,onMouseMove:e=>{e.activeTooltipIndex!==b&&x(e.activeTooltipIndex)},onMouseLeave:()=>x(null),onClick:e=>{let t=e?.activePayload?.[0]?.payload;h&&h(t,e)},children:[(0,t.jsx)(l.YAxis,{tick:!1,width:0,axisLine:{stroke:d},tickLine:{stroke:d}}),(0,t.jsx)(n.XAxis,{dataKey:"timestamp",interval:e.length-2,tick:!1,axisLine:{stroke:d},tickLine:{stroke:d}}),(0,t.jsx)(c.ChartTooltip,{content:(0,t.jsx)(c.ChartTooltipContent,{className:"text-foreground-light -mt-5",labelFormatter:e=>(0,s.default)(e).format(_)})}),(0,t.jsx)(r.Bar,{dataKey:"error_count",fill:p,maxBarSize:24,stackId:"stack",children:e?.map((e,s)=>(0,t.jsx)(i.Cell,{className:"cursor-pointer transition-colors",fill:b===s||null===b?p:"hsl(var(--destructive-500))"},`error-${s}`))}),(0,t.jsx)(r.Bar,{dataKey:"warning_count",fill:f,maxBarSize:24,stackId:"stack",children:e?.map((e,s)=>(0,t.jsx)(i.Cell,{className:"cursor-pointer transition-colors",fill:b===s||null===b?f:"hsl(var(--warning-500))"},`warning-${s}`))}),(0,t.jsx)(r.Bar,{dataKey:"ok_count",fill:m,maxBarSize:24,stackId:"stack",children:e?.map((e,s)=>(0,t.jsx)(i.Cell,{className:"cursor-pointer transition-colors",fill:b===s||null===b?m:"hsl(var(--brand-500))"},`success-${s}`))})]})}),e&&(0,t.jsxs)("div",{className:"text-foreground-lighter -mt-10 flex items-center justify-between text-[10px] font-mono",children:[(0,t.jsx)("span",{children:v}),(0,t.jsx)("span",{children:S})]})]})}])},959076,e=>{"use strict";function t(e,t){let s="00000000-0000-0000-0000-000000000000".split("").map((t,s)=>"-"===t?t:e[s]??t);if(e.length>=s.length)return s.join("");if(e.length&&e.length<15&&(s[14]="4"),e.length&&e.length<20&&(s[19]=t?"b":"8"),t)for(let t=e.length;t<s.length;t+=1)"0"===s[t]&&(s[t]="f");return s.join("")}function s(e){if(!e)return[e,void 0];let t=e.charCodeAt(e.length-1);if(122===t)return[e,e+"~"];if(t>=126)return[e,e+" "];let s=e.substring(0,e.length-1)+String.fromCharCode(t+1);return[e,s]}e.s(["prefixToUUID",()=>t,"stringRange",()=>s])},899850,e=>{"use strict";e.s(["COUNT_ESTIMATE_SQL",0,`
CREATE OR REPLACE FUNCTION pg_temp.count_estimate(
    query text
) RETURNS integer LANGUAGE plpgsql AS $$
DECLARE
    plan jsonb;
BEGIN
    EXECUTE 'EXPLAIN (FORMAT JSON)' || query INTO plan;
    RETURN plan->0->'Plan'->'Plan Rows';
END;
$$;
`.trim(),"THRESHOLD_COUNT",0,5e4])},494031,e=>{"use strict";var t=e.i(749199),s=e.i(820308),a=e.i(775159);e.s(["useQueryPerformanceQuery",0,({preset:e,orderBy:r,searchQuery:i="",roles:o,runIndexAdvisor:n=!1,minCalls:l,filterIndexAdvisor:c=!1})=>{let u=s.PRESET_CONFIG[a.Presets.QUERY_PERFORMANCE].queries[e],d=[void 0!==o&&o.length>0?`auth.rolname in (${o.map(e=>`'${e}'`).join(", ")})`:"",i.length>0?`statements.query ~* '${i}'`:"","number"==typeof l&&l>0?`statements.calls >= ${l}`:""].filter(e=>e.length>0).join(" AND "),m=r&&`ORDER BY ${r.column} ${r.order}`,p=u.sql([],d.length>0?`WHERE ${d}`:void 0,m,n,c);return(0,t.default)({sql:p,params:void 0,where:d,orderBy:m})}])},302372,e=>{"use strict";var t=e.i(242882),s=e.i(248593),a=e.i(234745),r=e.i(635494);e.i(10429);var i=e.i(837508),o=e.i(509847);async function n({projectRef:e,connectionString:t,schema:r},i,o){if(!e)throw Error("projectRef is required");let n=new Headers(o);t&&n.set("x-connection-encrypted",t);let{data:l,error:c}=await (0,a.get)("/platform/pg-meta/{ref}/policies",{params:{header:{"x-connection-encrypted":t,"x-pg-application-name":s.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e},query:{included_schemas:r||"",excluded_schemas:""}},headers:n,signal:i});return c&&(0,a.handleError)(c),l}e.s(["useDatabasePoliciesQuery",0,({projectRef:e,connectionString:s,schema:a},{enabled:l=!0,...c}={})=>{let{data:u}=(0,r.useSelectedProjectQuery)(),d=u?.status===i.PROJECT_STATUS.ACTIVE_HEALTHY;return(0,t.useQuery)({queryKey:o.databasePoliciesKeys.list(e,a),queryFn:({signal:t})=>n({projectRef:e,connectionString:s,schema:a},t),enabled:l&&void 0!==e&&d,...c})}])},93472,165610,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(938933);let r=(0,e.i(388019).default)("OctagonAlert",[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]]);e.s(["AlertOctagon",()=>r],165610);var i=e.i(872646),o=e.i(217444),n=e.i(833655),l=e.i(975924);let c={danger:(0,t.jsx)(r,{strokeWidth:1.5,size:18}),success:(0,t.jsx)(i.CheckCircle,{strokeWidth:1.5,size:18}),warning:(0,t.jsx)(o.AlertTriangle,{strokeWidth:1.5,size:18}),info:(0,t.jsx)(n.Info,{strokeWidth:1.5,size:18}),neutral:(0,t.jsx)(t.Fragment,{})};function u({variant:e="neutral",className:r,title:i,withIcon:o,closable:n,children:u,icon:d,actions:m}){let p=(0,a.default)("alert"),[f,h]=(0,s.useState)(!0),g=[p.base];g.push(p.variant[e].base),r&&g.push(r);let _=[p.description,p.variant[e].description],y=[p.close];return(0,t.jsx)(t.Fragment,{children:f&&(0,t.jsxs)("div",{className:g.join(" "),children:[o?(0,t.jsx)("div",{className:p.variant[e].icon,children:o&&c[e]}):null,d&&d,(0,t.jsxs)("div",{className:"flex flex-1 items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:[p.variant[e].header,p.header].join(" "),children:i}),(0,t.jsx)("div",{className:_.join(" "),children:u})]}),m]}),n&&(0,t.jsx)("button",{"aria-label":"Close alert",onClick:()=>h(!1),className:y.join(" "),children:(0,t.jsx)(l.X,{strokeWidth:2,size:16})})]})})}e.s(["Alert",()=>u],93472)},101369,e=>{"use strict";var t=e.i(478902),s=e.i(843778);e.s(["default",0,({max:e=100,value:a=0,barClass:r="bg-foreground",bgClass:i="",type:o="vertical",borderClass:n="",labelBottom:l="",labelBottomClass:c="tabular-nums",labelTop:u="",labelTopClass:d=""})=>{if("horizontal"===o){let o=Number(a/e*100),m=`${o}%`,p=l||u;return(0,t.jsxs)("div",{className:"flex flex-col w-full",children:[p&&(0,t.jsxs)("div",{className:"flex align-baseline justify-between pb-1 space-x-8",children:[(0,t.jsx)("p",{className:(0,s.cn)("text-foreground text-sm truncate capitalize-sentence",u.length>0&&"max-w-[75%]",c),children:l}),(0,t.jsx)("p",{className:(0,s.cn)("text-foreground-light text-sm",d),children:u})]}),(0,t.jsx)("div",{className:`relative rounded h-1 overflow-hidden w-full border p-0 ${i||"bg-surface-400"} ${n||"border-none"}`,children:(0,t.jsx)("div",{className:`absolute rounded inset-x-0 bottom-0 h-1 ${r} transition-all`,style:{width:m}})})]})}{let s=Number(a/e*35);return s<2&&(s=2),(0,t.jsx)("div",{className:`relative rounded w-5 overflow-hidden border p-1 ${i||"bg-gray-400"} ${n||"border-none"}`,style:{height:35},children:(0,t.jsx)("div",{className:`absolute inset-x-0 bottom-0 w-5 ${r}`,style:{height:s}})})}}])},147545,193,e=>{"use strict";var t=e.i(389959),s=e.i(55956),a=e.i(242882),r=e.i(234745),i=e.i(510334);async function o({projectRef:e,attributes:t,startDate:s,endDate:a,interval:i="1h",databaseIdentifier:o},n){if(!e)throw Error("Project ref is required");if(!t?.length)throw Error("At least one attribute is required");if(!s)throw Error("Start date is required");if(!a)throw Error("End date is required");let{data:l,error:c}=await (0,r.get)("/platform/projects/{ref}/infra-monitoring",{params:{path:{ref:e},query:{attributes:t,startDate:s,endDate:a,interval:i,databaseIdentifier:o}},signal:n});return c&&(0,r.handleError)(c),l}let n=({projectRef:e,attributes:t,startDate:s,endDate:r,interval:n="1h",databaseIdentifier:l},{enabled:c=!0,...u}={})=>(0,a.useQuery)({queryKey:i.analyticsKeys.infraMonitoringGroup(e,{attributes:t,startDate:s,endDate:r,interval:n,databaseIdentifier:l}),queryFn:({signal:a})=>o({projectRef:e,attributes:t,startDate:s,endDate:r,interval:n,databaseIdentifier:l},a),enabled:c&&void 0!==e&&!!t?.length&&void 0!==s&&void 0!==r,staleTime:6e4,...u});function l(e,s,a,r,i,o,l,u){let d=e.length>0,m=n({projectRef:s,attributes:e,startDate:a,endDate:r,interval:i,databaseIdentifier:o},{enabled:void 0===l&&u&&d}),p=(0,t.useMemo)(()=>{if(m.data)return c(m.data,e)},[m.data,e]);return d?e.map(e=>({data:p?.[e],error:m.error,isError:m.isError,isFetching:m.isFetching,isLoading:m.isLoading,status:m.status})):[]}function c(e,t,a="HH:mm DD MMM"){if("series"in e)return t.reduce((t,r)=>{let i=e.series?.[r];if(!i)return t;let o=e.data.map(e=>{let t=e.values?.[r];return{period_start:e.period_start,periodStartFormatted:(0,s.default)(e.period_start).format(a),[r]:void 0===t?0:Number(t)}});return t[r]={data:o,format:i.format,total:i.total,yAxisLimit:i.yAxisLimit},t},{});let r=t[0];if(!r)return{};let i=e.data.map(e=>{let t=e[r];return{period_start:e.period_start,periodStartFormatted:(0,s.default)(e.period_start).format(a),[r]:void 0===t?0:Number(t)}});return{[r]:{data:i,format:e.format,total:e.total,yAxisLimit:e.yAxisLimit}}}e.s(["getInfraMonitoringAttributes",()=>o,"useInfraMonitoringAttributesQuery",0,n],193),e.s(["mapMultiResponseToAnalyticsData",0,c,"mapResponseToAnalyticsData",()=>c,"useInfraMonitoringQueries",()=>l],147545)},510334,e=>{"use strict";function t(e){return e?e.split("T")[0]:e}e.s(["analyticsKeys",0,{functionsCombinedStats:(e,{interval:t,functionId:s})=>["projects",e,"functions-combined-stats",{interval:t,functionId:s}],functionsInvStats:(e,{interval:t,functionId:s})=>["projects",e,"functions-inv-stats",{interval:t,functionId:s}],functionsReqStats:(e,{interval:t,functionId:s})=>["projects",e,"functions-req-stats",{interval:t,functionId:s}],functionsResourceUsage:(e,{interval:t,functionId:s})=>["projects",e,"functions-resource-usage",{interval:t,functionId:s}],orgDailyStats:(e,{startDate:s,endDate:a,projectRef:r})=>["organizations",e,"daily-stats",{startDate:t(s),endDate:t(a),projectRef:r}],infraMonitoring:(e,{attribute:t,startDate:s,endDate:a,interval:r,databaseIdentifier:i})=>["projects",e,"infra-monitoring",{attribute:t,startDate:s,endDate:a,interval:r,databaseIdentifier:i}],infraMonitoringGroup:(e,{attributes:t,startDate:s,endDate:a,interval:r,databaseIdentifier:i})=>["projects",e,"infra-monitoring","group",{attributes:t?[...t].sort():void 0,startDate:s,endDate:a,interval:r,databaseIdentifier:i}],projectMetrics:(e,{interval:t})=>["projects",e,"project.metrics",{interval:t}],usageApiCounts:(e,t)=>["projects",e,"usage.api-counts",t],usageApiRequestsCount:e=>["projects",e,"usage.api-requests-count"]}])},363269,e=>{"use strict";var t=e.i(389959),s=e.i(791576),a=e.i(439043),r=e.i(530053),i=e.i(408880),o=e.i(197649),n=e.i(818369),l=e.i(113939),c=e.i(557385),u=e.i(143109),d=e.i(165602),m=e.i(767799),p=e.i(877591),f=e.i(129405),h=e.i(447958),g=["type","layout","connectNulls","ref"],_=["key"];function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){if(null==e)return{};var s,a,r=function(e,t){if(null==e)return{};var s={};for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){if(t.indexOf(a)>=0)continue;s[a]=e[a]}return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)s=i[a],!(t.indexOf(s)>=0)&&Object.prototype.propertyIsEnumerable.call(e,s)&&(r[s]=e[s])}return r}function x(){return(x=Object.assign.bind()).apply(this,arguments)}function v(e,t){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),s.push.apply(s,a)}return s}function S(e){for(var t=1;t<arguments.length;t++){var s=null!=arguments[t]?arguments[t]:{};t%2?v(Object(s),!0).forEach(function(t){T(e,t,s[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):v(Object(s)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(s,t))})}return e}function j(e){return function(e){if(Array.isArray(e))return A(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return A(e,void 0);var s=Object.prototype.toString.call(e).slice(8,-1);if("Object"===s&&e.constructor&&(s=e.constructor.name),"Map"===s||"Set"===s)return Array.from(e);if("Arguments"===s||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(s))return A(e,void 0)}}(e)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function A(e,t){(null==t||t>e.length)&&(t=e.length);for(var s=0,a=Array(t);s<t;s++)a[s]=e[s];return a}function E(e,t){for(var s=0;s<t.length;s++){var a=t[s];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,w(a.key),a)}}function k(){try{var e=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(e){}return(k=function(){return!!e})()}function C(e){return(C=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function N(e,t){return(N=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e})(e,t)}function T(e,t,s){return(t=w(t))in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}function w(e){var t=function(e,t){if("object"!=y(e)||!e)return e;var s=e[Symbol.toPrimitive];if(void 0!==s){var a=s.call(e,t||"default");if("object"!=y(a))return a;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==y(t)?t:t+""}var I=function(e){var f,v;function A(){var e,t,s;if(!(this instanceof A))throw TypeError("Cannot call a class as a function");for(var a=arguments.length,r=Array(a),i=0;i<a;i++)r[i]=arguments[i];return t=A,s=[].concat(r),t=C(t),T(e=function(e,t){if(t&&("object"===y(t)||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");var s=e;if(void 0===s)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return s}(this,k()?Reflect.construct(t,s||[],C(this).constructor):t.apply(this,s)),"state",{isAnimationFinished:!0,totalLength:0}),T(e,"generateSimpleStrokeDasharray",function(e,t){return"".concat(t,"px ").concat(e-t,"px")}),T(e,"getStrokeDasharray",function(t,s,a){var r=a.reduce(function(e,t){return e+t});if(!r)return e.generateSimpleStrokeDasharray(s,t);for(var i=Math.floor(t/r),o=t%r,n=s-t,l=[],c=0,u=0;c<a.length;u+=a[c],++c)if(u+a[c]>o){l=[].concat(j(a.slice(0,c)),[o-u]);break}var d=l.length%2==0?[0,n]:[n];return[].concat(j(A.repeat(a,i)),j(l),d).map(function(e){return"".concat(e,"px")}).join(", ")}),T(e,"id",(0,m.uniqueId)("recharts-line-")),T(e,"pathRef",function(t){e.mainCurve=t}),T(e,"handleAnimationEnd",function(){e.setState({isAnimationFinished:!0}),e.props.onAnimationEnd&&e.props.onAnimationEnd()}),T(e,"handleAnimationStart",function(){e.setState({isAnimationFinished:!1}),e.props.onAnimationStart&&e.props.onAnimationStart()}),e}if("function"!=typeof e&&null!==e)throw TypeError("Super expression must either be null or a function");return A.prototype=Object.create(e&&e.prototype,{constructor:{value:A,writable:!0,configurable:!0}}),Object.defineProperty(A,"prototype",{writable:!1}),e&&N(A,e),f=[{key:"componentDidMount",value:function(){if(this.props.isAnimationActive){var e=this.getTotalLength();this.setState({totalLength:e})}}},{key:"componentDidUpdate",value:function(){if(this.props.isAnimationActive){var e=this.getTotalLength();e!==this.state.totalLength&&this.setState({totalLength:e})}}},{key:"getTotalLength",value:function(){var e=this.mainCurve;try{return e&&e.getTotalLength&&e.getTotalLength()||0}catch(e){return 0}}},{key:"renderErrorBar",value:function(e,s){if(this.props.isAnimationActive&&!this.state.isAnimationFinished)return null;var a=this.props,r=a.points,i=a.xAxis,o=a.yAxis,n=a.layout,l=a.children,u=(0,p.findAllByType)(l,d.ErrorBar);if(!u)return null;var m=function(e,t){return{x:e.x,y:e.y,value:e.value,errorVal:(0,h.getValueByDataKey)(e.payload,t)}};return t.default.createElement(c.Layer,{clipPath:e?"url(#clipPath-".concat(s,")"):null},u.map(function(e){return t.default.cloneElement(e,{key:"bar-".concat(e.props.dataKey),data:r,xAxis:i,yAxis:o,layout:n,dataPointFormatter:m})}))}},{key:"renderDots",value:function(e,s,a){if(this.props.isAnimationActive&&!this.state.isAnimationFinished)return null;var r=this.props,i=r.dot,o=r.points,n=r.dataKey,l=(0,p.filterProps)(this.props,!1),u=(0,p.filterProps)(i,!0),d=o.map(function(e,t){var s=S(S(S({key:"dot-".concat(t),r:3},l),u),{},{index:t,cx:e.x,cy:e.y,value:e.value,dataKey:n,payload:e.payload,points:o});return A.renderDotItem(i,s)}),m={clipPath:e?"url(#clipPath-".concat(s?"":"dots-").concat(a,")"):null};return t.default.createElement(c.Layer,x({className:"recharts-line-dots",key:"dots"},m),d)}},{key:"renderCurveStatically",value:function(e,s,a,r){var i=this.props,o=i.type,l=i.layout,c=i.connectNulls,u=(i.ref,b(i,g)),d=S(S(S({},(0,p.filterProps)(u,!0)),{},{fill:"none",className:"recharts-line-curve",clipPath:s?"url(#clipPath-".concat(a,")"):null,points:e},r),{},{type:o,layout:l,connectNulls:c});return t.default.createElement(n.Curve,x({},d,{pathRef:this.pathRef}))}},{key:"renderCurveWithAnimation",value:function(e,a){var r=this,i=this.props,o=i.points,n=i.strokeDasharray,l=i.isAnimationActive,c=i.animationBegin,u=i.animationDuration,d=i.animationEasing,p=i.animationId,f=i.animateNewValues,h=i.width,g=i.height,_=this.state,y=_.prevPoints,b=_.totalLength;return t.default.createElement(s.default,{begin:c,duration:u,isActive:l,easing:d,from:{t:0},to:{t:1},key:"line-".concat(p),onAnimationEnd:this.handleAnimationEnd,onAnimationStart:this.handleAnimationStart},function(t){var s,i=t.t;if(y){var l=y.length/o.length,c=o.map(function(e,t){var s=Math.floor(t*l);if(y[s]){var a=y[s],r=(0,m.interpolateNumber)(a.x,e.x),o=(0,m.interpolateNumber)(a.y,e.y);return S(S({},e),{},{x:r(i),y:o(i)})}if(f){var n=(0,m.interpolateNumber)(2*h,e.x),c=(0,m.interpolateNumber)(g/2,e.y);return S(S({},e),{},{x:n(i),y:c(i)})}return S(S({},e),{},{x:e.x,y:e.y})});return r.renderCurveStatically(c,e,a)}var u=(0,m.interpolateNumber)(0,b)(i);if(n){var d="".concat(n).split(/[,\s]+/gim).map(function(e){return parseFloat(e)});s=r.getStrokeDasharray(u,b,d)}else s=r.generateSimpleStrokeDasharray(b,u);return r.renderCurveStatically(o,e,a,{strokeDasharray:s})})}},{key:"renderCurve",value:function(e,t){var s=this.props,a=s.points,r=s.isAnimationActive,o=this.state,n=o.prevPoints,l=o.totalLength;return r&&a&&a.length&&(!n&&l>0||!(0,i.default)(n,a))?this.renderCurveWithAnimation(e,t):this.renderCurveStatically(a,e,t)}},{key:"render",value:function(){var e,s=this.props,a=s.hide,i=s.dot,n=s.points,l=s.className,d=s.xAxis,m=s.yAxis,f=s.top,h=s.left,g=s.width,_=s.height,y=s.isAnimationActive,b=s.id;if(a||!n||!n.length)return null;var x=this.state.isAnimationFinished,v=1===n.length,S=(0,o.default)("recharts-line",l),j=d&&d.allowDataOverflow,A=m&&m.allowDataOverflow,E=j||A,k=(0,r.default)(b)?this.id:b,C=null!=(e=(0,p.filterProps)(i,!1))?e:{r:3,strokeWidth:2},N=C.r,T=C.strokeWidth,w=((0,p.hasClipDot)(i)?i:{}).clipDot,I=void 0===w||w,R=2*(void 0===N?3:N)+(void 0===T?2:T);return t.default.createElement(c.Layer,{className:S},j||A?t.default.createElement("defs",null,t.default.createElement("clipPath",{id:"clipPath-".concat(k)},t.default.createElement("rect",{x:j?h:h-g/2,y:A?f:f-_/2,width:j?g:2*g,height:A?_:2*_})),!I&&t.default.createElement("clipPath",{id:"clipPath-dots-".concat(k)},t.default.createElement("rect",{x:h-R/2,y:f-R/2,width:g+R,height:_+R}))):null,!v&&this.renderCurve(E,k),this.renderErrorBar(E,k),(v||i)&&this.renderDots(E,I,k),(!y||x)&&u.LabelList.renderCallByParent(this.props,n))}}],v=[{key:"getDerivedStateFromProps",value:function(e,t){return e.animationId!==t.prevAnimationId?{prevAnimationId:e.animationId,curPoints:e.points,prevPoints:t.curPoints}:e.points!==t.curPoints?{curPoints:e.points}:null}},{key:"repeat",value:function(e,t){for(var s=e.length%2!=0?[].concat(j(e),[0]):e,a=[],r=0;r<t;++r)a=[].concat(j(a),j(s));return a}},{key:"renderDotItem",value:function(e,s){var r;if(t.default.isValidElement(e))r=t.default.cloneElement(e,s);else if((0,a.default)(e))r=e(s);else{var i=s.key,n=b(s,_),c=(0,o.default)("recharts-line-dot","boolean"!=typeof e?e.className:"");r=t.default.createElement(l.Dot,x({key:i},n,{className:c}))}return r}}],f&&E(A.prototype,f),v&&E(A,v),Object.defineProperty(A,"prototype",{writable:!1}),A}(t.PureComponent);T(I,"displayName","Line"),T(I,"defaultProps",{xAxisId:0,yAxisId:0,connectNulls:!1,activeDot:!0,dot:!0,legendType:"line",stroke:"#3182bd",strokeWidth:1,fill:"#fff",points:[],isAnimationActive:!f.Global.isSsr,animateNewValues:!0,animationBegin:0,animationDuration:1500,animationEasing:"ease",hide:!1,label:!1}),T(I,"getComposedData",function(e){var t=e.props,s=e.xAxis,a=e.yAxis,i=e.xAxisTicks,o=e.yAxisTicks,n=e.dataKey,l=e.bandSize,c=e.displayedData,u=e.offset,d=t.layout;return S({points:c.map(function(e,t){var c=(0,h.getValueByDataKey)(e,n);return"horizontal"===d?{x:(0,h.getCateCoordinateOfLine)({axis:s,ticks:i,bandSize:l,entry:e,index:t}),y:(0,r.default)(c)?null:a.scale(c),value:c,payload:e}:{x:(0,r.default)(c)?null:s.scale(c),y:(0,h.getCateCoordinateOfLine)({axis:a,ticks:o,bandSize:l,entry:e,index:t}),value:c,payload:e}}),layout:d},u)}),e.s(["Line",()=>I])},642184,e=>{"use strict";var t=e.i(242882),s=e.i(234745),a=e.i(510334);async function r({projectRef:e,attribute:t,startDate:a,endDate:r},i){if(!e)throw Error("Project ref is required");if(!t)throw Error("Attribute is required");if(!a)throw Error("Start date is required");if(!r)throw Error("End date is required");let{data:o,error:n}=await (0,s.get)("/platform/projects/{ref}/daily-stats",{params:{path:{ref:e},query:{attribute:t,startDate:a,endDate:r}},signal:i});return n&&(0,s.handleError)(n),o}e.s(["useProjectDailyStatsQuery",0,({projectRef:e,attribute:s,startDate:i,endDate:o},{enabled:n=!0,...l}={})=>(0,t.useQuery)({queryKey:a.analyticsKeys.infraMonitoring(e,{attribute:s,startDate:i,endDate:o}),queryFn:({signal:t})=>r({projectRef:e,attribute:s,startDate:i,endDate:o},t),enabled:n&&void 0!==e&&void 0!==s&&void 0!==i&&void 0!==o,staleTime:18e5,...l})])},119937,(e,t,s)=>{t.exports=function(e,t){for(var s,a=-1,r=e.length;++a<r;){var i=t(e[a]);void 0!==i&&(s=void 0===s?i:s+i)}return s}},983529,(e,t,s)=>{var a=e.r(320435),r=e.r(119937);t.exports=function(e,t){return e&&e.length?r(e,a(t,2)):0}},820308,775159,e=>{"use strict";var t,s,a=e.i(55956),r=((t={}).API="api",t.STORAGE="storage",t.AUTH="auth",t.QUERY_PERFORMANCE="query_performance",t.DATABASE="database",t);e.s(["Presets",()=>r],775159);var i=((s={}).LAST_10_MINUTES="Last 10 minutes",s.LAST_30_MINUTES="Last 30 minutes",s.LAST_60_MINUTES="Last 60 minutes",s.LAST_3_HOURS="Last 3 hours",s.LAST_24_HOURS="Last 24 hours",s.LAST_7_DAYS="Last 7 days",s.LAST_14_DAYS="Last 14 days",s.LAST_28_DAYS="Last 28 days",s);let o=[{text:"Last 10 minutes",calcFrom:()=>(0,a.default)().subtract(10,"minute").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 30 minutes",calcFrom:()=>(0,a.default)().subtract(30,"minute").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 60 minutes",calcFrom:()=>(0,a.default)().subtract(1,"hour").toISOString(),calcTo:()=>(0,a.default)().toISOString(),default:!0,availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 3 hours",calcFrom:()=>(0,a.default)().subtract(3,"hour").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 24 hours",calcFrom:()=>(0,a.default)().subtract(1,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["free","pro","team","enterprise","platform"]},{text:"Last 7 days",calcFrom:()=>(0,a.default)().subtract(7,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["pro","team","enterprise"]},{text:"Last 14 days",calcFrom:()=>(0,a.default)().subtract(14,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["team","enterprise"]},{text:"Last 28 days",calcFrom:()=>(0,a.default)().subtract(28,"day").toISOString(),calcTo:()=>(0,a.default)().toISOString(),availableIn:["team","enterprise"]}],n={iso_timestamp_start:o[0].calcFrom(),iso_timestamp_end:o[0].calcTo()},l=(e,t=!0)=>{if(0===e.length)return"";let s=e.map(e=>{let t=e.key.split("."),s=[t[t.length-2],t[t.length-1]].join("."),a=e.key.includes(".")?s:e.key,r=e.value.toString().includes('"')||e.value.toString().includes("'"),i=!isNaN(Number(e.value)),o=!i&&r?e.value:`'${e.value}'`,n=!i&&String(o).toLowerCase(),l=i?e.value:n;switch(e.compare){case"matches":return`REGEXP_CONTAINS(${a}, ${l})`;case"is":default:return`${a} = ${l}`;case"!=":return`${a} != ${l}`;case">=":return`${a} >= ${l}`;case"<=":return`${a} <= ${l}`;case">":return`${a} > ${l}`;case"<":return`${a} < ${l}`}}).filter(Boolean).join(" AND ");return""===s?"":t?"WHERE "+s:"AND "+s},c={[r.API]:{title:"API",queries:{totalRequests:{queryType:"logs",sql:e=>`
        -- reports-api-total-requests
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC`},topRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},errorCounts:{queryType:"logs",sql:e=>`
        -- reports-api-error-counts
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          count(t.id) as count
        FROM edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        WHERE
          response.status_code >= 400
        ${l(e,!1)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},topErrorRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-error-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        where
          response.status_code >= 400
        ${l(e,!1)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          count desc
        limit 10
        `},responseSpeed:{queryType:"logs",sql:e=>`
        -- reports-api-response-speed
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          avg(response.origin_time) as avg
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
      `},topSlowRoutes:{queryType:"logs",sql:e=>`
        -- reports-api-top-slow-routes
        select
          request.path as path,
          request.method as method,
          request.search as search,
          response.status_code as status_code,
          count(t.id) as count,
          avg(response.origin_time) as avg
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
        ${l(e)}
        group by
          request.path, request.method, request.search, response.status_code
        order by
          avg desc
        limit 10
        `},networkTraffic:{queryType:"logs",sql:e=>`
        -- reports-api-network-traffic
        select
          cast(timestamp_trunc(t.timestamp, hour) as datetime) as timestamp,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as ingress_mb,
          coalesce(
            safe_divide(
              sum(
                cast(coalesce(resp_headers.content_length, "0") as int64)
              ),
              1000000
            ),
            0
          ) as egress_mb,
        FROM
          edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(response.headers) as resp_headers
          ${l(e)}
        GROUP BY
          timestamp
        ORDER BY
          timestamp ASC
        `},requestsByCountry:{queryType:"logs",sql:e=>`
        -- reports-api-requests-by-country
        select
          cf.country as country,
          count(t.id) as count
        from edge_logs t
          cross join unnest(metadata) as m
          cross join unnest(m.response) as response
          cross join unnest(m.request) as request
          cross join unnest(request.headers) as headers
          cross join unnest(request.cf) as cf
        where
          cf.country is not null
        ${l(e,!1)}
        group by
          cf.country
        `}}},[r.AUTH]:{title:"",queries:{}},[r.STORAGE]:{title:"Storage",queries:{cacheHitRate:{queryType:"logs",sql:e=>`
        -- reports-storage-cache-hit-rate
SELECT
  timestamp_trunc(timestamp, hour) as timestamp,
  countif( h.cf_cache_status in ('HIT', 'STALE', 'REVALIDATED', 'UPDATING') ) as hit_count,
  countif( h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC') ) as miss_count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object') and r.method = 'GET'
  ${l(e,!1)}
group by timestamp
order by timestamp desc
`},topCacheMisses:{queryType:"logs",sql:e=>`
        -- reports-storage-top-cache-misses
SELECT
  r.path as path,
  r.search as search,
  count(id) as count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object')
  and r.method = 'GET'
  and h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
  ${l(e,!1)}
group by path, search
order by count desc
limit 12
    `}}},[r.QUERY_PERFORMANCE]:{title:"Query performance",queries:{mostFrequentlyInvoked:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-most-frequently-invoked
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
    statements.rows as rows_read,
    case 
      when (statements.shared_blks_hit + statements.shared_blks_read) > 0 
      then round(
        (statements.shared_blks_hit * 100.0) / 
        (statements.shared_blks_hit + statements.shared_blks_read), 
        2
      )
      else 0
    end as cache_hit_rate${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  ${t||""}
  ${s||"order by statements.calls desc"}
  limit 20`},mostTimeConsuming:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-most-time-consuming
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    coalesce(
      ((statements.total_exec_time + statements.total_plan_time) /
        nullif(sum(statements.total_exec_time + statements.total_plan_time) OVER(), 0)) *
        100,
      0
    ) as prop_total_time${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  ${t||""}
  ${s||"order by total_time desc"}
  limit 20`},slowestExecutionTime:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-slowest-execution-time
set search_path to public, extensions;

select
    auth.rolname,
    statements.query,
    statements.calls,
    -- -- Postgres 13, 14, 15
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.min_exec_time + statements.min_plan_time as min_time,
    statements.max_exec_time + statements.max_plan_time as max_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time,
    -- -- Postgres <= 12
    -- total_time,
    -- min_time,
    -- max_time,
    -- mean_time,
    coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows${a?`,
    case
      when (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
      then (
        select json_build_object(
          'has_suggestion', array_length(index_statements, 1) > 0,
          'startup_cost_before', startup_cost_before,
          'startup_cost_after', startup_cost_after,
          'total_cost_before', total_cost_before,
          'total_cost_after', total_cost_after,
          'index_statements', index_statements
        )
        from index_advisor(statements.query)
      )
      else null
    end as index_advisor_result`:""}
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  ${t||""}
  ${s||"order by max_time desc"}
  limit 20`},queryHitRate:{queryType:"db",sql:e=>`-- reports-query-performance-cache-and-index-hit-rate
select
    'index hit rate' as name,
    (sum(idx_blks_hit)) / nullif(sum(idx_blks_hit + idx_blks_read),0) as ratio
  from pg_statio_user_indexes
  union all
  select
    'table hit rate' as name,
    sum(heap_blks_hit) / nullif(sum(heap_blks_hit) + sum(heap_blks_read),0) as ratio
  from pg_statio_user_tables;`},unified:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-unified
        set search_path to public, extensions;

        with base as (
          select
            auth.rolname,
            statements.query,
            statements.calls,
            statements.total_exec_time + statements.total_plan_time as total_time,
            statements.min_exec_time + statements.min_plan_time as min_time,
            statements.max_exec_time + statements.max_plan_time as max_time,
            statements.mean_exec_time + statements.mean_plan_time as mean_time,
            coalesce(statements.rows::numeric / nullif(statements.calls, 0), 0) as avg_rows,
            statements.rows as rows_read,
            statements.shared_blks_hit as debug_hit,
            statements.shared_blks_read as debug_read,
            case
              when (statements.shared_blks_hit + statements.shared_blks_read) > 0
              then (statements.shared_blks_hit::numeric * 100.0) /
                   (statements.shared_blks_hit + statements.shared_blks_read)
              else 0
            end as cache_hit_rate,
            coalesce(
              ((statements.total_exec_time + statements.total_plan_time) /
                nullif(sum(statements.total_exec_time + statements.total_plan_time) OVER(), 0)) *
                100,
              0
            ) as prop_total_time
          from pg_stat_statements as statements
            inner join pg_authid as auth on statements.userid = auth.oid
          ${t||""}
          ${s||"order by total_time desc"}
          limit 50
        ),
        query_results as (
          select
            base.*${a?`,
            case
              when (lower(base.query) like 'select%' or lower(base.query) like 'with pgrst%')
              then (
                select json_build_object(
                  'has_suggestion', array_length(index_statements, 1) > 0,
                  'startup_cost_before', startup_cost_before,
                  'startup_cost_after', startup_cost_after,
                  'total_cost_before', total_cost_before,
                  'total_cost_after', total_cost_after,
                  'index_statements', index_statements
                )
                from index_advisor(base.query)
              )
              else null
            end as index_advisor_result`:""}
          from base
        )
        select *
        from query_results
        ${r&&a?"where (index_advisor_result->>'has_suggestion')::boolean = true":""}
        ${s||"order by total_time desc"}
        limit 20`},slowQueriesCount:{queryType:"db",sql:()=>`
        -- reports-query-performance-slow-queries-count
        set search_path to public, extensions;

        -- Count of slow queries (> 1 second average)
        SELECT count(*) as slow_queries_count
        FROM pg_stat_statements 
        WHERE statements.mean_exec_time > 1000;`},queryMetrics:{queryType:"db",sql:(e,t,s,a=!1,r=!1)=>`
        -- reports-query-performance-metrics
        set search_path to public, extensions;
      
        SELECT 
          COALESCE(ROUND(AVG(statements.rows::numeric / NULLIF(statements.calls, 0)), 1), 0) as avg_rows_per_call,
          COUNT(*) FILTER (WHERE statements.total_exec_time + statements.total_plan_time > 1000) as slow_queries,
          COALESCE(
            ROUND(
              SUM(statements.shared_blks_hit) * 100.0 / 
              NULLIF(SUM(statements.shared_blks_hit + statements.shared_blks_read), 0), 
              2
            ), 0
          ) || '%' as cache_hit_rate
        FROM pg_stat_statements as statements
        WHERE statements.calls > 0
        ${t||""}
        ${s||""}`}}},[r.DATABASE]:{title:"database",queries:{largeObjects:{queryType:"db",sql:e=>`-- reports-database-large-objects
SELECT
        SCHEMA_NAME,
        relname,
        table_size
      FROM
        (SELECT
          pg_catalog.pg_namespace.nspname AS SCHEMA_NAME,
          relname,
          pg_total_relation_size(pg_catalog.pg_class.oid) AS table_size
        FROM pg_catalog.pg_class
        JOIN pg_catalog.pg_namespace ON relnamespace = pg_catalog.pg_namespace.oid
        ) t
      WHERE SCHEMA_NAME NOT LIKE 'pg_%'
      ORDER BY table_size DESC
      LIMIT 5;`}}}};e.s(["DEFAULT_QUERY_PARAMS",0,n,"DEPRECATED_REPORTS",0,["total_realtime_ingress","total_rest_options_requests","total_auth_ingress","total_auth_get_requests","total_auth_post_requests","total_auth_patch_requests","total_auth_options_requests","total_storage_options_requests","total_storage_patch_requests","total_options_requests","total_rest_ingress","total_rest_get_requests","total_rest_post_requests","total_rest_patch_requests","total_rest_delete_requests","total_storage_get_requests","total_storage_post_requests","total_storage_delete_requests","total_auth_delete_requests","total_get_requests","total_patch_requests","total_post_requests","total_ingress","total_delete_requests"],"EDGE_FUNCTION_REGIONS",0,[{key:"ap-northeast-1",label:"Tokyo"},{key:"ap-northeast-2",label:"Seoul"},{key:"ap-south-1",label:"Mumbai"},{key:"ap-southeast-1",label:"Singapore"},{key:"ap-southeast-2",label:"Sydney"},{key:"ca-central-1",label:"Canada Central"},{key:"us-east-1",label:"N. Virginia"},{key:"us-west-1",label:"N. California"},{key:"us-west-2",label:"Oregon"},{key:"eu-central-1",label:"Frankfurt"},{key:"eu-west-1",label:"Ireland"},{key:"eu-west-2",label:"London"},{key:"eu-west-3",label:"Paris"},{key:"sa-east-1",label:"São Paulo"}],"LAYOUT_COLUMN_COUNT",0,2,"PRESET_CONFIG",0,c,"REPORTS_DATEPICKER_HELPERS",0,o,"REPORT_DATERANGE_HELPER_LABELS",()=>i,"generateRegexpWhere",0,l],820308)},749199,e=>{"use strict";var t=e.i(242882),s=e.i(820308),a=e.i(150671),r=e.i(714403),i=e.i(635494),o=e.i(189329);e.s(["default",0,({sql:e,params:n=s.DEFAULT_QUERY_PARAMS,where:l,orderBy:c})=>{let{data:u}=(0,i.useSelectedProjectQuery)(),d=(0,o.useDatabaseSelectorStateSnapshot)(),{data:m}=(0,a.useReadReplicasQuery)({projectRef:u?.ref}),p=(m||[]).find(e=>e.identifier===d.selectedDatabaseId)?.connectionString,f=d.selectedDatabaseId,h="function"==typeof e?e([]):e,{data:g,error:_,isPending:y,isRefetching:b,refetch:x}=(0,t.useQuery)({queryKey:["projects",u?.ref,"db",{...n,sql:h,identifier:f},l,c],queryFn:({signal:e})=>(0,r.executeSql)({projectRef:u?.ref,connectionString:p||u?.connectionString,sql:h},e).then(e=>e.result),enabled:!!h,refetchOnWindowFocus:!1,refetchOnReconnect:!1});return{error:_||("object"==typeof g?g?.error:""),data:g,isLoading:y,isRefetching:b,params:n,runQuery:x,resolvedSql:h}}])},870152,e=>{"use strict";var t=e.i(532480);e.s(["InfoIcon",()=>t.default])},744507,526038,282237,940336,e=>{"use strict";var t=e.i(102291);e.s(["BarChartIcon",()=>t.default],744507);var s=e.i(388019);let a=(0,s.default)("GitCommitHorizontal",[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["line",{x1:"3",x2:"9",y1:"12",y2:"12",key:"1dyftd"}],["line",{x1:"15",x2:"21",y1:"12",y2:"12",key:"oup4p8"}]]);e.s(["GitCommitHorizontalIcon",()=>a],526038);let r=(0,s.default)("SquareTerminal",[["path",{d:"m7 11 2-2-2-2",key:"1lz0vl"}],["path",{d:"M11 13h4",key:"1p7l4v"}],["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}]]);e.s(["SquareTerminal",()=>r],282237);var i=e.i(478902),o=e.i(55956),n=e.i(389959),l=e.i(751883),c=e.i(834869);let u=e=>String(e).includes("."),d=(e,t)=>{if(0===t)return String(Math.round(e));if(!u(e))return e.toLocaleString()+"."+"0".repeat(t);{let[s,a]=String(e).split(".");return Number(s).toLocaleString()+"."+a.slice(0,t)}};e.s(["numberFormatter",0,(e,t=2)=>u(e)?d(e,t):e.toLocaleString(),"precisionFormatter",0,d,"timestampFormatter",0,(e,t=c.DateTimeFormats.FULL,s=!1)=>s?o.default.utc(e).format(t):(0,o.default)(e).format(t),"useChartSize",0,(e="normal",t={tiny:76,small:96,normal:160,large:280})=>{let s=t[e];return{Container:(0,n.useMemo)(()=>({className:e,children:t})=>(0,i.jsx)(l.ResponsiveContainer,{className:e,height:s,minHeight:s,width:"100%",children:t}),[e]),minHeight:s}},"useStacked",0,({data:e,xAxisKey:t,yAxisKey:s,stackKey:a,variant:r="values"})=>{let i=(0,n.useMemo)(()=>e?Object.entries(e.reduce((e,r)=>{let i=r[t],o=r[s],n=r[a];return e[i]||(e[i]={}),e[i][n]=o,e},{})).map(([e,s])=>({...s,[t]:Number.isNaN(Number(e))?e:Number(e)})):[],[JSON.stringify(e)]),o=(0,n.useMemo)(()=>Object.keys(i[0]||{}).filter(e=>e!==t&&e!==s).sort(),[JSON.stringify(i[0]||{})]),l=(0,n.useMemo)(()=>{if("percentages"===r)return i.map(e=>{let t=Object.entries(e),s=t.filter(([e,t])=>o.includes(e)).reduce((e,[t,s])=>e+s,0);return t.reduce((e,[t,a])=>o.includes(t)?{...e,[t]:0!==a?a/s:0}:{...e,[t]:a},{})})},[JSON.stringify(i)]);return{dataKeys:o,stackedData:i,percentagesStackedData:l}}],940336)},150401,e=>{"use strict";var t=e.i(389959);let s="supabase-chart-hover-sync-enabled",a="supabase-chart-tooltip-sync-enabled",r={hoveredIndex:null,hoveredChart:null,syncHover:!0,syncTooltip:!0},i=new Set;try{{let e=localStorage.getItem(s),t=localStorage.getItem(a);null!==e&&(r.syncHover=JSON.parse(e)),null!==t&&(r.syncTooltip=JSON.parse(t))}}catch(e){console.warn("Failed to load chart sync settings from localStorage:",e)}function o(e){let t=r;if(r={...r,...e},void 0!==e.syncHover)try{localStorage.setItem(s,JSON.stringify(r.syncHover))}catch(e){console.warn("Failed to save chart hover sync setting to localStorage:",e)}if(void 0!==e.syncTooltip)try{localStorage.setItem(a,JSON.stringify(r.syncTooltip))}catch(e){console.warn("Failed to save chart tooltip sync setting to localStorage:",e)}JSON.stringify(t)!==JSON.stringify(r)&&i.forEach(e=>e(r))}function n(e){let[s,a]=(0,t.useState)(r);(0,t.useEffect)(()=>{let e=e=>{a(e)};return i.add(e),()=>{i.delete(e)}},[]);let n=(0,t.useCallback)(t=>{r.syncHover?o({hoveredIndex:t,hoveredChart:null!==t?e:null}):a(s=>({...s,hoveredIndex:t,hoveredChart:null!==t?e:null}))},[e]),l=(0,t.useCallback)(()=>{r.syncHover?o({hoveredIndex:null,hoveredChart:null}):a(e=>({...e,hoveredIndex:null,hoveredChart:null}))},[]),c=(0,t.useCallback)(e=>{o({syncHover:e,...!1===e&&{syncTooltip:!1}})},[]),u=(0,t.useCallback)(e=>{o({syncTooltip:e,...!0===e&&{syncHover:!0}})},[]),d=s.hoveredChart===e,m=s.syncHover&&null!==s.hoveredChart&&!d;return{hoveredIndex:m||d?s.hoveredIndex:null,syncHover:s.syncHover,syncTooltip:s.syncTooltip,hoveredChart:s.hoveredChart,setHover:n,clearHover:l,setSyncHover:c,setSyncTooltip:u,isHovered:null!==s.hoveredIndex&&(d||m),isCurrentChart:d}}e.s(["useChartHoverState",()=>n])},414833,682679,e=>{"use strict";var t=e.i(478902),s=e.i(536068),a=e.i(843778),r=e.i(55956),i=e.i(787845),o=e.i(744507),n=e.i(526038),l=e.i(870152),c=e.i(282237),u=e.i(215261),d=e.i(898452),m=e.i(389959);e.i(128328);var p=e.i(158639),f=e.i(215312),h=e.i(48189),g=e.i(940336),_=e.i(150401),y=e.i(252387),b=e.i(587433);let x=({format:e,highlightedValue:s,highlightedLabel:x,hideHighlightedValue:v=!1,hideHighlightedLabel:S=!1,hideHighlightArea:j=!1,title:A,minimalHeader:E=!1,hideChartType:k=!1,chartStyle:C="bar",onChartStyleChange:N,showMaxValue:T=!1,setShowMaxValue:w,docsUrl:I,syncId:R,data:q,xAxisKey:P,yAxisKey:O,xAxisIsDate:L=!0,displayDateInUtc:$,customDateFormat:D,valuePrecision:M=2,shouldFormatBytes:F=!1,isNetworkChart:U=!1,attributes:H,sql:B,titleTooltip:G,showNewBadge:z})=>{let{hoveredIndex:Y,isHovered:K,isCurrentChart:Q,setHover:W,clearHover:X}=(0,_.useChartHoverState)(R||"default"),[V,J]=(0,m.useState)(s),[Z,ee]=(0,m.useState)(x),{ref:et}=(0,p.useParams)();(0,d.useRouter)(),(0,m.useEffect)(()=>{if(R&&null!==Y&&K&&q&&P&&O){let e=q[Y];if(e){let t=e[O];if(H&&H.length>1){let s=H?.filter(e=>e.omitFromTotal||e.isMaxValue||"reference-line"===e.provider)?.map(e=>e.attribute)??[];t=Object.entries(e).filter(([e,t])=>"number"==typeof t&&"timestamp"!==e&&"period_start"!==e&&!s.includes(e)&&H.some(t=>t.attribute===e&&!1!==t.enabled)).reduce((e,[t,s])=>e+s,0)}J(t);let s=x;if(L&&e[P]){let t;s=(t=e[P],$?(0,r.default)(t).utc():(0,r.default)(t)).format(D||"YYYY-MM-DD HH:mm:ss")}else e[P]&&(s=e[P]);ee(s)}}else J(s),ee(x)},[Y,K,R,q,P,O,L,$,D,s,x,H]);let es=(0,t.jsxs)("div",{className:"flex flex-row items-center gap-x-2",children:[(0,t.jsxs)("div",{className:"flex flex-row items-center gap-x-2",children:[(0,t.jsx)("h3",{className:"text-foreground-lighter "+(E?"text-xs":"text-sm"),children:A}),G&&(0,t.jsx)(y.InfoTooltip,{children:G})]}),I&&(0,t.jsx)(f.ButtonTooltip,{type:"text",className:"px-1",asChild:!0,tooltip:{content:{side:"top",text:"Read docs"}},children:(0,t.jsx)(u.default,{href:I,target:"_blank",children:(0,t.jsx)(l.InfoIcon,{className:"w-4 h-4 text-foreground-lighter"})})})]}),ea=(0,t.jsx)("h4",{className:`text-foreground text-xl font-normal ${E?"text-base":"text-2xl"}`,children:void 0!==V&&(t=>{if("number"!=typeof t)return t;if("function"==typeof e)return e(t);if(F){let e=U?Math.abs(t):t;return(0,h.formatBytes)(e,M)}return(0,g.numberFormatter)(t,M)})(V)}),er=(0,t.jsx)("h4",{className:"text-foreground-lighter text-xs",children:Z});if(E)return(0,t.jsxs)("div",{className:(0,a.cn)("flex flex-row items-center gap-x-4",j&&"hidden"),style:{minHeight:"1.8rem"},children:[A&&es,(0,t.jsxs)("div",{className:"flex flex-row items-baseline gap-x-2",children:[void 0!==s&&!v&&ea,!S&&er]})]});let ei=void 0!==s&&!v;return(0,t.jsxs)("div",{className:(0,a.cn)("flex-grow flex justify-between items-start min-h-16",j&&"hidden"),children:[(0,t.jsxs)("div",{className:"flex flex-col",children:[(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[A&&es,z&&(0,t.jsx)(b.Badge,{variant:"success",children:"New"})]}),(0,t.jsxs)("div",{className:"h-4",children:[ei&&ea,!S&&er]})]}),(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[B?(0,t.jsx)(f.ButtonTooltip,{type:"default",className:"px-1.5",asChild:!0,tooltip:{content:{side:"top",text:"Open in Log Explorer"}},children:(0,t.jsx)(u.default,{href:`/project/${et}/logs/explorer?q=${encodeURIComponent(B)}`,children:(0,t.jsx)(c.SquareTerminal,{className:"w-4 h-4 text-foreground-lighter"})})}):null,!k&&N&&(0,t.jsx)(f.ButtonTooltip,{type:"default",className:"px-1.5",icon:"bar"===C?(0,t.jsx)(i.Activity,{}):(0,t.jsx)(o.BarChartIcon,{}),onClick:()=>N("bar"===C?"line":"bar"),tooltip:{content:{side:"top",text:`View as ${"bar"===C?"line chart":"bar chart"}`}}}),w&&(0,t.jsx)(f.ButtonTooltip,{type:T?"default":"dashed",className:"px-1.5",icon:(0,t.jsx)(n.GitCommitHorizontalIcon,{className:T?"text-foreground-light":"text-foreground-lighter"}),onClick:()=>w(!T),tooltip:{content:{side:"top",text:`${T?"Hide":"Show"} limit`}}})]})]})};e.s(["ChartHeader",0,x],682679),e.s(["default",0,({attribute:e,message:r="No data to show",description:i,format:o,className:n="",size:l,isFullHeight:c=!1,titleTooltip:u,hideTotalPlaceholder:d=!1})=>{let{minHeight:m}=(0,g.useChartSize)(l);return(0,t.jsxs)("div",{className:(0,a.cn)(c&&"h-full"),children:[void 0!==e&&(0,t.jsx)(x,{title:e,format:o,highlightedValue:d?void 0:0,titleTooltip:u}),(0,t.jsxs)("div",{className:(0,a.cn)("border-control flex flex-grow w-full flex-col items-center justify-center space-y-2 border border-dashed text-center",c&&"h-full",n),style:{minHeight:m+20},children:[(0,t.jsx)(s.BarChart2,{size:20,className:"text-border-stronger"}),(0,t.jsxs)("div",{className:"px-1",children:[(0,t.jsx)("p",{className:"text-foreground-light text-xs",children:r}),i&&(0,t.jsx)("p",{className:"text-foreground-lighter text-xs",children:i})]})]})]})}],414833)},886554,e=>{"use strict";var t=e.i(478902),s=e.i(389959),a=e.i(55956),r=e.i(151675),i=e.i(799108),o=e.i(942032),n=e.i(831266),l=e.i(30772),c=e.i(625198),u=e.i(214765),d=e.i(941327),m=e.i(834869),p=e.i(682679),f=e.i(940336),h=e.i(414833),g=e.i(150401);e.s(["default",0,({data:e,yAxisKey:_,xAxisKey:y,format:b,customDateFormat:x=m.DateTimeFormats.FULL,title:v,highlightedValue:S,highlightedLabel:j,displayDateInUtc:A,minimalHeader:E,valuePrecision:k,className:C="",size:N="normal",emptyStateMessage:T,onBarClick:w,showLegend:I=!1,xAxisIsDate:R=!0,XAxisProps:q,YAxisProps:P,showGrid:O=!1,syncId:L})=>{let{hoveredIndex:$,isHovered:D,isCurrentChart:M,setHover:F,clearHover:U}=(0,g.useChartHoverState)("default"),{Container:H}=(0,f.useChartSize)(N),[B,G]=(0,s.useState)(null),z=(0,s.useMemo)(()=>e.map(e=>({...e,[_]:"string"==typeof e[_]?Number(e[_]):e[_]})),[e,_]),Y=q||{interval:e.length-2,angle:0,tick:!1},K=P||{tickFormatter:e=>(0,f.numberFormatter)(e,k),tick:!1,width:0},Q=e=>A?(0,a.default)(e).utc():(0,a.default)(e),W=R?null!==B&&e&&void 0!==e[B]&&Q(e[B][y]).format(x)||j:B?e[B]?.[y]:j,X=null!==B?e[B]?.[_]:S;return 0===e.length?(0,t.jsx)(h.default,{message:T,description:"It may take up to 24 hours for data to refresh",size:N,className:C,attribute:v,format:b}):(0,t.jsxs)("div",{className:["flex flex-col gap-y-3",C].join(" "),children:[(0,t.jsx)(p.ChartHeader,{title:v,format:b,customDateFormat:x,highlightedValue:"number"==typeof X?(0,f.numberFormatter)(X,k):X,highlightedLabel:W,minimalHeader:E,syncId:L,data:e,xAxisKey:y,yAxisKey:_,xAxisIsDate:R,displayDateInUtc:A,valuePrecision:k,attributes:[]}),(0,t.jsx)(H,{children:(0,t.jsxs)(l.BarChart,{data:z,className:"overflow-visible",onMouseMove:e=>{e.activeTooltipIndex!==B&&G(e.activeTooltipIndex),F(e.activeTooltipIndex)},onMouseLeave:()=>{G(null),U()},onClick:e=>{let t=e?.activePayload?.[0]?.payload;w&&w(t,e)},children:[I&&(0,t.jsx)(n.Legend,{}),O&&(0,t.jsx)(i.CartesianGrid,{stroke:m.CHART_COLORS.AXIS}),(0,s.createElement)(d.YAxis,{...K,axisLine:{stroke:m.CHART_COLORS.AXIS},tickLine:{stroke:m.CHART_COLORS.AXIS},key:_}),(0,s.createElement)(u.XAxis,{...Y,axisLine:{stroke:m.CHART_COLORS.AXIS},tickLine:{stroke:m.CHART_COLORS.AXIS},key:y}),(0,t.jsx)(c.Tooltip,{content:s=>L&&D&&M&&null!==$?(0,t.jsxs)("div",{className:"bg-black/90 text-white p-2 rounded text-xs",children:[(0,t.jsx)("div",{className:"font-medium",children:(0,a.default)(e[$]?.[y]).format(x)}),(0,t.jsxs)("div",{children:[(0,f.numberFormatter)(Number(e[$]?.[_])||0,k),"string"==typeof b?b:""]})]}):null}),(0,t.jsx)(r.Bar,{dataKey:_,fill:m.CHART_COLORS.GREEN_1,animationDuration:300,maxBarSize:48,children:e?.map((e,s)=>(0,t.jsx)(o.Cell,{className:`transition-all duration-300 ${w?"cursor-pointer":""}`,fill:B===s||null===B?m.CHART_COLORS.GREEN_1:m.CHART_COLORS.GREEN_2,enableBackground:12},`cell-${s}`))})]})}),e&&(0,t.jsxs)("div",{className:"text-foreground-lighter -mt-9 flex items-center justify-between text-xs",children:[(0,t.jsx)("span",{children:R?Q(e[0][y]).format(x):e[0][y]}),(0,t.jsx)("span",{children:R?Q(e[e?.length-1]?.[y]).format(x):e[e?.length-1]?.[y]})]})]})}])},669653,e=>{"use strict";var t=e.i(867088),s=e.i(234745),a=e.i(718727);async function r({projectRef:e,type:t,name:a,limit:r=10,sort:i,cursor:o},n){if(void 0===e)throw Error("projectRef is required for getContent");let{data:l,error:c}=await (0,s.get)("/platform/projects/{ref}/content",{params:{path:{ref:e},query:{type:t,name:a,sort_by:i,limit:r.toString(),cursor:o}},signal:n});return c&&(0,s.handleError)(c),{cursor:l.cursor,content:l.data}}e.s(["useContentInfiniteQuery",0,({projectRef:e,type:s,name:i,limit:o,sort:n},{enabled:l=!0,...c}={})=>(0,t.useInfiniteQuery)({queryKey:a.contentKeys.infiniteList(e,{type:s,name:i,limit:o,sort:n}),queryFn:({signal:t,pageParam:a})=>r({projectRef:e,type:s,name:i,limit:o,sort:n,cursor:a},t),enabled:l&&void 0!==e,initialPageParam:void 0,getNextPageParam:e=>e.cursor,...c})])},830734,e=>{"use strict";let t=(0,e.i(388019).default)("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);e.s(["default",()=>t])},853322,e=>{"use strict";var t=e.i(242882),s=e.i(234745),a=e.i(718727);async function r({projectRef:e,id:t},a){if(void 0===e)throw Error("projectRef is required");if(void 0===t)throw Error("Content ID is required");let{data:r,error:i}=await (0,s.get)("/platform/projects/{ref}/content/item/{id}",{params:{path:{ref:e,id:t}},signal:a});if(i)throw(0,s.handleError)(i);return r}e.s(["getContentById",()=>r,"useContentIdQuery",0,({projectRef:e,id:s},{enabled:i=!0,...o}={})=>(0,t.useQuery)({queryKey:a.contentKeys.resource(e,s),queryFn:({signal:t})=>r({projectRef:e,id:s},t),enabled:i&&void 0!==e&&void 0!==s,...o})])},951684,e=>{"use strict";let t=(0,e.i(388019).default)("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);e.s(["default",()=>t])},300906,e=>{"use strict";var t=e.i(951684);e.s(["GitBranch",()=>t.default])},364850,e=>{"use strict";var t=e.i(867088),s=e.i(234745),a=e.i(718727);async function r({projectRef:e,cursor:t,sort:a,name:r},i){if(void 0===e)throw Error("projectRef is required");let{data:o,error:n}=await (0,s.get)("/platform/projects/{ref}/content/folders",{params:{path:{ref:e},query:{type:"sql",cursor:t,limit:"100",sort_by:a,sort_order:"name"===a?"asc":"desc",name:r,visibility:"user"}},signal:i});return n&&(0,s.handleError)(n),{...o.data,cursor:o.cursor}}e.s(["SNIPPET_PAGE_LIMIT",0,100,"useSQLSnippetFoldersQuery",0,({projectRef:e,name:s,sort:i},{enabled:o=!0,...n}={})=>(0,t.useInfiniteQuery)({queryKey:a.contentKeys.folders(e,{name:s,sort:i}),queryFn:({signal:t,pageParam:a})=>r({projectRef:e,cursor:a,name:s,sort:i},t),enabled:o&&void 0!==e,initialPageParam:void 0,getNextPageParam:e=>e.cursor,...n})])},624982,e=>{"use strict";var t=e.i(91810);e.s(["CheckCircle2",()=>t.default])},876553,(e,t,s)=>{var a=e.r(525853),r=e.r(587250),i=Object.prototype.hasOwnProperty;t.exports=r(function(e,t,s){i.call(e,s)?e[s].push(t):a(e,s,[t])})},3251,e=>{"use strict";var t=e.i(478902);e.i(481541);var s=e.i(755191),a=e.i(360765),r=e.i(499536),i=e.i(215119),i=i,o=e.i(900114),o=o,n=e.i(830734),n=n,l=e.i(489084),l=l;let c={API:{label:"All API usage",icon:e=>(0,t.jsx)(i.default,{size:16,className:e}),key:"api"},API_DATABASE:{label:"Database API",icon:e=>(0,t.jsx)(o.default,{size:16,className:e}),key:"api_database"},API_AUTH:{label:"Authentication",icon:e=>(0,t.jsx)(s.Auth,{size:16,className:e}),key:"api_auth"},API_STORAGE:{label:"Storage",icon:e=>(0,t.jsx)(r.Storage,{size:16,className:e}),key:"api_storage"},API_REALTIME:{label:"Realtime",icon:e=>(0,t.jsx)(a.Realtime,{size:16,className:e}),key:"api_realtime"},INSTANCE:{label:"Instance health",icon:e=>(0,t.jsx)(n.default,{size:16,className:e}),key:"instance"},SUPAVISOR:{label:"Supavisor",icon:e=>(0,t.jsx)(l.default,{size:16,className:e}),key:"supavisor"}},u=[{key:"avg_cpu_usage",label:"Average CPU % Usage",provider:"infra-monitoring",category:c.INSTANCE},{key:"max_cpu_usage",label:"Max CPU % Usage",provider:"infra-monitoring",category:c.INSTANCE},{key:"disk_io_consumption",label:"Disk IO % Consumed",provider:"infra-monitoring",category:c.INSTANCE},{key:"disk_io_budget",label:"Disk IO % Remaining",provider:"infra-monitoring",category:c.INSTANCE},{key:"ram_usage",label:"Memory % Usage",provider:"infra-monitoring",category:c.INSTANCE},{key:"total_realtime_egress",label:"Realtime Connection Egress",provider:"daily-stats",category:c.API},{key:"total_realtime_requests",label:"Realtime Connection Requests",provider:"daily-stats",category:c.API_REALTIME},{key:"total_realtime_ingress",label:"Realtime Connection Ingress",provider:"daily-stats",category:c.API_REALTIME},{key:"total_rest_ingress",label:"API Ingress",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_egress",label:"API Egress",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_requests",label:"API Requests",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_get_requests",label:"API GET Requests",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_post_requests",label:"API POST Requests",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_patch_requests",label:"API PATCH Requests",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_delete_requests",label:"API DELETE Requests",provider:"daily-stats",category:c.API_DATABASE},{key:"total_rest_options_requests",label:"API OPTIONS Requests",provider:"daily-stats",category:c.API_DATABASE},{key:"total_auth_billing_period_mau",label:"Auth Monthly Active User",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_billing_period_sso_mau",label:"Auth Monthly Active SSO User",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_ingress",label:"Auth Ingress",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_egress",label:"Auth Egress",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_requests",label:"Auth Requests",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_get_requests",label:"Auth GET Requests",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_post_requests",label:"Auth POST Requests",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_patch_requests",label:"Auth PATCH Requests",provider:"daily-stats",category:c.API_AUTH},{key:"total_auth_options_requests",label:"Auth OPTIONS Requests",provider:"daily-stats",category:c.API_AUTH},{key:"total_storage_ingress",label:"Storage Ingress",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_egress",label:"Storage Egress",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_image_render_count",label:"Storage Image Transformations",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_requests",label:"Storage Requests",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_get_requests",label:"Storage GET Requests",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_post_requests",label:"Storage POST Requests",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_delete_requests",label:"Storage DELETE Requests",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_options_requests",label:"Storage OPTIONS Requests",provider:"daily-stats",category:c.API_STORAGE},{key:"total_auth_delete_requests",label:"Auth DELETE Requests",provider:"daily-stats",category:c.API_AUTH},{key:"total_egress",label:"All Egress",provider:"daily-stats",category:c.API},{key:"total_get_requests",label:"All GET Requests",provider:"daily-stats",category:c.API},{key:"total_cached_egress",label:"All Cached Egress",provider:"daily-stats",category:c.API_STORAGE},{key:"total_storage_patch_requests",label:"Storage PATCH Requests",provider:"daily-stats",category:c.API_STORAGE},{key:"total_requests",label:"All Requests",provider:"daily-stats",category:c.API},{key:"total_patch_requests",label:"All PATCH Requests",provider:"daily-stats",category:c.API},{key:"total_post_requests",label:"All POST Requests",provider:"daily-stats",category:c.API},{key:"total_ingress",label:"All Ingress",provider:"daily-stats",category:c.API},{key:"total_delete_requests",label:"All DELETE Requests",provider:"daily-stats",category:c.API},{key:"total_options_requests",label:"All OPTIONS Requests",provider:"daily-stats",category:c.API},{key:"total_supavisor_egress_bytes",label:"Shared Pooler Egress",provider:"daily-stats",category:c.SUPAVISOR}];e.s(["METRICS",0,u,"METRIC_CATEGORIES",0,c,"TIME_PERIODS_BILLING",0,[{key:"currentBillingCycle",label:"Current billing cycle",interval:"1d"},{key:"previousBillingCycle",label:"Previous billing cycle",interval:"1d"}],"TIME_PERIODS_REPORTS",0,[{key:"7d",label:"Last 7 days",interval:"1d"},{key:"30d",label:"Last 30 days",interval:"1d"},{key:"startMonth",label:"This month",interval:"1d"}]],3251)},471880,e=>{"use strict";let t=(0,e.i(388019).default)("DatabaseBackup",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 12a9 3 0 0 0 5 2.69",key:"1ui2ym"}],["path",{d:"M21 9.3V5",key:"6k6cib"}],["path",{d:"M3 5v14a9 3 0 0 0 6.47 2.88",key:"i62tjy"}],["path",{d:"M12 12v4h4",key:"1bxaet"}],["path",{d:"M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16",key:"1f4ei9"}]]);e.s(["DatabaseBackup",()=>t],471880)},685509,e=>{"use strict";var t=e.i(242882),s=e.i(234745),a=e.i(635494),r=e.i(246230);async function i({projectRef:e},t){if(!e)throw Error("Project ref is required");let{data:a,error:r}=await (0,s.get)("/platform/database/{ref}/backups",{params:{path:{ref:e}},signal:t});return r&&(0,s.handleError)(r),a}e.s(["useBackupsQuery",0,({projectRef:e},{enabled:s=!0,...o}={})=>{let n=(0,a.useIsOrioleDbInAws)();return(0,t.useQuery)({queryKey:r.databaseKeys.backups(e),queryFn:({signal:t})=>i({projectRef:e},t),enabled:s&&!n&&void 0!==e,...o})}])},965371,871895,e=>{"use strict";e.i(10429);var t=e.i(837508);function s(e){switch(e){case t.PROVIDERS.AWS.id:return"ARM";case t.PROVIDERS.FLY.id:return"x86 64-bit";default:return""}}e.s(["getCloudProviderArchitecture",()=>s],965371);var a=e.i(478902),r=e.i(843778);function i({infraComputeSize:e,className:t,...s}){let i=e?.toLocaleLowerCase()==="micro"||e?.toLocaleLowerCase()==="nano",o=!!e;return(0,a.jsx)("div",{className:(0,r.cn)("inline-flex items-center justify-center rounded-md text-center font-mono uppercase","whitespace-nowrap font-medium tracking-[0.06em] text-[11px] leading-[1.1] px-[5.5px] py-[3px]","transition-all",o?i?"bg-surface-75 text-foreground-light border border-strong bg-opacity-50":"bg-brand bg-opacity-10 text-brand-600 border border-brand-500":"bg-surface-75 text-foreground-light border border-strong","group-data-[state=open]:bg-opacity-20 group-data-[state=open]:ring-2 group-data-[state=open]:ring-opacity-20",i?"group-data-[state=open]:ring-foreground-muted group-data-[state=open]:bg-opacity-75":"group-data-[state=open]:ring-brand",t),...s,children:e})}e.s(["ComputeBadge",()=>i],871895)},297306,e=>{"use strict";var t=e.i(478902),s=e.i(215261),a=e.i(389959),r=e.i(743371),i=e.i(540203),o=e.i(144676),n=e.i(965371);e.i(10429);var l=e.i(837508),c=e.i(837710),u=e.i(71049),d=e.i(479095),m=e.i(871895),p=e.i(108151);let f=({label:e,stat:s})=>(0,t.jsxs)("div",{className:"flex flex-row gap-2",children:[(0,t.jsx)("span",{className:"text-sm text-foreground-light w-16",children:e}),(0,t.jsx)("span",{className:"text-sm",children:s})]});e.s(["ComputeBadgeWrapper",0,({slug:e,projectRef:h,cloudProvider:g,computeSize:_})=>{let[y,b]=(0,a.useState)(!1),x=(0,n.getCloudProviderArchitecture)(g),{data:v,isPending:S}=(0,o.useProjectAddonsQuery)({projectRef:h},{enabled:y}),j=v?.selected_addons??[],{computeInstance:A}=(0,r.getAddons)(j),E=A?.variant?.meta,k=void 0===E&&"micro"===_?l.INSTANCE_MICRO_SPECS:E,C=v?.available_addons.find(e=>"Compute Instance"===e.name)?.variants,N=C?.[C.length-1].identifier,T=_===N?.replace("ci_",""),{data:w,isPending:I}=(0,i.useOrgSubscriptionQuery)({orgSlug:e},{enabled:y}),R=w?.plan.id!=="free"&&"nano"===_;return _?(0,t.jsxs)(u.HoverCard,{onOpenChange:()=>b(!y),openDelay:280,children:[(0,t.jsx)(u.HoverCardTrigger,{asChild:!0,className:"group",onClick:e=>e.stopPropagation(),children:(0,t.jsx)("div",{className:"flex items-center",children:(0,t.jsx)(m.ComputeBadge,{infraComputeSize:_})})}),(0,t.jsxs)(u.HoverCardContent,{side:"bottom",align:"start",className:"p-0 overflow-hidden w-96",onClick:e=>e.stopPropagation(),children:[(0,t.jsx)("div",{className:"p-2 px-5 text-xs text-foreground-lighter",children:"Compute size"}),(0,t.jsx)(d.Separator,{}),(0,t.jsxs)("div",{className:"p-3 px-5 flex flex-row gap-4",children:[(0,t.jsx)("div",{children:(0,t.jsx)(m.ComputeBadge,{infraComputeSize:_})}),(0,t.jsx)("div",{className:"flex flex-col gap-4",children:S||I?(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,t.jsx)(p.ShimmeringLoader,{className:"h-[20px] py-0 w-32"}),(0,t.jsx)(p.ShimmeringLoader,{className:"h-[20px] py-0 w-32"})]})}):(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"flex flex-col gap-1",children:void 0!==k?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f,{label:"CPU",stat:`${k.cpu_cores??"?"}-core ${x} ${k.cpu_dedicated?"(Dedicated)":"(Shared)"}`}),(0,t.jsx)(f,{label:"Memory",stat:`${k.memory_gb??"-"} GB`})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(f,{label:"CPU",stat:"Shared"}),(0,t.jsx)(f,{label:"Memory",stat:"Up to 0.5 GB"})]})})})})]}),(!T||R)&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(d.Separator,{}),(0,t.jsxs)("div",{className:"p-3 px-5 text-sm flex flex-col gap-2 bg-studio",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-0",children:[(0,t.jsx)("p",{className:"text-foreground",children:R?"Free upgrade to Micro available":"Unlock more compute"}),(0,t.jsx)("p",{className:"text-foreground-light",children:R?"Paid plans include a free upgrade to Micro compute.":"Scale your project up to 64 cores and 256 GB RAM."})]}),(0,t.jsx)("div",{children:(0,t.jsx)(c.Button,{asChild:!0,type:"default",htmlType:"button",role:"button",children:(0,t.jsx)(s.default,{href:`/project/${h}/settings/compute-and-disk`,children:"Upgrade compute"})})})]})]})]})]}):null}])},42081,e=>{"use strict";let t="undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__;e.s(["DEBUG_BUILD",()=>t])},993720,e=>{"use strict";var t=e.i(242882),s=e.i(714403),a=e.i(246230);async function r({projectRef:e,connectionString:t},a){try{let{result:r}=await (0,s.executeSql)({projectRef:e,connectionString:t,sql:`
    select
      *
    from supabase_migrations.schema_migrations sm
    order by sm.version desc
  `.trim(),queryKey:["migrations"]},a);return r}catch(e){if(e.message.includes('relation "supabase_migrations.schema_migrations" does not exist'))return[];throw e}}e.s(["useMigrationsQuery",0,({projectRef:e,connectionString:s},{enabled:i=!0,...o}={})=>(0,t.useQuery)({queryKey:a.databaseKeys.migrations(e),queryFn:({signal:t})=>r({projectRef:e,connectionString:s},t),enabled:i&&void 0!==e,...o})])},745457,e=>{"use strict";var t=e.i(55956);function s(e){if(!e||!/^\d{14}$/.test(e))return;let s=(0,t.default)(e,"YYYYMMDDHHmmss",!0);return s.isValid()?s:void 0}e.s(["parseMigrationVersion",()=>s])},672296,e=>{"use strict";function t(e){return e.split("#")[0]}function s(e,t={}){let{maxDepth:a=3,redaction:r="[REDACTED]",truncationNotice:i="[REDACTED: max depth reached]",sensitiveKeys:o=[]}=t,n=new Set(["password","passwd","pwd","pass","secret","token","id_token","access_token","refresh_token","apikey","api_key","api-key","apiKey","key","privatekey","private_key","client_secret","clientSecret","auth","authorization","ssh_key","sshKey","bearer","session","cookie","csrf","xsrf","ip","ip_address","ipAddress","aws_access_key_id","aws_secret_access_key","gcp_service_account_key",...o].map(e=>e.toLowerCase())),l=[{re:/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g,reason:"ip"},{re:/\b(?:[A-Fa-f0-9]{1,4}:){2,7}[A-Fa-f0-9]{1,4}\b/g,reason:"ip6"},{re:/\b(AKI|ASI)A[0-9A-Z]{16}\b/g,reason:"aws_access_key_id"},{re:/\b[0-9A-Za-z/+]{40}\b/g,reason:"aws_secret_access_key_like"},{re:/\bBearer\s+[A-Za-z0-9\-._~+/]+=*\b/g,reason:"bearer"},{re:/\b[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\.[A-Za-z0-9-_]+?\b/g,reason:"jwt_like"},{re:/\b[A-Za-z0-9_\-]{24,64}\b/g,reason:"long_token"}],c=new WeakMap;function u(e){let t=e;for(let{re:e}of l)t=t.replace(e,r);return t}function d(e){return n.has(String(e).toLowerCase())}return e.map(e=>(function e(t,s){if(null==t||"number"==typeof t||"boolean"==typeof t||"bigint"==typeof t)return t;if("string"==typeof t)return u(t);if("function"==typeof t)return"[Function]";if(t instanceof Date)return t.toISOString();if(t instanceof RegExp)return t.toString();if(ArrayBuffer.isView(t)&&!(t instanceof DataView))return`[TypedArray byteLength=${t.byteLength}]`;if(t instanceof ArrayBuffer)return`[ArrayBuffer byteLength=${t.byteLength}]`;if(s>=a)return i;if("object"==typeof t){if(c.has(t))return"[Circular]";if(Array.isArray(t)){let a=[];c.set(t,a);for(let r=0;r<t.length;r++)a[r]=e(t[r],s+1);return a}if(function(e){if(null===e||"object"!=typeof e)return!1;let t=Object.getPrototypeOf(e);return t===Object.prototype||null===t}(t)){let a={};for(let[i,o]of(c.set(t,a),Object.entries(t)))d(i)?a[i]=r:a[i]=e(o,s+1);return a}if(t instanceof Map){let a=[];for(let[i,o]of(c.set(t,a),t.entries())){let t=d(i)?r:e(i,s+1),n=d(i)?r:e(o,s+1);a.push([t,n])}return a}if(t instanceof Set){let a=[];for(let r of(c.set(t,a),t.values()))a.push(e(r,s+1));return a}if(t instanceof URL)return t.toString();if(t instanceof Error){let e={name:t.name,message:u(t.message),stack:i};return c.set(t,e),e}try{return u(String(t))}catch{return u(Object.prototype.toString.call(t))}}return u(String(t))})(e,0))}e.s(["sanitizeArrayOfObjects",()=>s,"sanitizeUrlHashParams",()=>t])},432639,e=>{"use strict";let t=(0,e.i(388019).default)("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);e.s(["UserPlus",()=>t],432639)},360608,e=>{"use strict";var t=e.i(899850),s=e.i(959076),a=e.i(479084),r=e.i(242882),i=e.i(714403),o=e.i(294285);async function n({projectRef:e,connectionString:r,keywords:o,filter:n,providers:l,forceExactCount:c,column:u},d){let m=(({filter:e,keywords:r,providers:i,forceExactCount:o=!1,column:n})=>{let l=r&&""!==r,c=[],u="select count(*) from auth.users";if(n&&l){if("email"===n){let e=(0,s.stringRange)(r),t=(0,a.literal)(e[0]),i=e[1]?(0,a.literal)(e[1]):null;c.push(`lower(email) >= ${t}${i?` and lower(email) < ${i}`:""} and instance_id = '00000000-0000-0000-0000-000000000000'::uuid`)}else if("phone"===n){let e=(0,s.stringRange)(r),t=(0,a.literal)(e[0]),i=e[1]?(0,a.literal)(e[1]):null;c.push(`phone >= ${t}${i?` and phone < ${i}`:""}`)}else if("id"===n){let e=(0,s.prefixToUUID)(r,!1);if(e===r)c.push(`id = ${(0,a.literal)(r)}`);else{let t=(0,s.prefixToUUID)(r,!0);c.push(`id >= ${(0,a.literal)(e)} and id < ${(0,a.literal)(t)}`)}}}else{if(l){let e=(0,a.literal)(`%${r}%`);c.push(`id::text ilike ${e} or email ilike ${e} or phone ilike ${e}`)}if("verified"===e?c.push("email_confirmed_at IS NOT NULL or phone_confirmed_at IS NOT NULL"):"anonymous"===e?c.push("is_anonymous is true"):"unverified"===e&&c.push("email_confirmed_at IS NULL AND phone_confirmed_at IS NULL"),i&&i.length>0)if(i.includes("saml 2.0")){let e=i.map(e=>"saml 2.0"===e?"sso":e);c.push(`(select jsonb_agg(case when value ~ '^sso' then 'sso' else value end) from jsonb_array_elements_text((raw_app_meta_data ->> 'providers')::jsonb)) ?| array[${(0,a.literal)(e)}]`.trim())}else c.push(`(raw_app_meta_data->>'providers')::jsonb ?| array[${(0,a.literal)(i)}]`)}let d=c.map(e=>`(${e})`).join(" and "),m=c.length>0?` where ${d}`:"";if(o)return`select (${u}${m}), false as is_estimate;`;{let e=`select * from auth.users${m}`,s=`${u}${m}`,r=(0,a.literal)(e);return`
${t.COUNT_ESTIMATE_SQL}

with approximation as (select reltuples as estimate from pg_class where oid = 'auth.users'::regclass)
select 
  case 
    when estimate = -1 then (select pg_temp.count_estimate(${r}))::int
    when estimate > ${t.THRESHOLD_COUNT} then ${c.length>0?`(select pg_temp.count_estimate(${r}))::int`:"estimate::int"}
    else (${s})
  end as count,
  estimate = -1 or estimate > ${t.THRESHOLD_COUNT} as is_estimate
from approximation;
`.trim()}})({filter:n,keywords:o,providers:l,forceExactCount:c,column:u}),{result:p}=await (0,i.executeSql)({projectRef:e,connectionString:r,sql:m,queryKey:["users-count"]},d),f=p?.[0]?.count,h=p?.[0]?.is_estimate;if("number"!=typeof f)throw Error("Error fetching users count");return{count:f,is_estimate:h??!0}}e.s(["useUsersCountQuery",0,({projectRef:e,connectionString:t,keywords:s,filter:a,providers:i,forceExactCount:l,column:c},{enabled:u=!0,...d}={})=>(0,r.useQuery)({queryKey:o.authKeys.usersCount(e,{keywords:s,filter:a,providers:i,forceExactCount:l,column:c}),queryFn:({signal:r})=>n({projectRef:e,connectionString:t,keywords:s,filter:a,providers:i,forceExactCount:l,column:c},r),enabled:u&&void 0!==e,...d})],360608)},363246,e=>{"use strict";var t=e.i(478902),s=e.i(938933),a=e.i(843778);let r=(0,e.i(389959).createContext)({contextSize:"small",className:""});e.s(["default",0,function({className:e,size:i,type:o="Mail",color:n,strokeWidth:l,fill:c,stroke:u,background:d,src:m,icon:p,...f}){let h=(0,s.default)("icon");return(0,t.jsx)(r.Consumer,{children:({contextSize:s,className:r})=>{let o={tiny:14,small:18,medium:20,large:20,xlarge:24,xxlarge:30,xxxlarge:42},g=o.large,_=21;s&&(_=s?"string"==typeof s?o[s]:s:g),i&&(_=i?"string"==typeof i?o[i]:i:g);let y=!n&&!c&&!u,b=["sbui-icon",e];r&&b.push(r);let x=m?(0,t.jsx)("div",{className:"relative",style:{width:_+"px",height:_+"px"},children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",color:y?"currentColor":n,fill:y?"none":c||"none",stroke:y?"currentColor":u,className:(0,a.cn)(b),width:"100%",height:"100%",strokeWidth:l??void 0,...f,children:m})}):(0,t.jsx)(p,{color:y?"currentColor":n,stroke:y?"currentColor":u,className:(0,a.cn)(b),strokeWidth:l,size:_,fill:y?"none":c||"none",...f});return d?(0,t.jsx)("div",{className:h.container,children:x}):x}})}],363246)},721704,e=>{"use strict";var t=e.i(478902),s=e.i(363246);let a=(0,t.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M13.5447 3.01094C12.5249 2.54302 11.4313 2.19828 10.2879 2.00083C10.2671 1.99702 10.2463 2.00654 10.2356 2.02559C10.0949 2.27573 9.93921 2.60206 9.83011 2.85856C8.60028 2.67444 7.3768 2.67444 6.17222 2.85856C6.06311 2.59636 5.90166 2.27573 5.76038 2.02559C5.74966 2.00717 5.72887 1.99765 5.70803 2.00083C4.56527 2.19764 3.47171 2.54239 2.45129 3.01094C2.44246 3.01475 2.43488 3.0211 2.42986 3.02935C0.355594 6.12826 -0.212633 9.151 0.06612 12.1362C0.067381 12.1508 0.0755799 12.1648 0.0869319 12.1737C1.45547 13.1787 2.78114 13.7889 4.08219 14.1933C4.10301 14.1996 4.12507 14.192 4.13832 14.1749C4.44608 13.7546 4.72043 13.3114 4.95565 12.8454C4.96953 12.8181 4.95628 12.7857 4.92791 12.7749C4.49275 12.6099 4.0784 12.4086 3.67982 12.18C3.64829 12.1616 3.64577 12.1165 3.67477 12.095C3.75865 12.0321 3.84255 11.9667 3.92264 11.9007C3.93713 11.8886 3.95732 11.8861 3.97435 11.8937C6.59287 13.0892 9.42771 13.0892 12.0153 11.8937C12.0323 11.8854 12.0525 11.888 12.0677 11.9C12.1478 11.9661 12.2316 12.0321 12.3161 12.095C12.3451 12.1165 12.3433 12.1616 12.3117 12.18C11.9131 12.413 11.4988 12.6099 11.063 12.7743C11.0346 12.7851 11.022 12.8181 11.0359 12.8454C11.2762 13.3108 11.5505 13.7539 11.8526 14.1742C11.8652 14.192 11.8879 14.1996 11.9087 14.1933C13.2161 13.7889 14.5417 13.1787 15.9103 12.1737C15.9223 12.1648 15.9298 12.1515 15.9311 12.1369C16.2647 8.6856 15.3723 5.68765 13.5655 3.02998C13.5611 3.0211 13.5535 3.01475 13.5447 3.01094ZM5.34668 10.3185C4.55833 10.3185 3.90876 9.59478 3.90876 8.70593C3.90876 7.81707 4.54574 7.09331 5.34668 7.09331C6.15393 7.09331 6.79722 7.82342 6.7846 8.70593C6.7846 9.59478 6.14762 10.3185 5.34668 10.3185ZM10.6632 10.3185C9.87481 10.3185 9.22527 9.59478 9.22527 8.70593C9.22527 7.81707 9.86221 7.09331 10.6632 7.09331C11.4704 7.09331 12.1137 7.82342 12.1011 8.70593C12.1011 9.59478 11.4704 10.3185 10.6632 10.3185Z",fill:"currentColor"});e.s(["default",0,function(e){return(0,t.jsx)(s.default,{src:a,stroke:"none",...e})}])},795019,e=>{"use strict";var t=e.i(721704);e.s(["IconDiscord",()=>t.default])},238411,e=>{"use strict";var t=e.i(478902),s=e.i(242882),a=e.i(975924),r=e.i(389959),i=e.i(355901);e.i(128328);var o=e.i(158639),n=e.i(215312),l=e.i(344616),c=e.i(853322),u=e.i(150671),d=e.i(714403),m=e.i(21150),p=e.i(189329),f=e.i(820308),h=e.i(55956),g=e.i(898452),_=e.i(462273),y=e.i(414833),b=e.i(147545),x=e.i(193),v=e.i(642184),S=e.i(3251),j=e.i(787845),A=e.i(744507),E=e.i(774803),k=e.i(151675),C=e.i(30772),N=e.i(799108),T=e.i(363269),w=e.i(948610),I=e.i(214765),R=e.i(941327),q=e.i(451711),P=(0,w.generateCategoricalChart)({chartName:"LineChart",GraphicalChild:T.Line,axisComponents:[{axisType:"xAxis",AxisComp:I.XAxis},{axisType:"yAxis",AxisComp:R.YAxis}],formatAxisMap:q.formatAxisMap}),O=e.i(877555);let L={max_cpu_usage:{check:"gt",warning:75,danger:90},avg_cpu_usage:{check:"gt",warning:75,danger:90},ram_usage:{check:"gt",warning:75,danger:90},disk_io_consumption:{check:"gt",warning:75,danger:90},disk_io_budget:{check:"lt",warning:25,danger:10}};var $=e.i(989525);let D=({label:e,attribute:s,provider:a,startDate:i,endDate:o,interval:l="1d",defaultChartStyle:c="bar",isLoading:u=!1,actions:d,maxHeight:m,onUpdateChartConfig:f})=>{let{ref:w}=(0,g.useRouter)().query,q=(0,p.useDatabaseSelectorStateSnapshot)(),[D,M]=(0,r.useState)(c),[F,U]=(0,r.useState)(),H=q.selectedDatabaseId,{data:B,isFetching:G,isPending:z}=(0,v.useProjectDailyStatsQuery)({projectRef:w,attribute:s,startDate:(0,h.default)(i).format("YYYY-MM-DD"),endDate:(0,h.default)(o).format("YYYY-MM-DD")},{enabled:"daily-stats"===a}),{data:Y,isFetching:K,isPending:Q}=(0,x.useInfraMonitoringAttributesQuery)({projectRef:w,attributes:[s],startDate:i,endDate:o,interval:l,databaseIdentifier:H},{enabled:"infra-monitoring"===a}),W=(0,r.useMemo)(()=>{if(Y)return(0,b.mapMultiResponseToAnalyticsData)(Y,[s])[s]},[Y,s]),X="infra-monitoring"===a?W:"daily-stats"===a?B:void 0,V=u||s.startsWith("new_snippet_")||("infra-monitoring"===a?Q:"daily-stats"===a?z:u),J=S.METRICS.find(e=>e.key===s),Z=J?.label??s,ee=X?.format==="%",et=(X?.data??[]).map(e=>{var t;let a,r=e[s],i=(t=e[s],(a=L[s])?"gt"===a.check?t>=a.danger?"hsl(var(--chart-destructive))":t>=a.warning?"hsl(var(--chart-warning))":"hsl(var(--chart-1))":t<=a.danger?"hsl(var(--chart-destructive))":t<=a.warning?"hsl(var(--chart-warning))":"hsl(var(--chart-1))":"hsl(var(--chart-1))");return{...e,period_start:(0,h.default)(e.period_start).utc().format("YYYY-MM-DD"),[s]:r,[Z]:r,fill:i,stroke:i}}),es=(0,r.useCallback)(()=>{if(!X?.data?.length)return;let e=X.data[X.data.length-1][s];return ee?`${"number"==typeof e?e.toFixed(1):e}%`:"number"==typeof e?e.toLocaleString():e},[X?.data,X?.format,s]);return(0,r.useEffect)(()=>{c&&M(c)},[c]),(0,r.useEffect)(()=>{U(es())},[X,es]),(0,t.jsx)($.ReportBlockContainer,{draggable:!0,showDragHandle:!0,loading:"infra-monitoring"===a?K:"daily-stats"===a&&G,icon:J?.category?.icon("text-foreground-muted"),label:e,actions:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.ButtonTooltip,{type:"text",size:"tiny",disabled:V,className:"w-7 h-7",icon:"bar"===D?(0,t.jsx)(j.Activity,{}):(0,t.jsx)(A.BarChartIcon,{}),onClick:()=>{let e="bar"===D?"line":"bar";f&&f({chart:{chart_type:e}}),M(e)},tooltip:{content:{side:"bottom",className:"max-w-56 text-center",text:`View as ${"bar"===D?"line chart":"bar chart"}`}}}),d]}),children:V?(0,t.jsxs)("div",{className:"flex flex-grow w-full flex-col items-center justify-center gap-y-2 px-4",children:[(0,t.jsx)(E.Loader2,{size:18,className:"animate-spin text-border-strong"}),(0,t.jsxs)("p",{className:"text-xs text-foreground-lighter text-center",children:["Loading data for ",e]})]}):void 0===X?(0,t.jsxs)("div",{className:"flex flex-grow w-full flex-col items-center justify-center gap-y-2 px-4",children:[(0,t.jsx)(O.WarningIcon,{}),(0,t.jsxs)("p",{className:"text-xs text-foreground-lighter text-center",children:["Unable to load data for ",e]})]}):0===et.length?(0,t.jsx)("div",{className:"flex flex-grow w-full flex-col items-center justify-center gap-y-2",children:(0,t.jsx)(y.default,{size:"small",className:"border-0",description:"It may take up to 24 hours for data to refresh"})}):(0,t.jsxs)(t.Fragment,{children:[F&&(0,t.jsxs)("div",{className:"pt-2 px-3 w-full text-left leading-tight",children:[(0,t.jsx)("span",{className:"text-xs font-mono uppercase text-foreground-light",children:"Most recently"}),(0,t.jsx)("p",{className:"text-lg text",children:F})]}),(0,t.jsx)(_.ChartContainer,{className:"w-full aspect-auto px-3 py-2",style:{height:m?`${m}px`:void 0,minHeight:m?`${m}px`:void 0},children:"bar"===D?(0,t.jsxs)(C.BarChart,{accessibilityLayer:!0,margin:{left:0,right:0},data:et,children:[(0,t.jsx)(N.CartesianGrid,{vertical:!1}),(0,t.jsx)(I.XAxis,{dataKey:"period_start",tickLine:!1,axisLine:!1,tickMargin:8,minTickGap:32}),(0,t.jsx)(R.YAxis,{hide:!0,domain:ee?[0,100]:void 0}),(0,t.jsx)(_.ChartTooltip,{content:(0,t.jsx)(_.ChartTooltipContent,{className:"w-[200px]",labelSuffix:ee?"%":"",labelFormatter:e=>(0,h.default)(e).format("DD MMM YYYY")})}),(0,t.jsx)(k.Bar,{dataKey:Z,radius:[2,2,1,1]})]}):(0,t.jsxs)(P,{accessibilityLayer:!0,margin:{left:0,right:0},data:et,children:[(0,t.jsx)(N.CartesianGrid,{vertical:!1}),(0,t.jsx)(I.XAxis,{dataKey:"period_start",tickLine:!1,axisLine:!1,tickMargin:8,minTickGap:32}),(0,t.jsx)(R.YAxis,{hide:!0,domain:ee?[0,100]:void 0}),(0,t.jsx)(_.ChartTooltip,{content:(0,t.jsx)(_.ChartTooltipContent,{className:"w-[200px]",labelSuffix:X?.format==="%"?"%":"",labelFormatter:e=>(0,h.default)(e).format("DD MMM YYYY")})}),(0,t.jsx)(T.Line,{dataKey:Z,stroke:"hsl(var(--chart-1))",radius:4})]})})]})})};var M=e.i(937942);let F=({label:e,attribute:s,actions:a})=>{let{ref:r}=(0,o.useParams)(),i=S.METRICS.find(e=>e.key===s),n=i?.category?.label;return(0,t.jsx)($.ReportBlockContainer,{draggable:!0,showDragHandle:!0,loading:!1,icon:i?.category?.icon("text-foreground-muted"),label:e,actions:a,children:(0,t.jsxs)("div",{className:"flex flex-col justify-center flex-1",children:[(0,t.jsx)("p",{className:"text-xs text-foreground-lightr",children:"This chart is not longer available, and can be removed from your report"}),(0,t.jsxs)("p",{className:"text-xs text-foreground-lighter",children:["You may view the equivalent of this data from the"," ",(0,t.jsxs)(M.InlineLink,{href:`/project/${r}/${(e=>{switch(e){case"Database API":return"/logs/postgrest-logs";case"All API usage":return"/logs/explorer";case"Realtime":return"/logs/realtime-logs";case"Storage":return"/logs/storage-logs";case"Authentication":return"/logs/auth-logs";default:return""}})(n)}`,children:[n," Logs"]})," ","instead"]})]})})};e.s(["ReportBlock",0,({item:e,startDate:h,endDate:g,interval:_,disableUpdate:y,isRefreshing:b,onRemoveChart:x,onUpdateChart:v})=>{let{ref:S}=(0,o.useParams)(),j=(0,p.useDatabaseSelectorStateSnapshot)(),[A,E]=(0,r.useState)(!1),k=e.attribute.startsWith("snippet_"),{data:C,error:N,isPending:T}=(0,c.useContentIdQuery)({projectRef:S,id:e.id},{enabled:k&&!!e.id,refetchOnWindowFocus:!1,refetchOnMount:!1,refetchIntervalInBackground:!1,retry:e=>!(e>=2)}),w=k?C?.content?.sql:void 0,I={...l.DEFAULT_CHART_CONFIG,...e.chartConfig??{}},R=f.DEPRECATED_REPORTS.includes(e.attribute),q=N?.message.includes("Content not found"),{database:P}=(0,u.usePrimaryDatabase)({projectRef:S}),O=P?.connection_string_read_only,L=P?.connectionString,{data:$,error:M,isPending:U,refetch:H}=(0,s.useQuery)({queryKey:m.sqlKeys.query(S,[e.id,w,O,L]),queryFn:async()=>{if(!S||!w)return null;let e=O??L;return e?(0,d.executeSql)({projectRef:S,connectionString:e,sql:w}):(i.toast.error("Unable to establish a database connection for this project."),null)},enabled:!T&&null==N,refetchOnWindowFocus:!1}),B=$?.result;return(0,r.useEffect)(()=>{if(M){let e=String(M).toLowerCase();(e.includes("read-only transaction")||e.includes("permission denied")||e.includes("must be owner"))&&E(!0)}},[M]),(0,r.useEffect)(()=>{b&&H()},[b,H]),(0,t.jsx)(t.Fragment,{children:k?(0,t.jsx)(l.QueryBlock,{blockWriteQueries:!0,id:e.id,label:e.label,chartConfig:I,sql:w,results:B,initialHideSql:!0,errorText:q?"SQL snippet not found":M?String(M):void 0,isExecuting:U,isWriteQuery:A,actions:!T&&(0,t.jsx)(n.ButtonTooltip,{type:"text",icon:(0,t.jsx)(a.X,{}),className:"w-7 h-7",onClick:()=>x({metric:{key:e.attribute}}),tooltip:{content:{side:"bottom",text:"Remove chart"}}}),onExecute:e=>{H()},onUpdateChartConfig:v,onRemoveChart:()=>x({metric:{key:e.attribute}}),disabled:T||q||!w}):R?(0,t.jsx)(F,{attribute:e.attribute,label:`${e.label}${S!==j.selectedDatabaseId?"infra-monitoring"===e.provider?" of replica":" on project":""}`,actions:y?null:(0,t.jsx)(n.ButtonTooltip,{type:"text",icon:(0,t.jsx)(a.X,{}),className:"w-7 h-7",onClick:()=>x({metric:{key:e.attribute}}),tooltip:{content:{side:"bottom",text:"Remove chart"}}})}):(0,t.jsx)(D,{startDate:h,endDate:g,interval:_,attribute:e.attribute,provider:e.provider,defaultChartStyle:e.chart_type,maxHeight:176,label:`${e.label}${S!==j.selectedDatabaseId?"infra-monitoring"===e.provider?" of replica":" on project":""}`,actions:y?null:(0,t.jsx)(n.ButtonTooltip,{type:"text",icon:(0,t.jsx)(a.X,{}),className:"w-7 h-7",onClick:()=>x({metric:{key:e.attribute}}),tooltip:{content:{side:"bottom",text:"Remove chart"}}}),onUpdateChartConfig:v})})}],238411)},111410,e=>{e.v(t=>Promise.all(["static/chunks/a428d2b7e6671266.js","static/chunks/92a7c4be60dd12e3.js"].map(t=>e.l(t))).then(()=>t(677146)))},883471,e=>{e.v(t=>Promise.all(["static/chunks/69b2faaedd35af23.js"].map(t=>e.l(t))).then(()=>t(518769)))},587525,e=>{e.v(t=>Promise.all(["static/chunks/da2f61ca91d09b7f.js"].map(t=>e.l(t))).then(()=>t(127351)))},168845,e=>{e.v(t=>Promise.all(["static/chunks/99714db866f77205.js"].map(t=>e.l(t))).then(()=>t(238625)))},730314,e=>{e.v(t=>Promise.all(["static/chunks/dcadd9d46d72282e.js","static/chunks/7c9eb39b81915ec4.js","static/chunks/82dddbda1a808189.js","static/chunks/d3a06a9a43f3833e.js","static/chunks/87b9766a4d16d1da.js","static/chunks/cc8130a84ee9bc2c.css"].map(t=>e.l(t))).then(()=>t(686651)))},591393,e=>{e.v(t=>Promise.all(["static/chunks/e9ad074e72197584.js"].map(t=>e.l(t))).then(()=>t(217383)))},379416,e=>{e.v(t=>Promise.all(["static/chunks/d690909a90d04a2e.js"].map(t=>e.l(t))).then(()=>t(931066)))},15732,e=>{e.v(t=>Promise.all(["static/chunks/0d5256e667945be4.js"].map(t=>e.l(t))).then(()=>t(760545)))},957083,e=>{e.v(t=>Promise.all(["static/chunks/e7d07ff1ae210964.js"].map(t=>e.l(t))).then(()=>t(667558)))},207969,e=>{e.v(t=>Promise.all(["static/chunks/8dd7282c22f923f6.js"].map(t=>e.l(t))).then(()=>t(427328)))},992842,e=>{e.v(t=>Promise.all(["static/chunks/d064a48a1c7cf778.js"].map(t=>e.l(t))).then(()=>t(793794)))},239573,e=>{e.v(t=>Promise.all(["static/chunks/edc5d84148401903.js"].map(t=>e.l(t))).then(()=>t(210246)))},963685,e=>{e.v(t=>Promise.all(["static/chunks/92b20126e5ca0919.js"].map(t=>e.l(t))).then(()=>t(983756)))},665811,e=>{e.v(t=>Promise.all(["static/chunks/e37e25f8b82619ef.js"].map(t=>e.l(t))).then(()=>t(544836)))},369256,e=>{e.v(t=>Promise.all(["static/chunks/8296dc618dae72f0.js"].map(t=>e.l(t))).then(()=>t(930239)))},16037,e=>{e.v(t=>Promise.all(["static/chunks/3251b4bc539a554b.js"].map(t=>e.l(t))).then(()=>t(397698)))},616788,e=>{e.v(t=>Promise.all(["static/chunks/c6b81ab43a1d5d23.js"].map(t=>e.l(t))).then(()=>t(7346)))},315750,e=>{e.v(t=>Promise.all(["static/chunks/32c236321136eb7c.js"].map(t=>e.l(t))).then(()=>t(531289)))},460510,e=>{e.v(t=>Promise.all(["static/chunks/d91062943e6a7c30.js"].map(t=>e.l(t))).then(()=>t(276898)))},550265,e=>{e.v(t=>Promise.all(["static/chunks/75ff0e62b8a31d26.js"].map(t=>e.l(t))).then(()=>t(259714)))},830960,e=>{e.v(t=>Promise.all(["static/chunks/b44aa26556fee7df.js"].map(t=>e.l(t))).then(()=>t(882885)))},336744,e=>{e.v(t=>Promise.all(["static/chunks/2b0767b5c008139a.js"].map(t=>e.l(t))).then(()=>t(955268)))},63631,e=>{e.v(t=>Promise.all(["static/chunks/21a4706e1f02d90b.js"].map(t=>e.l(t))).then(()=>t(853630)))},912072,e=>{e.v(t=>Promise.all(["static/chunks/c17c80e5efc43419.js"].map(t=>e.l(t))).then(()=>t(311301)))}]);

//# debugId=61645f57-3df7-8497-d323-db3c25b64a3c
//# sourceMappingURL=d1105f6ea6bbe75e.js.map