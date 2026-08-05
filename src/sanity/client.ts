import {createClient} from "next-sanity"
import {sanityApiVersion, sanityDataset, sanityProjectId} from "./env"

export const sanityClient = sanityProjectId
  ? createClient({projectId: sanityProjectId, dataset: sanityDataset, apiVersion: sanityApiVersion, useCdn: true, perspective: "published"})
  : null
