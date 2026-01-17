;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="5bc5df0b-1323-33c4-f5d6-1ff003cf738a")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,971687,e=>{"use strict";let t=(0,e.i(388019).default)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);e.s(["Calendar",()=>t],971687)},647307,e=>{"use strict";var t=e.i(755216),a=e.i(38429),n=e.i(356003),r=e.i(355901),i=e.i(714403),s=e.i(801834);async function o({name:e,projectRef:a,connectionString:n}){let r=t.default.schemas.create({name:e,owner:"postgres"}).sql,{result:s}=await (0,i.executeSql)({projectRef:a,connectionString:n,sql:r,queryKey:["schema","create"]});return s}e.s(["useSchemaCreateMutation",0,({onSuccess:e,onError:t,...i}={})=>{let l=(0,n.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>o(e),async onSuccess(t,a,n){let{projectRef:r}=a;await (0,s.invalidateSchemasQuery)(l,r),await e?.(t,a,n)},async onError(e,a,n){void 0===t?r.toast.error(`Failed to create schema: ${e.message}`):t(e,a,n)},...i})}])},433857,e=>{"use strict";let t=(0,e.i(388019).default)("ListPlus",[["path",{d:"M11 12H3",key:"51ecnj"}],["path",{d:"M16 6H3",key:"1wxfjs"}],["path",{d:"M16 18H3",key:"12xzn7"}],["path",{d:"M18 9v6",key:"1twb98"}],["path",{d:"M21 12h-6",key:"bt1uis"}]]);e.s(["ListPlus",()=>t],433857)},412385,e=>{"use strict";var t=e.i(389959),a=e.i(323796);e.s(["useConfirmOnClose",0,({checkIsDirty:e,onClose:n})=>{let[r,i]=(0,t.useState)(!1),s=(0,a.default)(e),o=(0,a.default)(n),l=(0,t.useCallback)(()=>{s.current()?i(!0):o.current()},[]),c=(0,t.useCallback)(()=>{i(!1),o.current()},[]),d=(0,t.useCallback)(()=>{i(!1)},[]),u=(0,t.useMemo)(()=>({visible:r,onClose:c,onCancel:d}),[r,c,d]);return(0,t.useMemo)(()=>({confirmOnClose:l,modalProps:u}),[l,u])}])},45674,(e,t,a)=>{var n=e.r(467798),r=e.r(323472),i=e.r(276199),s=e.r(372797),o=e.r(140062),l=e.r(125581),c=e.r(584902),d=e.r(189082),u=Object.prototype.hasOwnProperty;t.exports=function(e){if(null==e)return!0;if(o(e)&&(s(e)||"string"==typeof e||"function"==typeof e.splice||l(e)||d(e)||i(e)))return!e.length;var t=r(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(c(e))return!n(e).length;for(var a in e)if(u.call(e,a))return!1;return!0}},28889,(e,t,a)=>{var n=e.r(995762),r=e.r(730007),i=e.r(110754),s=e.r(372797);t.exports=function(){var e=arguments.length;if(!e)return[];for(var t=Array(e-1),a=arguments[0],o=e;o--;)t[o-1]=arguments[o];return n(s(a)?i(a):[a],r(t,1))}},707409,e=>{"use strict";var t=e.i(28889),a=e.i(893524);let n=["int2","int4","int8","float4","float8","numeric","double precision"],r=["json","jsonb"],i=["text","varchar"],s=["timestamp","timestamptz"],o=["date"],l=["time","timetz"],c=(0,t.default)(s,o,l),d=["uuid","bool","vector","bytea"],u=(0,a.default)((0,t.default)(n,r,i,c,d));e.s(["DATETIME_TYPES",0,c,"DATE_TYPES",0,o,"JSON_TYPES",0,r,"NUMERICAL_TYPES",0,n,"OTHER_DATA_TYPES",0,d,"POSTGRES_DATA_TYPES",0,u,"POSTGRES_DATA_TYPE_OPTIONS",0,[{name:"int2",description:"Signed two-byte integer",type:"number"},{name:"int4",description:"Signed four-byte integer",type:"number"},{name:"int8",description:"Signed eight-byte integer",type:"number"},{name:"float4",description:"Single precision floating-point number (4 bytes)",type:"number"},{name:"float8",description:"Double precision floating-point number (8 bytes)",type:"number"},{name:"numeric",description:"Exact numeric of selectable precision",type:"number"},{name:"json",description:"Textual JSON data",type:"json"},{name:"jsonb",description:"Binary JSON data, decomposed",type:"json"},{name:"text",description:"Variable-length character string",type:"text"},{name:"varchar",description:"Variable-length character string",type:"text"},{name:"uuid",description:"Universally unique identifier",type:"text"},{name:"date",description:"Calendar date (year, month, day)",type:"time"},{name:"time",description:"Time of day (no time zone)",type:"time"},{name:"timetz",description:"Time of day, including time zone",type:"time"},{name:"timestamp",description:"Date and time (no time zone)",type:"time"},{name:"timestamptz",description:"Date and time, including time zone",type:"time"},{name:"bool",description:"Logical boolean (true/false)",type:"bool"},{name:"bytea",description:"Variable-length binary string",type:"others"}],"RECOMMENDED_ALTERNATIVE_DATA_TYPE",0,{varchar:{alternative:"text",reference:"https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_varchar.28n.29_by_default"},json:{alternative:"jsonb",reference:"https://www.postgresql.org/docs/current/datatype-json.html"},timetz:{alternative:"timestamptz",reference:"https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_timetz"},timestamp:{alternative:"timestamptz",reference:"https://wiki.postgresql.org/wiki/Don't_Do_This#Don.27t_use_timestamp_.28without_time_zone.29"}},"TEXT_TYPES",0,i,"TIMESTAMP_TYPES",0,s,"TIME_TYPES",0,l])},973512,832237,e=>{"use strict";var t=e.i(478902),a=e.i(246806),n=e.i(389959),r=e.i(837710);e.s(["ActionBar",0,({loading:e=!1,disableApply:i=!1,hideApply:s=!1,children:o,applyButtonLabel:l="Apply",backButtonLabel:c="Back",applyFunction:d,closePanel:u=a.default,formId:m})=>{let[p,h]=(0,n.useState)(!1),f=async()=>{h(!0),await new Promise(e=>d(e)),h(!1)};return(0,t.jsxs)("div",{className:"flex w-full justify-end space-x-3 border-t border-default px-3 py-4",children:[(0,t.jsx)(r.Button,{type:"default",htmlType:"button",onClick:u,disabled:p||e,children:c}),o,void 0!==d?(0,t.jsx)(r.Button,{onClick:f,disabled:i||p||e,loading:p||e,children:l}):s?(0,t.jsx)("div",{}):(0,t.jsx)(r.Button,{disabled:e||i,loading:e,"data-testid":"action-bar-save-row",htmlType:"submit",form:m,children:l})]})}],973512);var i=a,s=e.i(971687),o=e.i(370410),l=e.i(365257),c=e.i(17203),d=e.i(116746),u=e.i(433857),m=e.i(388019);let p=(0,m.default)("ToggleRight",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"6",ry:"6",key:"f2vt7d"}],["circle",{cx:"16",cy:"12",r:"2",key:"4ma0v8"}]]),h=(0,m.default)("Type",[["polyline",{points:"4 7 4 4 20 4 20 7",key:"1nosan"}],["line",{x1:"9",x2:"15",y1:"20",y2:"20",key:"swin9y"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]]);var f=e.i(215261),_=e.i(206413),x=e.i(592360),y=e.i(178527),g=e.i(703526),b=e.i(917007),v=e.i(920432),j=e.i(549815),w=e.i(911509),S=e.i(866205),E=e.i(877555),T=e.i(171997),N=e.i(9679),C=e.i(793912),A=e.i(135144),k=e.i(689805),R=e.i(396831),q=e.i(613580),P=e.i(843778),I=e.i(707409);e.s(["default",0,({value:e,className:a,enumTypes:m=[],disabled:$=!1,showLabel:L=!0,layout:M="horizontal",description:O,showRecommendation:D=!1,onOptionSelect:F=i.default,error:Q})=>{let[z,Y]=(0,n.useState)(!1),U=I.POSTGRES_DATA_TYPES.concat(m.map(e=>e.format.replaceAll('"',""))),K=!e||U.includes(e),W=I.RECOMMENDED_ALTERNATIVE_DATA_TYPE[e],H="This column's data type cannot be changed via the Table Editor as it is not supported yet. You can do so through the SQL Editor instead.",B=e=>{switch(e){case"number":return(0,t.jsx)(d.Hash,{size:14,className:"text-foreground",strokeWidth:1.5});case"time":return(0,t.jsx)(s.Calendar,{size:14,className:"text-foreground",strokeWidth:1.5});case"text":return(0,t.jsx)(h,{size:14,className:"text-foreground",strokeWidth:1.5});case"json":case"jsonb":return(0,t.jsx)("div",{className:"text-foreground",style:{padding:"0px 1px"},children:"{ }"});case"bool":return(0,t.jsx)(p,{size:14,className:"text-foreground",strokeWidth:1.5});default:return(0,t.jsx)(u.ListPlus,{size:16,className:"text-foreground",strokeWidth:1.5})}};return K?$&&!L?(0,t.jsxs)(q.Tooltip,{children:[(0,t.jsx)(q.TooltipTrigger,{children:(0,t.jsx)(T.Input,{readOnly:!0,disabled:!0,label:L?"Type":"",layout:L?"horizontal":void 0,className:"md:gap-x-0",size:"small",value:e})}),!L&&O&&(0,t.jsx)(q.TooltipContent,{side:"bottom",children:(0,t.jsx)("div",{className:"w-80",children:O})})]}):(0,t.jsxs)("div",{className:(0,P.cn)("flex flex-col gap-y-2",a),children:[L&&(0,t.jsx)(N.Label_Shadcn_,{className:"text-foreground-light",children:"Type"}),(0,t.jsxs)(k.Popover_Shadcn_,{open:z,onOpenChange:Y,children:[(0,t.jsx)(A.PopoverTrigger_Shadcn_,{asChild:!0,children:(0,t.jsx)(r.Button,{type:Q?"danger":"default",role:"combobox",size:"small","aria-expanded":z,className:(0,P.cn)("w-full justify-between",!e&&"text-foreground-lighter"),iconRight:(0,t.jsx)(l.ChevronsUpDown,{className:"ml-2 h-4 w-4 shrink-0 opacity-50"}),children:e?(0,t.jsxs)("div",{className:"flex gap-2 items-center",children:[(0,t.jsx)("span",{children:B((e=>{let t=I.POSTGRES_DATA_TYPE_OPTIONS.find(t=>t.name===e);if(t)return t;let a=m.find(t=>t.format===e);return a?{...a,type:"enum"}:void 0})(e)?.type??"")}),e.replaceAll('"',"")]}):"Choose a column type..."})}),(0,t.jsx)(C.PopoverContent_Shadcn_,{className:"w-[460px] p-0",side:"bottom",align:"center",children:(0,t.jsx)(R.ScrollArea,{className:"h-[335px]",children:(0,t.jsxs)(S.Command_Shadcn_,{children:[(0,t.jsx)(v.CommandInput_Shadcn_,{placeholder:"Search types...",className:"!bg-transparent focus:!shadow-none focus:!ring-0"}),(0,t.jsx)(g.CommandEmpty_Shadcn_,{children:"Type not found."}),(0,t.jsxs)(w.CommandList_Shadcn_,{children:[(0,t.jsx)(b.CommandGroup_Shadcn_,{children:I.POSTGRES_DATA_TYPE_OPTIONS.map(a=>(0,t.jsxs)(j.CommandItem_Shadcn_,{value:a.name,className:(0,P.cn)("relative",a.name===e?"bg-surface-200":""),onSelect:e=>{F(e),Y(!1)},children:[(0,t.jsxs)("div",{className:"flex items-center gap-2 pr-6",children:[(0,t.jsx)("span",{children:B(a.type)}),(0,t.jsx)("span",{className:"text-foreground",children:a.name}),(0,t.jsx)("span",{className:"text-foreground-lighter",children:a.description})]}),(0,t.jsx)("span",{className:"absolute right-3 top-2",children:a.name===e?(0,t.jsx)(o.Check,{className:"text-brand",size:14}):""})]},a.name))}),m.length>0&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(j.CommandItem_Shadcn_,{children:"Other types"}),(0,t.jsx)(b.CommandGroup_Shadcn_,{children:m.map(a=>(0,t.jsx)(j.CommandItem_Shadcn_,{value:a.format,className:(0,P.cn)("relative",a.format===e?"bg-surface-200":""),onSelect:e=>{F("public"===a.schema?e.replaceAll('"',""):e),Y(!1)},children:(0,t.jsxs)("div",{className:"flex items-center gap-2",children:[(0,t.jsx)("div",{children:(0,t.jsx)(u.ListPlus,{size:16,className:"text-foreground",strokeWidth:1.5})}),(0,t.jsx)("span",{className:"text-foreground",children:a.format.replaceAll('"',"")}),void 0!==a.comment&&(0,t.jsx)("span",{title:a.comment??"",className:"text-foreground-lighter",children:a.comment}),a.format===e&&(0,t.jsx)("span",{className:"absolute right-3 top-2",children:(0,t.jsx)(o.Check,{className:"text-brand",size:14})})]})},a.id))})]})]})]})})})]}),D&&void 0!==W&&(0,t.jsxs)(y.Alert_Shadcn_,{variant:"warning",className:"mt-2",children:[(0,t.jsx)(E.CriticalIcon,{}),(0,t.jsxs)(x.AlertTitle_Shadcn_,{children:[" ","It is recommended to use"," ",(0,t.jsx)("code",{className:"text-code-inline",children:W.alternative})," instead"]}),(0,t.jsxs)(_.AlertDescription_Shadcn_,{children:[(0,t.jsxs)("p",{children:["Postgres recommends against using the data type"," ",(0,t.jsx)("code",{className:"text-code-inline",children:e})," unless you have a very specific use case."]}),(0,t.jsxs)("div",{className:"flex items-center space-x-2 mt-3",children:[(0,t.jsx)(r.Button,{asChild:!0,type:"default",icon:(0,t.jsx)(c.ExternalLink,{}),children:(0,t.jsx)(f.default,{href:W.reference,target:"_blank",rel:"noreferrer",children:"Read more"})}),(0,t.jsxs)(r.Button,{type:"primary",onClick:()=>F(W.alternative),children:["Use ",W.alternative]})]})]})]})]}):(0,t.jsxs)(q.Tooltip,{children:[(0,t.jsx)(q.TooltipTrigger,{children:(0,t.jsx)(T.Input,{readOnly:!0,disabled:!0,label:L?"Type":"",layout:L?M:void 0,className:"md:gap-x-0 [&>div>div]:text-left",size:"small",icon:B(I.POSTGRES_DATA_TYPE_OPTIONS.find(t=>t.name===e)?.type??""),value:e,descriptionText:L?H:void 0})}),!L&&(0,t.jsx)(q.TooltipContent,{side:"bottom",className:"w-80",children:H})]})}],832237)},415190,e=>{"use strict";var t=e.i(242882),a=e.i(714403),n=e.i(938343),r=e.i(305015);async function i({projectRef:e,connectionString:t,id:n},i){if(!n)throw Error("id is required");let s=n?(0,r.default)(`
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${n}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', case
                    when t.typtype = 'e' then
                        case
                            when nt.nspname <> 'public' then concat(nt.nspname, '.', coalesce(bt.typname, t.typname))
                            else coalesce(bt.typname, t.typname)
                        end
                    else
                        coalesce(bt.typname, t.typname)
                end,
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `):"",{result:o}=await (0,a.executeSql)({projectRef:e,connectionString:t,sql:s,queryKey:["table-editor",n]},i);return o[0]?.entity??null}function s(e,{projectRef:t,connectionString:a,id:r}){return e.fetchQuery({queryKey:n.tableEditorKeys.tableEditor(t,r),queryFn:({signal:e})=>i({projectRef:t,connectionString:a,id:r},e)})}e.s(["getTableEditor",()=>i,"prefetchTableEditor",()=>s,"useTableEditorQuery",0,({projectRef:e,connectionString:a,id:r},{enabled:s=!0,...o}={})=>(0,t.useQuery)({queryKey:n.tableEditorKeys.tableEditor(e,r),queryFn:({signal:t})=>i({projectRef:e,connectionString:a,id:r},t),enabled:s&&void 0!==e&&void 0!==r&&!isNaN(r),refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:3e5,...o})],415190)},102631,e=>{"use strict";e.s(["generatePolicyUpdateSQL",0,e=>{let t="";return null!==e.definition&&void 0!==e.definition&&(t+=`using (${e.definition})${null===e.check||void 0===e.check?";":""}
`),null!==e.check&&void 0!==e.check&&(t+=`with check (${e.check});
`),`
alter policy "${e.name}" 
on "${e.schema}"."${e.table}"
to ${e.roles.join(", ")}
${t}
`.trim()}])},302372,e=>{"use strict";var t=e.i(242882),a=e.i(248593),n=e.i(234745),r=e.i(635494);e.i(10429);var i=e.i(837508),s=e.i(509847);async function o({projectRef:e,connectionString:t,schema:r},i,s){if(!e)throw Error("projectRef is required");let o=new Headers(s);t&&o.set("x-connection-encrypted",t);let{data:l,error:c}=await (0,n.get)("/platform/pg-meta/{ref}/policies",{params:{header:{"x-connection-encrypted":t,"x-pg-application-name":a.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e},query:{included_schemas:r||"",excluded_schemas:""}},headers:o,signal:i});return c&&(0,n.handleError)(c),l}e.s(["useDatabasePoliciesQuery",0,({projectRef:e,connectionString:a,schema:n},{enabled:l=!0,...c}={})=>{let{data:d}=(0,r.useSelectedProjectQuery)(),u=d?.status===i.PROJECT_STATUS.ACTIVE_HEALTHY;return(0,t.useQuery)({queryKey:s.databasePoliciesKeys.list(e,n),queryFn:({signal:t})=>o({projectRef:e,connectionString:a,schema:n},t),enabled:l&&void 0!==e&&u,...c})}])},938343,e=>{"use strict";e.s(["tableEditorKeys",0,{tableEditor:(e,t)=>["projects",e,"table-editor",t].filter(Boolean)}])},847278,e=>{"use strict";var t=e.i(755216),a=e.i(38429),n=e.i(356003),r=e.i(355901),i=e.i(915993),s=e.i(714403),o=e.i(938343),l=e.i(138658);async function c({projectRef:e,connectionString:a,id:n,name:r,schema:i,payload:o}){let{sql:l}=t.default.tables.update({id:n,name:r,schema:i},o),{result:c}=await (0,s.executeSql)({projectRef:e,connectionString:a,sql:l,queryKey:["table","update",n]});return c}e.s(["updateTable",()=>c,"useTableUpdateMutation",0,({onSuccess:e,onError:t,...s}={})=>{let d=(0,n.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>c(e),async onSuccess(t,a,n){let{projectRef:r,schema:s,id:c}=a;await Promise.all([d.invalidateQueries({queryKey:o.tableEditorKeys.tableEditor(r,c)}),d.invalidateQueries({queryKey:l.tableKeys.list(r,s)}),d.invalidateQueries({queryKey:i.lintKeys.lint(r)})]),await e?.(t,a,n)},async onError(e,a,n){void 0===t?r.toast.error(`Failed to update database table: ${e.message}`):t(e,a,n)},...s})}])},790819,e=>{"use strict";e.s(["tableRowKeys",0,{tableRows:(e,{table:t,roleImpersonationState:a,...n}={})=>["projects",e,"table-rows",t?.id,"rows",{roleImpersonation:a?.role,...n}],tableRowsCount:(e,{table:t,...a}={})=>["projects",e,"table-rows",t?.id,"count",a],tableRowsAndCount:(e,t)=>["projects",e,"table-rows",t]}])},310959,e=>{"use strict";var t=e.i(479084),a=e.i(977540);let n=10240,r=50,i=["text","varchar","char","character varying","character"],s=["json","jsonb"],o=new Set(s),l=new Set([...i,...s,"bytea","xml","hstore","clob","vector","geometry","geography","tsvector","tsquery","daterange","tsrange","tstzrange","numrange","int4range","int8range","cube","ltree","lquery","jsonpath","citext"]);e.s(["MAX_ARRAY_SIZE",0,r,"MAX_CHARACTERS",0,n,"THRESHOLD_COUNT",0,1e5,"getTableRowsSql",0,({table:e,filters:s=[],sorts:c=[],page:d,limit:u,maxCharacters:m=n,maxArraySize:p=r,sortExcludedColumns:h=[]})=>{if(!e||!e.columns)return"";let f=new a.Query().from(e.name,e.schema).select();s.forEach(t=>{let a=e.columns?.find(e=>e.name===t.column),n=!a||i.includes(a.format);f=f.filter(t.column,t.operator,n||""!==t.value?t.value:null)});let _=e.live_rows_estimate||0;if(0===c.length&&_<=1e5&&e.columns.length>0){let t=((e,{excludedColumns:t=[]}={})=>{let a=e.primary_keys?.map(e=>e.name);if(a&&a.length>0&&!a.every(e=>t.includes(e)))return a;if(e.columns&&e.columns.length>0){let a=e.columns.filter(e=>!e.data_type.includes("json")&&!t.includes(e.name));if(a.length>0)return[a[0].name]}return[]})(e,{excludedColumns:h});t.length>0&&t.forEach(t=>{f=f.order(e.name,t)})}else c.forEach(e=>{f=f.order(e.table,e.column,e.ascending,e.nullsFirst)});let{from:x,to:y}=function(e,t=100){let a=e?e*t:0;return{from:a,to:e?a+t-1:t-1}}((d??1)-1,u),g=`with _base_query as (${f.range(x,y).toSql({isCTE:!1,isFinal:!1})})`,b=e.columns.sort((e,t)=>e.ordinal_position-t.ordinal_position).map(e=>({name:e.name,format:e.format.toLowerCase()})),v=e.columns.filter(e=>{let t;return t=e.format,l.has(t.toLowerCase())}).map(e=>e.name),j=b.map(({name:e})=>{let a=(0,t.ident)(e);return v.includes(e)?`case
        when octet_length(${a}::text) > ${m} 
        then left(${a}::text, ${m}) || '...'
        else ${a}::text
      end as ${a}`:a});e.columns.filter(e=>"array"===e.data_type.toLowerCase()).map(e=>({name:e.name,format:e.format.toLowerCase().slice(1)})).forEach(({name:e,format:a})=>{let n=j.findIndex(a=>a===(0,t.ident)(e)),r=o.has(a)?`${a}[]`:"text[]";n>=0&&(j[n]=`
        case 
          when octet_length(${(0,t.ident)(e)}::text) > ${m} 
          then
            case
              when array_ndims(${(0,t.ident)(e)}) = 1
              then
                (select array_cat(${(0,t.ident)(e)}[1:${p}]::${r}, ${"text[]"===r?"array['...']":"array['{\"truncated\": true}'::json]"}::${r}))::${r}
              else
                ${(0,t.ident)(e)}[1:${p}]::${r}
            end
          else ${(0,t.ident)(e)}::${r}
        end
      `)});let w=j.join(","),S=new a.Query().from("_base_query").select(w);return`${g}
  ${S.toSql({isCTE:!0,isFinal:!0})}`}])},46974,585673,e=>{"use strict";let t=["smallint","integer","bigint","decimal","numeric","real","double precision","serial","bigserial","int2","int4","int8","float4","float8","smallserial","serial2","serial4","serial8"];function a(e){return t.indexOf(e.toLowerCase())>-1}let n=["json","jsonb","array"];function r(e){return n.indexOf(e.toLowerCase())>-1}let i=["array"];function s(e){return i.indexOf(e.toLowerCase())>-1}let o=["uuid","text","character varying"];function l(e){return o.indexOf(e.toLowerCase())>-1}let c=["citext"];function d(e){return c.indexOf(e.toLowerCase())>-1}let u=["timestamp","timestamptz"];function m(e){return u.indexOf(e.toLowerCase())>-1}let p=["date"];function h(e){return p.indexOf(e.toLowerCase())>-1}let f=["time","timetz"];function _(e){return f.indexOf(e.toLowerCase())>-1}let x=["boolean","bool"];function y(e){return x.indexOf(e.toLowerCase())>-1}let g=["user-defined"];function b(e){return g.indexOf(e.toLowerCase())>-1}let v=["bytea"];function j(e){return v.indexOf(e.toLowerCase())>-1}function w(e){let{targetTableSchema:t,targetTableName:a,targetColumnName:n}=e?.foreignKey??{};return!!t&&!!a&&!!n}e.s(["isArrayColumn",()=>s,"isBinaryColumn",()=>j,"isBoolColumn",()=>y,"isCiTextColumn",()=>d,"isDateColumn",()=>h,"isDateTimeColumn",()=>m,"isEnumColumn",()=>b,"isForeignKeyColumn",()=>w,"isJsonColumn",()=>r,"isNumericalColumn",()=>a,"isTextColumn",()=>l,"isTimeColumn",()=>_],585673);var S=e.i(962217);function E(e,t){let n=e.columns.find(e=>e.name==t.column);if(n&&a(n.format)){let e=Number(t.value);if(!Number.isNaN(e)&&!(e>Number.MAX_SAFE_INTEGER))return Number(t.value)}return t.value}function T({table:e}){if(!(0,S.isTableLike)(e))return{error:{message:"Only table rows can be updated or deleted"}};let t=e.primary_keys;return t&&0!=t.length?{primaryKeys:t.map(e=>e.name)}:{error:{message:"Please add a primary key column to your table to update or delete rows"}}}e.s(["formatFilterValue",()=>E,"getPrimaryKeys",()=>T],46974)},941381,70756,e=>{"use strict";var t=e.i(478902),a=e.i(356003),n=e.i(898452),r=e.i(389959),i=e.i(19583),s=e.i(415190);e.i(967533);var o=e.i(977540),l=e.i(310959),c=e.i(242882);e.i(128328);var d=e.i(86086),u=e.i(311827),m=e.i(962217),p=e.i(908937),h=e.i(201461);e.i(56031);var f=e.i(237948),_=e.i(714403),x=e.i(790819),y=e.i(46974);async function g(e){return new Promise(t=>setTimeout(t,e))}async function b(e,t=3,a=1e3){for(let n=0;n<=t;n++)try{return await e()}catch(e){if(429===(e instanceof f.ResponseError?e.code:e.status)&&n<t){let t=function(e){if(e instanceof f.ResponseError)return e.retryAfter;let t=e.headers?.get("retry-after");if(t)return parseInt(t)}(e),r=t?1e3*t:a*Math.pow(2,n);await g(r);continue}throw e}throw Error("Max retries reached without success")}let v=({table:e,filters:t=[],sorts:a=[]})=>{let n,r,i,s,l,c=new o.Query,d=e.columns.filter(e=>(e?.enum??[]).length>0&&"array"===e.dataType.toLowerCase()).map(e=>`"${e.name}"::text[]`),m=c.from(e.name,e.schema??void 0).select(d.length>0?`*,${d.join(",")}`:"*");t.filter(e=>e.value&&""!==e.value).forEach(t=>{let a=(0,y.formatFilterValue)(e,t);m=m.filter(t.column,t.operator,a)});let p=!1,{cursorPaginationEligible:h,cursorPaginationNonEligible:f}=(n=[],r=[],(i=e.primaryKey)&&n.push(i),s=e.uniqueIndexes,(l=s?.filter(t=>t.every(t=>{let a=e.columns.find(e=>e.name===t);return!!a&&!a.isNullable})))&&n.push(...l),r.push(...e.columns.filter(e=>!e.dataType.includes("json")).map(e=>e.name)),{cursorPaginationEligible:n,cursorPaginationNonEligible:r}),_=e.type===u.ENTITY_TYPE.TABLE||e.type===u.ENTITY_TYPE.PARTITIONED_TABLE||e.type===u.ENTITY_TYPE.MATERIALIZED_VIEW;if(0===a.length)h.length>0?(p=h[0],h[0].forEach(t=>{m=m.order(e.name,t)})):(f.length>0&&(m=m.order(e.name,f[0])),_&&(m=m.order(e.name,"ctid")));else{a.forEach(e=>{m=m.order(e.table,e.column,e.ascending,e.nullsFirst)});let t=h[0];if(t){let n=new Set(a.filter(t=>t.table===e.name).map(e=>e.column));t.filter(e=>!n.has(e)).forEach(t=>{m=m.order(e.name,t)})}else _&&(m=m.order(e.name,"ctid"))}return{sql:m,cursorColumns:p}},j=async({projectRef:e,connectionString:t,table:a,filters:n=[],sorts:r=[],roleImpersonationState:i,progressCallback:s})=>{if(d.IS_PLATFORM&&!t)return console.error("Connection string is required"),[];let o=[],{sql:l,cursorColumns:c}=v({table:a,sorts:r,filters:n});if(c){let a=null;for(;;){let n=l.clone();a&&(n=n.filter(c,">",c.map(e=>a[e])));let r=(0,p.wrapWithRoleImpersonation)(n.range(0,499).toSql(),i);try{let{result:n}=await b(async()=>(0,_.executeSql)({projectRef:e,connectionString:t,sql:r}));for(let e of(o.push(...n),s?.(o.length),a={},c))a[e]=n[n.length-1]?.[e];if(n.length<500)break;await g(500)}catch(e){throw Error(`Error fetching all table rows: ${e instanceof Error?e.message:"Unknown error"}`)}}}else{let a=-1;for(;;){let n=500*(a+=1),r=(a+1)*500-1,c=(0,p.wrapWithRoleImpersonation)(l.range(n,r).toSql(),i);try{let{result:a}=await b(async()=>(0,_.executeSql)({projectRef:e,connectionString:t,sql:c}));if(o.push(...a),s?.(o.length),a.length<500)break;await g(500)}catch(e){throw Error(`Error fetching all table rows: ${e instanceof Error?e.message:"Unknown error"}`)}}}return o.filter(e=>1!==e[p.ROLE_IMPERSONATION_NO_RESULTS])};async function w({queryClient:e,projectRef:t,connectionString:a,tableId:n,roleImpersonationState:r,filters:o,sorts:c,limit:d,page:u},f){let x=await (0,s.prefetchTableEditor)(e,{projectRef:t,connectionString:a,id:n});if(!x)throw Error("Table not found");let y=(0,i.parseSupaTable)(x),g=o?.filter(e=>"="===e.operator||"is"===e.operator).flatMap(e=>e.column),b=(0,m.isMsSqlForeignTable)(x)?Array.from(new Set(g)):void 0,v=(0,p.wrapWithRoleImpersonation)((0,l.getTableRowsSql)({table:x,filters:o,sorts:c,limit:d,page:u,sortExcludedColumns:b}),r);try{let{result:e}=await (0,_.executeSql)({projectRef:t,connectionString:a,sql:v,queryKey:["table-rows",y?.id],isRoleImpersonationEnabled:(0,h.isRoleImpersonationEnabled)(r?.role)},f);return{rows:e.map((e,t)=>({idx:t,...e}))}}catch(e){throw Error(e instanceof Error?e.message:"Unknown error")}}function S(e,{projectRef:t,connectionString:a,tableId:n,...r}){return e.fetchQuery({queryKey:x.tableRowKeys.tableRows(t,{table:{id:n},...r}),queryFn:({signal:i})=>w({queryClient:e,projectRef:t,connectionString:a,tableId:n,...r},i)})}e.s(["executeWithRetry",()=>b,"fetchAllTableRows",0,j,"getAllTableRowsSql",0,v,"prefetchTableRows",()=>S,"useTableRowsQuery",0,({projectRef:e,connectionString:t,tableId:n,...r},{enabled:i=!0,...s}={})=>{let o=(0,a.useQueryClient)();return(0,c.useQuery)({queryKey:x.tableRowKeys.tableRows(e,{table:{id:n},...r}),queryFn:({signal:a})=>w({queryClient:o,projectRef:e,connectionString:t,tableId:n,...r},a),enabled:i&&void 0!==e&&void 0!==n,...s})}],70756);var E=e.i(635494),T=e.i(636047),N=e.i(85626);function C({queryClient:e,projectRef:t,connectionString:a,id:n,sorts:r,filters:o,roleImpersonationState:l}){return(0,s.prefetchTableEditor)(e,{projectRef:t,connectionString:a,id:n}).then(s=>{if(s){let c=(0,i.parseSupaTable)(s),{sorts:d=[],filters:u=[]}=(0,i.loadTableEditorStateFromLocalStorage)(t,s.id)??{};S(e,{projectRef:t,connectionString:a,tableId:n,sorts:r??(0,i.formatSortURLParams)(c.name,d),filters:o??(0,i.formatFilterURLParams)(u),page:1,limit:T.TABLE_EDITOR_DEFAULT_ROWS_PER_PAGE,roleImpersonationState:l})}})}function A(){let e=(0,n.useRouter)(),t=(0,a.useQueryClient)(),{data:i}=(0,E.useSelectedProjectQuery)(),s=(0,h.useRoleImpersonationStateSnapshot)();return(0,r.useCallback)(({id:a,filters:n,sorts:r})=>{let o=a?Number(a):void 0;!i||!o||isNaN(o)||(e.prefetch(`/project/${i.ref}/editor/${o}`),C({queryClient:t,projectRef:i.ref,connectionString:i.connectionString,id:o,sorts:r,filters:n,roleImpersonationState:s}).catch(()=>{}))},[i,t,s,e])}function k({projectRef:e,id:a,sorts:n,filters:r,href:i,children:s,...o}){let l=A();return(0,t.jsx)(N.default,{href:i||`/project/${e}/editor/${a}`,prefetcher:()=>l({id:a,sorts:n,filters:r}),...o,children:s})}e.s(["EditorTablePageLink",()=>k,"prefetchEditorTablePage",()=>C,"usePrefetchEditorTablePage",()=>A],941381)},101369,e=>{"use strict";var t=e.i(478902),a=e.i(843778);e.s(["default",0,({max:e=100,value:n=0,barClass:r="bg-foreground",bgClass:i="",type:s="vertical",borderClass:o="",labelBottom:l="",labelBottomClass:c="tabular-nums",labelTop:d="",labelTopClass:u=""})=>{if("horizontal"===s){let s=Number(n/e*100),m=`${s}%`,p=l||d;return(0,t.jsxs)("div",{className:"flex flex-col w-full",children:[p&&(0,t.jsxs)("div",{className:"flex align-baseline justify-between pb-1 space-x-8",children:[(0,t.jsx)("p",{className:(0,a.cn)("text-foreground text-sm truncate capitalize-sentence",d.length>0&&"max-w-[75%]",c),children:l}),(0,t.jsx)("p",{className:(0,a.cn)("text-foreground-light text-sm",u),children:d})]}),(0,t.jsx)("div",{className:`relative rounded h-1 overflow-hidden w-full border p-0 ${i||"bg-surface-400"} ${o||"border-none"}`,children:(0,t.jsx)("div",{className:`absolute rounded inset-x-0 bottom-0 h-1 ${r} transition-all`,style:{width:m}})})]})}{let a=Number(n/e*35);return a<2&&(a=2),(0,t.jsx)("div",{className:`relative rounded w-5 overflow-hidden border p-1 ${i||"bg-gray-400"} ${o||"border-none"}`,style:{height:35},children:(0,t.jsx)("div",{className:`absolute inset-x-0 bottom-0 w-5 ${r}`,style:{height:a}})})}}])},64102,e=>{"use strict";var t=e.i(478902),a=e.i(389959),n=e.i(843778);let r=()=>(0,t.jsxs)("div",{className:"flex w-full flex-col gap-2",children:[(0,t.jsx)("div",{className:"shimmering-loader h-2 w-1/3 rounded"}),(0,t.jsx)("div",{className:"flex flex-col justify-between space-y-2",children:(0,t.jsx)("div",{className:"shimmering-loader h-[34px] w-2/3 rounded"})})]});e.s(["FormSection",0,({children:e,id:a,header:n,disabled:r,className:i})=>{let s=["grid grid-cols-12 gap-6 px-[var(--card-padding-x)] py-4 md:py-8",`${r?" opacity-30":" opacity-100"}`,`${i}`];return(0,t.jsxs)("div",{id:a,className:s.join(" "),children:[n,e]})},"FormSectionContent",0,({children:e,loading:n=!0,loaders:i,fullWidth:s,className:o})=>(0,t.jsx)("div",{className:`
        relative col-span-12 flex flex-col gap-6 @lg:col-span-7
        ${s&&"!col-span-12"}
        ${o}
      `,children:n?i?Array(i).fill(0).map((e,a)=>(0,t.jsx)(r,{},a)):a.Children.map(e,(e,a)=>(0,t.jsx)(r,{},a)):e}),"FormSectionLabel",0,({children:e,className:a="",description:r})=>void 0!==r?(0,t.jsxs)("div",{className:(0,n.cn)("flex flex-col space-y-2 col-span-12 lg:col-span-5",a),children:[(0,t.jsx)("label",{className:"text-foreground text-sm",children:e}),r]}):(0,t.jsx)("label",{className:`text-foreground col-span-12 text-sm lg:col-span-5 ${a}`,children:e})])},653379,(e,t,a)=>{var n=e.r(70234);t.exports=function(e,t){return n(t,function(t){return e[t]})}},458389,(e,t,a)=>{var n=e.r(653379),r=e.r(937165);t.exports=function(e){return null==e?[]:n(e,r(e))}},992640,(e,t,a)=>{var n=e.r(91385),r=e.r(140062),i=e.r(14056),s=e.r(798705),o=e.r(458389),l=Math.max;t.exports=function(e,t,a,c){e=r(e)?e:o(e),a=a&&!c?s(a):0;var d=e.length;return a<0&&(a=l(d+a,0)),i(e)?a<=d&&e.indexOf(t,a)>-1:!!d&&n(e,t,a)>-1}},691337,e=>{"use strict";var t=e.i(755216),a=e.i(38429),n=e.i(356003),r=e.i(355901),i=e.i(714403),s=e.i(509847);async function o({projectRef:e,connectionString:a,payload:n}){let r=new Headers;a&&r.set("x-connection-encrypted",a);let{sql:s}=t.default.policies.create(n),{result:o}=await (0,i.executeSql)({projectRef:e,connectionString:a,sql:s,queryKey:["policy","create"]});return o}e.s(["createDatabasePolicy",()=>o,"useDatabasePolicyCreateMutation",0,({onSuccess:e,onError:t,...i}={})=>{let l=(0,n.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>o(e),async onSuccess(t,a,n){let{projectRef:r}=a;await l.invalidateQueries({queryKey:s.databasePoliciesKeys.list(r)}),await e?.(t,a,n)},async onError(e,a,n){void 0===t?r.toast.error(`Failed to create database policy: ${e.message}`):t(e,a,n)},...i})}])},41921,e=>{"use strict";var t=e.i(694423),a=e.i(45674),n=e.i(408880),r=e.i(479084);e.i(38429),e.i(355901);var i=e.i(234745),s=e.i(10429);e.i(56031);var o=e.i(237948);async function l({tableName:e,schema:t,columns:a,projectRef:n,connectionString:r,orgSlug:l,message:c}){let d=await (0,i.fetchPost)(`${s.BASE_PATH}/api/ai/sql/policy`,{tableName:e,schema:t,columns:a,projectRef:n,connectionString:r,orgSlug:l,message:c});if("error"in d)throw new o.ResponseError(d.error.message,400);return d}let c=({schema:e,table:t,fkConstraints:a})=>a.filter(a=>a.source_schema===e&&a.source_table===t).flatMap(e=>e.source_columns.map((t,a)=>({source_schema:e.source_schema,source_table_name:e.source_table,source_column_name:t,target_table_schema:e.target_schema,target_table_name:e.target_table,target_column_name:e.target_columns[a]}))),d=async({table:e,columns:t,projectRef:a,connectionString:n})=>{if(!n)return[];try{return await l({tableName:e.name,schema:e.schema,columns:t.map(e=>e.name.trim()),projectRef:a,connectionString:n??""})}catch(e){return console.log("AI policy generation failed:",e),[]}},u=async({table:e,foreignKeyConstraints:t,columns:a,projectRef:n,connectionString:i,enableAi:s})=>{let o=(({table:e,foreignKeyConstraints:t})=>{try{let a=((e,t,a=3)=>{let n=c({schema:e.schema,table:e.name,fkConstraints:t}),r=[{table:e,path:[]}],i=new Set;for(i.add(`${e.schema}.${e.name}`);r.length>0;){let e=r.shift();if(!e)continue;let{table:s,path:o}=e;if(!(o.length>=a))for(let e of 0===o.length?n:c({schema:s.schema,table:s.name,fkConstraints:t})){if("auth"===e.target_table_schema&&"users"===e.target_table_name&&"id"===e.target_column_name)return[...o,e];let t=`${e.target_table_schema}.${e.target_table_name}`;i.has(t)||(r.push({table:{schema:e.target_table_schema,name:e.target_table_name},path:[...o,e]}),i.add(t))}}return null})(e,t);if(a?.length){let t,n;return t=(e=>{if(0===e.length)return"";if(1===e.length)return`(select auth.uid()) = ${(0,r.ident)(e[0].source_column_name)}`;let[t,...a]=e,n=`${(0,r.ident)(t.target_table_schema)}.${(0,r.ident)(t.target_table_name)}`,i=`${(0,r.ident)(t.source_schema)}.${(0,r.ident)(t.source_table_name)}`,s=e[e.length-1],o=a.slice(0,-1).map(e=>{let t=(0,r.ident)(e.target_table_schema),a=(0,r.ident)(e.target_table_name),n=(0,r.ident)(e.target_column_name),i=(0,r.ident)(e.source_schema),s=(0,r.ident)(e.source_table_name),o=(0,r.ident)(e.source_column_name);return`join ${t}.${a} on ${t}.${a}.${n} = ${i}.${s}.${o}`}).join("\n  ");return`exists (
  select 1 from ${n}
  ${o}
  where ${n}.${(0,r.ident)(t.target_column_name)} = ${i}.${(0,r.ident)(t.source_column_name)}
  and ${(0,r.ident)(s.source_schema)}.${(0,r.ident)(s.source_table_name)}.${(0,r.ident)(s.source_column_name)} = (select auth.uid())
)`})(a),n=a[0].source_column_name,["SELECT","INSERT","UPDATE","DELETE"].map(a=>{let i=`Enable ${a.toLowerCase()} access for users based on ${(0,r.ident)(n)}`,s=`CREATE POLICY "${i}" ON ${(0,r.ident)(e.schema)}.${(0,r.ident)(e.name)} AS PERMISSIVE FOR ${a} TO public`,o="INSERT"===a?`${s} WITH CHECK (${t});`:"UPDATE"===a?`${s} USING (${t}) WITH CHECK (${t});`:`${s} USING (${t});`,l="INSERT"===a?void 0:t,c="SELECT"===a||"DELETE"===a?void 0:t;return{name:i,sql:o,command:a,table:e.name,schema:e.schema,definition:l,check:c,action:"PERMISSIVE",roles:["public"]}})}}catch(e){}return[]})({table:e,foreignKeyConstraints:t});return o.length>0?o:s?await d({table:e,columns:a,projectRef:n,connectionString:i}):[]};e.s(["createPayloadForCreatePolicy",0,e=>{let{command:t,definition:a,check:n,roles:r}=e;return{...e,action:"PERMISSIVE",command:t||void 0,definition:a||void 0,check:n||void 0,roles:r.length>0?r:void 0}},"createPayloadForUpdatePolicy",0,(e,t)=>{let{definition:a,check:r}=e,i={...e,definition:a?a.replace(/\s+/g," ").trim():a,check:r?r.replace(/\s+/g," ").trim():r},s={id:t.id};return(0,n.default)(i.name,t.name)||(s.name=i.name),(0,n.default)(i.definition,t.definition)||(s.definition=i.definition||void 0),(0,n.default)(i.check,t.check)||(s.check=i.check||void 0),(0,n.default)(i.roles,t.roles)||(0===i.roles.length?s.roles=["public"]:s.roles=i.roles||void 0),s},"createSQLPolicy",0,(e,r)=>{let{definition:i,check:s}=e,o={...e,definition:i?i.replace(/\s+/g," ").trim():void 0===i?null:i,check:s?s.replace(/\s+/g," ").trim():void 0===s?null:s};if((0,a.default)(r))return(e=>{let{name:t,definition:a,check:n,command:r,schema:i,table:s}=e,o=0===e.roles.length?["public"]:e.roles;return{description:`Add policy for the ${r} operation under the policy "${t}"`,statement:`CREATE POLICY "${t}" ON "${i}"."${s}"
AS PERMISSIVE FOR ${r}
TO ${o.join(", ")}
${a?`USING (${a})`:""}
${n?`WITH CHECK (${n})`:""}`}})(o);if((0,n.default)(e,r))return{};let l={};return((0,n.default)(o.name,r.name)||(l.name=o.name),(0,n.default)(o.definition,r.definition)||(l.definition=o.definition),(0,n.default)(o.check,r.check)||(l.check=o.check),(0,n.default)(o.roles,r.roles)||(l.roles=o.roles),(0,a.default)(l))?{}:((e,a)=>{let{name:n,schema:r,table:i}=e,s=(0,t.default)(a,["definition"]),o=(0,t.default)(a,["check"]),l=(0,t.default)(a,["name"]),c=(0,t.default)(a,["roles"]),d=Object.keys(a),u=`Update policy's ${1===d.length?d[0]:`${d.slice(0,d.length-1).join(", ")} and ${d[d.length-1]}`} `,m=0===(a?.roles??[]).length?["public"]:a.roles,p=`ALTER POLICY "${n}" ON "${r}"."${i}"`;return{description:u,statement:["BEGIN;",...s?[`  ${p} USING (${a.definition});`]:[],...o?[`  ${p} WITH CHECK (${a.check});`]:[],...c?[`  ${p} TO ${m.join(", ")};`]:[],...l?[`  ${p} RENAME TO "${a.name}";`]:[],"COMMIT;"].join("\n")}})(o,l)},"generateStartingPoliciesForTable",0,u],41921)},321605,25912,e=>{"use strict";var t=e.i(248593),a=e.i(242882),n=e.i(234745);let r={list:e=>["projects",e,"database-publications"]};async function i({projectRef:e,connectionString:a},r){if(!e)throw Error("projectRef is required");let i=new Headers;a&&i.set("x-connection-encrypted",a);let{data:s,error:o}=await (0,n.get)("/platform/pg-meta/{ref}/publications",{params:{header:{"x-connection-encrypted":a,"x-pg-application-name":t.DEFAULT_PLATFORM_APPLICATION_NAME},path:{ref:e}},headers:i,signal:r});return o&&(0,n.handleError)(o),s}e.s(["databasePublicationsKeys",0,r],25912),e.s(["useDatabasePublicationsQuery",0,({projectRef:e,connectionString:t},{enabled:n=!0,...s}={})=>(0,a.useQuery)({queryKey:r.list(e),queryFn:({signal:a})=>i({projectRef:e,connectionString:t},a),enabled:n&&void 0!==e,...s})],321605)},587768,e=>{"use strict";var t=e.i(755216),a=e.i(38429),n=e.i(356003),r=e.i(355901),i=e.i(714403),s=e.i(25912);async function o({projectRef:e,connectionString:a,id:n,tables:r,publish_insert:s,publish_update:o,publish_delete:l,publish_truncate:c}){let{sql:d}=t.default.publications.update(n,{tables:r,publish_insert:s,publish_update:o,publish_delete:l,publish_truncate:c}),{result:u}=await (0,i.executeSql)({projectRef:e,connectionString:a,sql:d,queryKey:["publication","update",n]});return u}e.s(["useDatabasePublicationUpdateMutation",0,({onSuccess:e,onError:t,...i}={})=>{let l=(0,n.useQueryClient)();return(0,a.useMutation)({mutationFn:e=>o(e),async onSuccess(t,a,n){let{projectRef:r}=a;await l.invalidateQueries({queryKey:s.databasePublicationsKeys.list(r)}),await e?.(t,a,n)},async onError(e,a,n){void 0===t?r.toast.error(`Failed to update database publication: ${e.message}`):t(e,a,n)},...i})}])},93472,165610,e=>{"use strict";var t=e.i(478902),a=e.i(389959),n=e.i(938933);let r=(0,e.i(388019).default)("OctagonAlert",[["path",{d:"M12 16h.01",key:"1drbdi"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",key:"1fd625"}]]);e.s(["AlertOctagon",()=>r],165610);var i=e.i(872646),s=e.i(217444),o=e.i(833655),l=e.i(975924);let c={danger:(0,t.jsx)(r,{strokeWidth:1.5,size:18}),success:(0,t.jsx)(i.CheckCircle,{strokeWidth:1.5,size:18}),warning:(0,t.jsx)(s.AlertTriangle,{strokeWidth:1.5,size:18}),info:(0,t.jsx)(o.Info,{strokeWidth:1.5,size:18}),neutral:(0,t.jsx)(t.Fragment,{})};function d({variant:e="neutral",className:r,title:i,withIcon:s,closable:o,children:d,icon:u,actions:m}){let p=(0,n.default)("alert"),[h,f]=(0,a.useState)(!0),_=[p.base];_.push(p.variant[e].base),r&&_.push(r);let x=[p.description,p.variant[e].description],y=[p.close];return(0,t.jsx)(t.Fragment,{children:h&&(0,t.jsxs)("div",{className:_.join(" "),children:[s?(0,t.jsx)("div",{className:p.variant[e].icon,children:s&&c[e]}):null,u&&u,(0,t.jsxs)("div",{className:"flex flex-1 items-center justify-between",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:[p.variant[e].header,p.header].join(" "),children:i}),(0,t.jsx)("div",{className:x.join(" "),children:d})]}),m]}),o&&(0,t.jsx)("button",{"aria-label":"Close alert",onClick:()=>f(!1),className:y.join(" "),children:(0,t.jsx)(l.X,{strokeWidth:2,size:16})})]})})}e.s(["Alert",()=>d],93472)},492636,e=>{"use strict";var t=e.i(478902),a=e.i(753515),n=e.i(938933),r=e.i(140449);let i=(0,e.i(389959).createContext)({parentCallback:e=>{},parentSize:""});function s({className:e,id:a="",name:s="",label:o,afterLabel:l,beforeLabel:c,description:d,checked:u,value:m,onChange:p,onBlur:h,size:f="medium",disabled:_=!1,...x}){let{formContextOnChange:y,values:g,handleBlur:b}=(0,r.useFormContext)(),v=(0,n.default)("checkbox");return(0,t.jsx)(i.Consumer,{children:({parentCallback:n,parentSize:r})=>{let i=a||s||(o?o.toLowerCase().replace(/^[^A-Z0-9]+/gi,"").replace(/ /g,"-"):void 0);f=r||f;let j=s||i,w=u??void 0,S=[v.container];return e&&S.push(e),g&&void 0===u&&(w=g[a||s]),(0,t.jsxs)("div",{className:S.join(" "),children:[(0,t.jsx)("input",{id:i,name:j,type:"checkbox",className:[v.base,v.size[f]].join(" "),onChange:function(e){n&&n(e),p&&p(e),y&&y(e)},onBlur:function(e){b&&setTimeout(()=>{b(e)},100),h&&h(e)},checked:w,value:m||i,disabled:_,...x}),(0,t.jsxs)("label",{className:[v.label.base,v.label[f]].join(" "),htmlFor:i,children:[(0,t.jsxs)("span",{children:[c&&(0,t.jsx)("span",{className:[v.label_before.base,v.label_before[f]].join(" "),children:c}),o,l&&(0,t.jsx)("span",{className:[v.label_after.base,v.label_after[f]].join(" "),children:l})]}),d&&(0,t.jsx)("p",{className:[v.description.base,v.description[f]].join(" "),children:d})]})]})}})}s.Group=function({id:e,layout:r="vertical",error:o,descriptionText:l,label:c,afterLabel:d,beforeLabel:u,labelOptional:m,children:p,className:h,options:f,onChange:_,size:x="medium"}){let y=(0,n.default)("checkbox");return(0,t.jsx)(a.FormLayout,{label:c,afterLabel:d,beforeLabel:u,labelOptional:m,layout:r,id:e,error:o,descriptionText:l,className:h,size:x,children:(0,t.jsx)(i.Provider,{value:{parentCallback:e=>{_&&_(e)},parentSize:x},children:(0,t.jsx)("div",{className:y.group,children:f?f.map(e=>(0,t.jsx)(s,{id:e.id,value:e.value,label:e.label,beforeLabel:e.beforeLabel,afterLabel:e.afterLabel,checked:e.checked,name:e.name,description:e.description,defaultChecked:e.defaultChecked},e.id)):p})})})},e.s(["default",0,s],492636)},815545,e=>{"use strict";var t=e.i(492636);e.s(["Checkbox",()=>t.default])},419524,e=>{"use strict";let t=(0,e.i(388019).default)("AlignLeft",[["line",{x1:"21",x2:"3",y1:"6",y2:"6",key:"1fp77t"}],["line",{x1:"15",x2:"3",y1:"12",y2:"12",key:"v6grx8"}],["line",{x1:"17",x2:"3",y1:"18",y2:"18",key:"1awlsn"}]]);e.s(["AlignLeft",()=>t],419524)},199327,e=>{"use strict";let t=(0,e.i(388019).default)("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);e.s(["Home",()=>t],199327)},546024,e=>{"use strict";let t=(0,e.i(388019).default)("Key",[["path",{d:"m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4",key:"g0fldk"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}]]);e.s(["Key",()=>t],546024)},819993,e=>{"use strict";let t=(0,e.i(388019).default)("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]);e.s(["Link",()=>t],819993)},899850,e=>{"use strict";e.s(["COUNT_ESTIMATE_SQL",0,`
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
`.trim(),"THRESHOLD_COUNT",0,5e4])},494031,e=>{"use strict";var t=e.i(749199),a=e.i(820308),n=e.i(775159);e.s(["useQueryPerformanceQuery",0,({preset:e,orderBy:r,searchQuery:i="",roles:s,runIndexAdvisor:o=!1,minCalls:l,filterIndexAdvisor:c=!1})=>{let d=a.PRESET_CONFIG[n.Presets.QUERY_PERFORMANCE].queries[e],u=[void 0!==s&&s.length>0?`auth.rolname in (${s.map(e=>`'${e}'`).join(", ")})`:"",i.length>0?`statements.query ~* '${i}'`:"","number"==typeof l&&l>0?`statements.calls >= ${l}`:""].filter(e=>e.length>0).join(" AND "),m=r&&`ORDER BY ${r.column} ${r.order}`,p=d.sql([],u.length>0?`WHERE ${u}`:void 0,m,o,c);return(0,t.default)({sql:p,params:void 0,where:u,orderBy:m})}])},999918,e=>{"use strict";let t=(0,e.i(388019).default)("ShieldOff",[["path",{d:"m2 2 20 20",key:"1ooewy"}],["path",{d:"M5 5a1 1 0 0 0-1 1v7c0 5 3.5 7.5 7.67 8.94a1 1 0 0 0 .67.01c2.35-.82 4.48-1.97 5.9-3.71",key:"1jlk70"}],["path",{d:"M9.309 3.652A12.252 12.252 0 0 0 11.24 2.28a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1v7a9.784 9.784 0 0 1-.08 1.264",key:"18rp1v"}]]);e.s(["ShieldOff",()=>t],999918)},818135,e=>{"use strict";e.s(["privilegeKeys",0,{tablePrivilegesList:e=>["projects",e,"database","table-privileges"],columnPrivilegesList:e=>["projects",e,"database","column-privileges"]}])},181827,e=>{"use strict";var t=e.i(478902),a=e.i(156054);e.s(["MonacoEditor",0,({width:e,height:n,value:r,language:i,readOnly:s=!1,onChange:o,onMount:l})=>(0,t.jsx)(a.default,{width:e,height:n||"200px",theme:"supabase",wrapperProps:{className:"grid-monaco-editor-container"},className:"grid-monaco-editor",defaultLanguage:i||"plaintext",defaultValue:r,onChange:o,onMount:function(e){e.changeViewZones(e=>{e.addZone({afterLineNumber:0,heightInPx:4,domNode:document.createElement("div")})});let t=e.getModel().getPositionAt(r?.length);e.setPosition(t),setTimeout(()=>{e?.focus()},0),l&&l(e)},options:{readOnly:s,tabSize:2,fontSize:13,minimap:{enabled:!1},glyphMargin:!1,folding:!1,lineNumbers:"off",lineNumbersMinChars:0,scrollBeyondLastLine:!1,wordWrap:"on",unusualLineTerminators:"off"}})])},554222,e=>{"use strict";var t=e.i(478902),a=e.i(389959),n=e.i(355901),r=e.i(171997),i=e.i(539013),s=e.i(647307),o=e.i(635494);e.s(["SchemaEditor",0,({visible:e,onSuccess:l,closePanel:c})=>{let{data:d}=(0,o.useSelectedProjectQuery)(),[u,m]=(0,a.useState)({name:void 0}),[p,h]=(0,a.useState)(""),{mutateAsync:f,isPending:_}=(0,s.useSchemaCreateMutation)();(0,a.useEffect)(()=>{e&&(h(""),m({name:void 0}))},[e]);let x=async()=>{let e={};if(0===p.length&&(e.name="Please provide a name for your schema"),Object.keys(e).length>0)return m(e);if(void 0===d)return console.error("Project is required");try{await f({projectRef:d.ref,connectionString:d.connectionString,name:p}),l(p),n.toast.success(`Successfully created schema "${p}"`)}catch(e){n.toast.error(`Failed to create schema: ${e}`)}};return(0,t.jsx)(i.SidePanel,{size:"medium",visible:e,header:"Create a new schema",className:"transition-all duration-100 ease-in",onCancel:c,onConfirm:x,loading:_,cancelText:"Cancel",confirmText:"Save",children:(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(i.SidePanel.Content,{children:(0,t.jsx)("div",{className:"space-y-10 py-6",children:(0,t.jsx)(r.Input,{label:"Schema name",layout:"vertical",type:"text",error:u?.name,value:p,onChange:e=>h(e.target.value)})})})})},"SchemaEditor")}])},457065,e=>{"use strict";var t=e.i(478902),a=e.i(585102),n=e.i(389959),r=e.i(753515),i=e.i(938933),s=e.i(140449);e.s(["default",0,function({disabled:e,id:o="",name:l="",layout:c="flex",error:d,descriptionText:u,label:m,afterLabel:p,beforeLabel:h,labelOptional:f,onChange:_,onBlur:x,defaultChecked:y,checked:g,className:b,align:v="left",size:j="medium",validation:w,labelLayout:S,...E}){let T=(0,i.default)("toggle"),{formContextOnChange:N,values:C,errors:A,handleBlur:k,touched:R,fieldLevelValidation:q}=(0,s.useFormContext)();C&&!g&&(g=C[o||l]);let[P,I]=(0,n.useState)((y||g)??!1),$=g??P;(0,n.useEffect)(()=>{I($)},[]),d||(A&&!d&&(d=A[o||l]),d=R&&R[o||l]?d:void 0);let L=[T.base,T.handle_container[j]];$&&L.push(T.active);let M=[T.handle.base,T.handle[j]];return $&&M.push(T.handle_active[j]),(0,t.jsx)(r.FormLayout,{className:b,label:m,afterLabel:p,beforeLabel:h,labelOptional:f,layout:c,id:o,error:d,align:v,descriptionText:u,size:j,labelLayout:S,nonBoxInput:!0,children:(0,t.jsx)("button",{type:"button",id:o,name:l,className:(0,a.default)(...L,e&&"opacity-50 cursor-default"),onClick:function(){_&&_(!$),I(!P);let e={};e.target={type:"checkbox",name:l,id:o,value:!$,checked:!$},N&&N(e),w&&q(o,w(!P))},disabled:e,onBlur:function(e){setTimeout(()=>{k&&k(e)},100),x&&x(e)},...E,children:(0,t.jsx)("span",{"aria-hidden":"true",className:M.join(" ")})})})}])},905596,e=>{"use strict";var t=e.i(457065);e.s(["Toggle",()=>t.default])},383595,(e,t,a)=>{t.exports=function(e){return null===e}},170286,(e,t,a)=>{e.e,t.exports=function(){"use strict";var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,a=/\d/,n=/\d\d/,r=/\d\d?/,i=/\d*[^-_:/,()\s\d]+/,s={},o=function(e){return(e*=1)+(e>68?1900:2e3)},l=function(e){return function(t){this[e]=+t}},c=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e||"Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),a=60*t[1]+(+t[2]||0);return 0===a?0:"+"===t[0]?-a:a}(e)}],d=function(e){var t=s[e];return t&&(t.indexOf?t:t.s.concat(t.f))},u=function(e,t){var a,n=s.meridiem;if(n){for(var r=1;r<=24;r+=1)if(e.indexOf(n(r,0,t))>-1){a=r>12;break}}else a=e===(t?"pm":"PM");return a},m={A:[i,function(e){this.afternoon=u(e,!1)}],a:[i,function(e){this.afternoon=u(e,!0)}],Q:[a,function(e){this.month=3*(e-1)+1}],S:[a,function(e){this.milliseconds=100*e}],SS:[n,function(e){this.milliseconds=10*e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,l("seconds")],ss:[r,l("seconds")],m:[r,l("minutes")],mm:[r,l("minutes")],H:[r,l("hours")],h:[r,l("hours")],HH:[r,l("hours")],hh:[r,l("hours")],D:[r,l("day")],DD:[n,l("day")],Do:[i,function(e){var t=s.ordinal,a=e.match(/\d+/);if(this.day=a[0],t)for(var n=1;n<=31;n+=1)t(n).replace(/\[|\]/g,"")===e&&(this.day=n)}],w:[r,l("week")],ww:[n,l("week")],M:[r,l("month")],MM:[n,l("month")],MMM:[i,function(e){var t=d("months"),a=(d("monthsShort")||t.map(function(e){return e.slice(0,3)})).indexOf(e)+1;if(a<1)throw Error();this.month=a%12||a}],MMMM:[i,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw Error();this.month=t%12||t}],Y:[/[+-]?\d+/,l("year")],YY:[n,function(e){this.year=o(e)}],YYYY:[/\d{4}/,l("year")],Z:c,ZZ:c};return function(a,n,r){r.p.customParseFormat=!0,a&&a.parseTwoDigitYear&&(o=a.parseTwoDigitYear);var i=n.prototype,l=i.parse;i.parse=function(a){var n=a.date,i=a.utc,o=a.args;this.$u=i;var c=o[1];if("string"==typeof c){var d=!0===o[2],u=!0===o[3],p=o[2];u&&(p=o[2]),s=this.$locale(),!d&&p&&(s=r.Ls[p]),this.$d=function(a,n,r,i){try{if(["x","X"].indexOf(n)>-1)return new Date(("X"===n?1e3:1)*a);var o=(function(a){var n,r;n=a,r=s&&s.formats;for(var i=(a=n.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(t,a,n){var i=n&&n.toUpperCase();return a||r[n]||e[n]||r[i].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(e,t,a){return t||a.slice(1)})})).match(t),o=i.length,l=0;l<o;l+=1){var c=i[l],d=m[c],u=d&&d[0],p=d&&d[1];i[l]=p?{regex:u,parser:p}:c.replace(/^\[|\]$/g,"")}return function(e){for(var t={},a=0,n=0;a<o;a+=1){var r=i[a];if("string"==typeof r)n+=r.length;else{var s=r.regex,l=r.parser,c=e.slice(n),d=s.exec(c)[0];l.call(t,d),e=e.replace(d,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var a=e.hours;t?a<12&&(e.hours+=12):12===a&&(e.hours=0),delete e.afternoon}}(t),t}})(n)(a),l=o.year,c=o.month,d=o.day,u=o.hours,p=o.minutes,h=o.seconds,f=o.milliseconds,_=o.zone,x=o.week,y=new Date,g=d||(l||c?1:y.getDate()),b=l||y.getFullYear(),v=0;l&&!c||(v=c>0?c-1:y.getMonth());var j,w=u||0,S=p||0,E=h||0,T=f||0;return _?new Date(Date.UTC(b,v,g,w,S,E,T+60*_.offset*1e3)):r?new Date(Date.UTC(b,v,g,w,S,E,T)):(j=new Date(b,v,g,w,S,E,T),x&&(j=i(j).week(x).toDate()),j)}catch(e){return new Date("")}}(n,c,i,r),this.init(),p&&!0!==p&&(this.$L=this.locale(p).$L),(d||u)&&n!=this.format(c)&&(this.$d=new Date("")),s={}}else if(c instanceof Array)for(var h=c.length,f=1;f<=h;f+=1){o[1]=c[f-1];var _=r.apply(this,o);if(_.isValid()){this.$d=_.$d,this.$L=_.$L,this.init();break}f===h&&(this.$d=new Date(""))}else l.call(this,a)}}}()},197187,e=>{"use strict";let t=(0,e.i(388019).default)("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);e.s(["default",()=>t])},532427,e=>{"use strict";var t=e.i(197187);e.s(["Filter",()=>t.default])},350046,e=>{"use strict";var t=e.i(478902),a=e.i(224521),n=e.i(88816),r=e.i(389959),i=e.i(843778);let s=a.Root,o=r.forwardRef(({className:e,...n},r)=>(0,t.jsx)(a.Item,{ref:r,className:(0,i.cn)("border-b",e),...n}));o.displayName="AccordionItem";let l=r.forwardRef(({className:e,children:r,hideIcon:s,...o},l)=>(0,t.jsx)(a.Header,{className:"flex",children:(0,t.jsxs)(a.Trigger,{ref:l,className:(0,i.cn)("flex flex-1 gap-2 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-left",e),...o,children:[r,!s&&(0,t.jsx)(n.ChevronDown,{className:"h-4 w-4 transition-transform duration-200 shrink-0"})]})}));l.displayName=a.Trigger.displayName;let c=r.forwardRef(({className:e,children:n,...r},s)=>(0,t.jsx)(a.Content,{ref:s,className:(0,i.cn)("overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",e),...r,children:(0,t.jsx)("div",{className:"pb-4 pt-0",children:n})}));c.displayName=a.Content.displayName,e.s(["Accordion",()=>s,"AccordionContent",()=>c,"AccordionItem",()=>o,"AccordionTrigger",()=>l])},31227,154225,e=>{"use strict";var t=e.i(350046);e.s(["AccordionContent_Shadcn_",()=>t.AccordionContent],31227),e.s(["AccordionItem_Shadcn_",()=>t.AccordionItem],154225)},350341,e=>{"use strict";var t=e.i(350046);e.s(["Accordion_Shadcn_",()=>t.Accordion])},503256,e=>{"use strict";var t=e.i(389959);let a=t.forwardRef(function({title:e,titleId:a,...n},r){return t.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 16 16",fill:"currentColor","aria-hidden":"true","data-slot":"icon",ref:r,"aria-labelledby":a},n),e?t.createElement("title",{id:a},e):null,t.createElement("path",{fillRule:"evenodd",d:"M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z",clipRule:"evenodd"}))});e.s(["InformationCircleIcon",0,a],503256)},849368,48202,e=>{"use strict";var t=e.i(242882),a=e.i(97429),n=e.i(714403),r=e.i(246230),i=e.i(760255);let s=a.z.object({errors:a.z.array(a.z.string()),index_statements:a.z.array(a.z.string()),startup_cost_before:a.z.number(),startup_cost_after:a.z.number(),total_cost_before:a.z.number(),total_cost_after:a.z.number()});async function o({projectRef:e,connectionString:t,query:a}){if(!e)throw Error("Project ref is required");let r=a.replace(/'/g,"''"),{result:o}=await (0,n.executeSql)({projectRef:e,connectionString:t,sql:`select * from index_advisor('${r}');`});if(!o||0===o.length)throw Error("Index advisor returned no results");let l=s.safeParse(o[0]);if(!l.success){let e=l.error.errors[0],t=e.path.length>0?` at path: ${e.path.join(".")}`:"";throw Error(`Invalid index advisor response${t}: ${e.message}. Received: ${JSON.stringify(o[0])}`)}return(0,i.filterProtectedSchemaIndexAdvisorResult)(l.data)}async function l({projectRef:e,connectionString:t,query:a}){if(!e)throw Error("Project ref is required");try{var r;let i,{result:s}=await (0,n.executeSql)({projectRef:e,connectionString:t,queryKey:["involved-indexes-explain-query"],sql:`
        create or replace function pg_temp.explain_query(query text) returns jsonb
        language plpgsql
        as $$
        declare
            explain_result jsonb;
            prepared_statement_name text := 'query_to_explain';
            explain_plan_statement text;
            n_args int;
        begin
            -- Remove comment lines (its common that they contain semicolons)
            query := trim(
                regexp_replace(
                    regexp_replace(
                        regexp_replace(query,'\\/\\*.+\\*\\/', '', 'g'),
                    '--[^\\r\\n]*', ' ', 'g'),
                '\\s+', ' ', 'g')
            );
      
            -- Remove trailing semicolon
            query := regexp_replace(query, ';\\s*$', '');

            -- Disallow multiple statements
            if query ilike '%;%' then
                raise exception 'Query must not contain a semicolon';
            end if;
        
            -- Hack to support PostgREST because the prepared statement for args incorrectly defaults to text
            query := replace(query, 'WITH pgrst_payload AS (SELECT $1 AS json_data)', 
                                    'WITH pgrst_payload AS (SELECT $1::json AS json_data)');
        
            -- Create a prepared statement for the given query
            deallocate all;
            execute format('prepare %I as %s', prepared_statement_name, query);
        
            -- Detect how many arguments are present in the prepared statement
            n_args = (
                select
                    coalesce(array_length(parameter_types, 1), 0)
                from
                    pg_prepared_statements
                where
                    name = prepared_statement_name
                limit
                    1
            );
        
            -- Create a SQL statement that can be executed to collect the explain plan
            explain_plan_statement = format(
                'set local plan_cache_mode = force_generic_plan; explain (format json) execute %I%s',
                prepared_statement_name,
                case
                    when n_args = 0 then ''
                    else format(
                        '(%s)', array_to_string(array_fill('null'::text, array[n_args]), ',')
                    )
                end
            );
        
            -- Execute the explain plan statement and get the result
            execute explain_plan_statement into explain_result;
        
            -- Clean up the prepared statement
            deallocate all;
        
            -- Return the explain result
            return explain_result;
        end;
        $$;

        select pg_temp.explain_query('${a}') as plans;
      `}),o=(r=s,i=[],!function e(t){null!==t&&"object"==typeof t&&("Index Name"in t&&i.push(t["Index Name"]),Object.values(t).forEach(t=>e(t)))}(r),i);if(o.length<=0)return[];let{result:l}=await (0,n.executeSql)({projectRef:e,connectionString:t,queryKey:["involved-indexes-names"],sql:`select schemaname as schema, tablename as table, indexname as name from pg_indexes where indexname in (${o.map(e=>`'${e}'`).join(", ")});`});return l}catch(e){return[]}}e.s(["useGetIndexAdvisorResult",0,({projectRef:e,connectionString:a,query:n},{enabled:i=!0,...s}={})=>(0,t.useQuery)({queryKey:r.databaseKeys.indexAdvisorFromQuery(e,n),queryFn:()=>o({projectRef:e,connectionString:a,query:n}),retry:!1,enabled:i&&void 0!==e&&void 0!==n&&(n.startsWith("select")||n.startsWith("SELECT"))||"string"==typeof n&&n.trim().toLowerCase().startsWith("with pgrst_source"),...s})],849368),e.s(["useGetIndexesFromSelectQuery",0,({projectRef:e,connectionString:a,query:n},{enabled:i=!0,...s}={})=>{let o=(n??"").trim().toLowerCase(),c=o.startsWith("select")||o.startsWith("with pgrst_source")||o.startsWith("with pgrst_payload");return(0,t.useQuery)({queryKey:r.databaseKeys.indexesFromQuery(e,n),queryFn:()=>l({projectRef:e,connectionString:a,query:n}),retry:!1,enabled:i&&void 0!==e&&void 0!==n&&c,...s})}],48202)},764275,e=>{"use strict";var t,a=((t={}).MOST_TIME_CONSUMING="most_time_consuming",t.MOST_FREQUENT="most_frequent",t.SLOWEST_EXECUTION="slowest_execution",t.UNIFIED="unified",t);let n=(e,t)=>`
select 
  id,
  pgl.timestamp as timestamp,
  'postgres' as log_type,
  CAST(pgl_parsed.sql_state_code AS STRING) as status,
  CASE
      WHEN pgl_parsed.error_severity = 'LOG' THEN 'success'
      WHEN pgl_parsed.error_severity = 'WARNING' THEN 'warning'
      WHEN pgl_parsed.error_severity = 'FATAL' THEN 'error'
      WHEN pgl_parsed.error_severity = 'ERROR' THEN 'error'
      ELSE null
  END as level,
  event_message as event_message
from postgres_logs as pgl
cross join unnest(pgl.metadata) as pgl_metadata
cross join unnest(pgl_metadata.parsed) as pgl_parsed
WHERE pgl.event_message LIKE '%[pg_stat_monitor]%'
  AND pgl.timestamp >= CAST('${e}' AS TIMESTAMP)
  AND pgl.timestamp <= CAST('${t}' AS TIMESTAMP)
ORDER BY timestamp DESC
`.trim();n(new Date(Date.now()-864e5).toISOString(),new Date().toISOString()),e.s(["QUERY_PERFORMANCE_CHART_TABS",0,[{id:"query_latency",label:"Query latency"},{id:"rows_read",label:"Rows read"},{id:"calls",label:"Calls"},{id:"cache_hits",label:"Cache hits"}],"QUERY_PERFORMANCE_COLUMNS",0,[{id:"query",name:"Query",description:void 0,minWidth:500},{id:"prop_total_time",name:"Time consumed",description:void 0,minWidth:150},{id:"calls",name:"Count",description:void 0,minWidth:100},{id:"max_time",name:"Max time",description:void 0,minWidth:100},{id:"mean_time",name:"Mean time",description:void 0,minWidth:100},{id:"min_time",name:"Min time",description:void 0,minWidth:100},{id:"rows_read",name:"Rows processed",description:void 0,minWidth:130},{id:"cache_hit_rate",name:"Cache hit rate",description:void 0,minWidth:130},{id:"rolname",name:"Role",description:void 0,minWidth:200}],"QUERY_PERFORMANCE_PRESET_MAP",0,{most_time_consuming:"mostTimeConsuming",most_frequent:"mostFrequentlyInvoked",slowest_execution:"slowestExecutionTime",unified:"unified"},"QUERY_PERFORMANCE_REPORT_TYPES",()=>a,"QUERY_PERFORMANCE_ROLE_DESCRIPTION",0,[{name:"postgres",description:"The default Postgres role. This has admin privileges."},{name:"anon",description:"For unauthenticated, public access. This is the role which the API (PostgREST) will use when a user is not logged in."},{name:"authenticator",description:'A special role for the API (PostgREST). It has very limited access, and is used to validate a JWT and then "change into" another role determined by the JWT verification.'},{name:"authenticated",description:'For "authenticated access." This is the role which the API (PostgREST) will use when a user is logged in.'},{name:"service_role",description:"For elevated access. This role is used by the API (PostgREST) to bypass Row Level Security."},{name:"supabase_auth_admin",description:"Used by the Auth middleware to connect to the database and run migration. Access is scoped to the auth schema."},{name:"supabase_storage_admin",description:"Used by the Auth middleware to connect to the database and run migration. Access is scoped to the storage schema."},{name:"dashboard_user",description:"For running commands via the Supabase UI."},{name:"supabase_admin",description:"An internal role Supabase uses for administrative tasks, such as running upgrades and automations."},{name:"pgbouncer",description:"PgBouncer is a lightweight connection pooler for PostgreSQL. Available on paid plans only."}],"getPgStatMonitorLogsQuery",0,n])},908942,e=>{"use strict";e.s(["useIndexInvalidation",()=>m]);var t=e.i(356003),a=e.i(898452),n=e.i(4196),r=e.i(389959),i=e.i(494031),s=e.i(937357),o=e.i(246230),l=e.i(635494),c=e.i(764275),d=e.i(888525),u=e.i(826843);function m(){let e=(0,a.useRouter)(),m=(0,t.useQueryClient)(),{data:p}=(0,l.useSelectedProjectQuery)(),{isIndexAdvisorEnabled:h}=(0,d.useIndexAdvisorStatus)(),[{preset:f,search:_,order:x,sort:y}]=(0,n.useQueryStates)({sort:n.parseAsString,search:n.parseAsString.withDefault(""),order:n.parseAsString,preset:n.parseAsString.withDefault("unified")}),{invalidate:g}=(0,u.useTableIndexAdvisor)(),b=c.QUERY_PERFORMANCE_PRESET_MAP[f],v=e?.query?.roles??[],j=(0,i.useQueryPerformanceQuery)({searchQuery:_,orderBy:y?{column:y,order:x}:void 0,preset:b,roles:"string"==typeof v?[v]:v,runIndexAdvisor:h});return(0,r.useCallback)(()=>{j.runQuery(),m.invalidateQueries({queryKey:o.databaseKeys.indexAdvisorFromQuery(p?.ref,"")}),m.invalidateQueries({queryKey:s.databaseIndexesKeys.list(p?.ref)}),g()},[j,m,p?.ref,g])}},961563,e=>{"use strict";var t=e.i(478902),a=e.i(215261),n=e.i(355901);e.i(128328);var r=e.i(158639),i=e.i(513826),s=e.i(610144),o=e.i(450972),l=e.i(635494),c=e.i(10429),d=e.i(206413),u=e.i(592360),m=e.i(178527),p=e.i(837710),h=e.i(592383),f=e.i(760255);e.s(["IndexAdvisorDisabledState",0,()=>{let{ref:e}=(0,r.useParams)(),{data:_}=(0,l.useSelectedProjectQuery)(),{data:x}=(0,o.useDatabaseExtensionsQuery)({projectRef:_?.ref,connectionString:_?.connectionString}),{hypopg:y,indexAdvisor:g}=(0,f.getIndexAdvisorExtensions)(x),{mutateAsync:b,isPending:v}=(0,s.useDatabaseExtensionEnableMutation)(),j=async()=>{if(void 0===_)return console.error("Project is required");try{y?.installed_version===null&&await b({projectRef:_?.ref,connectionString:_?.connectionString,name:y.name,schema:y?.schema??"extensions",version:y.default_version}),g?.installed_version===null&&await b({projectRef:_?.ref,connectionString:_?.connectionString,name:g.name,schema:g?.schema??"extensions",version:g.default_version}),n.toast.success("Successfully enabled index advisor!")}catch(e){n.toast.error(`Failed to enable index advisor: ${e.message}`)}};return(0,t.jsxs)(m.Alert_Shadcn_,{className:"mb-6",children:[(0,t.jsx)(u.AlertTitle_Shadcn_,{children:(0,t.jsx)(h.Markdown,{className:"text-foreground",content:void 0===g?"Newer version of Postgres required":"Postgres extensions `index_advisor` and `hypopg` required"})}),(0,t.jsx)(d.AlertDescription_Shadcn_,{children:(0,t.jsx)(h.Markdown,{content:void 0===g?"Upgrade to the latest version of Postgres to get recommendations on indexes for your queries":"These extensions can help in recommending database indexes to reduce the costs of your query."})}),(0,t.jsx)(d.AlertDescription_Shadcn_,{className:"mt-3",children:(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[void 0===g?(0,t.jsx)(p.Button,{asChild:!0,type:"default",children:(0,t.jsx)(a.default,{href:`/project/${e}/settings/infrastructure`,children:"Upgrade Postgres version"})}):(0,t.jsx)(p.Button,{type:"default",disabled:v,loading:v,onClick:()=>j(),children:"Enable extensions"}),(0,t.jsx)(i.DocsButton,{href:`${c.DOCS_URL}/guides/database/extensions/index_advisor`})]})})]})}])},593977,770235,e=>{"use strict";var t=e.i(478902),a=e.i(843778),n=e.i(760255);e.s(["IndexImprovementText",0,({indexStatements:e,totalCostBefore:r,totalCostAfter:i,className:s,...o})=>{let l=(0,n.calculateImprovement)(r,i);return(0,t.jsxs)("p",{className:(0,a.cn)("text-sm text-foreground-light mb-3",s),...o,children:["Query's performance can be improved by"," ",(0,t.jsxs)("span",{className:"text-brand",children:[l.toFixed(2),"%"]})," by creating this"," ",e.length>1?"indexes":"index",":"]})}],593977);var r=e.i(503256),i=e.i(177948),s=e.i(749844),o=e.i(613580);e.s(["QueryPanelContainer",0,({children:e,className:n})=>(0,t.jsx)("div",{className:(0,a.cn)("flex flex-col gap-y-0 py-4",n),children:e}),"QueryPanelScoreSection",0,({className:e,name:n,description:l,before:c,after:d,hideArrowMarkers:u=!1})=>(0,t.jsxs)("div",{className:(0,a.cn)("py-4 px-4 flex",e),children:[(0,t.jsxs)("div",{className:"flex gap-x-2 w-48",children:[(0,t.jsx)("span",{className:"text-sm",children:n}),(0,t.jsxs)(o.Tooltip,{children:[(0,t.jsx)(o.TooltipTrigger,{asChild:!0,className:"mt-1",children:(0,t.jsx)(r.InformationCircleIcon,{className:"transition text-foreground-muted w-3 h-3 data-[state=delayed-open]:text-foreground-light"})}),(0,t.jsx)(o.TooltipContent,{side:"top",className:"w-52 text-center",children:l})]})]}),(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsxs)("div",{className:"flex gap-x-2 text-sm",children:[(0,t.jsx)("span",{className:"text-foreground-light w-20",children:"Currently:"}),(0,t.jsx)("span",{className:(0,a.cn)("font-mono",void 0!==c&&void 0!==d&&c!==d?"text-foreground-light":""),children:c})]}),void 0!==c&&void 0!==d&&c!==d&&(0,t.jsxs)("div",{className:"flex items-center gap-x-2 text-sm",children:[(0,t.jsx)("span",{className:"text-foreground-light w-20",children:"With index:"}),(0,t.jsx)("span",{className:"font-mono",children:d}),void 0!==c&&!u&&(0,t.jsxs)("div",{className:"flex items-center gap-x-1",children:[d>c?(0,t.jsx)(s.ArrowUp,{size:14,className:"text-warning"}):(0,t.jsx)(i.ArrowDown,{size:14,className:"text-brand"}),"number"==typeof c&&0!==c&&!isNaN(c)&&isFinite(c)&&(0,t.jsxs)("span",{className:(0,a.cn)("font-mono tracking-tighter",d>c?"text-warning":"text-brand"),children:[((c-d)/c*100).toFixed(2),"%"]})]})]})]})]}),"QueryPanelSection",0,({children:e,className:n})=>(0,t.jsx)("div",{className:(0,a.cn)("px-6 flex flex-col gap-y-0",n),children:e})],770235)},826843,331906,e=>{"use strict";e.s(["TableIndexAdvisorProvider",()=>z,"useColumnHasIndexSuggestion",()=>U,"useTableIndexAdvisor",()=>Y],826843);var t=e.i(478902),a=e.i(356003),n=e.i(389959);e.s(["QueryIndexes",()=>$],331906);var r=e.i(370410),i=e.i(219195),s=e.i(350046),o=e.i(888525),l=e.i(567558),c=e.i(513826),d=e.i(450972),u=e.i(849368),m=e.i(48202),p=e.i(635494),h=e.i(10429),f=e.i(967052),_=e.i(31227),x=e.i(154225),y=e.i(350341),g=e.i(206413),b=e.i(592360),v=e.i(178527),j=e.i(837710),w=e.i(672044),S=e.i(774234),E=e.i(554855),T=e.i(925282),N=e.i(843778),C=e.i(108151),A=e.i(908942),k=e.i(284399),R=e.i(760255),q=e.i(961563),P=e.i(593977),I=e.i(770235);let $=({selectedRow:e,columnName:a,suggestedSelectQuery:$,onClose:L})=>{let{data:M}=(0,p.useSelectedProjectQuery)(),[O,D]=(0,n.useState)(!1),[F,Q]=(0,n.useState)(!1),z=(0,f.useTrack)(),[Y,U]=(0,n.useState)(!1),{data:K,isSuccess:W,isPending:H,isError:B,error:G}=(0,m.useGetIndexesFromSelectQuery)({projectRef:M?.ref,connectionString:M?.connectionString,query:e?.query}),{data:V,isPending:Z}=(0,d.useDatabaseExtensionsQuery)({projectRef:M?.ref,connectionString:M?.connectionString}),{isIndexAdvisorEnabled:X}=(0,o.useIndexAdvisorStatus)(),{data:J,error:ee,refetch:et,isError:ea,isSuccess:en,isLoading:er}=(0,u.useGetIndexAdvisorResult)({projectRef:M?.ref,connectionString:M?.connectionString,query:e?.query},{enabled:X}),{index_statements:ei,startup_cost_after:es,startup_cost_before:eo,total_cost_after:el,total_cost_before:ec}=J??{index_statements:[],total_cost_after:0,total_cost_before:0},ed=(0,R.hasIndexRecommendations)(J,en);(0,R.calculateImprovement)(ec,el);let eu=(0,A.useIndexInvalidation)();(0,n.useEffect)(()=>{er||Y||(z("index_advisor_tab_clicked",{hasRecommendations:ed,isIndexAdvisorEnabled:X}),U(!0))},[er,ed,Y,z,X]);let em=async()=>{if(0!==ei.length){Q(!0),z("index_advisor_create_indexes_button_clicked");try{await (0,R.createIndexes)({projectRef:M?.ref,connectionString:M?.connectionString,indexStatements:ei,onSuccess:()=>et()}),eu()}catch(e){console.error("Failed to create index:",e),Q(!1)}finally{Q(!1),L?.()}}};return Z||X?(0,t.jsxs)(I.QueryPanelContainer,{className:"h-full overflow-y-auto py-0 pt-4",children:[(a||$)&&(0,t.jsx)(I.QueryPanelSection,{className:"pt-2 pb-6 border-b",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-3",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h4",{className:"mb-2",children:"Recommendation reason"}),a&&(0,t.jsxs)("p",{className:"text-sm text-foreground-light",children:["Recommendation for column: ",(0,t.jsx)("span",{className:"font-mono",children:a})]})]}),$&&(0,t.jsxs)("div",{className:"flex flex-col gap-y-4",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"Based on the following query:"}),(0,t.jsx)(w.CodeBlock,{hideLineNumbers:!0,value:$,language:"sql",className:(0,N.cn)("max-w-full max-h-[200px]","!py-2 !px-2.5 prose dark:prose-dark","[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap")})]})]})}),(0,t.jsxs)(I.QueryPanelSection,{className:"pt-2 mb-6",children:[(0,t.jsxs)("div",{className:"mb-4 flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"Indexes in use"}),(0,t.jsxs)("p",{className:"text-sm text-foreground-light",children:["This query is using the following index",(K??[]).length>1?"s":"",":"]})]}),H&&(0,t.jsx)(C.GenericSkeletonLoader,{}),B&&(0,t.jsx)(l.default,{projectRef:M?.ref,error:G,subject:"Failed to retrieve indexes in use"}),W&&(0,t.jsxs)("div",{children:[0===K.length&&(0,t.jsxs)("div",{className:"border rounded border-dashed flex flex-col items-center justify-center py-4 px-12 gap-y-1 text-center",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"No indexes are involved in this query"}),(0,t.jsx)("p",{className:"text-center text-xs text-foreground-lighter",children:"Indexes may not necessarily be used if they incur a higher cost when executing the query"})]}),K.map(e=>(0,t.jsxs)("div",{className:"flex items-center gap-x-4 bg-surface-100 border first:rounded-tl first:rounded-tr border-b-0 last:border-b last:rounded-b px-2 py-2",children:[(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)(i.Table2,{size:14,className:"text-foreground-light"}),(0,t.jsxs)("span",{className:"text-xs font-mono text-foreground-light",children:[e.schema,".",e.table]})]}),(0,t.jsx)("span",{className:"text-xs font-mono",children:e.name})]},e.name))]})]}),(0,t.jsx)(I.QueryPanelSection,{className:"flex flex-col gap-y-6 py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"New index recommendations"}),Z?(0,t.jsx)(C.GenericSkeletonLoader,{}):X?(0,t.jsxs)(t.Fragment,{children:[er&&(0,t.jsx)(C.GenericSkeletonLoader,{}),ea&&(0,t.jsx)(l.default,{projectRef:M?.ref,error:ee,subject:"Failed to retrieve result from index advisor"}),en&&(0,t.jsx)(t.Fragment,{children:0===(ei??[]).length?(0,t.jsxs)(v.Alert_Shadcn_,{className:"[&>svg]:rounded-full",children:[(0,t.jsx)(r.Check,{}),(0,t.jsx)(b.AlertTitle_Shadcn_,{children:"This query is optimized"}),(0,t.jsx)(g.AlertDescription_Shadcn_,{children:"Recommendations for indexes will show here"})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(P.IndexImprovementText,{indexStatements:ei,totalCostBefore:ec,totalCostAfter:el,className:"text-sm text-foreground-light"}),(0,t.jsx)(w.CodeBlock,{hideLineNumbers:!0,value:ei.join(";\n")+";",language:"sql",className:(0,N.cn)("max-w-full max-h-[310px]","!py-3 !px-3.5 prose dark:prose-dark transition","[&>code]:m-0 [&>code>span]:flex [&>code>span]:flex-wrap")}),(0,t.jsx)("p",{className:"text-sm text-foreground-light mt-3",children:"This recommendation serves to prevent your queries from slowing down as your application grows, and hence the index may not be used immediately after it's created (e.g If your table is still small at this time)."})]})})]}):(0,t.jsx)(q.IndexAdvisorDisabledState,{})]})}),X&&ed&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(I.QueryPanelSection,{className:"py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-1",children:[(0,t.jsx)("h4",{className:"mb-2",children:"Query costs"}),(0,t.jsxs)("div",{className:"border rounded-md flex flex-col bg-surface-100",children:[(0,t.jsx)(I.QueryPanelScoreSection,{name:"Total cost of query",description:"An estimate of how long it will take to return all the rows (Includes start up cost)",before:ec,after:el}),(0,t.jsxs)(T.Collapsible_Shadcn_,{open:O,onOpenChange:D,children:[(0,t.jsx)(S.CollapsibleContent_Shadcn_,{asChild:!0,className:"pb-3",children:(0,t.jsx)(I.QueryPanelScoreSection,{hideArrowMarkers:!0,className:"border-t",name:"Start up cost",description:"An estimate of how long it will take to fetch the first row",before:eo,after:es})}),(0,t.jsxs)(E.CollapsibleTrigger_Shadcn_,{className:"text-xs py-1.5 border-t text-foreground-light bg-studio w-full rounded-b-md",children:["View ",O?"less":"more"]})]})]})]})}),(0,t.jsx)(I.QueryPanelSection,{className:"py-6 border-t",children:(0,t.jsxs)("div",{className:"flex flex-col gap-y-2",children:[(0,t.jsx)("h4",{className:"mb-2",children:"FAQ"}),(0,t.jsxs)(y.Accordion_Shadcn_,{collapsible:!0,type:"single",className:"border rounded-md",children:[(0,t.jsxs)(x.AccordionItem_Shadcn_,{value:"1",children:[(0,t.jsx)(s.AccordionTrigger,{className:"px-4 py-3 text-sm font-normal text-foreground-light hover:text-foreground transition [&[data-state=open]]:text-foreground",children:"What units are cost in?"}),(0,t.jsx)(_.AccordionContent_Shadcn_,{className:"px-4 text-foreground-light",children:"Costs are in an arbitrary unit, and do not represent a unit of time. The units are anchored (by default) to a single sequential page read costing 1.0 units. They do, however, serve as a predictor of higher execution times."})]}),(0,t.jsxs)(x.AccordionItem_Shadcn_,{value:"2",className:"border-b-0",children:[(0,t.jsx)(s.AccordionTrigger,{className:"px-4 py-3 text-sm font-normal text-foreground-light hover:text-foreground transition [&[data-state=open]]:text-foreground",children:"How should I prioritize start up and total cost?"}),(0,t.jsxs)(_.AccordionContent_Shadcn_,{className:"px-4 text-foreground-light [&>div]:space-y-2",children:[(0,t.jsx)("p",{children:"This depends on the expected size of the result set from the query."}),(0,t.jsx)("p",{children:"For queries that return a small number or rows, the startup cost is more critical and minimizing startup cost can lead to faster response times, especially in interactive applications."}),(0,t.jsx)("p",{children:"For queries that return a large number of rows, the total cost becomes more important, and optimizing it will help in efficiently using resources and reducing overall query execution time."})]})]})]})]})})]}),X&&ed&&(0,t.jsxs)("div",{className:"bg-studio sticky bottom-0 border-t py-3 flex items-center justify-between px-5",children:[(0,t.jsxs)("div",{className:"flex flex-col gap-y-0.5 text-xs",children:[(0,t.jsx)("span",{children:"Apply index to database"}),(0,t.jsx)("span",{className:"text-xs text-foreground-light",children:"This will run the SQL that is shown above"})]}),(0,t.jsx)(j.Button,{disabled:F,loading:F,type:"primary",onClick:()=>em(),children:"Create index"})]})]}):(0,t.jsx)(I.QueryPanelContainer,{className:"h-full",children:(0,t.jsx)(I.QueryPanelSection,{className:"pt-2",children:(0,t.jsxs)("div",{className:"border rounded border-dashed flex flex-col items-center justify-center py-4 px-12 gap-y-1 text-center",children:[(0,t.jsx)("p",{className:"text-sm text-foreground-light",children:"Enable Index Advisor"}),(0,t.jsx)("p",{className:"text-center text-xs text-foreground-lighter mb-2",children:"Recommends indexes to improve query performance."}),(0,t.jsxs)("div",{className:"flex items-center gap-x-2",children:[(0,t.jsx)(c.DocsButton,{href:`${h.DOCS_URL}/guides/database/extensions/index_advisor`}),(0,t.jsx)(k.EnableIndexAdvisorButton,{})]})]})})})};var L=e.i(246230),M=e.i(242882),O=e.i(714403);async function D({projectRef:e,connectionString:t,schema:a,table:n}){let r,i;if(!e)throw Error("Project ref is required");if(!a)throw Error("Schema is required");if(!n)throw Error("Table is required");let s=(r=a.replace(/'/g,"''"),i=n.replace(/'/g,"''"),`
-- Get top 5 SELECT queries involving this table and run through index_advisor
set search_path to public, extensions;

with top_queries as (
  select
    statements.query,
    statements.calls,
    statements.total_exec_time + statements.total_plan_time as total_time,
    statements.mean_exec_time + statements.mean_plan_time as mean_time
  from pg_stat_statements as statements
    inner join pg_authid as auth on statements.userid = auth.oid
  where 
    -- Filter for SELECT queries only (index_advisor only works with SELECT)
    (lower(statements.query) like 'select%' or lower(statements.query) like 'with pgrst%')
    -- Filter for queries involving our table (handles schema.table and just table references)
    and (
      lower(statements.query) like '%${r.toLowerCase()}.${i.toLowerCase()}%'
      or lower(statements.query) like '%from ${i.toLowerCase()}%'
      or lower(statements.query) like '%join ${i.toLowerCase()}%'
    )
    -- Exclude system queries
    and statements.query not like '%pg_catalog%'
    and statements.query not like '%information_schema%'
  order by statements.calls desc
  limit 5
)
select
  tq.query,
  tq.calls,
  tq.total_time,
  tq.mean_time,
  coalesce(ia.index_statements, '{}') as index_statements,
  coalesce((ia.startup_cost_before)::numeric, 0) as startup_cost_before,
  coalesce((ia.startup_cost_after)::numeric, 0) as startup_cost_after,
  coalesce((ia.total_cost_before)::numeric, 0) as total_cost_before,
  coalesce((ia.total_cost_after)::numeric, 0) as total_cost_after
from top_queries tq
left join lateral (
  select * from index_advisor(tq.query)
) ia on true;
`.trim()),{result:o}=await (0,O.executeSql)({projectRef:e,connectionString:t,sql:s}),l=(o||[]).filter(e=>e.index_statements&&e.index_statements.length>0).map(e=>{let t=(0,R.filterProtectedSchemaIndexStatements)(e.index_statements);if(0===t.length)return null;let a=e.total_cost_before>0?(e.total_cost_before-e.total_cost_after)/e.total_cost_before*100:0;return{query:e.query,calls:e.calls,total_time:e.total_time,mean_time:e.mean_time,index_statements:t,startup_cost_before:e.startup_cost_before,startup_cost_after:e.startup_cost_after,total_cost_before:e.total_cost_before,total_cost_after:e.total_cost_after,improvement_percentage:Math.round(100*a)/100}}).filter(e=>null!==e),c=function(e){let t=new Set;for(let a of e){let e=a.match(/USING\s+\w+\s*\(([^)]+)\)/i);e&&e[1].split(",").forEach(e=>{let a=e.trim().replace(/^"(.+)"$/,"$1");a&&t.add(a)})}return Array.from(t)}(l.flatMap(e=>e.index_statements));return{suggestions:l,columnsWithSuggestions:c}}var F=e.i(725137);let Q=(0,n.createContext)({isLoading:!1,isAvailable:!1,isEnabled:!1,columnsWithSuggestions:[],suggestions:[],openSheet:()=>{},getSuggestionsForColumn:()=>[],invalidate:async()=>{}});function z({children:e,schema:r,table:i}){let{data:s}=(0,p.useSelectedProjectQuery)(),{isIndexAdvisorAvailable:l,isIndexAdvisorEnabled:c}=(0,o.useIndexAdvisorStatus)(),d=(0,a.useQueryClient)(),[u,m]=(0,n.useState)(!1),[h,f]=(0,n.useState)(void 0),{data:_,isLoading:x}=function({projectRef:e,connectionString:t,schema:a,table:n},{enabled:r=!0,...i}={}){return(0,M.useQuery)({queryKey:L.databaseKeys.tableIndexAdvisor(e,a,n),queryFn:()=>D({projectRef:e,connectionString:t,schema:a,table:n}),enabled:r&&void 0!==e&&!!a&&!!n,retry:!1,staleTime:3e5,...i})}({projectRef:s?.ref,connectionString:s?.connectionString,schema:r,table:i},{enabled:c&&!!r&&!!i}),y=(0,n.useCallback)(e=>{f(e),m(!0)},[]),g=(0,n.useCallback)(()=>{m(!1),f(void 0)},[]),b=(0,n.useCallback)(e=>_?.suggestions?_.suggestions.filter(t=>t.index_statements.some(t=>{let a=t.match(/USING\s+\w+\s*\(([^)]+)\)/i);return!!a&&a[1].split(",").map(e=>e.trim().replace(/^"(.+)"$/,"$1")).includes(e)})):[],[_?.suggestions]),v=(0,n.useCallback)(async()=>{s?.ref&&r&&i&&await d.invalidateQueries({queryKey:L.databaseKeys.tableIndexAdvisor(s.ref,r,i)})},[d,s?.ref,r,i]),j=h?b(h)[0]:null,w={isLoading:x,isAvailable:l,isEnabled:c,columnsWithSuggestions:_?.columnsWithSuggestions??[],suggestions:_?.suggestions??[],openSheet:y,getSuggestionsForColumn:b,invalidate:v};return(0,t.jsxs)(Q.Provider,{value:w,children:[e,(0,t.jsx)(F.Sheet,{open:u,onOpenChange:e=>!e&&g(),children:(0,t.jsxs)(F.SheetContent,{className:"flex flex-col gap-0 p-0 sm:max-w-[500px]",children:[(0,t.jsx)(F.SheetHeader,{className:"border-b px-5 py-3",children:(0,t.jsx)(F.SheetTitle,{children:"Index Recommendation"})}),j&&(0,t.jsx)($,{selectedRow:{query:j.query},columnName:h,suggestedSelectQuery:j.query,onClose:g})]})})]})}function Y(){return(0,n.useContext)(Q)}function U(e){let{columnsWithSuggestions:t}=Y();return t.includes(e)}}]);

//# debugId=5bc5df0b-1323-33c4-f5d6-1ff003cf738a
//# sourceMappingURL=3adeb3dc8b4c9fe8.js.map