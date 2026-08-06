export function articleDateValue(value: string) {
  return value.includes("T") ? value : `${value}T12:00:00Z`
}

export function formatArticleDate(value: string, month: "short" | "long" = "long") {
  return new Date(articleDateValue(value)).toLocaleDateString("en-GB", {day: "numeric", month, year: "numeric", timeZone: "Europe/London"})
}
