;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="d949c2bd-8bcc-6468-0738-5b4e1eb24ff5")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,755216,e=>{"use strict";var n=e.i(479084);let t=`
-- Can't use pg_authid here since some managed Postgres providers don't expose it
-- https://github.com/supabase/postgres-meta/issues/212

select
  r.oid as id,
  rolname as name,
  rolsuper as "isSuperuser",
  rolcreatedb as "canCreateDb",
  rolcreaterole as "canCreateRole",
  rolinherit as "inheritRole",
  rolcanlogin as "canLogin",
  rolreplication as "isReplicationRole",
  rolbypassrls as "canBypassRls",
  (
    select
      count(*)
    from
      pg_stat_activity
    where
      r.rolname = pg_stat_activity.usename
  ) as "activeConnections",
  case when rolconnlimit = -1 then current_setting('max_connections') :: int8
       else rolconnlimit
  end as "connectionLimit",
  rolvaliduntil as "validUntil",
  coalesce(r_config.role_configs, '{}') as config
from
  pg_roles r
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as role_configs
    from
      (
        select
          oid,
          (string_to_array(unnest(rolconfig), '='))[1] as param,
          (string_to_array(unnest(rolconfig), '='))[2] as value
        from
          pg_roles
      ) as _
    group by
      oid
  ) r_config on r_config.oid = r.oid
`;var a=e.i(97429);let i=a.z.object({id:a.z.number(),name:a.z.string(),isSuperuser:a.z.boolean(),canCreateDb:a.z.boolean(),canCreateRole:a.z.boolean(),inheritRole:a.z.boolean(),canLogin:a.z.boolean(),isReplicationRole:a.z.boolean(),canBypassRls:a.z.boolean(),activeConnections:a.z.number(),connectionLimit:a.z.number(),validUntil:a.z.union([a.z.string(),a.z.null()]),config:a.z.record(a.z.string(),a.z.string())}),r=a.z.array(i),o=a.z.optional(i);function l(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)}`;throw Error("Must provide either id or name")}var s=e.i(248593);let d=(e,n)=>`
COALESCE(
  (
    SELECT
      array_agg(row_to_json(${e})) FILTER (WHERE ${n})
    FROM
      ${e}
  ),
  '{}'
) AS ${e}`;function c(e,t,a){return(a&&(t=a.concat(t??[])),e?.length)?`IN (${e.map(n.literal).join(",")})`:t?.length?`NOT IN (${t.map(n.literal).join(",")})`:""}let m=`
-- Adapted from information_schema.columns

SELECT
  c.oid :: int8 AS table_id,
  nc.nspname AS schema,
  c.relname AS table,
  (c.oid || '.' || a.attnum) AS id,
  a.attnum AS ordinal_position,
  a.attname AS name,
  CASE
    WHEN a.atthasdef THEN pg_get_expr(ad.adbin, ad.adrelid)
    ELSE NULL
  END AS default_value,
  CASE
    WHEN t.typtype = 'd' THEN CASE
      WHEN bt.typelem <> 0 :: oid
      AND bt.typlen = -1 THEN 'ARRAY'
      WHEN nbt.nspname = 'pg_catalog' THEN format_type(t.typbasetype, NULL)
      ELSE 'USER-DEFINED'
    END
    ELSE CASE
      WHEN t.typelem <> 0 :: oid
      AND t.typlen = -1 THEN 'ARRAY'
      WHEN nt.nspname = 'pg_catalog' THEN format_type(a.atttypid, NULL)
      ELSE 'USER-DEFINED'
    END
  END AS data_type,
  COALESCE(bt.typname, t.typname) AS format,
  a.attidentity IN ('a', 'd') AS is_identity,
  CASE
    a.attidentity
    WHEN 'a' THEN 'ALWAYS'
    WHEN 'd' THEN 'BY DEFAULT'
    ELSE NULL
  END AS identity_generation,
  a.attgenerated IN ('s') AS is_generated,
  NOT (
    a.attnotnull
    OR t.typtype = 'd' AND t.typnotnull
  ) AS is_nullable,
  (
    c.relkind IN ('r', 'p')
    OR c.relkind IN ('v', 'f') AND pg_column_is_updatable(c.oid, a.attnum, FALSE)
  ) AS is_updatable,
  uniques.table_id IS NOT NULL AS is_unique,
  check_constraints.definition AS "check",
  array_to_json(
    array(
      SELECT
        enumlabel
      FROM
        pg_catalog.pg_enum enums
      WHERE
        enums.enumtypid = coalesce(bt.oid, t.oid)
        OR enums.enumtypid = coalesce(bt.typelem, t.typelem)
      ORDER BY
        enums.enumsortorder
    )
  ) AS enums,
  col_description(c.oid, a.attnum) AS comment
FROM
  pg_attribute a
  LEFT JOIN pg_attrdef ad ON a.attrelid = ad.adrelid
  AND a.attnum = ad.adnum
  JOIN (
    pg_class c
    JOIN pg_namespace nc ON c.relnamespace = nc.oid
  ) ON a.attrelid = c.oid
  JOIN (
    pg_type t
    JOIN pg_namespace nt ON t.typnamespace = nt.oid
  ) ON a.atttypid = t.oid
  LEFT JOIN (
    pg_type bt
    JOIN pg_namespace nbt ON bt.typnamespace = nbt.oid
  ) ON t.typtype = 'd'
  AND t.typbasetype = bt.oid
  LEFT JOIN (
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position
    FROM pg_catalog.pg_constraint
    WHERE contype = 'u' AND cardinality(conkey) = 1
  ) AS uniques ON uniques.table_id = c.oid AND uniques.ordinal_position = a.attnum
  LEFT JOIN (
    -- We only select the first column check
    SELECT DISTINCT ON (table_id, ordinal_position)
      conrelid AS table_id,
      conkey[1] AS ordinal_position,
      substring(
        pg_get_constraintdef(pg_constraint.oid, true),
        8,
        length(pg_get_constraintdef(pg_constraint.oid, true)) - 8
      ) AS "definition"
    FROM pg_constraint
    WHERE contype = 'c' AND cardinality(conkey) = 1
    ORDER BY table_id, ordinal_position, oid asc
  ) AS check_constraints ON check_constraints.table_id = c.oid AND check_constraints.ordinal_position = a.attnum
WHERE
  NOT pg_is_other_temp_schema(nc.oid)
  AND a.attnum > 0
  AND NOT a.attisdropped
  AND (c.relkind IN ('r', 'v', 'm', 'f', 'p'))
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_column_privilege(
      c.oid,
      a.attnum,
      'SELECT, INSERT, UPDATE, REFERENCES'
    )
  )
`,p=a.z.object({id:a.z.string(),table_id:a.z.number(),schema:a.z.string(),table:a.z.string(),name:a.z.string(),ordinal_position:a.z.number(),data_type:a.z.string(),format:a.z.string(),is_identity:a.z.boolean(),identity_generation:a.z.string().nullable(),is_generated:a.z.boolean(),is_nullable:a.z.boolean(),is_updatable:a.z.boolean(),is_unique:a.z.boolean(),check:a.z.string().nullable(),default_value:a.z.any().nullable(),enums:a.z.array(a.z.string()),comment:a.z.string().nullable()}),_=a.z.array(p),u=a.z.optional(p),g=e=>e.endsWith("[]")?`${(0,n.ident)(e.slice(0,-2))}[]`:e.includes(".")?e:(0,n.ident)(e),b=`
-- Adapted from information_schema.schemata

select
  n.oid as id,
  n.nspname as name,
  u.rolname as owner,
   obj_description(n.oid, 'pg_namespace') AS comment
from
  pg_namespace n,
  pg_roles u
where
  n.nspowner = u.oid
  and (
    pg_has_role(n.nspowner, 'USAGE')
    or has_schema_privilege(n.oid, 'CREATE, USAGE')
  )
  and not pg_catalog.starts_with(n.nspname, 'pg_temp_')
  and not pg_catalog.starts_with(n.nspname, 'pg_toast_temp_')
`,E=a.z.object({id:a.z.number(),name:a.z.string(),owner:a.z.string(),comment:a.z.string().nullable()}),$=a.z.array(E),f=a.z.optional(E),h=`
SELECT
  c.oid :: int8 AS id,
  nc.nspname AS schema,
  c.relname AS name,
  c.relrowsecurity AS rls_enabled,
  c.relforcerowsecurity AS rls_forced,
  CASE
    WHEN c.relreplident = 'd' THEN 'DEFAULT'
    WHEN c.relreplident = 'i' THEN 'INDEX'
    WHEN c.relreplident = 'f' THEN 'FULL'
    ELSE 'NOTHING'
  END AS replica_identity,
  pg_total_relation_size(format('%I.%I', nc.nspname, c.relname)) :: int8 AS bytes,
  pg_size_pretty(
    pg_total_relation_size(format('%I.%I', nc.nspname, c.relname))
  ) AS size,
  pg_stat_get_live_tuples(c.oid) AS live_rows_estimate,
  pg_stat_get_dead_tuples(c.oid) AS dead_rows_estimate,
  obj_description(c.oid) AS comment,
  coalesce(pk.primary_keys, '[]') as primary_keys,
  coalesce(
    jsonb_agg(relationships) filter (where relationships is not null),
    '[]'
  ) as relationships
