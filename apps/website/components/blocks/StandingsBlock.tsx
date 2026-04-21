import { StandingsTable } from "./StandingsTable";

interface Props {
  seasonLabel?: string;
}

export function StandingsBlock({ seasonLabel }: Props) {
  return <StandingsTable seasonLabel={seasonLabel} />;
}
