;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="d87f4a51-9c7a-8e7f-e276-eb0c706c2283")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,388034,e=>{"use strict";let t=(0,e.i(388019).default)("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);e.s(["default",()=>t])},61187,e=>{"use strict";var t=e.i(388034);e.s(["RefreshCw",()=>t.default])},271332,e=>{"use strict";var t=e.i(478902),s=e.i(389959),r=e.i(843778),a=e.i(837710),o=e.i(253214);let i=(0,s.forwardRef)(({children:e,customFooter:i,description:n,hideFooter:l=!1,alignFooter:u="left",layout:c="horizontal",loading:d=!1,cancelText:m="Cancel",onConfirm:g=()=>{},onCancel:p=()=>{},confirmText:h="Confirm",showCloseButton:f=!0,footerBackground:_,variant:y="success",visible:b=!1,size:S="large",style:v,overlayStyle:E,contentStyle:T,triggerElement:w,header:I,modal:N,defaultOpen:O,...R},P)=>{let[k,$]=s.default.useState(!!b&&b);(0,s.useEffect)(()=>{$(b)},[b]);let A=i||(0,t.jsxs)("div",{className:"flex w-full space-x-2",style:{width:"100%",justifyContent:"vertical"===c?"center":"right"===u?"flex-end":"flex-start"},children:[(0,t.jsx)(a.Button,{type:"default",onClick:p,disabled:d,children:m}),(0,t.jsx)(a.Button,{onClick:g,disabled:d,loading:d,type:"danger"===y?"danger":"warning"===y?"warning":"primary",children:h})]});return(0,t.jsxs)(o.Dialog,{open:k,defaultOpen:O,onOpenChange:function(e){void 0===b||e?$(e):p()},modal:N,children:[w&&(0,t.jsx)(o.DialogTrigger,{children:w}),(0,t.jsxs)(o.DialogContent,{ref:P,hideClose:!f,...R,size:S,children:[I||n?(0,t.jsxs)(o.DialogHeader,{className:(0,r.cn)("border-b"),padding:"small",children:[I&&(0,t.jsx)(o.DialogTitle,{children:I}),n&&(0,t.jsx)(o.DialogDescription,{children:n})]}):null,e,!l&&(0,t.jsx)(o.DialogFooter,{padding:"small",children:A})]})]})}),n=(0,s.forwardRef)(({...e},s)=>(0,t.jsx)(o.DialogSection,{ref:s,...e,padding:"small",className:(0,r.cn)(e.className)})),l=(0,s.forwardRef)(({...e},s)=>(0,t.jsx)(o.DialogSectionSeparator,{ref:s,...e}));i.Content=n,i.Separator=l,e.s(["default",0,i])},40892,e=>{"use strict";var t=e.i(271332);e.s(["Modal",()=>t.default])},441345,e=>{"use strict";var t=e.i(343563);e.s(["Form",()=>t.default])},520124,e=>{"use strict";var t=e.i(460988),s=e.i(389959);e.s(["useFillTimeseriesSorted",0,(...e)=>(0,s.useMemo)(()=>{let[s,r]=e;if(!s[0]?.[r])return{data:s,error:void 0,isError:!1};try{return{data:(0,t.fillTimeseries)(...e).sort((t,s)=>new Date(t[e[1]])-new Date(s[e[1]])),error:void 0,isError:!1}}catch(e){return{data:[],error:e,isError:!0}}},[JSON.stringify(e[0]),...e])])},223600,e=>{"use strict";var t=e.i(478902),s=e.i(370410),r=e.i(816467),a=e.i(389959),o=e.i(837710),i=e.i(843778),n=e.i(375761);let l=(0,a.forwardRef)(({text:e,asyncText:l,iconOnly:u=!1,children:c,onClick:d,copyLabel:m="Copy",copiedLabel:g="Copied",...p},h)=>{let[f,_]=(0,a.useState)(!1);return(0,a.useEffect)(()=>{if(!f)return;let e=setTimeout(()=>_(!1),2e3);return()=>clearTimeout(e)},[f]),(0,t.jsx)(o.Button,{ref:h,onClick:async t=>{let s=l?await l():e;_(!0),(0,n.copyToClipboard)(s),d?.(t)},...p,className:(0,i.cn)({"px-1":u},p.className),icon:f?(0,t.jsx)(s.Check,{strokeWidth:2,className:"text-brand"}):p.icon??(0,t.jsx)(r.Copy,{}),children:!u&&(0,t.jsx)(t.Fragment,{children:c??(f?g:m)})})});l.displayName="CopyButton",e.s(["default",0,l])},460988,e=>{"use strict";var t=e.i(156054),s=e.i(55956),r=e.i(807162),a=e.i(228598),o=e.i(389959);e.i(128328);var i=e.i(86086),n=e.i(884892),l=e.i(857054),u=e.i(993394);let c=e=>s.default.utc(Number(e)/1e3).toISOString(),d=e=>{let t=16===String(e).length;return!Number.isNaN(Number(e))&&t},m=(e,t)=>Object.keys(e).filter(t=>e[t]).flatMap(s=>{let r=t?`${t}.${s}`:s;return"object"==typeof e[s]?m(e[s],r):[r]}),g=(e,t)=>{let s=Object.keys(t),a=u.SQL_FILTER_TEMPLATES[e],o=e=>{let s=a[e],o=(0,r.default)(t,e);if(void 0!==o&&"function"==typeof s)return s(o);if(void 0===s)if("string"==typeof o)return`${e} = '${o}'`;else return`${e} = ${o}`;return void 0===o&&"function"==typeof s?null:s&&!1===o?null:s},i=s.map(e=>{if(void 0===t[e]||"string"==typeof t[e]&&0===t[e].length)return null;if("object"==typeof t[e]){let s=m(t[e],e).map(o).filter(Boolean);return s.length>0?`(${s.join(" or ")})`:null}{let t=o(e);return null===t?null:`(${t})`}}).filter(Boolean).join(" and ");return i?"where "+i:""},p=e=>{switch(e){case"edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.request) as request
  cross join unnest(m.response) as response`;case"pg_cron_logs":case"postgres_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.parsed) as parsed`;case"function_logs":case"auth_logs":return"cross join unnest(metadata) as metadata";case"function_edge_logs":return`cross join unnest(metadata) as m
  cross join unnest(m.response) as response
  cross join unnest(m.request) as request`;case"supavisor_logs":return"cross join unnest(metadata) as m";default:return""}},h=i.IS_PLATFORM?"where ( parsed.application_name = 'pg_cron' or regexp_contains(event_message, 'cron job') )":"where ( parsed.application_name = 'pg_cron' or event_message::text LIKE '%cron job%' )",f=e=>{let t=e.reduce((e,t)=>{let s=_(t);return e[s]+=1,e},{second:0,minute:0,hour:0,day:0});return Object.keys(t).reduce((e,s)=>t[e]>t[s]?e:s)},_=e=>({0:"second",1:"minute",2:"hour",3:"day"})[["second","minute","hour"].map(t=>e.get(t)).reduce((e,t)=>(0===t&&(e+=1),e),0)];function y(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(WITH)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function b(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(ILIKE)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)}function S(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.apikey?.[0];if(!t)return;if(t.invalid)return"<invalid>";let s=t?.payload?.[0];return s&&"HS256"===s.algorithm&&"supabase"===s.issuer&&["anon","service_role"].includes(s.role)&&!s.subject?s.role:"<unrecognized>"}function v(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.apikey?.[0]?.apikey?.[0];if(t)return t.error?`${t.prefix}... <invalid: ${t.error}>`:`${t.prefix}...`}function E(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.authorization?.[0];if(!t||t.invalid)return;let s=t?.payload?.[0];if(s&&s.role)return s.role}e.s(["apiKey",()=>v,"checkForILIKEClause",()=>b,"checkForWithClause",()=>y,"fillTimeseries",0,(e,t,r,a,o,i,n=20,l)=>{let u;if(0===e.length&&!(o&&i))return[];if(e.length>n)return e.map(e=>{let r=e[t],a=d(r)?c(r):s.default.utc(r).toISOString();return e[t]=a,e});if(e.length<=1&&!(o&&i))return e;let m=e.map(e=>s.default.utc(e[t])),g=i?s.default.utc(i):s.default.utc(Math.max.apply(null,m)),p=o?s.default.utc(o):s.default.utc(Math.min.apply(null,m)),h=e.length>0?m:[p,g],_=1;if(l){let e=l.match(/^(\d+)(m|h|d|s)$/);e?(_=parseInt(e[1],10),u=({s:"second",m:"minute",h:"hour",d:"day"})[e[2]]):u=f(h)}else u=f(h);0!==e.length||l||(u="minute");let y=e.map(e=>{let a=e[t],o=d(a)?c(a):s.default.utc(a).toISOString();return Array.isArray(r)&&0===r.length?{[t]:o}:(e[t]=o,e)}),b=p;for(;b.isBefore(g)||b.isSame(g);){if(!m.find(e=>e.year()===b.year()&&e.month()===b.month()&&e.date()===b.date()&&e.hour()===b.hour()&&e.minute()===b.minute()&&e.second()===b.second())){let e=("string"==typeof r?[r]:r).reduce((e,t)=>({...e,[t]:a}),{});y.push({[t]:b.toISOString(),...e})}b=b.add(_,u)}return y},"genChartQuery",0,(e,t,r)=>{let a,o,i,n,l,c,[d,m]=(a=t.iso_timestamp_end?(0,s.default)(t.iso_timestamp_end):(0,s.default)(),o=t.iso_timestamp_start?(0,s.default)(t.iso_timestamp_start):(0,s.default)(),i="minute",n=360,l=a.diff(o,"minute"),c=a.diff(o,"hour"),l>720?(i="hour",n=120):c>72&&(i="day",n=7),[o.add(-n,i),i]),f=g(e,r),_=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 500";case"postgres_logs":case"pg_cron_logs":return"parsed.error_severity IN ('ERROR', 'FATAL', 'PANIC')";case"auth_logs":return"metadata.level = 'error' OR SAFE_CAST(metadata.status AS INT64) >= 400";case"function_logs":return"metadata.level IN ('error', 'fatal')";default:return"false"}}(e),y=function(e){switch(e){case"edge_logs":case"function_edge_logs":return"response.status_code >= 400 AND response.status_code < 500";case"postgres_logs":return"parsed.error_severity IN ('WARNING')";case"auth_logs":return"metadata.level = 'warning'";case"function_logs":return"metadata.level IN ('warning')";default:return"false"}}(e);e===u.LogsTableName.PG_CRON&&(e=u.LogsTableName.POSTGRES,f=h);let b=p(e);return`
SELECT
-- log-event-chart
  timestamp_trunc(t.timestamp, ${m}) as timestamp,
  count(CASE WHEN NOT (${_} OR ${y}) THEN 1 END) as ok_count,
  count(CASE WHEN ${_} THEN 1 END) as error_count,
  count(CASE WHEN ${y} THEN 1 END) as warning_count,
FROM
  ${e} t
  ${b}
  ${f?f+` and t.timestamp > '${d.toISOString()}'`:`where t.timestamp > '${d.toISOString()}'`}
GROUP BY
timestamp
ORDER BY
  timestamp ASC
  `},"genCountQuery",0,(e,t)=>{let s=g(e,t);e===u.LogsTableName.PG_CRON&&(e=u.LogsTableName.POSTGRES,s=h);let r=p(e);return`SELECT count(*) as count FROM ${e} ${r} ${s}`},"genDefaultQuery",0,(e,t,s=100)=>{let r=g(e,t),a=p(e),o="order by timestamp desc";switch(e){case"edge_logs":if(!i.IS_PLATFORM)return`
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
  `;case"postgres_logs":if(!i.IS_PLATFORM)return`
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
    `;case"function_edge_logs":if(!i.IS_PLATFORM)return`
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
  `;case"pg_cron_logs":let n=r?`${h} AND ${r.substring(6)}`:h;return`select id, postgres_logs.timestamp, event_message, parsed.error_severity, parsed.query
from postgres_logs
${a}
${n}
${o}
limit ${s}
`}},"genSingleLogQuery",0,(e,t)=>`select id, timestamp, event_message, metadata from ${e} where id = '${t}' limit 1`,"isDefaultLogPreviewFormat",0,e=>e&&e.timestamp&&e.event_message&&e.id,"isUnixMicro",0,d,"jwtAPIKey",()=>S,"maybeShowUpgradePrompt",0,(e,t)=>{let r=Math.abs((0,s.default)().diff((0,s.default)(e),"day"));return r>1&&"free"===t||r>7&&"pro"===t||r>28&&"team"===t||r>90&&"enterprise"===t},"maybeShowUpgradePromptIfNotEntitled",0,(e,t)=>!!t&&Math.abs((0,s.default)().diff((0,s.default)(e),"day"))>t,"role",()=>E,"unixMicroToIsoTimestamp",0,c,"useEditorHints",0,()=>{let e=(0,t.useMonaco)();(0,o.useEffect)(()=>{if(e){let t=e.languages.registerCompletionItemProvider("pgsql",{triggerCharacters:["`"," ","."],provideCompletionItems:function(t,s,r){let o=new n.default(t,s.column-2,s.lineNumber-1);if(o.isNextDQuote())return{suggestions:[]};let i=[],u=l.default.schemas.filter(e=>o._text.includes(e.reference));if(0===u.length&&(u=l.default.schemas),o.isNextPeriod()){let t=u.flatMap(e=>e.fields).flatMap(e=>{let[t,...s]=e.path.split(".");return s}).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));i=i.concat(t)}if("`"===r.triggerCharacter||" "===r.triggerCharacter){let t=l.default.schemas.map(t=>({label:t.reference,kind:e.languages.CompletionItemKind.Class,insertText:t.reference})),s=u.flatMap(e=>e.fields).flatMap(e=>e.path.split(".").slice(0,-1)).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));i=(i=i.concat(s)).concat(t)}return{suggestions:(0,a.default)(i,"label")}}});return()=>{t.dispose()}}},[e])}])},993394,e=>{"use strict";var t,s=e.i(55956),r=e.i(10429);e.i(128328);var a=e.i(86086);let o=`${r.DOCS_URL}/guides/platform/logs#querying-with-the-logs-explorer`,i=[{label:"Recent Errors",mode:"simple",searchString:"[Ee]rror|\\s[45][0-9][0-9]\\s",for:["api"]},{label:"Commits",mode:"simple",searchString:"COMMIT",for:["database"]},{label:"Commits By User",description:"Count of commits made by users on the database",mode:"custom",searchString:`select
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
`,for:["api"]}],n={search_query:e=>`regexp_contains(event_message, '${e}')`},l={postgres_logs:{...n,database:e=>`identifier = '${e}'`,"severity.error":"parsed.error_severity in ('ERROR', 'FATAL', 'PANIC')","severity.noError":"parsed.error_severity not in ('ERROR', 'FATAL', 'PANIC')","severity.log":"parsed.error_severity = 'LOG'"},edge_logs:{...n,database:e=>`identifier = '${e}'`,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499","product.database":"request.path like '/rest/%' or request.path like '/graphql/%'","product.storage":"request.path like '/storage/%'","product.auth":"request.path like '/auth/%'","product.realtime":"request.path like '/realtime/%'","method.get":"request.method = 'GET'","method.post":"request.method = 'POST'","method.put":"request.method = 'PUT'","method.patch":"request.method = 'PATCH'","method.delete":"request.method = 'DELETE'","method.options":"request.method = 'OPTIONS'"},function_edge_logs:{...n,"status_code.error":"response.status_code between 500 and 599","status_code.success":"response.status_code between 200 and 299","status_code.warning":"response.status_code between 400 and 499"},function_logs:{...n,"severity.error":"metadata.level = 'error'","severity.notError":"metadata.level != 'error'","severity.log":"metadata.level = 'log'","severity.info":"metadata.level = 'info'","severity.debug":"metadata.level = 'debug'","severity.warn":"metadata.level = 'warn'"},auth_logs:{...n,"severity.error":"metadata.level = 'error' or metadata.level = 'fatal'","severity.warning":"metadata.level = 'warning'","severity.info":"metadata.level = 'info'","status_code.server_error":"cast(metadata.status as int64) between 500 and 599","status_code.client_error":"cast(metadata.status as int64) between 400 and 499","status_code.redirection":"cast(metadata.status as int64) between 300 and 399","status_code.success":"cast(metadata.status as int64) between 200 and 299","endpoints.admin":'REGEXP_CONTAINS(metadata.path, "/admin")',"endpoints.signup":'REGEXP_CONTAINS(metadata.path, "/signup|/invite|/verify")',"endpoints.authentication":'REGEXP_CONTAINS(metadata.path, "/token|/authorize|/callback|/otp|/magiclink")',"endpoints.recover":'REGEXP_CONTAINS(metadata.path, "/recover")',"endpoints.user":'REGEXP_CONTAINS(metadata.path, "/user")',"endpoints.logout":'REGEXP_CONTAINS(metadata.path, "/logout")'},realtime_logs:{...n},storage_logs:{...n},postgrest_logs:{...n,database:e=>`identifier = '${e}'`},pgbouncer_logs:{...n},supavisor_logs:{...n,database:e=>`m.project like '${e}%'`},pg_upgrade_logs:{...n},pg_cron_logs:{...n},etl_replication_logs:{...n,pipeline_id:e=>`pipeline_id = ${e}`}};var u=((t={}).EDGE="edge_logs",t.POSTGRES="postgres_logs",t.FUNCTIONS="function_logs",t.FN_EDGE="function_edge_logs",t.AUTH="auth_logs",t.AUTH_AUDIT="auth_audit_logs",t.REALTIME="realtime_logs",t.STORAGE="storage_logs",t.POSTGREST="postgrest_logs",t.SUPAVISOR="supavisor_logs",t.PGBOUNCER="pgbouncer_logs",t.PG_UPGRADE="pg_upgrade_logs",t.PG_CRON="pg_cron_logs",t.ETL="etl_replication_logs",t);let c={postgres_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events with ERROR, PANIC, or FATAL"},{key:"noError",label:"No Error",description:"Show all non-error events"},{key:"log",label:"Log",description:"Show all events that are log severity"}]}},edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]},product:{label:"Product",key:"product",options:[{key:"database",label:"Database",description:""},{key:"auth",label:"Auth",description:""},{key:"storage",label:"Storage",description:""},{key:"realtime",label:"Realtime",description:""}]},method:{label:"Method",key:"method",options:[{key:"get",label:"GET",description:""},{key:"options",label:"OPTIONS",description:""},{key:"put",label:"PUT",description:""},{key:"post",label:"POST",description:""},{key:"patch",label:"PATCH",description:""},{key:"delete",label:"DELETE",description:""}]}},...a.IS_PLATFORM?{function_edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]}}}:{},function_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:'Show all events that are "error" severity'},{key:"warn",label:"Warning",description:'Show all events that are "warn" severity'},{key:"info",label:"Info",description:'Show all events that are "info" severity'},{key:"debug",label:"Debug",description:'Show all events that are "debug" severity'},{key:"log",label:"Log",description:'Show all events that are "log" severity'}]}},auth_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events that have error or fatal severity"},{key:"warning",label:"Warning",description:"Show all events that have warning severity"},{key:"info",label:"Info",description:"Show all events that have info severity"}]},status_code:{label:"Status Code",key:"status_code",options:[{key:"server_error",label:"Server Error",description:"Show all requests with 5XX status code"},{key:"client_error",label:"Client Error",description:"Show all requests with 4XX status code"},{key:"redirection",label:"Redirection",description:"Show all requests that have 3XX status code"},{key:"success",label:"Success",description:"Show all requests that have 2XX status code"}]},endpoints:{label:"Endpoints",key:"endpoints",options:[{key:"admin",label:"Admin",description:"Show all admin requests"},{key:"signup",label:"Sign up",description:"Show all signup and authorization requests"},{key:"recover",label:"Password Recovery",description:"Show all password recovery requests"},{key:"authentication",label:"Authentication",description:"Show all authentication flow requests (login, otp, and Oauth2)"},{key:"user",label:"User",description:"Show all user data requests"},{key:"logout",label:"Logout",description:"Show all logout requests"}]}}},d=[{text:"Last 15 minutes",calcFrom:()=>(0,s.default)().subtract(15,"minute").toISOString(),calcTo:()=>""},{text:"Last 30 minutes",calcFrom:()=>(0,s.default)().subtract(30,"minute").toISOString(),calcTo:()=>""},{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 2 days",calcFrom:()=>(0,s.default)().subtract(2,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 5 days",calcFrom:()=>(0,s.default)().subtract(5,"day").toISOString(),calcTo:()=>""}],m=[{text:"Last hour",calcFrom:()=>(0,s.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,s.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,s.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,s.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 7 days",calcFrom:()=>(0,s.default)().subtract(7,"day").toISOString(),calcTo:()=>""}];e.s(["EXPLORER_DATEPICKER_HELPERS",0,m,"FILTER_OPTIONS",0,c,"LOGS_EXPLORER_DOCS_URL",0,o,"LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD",0,2,"LOGS_SOURCE_DESCRIPTION",0,{edge_logs:"Logs obtained from the network edge, containing all API requests",postgres_logs:"Database logs obtained directly from Postgres",function_logs:"Function logs generated from runtime execution",function_edge_logs:"Function call logs, containing the request and response",auth_logs:"Errors, warnings, and performance details from the auth service",auth_audit_logs:"Audit records of user signups, logins, and account changes",realtime_logs:"Realtime server for Postgres logical replication broadcasting",storage_logs:"Object storage logs",postgrest_logs:"RESTful API web server logs",supavisor_logs:"Shared connection pooler logs for PostgreSQL",pgbouncer_logs:"Dedicated connection pooler for PostgreSQL",pg_upgrade_logs:"Logs generated by the Postgres version upgrade process",pg_cron_logs:"Postgres logs from pg_cron cron jobs",etl_replication_logs:"Logs from the replication process"},"LOGS_TABLES",0,{api:"edge_logs",database:"postgres_logs",functions:"function_logs",fn_edge:"function_edge_logs",auth:"auth_logs",realtime:"realtime_logs",storage:"storage_logs",postgrest:"postgrest_logs",supavisor:"supavisor_logs",pg_upgrade:"pg_upgrade_logs",pg_cron:"postgres_logs",pgbouncer:"pgbouncer_logs",etl:"etl_replication_logs"},"LOG_ROUTES_WITH_REPLICA_SUPPORT",0,["/project/[ref]/logs/edge-logs","/project/[ref]/logs/pooler-logs","/project/[ref]/logs/postgres-logs","/project/[ref]/logs/postgrest-logs"],"LogsTableName",()=>u,"PREVIEWER_DATEPICKER_HELPERS",0,d,"SQL_FILTER_TEMPLATES",0,l,"TEMPLATES",0,i,"TIER_QUERY_LIMITS",0,{FREE:{text:"1 day",value:1,unit:"day",promptUpgrade:!0},PRO:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},PAYG:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},TEAM:{text:"28 days",value:28,unit:"day",promptUpgrade:!0},ENTERPRISE:{text:"90 days",value:90,unit:"day",promptUpgrade:!1},PLATFORM:{text:"1 day",value:1,unit:"day",promptUpgrade:!1}},"getDefaultHelper",0,e=>e.find(e=>e.default)||e[0]])},884892,e=>{"use strict";let t=class{_line;_text;_lines;model;offset;lineNumber;constructor(e,t,s){this.model=e,this.offset=t,this.lineNumber=s,this._text=e.getValue(),this._lines=this._text.split(/\r?\n/g),this._line=this._lines[s]}hasNext(){return this.lineNumber>=0||this.offset>=0}isFowardDQuote(){return!!this.hasForward()&&34===this.peekForward()}isNextDQuote(){return!!this.hasNext()&&34===this.peekNext()}isNextPeriod(){return!!this.hasNext()&&46===this.peekNext()}peekNext(){return this.offset<0?10*(this.lineNumber>0):this._line.charCodeAt(this.offset)}hasForward(){return this.lineNumber<this._lines.length||this.offset<this._line.length}peekForward(){return this.offset===this._line.length?10*(this.lineNumber!==this._lines.length):this._line.charCodeAt(this.offset+1)}next(){if(this.offset<0)return this.lineNumber>0?(this.lineNumber--,this._line=this._lines[this.lineNumber],this.offset=this._line.length-1,10):(this.lineNumber=-1,0);let e=this._line.charCodeAt(this.offset);return this.offset--,e}readArguments(){let e=0,t=0,s=0,r=0;for(;this.hasNext();){let a=this.next();switch(a){case 40:if(--e<0)return r;break;case 41:e++;break;case 123:s--;break;case 125:s++;break;case 91:t--;break;case 93:t++;break;case 34:case 39:for(;this.hasNext()&&a!==this.next(););break;case 44:!e&&!t&&!s&&r++}}return -1}readIdent(){let e=!1,t=!1,s="";for(;this.hasNext();){let r=this.peekNext();if(e&&!t&&!this._isIdentPart(r))break;if(r=this.next(),!e&&t&&34===r){e=!0;continue}if(e||32!==r&&9!==r&&10!=r){if(!e&&(34===r||this._isIdentPart(r)))e=!0,t=34===r,s=String.fromCharCode(r)+s;else if(e)if(t){if(0===r||(s=String.fromCharCode(r)+s,34===r))break}else s=String.fromCharCode(r)+s}}return s}readIdents(e){let t=[];for(;e>0;){e--;let s=this.readIdent();if(!s||(t.push(s),!this.isNextPeriod()))break}return t.reverse()}_isIdentPart(e){return 95===e||e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}};e.s(["default",0,t])},281192,e=>{"use strict";var t=e.i(4196);let s={},r=e=>(0,t.createParser)({parse:t=>t??e,serialize:e=>e||""});function a(){let[e,a]=(0,t.useQueryState)("s",r("")),[o,i]=(0,t.useQueryState)("its",r("")),[n,l]=(0,t.useQueryState)("ite",r("")),[u,c]=(0,t.useQueryState)("log",r("")),[d,m]=(0,t.useQueryState)("f",(0,t.createParser)({parse:e=>{if(!e)return s;try{return JSON.parse(e)}catch(e){return s}},serialize:e=>{if(!e)return"";try{return JSON.stringify(e)}catch(e){return""}}})),g=d||s,p=e=>{a(e||"")},h=e=>{m(e||s)};return{search:e||"",timestampStart:o||"",timestampEnd:n||"",selectedLogId:u||null,filters:g,setSearch:p,setTimeRange:(e,t)=>{i(e||""),l(t||"")},setSelectedLogId:e=>{c(e||"")},setFilters:h,updateFilter:(e,t)=>{h({...g,[e]:t})},reset:()=>{p(""),i(""),l(""),c(""),m(s)}}}e.s(["useLogsUrlState",()=>a])},450049,e=>{"use strict";var t=e.i(867088),s=e.i(242882),r=e.i(55956),a=e.i(389959),o=e.i(993394),i=e.i(460988),n=e.i(234745),l=e.i(520124),u=e.i(281192);e.s(["default",0,function({projectRef:e,table:c,filterOverride:d,limit:m}){let g,p,h=(0,o.getDefaultHelper)(o.PREVIEWER_DATEPICKER_HELPERS),[f,_]=(0,a.useState)(new Date().toISOString()),{timestampStart:y,timestampEnd:b,filters:S,search:v}=(0,u.useLogsUrlState)(),E=(0,a.useMemo)(()=>y||h.calcFrom(),[y,h]),T=(0,a.useMemo)(()=>b||h.calcTo(),[b,h]),w=(0,a.useMemo)(()=>({...S,...d,...v?{search_query:v}:{}}),[JSON.stringify(S),JSON.stringify(d),v]),I=(0,a.useMemo)(()=>({iso_timestamp_start:E,iso_timestamp_end:T,sql:(0,i.genDefaultQuery)(c,w,m)}),[E,T,c,w,m]),N=(0,a.useMemo)(()=>["projects",e,"logs",I],[e,I]),{data:O,isSuccess:R,isLoading:P,isRefetching:k,error:$,fetchNextPage:A,isFetchingNextPage:C,refetch:L}=(0,t.useInfiniteQuery)({queryKey:N,queryFn:async({signal:t,pageParam:s})=>{let{data:r,error:a}=await (0,n.get)("/platform/projects/{ref}/analytics/endpoints/logs.all",{params:{path:{ref:e},query:{...I,iso_timestamp_end:s||I.iso_timestamp_end}},signal:t});if(a)throw a;return r},refetchOnWindowFocus:!1,initialPageParam:void 0,getNextPageParam(e){if((e.result?.length??0)===0)return;let t=e.result.length,{timestamp:s}=e.result[t-1];return r.default.utc(Number(s/1e3)).toISOString()}}),{logData:j,error:x,oldestTimestamp:q}=(0,a.useMemo)(()=>{let e=[],t=$?$.message:null;O?.pages?.forEach(s=>{s?.result&&(e=[...e,...s.result]),!t&&s?.error&&(t=s.error)});let s=e.length>0?e[e.length-1]?.timestamp:void 0;return{logData:e,error:t,oldestTimestamp:s}},[O?.pages]),F=(0,a.useMemo)(()=>(0,i.genCountQuery)(c,w),[c,w]),M=(0,a.useMemo)(()=>["projects",e,"logs-count",{projectRef:e,sql:F,iso_timestamp_start:f,iso_timestamp_end:T,table:c,mergedFilters:w}],[e,F,f,T,c,w]),{data:D}=(0,s.useQuery)({queryKey:M,queryFn:async({signal:t})=>{let{data:s,error:r}=await (0,n.get)("/platform/projects/{ref}/analytics/endpoints/logs.all",{params:{path:{ref:e},query:{sql:F,iso_timestamp_start:f,iso_timestamp_end:T}},signal:t});if(r)throw r;return s},refetchOnWindowFocus:!1,refetchInterval:6e4,enabled:!!(!x&&O&&O?.pages?.length>0)}),G=D?.result?.[0]?.count??0,U=(0,a.useMemo)(()=>(0,i.genChartQuery)(c,I,w),[c,I,w]),H=(0,a.useMemo)(()=>["projects",e,"logs-chart",{projectRef:e,sql:U,iso_timestamp_start:E,iso_timestamp_end:T}],[e,U,E,T]),{data:Q,refetch:X}=(0,s.useQuery)({queryKey:H,queryFn:async({signal:t})=>{let{data:s,error:r}=await (0,n.get)("/platform/projects/{ref}/analytics/endpoints/logs.all",{params:{path:{ref:e},query:{iso_timestamp_start:E,iso_timestamp_end:T,sql:U}},signal:t});if(r)throw r;return s},refetchOnWindowFocus:!1}),W=(0,a.useCallback)(async()=>{_(new Date().toISOString()),X(),L()},[L,X]),K=(g=Q?.result??[],p="timestamp",(0,a.useMemo)(()=>0!==g.length&&(0,i.isUnixMicro)(g[0][p])?g?.map(e=>(e[p]=(0,i.unixMicroToIsoTimestamp)(e[p]),e)):g,[JSON.stringify(g)])),{data:B,error:z}=(0,l.useFillTimeseriesSorted)(K,"timestamp","count",0,E,T||new Date().toISOString());return{newCount:G,logData:j,isSuccess:R,isLoading:P||k,isLoadingOlder:C,error:x||z,filters:w,params:I,oldestTimestamp:q?String(q):void 0,eventChartData:B,refresh:W,loadOlder:()=>A()}}],450049)}]);

//# debugId=d87f4a51-9c7a-8e7f-e276-eb0c706c2283
//# sourceMappingURL=591ff7a0aef58bcd.js.map