FROM
  pg_namespace nc
  JOIN pg_class c ON nc.oid = c.relnamespace
  left join (
    select
      c.oid::int8 as table_id,
      jsonb_agg(
        jsonb_build_object(
          'table_id', c.oid::int8,
          'schema', n.nspname,
          'table_name', c.relname,
          'name', a.attname
        )
        order by array_position(i.indkey, a.attnum)
      ) as primary_keys
    from
      pg_index i
      join pg_class c on i.indrelid = c.oid
      join pg_namespace n on c.relnamespace = n.oid
      join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
    where
      i.indisprimary
    group by c.oid
  ) as pk
  on pk.table_id = c.oid
  left join (
    select
      c.oid :: int8 as id,
      c.conname as constraint_name,
      nsa.nspname as source_schema,
      csa.relname as source_table_name,
      sa.attname as source_column_name,
      nta.nspname as target_table_schema,
      cta.relname as target_table_name,
      ta.attname as target_column_name
    from
      pg_constraint c
    join (
      pg_attribute sa
      join pg_class csa on sa.attrelid = csa.oid
      join pg_namespace nsa on csa.relnamespace = nsa.oid
    ) on sa.attrelid = c.conrelid and sa.attnum = any (c.conkey)
    join (
      pg_attribute ta
      join pg_class cta on ta.attrelid = cta.oid
      join pg_namespace nta on cta.relnamespace = nta.oid
    ) on ta.attrelid = c.confrelid and ta.attnum = any (c.confkey)
    where
      c.contype = 'f'
  ) as relationships
  on (relationships.source_schema = nc.nspname and relationships.source_table_name = c.relname)
  or (relationships.target_table_schema = nc.nspname and relationships.target_table_name = c.relname)
WHERE
  c.relkind IN ('r', 'p')
  AND NOT pg_is_other_temp_schema(nc.oid)
  AND (
    pg_has_role(c.relowner, 'USAGE')
    OR has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
    )
    OR has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  c.relname,
  c.relrowsecurity,
  c.relforcerowsecurity,
  c.relreplident,
  nc.nspname,
  pk.primary_keys
`,z=a.z.object({table_id:a.z.number(),name:a.z.string(),schema:a.z.string(),table_name:a.z.string()}),A=a.z.object({id:a.z.number(),constraint_name:a.z.string(),source_schema:a.z.string(),source_table_name:a.z.string(),source_column_name:a.z.string(),target_table_schema:a.z.string(),target_table_name:a.z.string(),target_column_name:a.z.string()}),y=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),rls_enabled:a.z.boolean(),rls_forced:a.z.boolean(),replica_identity:a.z.enum(["DEFAULT","INDEX","FULL","NOTHING"]),bytes:a.z.number(),size:a.z.string(),live_rows_estimate:a.z.number(),dead_rows_estimate:a.z.number(),comment:a.z.string().nullable(),primary_keys:a.z.array(z),relationships:a.z.array(A),columns:_.optional()}),S=a.z.array(y);function T({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i,includeColumns:r=!0}={}){let o=w({includeColumns:r}),l=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return l&&(o+=` where schema ${l}`),a&&(o+=` limit ${a}`),i&&(o+=` offset ${i}`),{sql:o,zod:S}}function N(e){let t=function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${w({includeColumns:!0})} where ${t};`,zod:y}}function v(e,{cascade:t=!1}={}){return{sql:`DROP TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)} ${t?"CASCADE":"RESTRICT"};`}}let w=({includeColumns:e})=>`
  with tables as (${h})
  ${e?`, columns as (${m})`:""}
  select
    *
    ${e?`, ${d("columns","columns.table_id = tables.id")}`:""}
  from tables`;function L({name:e,schema:t="public",comment:a}){let i=`CREATE TABLE ${(0,n.ident)(t)}.${(0,n.ident)(e)} ();`,r=void 0!=a?`COMMENT ON TABLE ${(0,n.ident)(t)}.${(0,n.ident)(e)} IS ${(0,n.literal)(a)};`:"";return{sql:`BEGIN; ${i} ${r} COMMIT;`}}function R(e,{name:t,schema:a,rls_enabled:i,rls_forced:r,replica_identity:o,replica_identity_index:l,primary_keys:s,comment:d}){let c=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)}`,m=void 0===a?"":`${c} SET SCHEMA ${(0,n.ident)(a)};`,p="";if(void 0!==t&&t!==e.name){let i=void 0===a?e.schema:a;p=`ALTER TABLE ${(0,n.ident)(i)}.${(0,n.ident)(e.name)} RENAME TO ${(0,n.ident)(t)};`}let _="";if(void 0!==i){let e=`${c} ENABLE ROW LEVEL SECURITY;`,n=`${c} DISABLE ROW LEVEL SECURITY;`;_=i?e:n}let u="";if(void 0!==r){let e=`${c} FORCE ROW LEVEL SECURITY;`,n=`${c} NO FORCE ROW LEVEL SECURITY;`;u=r?e:n}let g="";void 0===o||(g="INDEX"===o?`${c} REPLICA IDENTITY USING INDEX ${l};`:`${c} REPLICA IDENTITY ${o};`);let b="";void 0===s||(b+=`
DO $$
DECLARE
  r record;
