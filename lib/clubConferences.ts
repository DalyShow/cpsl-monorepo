/**
 * Maps every CPSL club name to its conference.
 * Used by CalendarDayViewBlock (and future schedule fetches) to automatically
 * populate the competition badge without manually specifying the conference
 * on each match record.
 *
 * Source of truth: StandingsTable mock data / Airtable clubs table.
 * Update here whenever a club is promoted, relegated, or realigned.
 */

export const CLUB_CONFERENCE: Record<string, string> = {
  // Northwest
  "Asheville FC":       "Northwest",
  "Blue Ridge United":  "Northwest",
  "Boone Valley SC":    "Northwest",
  "High Country FC":    "Northwest",
  "Piedmont Hills SC":  "Northwest",
  "Foothills United":   "Northwest",

  // West
  "Charlotte Athletic": "West",
  "Lake Norman SC":     "West",
  "Gastonia FC":        "West",
  "Cabarrus United":    "West",
  "Gaston Rangers":     "West",
  "Steel City SC":      "West",

  // Central
  "Carolina Fusion":    "Central",
  "Queen City United":  "Central",
  "Mecklenburg SC":     "Central",
  "Rowan County FC":    "Central",
  "Stanly Athletic":    "Central",
  "Davidson Stars":     "Central",

  // South
  "Midlands United":    "South",
  "Palmetto SC":        "South",
  "Richland FC":        "South",
  "Newberry United":    "South",
  "Sumter Rangers":     "South",
  "Orangeburg City SC": "South",

  // Midwest
  "Triad FC":           "Midwest",
  "High Point United":  "Midwest",
  "Winston Athletic":   "Midwest",
  "Alamance SC":        "Midwest",
  "Rockingham FC":      "Midwest",
  "Forsyth United":     "Midwest",

  // Northeast
  "Triangle SC":        "Northeast",
  "Durham United":      "Northeast",
  "Wake Forest FC":     "Northeast",
  "Cary Athletic":      "Northeast",
  "Chapel Hill SC":     "Northeast",
  "Johnston County FC": "Northeast",

  // Mid-Atlantic
  "Coastal Pines FC":   "Mid-Atlantic",
  "Cape Fear SC":       "Mid-Atlantic",
  "Brunswick FC":       "Mid-Atlantic",
  "Onslow United":      "Mid-Atlantic",
  "Crystal Coast SC":   "Mid-Atlantic",
  "Outer Banks FC":     "Mid-Atlantic",

  // Southeast
  "Low Country FC":     "Southeast",
  "Grand Strand SC":    "Southeast",
  "Lowcountry United":  "Southeast",
  "Waccamaw FC":        "Southeast",
  "Hilton Head SC":     "Southeast",
  "Colleton County FC": "Southeast",

  // ── Sample / placeholder names used in mock schedule data ──────────────────
  "Charlotte FC":       "Central",
  "Raleigh Athletic":   "Northeast",
  "Greensboro FC":      "Midwest",
  "Triangle FC":        "Northeast",
  "Winston-Salem SC":   "Midwest",
  "Coastal SC":         "Mid-Atlantic",
  "Columbia United":    "South",
  "Charleston FC":      "Southeast",
};

/** Returns the conference name for a given club, or a fallback string. */
export function conferenceFor(clubName: string): string {
  return CLUB_CONFERENCE[clubName] ?? "CPSL";
}
