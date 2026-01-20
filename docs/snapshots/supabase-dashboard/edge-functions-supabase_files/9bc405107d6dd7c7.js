;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="e945fe2d-bdc3-22e7-dd49-931b0f3b0e14")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,748356,e=>{"use strict";var t=e.i(478902),s=e.i(55956),r=e.i(613851),a=e.i(595127),a=a,o=e.i(389959),n=e.i(587433),i=e.i(737018),l=e.i(192451),u=e.i(215312),d=e.i(841183),c=e.i(280590),m=e.i(837710),g=e.i(299863),p=e.i(793912),h=e.i(135144),f=e.i(689805),_=e.i(843778),b=e.i(375761),S=e.i(993394);e.s(["LogsDatePicker",0,({onSubmit:e,helpers:y,value:v,buttonTriggerProps:E,popoverContentProps:x,hideWarnings:N,align:w="end"})=>{let[T,H]=(0,o.useState)(!1);(0,o.useEffect)(()=>{if(!T){k(v.from?new Date(v.from):null);let e=v.to?new Date(v.to):new Date;P(e),O(new Date(e));let t=v.from?new Date(v.from):null,s=v.to?new Date(v.to):null;A({HH:t?.getHours().toString().padStart(2,"0")||"00",mm:t?.getMinutes().toString().padStart(2,"0")||"00",ss:t?.getSeconds().toString().padStart(2,"0")||"00"});let r=new Date,a=r.getHours().toString().padStart(2,"0"),o=r.getMinutes().toString().padStart(2,"0"),n=r.getSeconds().toString().padStart(2,"0");C({HH:s?.getHours().toString().padStart(2,"0")||a,mm:s?.getMinutes().toString().padStart(2,"0")||o,ss:s?.getSeconds().toString().padStart(2,"0")||n})}},[T,v]);let[I,k]=(0,o.useState)(v.from?new Date(v.from):null),[R,P]=(0,o.useState)(v.to?new Date(v.to):new Date),[j,O]=(0,o.useState)(()=>v.to?new Date(v.to):new Date),[$,A]=(0,o.useState)({HH:I?.getHours().toString()||"00",mm:I?.getMinutes().toString()||"00",ss:I?.getSeconds().toString()||"00"}),[L,C]=(0,o.useState)({HH:R?.getHours().toString()||"23",mm:R?.getMinutes().toString()||"59",ss:R?.getSeconds().toString()||"59"}),[D,q]=(0,o.useState)(!1),[M,F]=(0,o.useState)(!1);function G(){navigator.clipboard.readText().then(e=>{try{let t=JSON.parse(e);if(!t.from||!t.to)return void console.warn("Invalid date range format in clipboard");let s=new Date(t.from),r=new Date(t.to);if(isNaN(s.getTime())||isNaN(r.getTime()))return void console.warn("Invalid date values in clipboard");k(s),P(r),O(new Date(r)),A({HH:s.getHours().toString(),mm:s.getMinutes().toString(),ss:s.getSeconds().toString()}),C({HH:r.getHours().toString(),mm:r.getMinutes().toString(),ss:r.getSeconds().toString()}),F(!0)}catch(e){console.warn("Failed to parse clipboard content as date range:",e)}}).catch(e=>{console.warn("Failed to read clipboard:",e)})}(0,o.useEffect)(()=>{D&&setTimeout(()=>{q(!1)},2e3)},[D]);let U=(0,o.useCallback)(()=>{if(!I||!R)return;let e=new Date(I),t=new Date(R);e.setHours(+$.HH,+$.mm,+$.ss),t.setHours(+L.HH,+L.mm,+L.ss),(0,b.copyToClipboard)(JSON.stringify({from:e.toISOString(),to:t.toISOString()})),q(!0)},[I,R,$,L]);(0,o.useEffect)(()=>{M&&setTimeout(()=>{F(!1)},2e3)},[M]),(0,o.useEffect)(()=>(T&&(document.addEventListener("paste",G),document.addEventListener("copy",U)),()=>{document.removeEventListener("paste",G),document.removeEventListener("copy",U)}),[T,I,R,U]);let B=Math.abs((0,s.default)(I).diff((0,s.default)(R),"days"))>S.LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD-1,{getEntitlementNumericValue:X}=(0,c.useCheckEntitlements)("log.retention_days"),K=X();return(0,t.jsxs)(f.Popover_Shadcn_,{open:T,onOpenChange:H,children:[(0,t.jsx)(h.PopoverTrigger_Shadcn_,{asChild:!0,children:(0,t.jsx)(m.Button,{type:"default",icon:(0,t.jsx)(r.Clock,{size:12}),...E,children:v.isHelper?v.text:`${(0,s.default)(v.from).format("DD MMM, HH:mm")} - ${(0,s.default)(v.to||new Date).format("DD MMM, HH:mm")}`})}),(0,t.jsxs)(p.PopoverContent_Shadcn_,{className:"flex w-full p-0",side:"bottom",align:w,portal:!0,...x,children:[(0,t.jsx)(l.RadioGroup,{onValueChange:t=>{let s=y.find(e=>e.text===t);e&&s&&e({to:s.calcTo(),from:s.calcFrom(),isHelper:!0,text:s.text}),H(!1)},value:v.isHelper?v.text:"",className:"border-r p-2 flex flex-col gap-px",children:y.map(e=>(0,t.jsxs)(i.Label,{className:(0,_.cn)("[&:has([data-state=checked])]:bg-background-overlay-hover [&:has([data-state=checked])]:text-foreground px-4 py-1.5 text-foreground-light flex items-center gap-2 hover:bg-background-overlay-hover hover:text-foreground transition-all rounded-sm text-xs w-full",{"cursor-not-allowed pointer-events-none opacity-50":e.disabled}),children:[(0,t.jsx)(l.RadioGroupItem,{hidden:!0,value:e.text,disabled:e.disabled,"aria-disabled":e.disabled},e.text),e.text,!(!e||!e.availableIn?.length||!K||Math.abs((0,s.default)().diff((0,s.default)(e.calcFrom()),"day"))<=K)&&1?(0,t.jsx)(n.Badge,{children:e.availableIn?.[0]||""}):null]},e.text))}),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:"flex p-2 gap-2 items-center",children:[(0,t.jsxs)("div",{className:"flex flex-grow *:flex-grow gap-2 font-mono",children:[(0,t.jsx)(d.TimeSplitInput,{type:"start",startTime:$,endTime:L,time:$,setTime:A,setStartTime:A,setEndTime:C,startDate:I,endDate:R}),(0,t.jsx)(d.TimeSplitInput,{type:"end",startTime:$,endTime:L,time:L,setTime:C,setStartTime:A,setEndTime:C,startDate:I,endDate:R})]}),(0,t.jsx)("div",{className:"flex-shrink",children:(0,t.jsx)(u.ButtonTooltip,{tooltip:{content:{text:"Clear time range"}},icon:(0,t.jsx)(a.default,{size:14}),type:"text",size:"tiny",className:"px-1.5",onClick:()=>{A({HH:"00",mm:"00",ss:"00"}),C({HH:"00",mm:"00",ss:"00"})}})})]}),(0,t.jsx)("div",{className:"p-2 border-t",children:(0,t.jsx)(g.Calendar,{mode:"range",month:j,onMonthChange:e=>O(new Date(e)),selected:{from:I??void 0,to:R??void 0},onSelect:e=>{!function(e){let[t,s]=e;k(t),P(s)}([e?.from??null,e?.to??null])}})}),B&&!N&&(0,t.jsxs)("div",{className:"text-xs px-3 py-1.5 border-y bg-warning-300 text-warning-foreground border-warning-500 text-warning",children:["Large ranges may result in memory errors for ",(0,t.jsx)("br",{})," big projects."]}),(0,t.jsxs)("div",{className:"flex items-center justify-end gap-2 p-2 border-t",children:[I&&R?(0,t.jsx)(m.Button,{type:"text",size:"tiny",onClick:U,className:(0,_.cn)({"text-brand-600":D||M}),children:D?"Copied!":M?"Pasted!":"Copy range"}):null,(0,t.jsx)(m.Button,{type:"default",onClick:()=>{let e=new Date;O(e),k(new Date(e)),P(new Date(e))},children:"Today"}),(0,t.jsx)(m.Button,{onClick:function(){let t=I||new Date,s=R||new Date,r=new Date(t.setHours(+$.HH,+$.mm,+$.ss)),a=new Date(s.setHours(+L.HH,+L.mm,+L.ss));e({from:r.toISOString(),to:a.toISOString(),isHelper:!1}),H(!1)},children:"Apply"})]})]})]})]})}],748356)},460988,e=>{"use strict";var t=e.i(156054),s=e.i(55956),r=e.i(807162),a=e.i(228598),o=e.i(389959);e.i(128328);var n=e.i(86086),i=e.i(884892),l=e.i(857054),u=e.i(993394);let d=e=>s.default.utc(Number(e)/1e3).toISOString(),c=e=>{let t=16===String(e).length;return!Number.isNaN(Number(e))&&t},m=(e,t)=>Object.keys(e).filter(t=>e[t]).flatMap(s=>{let r=t?`${t}.${s}`:s;return"object"==typeof e[s]?m(e[s],r):[r]}),g=(e,t)=>{let s=Object.keys(t),a=u.SQL_FILTER_TEMPLATES[e],o=e=>{let s=a[e],o=(0,r.default)(t,e);if(void 0!==o&&"function"==typeof s)return s(o);if(void 0===s)if("string"==typeof o)return`${e} = '${o}'`;else return`${e} = ${o}`;return void 0===o&&"function"==typeof s?null:s&&!1===o?null:s},n=s.map(e=>{if(void 0===t[e]||"string"==typeof t[e]&&0===t[e].length)return null;if("object"==typeof t[e]){let s=m(t[e],e).map(o).filter(Boolean);return s.length>0?`(${s.join(" or ")})`:null}{let t=o(e);return null===t?null:`(${t})`}}).filter(Boolean).join(" and ");return n?"where "+n:""},p=e=>{switch(e){case"edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.request) as request
  cross join unnest(m.response) as response`;case"pg_cron_logs":case"postgres_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.parsed) as parsed`;case"function_logs":case"auth_logs":return"cross join unnest(metadata) as metadata";case"function_edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.response) as response
  cross join unnest(m.request) as request`;case"supavisor_logs":return"cross join unnest(metadata) as m";default:return""}},h=n.IS_PLATFORM?"where ( parsed.application_name = 'pg_cron' or regexp_contains(event_message, 'cron job') )":"where ( parsed.application_name = 'pg_cron' or event_message::text LIKE '%cron job%' )",f=e=>{let t=e.reduce((e,t)=>{let s=_(t);return e[s]+=1,e},{second:0,minute:0,hour:0,day:0});return Object.keys(t).reduce((e,s)=>t[e]>t[s]?e:s)},_=e=>({0:"second",1:"minute",2:"hour",3:"day"})[["second","minute","hour"].map(t=>e.get(t)).reduce((e,t)=>(0===t&&(e+=1),e),0)];function b(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(WITH)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function S(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(ILIKE)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function y(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.apikey?.[0];if(!t)return;if(t.invalid)return"<invalid>";let s=t?.payload?.[0];return s&&"HS256"===s.algorithm&&"supabase"===s.issuer&&["anon","service_role"].includes(s.role)&&!s.subject?s.role:"<unrecognized>"}function v(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.apikey?.[0]?.apikey?.[0];if(t)return t.error?`${t.prefix}... <invalid: ${t.error}>`:`${t.prefix}...`}function E(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.authorization?.[0];if(!t||t.invalid)return;let s=t?.payload?.[0];if(s&&s.role)return s.role}e.s(["apiKey",()=>v,"checkForILIKEClause",()=>S,"checkForWithClause",()=>b,"fillTimeseries",0,(e,t,r,a,o,n,i=20,l)=>{let u;if(0===e.length&&!(o&&n))return[];if(e.length>i)return e.map(e=>{let r=e[t],a=c(r)?d(r):s.default.utc(r).toISOString();return e[t]=a,e});if(e.length<=1&&!(o&&n))return e;let m=e.map(e=>s.default.utc(e[t])),g=n?s.default.utc(n):s.default.utc(Math.max.apply(null,m)),p=o?s.default.utc(o):s.default.utc(Math.min.apply(null,m)),h=e.length>0?m:[p,g],_=1;if(l){let e=l.match(/^(\d+)(m|h|d|s)$/);e?(_=parseInt(e[1],10),u=({s:"second",m:"minute",h:"hour",d:"day"})[e[2]]):u=f(h)}else u=f(h);0!==e.length||l||(u="minute");let b=e.map(e=>{let a=e[t],o=c(a)?d(a):s.default.utc(a).toISOString();return Array.isArray(r)&&0===r.length?{[t]:o}:(e[t]=o,e)}),S=p;for(;S.isBefore(g)||S.isSame(g);){if(!m.find(e=>e.year()===S.year()&&e.month()===S.month()&&e.date()===S.date()&&e.hour()===S.hour()&&e.minute()===S.minute()&&e.second()===S.second())){let e=("string"==typeof r?[r]:r).reduce((e,t)=>({...e,[t]:a}),{});b.push({[t]:S.toISOString(),...e})}S=S.add(_,u)}return b},"genChartQuery",0,(e,t,r)=>{let a,o,n,i,l,d,[c,m]=(a=t.iso_timestamp_end?(0,s.default)(t.iso_timestamp_end):(0,s.default)(),o=t.iso_timestamp_start?(0,s.default)(t.iso_timestamp_start):(0,s.default)(),n="minute",i=360,l=a.diff(o,"minute"),d=a.diff(o,"hour"),l>720?(n="hour",i=120):d>72&&(n="day",i=7),[o.add(-i,n),n]),f=g(e,r),_=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 500";case"postgres_logs":case"pg_cron_logs":return"parsed.error_severity IN ('ERROR', 'FATAL', 'PANIC')";case"auth_logs":return"metadata.level = 'error' OR SAFE_CAST(metadata.status AS INT64) >= 400";case"function_logs":return"metadata.level IN ('error', 'fatal')";default:return"false"}}(e),b=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 400 AND response.status_code < 500";case"postgres_logs":return"parsed.error_severity IN ('WARNING')";case"auth_logs":return"metadata.level = 'warning'";case"function_logs":return"metadata.level IN ('warning')";default:return"false"}}(e);e===u.LogsTableName.PG_CRON&&(e=u.LogsTableName.POSTGRES,f=h);let S=p(e);return`
SELECT
-- log-event-chart
  timestamp_trunc(t.timestamp, ${m}) as timestamp,
  count(CASE WHEN NOT (${_} OR ${b}) THEN 1 END) as ok_count,
  count(CASE WHEN ${_} THEN 1 END) as error_count,
  count(CASE WHEN ${b} THEN 1 END) as warning_count,
FROM
  ${e} t
  ${S}
  ${f?f+` and t.timestamp > '${c.toISOString()}'`:`where t.timestamp > '${c.toISOString()}'`}
GROUP BY
timestamp
ORDER BY
  timestamp ASC
  `},"genCountQuery",0,(e,t)=>{let s=g(e,t);e===u.LogsTableName.PG_CRON&&(e=u.LogsTableName.POSTGRES,s=h);let r=p(e);return`SELECT count(*) as count FROM ${e} ${r} ${s}`},"genDefaultQuery",0,(e,t,s=100)=>{let r=g(e,t),a=p(e),o="order by timestamp desc";switch(e){case"edge_logs":if(!n.IS_PLATFORM)return`
-- local dev edge_logs query
select id, edge_logs.timestamp, event_message, request.method, request.path, request.search, response.status_code
from edge_logs
${a}
${r}
${o}
limit ${s};
`;return`select id, identifier, timestamp, event_message, request.method, request.path, request.search, response.status_code
  from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
  `;case"postgres_logs":if(!n.IS_PLATFORM)return`
select postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint
from postgres_logs
${a}
${r}
${o}
limit ${s}
  `;return`select identifier, postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
  `;case"function_logs":return`select id, ${e}.timestamp, event_message, metadata.event_type, metadata.function_id, metadata.level from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
    `;case"auth_logs":return`select id, ${e}.timestamp, event_message, metadata.level, metadata.status, metadata.path, metadata.msg as msg, metadata.error from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
    `;case"function_edge_logs":if(!n.IS_PLATFORM)return`
select id, function_edge_logs.timestamp, event_message
from function_edge_logs
${o}
limit ${s}
`;return`select id, ${e}.timestamp, event_message, response.status_code, request.method, m.function_id, m.execution_time_ms, m.deployment_id, m.version from ${e}
  ${a}
  ${r}
  ${o}
  limit ${s}
  `;case"supavisor_logs":return`select id, ${e}.timestamp, event_message from ${e} ${a} ${r} ${o} limit ${s}`;case"pg_upgrade_logs":return`select id, ${e}.timestamp, event_message from ${e} ${a} ${r} ${o} limit 100`;default:return`select id, ${e}.timestamp, event_message from ${e}
  ${r}
  ${o}
  limit ${s}
  `;case"pg_cron_logs":let i=r?`${h} AND ${r.substring(6)}`:h;return`select id, postgres_logs.timestamp, event_message, parsed.error_severity, parsed.query
from postgres_logs
${a}
${i}
${o}
limit ${s}
`}},"genSingleLogQuery",0,(e,t)=>`select id, timestamp, event_message, metadata from ${e} where id = '${t}' limit 1`,"isDefaultLogPreviewFormat",0,e=>e&&e.timestamp&&e.event_message&&e.id,"isUnixMicro",0,c,"jwtAPIKey",()=>y,"maybeShowUpgradePrompt",0,(e,t)=>{let r=Math.abs((0,s.default)().diff((0,s.default)(e),"day"));return r>1&&"free"===t||r>7&&"pro"===t||r>28&&"team"===t||r>90&&"enterprise"===t},"maybeShowUpgradePromptIfNotEntitled",0,(e,t)=>!!t&&Math.abs((0,s.default)().diff((0,s.default)(e),"day"))>t,"role",()=>E,"unixMicroToIsoTimestamp",0,d,"useEditorHints",0,()=>{let e=(0,t.useMonaco)();(0,o.useEffect)(()=>{if(e){let t=e.languages.registerCompletionItemProvider("pgsql",{triggerCharacters:["`"," ","."],provideCompletionItems:function(t,s,r){let o=new i.default(t,s.column-2,s.lineNumber-1);if(o.isNextDQuote())return{suggestions:[]};let n=[],u=l.default.schemas.filter(e=>o._text.includes(e.reference));if(0===u.length&&(u=l.default.schemas),o.isNextPeriod()){let t=u.flatMap(e=>e.fields).flatMap(e=>{let[t,...s]=e.path.split(".");return s}).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));n=n.concat(t)}if("`"===r.triggerCharacter||" "===r.triggerCharacter){let t=l.default.schemas.map(t=>({label:t.reference,kind:e.languages.CompletionItemKind.Class,insertText:t.reference})),s=u.flatMap(e=>e.fields).flatMap(e=>e.path.split(".").slice(0,-1)).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));n=(n=n.concat(s)).concat(t)}return{suggestions:(0,a.default)(n,"label")}}});return()=>{t.dispose()}}},[e])}])},993394,e=>{"use strict";var t,s=e.i(55956),r=e.i(10429);e.i(128328);var a=e.i(86086);let o=`${r.DOCS_URL}/guides/platform/logs#querying-with-the-logs-explorer`,n=[{label:"Recent Errors",mode:"simple",searchString:"[Ee]rror|\\s[45][0-9][0-9]\\s",for:["api"]},{label:"Commits",mode:"simple",searchString:"COMMIT",for:["database"]},{label:"Commits By User",description:"Count of commits made by users on the database",mode:"custom",searchString:`select
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
`,for:["api"]}],i={search_query:e=>`regexp_contains(event_message, '${e}')`},l={postgres_logs:{...i,database:e=>`identifier = '${e}'`,"severity.error":"parsed.error_severity in ('ERROR', 'FATAL', 'PANIC')","severity.noError":"parsed.error_severity not in ('ERROR', 'FATAL', 'PANIC')","severity.log":"parsed.error_severity = 'LOG'"},edge_logs:{...i,database:e=>`identifier = '${e}'`,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499","product.database":"request.path like '/rest/%' or request.path like '/graphql/%'","product.storage":"request.path like '/storage/%'","product.auth":"request.path like '/auth/%'","product.realtime":"request.path like '/realtime/%'","method.get":"request.method = 'GET'","method.post":"request.method = 'POST'","method.put":"request.method = 'PUT'","method.patch":"request.method = 'PATCH'","method.delete":"request.method = 'DELETE'","method.options":"request.method = 'OPTIONS'"},function_edge_logs:{...i,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499"},function_logs:{...i,"severity.error":"metadata.level = 'error'","severity.notError":"metadata.level != 'error'","severity.log":"metadata.level = 'log'","severity.info":"metadata.level = 'info'","severity.debug":"metadata.level = 'debug'","severity.warn":"metadata.level = 'warn'"},auth_logs:{...i,"severity.error":"metadata.level = 'error' or metadata.level = 'fatal'","severity.warning":"metadata.level = 'warning'","severity.info":"metadata.level = 'info'","status_code.server_error":"cast(metadata.status as int64) between 500 and 599","status_code.client_error":"cast(metadata.status as int64) between 400 and 499","status_code.redirection":"cast(metadata.status as int64) between 300 and 399","status_code.success":"cast(metadata.status as int64) between 200 and 299","endpoints.admin":'REGEXP_CONTAINS(metadata.path, "/admin")',"endpoints.signup":'REGEXP_CONTAINS(metadata.path, "/signup|/invite|/verify")',"endpoints.authentication":'REGEXP_CONTAINS(metadata.path, "/token|/authorize|/callback|/otp|/magiclink")',"endpoints.recover":'REGEXP_CONTAINS(metadata.path, "/recover")',"endpoints.user":'REGEXP_CONTAINS(metadata.path, "/user")',"endpoints.logout":'REGEXP_CONTAINS(metadata.path, "/logout")'},realtime_logs:{...i},storage_logs:{...i},postgrest_logs:{...i,database:e=>`identifier = '${e}'`},pgbouncer_logs:{...i},supavisor_logs:{...i,database:e=>`m.project like '${e}%'`},pg_upgrade_logs:{...i},pg_cron_logs:{...i},etl_replication_logs:{...i,pipeline_id:e=>`pipeline_id = ${e}`}};var u=((t={}).EDGE="edge_logs",t.POSTGRES="postgres_logs",t.FUNCTIONS="function_logs",t.FN_EDGE="function_edge_logs",t.AUTH="auth_logs",t.AUTH_AUDIT="auth_audit_logs",t.REALTIME="realtime_logs",t.STORAGE="storage_logs",t.POSTGREST="postgrest_logs",t.SUPAVISOR="supavisor_logs",t.PGBOUNCER="pgbouncer_logs",t.PG_UPGRADE="pg_upgrade_logs",t.PG_CRON="pg_cron_logs",t.ETL="etl_replication_logs",t);let d={postgres_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events with ERROR, PANIC, or FATAL"},{key:"noError",label:"No Error",description:"Show all non-error events"},{key:"log",label:"Log",description:"Show all events that are log severity"}]}},edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]},product:{label:"Product",key:"product",options:[{key:"database",label:"Database",description:""},{key:"auth",label:"Auth",description:""},{key:"storage",label:"Storage",description:""},{key:"realtime",label:"Realtime",description:""}]},method:{label:"Method",key:"method",options:[{key:"get",label:"GET",description:""},{key:"options",label:"OPTIONS",description:""},{key:"put",label:"PUT",description:""},{key:"post",label:"POST",description:""},{key:"patch",label:"PATCH",description:""},{key:"delete",label:"DELETE",description:""}]}},...a.IS_PLATFORM?{function_edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]}}}:{},function_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:'Show all events that are "error" severity'},{key:"warn",label:"Warning",description:'Show all events that are "warn" severity'},{key:"info",label:"Info",description:'Show all events that are "info" severity'},{key:"debug",label:"Debug",description:'Show all events that are "debug" severity'},{key:"log",label:"Log",description:'Show all events that are "log" severity'}]}},auth_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events that have error or fatal severity"},{key:"warning",label:"Warning",description:"Show all events that have warning severity"},{key:"info",label:"Info",description:"Show all events that have info severity"}]},status_code:{label:"Status Code",key:"status_code",options:[{key:"server_error",label:"Server Error",description:"Show all requests with 5XX status code"},{key:"client_error",label:"Client Error",description:"Show all requests with 4XX status code"},{key:"redirection",label:"Redirection",description:"Show all requests that have 3XX status code"},{key:"success",label:"Success",description:"Show all requests that have 2XX status code"}]},endpoints:{label:"Endpoints",key:"endpoints",options:[{key:"admin",label:"Admin",description:"Show all admin requests"},{key:"signup",label:"Sign up",description:"Show all signup and authorization requests"},{key:"recover",label:"Password Recovery",description:"Show all password recovery requests"},{key:"authentication",label:"Authentication",description:"Show all authentication flow requests (login, otp, and Oauth2)"},{key:"user",label:"User",description:"Show all user data requests"},{key:"logout",label:"Logout",description:"Show all logout requests"}]}}},c=[{text:"Last 15 minutes",calcFrom:()=>(0,s.default)().subtract(15,"minute").toISOString(),calcTo:()=>""},{text:"Last 30 minutes",calcFrom:()=>(0,s.default)().subtract(30,"minute").toISOString(),calcTo:()=>""},{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 2 days",calcFrom:()=>(0,s.default)().subtract(2,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 5 days",calcFrom:()=>(0,s.default)().subtract(5,"day").toISOString(),calcTo:()=>""}],m=[{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 7 days",calcFrom:()=>(0,s.default)().subtract(7,"day").toISOString(),calcTo:()=>""}];e.s(["EXPLORER_DATEPICKER_HELPERS",0,m,"FILTER_OPTIONS",0,d,"LOGS_EXPLORER_DOCS_URL",0,o,"LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD",0,2,"LOGS_SOURCE_DESCRIPTION",0,{edge_logs:"Logs obtained from the network edge, containing all API requests",postgres_logs:"Database logs obtained directly from Postgres",function_logs:"Function logs generated from runtime execution",function_edge_logs:"Function call logs, containing the request and response",auth_logs:"Errors, warnings, and performance details from the auth service",auth_audit_logs:"Audit records of user signups, logins, and account changes",realtime_logs:"Realtime server for Postgres logical replication broadcasting",storage_logs:"Object storage logs",postgrest_logs:"RESTful API web server logs",supavisor_logs:"Shared connection pooler logs for PostgreSQL",pgbouncer_logs:"Dedicated connection pooler for PostgreSQL",pg_upgrade_logs:"Logs generated by the Postgres version upgrade process",pg_cron_logs:"Postgres logs from pg_cron cron jobs",etl_replication_logs:"Logs from the replication process"},"LOGS_TABLES",0,{api:"edge_logs",database:"postgres_logs",functions:"function_logs",fn_edge:"function_edge_logs",auth:"auth_logs",realtime:"realtime_logs",storage:"storage_logs",postgrest:"postgrest_logs",supavisor:"supavisor_logs",pg_upgrade:"pg_upgrade_logs",pg_cron:"postgres_logs",pgbouncer:"pgbouncer_logs",etl:"etl_replication_logs"},"LOG_ROUTES_WITH_REPLICA_SUPPORT",0,["/project/[ref]/logs/edge-logs","/project/[ref]/logs/pooler-logs","/project/[ref]/logs/postgres-logs","/project/[ref]/logs/postgrest-logs"],"LogsTableName",()=>u,"PREVIEWER_DATEPICKER_HELPERS",0,c,"SQL_FILTER_TEMPLATES",0,l,"TEMPLATES",0,n,"TIER_QUERY_LIMITS",0,{FREE:{text:"1 day",value:1,unit:"day",promptUpgrade:!0},PRO:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},PAYG:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},TEAM:{text:"28 days",value:28,unit:"day",promptUpgrade:!0},ENTERPRISE:{text:"90 days",value:90,unit:"day",promptUpgrade:!1},PLATFORM:{text:"1 day",value:1,unit:"day",promptUpgrade:!1}},"getDefaultHelper",0,e=>e.find(e=>e.default)||e[0]])},884892,e=>{"use strict";let t=class{_line;_text;_lines;model;offset;lineNumber;constructor(e,t,s){this.model=e,this.offset=t,this.lineNumber=s,this._text=e.getValue(),this._lines=this._text.split(/\r?\n/g),this._line=this._lines[s]}hasNext(){return this.lineNumber>=0||this.offset>=0}isFowardDQuote(){return!!this.hasForward()&&34===this.peekForward()}isNextDQuote(){return!!this.hasNext()&&34===this.peekNext()}isNextPeriod(){return!!this.hasNext()&&46===this.peekNext()}peekNext(){return this.offset<0?10*(this.lineNumber>0):this._line.charCodeAt(this.offset)}hasForward(){return this.lineNumber<this._lines.length||this.offset<this._line.length}peekForward(){return this.offset===this._line.length?10*(this.lineNumber!==this._lines.length):this._line.charCodeAt(this.offset+1)}next(){if(this.offset<0)return this.lineNumber>0?(this.lineNumber--,this._line=this._lines[this.lineNumber],this.offset=this._line.length-1,10):(this.lineNumber=-1,0);let e=this._line.charCodeAt(this.offset);return this.offset--,e}readArguments(){let e=0,t=0,s=0,r=0;for(;this.hasNext();){let a=this.next();switch(a){case 40:if(--e<0)return r;break;case 41:e++;break;case 123:s--;break;case 125:s++;break;case 91:t--;break;case 93:t++;break;case 34:case 39:for(;this.hasNext()&&a!==this.next(););break;case 44:!e&&!t&&!s&&r++}}return -1}readIdent(){let e=!1,t=!1,s="";for(;this.hasNext();){let r=this.peekNext();if(e&&!t&&!this._isIdentPart(r))break;if(r=this.next(),!e&&t&&34===r){e=!0;continue}if(e||32!==r&&9!==r&&10!=r){if(!e&&(34===r||this._isIdentPart(r)))e=!0,t=34===r,s=String.fromCharCode(r)+s;else if(e)if(t){if(0===r||(s=String.fromCharCode(r)+s,34===r))break}else s=String.fromCharCode(r)+s}}return s}readIdents(e){let t=[];for(;e>0;){e--;let s=this.readIdent();if(!s||(t.push(s),!this.isNextPeriod()))break}return t.reverse()}_isIdentPart(e){return 95===e||e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}};e.s(["default",0,t])},841183,261348,e=>{"use strict";var t=e.i(478902),s=e.i(370589);e.s(["format",()=>s.default],261348);var s=s,r=e.i(613851),a=e.i(389959),o=e.i(460988);let n=(0,e.i(843778).cn)("w-6 p-0 text-center text-xs text-foreground outline-none cursor-text","ring-0 focus:ring-0 ring-none border-none bg-transparent");e.s(["TimeSplitInput",0,({type:e,time:i,setTime:l,setStartTime:u,setEndTime:d,startTime:c,endTime:m,startDate:g,endDate:p})=>{let[h,f]=(0,a.useState)(!1);function _(){1===i.HH.length&&(i.HH="0"+i.HH),1===i.mm.length&&(i.mm="0"+i.mm),1===i.ss.length&&(i.ss="0"+i.ss),i.HH||(i.HH="00"),i.mm||(i.mm="00"),i.ss||(i.ss="00");let t=!1,r=!1;(0,s.default)(new Date(g),"dd/mm/yyyy")==(0,s.default)(new Date(p),"dd/mm/yyyy")&&("start"===e&&(i.HH&&Number(i.HH)>Number(m.HH)&&(m.HH=i.HH,t=!0),i.HH&&Number(i.HH)>=Number(m.HH)&&i.mm&&Number(i.mm)>Number(m.mm)&&(m.mm=i.mm,t=!0),i.HH&&Number(i.HH)>=Number(m.HH)&&i.mm&&Number(i.mm)>=Number(m.mm)&&i.ss&&Number(i.ss)>Number(m.ss)&&(m.ss=i.ss,t=!0)),"end"===e&&(i.HH&&Number(i.HH)<Number(c.HH)&&(c.HH=i.HH,r=!0),i.HH&&Number(i.HH)<=Number(c.HH)&&i.mm&&Number(i.mm)<Number(c.mm)&&(c.mm=i.mm,r=!0),i.HH&&Number(i.HH)<=Number(c.HH)&&i.mm&&Number(i.mm)<=Number(c.mm)&&i.ss&&Number(i.ss)<Number(c.ss)&&(c.ss=i.ss,r=!0))),l({...i}),t&&d({...m}),r&&u({...c}),f(!1)}function b(e,t){let s={HH:i.HH,mm:i.mm,ss:i.ss};if(!(e.length>2)){switch(t){case"HH":if(e&&Number(e)>23)return;break;case"mm":case"ss":if(e&&Number(e)>59)return}s[t]=e,l({...s})}}let S=e=>{e.target.select(),f(!0),e.stopPropagation()},y=e=>{e.stopPropagation()},v=e=>{/^[0-9]$/.test(e.key)||["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Enter"].includes(e.key)||e.preventDefault(),e.stopPropagation()},E=e=>{e.stopPropagation()};function x(t){t.preventDefault(),t.stopPropagation(),navigator.clipboard.readText().then(t=>{let s=null;isNaN((s=new Date((0,o.isUnixMicro)(t)?(0,o.unixMicroToIsoTimestamp)(t):Number(t))).getTime())?console.warn("Invalid date or timestamp in clipboard"):s&&("start"===e&&s.setSeconds(s.getSeconds()-1),"end"===e&&s.setSeconds(s.getSeconds()+1),l({HH:s.getHours().toString().padStart(2,"0"),mm:s.getMinutes().toString().padStart(2,"0"),ss:s.getSeconds().toString().padStart(2,"0")}))})}return(0,a.useEffect)(()=>(document.addEventListener("paste",x),()=>document.removeEventListener("paste",x)),[g,p]),(0,t.jsxs)("div",{className:`
        flex h-7 items-center justify-center
        gap-0 rounded border border-strong bg-surface-100 text-xs text-foreground-light
        ${h&&" border-stronger outline outline-2 outline-border"}
        hover:border-stronger transition-colors
    `,children:[(0,t.jsx)("div",{className:"mr-1 text-foreground-lighter",children:(0,t.jsx)(r.Clock,{size:14,strokeWidth:1.5})}),(0,t.jsx)("input",{type:"text",onBlur:()=>_(),onFocus:S,onClick:y,onKeyDown:v,onInput:E,pattern:"[0-23]*",placeholder:"00",onChange:e=>b(e.target.value,"HH"),"aria-label":"Hours",className:n,value:i.HH}),(0,t.jsx)("span",{className:"text-foreground-lighter",children:":"}),(0,t.jsx)("input",{type:"text",onBlur:()=>_(),onFocus:S,onClick:y,onKeyDown:v,onInput:E,pattern:"[0-59]*",placeholder:"00",onChange:e=>b(e.target.value,"mm"),"aria-label":"Minutes",className:n,value:i.mm}),(0,t.jsx)("span",{className:"text-foreground-lighter",children:":"}),(0,t.jsx)("input",{type:"text",onBlur:()=>_(),onFocus:S,onClick:y,onKeyDown:v,onInput:E,pattern:"[0-59]*",placeholder:"00",onChange:e=>b(e.target.value,"ss"),"aria-label":"Seconds",className:n,value:i.ss})]})}],841183)},595127,e=>{"use strict";let t=(0,e.i(388019).default)("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);e.s(["default",()=>t])}]);

//# debugId=e945fe2d-bdc3-22e7-dd49-931b0f3b0e14
//# sourceMappingURL=a6ea419219e31747.js.map