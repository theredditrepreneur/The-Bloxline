import {CogIcon} from "@sanity/icons/Cog"
import {DocumentTextIcon} from "@sanity/icons/DocumentText"
import {PlayIcon} from "@sanity/icons/Play"
import {UserIcon} from "@sanity/icons/User"
import {CaseIcon} from "@sanity/icons/Case"
import type {StructureResolver} from "sanity/structure"

export const structure: StructureResolver = (S) => S.list().title("The Bloxline").items([
  S.listItem().title("Site details").icon(CogIcon).child(S.document().schemaType("siteSettings").documentId("siteSettings").title("Site details")),
  S.listItem().title("Start Here page").icon(PlayIcon).child(S.document().schemaType("startHerePage").documentId("startHerePage").title("Start Here page")),
  S.divider(),
  S.documentTypeListItem("article").title("Articles").icon(DocumentTextIcon),
  S.documentTypeListItem("job").title("Jobs").icon(CaseIcon),
  S.documentTypeListItem("author").title("Authors").icon(UserIcon),
])
