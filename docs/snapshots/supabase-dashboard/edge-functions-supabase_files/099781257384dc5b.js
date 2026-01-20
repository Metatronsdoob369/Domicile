;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="b1b8a016-cdc3-64e3-4abf-d604b3ce4ad1")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,479232,860990,e=>{"use strict";let t=(0,e.i(388019).default)("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);e.s(["default",()=>t],860990),e.s(["Plus",()=>t],479232)},667042,900114,e=>{"use strict";let t=(0,e.i(388019).default)("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);e.s(["default",()=>t],900114),e.s(["Database",()=>t],667042)},667286,e=>{"use strict";e.s(["databaseExtensionsKeys",0,{list:e=>["projects",e,"database-extensions"]}])},246230,e=>{"use strict";e.s(["databaseKeys",0,{schemas:e=>["projects",e,"schemas"],keywords:e=>["projects",e,"keywords"],migrations:e=>["projects",e,"migrations"],tableColumns:(e,t,a)=>["projects",e,"table-columns",t,a],databaseFunctions:e=>["projects",e,"database-functions"],entityDefinition:(e,t)=>["projects",e,"entity-definition",t],entityDefinitions:(e,t)=>["projects",e,"entity-definitions",t],tableDefinition:(e,t)=>["projects",e,"table-definition",t],viewDefinition:(e,t)=>["projects",e,"view-definition",t],backups:e=>["projects",e,"database","backups"],poolingConfiguration:e=>["projects",e,"database","pooling-configuration"],indexesFromQuery:(e,t)=>["projects",e,"indexes",{query:t}],indexAdvisorFromQuery:(e,t)=>["projects",e,"index-advisor",{query:t}],tableConstraints:(e,t)=>["projects",e,"table-constraints",t],foreignKeyConstraints:(e,t)=>["projects",e,"foreign-key-constraints",t],databaseSize:e=>["projects",e,"database-size"],maxConnections:e=>["projects",e,"max-connections"],pgbouncerStatus:e=>["projects",e,"pgbouncer","status"],pgbouncerConfig:e=>["projects",e,"pgbouncer","config"],checkPrimaryKeysExists:(e,t)=>["projects",e,"check-primary-keys",t],tableIndexAdvisor:(e,t,a)=>["projects",e,"table-index-advisor",t,a]}])},627069,e=>{"use strict";var t=e.i(478902),a=e.i(389959),r=e.i(843778);let n=a.forwardRef(({className:e,...a},n)=>(0,t.jsx)("div",{ref:n,className:(0,r.cn)("overflow-hidden rounded-lg border bg-surface-100 text-card-foreground shadow-sm",e),...a}));n.displayName="Card";let i=a.forwardRef(({className:e,...a},n)=>(0,t.jsx)("div",{ref:n,className:(0,r.cn)("flex flex-col space-y-1.5 py-4 px-[var(--card-padding-x)] border-b",e),...a}));i.displayName="CardHeader";let o=a.forwardRef(({className:e,...a},n)=>(0,t.jsx)("h3",{ref:n,className:(0,r.cn)("text-xs font-mono uppercase",e),...a}));o.displayName="CardTitle";let l=a.forwardRef(({className:e,...a},n)=>(0,t.jsx)("p",{ref:n,className:(0,r.cn)("text-sm text-foreground-lighter",e),...a}));l.displayName="CardDescription";let s=a.forwardRef(({className:e,...a},n)=>(0,t.jsx)("div",{ref:n,className:(0,r.cn)("py-4 px-[var(--card-padding-x)] border-b last:border-none",e),...a}));s.displayName="CardContent";let d=a.forwardRef(({className:e,...a},n)=>(0,t.jsx)("div",{ref:n,className:(0,r.cn)("flex items-center py-4 px-[var(--card-padding-x)]",e),...a}));d.displayName="CardFooter",e.s(["Card",()=>n,"CardContent",()=>s,"CardDescription",()=>l,"CardFooter",()=>d,"CardHeader",()=>i,"CardTitle",()=>o])},365257,e=>{"use strict";let t=(0,e.i(388019).default)("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]);e.s(["ChevronsUpDown",()=>t],365257)},177948,722639,749844,e=>{"use strict";var t=e.i(388019);let a=(0,t.default)("ArrowDown",[["path",{d:"M12 5v14",key:"s699le"}],["path",{d:"m19 12-7 7-7-7",key:"1idqje"}]]);e.s(["default",()=>a],722639),e.s(["ArrowDown",()=>a],177948);let r=(0,t.default)("ArrowUp",[["path",{d:"m5 12 7-7 7 7",key:"hav0vg"}],["path",{d:"M12 19V5",key:"x0mq9r"}]]);e.s(["ArrowUp",()=>r],749844)},679367,e=>{"use strict";var t=e.i(478902),a=e.i(389959),r=e.i(843778);let n=a.forwardRef(({className:e,containerClassName:n,children:i,stickyLastColumn:o,outerContainerRef:l,...s},d)=>{let p=a.useRef(null),{hasHorizontalScroll:m,canScrollLeft:c,canScrollRight:u}=(e=>{let[t,r]=a.useState(!1),[n,i]=a.useState(!1),[o,l]=a.useState(!1);return a.useEffect(()=>{let a=e.current;if(!a)return;let n=()=>{let e=a.scrollWidth>a.clientWidth;if(r(e),e){let e=a.scrollLeft>0,t=a.scrollLeft<a.scrollWidth-a.clientWidth;i(e),l(t)}else i(!1),l(!1)},o=()=>{if(t){let e=a.scrollLeft>0,t=a.scrollLeft<a.scrollWidth-a.clientWidth;i(e),l(t)}};return n(),a.addEventListener("scroll",o),window.addEventListener("resize",n),()=>{a.removeEventListener("scroll",o),window.removeEventListener("resize",n)}},[e,t]),{hasHorizontalScroll:t,canScrollLeft:n,canScrollRight:o}})(p),b=(0,r.cn)("[&_td:last-child]:before:absolute [&_td:last-child]:before:top-0 [&_td:last-child]:before:-left-6","[&_td:last-child]:before:bottom-0 [&_td:last-child]:before:w-6 [&_td:last-child]:before:bg-gradient-to-l","[&_td:last-child]:before:from-black/5 dark:[&_td:last-child]:before:from-black/20 [&_td:last-child]:before:to-transparent","[&_td:last-child]:before:opacity-0 [&_td:last-child]:before:transition-all [&_td:last-child]:before:duration-400","[&_td:last-child]:before:easing-[0.24, 0.25, 0.05, 1] [&_td:last-child]:before:z-[39]","[&_th:last-child]:before:absolute [&_th:last-child]:before:top-0 [&_th:last-child]:before:-left-6","[&_th:last-child]:before:bottom-0 [&_th:last-child]:before:w-6 [&_th:last-child]:before:bg-gradient-to-l","[&_th:last-child]:before:from-black/5 dark:[&_th:last-child]:before:from-black/20 [&_th:last-child]:before:to-transparent","[&_th:last-child]:before:opacity-0 [&_th:last-child]:before:transition-all [&_th:last-child]:before:duration-400","[&_th:last-child]:before:easing-[0.24, 0.25, 0.05, 1] [&_th:last-child]:before:z-[39]");return(0,t.jsxs)("div",{ref:l,className:(0,r.cn)(n,"relative"),children:[(0,t.jsx)("div",{className:(0,r.cn)("absolute inset-0 pointer-events-none z-[38]","before:absolute before:top-0 before:right-0 before:bottom-0 before:w-6 before:bg-gradient-to-l before:from-black/5 dark:before:from-black/20 before:to-transparent before:opacity-0 before:transition-all before:duration-400 before:easing-[0.24, 0.25, 0.05, 1]","after:absolute after:top-0 after:left-0 after:bottom-0 after:w-6 after:bg-gradient-to-r after:from-black/5 dark:after:from-black/20 after:to-transparent after:opacity-0 after:transition-all after:duration-400 after:easing-[0.24, 0.25, 0.05, 1]",m&&"hover:before:opacity-100 hover:after:opacity-100",u&&"before:opacity-100",c&&"after:opacity-100")}),(0,t.jsx)("div",{ref:p,className:(0,r.cn)("w-full overflow-auto",o&&["[&_tr>*:last-child]:sticky [&_tr>*:last-child]:z-[38] [&_tr>*:last-child]:right-0","[&_tr:hover>*:last-child]:bg-transparent","[&_th>*:last-child]:bg-surface-100",b],m&&"[&_tr:hover>td:last-child]:!bg-surface-200",u&&"[&_td]:before:opacity-100 [&_tr>*:last-child]:before:opacity-100 [&_th:last-child]:before:opacity-100",e),...s,children:i})]})});n.displayName="ShadowScrollArea",e.s(["ShadowScrollArea",()=>n],679367)},492418,e=>{"use strict";var t=e.i(478902),a=e.i(177948),r=e.i(749844),n=e.i(365257),i=e.i(389959),o=e.i(843778),l=e.i(679367);let s=i.forwardRef(({className:e,containerProps:a,...r},n)=>(0,t.jsx)(l.ShadowScrollArea,{...a,children:(0,t.jsx)("table",{ref:n,className:(0,o.cn)("group/table w-full caption-bottom text-sm",e),...r})}));s.displayName="Table";let d=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("thead",{ref:r,className:(0,o.cn)("[&_tr]:border-b [&>tr]:bg-200",e),...a}));d.displayName="TableHeader";let p=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("tbody",{ref:r,className:(0,o.cn)("[&_tr:last-child]:border-0",e),...a}));p.displayName="TableBody";let m=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("tfoot",{ref:r,className:(0,o.cn)("border-t font-medium",e),...a}));m.displayName="TableFooter";let c=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("tr",{ref:r,className:(0,o.cn)("border-b [&>td]:hover:bg-surface-200 data-[state=selected]:bg-muted",e),...a}));c.displayName="TableRow";let u=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("th",{ref:r,className:(0,o.cn)("h-10 px-4 text-left align-middle heading-meta whitespace-nowrap text-foreground-lighter [&:has([role=checkbox])]:pr-0","transition-colors",e),...a}));function b({column:e,currentSort:i,onSortChange:l,children:s,className:d}){let p,[m,c]=i.split(":"),u=m===e;return(0,t.jsxs)("button",{type:"button",className:(0,o.cn)("group/table-head-sort heading-meta whitespace-nowrap flex items-center gap-1 cursor-pointer select-none !bg-transparent border-none p-0 w-full text-left",d),onClick:()=>l(e),children:[s,(0,t.jsx)("div",{className:"w-3 h-3 relative overflow-hidden",children:(p="w-3 h-3 absolute inset-0",(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.ArrowUp,{className:(0,o.cn)(p,"transition-transform",u&&"asc"===c?"translate-y-0":"translate-y-full")}),(0,t.jsx)(a.ArrowDown,{className:(0,o.cn)(p,"transition-transform",u&&"desc"===c?"translate-y-0":"-translate-y-full")}),(0,t.jsx)(n.ChevronsUpDown,{className:(0,o.cn)(p,"transition-opacity opacity-80 md:opacity-40",u?"!opacity-0":"group-hover/table-head-sort:opacity-80")})]}))})]})}u.displayName="TableHead",b.displayName="TableHeadSort";let y=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("td",{ref:r,className:(0,o.cn)("transition-colors p-4 align-middle [&:has([role=checkbox])]:pr-0",e),...a}));y.displayName="TableCell";let f=i.forwardRef(({className:e,...a},r)=>(0,t.jsx)("caption",{ref:r,className:(0,o.cn)("border-t","p-4 text-sm text-foreground-muted",e),...a}));f.displayName="TableCaption",e.s(["Table",()=>s,"TableBody",()=>p,"TableCaption",()=>f,"TableCell",()=>y,"TableFooter",()=>m,"TableHead",()=>u,"TableHeadSort",()=>b,"TableHeader",()=>d,"TableRow",()=>c])},108151,e=>{"use strict";var t=e.i(478902),a=e.i(389959),r=e.i(627069),n=e.i(843778),i=e.i(492418);let o=(0,a.forwardRef)(({className:e,style:a,delayIndex:r=0,animationDelay:i=150},o)=>(0,t.jsx)("div",{ref:o,className:(0,n.cn)("shimmering-loader rounded py-3",e),style:{...a,animationFillMode:"backwards",animationDelay:`${r*i}ms`}}));o.displayName="ShimmeringLoader",e.s(["GenericSkeletonLoader",0,({className:e})=>(0,t.jsxs)("div",{className:(0,n.cn)(e,"space-y-2"),children:[(0,t.jsx)(o,{}),(0,t.jsx)(o,{className:"w-3/4"}),(0,t.jsx)(o,{className:"w-1/2"})]}),"GenericTableLoader",0,({headers:e=[],numRows:a=3})=>(0,t.jsx)(r.Card,{children:(0,t.jsxs)(i.Table,{children:[(0,t.jsx)(i.TableHeader,{children:(0,t.jsx)(i.TableRow,{children:0===e.length?(0,t.jsx)(i.TableHead,{}):e.map((e,a)=>(0,t.jsx)(i.TableHead,{children:e},`${e}_${a}`))})}),(0,t.jsx)(i.TableBody,{children:Array(a).fill(0).map((a,r)=>(0,t.jsx)(i.TableRow,{children:(0,t.jsx)(i.TableCell,{colSpan:e.length,children:(0,t.jsx)(o,{})})},`row_${r}`))})]})}),"ShimmeringLoader",0,o,"default",0,o])},816467,e=>{"use strict";let t=(0,e.i(388019).default)("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);e.s(["Copy",()=>t],816467)},938933,305551,e=>{"use strict";var t=e.i(389959);let a={bg:{brand:{primary:"bg-purple-600",secondary:"bg-purple-200"}},text:{brand:"text-purple-600",body:"text-foreground-light",title:"text-foreground"},border:{brand:"border-brand-600",primary:"border-default",secondary:"border-secondary",alternative:"border-alternative"},placeholder:"placeholder-foreground-muted",focus:`
    outline-none
    focus:ring-current focus:ring-2
  `,"focus-visible":`
    outline-none
    transition-all
    outline-0
    focus-visible:outline-4
    focus-visible:outline-offset-1
  `,size:{text:{tiny:"text-xs",small:"text-sm leading-4",medium:"text-sm",large:"text-base",xlarge:"text-base"},padding:{tiny:"px-2.5 py-1",small:"px-3 py-2",medium:"px-4 py-2",large:"px-4 py-2",xlarge:"px-6 py-3"}},overlay:{base:"absolute inset-0 bg-background opacity-50",container:"fixed inset-0 transition-opacity"}},r={tiny:`${a.size.text.tiny} ${a.size.padding.tiny}`,small:`${a.size.text.small} ${a.size.padding.small}`,medium:`${a.size.text.medium} ${a.size.padding.medium}`,large:`${a.size.text.large} ${a.size.padding.large}`,xlarge:`${a.size.text.xlarge} ${a.size.padding.xlarge}`},n={tiny:"pl-7",small:"pl-8",medium:"pl-8",large:"pl-10",xlarge:"pl-11"},i={accordion:{variants:{default:{base:`
          flex flex-col
          space-y-3
        `,container:`
          group
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
          overflow-hidden
          will-change-transform
        `,trigger:`
          flex flex-row
          gap-3
          items-center
          w-full
          text-left
          cursor-pointer

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light
        `,content:`
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,panel:`
          py-3
        `},bordered:{base:`
          flex flex-col
          -space-y-px
        `,container:`
          group
          border
          border-default

          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,trigger:`
          flex flex-row
          items-center
          px-6 py-4
          w-full
          text-left
          cursor-pointer

          font-medium
          text-base
          bg-transparent

          outline-none
          focus-visible:ring-1
          focus-visible:z-10
          ring-foreground-light

          transition-colors
          hover:bg-background

          overflow-hidden

          group-first:rounded-tl-md group-first:rounded-tr-md
          group-last:rounded-bl-md group-last:rounded-br-md
        `,content:`
          data-open:animate-slide-down
          data-closed:animate-slide-up
        `,panel:`
          px-6 py-3
          border-t border-strong
          bg-background
        `}},justified:"justify-between",chevron:{base:`
        text-foreground-lighter
        rotate-0
        group-state-open:rotate-180
        group-data-[state=open]:rotate-180
        ease-&lsqb;cubic-bezier(0.87,_0,_0.13,_1)&rsqb;
        transition-transform duration-300
        duration-200
      `,align:{left:"order-first",right:"order-last"}},animate:{enter:"transition-max-height ease-in-out duration-700 overflow-hidden",enterFrom:"max-h-0",enterTo:"max-h-screen",leave:"transition-max-height ease-in-out duration-300 overflow-hidden",leaveFrom:"max-h-screen",leaveTo:"max-h-0"}},badge:{base:"inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-normal bg-opacity-10",size:{large:"px-3 py-0.5 rounded-full text-sm"},dot:"-ml-0.5 mr-1.5 h-2 w-2 rounded-full",color:{brand:"bg-brand-500 text-brand-600 border border-brand-500",brandAlt:"bg-brand bg-opacity-100 text-background border border-brand",scale:"bg-background text-foreground-light border border-strong",tomato:"bg-tomato-200 text-tomato-1100 border border-tomato-700",red:"bg-red-200 text-red-1100 border border-red-700",crimson:"bg-crimson-200 text-crimson-1100 border border-crimson-700",pink:"bg-pink-200 text-pink-1100 border border-pink-700",purple:"bg-purple-200 text-purple-1100 border border-purple-700",violet:"bg-violet-200 text-violet-1100 border border-violet-700",indigo:"bg-indigo-200 text-indigo-1100 border border-indigo-700",blue:"bg-blue-200 text-blue-1100 border border-blue-700",green:"bg-opacity-10 bg-brand-500 text-brand-600 border border-brand-500",grass:"bg-grass-200 text-grass-1100 border border-grass-700",orange:"bg-orange-200 text-orange-1100 border border-orange-700",yellow:"bg-yellow-200 text-yellow-1100 border border-yellow-700",amber:"bg-amber-200 text-amber-1100 border border-amber-700",gold:"bg-gold-200 text-gold-1100 border border-gold-700",gray:"bg-200 text-gray-1100 border border-gray-700",slate:"bg-slate-200 text-slate-1100 border border-slate-700"}},alert:{base:`
      relative rounded-md border py-4 px-6
      flex space-x-4 items-start
    `,header:"block text-sm font-normal mb-1",description:"text-xs",variant:{danger:{base:"bg-red-200 text-red-1200 border-red-700",icon:"text-red-900",header:"text-red-1200",description:"text-red-1100"},warning:{base:"bg-amber-200 border-amber-700",icon:"text-amber-900",header:"text-amber-1200",description:"text-amber-1100"},info:{base:"bg-alternative border",icon:"text-foreground-lighter",header:"text-foreground",description:"text-foreground-light"},success:{base:"bg-brand-300 border-brand-400",icon:"text-brand",header:"text-brand-600",description:"text-brand-600"},neutral:{base:"bg-surface-100 border-default",icon:"text-foreground-muted",header:"text-foreground",description:"text-foreground-light"}},close:`
      absolute
      right-6 top-4
      p-0 m-0
      text-foreground-muted
      cursor-pointer transition ease-in-out
      bg-transparent border-transparent focus:outline-none
      opacity-50 hover:opacity-100`},card:{base:`
      bg-surface-100

      border
      ${a.border.primary}

      flex flex-col
      rounded-md shadow-lg overflow-hidden relative
    `,hoverable:"transition hover:-translate-y-1 hover:shadow-2xl",head:`px-8 py-6 flex justify-between
    border-b
      ${a.border.primary} `,content:"p-8"},tabs:{base:"w-full justify-between space-y-4",underlined:{list:`
        flex items-center border-b
        ${a.border.secondary}
        `,base:`
        relative
        cursor-pointer
        text-foreground-lighter
        flex
        items-center
        space-x-2
        text-center
        transition
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
      `,inactive:`
        hover:text-foreground
      `,active:`
        !text-foreground
        border-b-2 border-foreground
      `},pills:{list:"flex space-x-1",base:`
        relative
        cursor-pointer
        flex
        items-center
        space-x-2
        text-center
        transition
        shadow-sm
        rounded
        border
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
        `,inactive:`
        bg-background
        border-strong hover:border-foreground-muted
        text-foreground-muted hover:text-foreground
      `,active:`
        bg-selection
        text-foreground
        border-stronger
      `},"rounded-pills":{list:"flex flex-wrap gap-2",base:`
        relative
        cursor-pointer
        flex
        items-center
        space-x-2
        text-center
        transition
        shadow-sm
        rounded-full
        focus:outline-none
        focus-visible:ring
        focus-visible:ring-foreground-muted
        focus-visible:border-foreground-muted
        `,inactive:`
        bg-surface-200 hover:bg-surface-300
        hover:border-foreground-lighter
        text-foreground-lighter hover:text-foreground
      `,active:`
        bg-foreground
        text-background
        border-foreground
      `},block:"w-full flex items-center justify-center",size:{...r},scrollable:"overflow-auto whitespace-nowrap no-scrollbar mask-fadeout-right",wrappable:"flex-wrap",content:"focus:outline-none transition-height"},input:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${a.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${a.placeholder}
      group
    `,variants:{standard:`
        bg-foreground/[.026]
        border border-control
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},container:"relative",with_icon:n,size:{...r},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center",textarea_actions_container:"absolute inset-y-1.5 right-0 pl-3 pr-1 flex space-x-1 items-start",textarea_actions_container_items:"flex items-center"},select:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${a.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${a.placeholder}

      appearance-none
      bg-none
    `,variants:{standard:`
        bg-background
        border border-strong
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},container:"relative",with_icon:n,size:{...r},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 mr-5 flex items-center",chevron_container:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",chevron:"h-5 w-5 text-foreground-lighter"},inputNumber:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      transition-all
      text-foreground
      border
      focus-visible:shadow-md
      ${a.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${a.placeholder}

      appearance-none
      bg-none
    `,variants:{standard:`
        bg-control
        border border-strong
      `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},disabled:"opacity-50",container:"relative",with_icon:n,size:{...r},actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center"},checkbox:{base:`
      bg-transparent
      ${a.focus}
      focus:ring-border-muted
      text-brand
      border-strong
      shadow-sm
      rounded
      cursor-pointer
    `,container:"flex cursor-pointer leading-none",size:{tiny:"h-3 w-3 mt-1 mr-3",small:"h-3.5 w-3.5 mt-0.5 mr-3.5",medium:"h-4 w-4 mt-0.5 mr-3.5",large:"h-5 w-5 mt-0.5 mr-4",xlarge:"h-5 w-5 mt-0.5 mr-4"},disabled:"opacity-50",label:{base:"text-foreground-light cursor-pointer",...a.size.text},label_before:{base:"text-border",...a.size.text},label_after:{base:"text-border",...a.size.text},description:{base:"text-foreground-lighter",...a.size.text},group:"space-y-3"},radio:{base:`
      absolute
      ${a.focus}
      focus:ring-brand-400
      border-strong

      text-brand
      shadow-sm
      cursor-pointer
      peer

      bg-surface-100
    `,hidden:"absolute opacity-0",size:{tiny:"h-3 w-3",small:"h-3.5 w-3.5",medium:"h-4 w-4",large:"h-5 w-5",xlarge:"h-5 w-5"},variants:{cards:{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"-space-y-px shadow-sm",base:`
          transition
          border
          first:rounded-tl-md first:rounded-tr-md
          last:rounded-bl-md last:rounded-br-md
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger
          border-1
        `,radio_offset:"left-4"},"stacked-cards":{container:{base:"relative cursor-pointer flex items-center justify-between",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"space-y-3",base:`
          transition
          rounded-md
          border
          shadow-sm
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger
          border-1
        `,radio_offset:"left-4"},"small-cards":{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1 items-center justify-center",horizontal:"flex flex-row space-x-2"}},group:"flex flex-row gap-3",base:`
          transition
          border
          rounded-lg
          grow
          items-center
          flex-wrap
          justify-center
          shadow-sm
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-stronger border-1
        `,radio_offset:"left-4"},"large-cards":{container:{base:"relative cursor-pointer flex",align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"grid grid-cols-12 gap-3",base:`
          transition
          border border-stronger
          shadow-sm
          rounded-lg
          grow
        `,size:{tiny:"px-5 py-3",small:"px-6 py-4",medium:"px-6 py-4",large:"px-8 p-4",xlarge:"px-8 p-4"},inactive:`
          bg-surface-200
          border-alternative
          hover:border-strong
          hover:bg-surface-300
        `,active:`
          bg-selection z-10
          border-strong
          border-1
        `,radio_offset:"left-4"},list:{container:{base:"relative cursor-pointer flex",size:{tiny:"pl-6",small:"pl-6",medium:"pl-7",large:"pl-7",xlarge:"pl-7"},align:{vertical:"flex flex-col space-y-1",horizontal:"flex flex-row space-x-2"}},group:"space-y-4",base:"",size:{tiny:"0",small:"0",medium:"0",large:"0",xlarge:"0"},active:"",radio_offset:"left-0"}},label:{base:"text-foreground-light cursor-pointer",...a.size.text},label_before:{base:"text-border",...a.size.text},label_after:{base:"text-border",...a.size.text},description:{base:"text-foreground-lighter",...a.size.text},optionalLabel:{base:"text-foreground-lighter",...a.size.text},disabled:"opacity-50 cursor-auto border-dashed"},sidepanel:{base:`
      z-50
      bg-dash-sidebar
      flex flex-col
      fixed
      inset-y-0
      h-full lg:h-screen
      border-l
      shadow-xl
    `,header:`
      space-y-1 py-4 px-4 bg-dash-sidebar sm:px-6
      border-b
    `,contents:`
      relative
      flex-1
      overflow-y-auto
    `,content:`
      px-4 sm:px-6
    `,footer:`
      flex justify-end gap-2
      p-4 bg-overlay
      border-t
    `,size:{medium:"w-screen max-w-md h-full",large:"w-screen max-w-2xl h-full",xlarge:"w-screen max-w-3xl h-full",xxlarge:"w-screen max-w-4xl h-full",xxxlarge:"w-screen max-w-5xl h-full",xxxxlarge:"w-screen max-w-6xl h-full"},align:{left:`
        left-0
        data-open:animate-panel-slide-left-out
        data-closed:animate-panel-slide-left-in
      `,right:`
        right-0
        data-open:animate-panel-slide-right-out
        data-closed:animate-panel-slide-right-in
      `},separator:`
      w-full
      h-px
      my-2
      bg-border
    `,overlay:`
      z-50
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,trigger:`
      border-none bg-transparent p-0 focus:ring-0
    `},toggle:{base:`
      p-0 relative
      inline-flex flex-shrink-0
      border-2 border-transparent
      rounded-full
      cursor-pointer
      transition-colors ease-in-out duration-200
      ${a.focus}
      focus:!ring-border
      bg-foreground-muted/40

      hover:bg-foreground-muted/60
    `,active:`
      !bg-brand
      !hover:bg-brand
    `,handle_container:{tiny:"h-4 w-7",small:"h-6 w-11",medium:"h-6 w-11",large:"h-7 w-12",xlarge:"h-7 w-12"},handle:{base:`
        inline-block h-5 w-5
        rounded-full
        bg-white
        shadow ring-0
        transition
        ease-in-out duration-200
      `,tiny:"!h-3 !w-3",small:"!h-5 !w-5",medium:"!h-5 !w-5",large:"!h-6 !w-6",xlarge:"!h-6 !w-6"},handle_active:{tiny:" translate-x-3 dark:bg-white",small:"translate-x-5 dark:bg-white",medium:"translate-x-5 dark:bg-white",large:"translate-x-5 dark:bg-white",xlarge:"translate-x-5 dark:bg-white"},disabled:"opacity-75 cursor-not-allowed"},form_layout:{container:"grid gap-2",flex:{left:{base:"flex flex-row gap-6",content:"",labels:"order-2",data_input:"order-1"},right:{base:"flex flex-row gap-6 justify-between",content:"order-last",labels:"",data_input:"text-right"}},responsive:"md:grid md:grid-cols-12",non_responsive:"grid grid-cols-12 gap-2",labels_horizontal_layout:"flex flex-row space-x-2 justify-between col-span-12",labels_vertical_layout:"flex flex-col space-y-2 col-span-4",data_input_horizontal_layout:"col-span-12",non_box_data_input_spacing_vertical:"my-3",non_box_data_input_spacing_horizontal:"my-3 md:mt-0 mb-3",data_input_vertical_layout:"col-span-8",data_input_vertical_layout__align_right:"text-right",label:{base:"block text-foreground-light",size:{...a.size.text}},label_optional:{base:"text-foreground-lighter",size:{...a.size.text}},description:{base:"mt-2 text-foreground-lighter leading-normal",size:{...a.size.text}},label_before:{base:"text-foreground-lighter ",size:{...a.size.text}},label_after:{base:"text-foreground-lighter",size:{...a.size.text}},error:{base:`
        text-red-900
        transition-all
        data-show:mt-2
        data-show:animate-slide-down-normal
        data-hide:animate-slide-up-normal
      `,size:{...a.size.text}},size:{tiny:"text-xs",small:"text-sm leading-4",medium:"text-sm",large:"text-base",xlarge:"text-base"}},popover:{trigger:`
      flex
      border-none
      rounded
      bg-transparent
      p-0
      outline-none
      outline-offset-1
      transition-all
      focus:outline-4
      focus:outline-border-control
    `,content:`
      z-40
      bg-overlay
      border border-overlay
      rounded
      shadow-lg
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
      min-w-fit

      origin-popover
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,size:{tiny:"w-40",small:"w-48",medium:"w-64",large:"w-80",xlarge:"w-96",content:"w-auto"},header:`
      bg-surface-200
      space-y-1 py-1.5 px-3
      border-b border-overlay
    `,footer:`
      bg-surface-200
      py-1.5 px-3
      border-t border-overlay
    `,close:`
      transition
      text-foreground-lighter
    `,separator:`
      w-full
      h-px
      my-2
      bg-border-overlay
    `},menu:{item:{base:`
        cursor-pointer
        flex space-x-3 items-center
        outline-none
        focus-visible:ring-1 ring-foreground-muted focus-visible:z-10
        group
      `,content:{base:"transition truncate text-sm w-full",normal:"text-foreground-light group-hover:text-foreground",active:"text-foreground font-semibold"},icon:{base:"transition truncate text-sm",normal:"text-foreground-lighter group-hover:text-foreground-light",active:"text-foreground"},variants:{text:{base:`
            py-1
          `,normal:`
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold
            text-foreground-muted
            z-10
          `},border:{base:`
            px-4 py-1
          `,normal:`
            border-l
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold

            text-foreground-muted
            z-10

            border-l
            border-brand
            group-hover:border-brand
          `,rounded:"rounded-md"},pills:{base:"px-3 py-1",normal:`
            font-normal
            border-default
            group-hover:border-foreground-muted`,active:`
            font-semibold
            bg-sidebar-accent
            text-foreground-lighter
            z-10 rounded-md
          `}}},group:{base:`
        flex space-x-3
        mb-2
        font-normal
      `,icon:"text-foreground-lighter",content:"text-sm text-foreground-lighter w-full",variants:{text:"",pills:"px-3",border:""}}},modal:{base:`
      relative
      bg-dash-sidebar
      my-4 max-w-screen
      border border-overlay
      rounded-md
      shadow-xl
      data-open:animate-overlay-show
      data-closed:animate-overlay-hide

    `,header:`
      bg-surface-200
      space-y-1 py-3 px-4 sm:px-5
      border-b border-overlay
      flex items-center justify-between
    `,footer:`
      flex justify-end gap-2
      py-3 px-5
      border-t border-overlay
    `,size:{tiny:"sm:align-middle sm:w-full sm:max-w-xs",small:"sm:align-middle sm:w-full sm:max-w-sm",medium:"sm:align-middle sm:w-full sm:max-w-lg",large:"sm:align-middle sm:w-full md:max-w-xl",xlarge:"sm:align-middle sm:w-full md:max-w-3xl",xxlarge:"sm:align-middle sm:w-full max-w-screen md:max-w-6xl",xxxlarge:"sm:align-middle sm:w-full md:max-w-7xl"},overlay:`
      z-40
      fixed
      bg-alternative
      h-full w-full
      left-0
      top-0
      opacity-75
      data-closed:animate-fade-out-overlay-bg
      data-open:animate-fade-in-overlay-bg
    `,scroll_overlay:`
      z-40
      fixed
      inset-0
      grid
      place-items-center
      overflow-y-auto
      data-open:animate-overlay-show data-closed:animate-overlay-hide
    `,separator:`
      w-full
      h-px
      my-2
      bg-border-overlay
    `,content:"px-5"},listbox:{base:`
      block
      box-border
      w-full
      rounded-md
      shadow-sm
      text-foreground
      border
      focus-visible:shadow-md
      ${a.focus}
      focus-visible:border-foreground-muted
      focus-visible:ring-background-control
      ${a.placeholder}
      indent-px
      transition-all
      bg-none
    `,container:"relative",label:"truncate",variants:{standard:`
        bg-control
        border border-control

        aria-expanded:border-foreground-muted
        aria-expanded:ring-border-muted
        aria-expanded:ring-2
        `,error:`
        bg-destructive-200
        border border-destructive-500
        focus:ring-destructive-400
        placeholder:text-destructive-400
       `},options_container_animate:`
      transition
      data-open:animate-slide-down
      data-open:opacity-1
      data-closed:animate-slide-up
      data-closed:opacity-0
    `,options_container:`
      bg-overlay
      shadow-lg
      border border-solid
      border-overlay max-h-60
      rounded-md py-1 text-base
      sm:text-sm z-10 overflow-hidden overflow-y-scroll

      origin-dropdown
      data-open:animate-dropdown-content-show
      data-closed:animate-dropdown-content-hide
    `,with_icon:"pl-2",addOnBefore:`
      w-full flex flex-row items-center space-x-3
    `,size:{...r},disabled:"opacity-50",actions_container:"absolute inset-y-0 right-0 pl-3 pr-1 flex space-x-1 items-center",chevron_container:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",chevron:"h-5 w-5 text-foreground-muted",option:`
      w-listbox
      transition cursor-pointer select-none relative py-2 pl-3 pr-9
      text-foreground-light
      text-sm
      hover:bg-border-overlay
      focus:bg-border-overlay
      focus:text-foreground
      border-none
      focus:outline-none
    `,option_active:"text-foreground bg-selection",option_disabled:"cursor-not-allowed opacity-60",option_inner:"flex items-center space-x-3",option_check:"absolute inset-y-0 right-0 flex items-center pr-3 text-brand",option_check_active:"text-brand",option_check_icon:"h-5 w-5"},collapsible:{content:`
      data-open:animate-slide-down-normal
      data-closed:animate-slide-up-normal
    `},inputErrorIcon:{base:`
      flex items-center
      right-3 pr-2 pl-2
      inset-y-0
      pointer-events-none
      text-red-900
    `},inputIconContainer:{base:`
    absolute inset-y-0
    left-0 pl-2 flex
    items-center pointer-events-none
    text-foreground-light
    [&_svg]:stroke-[1.5]
    `,size:{tiny:"[&_svg]:h-[14px] [&_svg]:w-[14px]",small:"[&_svg]:h-[18px] [&_svg]:w-[18px]",medium:"[&_svg]:h-[20px] [&_svg]:w-[20px]",large:"[&_svg]:h-[20px] [&_svg]:w-[20px] pl-3",xlarge:"[&_svg]:h-[24px] [&_svg]:w-[24px] pl-3",xxlarge:"[&_svg]:h-[30px] [&_svg]:w-[30px] pl-3",xxxlarge:"[&_svg]:h-[42px] [&_svg]:w-[42px] pl-3"}},icon:{container:"flex-shrink-0 flex items-center justify-center rounded-full p-3"},loading:{base:"relative",content:{base:"transition-opacity duration-300",active:"opacity-40"},spinner:`
      absolute
      text-foreground-lighter animate-spin
      inset-0
      size-5
      m-auto
    `}};e.s(["default",0,i],305551);let o=(0,t.createContext)({theme:i});function l(e){let{theme:{[e]:a}}=(0,t.useContext)(o);return a||(a=i.accordion),a=JSON.parse(a=JSON.stringify(a).replace(/\\n/g,"").replace(/\s\s+/g," "))}e.s(["default",()=>l],938933)},867637,704598,e=>{"use strict";let t=(0,e.i(388019).default)("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);e.s(["default",()=>t],704598),e.s(["AlertCircle",()=>t],867637)},56794,(e,t,a)=>{var r=e.r(220259),n=e.r(276199),i=e.r(372797),o=r?r.isConcatSpreadable:void 0;t.exports=function(e){return i(e)||n(e)||!!(o&&e&&e[o])}},730007,(e,t,a)=>{var r=e.r(995762),n=e.r(56794);t.exports=function e(t,a,i,o,l){var s=-1,d=t.length;for(i||(i=n),l||(l=[]);++s<d;){var p=t[s];a>0&&i(p)?a>1?e(p,a-1,i,o,l):r(l,p):o||(l[l.length]=p)}return l}},615515,e=>{"use strict";var t=e.i(10429);let a={STRIPE:"stripe_fdw_handler",FIREBASE:"firebase_fdw_handler",S3:"s3_fdw_handler",S3_VECTORS:"s3_vectors_fdw_handler",CLICK_HOUSE:"click_house_fdw_handler",BIG_QUERY:"big_query_fdw_handler",AIRTABLE:"airtable_fdw_handler",LOGFLARE:"logflare_fdw_handler",AUTH0:"auth0_fdw_handler",COGNITO:"cognito_fdw_handler",MSSQL:"mssql_fdw_handler",REDIS:"redis_fdw_handler",ICEBERG:"iceberg_fdw_handler",PADDLE:"wasm_fdw_handler",SNOWFLAKE:"wasm_fdw_handler",CAL:"wasm_fdw_handler",CALENDLY:"wasm_fdw_handler",CLERK:"wasm_fdw_handler",NOTION:"wasm_fdw_handler",SLACK:"wasm_fdw_handler",CLOUDFLARE_D1:"wasm_fdw_handler",HUBSPOT:"wasm_fdw_handler",ORB:"wasm_fdw_handler"},r={name:"supabase_target_schema",label:"Target Schema",required:!1,encrypted:!1,secureEntry:!1,readOnly:!0,hidden:!0},n=[{name:"stripe_wrapper",handlerName:a.STRIPE,validatorName:"stripe_fdw_validator",icon:`${t.BASE_PATH}/img/icons/stripe-icon.svg`,description:"Payment processing and subscription management",extensionName:"StripeFdw",label:"Stripe",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/stripe`,server:{options:[{name:"api_key_id",label:"Stripe Secret Key",required:!0,encrypted:!0,secureEntry:!0,urlHelper:"https://stripe.com/docs/keys"},{name:"api_url",label:"Stripe API URL",defaultValue:"https://api.stripe.com/v1",required:!1,encrypted:!1,secureEntry:!1},r]},tables:[{label:"Accounts",description:"List of accounts on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"business_type",type:"text"},{name:"country",type:"text"},{name:"email",type:"text"},{name:"type",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"accounts",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]},{label:"Balance",description:"The balance currently on your Stripe account",availableColumns:[{name:"balance_type",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"balance",editable:!1,required:!0,type:"text"}]},{label:"Balance Transactions",description:"Transactions that have contributed to the balance on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"description",type:"text"},{name:"fee",type:"bigint"},{name:"net",type:"bigint"},{name:"status",type:"text"},{name:"type",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"balance_transactions",editable:!1,required:!0,type:"text"}]},{label:"Charges",description:"Charges made on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"customer",type:"text"},{name:"description",type:"text"},{name:"invoice",type:"text"},{name:"payment_intent",type:"text"},{name:"status",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"charges",editable:!1,required:!0,type:"text"}]},{label:"Checkout Sessions",description:"Customer's session as they pay for one-time purchases or subscriptions through Checkout or Payment Links",availableColumns:[{name:"id",type:"text"},{name:"customer",type:"text"},{name:"payment_intent",type:"text"},{name:"subscription",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"checkout/sessions",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]},{label:"Customers",description:"Customers on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"email",type:"text"},{name:"name",type:"text"},{name:"description",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"customers",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]},{label:"Disputes",description:"When a customer questions your charge with their card issuer",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"charge",type:"text"},{name:"payment_intent",type:"text"},{name:"reason",type:"text"},{name:"status",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"disputes",editable:!1,required:!0,type:"text"}]},{label:"Events",description:"Stripe's way of letting you know when something interesting happens in your account",availableColumns:[{name:"id",type:"text"},{name:"type",type:"text"},{name:"api_version",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"events",editable:!1,required:!0,type:"text"}]},{label:"Files",description:"Files that are hosted on Stripe's servers",availableColumns:[{name:"id",type:"text"},{name:"filename",type:"text"},{name:"purpose",type:"text"},{name:"title",type:"text"},{name:"size",type:"bigint"},{name:"type",type:"text"},{name:"url",type:"text"},{name:"created",type:"timestamp"},{name:"expires_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"files",editable:!1,required:!0,type:"text"}]},{label:"File Links",description:"For sharing contents of a File object with non-Stripe users",availableColumns:[{name:"id",type:"text"},{name:"file",type:"text"},{name:"url",type:"text"},{name:"created",type:"timestamp"},{name:"expired",type:"bool"},{name:"expires_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"file_links",editable:!1,required:!0,type:"text"}]},{label:"Invoices",description:"Invoices on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"customer",type:"text"},{name:"subscription",type:"text"},{name:"status",type:"text"},{name:"total",type:"bigint"},{name:"currency",type:"text"},{name:"period_start",type:"timestamp"},{name:"period_end",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"invoices",editable:!1,required:!0,type:"text"}]},{label:"Mandates",description:"Records of the permission a customer has given you to debit their payment method",availableColumns:[{name:"id",type:"text"},{name:"payment_method",type:"text"},{name:"status",type:"text"},{name:"type",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"mandates",editable:!1,required:!0,type:"text"}]},{label:"Meters",description:"Records for tracking event usage in billing",availableColumns:[{name:"id",type:"text"},{name:"display_name",type:"text"},{name:"event_name",type:"text"},{name:"event_time_window",type:"text"},{name:"status",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"billing/meters",editable:!1,required:!0,type:"text"}]},{label:"Payment Intents",description:"Payment Intents on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"customer",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"payment_method",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"payment_intents",editable:!1,required:!0,type:"text"}]},{label:"Payouts",description:"Created when you receive funds from Stripe, or when you initiate a payout to either a bank account or debit card",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"arrival_date",type:"timestamp"},{name:"description",type:"text"},{name:"statement_descriptor",type:"text"},{name:"status",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"payouts",editable:!1,required:!0,type:"text"}]},{label:"Prices",description:"A Price object is needed for all your products to facilitate multiple currencies and pricing options",availableColumns:[{name:"id",type:"text"},{name:"active",type:"bool"},{name:"currency",type:"text"},{name:"product",type:"text"},{name:"unit_amount",type:"bigint"},{name:"type",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"prices",editable:!1,required:!0,type:"text"}]},{label:"Products",description:"Products on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"active",type:"bool"},{name:"default_price",type:"text"},{name:"description",type:"text"},{name:"created",type:"timestamp"},{name:"updated",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"products",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]},{label:"Refunds",description:"Allows you to refund a charge that has previously been created but not yet refunded",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"charge",type:"text"},{name:"payment_intent",type:"text"},{name:"reason",type:"text"},{name:"status",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"refunds",editable:!1,required:!0,type:"text"}]},{label:"Setup Attempts",description:"Attempted confirmations of a SetupIntent, either successful or unsuccessful",availableColumns:[{name:"id",type:"text"},{name:"application",type:"text"},{name:"customer",type:"text"},{name:"on_behalf_of",type:"text"},{name:"payment_method",type:"text"},{name:"setup_intent",type:"text"},{name:"status",type:"text"},{name:"usage",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"setup_attempts",editable:!1,required:!0,type:"text"}]},{label:"Setup Intents",description:"Guides you through the process of setting up and saving a customer's payment credentials for future payments",availableColumns:[{name:"id",type:"text"},{name:"client_secret",type:"text"},{name:"customer",type:"text"},{name:"description",type:"text"},{name:"payment_method",type:"text"},{name:"status",type:"text"},{name:"usage",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"setup_intents",editable:!1,required:!0,type:"text"}]},{label:"Subscriptions",description:"Subscriptions on your Stripe account",availableColumns:[{name:"id",type:"text"},{name:"customer",type:"text"},{name:"currency",type:"text"},{name:"current_period_start",type:"timestamp"},{name:"current_period_end",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"subscriptions",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]},{label:"Tokens",description:"Tokenization is the process Stripe uses to collect sensitive card or bank account details in a secure manner",availableColumns:[{name:"id",type:"text"},{name:"customer",type:"text"},{name:"currency",type:"text"},{name:"current_period_start",type:"timestamp"},{name:"current_period_end",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"tokens",editable:!1,required:!0,type:"text"}]},{label:"Top-ups",description:"To top up your Stripe balance",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"description",type:"text"},{name:"status",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"topups",editable:!1,required:!0,type:"text"}]},{label:"Transfers",description:"When moving funds between Stripe accounts as part of Connect",availableColumns:[{name:"id",type:"text"},{name:"amount",type:"bigint"},{name:"currency",type:"text"},{name:"description",type:"text"},{name:"destination",type:"text"},{name:"created",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"transfers",editable:!1,required:!0,type:"text"}]}],canTargetSchema:!0,sourceSchemaOption:{name:"source_schema",label:"Source Schema",required:!0,encrypted:!1,secureEntry:!1,readOnly:!0,defaultValue:"stripe"}},{name:"firebase_wrapper",handlerName:a.FIREBASE,validatorName:"firebase_fdw_validator",icon:`${t.BASE_PATH}/img/icons/firebase-icon.svg`,description:"Backend-as-a-Service with real-time database",extensionName:"FirebaseFdw",label:"Firebase",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/firebase`,server:{options:[{name:"project_id",label:"Project ID",required:!0,encrypted:!1,secureEntry:!1},{name:"sa_key_id",label:"Service Account Key",required:!0,encrypted:!0,secureEntry:!0,isTextArea:!0,urlHelper:"https://firebase.google.com/docs/admin/setup#initialize-sdk"}]},tables:[{label:"Users",description:"Shows your Firebase users",availableColumns:[{name:"uid",type:"text"},{name:"email",type:"text"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"auth/users",editable:!1,required:!0,type:"text"},{name:"base_url",label:"Base URL",defaultValue:"https://identitytoolkit.googleapis.com/v1/projects",editable:!0,required:!0,type:"text"},{name:"limit",label:"Limit",defaultValue:"10000",editable:!0,required:!0,type:"text"}]},{label:"Firestore Collection",description:"Map to a Firestore collection",availableColumns:[{name:"name",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",placeholder:"firestore/[collection_id]",editable:!0,required:!0,type:"text"},{name:"base_url",label:"Base URL",defaultValue:"https://firestore.googleapis.com/v1beta1/projects",editable:!0,required:!0,type:"text"},{name:"limit",label:"Limit",defaultValue:"10000",editable:!0,required:!0,type:"text"}]}]},{name:"s3_wrapper",handlerName:a.S3,validatorName:"s3_fdw_validator",icon:`${t.BASE_PATH}/img/icons/s3-icon.svg`,description:"Cloud object storage service",extensionName:"S3Fdw",label:"S3",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/s3`,server:{options:[{name:"vault_access_key_id",label:"Access Key ID",required:!0,encrypted:!0,secureEntry:!0},{name:"vault_secret_access_key",label:"Access Key Secret",required:!0,encrypted:!0,secureEntry:!0},{name:"aws_region",label:"AWS Region",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"us-east-1"}]},tables:[{label:"S3 File",description:"Map to a file in S3 (CSV or JSON only)",options:[{name:"uri",label:"URI",editable:!0,required:!0,placeholder:"s3://bucket/s3_table.csv",type:"text"},{name:"format",label:"Format",editable:!0,required:!0,type:"select",defaultValue:"csv",options:[{label:"CSV",value:"csv"},{label:"JSONL (JSON Lines)",value:"jsonl"}]},{name:"has_header",label:"Has Header",editable:!0,required:!0,type:"select",defaultValue:"true",options:[{label:"True",value:"true"},{label:"False",value:"false"}]},{name:"compress",label:"Compression",editable:!0,required:!1,type:"select",options:[{label:"GZIP",value:"gzip"}]}]}]},{name:"s3_vectors_wrapper",handlerName:a.S3_VECTORS,validatorName:"s3_vectors_fdw_validator",icon:`${t.BASE_PATH}/img/icons/s3-icon.svg`,description:"Cloud storage service for high-dimensional vectors",extensionName:"S3VectorsFdw",label:"S3 Vectors",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/s3-vectors`,minimumExtensionVersion:"0.5.6",server:{options:[{name:"vault_access_key_id",label:"Access Key ID",required:!0,encrypted:!0,secureEntry:!0},{name:"vault_secret_access_key",label:"Access Key Secret",required:!0,encrypted:!0,secureEntry:!0},{name:"aws_region",label:"AWS Region",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"us-east-1"},{name:"endpoint_url",label:"Endpoint URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:""},r]},canTargetSchema:!0,tables:[]},{name:"clickhouse_wrapper",handlerName:a.CLICK_HOUSE,validatorName:"click_house_fdw_validator",icon:`${t.BASE_PATH}/img/icons/clickhouse-icon.svg`,description:"Column-oriented analytics database",extensionName:"ClickHouseFdw",label:"ClickHouse",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/clickhouse`,server:{options:[{name:"conn_string_id",label:"ClickHouse Connection String",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"ClickHouse Table",description:"Map to a ClickHouse Table",options:[{name:"table",label:"ClickHouse Table Name",editable:!0,required:!0,placeholder:"my_clickhouse_table",type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]}]},{name:"bigquery_wrapper",handlerName:a.BIG_QUERY,validatorName:"big_query_fdw_validator",icon:`${t.BASE_PATH}/img/icons/bigquery-icon.svg`,description:"Serverless data warehouse and analytics",extensionName:"BigQueryFdw",label:"BigQuery",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/bigquery`,server:{options:[{name:"sa_key_id",label:"Service Account Key",required:!0,encrypted:!0,secureEntry:!0},{name:"project_id",label:"Project ID",required:!0,encrypted:!1,secureEntry:!1},{name:"dataset_id",label:"Dataset ID",required:!0,encrypted:!1,secureEntry:!1}]},tables:[{label:"BigQuery Table",description:"Map to a BigQuery Table",options:[{name:"table",label:"BigQuery Table Name",editable:!0,required:!0,placeholder:"my_bigquery_table",type:"text"},{name:"location",label:"Location",defaultValue:"US",editable:!0,required:!1,type:"text"},{name:"timeout",label:"Timeout (ms)",defaultValue:"30000",editable:!0,required:!1,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!1,type:"text"}]}]},{name:"airtable_wrapper",handlerName:a.AIRTABLE,validatorName:"airtable_fdw_validator",icon:`${t.BASE_PATH}/img/icons/airtable-icon.svg`,description:"No-code database and spreadsheet platform",extensionName:"airtableFdw",label:"Airtable",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/airtable`,server:{options:[{name:"api_key_id",label:"API Key ID",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Airtable Table",description:"Map to an Airtable Table",options:[{name:"base_id",label:"Base ID",editable:!0,required:!0,type:"text"},{name:"table_id",label:"Table ID",editable:!0,required:!0,type:"text"}]}]},{name:"logflare_wrapper",handlerName:a.LOGFLARE,validatorName:"logflare_fdw_validator",icon:`${t.BASE_PATH}/img/icons/logflare-icon.svg`,description:"Log management and analytics service",extensionName:"logflareFdw",label:"Logflare",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/logflare`,server:{options:[{name:"api_key_id",label:"API Key ID",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Logflare Table",description:"Map to a Logflare Table",options:[{name:"endpoint",label:"Endpoint",editable:!0,required:!0,type:"text"}]}]},{name:"auth0_wrapper",handlerName:a.AUTH0,validatorName:"auth0_fdw_validator",icon:`${t.BASE_PATH}/img/icons/auth0-icon.svg`,description:"Identity and access management platform",extensionName:"Auth0Fdw",label:"Auth0",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/auth0`,minimumExtensionVersion:"0.3.0",server:{options:[{name:"api_key_id",label:"Auth0 API key or PAT",required:!0,encrypted:!0,secureEntry:!0},{name:"url",label:"Auth0 API URL",defaultValue:"https://dev-<tenant-id>.us.auth0.com/api/v2/users",required:!1,encrypted:!1,secureEntry:!1}]},tables:[{label:"Users",description:"Auth0 Users",availableColumns:[{name:"user_id",type:"text"},{name:"email",type:"text"},{name:"email_verified",type:"boolean"},{name:"username",type:"text"},{name:"phone_number",type:"text"},{name:"phone_verified",type:"boolean"},{name:"created_at",type:"jsonb"},{name:"updated_at",type:"jsonb"},{name:"identities",type:"jsonb"},{name:"app_metadata",type:"jsonb"},{name:"user_metadata",type:"jsonb"},{name:"picture",type:"text"},{name:"name",type:"text"},{name:"nickname",type:"text"},{name:"multifactor",type:"jsonb"},{name:"last_ip",type:"text"},{name:"last_login",type:"jsonb"},{name:"logins_count",type:"integer"},{name:"blocked",type:"boolean"},{name:"given_name",type:"text"},{name:"family_name",type:"text"}],options:[{name:"object",defaultValue:"users",editable:!1,required:!0,type:"text"}]}]},{name:"cognito_wrapper",handlerName:a.COGNITO,validatorName:"cognito_fdw_validator",icon:`${t.BASE_PATH}/img/icons/cognito-icon.svg`,description:"AWS user authentication and authorization",extensionName:"CognitoFdw",label:"Cognito",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/cognito`,minimumExtensionVersion:"0.3.0",server:{options:[{name:"aws_access_key_id",label:"AWS Access Key ID",required:!0,encrypted:!1,secureEntry:!1},{name:"api_key_id",label:"AWS Secret Key",required:!0,encrypted:!0,secureEntry:!0},{name:"region",label:"Region",required:!0,encrypted:!1,secureEntry:!1},{name:"user_pool_id",label:"User Pool ID",required:!0,encrypted:!1,secureEntry:!1},r]},canTargetSchema:!0,sourceSchemaOption:{name:"source_schema",label:"Source Schema",required:!0,encrypted:!1,secureEntry:!1,readOnly:!0,defaultValue:"cognito"},tables:[{label:"Users",description:"Cognito Users",availableColumns:[{name:"email",type:"text"},{name:"created_at",type:"text"},{name:"email_verified",type:"boolean"},{name:"identities",type:"jsonb"},{name:"username",type:"text"},{name:"status",type:"text"}],options:[{name:"object",defaultValue:"users",editable:!1,required:!0,type:"text"}]}]},{name:"mssql_wrapper",handlerName:a.MSSQL,validatorName:"mssql_fdw_validator",icon:`${t.BASE_PATH}/img/icons/mssql-icon.svg`,description:"Microsoft SQL Server database",extensionName:"mssqlFdw",label:"Microsoft SQL Server",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/mssql`,minimumExtensionVersion:"0.3.0",server:{options:[{name:"conn_string_id",label:"Connection String",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Microsoft SQL Server Table",description:"Map to an Microsoft SQL Server Table",options:[{name:"table",label:"MSSQL Table",editable:!0,required:!0,type:"text"}]}]},{name:"redis_wrapper",handlerName:a.REDIS,validatorName:"redis_fdw_validator",icon:`${t.BASE_PATH}/img/icons/redis-icon.svg`,description:"In-memory data structure store",extensionName:"redisFdw",label:"Redis",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/redis`,minimumExtensionVersion:"0.3.0",server:{options:[{name:"conn_url_id",label:"Connection URL",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Redis Table",description:"Map to an Redis Table",options:[{name:"src_type",label:"Source Type",editable:!0,required:!0,type:"select",defaultValue:"list",options:[{label:"list",value:"list"},{label:"set",value:"set"},{label:"hash",value:"hash"},{label:"zset",value:"zset"},{label:"stream",value:"stream"},{label:"multi_list",value:"multi_list"},{label:"multi_set",value:"multi_set"},{label:"multi_hash",value:"multi_hash"},{label:"multi_zset",value:"multi_zset"}]},{name:"src_key",label:"Source Key",editable:!0,required:!1,type:"text"}]}]},{name:"paddle_wrapper",handlerName:a.PADDLE,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/paddle-icon.svg`,description:"Subscription billing and payments platform",extensionName:"paddleFdw",label:"Paddle",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/paddle`,minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_paddle_fdw_v0.1.1/paddle_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:paddle-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.1",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"c5ac70bb2eef33693787b7d4efce9a83cde8d4fa40889d2037403a51263ba657",hidden:!0},{name:"api_url",label:"Paddle API URL",defaultValue:"https://api.paddle.com",required:!0,encrypted:!1,secureEntry:!1},{name:"api_key_id",label:"Paddle API Key",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Paddle Object",description:"Map to an Paddle Object",options:[{name:"object",label:"Object",editable:!0,required:!0,type:"select",defaultValue:"products",options:[{label:"Products",value:"products"},{label:"Prices",value:"prices"},{label:"Discounts",value:"discounts"},{label:"Customers",value:"customers"},{label:"Transactions",value:"transactions"},{label:"Reports",value:"reports"},{label:"Notification Settings",value:"notification-settings"},{label:"notifications",value:"notifications"}]},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]}]},{name:"snowflake_wrapper",handlerName:a.SNOWFLAKE,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/snowflake-icon.svg`,description:"Cloud data warehouse platform",extensionName:"snowflakeFdw",label:"Snowflake",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/snowflake`,minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_snowflake_fdw_v0.1.1/snowflake_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:snowflake-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.1",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"7aaafc7edc1726bc93ddc04452d41bda9e1a264a1df2ea9bf1b00b267543b860",hidden:!0},{name:"account_identifier",label:"Account Identifier",required:!0,encrypted:!1,secureEntry:!1},{name:"user",label:"User",required:!0,encrypted:!1,secureEntry:!1},{name:"public_key_fingerprint",label:"Public Key Fingerprint",required:!0,encrypted:!1,secureEntry:!1},{name:"private_key_id",label:"Private Key",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Snowflake Table",description:"Map to an Snowflake Table",options:[{name:"table",label:"Table",editable:!0,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",defaultValue:"id",editable:!0,required:!0,type:"text"}]}]},{name:"iceberg_wrapper",handlerName:a.ICEBERG,validatorName:"iceberg_fdw_validator",icon:`${t.BASE_PATH}/img/icons/iceberg-icon.svg`,description:"Iceberg is a data warehouse",extensionName:"icebergFdw",label:"Iceberg",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/iceberg`,minimumExtensionVersion:"0.5.3",customComponent:!0,server:{options:[{name:"vault_aws_access_key_id",label:"AWS Access Key ID",required:!1,encrypted:!0,secureEntry:!0},{name:"vault_aws_secret_access_key",label:"AWS Secret Access Key",required:!1,encrypted:!0,secureEntry:!0},{name:"region_name",label:"Region Name",required:!1,encrypted:!1,secureEntry:!1},{name:"vault_aws_s3table_bucket_arn",label:"AWS S3 Table Bucket ARN",required:!1,encrypted:!0,secureEntry:!0},{name:"vault_token",label:"Token",required:!1,encrypted:!0,secureEntry:!0},{name:"warehouse",label:"Warehouse",required:!1,encrypted:!1,secureEntry:!1},{name:"s3.endpoint",label:"S3 Endpoint",required:!1,encrypted:!1,secureEntry:!1},{name:"catalog_uri",label:"Catalog URI",required:!1,encrypted:!1,secureEntry:!1},r]},canTargetSchema:!0,sourceSchemaOption:{name:"source_schema",label:"Namespace",description:"It should match the namespace of the Iceberg catalog.",required:!0,encrypted:!1,secureEntry:!1,defaultValue:""},tables:[]},{name:"cal_wrapper",description:"Cal.com is a scheduling platform",handlerName:a.CAL,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/cal-com-icon.svg`,extensionName:"calFdw",label:"Cal.com",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/cal`,minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_cal_fdw_v0.1.0/cal_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:cal-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"bca8a82d6c5f8da0aa58011940c4ddb40bb2c909c02dd89b488289c4fff890c1",hidden:!0},{name:"api_url",label:"API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.cal.com/v2"},{name:"api_key_id",label:"API Key ID",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"My Profile",description:"Shows your Cal profile",availableColumns:[{name:"id",type:"bigint"},{name:"username",type:"text"},{name:"email",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"my_profile",editable:!1,required:!0,type:"text"}]},{label:"Event Types",description:"Shows your Event Types",availableColumns:[{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"event-types",editable:!1,required:!0,type:"text"}]},{label:"Bookings",description:"Shows your Bookings",availableColumns:[{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"bookings",editable:!1,required:!0,type:"text"}]},{label:"Calendars",description:"Shows your Calendars",availableColumns:[{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"calendars",editable:!1,required:!0,type:"text"}]},{label:"Schedules",description:"Shows your Schedules",availableColumns:[{name:"id",type:"bigint"},{name:"name",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"schedules",editable:!1,required:!0,type:"text"}]},{label:"Conferencing",description:"Shows conferencing",availableColumns:[{name:"id",type:"bigint"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"conferencing",editable:!1,required:!0,type:"text"}]}]},{name:"calendly_wrapper",description:"Calendly is a scheduling platform",handlerName:a.CALENDLY,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/calendly-icon.svg`,extensionName:"calendlyFdw",label:"Calendly",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/calendly`,minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_calendly_fdw_v0.1.0/calendly_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:calendly-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"aa17f1ce2b48b5d8d6cee4f61df4d6b23e9a333c3e5c7a10cec9aae619c156b9",hidden:!0},{name:"organization",label:"Organization URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://api.calendly.com/organizations/00000000-0000-0000-0000-000000000000"},{name:"api_url",label:"API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.calendly.com"},{name:"api_key_id",label:"API Key ID",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Current User",description:"Get the current user used for the API request",availableColumns:[{name:"uri",type:"text"},{name:"slug",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"current_user",editable:!1,required:!0,type:"text"}]},{label:"Event Types",description:"Shows your Event Types",availableColumns:[{name:"uri",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"event_types",editable:!1,required:!0,type:"text"}]},{label:"Groups",description:"Shows your groups",availableColumns:[{name:"uri",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"groups",editable:!1,required:!0,type:"text"}]},{label:"Organization Memberships",description:"Shows your Organization Memberships",availableColumns:[{name:"uri",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"organization_memberships",editable:!1,required:!0,type:"text"}]},{label:"Scheduled Events",description:"Shows your scheduled events",availableColumns:[{name:"uri",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"scheduled_events",editable:!1,required:!0,type:"text"}]}]},{name:"clerk_wrapper",description:"User Management Platform",handlerName:a.CLERK,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/clerk-icon.svg`,extensionName:"clerkFdw",label:"Clerk",docsUrl:`${t.DOCS_URL}/guides/database/extensions/wrappers/clerk`,minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_clerk_fdw_v0.1.0/clerk_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:clerk-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"613be26b59fa4c074e0b93f0db617fcd7b468d4d02edece0b1f85fdb683ebdc4",hidden:!0},{name:"api_url",label:"Clerk API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.clerk.com/v1"},{name:"api_key_id",label:"Clerk API Key",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Allow List",description:"List of all identifiers allowed to sign up to an instance",availableColumns:[{name:"id",type:"text"},{name:"invitation_id",type:"text"},{name:"identifier",type:"text"},{name:"identifier_type",type:"text"},{name:"instance_id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"allowlist_identifiers",editable:!1,required:!0,type:"text"}]},{label:"Block List",description:"List of all identifiers which are not allowed to access an instance",availableColumns:[{name:"id",type:"text"},{name:"identifier",type:"text"},{name:"identifier_type",type:"text"},{name:"instance_id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"blocklist_identifiers",editable:!1,required:!0,type:"text"}]},{label:"Domains",description:"List of all domains for an instance",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"is_satellite",type:"boolean"},{name:"frontend_api_url",type:"text"},{name:"accounts_portal_url",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"domains",editable:!1,required:!0,type:"text"}]},{label:"Invitations",description:"List of all non-revoked invitations for your application",availableColumns:[{name:"id",type:"text"},{name:"email_address",type:"text"},{name:"url",type:"text"},{name:"revoked",type:"boolean"},{name:"status",type:"text"},{name:"expires_at",type:"timestamp"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"invitations",editable:!1,required:!0,type:"text"}]},{label:"JWT Templates",description:"List of all JWT templates",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"lifetime",type:"bigint"},{name:"allowed_clock_skew",type:"bigint"},{name:"custom_signing_key",type:"boolean"},{name:"signing_algorithm",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"jwt_templates",editable:!1,required:!0,type:"text"}]},{label:"OAuth Applications",description:"List of OAuth applications for an instance",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"instance_id",type:"text"},{name:"client_id",type:"text"},{name:"public",type:"boolean"},{name:"scopes",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"oauth_applications",editable:!1,required:!0,type:"text"}]},{label:"Organizations",description:"List of organizations for an instance",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"slug",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"organizations",editable:!1,required:!0,type:"text"}]},{label:"Organization Invitations",description:"List of organization invitations for an instance",availableColumns:[{name:"id",type:"text"},{name:"email_address",type:"text"},{name:"role",type:"text"},{name:"role_name",type:"text"},{name:"organization_id",type:"text"},{name:"status",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"organization_invitations",editable:!1,required:!0,type:"text"}]},{label:"Organization Memberships",description:"List of organization user memberships for an instance",availableColumns:[{name:"id",type:"text"},{name:"role",type:"text"},{name:"role_name",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"organization_memberships",editable:!1,required:!0,type:"text"}]},{label:"Redirect URLs",description:"List of all whitelisted redirect urls for the instance",availableColumns:[{name:"id",type:"text"},{name:"url",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"redirect_urls",editable:!1,required:!0,type:"text"}]},{label:"SAML Connections",description:"List of SAML Connections for an instance",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"domain",type:"text"},{name:"active",type:"boolean"},{name:"provider",type:"text"},{name:"user_count",type:"bigint"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"saml_connections",editable:!1,required:!0,type:"text"}]},{label:"Users",description:"List of all users",availableColumns:[{name:"id",type:"text"},{name:"external_id",type:"text"},{name:"username",type:"text"},{name:"first_name",type:"text"},{name:"last_name",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"users",editable:!1,required:!0,type:"text"}]}]},{name:"notion_wrapper",description:"Notion provides a versatile, ready-to-use solution for managing your data.",handlerName:a.NOTION,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/notion-icon.svg`,extensionName:"NotionFdw",label:"Notion",docsUrl:"https://fdw.dev/catalog/notion/",minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_notion_fdw_v0.1.1/notion_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:notion-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.1",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"6dea3014f462aafd0c051c37d163fe326e7650c26a7eb5d8017a30634b5a46de",hidden:!0},{name:"api_url",label:"API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.notion.com/v1"},{name:"api_key_id",label:"Notion API Key",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Blocks",description:"Notion Block content",availableColumns:[{name:"id",type:"text"},{name:"page_id",type:"text"},{name:"type",type:"text"},{name:"created_time",type:"timestamp"},{name:"last_edited_time",type:"timestamp"},{name:"archived",type:"boolean"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"block",editable:!1,required:!0,type:"text"}]},{label:"Pages",description:"Notion Pages",availableColumns:[{name:"id",type:"text"},{name:"url",type:"text"},{name:"created_time",type:"timestamp"},{name:"last_edited_time",type:"timestamp"},{name:"archived",type:"boolean"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"page",editable:!1,required:!0,type:"text"}]},{label:"Databases",description:"Notion Databases",availableColumns:[{name:"id",type:"text"},{name:"url",type:"text"},{name:"created_time",type:"timestamp"},{name:"last_edited_time",type:"timestamp"},{name:"archived",type:"boolean"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"database",editable:!1,required:!0,type:"text"}]},{label:"Users",description:"Notion Users",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"type",type:"text"},{name:"avatar_url",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"user",editable:!1,required:!0,type:"text"}]}]},{name:"slack_wrapper",description:"Query Slack workspaces, channels, messages, users, files, and more via the Slack API.",handlerName:a.SLACK,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/slack-icon.svg`,extensionName:"SlackFdw",label:"Slack",docsUrl:"https://fdw.dev/catalog/slack/",minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_slack_fdw_v0.1.0/slack_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:slack-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"5b022b441c0007e31d792ecb1341bfffed1c29cb865eb0c7969989dff0e8fdc3",hidden:!0},{name:"api_token_id",label:"Slack Bot User OAuth Token",required:!0,encrypted:!0,secureEntry:!0,urlHelper:"https://api.slack.com/apps"},{name:"workspace",label:"Workspace",required:!1,encrypted:!1,secureEntry:!1}]},tables:[{label:"Channels",description:"All channels in the workspace",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"is_private",type:"boolean"},{name:"created",type:"timestamp"},{name:"creator",type:"text"}],options:[{name:"resource",defaultValue:"channels",editable:!1,required:!0,type:"text"}]},{label:"Messages",description:"Messages from channels, DMs, and group messages",availableColumns:[{name:"ts",type:"text"},{name:"user_id",type:"text"},{name:"channel_id",type:"text"},{name:"text",type:"text"},{name:"thread_ts",type:"text"},{name:"reply_count",type:"integer"}],options:[{name:"resource",defaultValue:"messages",editable:!1,required:!0,type:"text"}]},{label:"Users",description:"All users in the workspace",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"real_name",type:"text"},{name:"display_name",type:"text"},{name:"display_name_normalized",type:"text"},{name:"real_name_normalized",type:"text"},{name:"email",type:"text"},{name:"phone",type:"text"},{name:"skype",type:"text"},{name:"is_admin",type:"boolean"},{name:"is_owner",type:"boolean"},{name:"is_primary_owner",type:"boolean"},{name:"is_bot",type:"boolean"},{name:"is_app_user",type:"boolean"},{name:"is_restricted",type:"boolean"},{name:"is_ultra_restricted",type:"boolean"},{name:"deleted",type:"boolean"},{name:"status_text",type:"text"},{name:"status_emoji",type:"text"},{name:"status_expiration",type:"bigint"},{name:"title",type:"text"},{name:"team_id",type:"text"},{name:"team",type:"text"},{name:"tz",type:"text"},{name:"tz_label",type:"text"},{name:"tz_offset",type:"integer"},{name:"locale",type:"text"},{name:"image_24",type:"text"},{name:"image_48",type:"text"},{name:"image_72",type:"text"},{name:"image_192",type:"text"},{name:"image_512",type:"text"},{name:"color",type:"text"},{name:"updated",type:"bigint"}],options:[{name:"resource",defaultValue:"users",editable:!1,required:!0,type:"text"}]},{label:"User Groups",description:"User groups in the workspace",availableColumns:[{name:"id",type:"text"},{name:"team_id",type:"text"},{name:"name",type:"text"},{name:"handle",type:"text"},{name:"description",type:"text"},{name:"is_external",type:"boolean"},{name:"date_create",type:"bigint"},{name:"date_update",type:"bigint"},{name:"date_delete",type:"bigint"},{name:"auto_type",type:"text"},{name:"created_by",type:"text"},{name:"updated_by",type:"text"},{name:"deleted_by",type:"text"},{name:"user_count",type:"integer"},{name:"channel_count",type:"integer"}],options:[{name:"resource",defaultValue:"usergroups",editable:!1,required:!0,type:"text"}]},{label:"User Group Members",description:"Membership relation between users and user groups",availableColumns:[{name:"usergroup_id",type:"text"},{name:"usergroup_name",type:"text"},{name:"usergroup_handle",type:"text"},{name:"user_id",type:"text"}],options:[{name:"resource",defaultValue:"usergroup_members",editable:!1,required:!0,type:"text"}]},{label:"Files",description:"Files shared in the workspace",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"title",type:"text"},{name:"mimetype",type:"text"},{name:"size",type:"bigint"},{name:"url_private",type:"text"},{name:"user_id",type:"text"},{name:"created",type:"timestamp"}],options:[{name:"resource",defaultValue:"files",editable:!1,required:!0,type:"text"}]},{label:"Team Info",description:"Information about the Slack team/workspace",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"domain",type:"text"},{name:"email_domain",type:"text"}],options:[{name:"resource",defaultValue:"team-info",editable:!1,required:!0,type:"text"}]}]},{name:"cfd1_wrapper",description:"Read and write data from Cloudflare D1 databases using the Wasm FDW.",handlerName:a.CLOUDFLARE_D1,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/cloudflare-icon.svg`,extensionName:"Cfd1Fdw",label:"Cloudflare D1",docsUrl:"https://fdw.dev/catalog/cfd1/",minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_cfd1_fdw_v0.1.0/cfd1_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:cfd1-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"783232834bb29dbd3ee6b09618c16f8a847286e63d05c54397d56c3e703fad31",hidden:!0},{name:"api_url",label:"API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.cloudflare.com/client/v4/accounts/<account_id>/d1/database"},{name:"account_id",label:"Account ID",required:!0,encrypted:!1,secureEntry:!1},{name:"database_id",label:"Database ID",required:!0,encrypted:!1,secureEntry:!1},{name:"api_token_id",label:"Cloudflare D1 API Token",required:!0,encrypted:!0,secureEntry:!0,urlHelper:"https://dash.cloudflare.com/profile/api-tokens"}]},tables:[{label:"D1 Databases",description:"D1 databases in your Cloudflare account",availableColumns:[{name:"uuid",type:"text"},{name:"name",type:"text"},{name:"version",type:"text"},{name:"num_tables",type:"bigint"},{name:"file_size",type:"bigint"},{name:"created_at",type:"text"},{name:"_attrs",type:"jsonb"}],options:[{name:"table",defaultValue:"_meta_databases",editable:!1,required:!0,type:"text"}]},{label:"D1 Table",description:"A table in your D1 database (define columns to match your D1 schema)",availableColumns:[{name:"id",type:"bigint"},{name:"name",type:"text"},{name:"amount",type:"double precision"},{name:"metadata",type:"text"},{name:"_attrs",type:"jsonb"}],options:[{label:"Table",name:"table",placeholder:"mytable",editable:!0,required:!0,type:"text"},{label:"Row ID Column",name:"rowid_column",placeholder:"id",defaultValue:"id",editable:!0,required:!1,type:"text"}]}]},{name:"hubspot_wrapper",description:"Query and sync HubSpot CRM data using the Wasm FDW.",handlerName:a.HUBSPOT,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/hubspot-icon.svg`,extensionName:"HubspotFdw",label:"HubSpot",docsUrl:"https://fdw.dev/catalog/hubspot/",minimumExtensionVersion:"0.4.0",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_hubspot_fdw_v0.1.0/hubspot_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:hubspot-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"2cbf39e9e28aa732a225db09b2186a2342c44697d4fa047652d358e292ba5521",hidden:!0},{name:"api_url",label:"API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.hubapi.com/crm/v3"},{name:"api_key_id",label:"HubSpot API Key",required:!0,encrypted:!0,secureEntry:!0,urlHelper:"https://developers.hubspot.com/docs/guides/apps/authentication/intro-to-auth#private-app-access-tokens"}]},tables:[{label:"Companies",description:"Companies and organizations in your HubSpot CRM",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"domain",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/companies",editable:!1,required:!0,type:"text"}]},{label:"Contacts",description:"Contacts in your HubSpot CRM",availableColumns:[{name:"id",type:"text"},{name:"email",type:"text"},{name:"firstname",type:"text"},{name:"lastname",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/contacts",editable:!1,required:!0,type:"text"}]},{label:"Deals",description:"Deals and transactions in your HubSpot CRM",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/deals",editable:!1,required:!0,type:"text"}]},{label:"Tickets",description:"Customer service requests in your HubSpot CRM",availableColumns:[{name:"id",type:"text"},{name:"subject",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/tickets",editable:!1,required:!0,type:"text"}]},{label:"Products",description:"Products offered by your company in HubSpot",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/products",editable:!1,required:!0,type:"text"}]},{label:"Leads",description:"Potential customers in your HubSpot CRM",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/leads",editable:!1,required:!0,type:"text"}]},{label:"Partner Clients",description:"Partner clients managed by your company in HubSpot",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/partner_clients",editable:!1,required:!0,type:"text"}]},{label:"Feedback Submissions",description:"Feedback submissions from NPS, CSAT, CES, and custom surveys",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/feedback_submissions",editable:!1,required:!0,type:"text"}]},{label:"Goals",description:"User-specific quotas for sales and services teams",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/goal_targets",editable:!1,required:!0,type:"text"}]},{label:"Partner Clients",description:"Customers that Solutions Partners have a sold or managed relationship with",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",defaultValue:"objects/partner_clients",editable:!1,required:!0,type:"text"}]},{label:"Custom Object",description:"Custom objects managed by your company in HubSpot",availableColumns:[{name:"id",type:"text"},{name:"created_at",type:"timestamp"},{name:"updated_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{label:"Object",name:"object",placeholder:"objects/<objectType> e.g. `objects/2-3508482`",defaultValue:"objects/<objectType>",editable:!0,required:!0,type:"text"}]}]},{name:"orb_wrapper",handlerName:a.ORB,validatorName:"wasm_fdw_validator",icon:`${t.BASE_PATH}/img/icons/orb-icon.svg`,description:"Usage-based billing and metering platform",extensionName:"OrbFdw",minimumExtensionVersion:"0.4.0",label:"Orb",docsUrl:"https://fdw.dev/catalog/orb/",server:{options:[{name:"fdw_package_url",label:"FDW Package URL",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"https://github.com/supabase/wrappers/releases/download/wasm_orb_fdw_v0.1.0/orb_fdw.wasm",hidden:!0},{name:"fdw_package_name",label:"FDW Package Name",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"supabase:orb-fdw",hidden:!0},{name:"fdw_package_version",label:"FDW Package Version",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"0.1.0",hidden:!0},{name:"fdw_package_checksum",label:"FDW Package Checksum",required:!0,encrypted:!1,secureEntry:!1,defaultValue:"89153a0a570257c231b78561cc909766731c828324585a5b6e2aa553902cb73a",hidden:!0},{name:"api_url",label:"Orb API URL",required:!1,encrypted:!1,secureEntry:!1,defaultValue:"https://api.withorb.com/v1"},{name:"api_key_id",label:"Orb API Key ID",required:!0,encrypted:!0,secureEntry:!0}]},tables:[{label:"Alerts",description:"Alerts in Orb",availableColumns:[{name:"id",type:"text"},{name:"type",type:"text"},{name:"enabled",type:"boolean"},{name:"customer_id",type:"text"},{name:"external_customer_id",type:"text"},{name:"subscription_id",type:"text"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"alerts",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Coupons",description:"Coupons in Orb",availableColumns:[{name:"id",type:"text"},{name:"redemption_code",type:"text"},{name:"times_redeemed",type:"bigint"},{name:"duration_in_months",type:"bigint"},{name:"archived_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"coupons",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Credit Notes",description:"Credit notes in Orb",availableColumns:[{name:"id",type:"text"},{name:"type",type:"text"},{name:"total",type:"numeric(18,2)"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"credit_notes",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Customers",description:"Customers in Orb",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"email",type:"text"},{name:"created_at",type:"timestamp"},{name:"auto_collection",type:"boolean"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"customers",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Credits",description:"Credits in Orb",availableColumns:[{name:"id",type:"text"},{name:"customer_id",type:"text"},{name:"external_customer_id",type:"text"},{name:"balance",type:"numeric(18,2)"},{name:"status",type:"text"},{name:"effective_date",type:"timestamp"},{name:"expiry_date",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"credits",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Credits Ledger",description:"Credits ledger in Orb",availableColumns:[{name:"id",type:"text"},{name:"customer_id",type:"text"},{name:"external_customer_id",type:"text"},{name:"amount",type:"numeric(18,2)"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"credits_ledger",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Dimensional Price Groups",description:"Dimensional price groups in Orb",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"dimensional_price_groups",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Events Backfills",description:"Events backfills in Orb",availableColumns:[{name:"id",type:"text"},{name:"status",type:"text"},{name:"events_ingested",type:"bigint"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"events_backfills",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Events Volume",description:"Events volume in Orb",availableColumns:[{name:"count",type:"bigint"},{name:"timeframe_start",type:"timestamp"},{name:"timeframe_end",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"events_volume",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Invoices",description:"Invoices in Orb",availableColumns:[{name:"id",type:"text"},{name:"invoice_number",type:"text"},{name:"customer_id",type:"text"},{name:"external_customer_id",type:"text"},{name:"subscription_id",type:"text"},{name:"status",type:"text"},{name:"amount_due",type:"numeric(18,2)"},{name:"currency",type:"text"},{name:"due_date",type:"timestamp"},{name:"issued_at",type:"timestamp"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"invoices",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Items",description:"Items in Orb",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"items",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Metrics",description:"Metrics in Orb",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"description",type:"text"},{name:"status",type:"text"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"metrics",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Plans",description:"Plans in Orb",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"description",type:"text"},{name:"status",type:"text"},{name:"maximum_amount",type:"numeric(18,2)"},{name:"minimum_amount",type:"numeric(18,2)"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"plans",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Prices",description:"Prices in Orb",availableColumns:[{name:"id",type:"text"},{name:"name",type:"text"},{name:"external_price_id",type:"text"},{name:"price_type",type:"text"},{name:"maximum_amount",type:"numeric(18,2)"},{name:"minimum_amount",type:"numeric(18,2)"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"prices",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]},{label:"Subscriptions",description:"Subscriptions in Orb",availableColumns:[{name:"id",type:"text"},{name:"customer_id",type:"text"},{name:"external_customer_id",type:"text"},{name:"billing_cycle_day",type:"bigint"},{name:"status",type:"text"},{name:"start_date",type:"timestamp"},{name:"end_date",type:"timestamp"},{name:"created_at",type:"timestamp"},{name:"attrs",type:"jsonb"}],options:[{name:"object",label:"Object",defaultValue:"subscriptions",editable:!1,required:!0,type:"text"},{name:"rowid_column",label:"Row ID Column",placeholder:"id",editable:!0,required:!1,type:"text"}]}]}];e.s(["SUPABASE_TARGET_SCHEMA_OPTION",0,r,"WRAPPERS",0,n,"WRAPPER_HANDLERS",0,a])}]);

//# debugId=b1b8a016-cdc3-64e3-4abf-d604b3ce4ad1
//# sourceMappingURL=e2c0ccbc34fe3475.js.map