BEGIN
  SELECT conname
    INTO r
    FROM pg_constraint
    WHERE contype = 'p' AND conrelid = ${(0,n.literal)(e.id)};
  IF r IS NOT NULL THEN
    EXECUTE ${(0,n.literal)(`${c} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END IF;
END
$$;
`,0===s.length||(b+=`${c} ADD PRIMARY KEY (${s.map(e=>(0,n.ident)(e.name)).join(",")});`));let E=void 0==d?"":`COMMENT ON TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)} IS ${(0,n.literal)(d)};`;return{sql:`
BEGIN;
  ${_}
  ${u}
  ${g}
  ${b}
  ${E}
  ${m}
  ${p}
COMMIT;`}}e.s(["create",()=>L,"list",()=>T,"remove",()=>v,"retrieve",()=>N,"update",()=>R],330006);var I=e.i(330006);let O=`
-- CTE with sane arg_modes, arg_names, and arg_types.
-- All three are always of the same length.
-- All three include all args, including OUT and TABLE args.
with functions as (
  select
    *,
    -- proargmodes is null when all arg modes are IN
    coalesce(
      p.proargmodes,
      array_fill('i'::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_modes,
    -- proargnames is null when all args are unnamed
    coalesce(
      p.proargnames,
      array_fill(''::text, array[cardinality(coalesce(p.proallargtypes, p.proargtypes))])
    ) as arg_names,
    -- proallargtypes is null when all arg modes are IN
    coalesce(p.proallargtypes, p.proargtypes) as arg_types,
    array_cat(
      array_fill(false, array[pronargs - pronargdefaults]),
      array_fill(true, array[pronargdefaults])) as arg_has_defaults
  from
    pg_proc as p
  where
    p.prokind = 'f'
)
select
  f.oid as id,
  n.nspname as schema,
  f.proname as name,
  l.lanname as language,
  case
    when l.lanname = 'internal' then ''
    else f.prosrc
  end as definition,
  case
    when l.lanname = 'internal' then f.prosrc
    else pg_get_functiondef(f.oid)
  end as complete_statement,
  coalesce(f_args.args, '[]') as args,
  pg_get_function_arguments(f.oid) as argument_types,
  pg_get_function_identity_arguments(f.oid) as identity_argument_types,
  f.prorettype as return_type_id,
  pg_get_function_result(f.oid) as return_type,
  nullif(rt.typrelid, 0) as return_type_relation_id,
  f.proretset as is_set_returning_function,
  case
    when f.provolatile = 'i' then 'IMMUTABLE'
    when f.provolatile = 's' then 'STABLE'
    when f.provolatile = 'v' then 'VOLATILE'
  end as behavior,
  f.prosecdef as security_definer,
  f_config.config_params as config_params
from
  functions f
  left join pg_namespace n on f.pronamespace = n.oid
  left join pg_language l on f.prolang = l.oid
  left join pg_type rt on rt.oid = f.prorettype
  left join (
    select
      oid,
      jsonb_object_agg(param, value) filter (where param is not null) as config_params
    from
      (
        select
          oid,
          (string_to_array(unnest(proconfig), '='))[1] as param,
          (string_to_array(unnest(proconfig), '='))[2] as value
        from
          functions
      ) as t
    group by
      oid
  ) f_config on f_config.oid = f.oid
  left join (
    select
      oid,
      jsonb_agg(jsonb_build_object(
        'mode', t2.mode,
        'name', name,
        'type_id', type_id,
        -- Cast null into false boolean
        'has_default', COALESCE(has_default, false)
      )) as args
    from
      (
        select
          oid,
          unnest(arg_modes) as mode,
          unnest(arg_names) as name,
          -- Coming from: coalesce(p.proallargtypes, p.proargtypes) postgres won't automatically assume
          -- integer, we need to cast it to be properly parsed
          unnest(arg_types)::int8 as type_id,
          unnest(arg_has_defaults) as has_default
        from
          functions
      ) as t1,
      lateral (
        select
          case
            when t1.mode = 'i' then 'in'
            when t1.mode = 'o' then 'out'
            when t1.mode = 'b' then 'inout'
            when t1.mode = 'v' then 'variadic'
            else 'table'
          end as mode
      ) as t2
    group by
      t1.oid
  ) f_args on f_args.oid = f.oid
`,C=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),language:a.z.string(),definition:a.z.string(),complete_statement:a.z.string(),args:a.z.array(a.z.object({mode:a.z.union([a.z.literal("in"),a.z.literal("out"),a.z.literal("inout"),a.z.literal("variadic"),a.z.literal("table")]),name:a.z.string(),type_id:a.z.number(),has_default:a.z.boolean()})),argument_types:a.z.string(),identity_argument_types:a.z.string(),return_type_id:a.z.number(),return_type:a.z.string(),return_type_relation_id:a.z.union([a.z.number(),a.z.null()]),is_set_returning_function:a.z.boolean(),behavior:a.z.union([a.z.literal("IMMUTABLE"),a.z.literal("STABLE"),a.z.literal("VOLATILE")]),security_definer:a.z.boolean(),config_params:a.z.union([a.z.record(a.z.string(),a.z.string()),a.z.null()])}),x=a.z.array(C),D=a.z.optional(C);function j({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i}={}){let r=`
    with f as (
      ${O}
    )
    select
      f.*
    from f
  `,o=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return o&&(r+=` where schema ${o}`),a&&(r=`${r} limit ${a}`),i&&(r=`${r} offset ${i}`),{sql:r,zod:x}}function M({id:e,name:t,schema:a="public",args:i=[]}){if(e)return{sql:`
      with f as (
        ${O}
      )
      select
        f.*
      from f where id = ${(0,n.literal)(e)};`,zod:D};if(t&&a&&i)return{sql:`with f as (
      ${O}
    )
    select
      f.*
    from f join pg_proc as p on id = p.oid where schema = ${(0,n.literal)(a)} and name = ${(0,n.literal)(t)} and p.proargtypes::text = ${i.length?`(
          select string_agg(type_oid::text, ' ') from (
            select (
              split_args.arr[
                array_length(
                  split_args.arr,
                  1
                )
              ]::regtype::oid
            ) as type_oid from (
              select string_to_array(
                unnest(
                  array[${i.map(n.literal)}]
                ),
                ' '
              ) as arr
            ) as split_args
          ) args
        )`:(0,n.literal)("")}`,zod:D};throw Error("Must provide either id or name and schema")}let U=a.z.object({name:a.z.string(),definition:a.z.string(),args:a.z.array(a.z.string()).optional(),behavior:a.z.enum(["IMMUTABLE","STABLE","VOLATILE"]).optional(),config_params:a.z.record(a.z.string(),a.z.string()).optional(),schema:a.z.string().optional(),language:a.z.string().optional(),return_type:a.z.string().optional(),security_definer:a.z.boolean().optional()});function F({name:e,schema:t,args:a,definition:i,return_type:r,language:o,behavior:l,security_definer:s,config_params:d},{replace:c=!1}={}){return`
    CREATE ${c?"OR REPLACE":""} FUNCTION ${(0,n.ident)(t)}.${(0,n.ident)(e)}(${a?.join(", ")||""})
    RETURNS ${r}
    AS ${(0,n.literal)(i)}
    LANGUAGE ${o}
    ${l}
    CALLED ON NULL INPUT
    ${s?"SECURITY DEFINER":"SECURITY INVOKER"}
    ${d?Object.entries(d).map(([e,n])=>`SET ${e} ${"FROM CURRENT"===n?"FROM CURRENT":"TO "+('""'===n?"''":n)}`).join("\n"):""};
  `}function k({name:e,schema:n="public",args:t=[],definition:i,return_type:r="void",language:o="sql",behavior:l="VOLATILE",security_definer:s=!1,config_params:d={}}){return{sql:F({name:e,schema:n,args:t,definition:i,return_type:r,language:o,behavior:l,security_definer:s,config_params:d}),zod:a.z.void()}}let H=a.z.object({name:a.z.string().optional(),schema:a.z.string().optional(),definition:a.z.string().optional()});function q(e,{name:t,schema:i,definition:r}){let o=e.argument_types.split(", "),l=e.identity_argument_types,s="string"==typeof r?F({...e,definition:r,args:o,config_params:e.config_params??{}},{replace:!0}):"",d=t&&t!==e.name?`ALTER FUNCTION ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)}(${l}) RENAME TO ${(0,n.ident)(t)};`:"",c=i&&i!==e.schema?`ALTER FUNCTION ${(0,n.ident)(e.schema)}.${(0,n.ident)(t||e.name)}(${l})  SET SCHEMA ${(0,n.ident)(i)};`:"";return{sql:`
    DO LANGUAGE plpgsql $$
    BEGIN
      IF ${"string"==typeof r?"TRUE":"FALSE"} THEN
        ${s}

        IF (
          SELECT id
          FROM (${O}) AS f
          WHERE f.schema = ${(0,n.literal)(e.schema)}
          AND f.name = ${(0,n.literal)(e.name)}
          AND f.identity_argument_types = ${(0,n.literal)(l)}
        ) != ${e.id} THEN
          RAISE EXCEPTION 'Cannot find function "${e.schema}"."${e.name}"(${l})';
        END IF;
      END IF;

      ${d}

      ${c}
    END;
    $$;
  `,zod:a.z.void()}}let B=a.z.object({cascade:a.z.boolean().default(!1).optional()});function P(e,{cascade:t=!1}={}){return{sql:`DROP FUNCTION ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.name)}
  (${e.identity_argument_types})
  ${t?"CASCADE":"RESTRICT"};`,zod:a.z.void()}}e.s(["create",()=>k,"list",()=>j,"pgFunctionArrayZod",0,x,"pgFunctionCreateZod",0,U,"pgFunctionDeleteZod",0,B,"pgFunctionOptionalZod",0,D,"pgFunctionUpdateZod",0,H,"pgFunctionZod",0,C,"remove",()=>P,"retrieve",()=>M,"update",()=>q],198687);var W=e.i(198687);let Y=`
-- Despite the name \`table_privileges\`, this includes other kinds of relations:
-- views, matviews, etc. "Relation privileges" just doesn't roll off the tongue.
--
-- For each relation, get its relacl in a jsonb format,
-- e.g.
--
-- '{postgres=arwdDxt/postgres}'
--
-- becomes
--
-- [
--   {
--     "grantee": "postgres",
--     "grantor": "postgres",
--     "is_grantable": false,
--     "privilege_type": "INSERT"
--   },
--   ...
-- ]
select
  c.oid as relation_id,
  nc.nspname as schema,
  c.relname as name,
  case
    when c.relkind = 'r' then 'table'
    when c.relkind = 'v' then 'view'
    when c.relkind = 'm' then 'materialized_view'
    when c.relkind = 'f' then 'foreign_table'
    when c.relkind = 'p' then 'partitioned_table'
  end as kind,
  coalesce(
    jsonb_agg(
      jsonb_build_object(
        'grantor', grantor.rolname,
        'grantee', grantee.rolname,
        'privilege_type', _priv.privilege_type,
        'is_grantable', _priv.is_grantable
      )
    ) filter (where _priv is not null),
    '[]'
  ) as privileges
from pg_class c
join pg_namespace as nc
  on nc.oid = c.relnamespace
left join lateral (
  select grantor, grantee, privilege_type, is_grantable
  from aclexplode(coalesce(c.relacl, acldefault('r', c.relowner)))
) as _priv on true
left join pg_roles as grantor
  on grantor.oid = _priv.grantor
left join (
  select
    pg_roles.oid,
    pg_roles.rolname
  from pg_roles
  union all
  select
    (0)::oid as oid, 'PUBLIC'
) as grantee (oid, rolname)
  on grantee.oid = _priv.grantee
where c.relkind in ('r', 'v', 'm', 'f', 'p')
  and not pg_is_other_temp_schema(c.relnamespace)
  and (
    pg_has_role(c.relowner, 'USAGE')
    or has_table_privilege(
      c.oid,
      'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
      || case when current_setting('server_version_num')::int4 >= 170000 then ', MAINTAIN' else '' end
    )
    or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
  )
group by
  c.oid,
  nc.nspname,
  c.relname,
  c.relkind
`,G=a.z.object({relation_id:a.z.number(),schema:a.z.string(),name:a.z.string(),kind:a.z.union([a.z.literal("table"),a.z.literal("view"),a.z.literal("materialized_view"),a.z.literal("foreign_table"),a.z.literal("partitioned_table")]),privileges:a.z.array(a.z.object({grantor:a.z.string(),grantee:a.z.string(),privilege_type:a.z.union([a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("DELETE"),a.z.literal("TRUNCATE"),a.z.literal("REFERENCES"),a.z.literal("TRIGGER"),a.z.literal("MAINTAIN")]),is_grantable:a.z.boolean()}))}),J=a.z.array(G),Q=a.z.optional(G),V=`
SELECT
  p.oid :: int8 AS id,
  p.pubname AS name,
  p.pubowner::regrole::text AS owner,
  p.pubinsert AS publish_insert,
  p.pubupdate AS publish_update,
  p.pubdelete AS publish_delete,
  p.pubtruncate AS publish_truncate,
  CASE
    WHEN p.puballtables THEN NULL
    ELSE pr.tables
  END AS tables
FROM
  pg_catalog.pg_publication AS p
  LEFT JOIN LATERAL (
    SELECT
      COALESCE(
        array_agg(
          json_build_object(
            'id',
            c.oid :: int8,
            'name',
            c.relname,
            'schema',
            nc.nspname
          )
        ),
        '{}'
      ) AS tables
    FROM
      pg_catalog.pg_publication_rel AS pr
      JOIN pg_class AS c ON pr.prrelid = c.oid
      join pg_namespace as nc on c.relnamespace = nc.oid
    WHERE
      pr.prpubid = p.oid
  ) AS pr ON 1 = 1
`,X=a.z.object({id:a.z.number().optional(),name:a.z.string(),schema:a.z.string()}),K=a.z.object({id:a.z.number(),name:a.z.string(),owner:a.z.string(),publish_insert:a.z.boolean(),publish_update:a.z.boolean(),publish_delete:a.z.boolean(),publish_truncate:a.z.boolean(),tables:a.z.array(X).nullable()}),Z=a.z.array(K),ee=a.z.optional(K),en=`
SELECT
  e.name,
  n.nspname AS schema,
  e.default_version,
  x.extversion AS installed_version,
  e.comment
FROM
  pg_available_extensions() e(name, default_version, comment)
  LEFT JOIN pg_extension x ON e.name = x.extname
  LEFT JOIN pg_namespace n ON x.extnamespace = n.oid
`,et=a.z.object({name:a.z.string(),schema:a.z.string().nullable(),default_version:a.z.string(),installed_version:a.z.string().nullable(),comment:a.z.string()}),ea=a.z.array(et),ei=a.z.optional(et),er=`
SELECT
  name,
  setting,
  category,
  TRIM(split_part(category, '/', 1)) AS group,
  TRIM(split_part(category, '/', 2)) AS subgroup,
  unit,
  short_desc,
  extra_desc,
  context,
  vartype,
  source,
  min_val,
  max_val,
  enumvals,
  boot_val,
  reset_val,
  sourcefile,
  sourceline,
  pending_restart
FROM
  pg_settings
ORDER BY
  category,
  name
`,eo=a.z.object({name:a.z.string(),setting:a.z.string(),category:a.z.string(),group:a.z.string(),subgroup:a.z.string(),unit:a.z.string().nullable(),short_desc:a.z.string(),extra_desc:a.z.string().nullable(),context:a.z.string(),vartype:a.z.string(),source:a.z.string(),min_val:a.z.string().nullable(),max_val:a.z.string().nullable(),enumvals:a.z.array(a.z.string()).nullable(),boot_val:a.z.string().nullable(),reset_val:a.z.string().nullable(),sourcefile:a.z.string().nullable(),sourceline:a.z.number().nullable(),pending_restart:a.z.boolean()}),el=a.z.array(eo),es=`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  c.relispopulated as is_populated,
  obj_description(c.oid) as comment
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
where
  c.relkind = 'm'
`,ed=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),is_populated:a.z.boolean(),comment:a.z.string().nullable(),columns:_.optional()}),ec=a.z.array(ed),em=a.z.optional(ed),ep=({includeColumns:e})=>`
with materialized_views as (${es})
  ${e?`, columns as (${m})`:""}
select
  *
  ${e?`, ${d("columns","columns.table_id = materialized_views.id")}`:""}
from materialized_views`,e_=`
select
  c.oid::int8 as id,
  n.nspname as schema,
  c.relname as name,
  obj_description(c.oid) as comment,
  fs.srvname as foreign_server_name,
  fdw.fdwname as foreign_data_wrapper_name,
  handler.proname as foreign_data_wrapper_handler
from
  pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  inner join pg_foreign_table ft on ft.ftrelid = c.oid
  inner join pg_foreign_server fs on fs.oid = ft.ftserver
  inner join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
  inner join pg_proc handler on handler.oid = fdw.fdwhandler
where
  c.relkind = 'f'
`,eu=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),comment:a.z.string().nullable(),foreign_server_name:a.z.string(),foreign_data_wrapper_name:a.z.string(),foreign_data_wrapper_handler:a.z.string(),columns:_.optional()}),eg=a.z.array(eu),eb=a.z.optional(eu),eE=({includeColumns:e})=>`
with foreign_tables as (${e_})
  ${e?`, columns as (${m})`:""}
select
  *
  ${e?`, ${d("columns","columns.table_id = foreign_tables.id")}`:""}
from foreign_tables`,e$=`
SELECT
  c.oid :: int8 AS id,
  n.nspname AS schema,
  c.relname AS name,
  (pg_relation_is_updatable(c.oid, false) & 20) = 20 AS is_updatable,
  obj_description(c.oid) AS comment
FROM
  pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE
  c.relkind = 'v'
`,ef=a.z.object({id:a.z.number(),schema:a.z.string(),name:a.z.string(),is_updatable:a.z.boolean(),comment:a.z.string().nullable(),columns:_.optional()}),eh=a.z.array(ef),ez=a.z.optional(ef),eA=({includeColumns:e})=>`
with views as (${e$})
  ${e?`, columns as (${m})`:""}
select
  *
  ${e?`, ${d("columns","columns.table_id = views.id")}`:""}
from views`,ey=`
select
  pol.oid :: int8 as id,
  n.nspname as schema,
  c.relname as table,
  c.oid :: int8 as table_id,
  pol.polname as name,
  case
    when pol.polpermissive then 'PERMISSIVE'::text
    else 'RESTRICTIVE'::text
  end as action,
  case
    when pol.polroles = '{0}'::oid[] then array_to_json(string_to_array('public'::text, ''::text)::name[])
    else array_to_json(array(
      select pg_roles.rolname
      from pg_roles
      where pg_roles.oid = any(pol.polroles)
      order by pg_roles.rolname
    ))
  end as roles,
  case pol.polcmd
    when 'r'::"char" then 'SELECT'::text
    when 'a'::"char" then 'INSERT'::text
    when 'w'::"char" then 'UPDATE'::text
    when 'd'::"char" then 'DELETE'::text
    when '*'::"char" then 'ALL'::text
    else null::text
  end as command,
  pg_get_expr(pol.polqual, pol.polrelid) as definition,
  pg_get_expr(pol.polwithcheck, pol.polrelid) as check
from
  pg_policy pol
  join pg_class c on c.oid = pol.polrelid
  left join pg_namespace n on n.oid = c.relnamespace
`,eS=a.z.object({id:a.z.number(),schema:a.z.string(),table:a.z.string(),table_id:a.z.number(),name:a.z.string(),action:a.z.union([a.z.literal("PERMISSIVE"),a.z.literal("RESTRICTIVE")]),roles:a.z.array(a.z.string()),command:a.z.union([a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("DELETE"),a.z.literal("ALL")]),definition:a.z.union([a.z.string(),a.z.null()]),check:a.z.union([a.z.string(),a.z.null()])}),eT=a.z.array(eS),eN=a.z.optional(eS),ev=`
SELECT
  pg_t.oid AS id,
  pg_t.tgrelid AS table_id,
  CASE
    WHEN pg_t.tgenabled = 'D' THEN 'DISABLED'
    WHEN pg_t.tgenabled = 'O' THEN 'ORIGIN'
    WHEN pg_t.tgenabled = 'R' THEN 'REPLICA'
    WHEN pg_t.tgenabled = 'A' THEN 'ALWAYS'
  END AS enabled_mode,
  (
    STRING_TO_ARRAY(
      ENCODE(pg_t.tgargs, 'escape'), '\\000'
    )
  )[:pg_t.tgnargs] AS function_args,
  is_t.trigger_name AS name,
  is_t.event_object_table AS table,
  is_t.event_object_schema AS schema,
  is_t.action_condition AS condition,
  is_t.action_orientation AS orientation,
  is_t.action_timing AS activation,
  ARRAY_AGG(is_t.event_manipulation)::text[] AS events,
  pg_p.proname AS function_name,
  pg_n.nspname AS function_schema
FROM
  pg_trigger AS pg_t
JOIN
  pg_class AS pg_c
ON pg_t.tgrelid = pg_c.oid
JOIN information_schema.triggers AS is_t
ON is_t.trigger_name = pg_t.tgname
AND pg_c.relname = is_t.event_object_table
AND pg_c.relnamespace = (quote_ident(is_t.event_object_schema))::regnamespace
JOIN pg_proc AS pg_p
ON pg_t.tgfoid = pg_p.oid
JOIN pg_namespace AS pg_n
ON pg_p.pronamespace = pg_n.oid
GROUP BY
  pg_t.oid,
  pg_t.tgrelid,
  pg_t.tgenabled,
  pg_t.tgargs,
  pg_t.tgnargs,
  is_t.trigger_name,
  is_t.event_object_table,
  is_t.event_object_schema,
  is_t.action_condition,
  is_t.action_orientation,
  is_t.action_timing,
  pg_p.proname,
  pg_n.nspname
`,ew=a.z.object({id:a.z.number(),table_id:a.z.number(),enabled_mode:a.z.enum(["DISABLED","ORIGIN","REPLICA","ALWAYS"]),function_args:a.z.array(a.z.string()),name:a.z.string(),table:a.z.string(),schema:a.z.string(),condition:a.z.string().nullable(),orientation:a.z.string(),activation:a.z.string(),events:a.z.array(a.z.string()),function_name:a.z.string(),function_schema:a.z.string()}),eL=a.z.array(ew),eR=a.z.optional(ew);a.z.object({name:a.z.string(),schema:a.z.string().optional().default("public"),table:a.z.string(),function_schema:a.z.string().optional().default("public"),function_name:a.z.string(),function_args:a.z.array(a.z.string()).optional(),activation:a.z.enum(["BEFORE","AFTER","INSTEAD OF"]),events:a.z.array(a.z.string()),orientation:a.z.enum(["ROW","STATEMENT"]).optional(),condition:a.z.string().optional()}),a.z.object({name:a.z.string().optional(),enabled_mode:a.z.enum(["ORIGIN","REPLICA","ALWAYS","DISABLED"]).optional()});let eI=`
select
  t.oid::int8 as id,
  t.typname as name,
  n.nspname as schema,
  format_type (t.oid, null) as format,
  coalesce(t_enums.enums, '[]') as enums,
  coalesce(t_attributes.attributes, '[]') as attributes,
  obj_description (t.oid, 'pg_type') as comment
from
  pg_type t
  left join pg_namespace n on n.oid = t.typnamespace
  left join (
    select
      enumtypid,
      jsonb_agg(enumlabel order by enumsortorder) as enums
    from
      pg_enum
    group by
      enumtypid
  ) as t_enums on t_enums.enumtypid = t.oid
  left join (
    select
      oid,
      jsonb_agg(
        jsonb_build_object('name', a.attname, 'type_id', a.atttypid::int8)
        order by a.attnum asc
      ) as attributes
    from
      pg_class c
      join pg_attribute a on a.attrelid = c.oid
    where
      c.relkind = 'c' and not a.attisdropped
    group by
      c.oid
  ) as t_attributes on t_attributes.oid = t.typrelid
where
  (
    t.typrelid = 0
    or (
      select
        c.relkind = 'c'
      from
        pg_class c
      where
        c.oid = t.typrelid
    )
  )
`,eO=a.z.object({id:a.z.number(),name:a.z.string(),schema:a.z.string(),format:a.z.string(),enums:a.z.array(a.z.string()),attributes:a.z.array(a.z.object({name:a.z.string(),type_id:a.z.number()})),comment:a.z.string().nullable()}),eC=a.z.array(eO),ex=`
select
  version(),
  current_setting('server_version_num')::int8 as version_number,
  (
    select
      count(*) as active_connections
    from
      pg_stat_activity
  ) as active_connections,
  current_setting('max_connections')::int8 as max_connections
`,eD=a.z.object({version:a.z.string(),version_number:a.z.number(),active_connections:a.z.number(),max_connections:a.z.number()}),ej=`
  SELECT
    idx.indexrelid::int8 AS id,
    idx.indrelid::int8 AS table_id,
    n.nspname AS schema,
    idx.indnatts AS number_of_attributes,
    idx.indnkeyatts AS number_of_key_attributes,
    idx.indisunique AS is_unique,
    idx.indisprimary AS is_primary,
    idx.indisexclusion AS is_exclusion,
    idx.indimmediate AS is_immediate,
    idx.indisclustered AS is_clustered,
    idx.indisvalid AS is_valid,
    idx.indcheckxmin AS check_xmin,
    idx.indisready AS is_ready,
    idx.indislive AS is_live,
    idx.indisreplident AS is_replica_identity,
    idx.indkey::smallint[] AS key_attributes,
    idx.indcollation::integer[] AS collation,
    idx.indclass::integer[] AS class,
    idx.indoption::smallint[] AS options,
    idx.indpred AS index_predicate,
    obj_description(idx.indexrelid, 'pg_class') AS comment,
    ix.indexdef as index_definition,
    am.amname AS access_method,
    jsonb_agg(
      jsonb_build_object(
        'attribute_number', a.attnum,
        'attribute_name', a.attname,
        'data_type', format_type(a.atttypid, a.atttypmod)
      )
      ORDER BY a.attnum
    ) AS index_attributes
  FROM
    pg_index idx
    JOIN pg_class c ON c.oid = idx.indexrelid
    JOIN pg_namespace n ON c.relnamespace = n.oid
    JOIN pg_am am ON c.relam = am.oid
    JOIN pg_attribute a ON a.attrelid = c.oid AND a.attnum = ANY(idx.indkey)
    JOIN pg_indexes ix ON c.relname = ix.indexname
  GROUP BY
    idx.indexrelid, idx.indrelid, n.nspname, idx.indnatts, idx.indnkeyatts, idx.indisunique, 
    idx.indisprimary, idx.indisexclusion, idx.indimmediate, idx.indisclustered, idx.indisvalid, 
    idx.indcheckxmin, idx.indisready, idx.indislive, idx.indisreplident, idx.indkey, 
    idx.indcollation, idx.indclass, idx.indoption, idx.indexprs, idx.indpred, ix.indexdef, am.amname
`,eM=a.z.object({id:a.z.number(),table_id:a.z.number(),schema:a.z.string(),number_of_attributes:a.z.number(),number_of_key_attributes:a.z.number(),is_unique:a.z.boolean(),is_primary:a.z.boolean(),is_exclusion:a.z.boolean(),is_immediate:a.z.boolean(),is_clustered:a.z.boolean(),is_valid:a.z.boolean(),check_xmin:a.z.boolean(),is_ready:a.z.boolean(),is_live:a.z.boolean(),is_replica_identity:a.z.boolean(),key_attributes:a.z.array(a.z.number()),collation:a.z.array(a.z.number()),class:a.z.array(a.z.number()),options:a.z.array(a.z.number()),index_predicate:a.z.string().nullable(),comment:a.z.string().nullable(),index_definition:a.z.string(),access_method:a.z.string(),index_attributes:a.z.array(a.z.object({attribute_number:a.z.number(),attribute_name:a.z.string(),data_type:a.z.string()}))}),eU=a.z.array(eM),eF=a.z.optional(eM),ek=`
-- Lists each column's privileges in the form of:
--
-- [
--   {
--     "column_id": "12345.1",
--     "relation_schema": "public",
--     "relation_name": "mytable",
--     "column_name": "mycolumn",
--     "privileges": [
--       {
--         "grantor": "postgres",
--         "grantee": "myrole",
--         "privilege_type": "SELECT",
--         "is_grantable": false
--       },
--       ...
--     ]
--   },
--   ...
-- ]
--
-- Modified from information_schema.column_privileges. We try to be as close as
-- possible to the view definition, obtained from:
--
-- select pg_get_viewdef('information_schema.column_privileges');
--
-- The main differences are:
-- - we include column privileges for materialized views
--   (reason for exclusion in information_schema.column_privileges:
--    https://www.postgresql.org/message-id/9136.1502740844%40sss.pgh.pa.us)
-- - we query a.attrelid and a.attnum to generate column_id
-- - table_catalog is omitted
-- - table_schema -> relation_schema, table_name -> relation_name
--
-- Column privileges are intertwined with table privileges in that table
-- privileges override column privileges. E.g. if we do:
--
-- grant all on mytable to myrole;
--
-- Then myrole is granted privileges for ALL columns. Likewise, if we do:
--
-- grant all (id) on mytable to myrole;
-- revoke all on mytable from myrole;
--
-- Then the grant on the id column is revoked.
--
-- This is unlike how grants for schemas and tables interact, where you need
-- privileges for BOTH the schema the table is in AND the table itself in order
-- to access the table.

select (x.attrelid || '.' || x.attnum) as column_id,
       nc.nspname as relation_schema,
       x.relname as relation_name,
       x.attname as column_name,
       coalesce(
         jsonb_agg(
           jsonb_build_object(
             'grantor', u_grantor.rolname,
             'grantee', grantee.rolname,
             'privilege_type', x.prtype,
             'is_grantable', x.grantable
           )
         ),
         '[]'
       ) as privileges
from
  (select pr_c.grantor,
          pr_c.grantee,
          a.attrelid,
          a.attnum,
          a.attname,
          pr_c.relname,
          pr_c.relnamespace,
          pr_c.prtype,
          pr_c.grantable,
          pr_c.relowner
   from
     (select pg_class.oid,
             pg_class.relname,
             pg_class.relnamespace,
             pg_class.relowner,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantor as grantor,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).grantee as grantee,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(pg_class.relacl, acldefault('r', pg_class.relowner)))).is_grantable as is_grantable
      from pg_class
      where (pg_class.relkind = any (array['r',
                                           'v',
                                           'm',
                                           'f',
                                           'p'])) ) pr_c(oid, relname, relnamespace, relowner, grantor, grantee, prtype, grantable),
                                                    pg_attribute a
   where ((a.attrelid = pr_c.oid)
          and (a.attnum > 0)
          and (not a.attisdropped))
   union select pr_a.grantor,
                pr_a.grantee,
                pr_a.attrelid,
                pr_a.attnum,
                pr_a.attname,
                c.relname,
                c.relnamespace,
                pr_a.prtype,
                pr_a.grantable,
                c.relowner
   from
     (select a.attrelid,
             a.attnum,
             a.attname,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantor as grantor,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).grantee as grantee,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).privilege_type as privilege_type,
             (aclexplode(coalesce(a.attacl, acldefault('c', cc.relowner)))).is_grantable as is_grantable
      from (pg_attribute a
            join pg_class cc on ((a.attrelid = cc.oid)))
      where ((a.attnum > 0)
             and (not a.attisdropped))) pr_a(attrelid, attnum, attname, grantor, grantee, prtype, grantable),
                                        pg_class c
   where ((pr_a.attrelid = c.oid)
          and (c.relkind = any (ARRAY['r',
                                      'v',
                                      'm',
                                      'f',
                                      'p'])))) x,
     pg_namespace nc,
     pg_authid u_grantor,
  (select pg_authid.oid,
          pg_authid.rolname
   from pg_authid
   union all select (0)::oid as oid,
                    'PUBLIC') grantee(oid, rolname)
where ((x.relnamespace = nc.oid)
       and (x.grantee = grantee.oid)
       and (x.grantor = u_grantor.oid)
       and (x.prtype = any (ARRAY['INSERT',
                                  'SELECT',
                                  'UPDATE',
                                  'REFERENCES']))
       and (pg_has_role(u_grantor.oid, 'USAGE')
            or pg_has_role(grantee.oid, 'USAGE')
            or (grantee.rolname = 'PUBLIC')))
group by column_id,
         nc.nspname,
         x.relname,
         x.attname
`,eH=a.z.object({grantor:a.z.string(),grantee:a.z.string(),privilege_type:a.z.union([a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("REFERENCES")]),is_grantable:a.z.boolean()}),eq=a.z.object({column_id:a.z.string(),relation_schema:a.z.string(),relation_name:a.z.string(),column_name:a.z.string(),privileges:a.z.array(eH)}),eB=a.z.array(eq);a.z.object({columnId:a.z.string(),grantee:a.z.string(),privilegeType:a.z.union([a.z.literal("ALL"),a.z.literal("SELECT"),a.z.literal("INSERT"),a.z.literal("UPDATE"),a.z.literal("REFERENCES")]),isGrantable:a.z.boolean().optional()}),e.i(967533);var eP=e.i(977540),eW=e.i(332357),eY=e.i(193767),eG=e.i(212695),eJ=e.i(29659);e.s(["Query",()=>eP.Query,"QueryAction",()=>eG.QueryAction,"QueryFilter",()=>eY.QueryFilter,"QueryModifier",()=>eJ.QueryModifier,"countQuery",()=>eW.countQuery,"deleteQuery",()=>eW.deleteQuery,"insertQuery",()=>eW.insertQuery,"selectQuery",()=>eW.selectQuery,"truncateQuery",()=>eW.truncateQuery,"updateQuery",()=>eW.updateQuery],377171);var eQ=e.i(377171);let eV=["idx_users_email","idx_users_created_at_desc","idx_users_last_sign_in_at_desc","idx_users_name","users_phone_key"];e.s(["default",0,{roles:{list:function({includeDefaultRoles:e=!1,limit:n,offset:a}={}){let i=`
with
  roles as (${t})
select
  *
from
  roles
where
  true
`;return e||(i+=" and not pg_catalog.starts_with(name, 'pg_')"),n&&(i+=` limit ${n}`),a&&(i+=` offset ${a}`),{sql:i,zod:r}},retrieve:function(e){return{sql:`with roles as (${t}) select * from roles where ${l(e)};`,zod:o}},create:function({name:e,isSuperuser:t=!1,canCreateDb:a=!1,canCreateRole:i=!1,inheritRole:r=!0,canLogin:o=!1,isReplicationRole:l=!1,canBypassRls:s=!1,connectionLimit:d=-1,password:c,validUntil:m,memberOf:p=[],members:_=[],admins:u=[],config:g={}}){return{sql:`
create role ${(0,n.ident)(e)}
  ${t?"superuser":""}
  ${a?"createdb":""}
  ${i?"createrole":""}
  ${r?"":"noinherit"}
  ${o?"login":""}
  ${l?"replication":""}
  ${s?"bypassrls":""}
  connection limit ${d}
  ${void 0===c?"":`password ${(0,n.literal)(c)}`}
  ${void 0===m?"":`valid until ${(0,n.literal)(m)}`}
  ${0===p.length?"":`in role ${p.map(n.ident).join(",")}`}
  ${0===_.length?"":`role ${_.map(n.ident).join(",")}`}
  ${0===u.length?"":`admin ${u.map(n.ident).join(",")}`}
  ;
${Object.entries(g).map(([t,a])=>`alter role ${(0,n.ident)(e)} set ${(0,n.ident)(t)} = ${(0,n.literal)(a)};`).join("\n")}
`}},update:function(e,a){let{name:i,isSuperuser:r,canCreateDb:o,canCreateRole:s,inheritRole:d,canLogin:c,isReplicationRole:m,canBypassRls:p,connectionLimit:_,password:u,validUntil:g}=a;return{sql:`
do $$
declare
  old record;
begin
  with roles as (${t})
  select * into old from roles where ${l(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('alter role %I
    ${void 0===r?"":r?"superuser":"nosuperuser"}
    ${void 0===o?"":o?"createdb":"nocreatedb"}
    ${void 0===s?"":s?"createrole":"nocreaterole"}
    ${void 0===d?"":d?"inherit":"noinherit"}
    ${void 0===c?"":c?"login":"nologin"}
    ${void 0===m?"":m?"replication":"noreplication"}
    ${void 0===p?"":p?"bypassrls":"nobypassrls"}
    ${void 0===_?"":`connection limit ${_}`}
    ${void 0===u?"":`password ${(0,n.literal)(u)}`}
    ${void 0===g?"":"valid until %L"}
  ', old.name${void 0===g?"":`, ${(0,n.literal)(g)}`}));

  ${void 0===i?"":`
  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if ${(0,n.literal)(i)} != old.name then
    execute(format('alter role %I rename to %I;', old.name, ${(0,n.literal)(i)}));
  end if;
  `}
end
$$;
`}},remove:function(e,{ifExists:n=!1}={}){return{sql:`
do $$
declare
  old record;
begin
  with roles as (${t})
  select * into old from roles where ${l(e)};
  if old is null then
    raise exception 'Cannot find role with id %', id;
  end if;

  execute(format('drop role ${n?"if exists":""} %I;', old.name));
end
$$;
`}},zod:i},columns:{list:function({tableId:e,includeSystemSchemas:t=!1,includedSchemas:a,excludedSchemas:i,limit:r,offset:o}={}){let l=`
with
  columns as (${m})
select
  *
from
  columns
where
 true
`,d=c(a,i,t?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return d&&(l+=` and schema ${d}`),void 0!==e&&(l+=` and table_id = ${(0,n.literal)(e)} `),r&&(l=`${l} limit ${r}`),o&&(l=`${l} offset ${o}`),{sql:l,zod:_}},retrieve:function(e){return{sql:`WITH columns AS (${m}) SELECT * FROM columns WHERE ${function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`schema = ${(0,n.literal)(e.schema)} AND ${(0,n.ident)("table")} = ${(0,n.literal)(e.table)} AND name = ${(0,n.literal)(e.name)}`;throw Error("Must provide either id or schema, name and table")}(e)};`,zod:u}},create:function({schema:e,table:t,name:a,type:i,default_value:r,default_value_format:o="literal",is_identity:l=!1,identity_generation:s="BY DEFAULT",is_nullable:d,is_primary_key:c=!1,is_unique:m=!1,comment:p,check:_}){let u="";if(l){if(void 0!==r)throw Error("Columns cannot both be identity and have a default value");u=`GENERATED ${s} AS IDENTITY`}else void 0===r||(u="expression"===o?`DEFAULT ${r}`:`DEFAULT ${(0,n.literal)(r)}`);let b="";void 0!==d&&(b=d?"NULL":"NOT NULL");let E=void 0===_?"":`CHECK (${_})`,$=void 0===p?"":`COMMENT ON COLUMN ${(0,n.ident)(e)}.${(0,n.ident)(t)}.${(0,n.ident)(a)} IS ${(0,n.literal)(p)}`;return{sql:`
BEGIN;
  ALTER TABLE ${(0,n.ident)(e)}.${(0,n.ident)(t)} ADD COLUMN ${(0,n.ident)(a)} ${g(i)}
    ${u}
    ${b}
    ${c?"PRIMARY KEY":""}
    ${m?"UNIQUE":""}
    ${E};
  ${$};
COMMIT;`}},update:function(e,{name:t,type:a,drop_default:i=!1,default_value:r,default_value_format:o="literal",is_identity:l,identity_generation:s="BY DEFAULT",is_nullable:d,is_unique:c,comment:m,check:p}){let _,u,b=void 0===t||t===e.name?"":`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} RENAME COLUMN ${(0,n.ident)(e.name)} TO ${(0,n.ident)(t)};`,E=void 0===a?"":`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} SET DATA TYPE ${g(a)} USING ${(0,n.ident)(e.name)}::${g(a)};`;if(i)_=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} DROP DEFAULT;`;else if(void 0===r)_="";else{let t="expression"===o?r:(0,n.literal)(r);_=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} SET DEFAULT ${t};`}let $=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)}`;!1===l?$+=" DROP IDENTITY IF EXISTS;":!0===e.is_identity?void 0===s?$="":$+=` SET GENERATED ${s};`:void 0===l?$="":$+=` ADD GENERATED ${s} AS IDENTITY;`,u=void 0===d?"":d?`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} DROP NOT NULL;`:`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ALTER COLUMN ${(0,n.ident)(e.name)} SET NOT NULL;`;let f="";!0===e.is_unique&&!1===c?f=`
DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT conname FROM pg_constraint WHERE
      contype = 'u'
      AND cardinality(conkey) = 1
      AND conrelid = ${(0,n.literal)(e.table_id)}
      AND conkey[1] = ${(0,n.literal)(e.ordinal_position)}
  LOOP
    EXECUTE ${(0,n.literal)(`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} DROP CONSTRAINT `)} || quote_ident(r.conname);
  END LOOP;
END
$$;
`:!1===e.is_unique&&!0===c&&(f=`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ADD UNIQUE (${(0,n.ident)(e.name)});`);let h=void 0===m?"":`COMMENT ON COLUMN ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}.${(0,n.ident)(e.name)} IS ${(0,n.literal)(m)};`,z=void 0===p?"":`
DO $$
DECLARE
  v_conname name;
  v_conkey int2[];
