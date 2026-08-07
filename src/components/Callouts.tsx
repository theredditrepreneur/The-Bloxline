import type { ReactNode } from "react";
import Link from "next/link";
function Box({title,children}:{title:string;children:ReactNode}){return <aside className="callout"><h2>{title}</h2><div>{children}</div></aside>}
export const WhatAdultsNeedToKnow=({children}:{children:ReactNode})=><Box title="What Adults Need to Know">{children}</Box>;
export const WhyItMatters=({children}:{children:ReactNode})=><Box title="Why It Matters">{children}</Box>;
export const ForParents=({children}:{children:ReactNode})=><Box title="For Parents">{children}</Box>;
export const ForTeachers=({children}:{children:ReactNode})=><Box title="For Teachers">{children}</Box>;
export const BusinessAngle=({children}:{children:ReactNode})=><Box title="Business Angle">{children}</Box>;
export const InPlainEnglish=({children}:{children:ReactNode})=><Box title="In Plain English">{children}</Box>;
export const KeyTakeaways=({children}:{children:ReactNode})=><Box title="Key Takeaways">{children}</Box>;
export const BloxlineView=({children}:{children:ReactNode})=><Box title="The Bloxline View">{children}</Box>;
export const JobsCallout=()=> <Box title="Interested in working in Roblox?"><p><Link className="text-link" href="/jobs">Explore the latest Roblox jobs</Link></p></Box>;
export const EditorNote=({children}:{children:ReactNode})=><Box title="Editor’s Note">{children}</Box>;