BEGIN
  SELECT conname into v_conname FROM pg_constraint WHERE
    contype = 'c'
    AND cardinality(conkey) = 1
    AND conrelid = ${(0,n.literal)(e.table_id)}
    AND conkey[1] = ${(0,n.literal)(e.ordinal_position)}
    ORDER BY oid asc
    LIMIT 1;

  IF v_conname IS NOT NULL THEN
    EXECUTE format('ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} DROP CONSTRAINT %I', v_conname);
  END IF;

  ${null!==p?`
  ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} ADD CONSTRAINT ${(0,n.ident)(`${e.table}_${e.name}_check`)} CHECK (${p});

  SELECT conkey into v_conkey FROM pg_constraint WHERE conname = ${(0,n.literal)(`${e.table}_${e.name}_check`)};

  ASSERT v_conkey IS NOT NULL, 'error creating column constraint: check condition must refer to this column';
  ASSERT cardinality(v_conkey) = 1, 'error creating column constraint: check condition cannot refer to multiple columns';
  ASSERT v_conkey[1] = ${(0,n.literal)(e.ordinal_position)}, 'error creating column constraint: check condition cannot refer to other columns';
`:""}
END
$$;
`;return{sql:`
BEGIN;
  ${u}
  ${E}
  ${_}
  ${$}
  ${f}
  ${h}
  ${z}
  ${b}
COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:`ALTER TABLE ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)} DROP COLUMN ${(0,n.ident)(e.name)} ${t?"CASCADE":"RESTRICT"};`}},zod:p},schemas:{list:function({includeSystemSchemas:e=!1,limit:t,offset:a}={}){let i=b;return e||(i=`${i} and not (n.nspname in (${s.DEFAULT_SYSTEM_SCHEMAS.map(n.literal).join(",")}))`),t&&(i=`${i} limit ${t}`),a&&(i=`${i} offset ${a}`),{sql:i,zod:$}},retrieve:function({id:e,name:t}){return e?{sql:`${b} and n.oid = ${(0,n.literal)(e)};`,zod:f}:{sql:`${b} and n.nspname = ${(0,n.literal)(t)};`,zod:f}},create:function({name:e,owner:t}){return{sql:`create schema ${(0,n.ident)(e)}
  ${void 0===t?"":`authorization ${(0,n.ident)(t)}`};
`}},update:function({id:e,name:t},{name:a,owner:i}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,n.literal)(t)}::regnamespace`:(0,n.literal)(e)};
  old record;
  new_name text := ${void 0===a?null:(0,n.literal)(a)};
  new_owner text := ${void 0===i?null:(0,n.literal)(i)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  if new_owner is not null then
    execute(format('alter schema %I owner to %I;', old.nspname, new_owner));
  end if;

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.nspname then
    execute(format('alter schema %I rename to %I;', old.nspname, new_name));
  end if;
end
$$;
`}},remove:function({id:e,name:t},{cascade:a=!1}={}){return{sql:`
do $$
declare
  id oid := ${void 0===e?`${(0,n.literal)(t)}::regnamespace`:(0,n.literal)(e)};
  old record;
  cascade bool := ${(0,n.literal)(a)};
begin
  select * into old from pg_namespace where oid = id;
  if old is null then
    raise exception 'Cannot find schema with id %', id;
  end if;

  execute(format('drop schema %I %s;', old.nspname, case when cascade then 'cascade' else 'restrict' end));
end
$$;
`}},zod:E},tables:I,functions:W,tablePrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i}={}){let r=`
with table_privileges as (${Y})
select *
from table_privileges
`,o=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return o&&(r+=` where schema ${o}`),a&&(r+=` limit ${a}`),i&&(r+=` offset ${i}`),{sql:r,zod:J}},retrieve:function({id:e,name:t,schema:a="public"}){return e?{sql:`
with table_privileges as (${Y})
select *
from table_privileges
where table_privileges.relation_id = ${(0,n.literal)(e)};`,zod:Q}:{sql:`
with table_privileges as (${Y})
select *
from table_privileges
where table_privileges.schema = ${(0,n.literal)(a)}
  and table_privileges.name = ${(0,n.literal)(t)}
`,zod:Q}},grant:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:t,grantee:a,isGrantable:i})=>`execute format('grant ${e} on table %s to ${"public"===a.toLowerCase()?"public":(0,n.ident)(a)} ${i?"with grant option":""}', ${t}::regclass);`).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
begin
${e.map(({privilegeType:e,relationId:t,grantee:a})=>`execute format('revoke ${e} on table %s from ${"public"===a.toLowerCase()?"public":(0,n.ident)(a)}', ${t}::regclass);`).join("\n")}
end $$;
`}},zod:G},publications:{list:function({limit:e,offset:n}={}){let t=`with publications as (${V}) select * from publications`;return e&&(t+=` limit ${e}`),n&&(t+=` offset ${n}`),{sql:t,zod:Z}},retrieve:function(e){return{sql:`with publications as (${V}) select * from publications where ${function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)}`;throw Error("Must provide either id or name")}(e)};`,zod:ee}},create:function({name:e,publish_insert:t=!1,publish_update:a=!1,publish_delete:i=!1,publish_truncate:r=!1,tables:o=null}){let l;l=null==o?"FOR ALL TABLES":0===o.length?"":`FOR TABLE ${o.map(e=>{if(!e.includes("."))return(0,n.ident)(e);let[t,...a]=e.split("."),i=a.join(".");return`${(0,n.ident)(t)}.${(0,n.ident)(i)}`}).join(",")}`;let s=[];return t&&s.push("insert"),a&&s.push("update"),i&&s.push("delete"),r&&s.push("truncate"),{sql:`
CREATE PUBLICATION ${(0,n.ident)(e)} ${l}
  WITH (publish = '${s.join(",")}');`}},update:function(e,{name:t,owner:a,publish_insert:i,publish_update:r,publish_delete:o,publish_truncate:l,tables:s}){return{sql:`
do $$
declare
  id oid := ${(0,n.literal)(e)};
  old record;
  new_name text := ${void 0===t?null:(0,n.literal)(t)};
  new_owner text := ${void 0===a?null:(0,n.literal)(a)};
  new_publish_insert bool := ${i??null};
  new_publish_update bool := ${r??null};
  new_publish_delete bool := ${o??null};
  new_publish_truncate bool := ${l??null};
  new_tables text := ${void 0===s?null:(0,n.literal)(null===s?"all tables":s.map(e=>{if(!e.includes("."))return(0,n.ident)(e);let[t,...a]=e.split("."),i=a.join(".");return`${(0,n.ident)(t)}.${(0,n.ident)(i)}`}).join(","))};
begin
  select * into old from pg_publication where oid = id;
  if old is null then
    raise exception 'Cannot find publication with id %', id;
  end if;

  if new_tables is null then
    null;
  elsif new_tables = 'all tables' then
    if old.puballtables then
      null;
    else
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I for all tables;', old.pubname));
    end if;
  else
    if old.puballtables then
      -- Need to recreate because going from list of tables <-> all tables with alter is not possible.
      execute(format('drop publication %1$I; create publication %1$I;', old.pubname));
    elsif exists(select from pg_publication_rel where prpubid = id) then
      execute(
        format(
          'alter publication %I drop table %s',
          old.pubname,
          (select string_agg(prrelid::regclass::text, ', ') from pg_publication_rel where prpubid = id)
        )
      );
    end if;

    -- At this point the publication must have no tables.

    if new_tables != '' then
      execute(format('alter publication %I add table %s', old.pubname, new_tables));
    end if;
  end if;

  execute(
    format(
      'alter publication %I set (publish = %L);',
      old.pubname,
      concat_ws(
        ', ',
        case when coalesce(new_publish_insert, old.pubinsert) then 'insert' end,
        case when coalesce(new_publish_update, old.pubupdate) then 'update' end,
        case when coalesce(new_publish_delete, old.pubdelete) then 'delete' end,
        case when coalesce(new_publish_truncate, old.pubtruncate) then 'truncate' end
      )
    )
  );

  execute(format('alter publication %I owner to %I;', old.pubname, coalesce(new_owner, old.pubowner::regrole::name)));

  -- Using the same name in the rename clause gives an error, so only do it if the new name is different.
  if new_name is not null and new_name != old.pubname then
    execute(format('alter publication %I rename to %I;', old.pubname, coalesce(new_name, old.pubname)));
  end if;

  -- We need to retrieve the publication later, so we need a way to uniquely identify which publication this is.
  -- We can't rely on id because it gets changed if it got recreated.
  -- We use a temp table to store the unique name - DO blocks can't return a value.
  create temp table pg_meta_publication_tmp (name) on commit drop as values (coalesce(new_name, old.pubname));
end $$;
`}},remove:function(e){return{sql:`DROP PUBLICATION IF EXISTS ${(0,n.ident)(e.name)};`}},zod:K},extensions:{list:function({limit:e,offset:n}={}){let t=en;return e&&(t=`${t} LIMIT ${e}`),n&&(t=`${t} OFFSET ${n}`),{sql:t,zod:ea}},retrieve:function({name:e}){return{sql:`${en} WHERE name = ${(0,n.literal)(e)};`,zod:ei}},create:function({name:e,schema:t,version:a,cascade:i=!1}){return{sql:`
CREATE EXTENSION ${(0,n.ident)(e)}
  ${void 0===t?"":`SCHEMA ${(0,n.ident)(t)}`}
  ${void 0===a?"":`VERSION ${(0,n.literal)(a)}`}
  ${i?"CASCADE":""};`}},update:function(e,{update:t=!1,version:a,schema:i}){let r="";t&&(r=`ALTER EXTENSION ${(0,n.ident)(e)} UPDATE ${void 0===a?"":`TO ${(0,n.literal)(a)}`};`);let o=void 0===i?"":`ALTER EXTENSION ${(0,n.ident)(e)} SET SCHEMA ${(0,n.ident)(i)};`;return{sql:`BEGIN; ${r} ${o} COMMIT;`}},remove:function(e,{cascade:t=!1}={}){return{sql:`DROP EXTENSION ${(0,n.ident)(e)} ${t?"CASCADE":"RESTRICT"};`}},zod:et},config:{list:function({limit:e,offset:n}={}){let t=er;return e&&(t+=` LIMIT ${e}`),n&&(t+=` OFFSET ${n}`),{sql:t,zod:el}},zod:eo},materializedViews:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i,includeColumns:r=!0}={}){let o=ep({includeColumns:r}),l=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return l&&(o+=` where schema ${l}`),a&&(o+=` limit ${a}`),i&&(o+=` offset ${i}`),{sql:o,zod:ec}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${ep({includeColumns:!0})} where ${t};`,zod:em}},zod:ed},foreignTables:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i,includeColumns:r=!0}={}){let o=eE({includeColumns:r}),l=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return l&&(o+=` where schema ${l}`),a&&(o+=` limit ${a}`),i&&(o+=` offset ${i}`),{sql:o,zod:eg}},retrieve:function(e){return{sql:`${eE({includeColumns:!0})} where ${function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e)};`,zod:eb}},zod:eu},views:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i,includeColumns:r=!0}={}){let o=eA({includeColumns:r}),l=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return l&&(o+=` where schema ${l}`),a&&(o+=` limit ${a}`),i&&(o+=` offset ${i}`),{sql:o,zod:eh}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)}`;throw Error("Must provide either id or name and schema")}(e);return{sql:`${eA({includeColumns:!0})} where ${t};`,zod:ez}},zod:ef},policies:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i}={}){let r=`
    with policies as (${ey})
    select *
    from policies
    `,o=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return o&&(r+=`where schema ${o}`),a&&(r+=` limit ${a}`),i&&(r+=` offset ${i}`),{sql:r,zod:eT}},retrieve:function(e){return{sql:`with policies as (${ey}) select * from policies where ${function(e){if("id"in e&&e.id)return`id = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.schema&&e.table)return`name = ${(0,n.literal)(e.name)} AND schema = ${(0,n.literal)(e.schema)} AND table = ${(0,n.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e)};`,zod:eN}},create:function({name:e,schema:t="public",table:a,definition:i,check:r,action:o="PERMISSIVE",command:l="ALL",roles:s=["public"]}){return{sql:`
create policy ${(0,n.ident)(e)} on ${(0,n.ident)(t)}.${(0,n.ident)(a)}
  as ${o}
  for ${l}
  to ${s.map(n.ident).join(",")}
  ${i?`using (${i})`:""}
  ${r?`with check (${r})`:""};`}},update:function(e,t){let{name:a,definition:i,check:r,roles:o}=t,l=`ALTER POLICY ${(0,n.ident)(e.name)} ON ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}`,s=void 0===a?"":`${l} RENAME TO ${(0,n.ident)(a)};`,d=void 0===i?"":`${l} USING (${i});`,c=void 0===r?"":`${l} WITH CHECK (${r});`,m=void 0===o?"":`${l} TO ${o.map(n.ident).join(",")};`;return{sql:`BEGIN; ${d} ${c} ${m} ${s} COMMIT;`}},remove:function(e){return{sql:`DROP POLICY ${(0,n.ident)(e.name)} ON ${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)};`}},zod:eS},triggers:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i}={}){let r=`with triggers as (${ev}) select * from triggers`,o=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return o&&(r+=` where schema ${o}`),a&&(r+=` limit ${a}`),i&&(r+=` offset ${i}`),{sql:r,zod:eL}},retrieve:function(e){let t=function(e){if("id"in e&&e.id)return`${(0,n.ident)("id")} = ${(0,n.literal)(e.id)}`;if("name"in e&&e.name&&e.table&&e.schema)return`${(0,n.ident)("name")} = ${(0,n.literal)(e.name)} and ${(0,n.ident)("schema")} = ${(0,n.literal)(e.schema)} and ${(0,n.ident)("table")} = ${(0,n.literal)(e.table)}`;throw Error("Must provide either id or name, schema and table")}(e);return{sql:`with triggers as (${ev}) select * from triggers where ${t};`,zod:eR}},create:function({name:e,schema:t="public",table:i,function_schema:r="public",function_name:o,function_args:l=[],activation:s,events:d,orientation:c,condition:m}){let p=`${(0,n.ident)(t)}.${(0,n.ident)(i)}`,_=`${(0,n.ident)(r)}.${(0,n.ident)(o)}`,u=d.join(" or "),g=c?`for each ${c}`:"",b=m?`when (${m})`:"",E=l.map(n.literal).join(",");return{sql:`create trigger ${(0,n.ident)(e)} ${s} ${u} on ${p} ${g} ${b} execute function ${_}(${E});`,zod:a.z.void()}},update:function(e,t){let i=`${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}`,r="";switch(t.enabled_mode){case"ORIGIN":r=`alter table ${i} enable trigger ${(0,n.ident)(e.name)};`;break;case"DISABLED":r=`alter table ${i} disable trigger ${(0,n.ident)(e.name)};`;break;case"REPLICA":case"ALWAYS":r=`alter table ${i} enable ${t.enabled_mode} trigger ${(0,n.ident)(e.name)};`}let o=t.name&&t.name!==e.name?`alter trigger ${(0,n.ident)(e.name)} on ${i} rename to ${(0,n.ident)(t.name)};`:"";return{sql:`begin; ${r}; ${o}; commit;`,zod:a.z.void()}},remove:function(e,{cascade:t=!1}={}){let i=`${(0,n.ident)(e.schema)}.${(0,n.ident)(e.table)}`;return{sql:`drop trigger ${(0,n.ident)(e.name)} on ${i} ${t?"cascade":""};`,zod:a.z.void()}},zod:ew},types:{list:function({includeArrayTypes:e=!1,includeSystemSchemas:n=!1,includedSchemas:t,excludedSchemas:a,limit:i,offset:r}={}){let o=eI;e||(o+=` and not exists (
      select from pg_type el
      where el.oid = t.typelem
        and el.typarray = t.oid
    )`);let l=c(t,a,n?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return l&&(o+=` and n.nspname ${l}`),i&&(o+=` limit ${i}`),r&&(o+=` offset ${r}`),{sql:o,zod:eC}},zod:eO},version:{retrieve:function(){return{sql:ex,zod:eD}},zod:eD},indexes:{list:function({includeSystemSchemas:e=!1,includedSchemas:n,excludedSchemas:t,limit:a,offset:i}={}){let r=`
    with indexes as (${ej})
    select *
    from indexes
  `,o=c(n,t,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return o&&(r+=` where schema ${o}`),a&&(r+=` limit ${a}`),i&&(r+=` offset ${i}`),{sql:r,zod:eU}},retrieve:function({id:e}){return{sql:`
    with indexes as (${ej})
    select *
    from indexes
    where id = ${(0,n.literal)(e)};
  `,zod:eF}},zod:eM},columnPrivileges:{list:function({includeSystemSchemas:e=!1,includedSchemas:t,excludedSchemas:a,columnIds:i,limit:r,offset:o}={}){let l=`
  with column_privileges as (${ek})
  select *
  from column_privileges
  `,d=[],m=c(t,a,e?void 0:s.DEFAULT_SYSTEM_SCHEMAS);return m&&d.push(`relation_schema ${m}`),i?.length&&d.push(`column_id in (${i.map(n.literal).join(",")})`),d.length>0&&(l+=` where ${d.join(" and ")}`),r&&(l+=` limit ${r}`),o&&(l+=` offset ${o}`),{sql:l,zod:eB}},grant:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:t,grantee:a,isGrantable:i})=>{let[r,o]=t.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,n.literal)(r)}
  and a.attnum = ${(0,n.literal)(o)}
into col;
execute format(
  'grant ${e} (%I) on %s to ${"public"===a.toLowerCase()?"public":(0,n.ident)(a)} ${i?"with grant option":""}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},revoke:function(e){return{sql:`
do $$
declare
  col record;
begin
${e.map(({privilegeType:e,columnId:t,grantee:a})=>{let[i,r]=t.split(".");return`
select *
from pg_attribute a
where a.attrelid = ${(0,n.literal)(i)}
  and a.attnum = ${(0,n.literal)(r)}
into col;
execute format(
  'revoke ${e} (%I) on %s from ${"public"===a.toLowerCase()?"public":(0,n.ident)(a)}',
  col.attname,
  col.attrelid::regclass
);`}).join("\n")}
end $$;
`}},zod:eq},query:eQ,getIndexWorkerStatusSQL:()=>`SELECT EXISTS (
    SELECT 1 FROM pg_locks
    WHERE locktype = 'advisory'
    AND (classid::bigint << 32 | objid::bigint) = hashtext('auth_index_worker')::bigint
  ) as is_in_progress;`,getIndexStatusesSQL:()=>`SELECT c.relname as index_name, i.indisvalid as is_valid, i.indisready as is_ready
    FROM pg_index i
    JOIN pg_class c ON c.oid = i.indexrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'auth'
    AND c.relname IN (${eV.map(n.literal).join(", ")});`,USER_SEARCH_INDEXES:eV}],755216)}]);

//# debugId=d949c2bd-8bcc-6468-0738-5b4e1eb24ff5
//# sourceMappingURL=5368bbe4cf3cc5e9.js.map