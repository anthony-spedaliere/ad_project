import { useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../ui/Spinner";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
`;

const Subtitle = styled.h1`
  text-align: left;
  margin-bottom: 1rem;
  margin-top: ${(props) => props.$mgTop || "0"};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  background-color: var(--background-color-light);
`;

const HeaderCell = styled.th`
  padding: 10px;
  border: 1px solid var(--background-color);
  text-align: left;
`;

const DataRow = styled.tr``;

const DataCell = styled.td`
  padding: 10px;
  border: 1px solid var(--background-color-light);
  text-align: left;
`;

const RoundSection = styled.div`
  margin-bottom: 1.5rem;
`;

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function DraftResultsOverview() {
  const poisResults = useSelector((state) => state.draftResults.pois);
  const teamsResults = useSelector((state) => state.draftResults.teams);
  const mapResults = useSelector((state) => state.draftResults.maps);

  // Ensure data is not null or undefined
  if (!poisResults || !teamsResults || !mapResults) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    ); // or handle loading state appropriately
  }

  // Create the combined array
  const combined = teamsResults.map((team) => {
    const teamPois = poisResults.filter((poi) => poi.drafted_by === team.id);

    const poiAndMap = teamPois.map((poi) => {
      const map = mapResults.find((map) => map.id === poi.map_id);
      return [
        map?.map_name,
        poi.poi_name,
        poi.round_drafted,
        poi.number_picked,
      ];
    });

    return {
      draft_priority: team.draft_priority,
      team_name: team.team_name,
      poi_and_map: poiAndMap,
    };
  });

  // Get unique map names for the header
  const uniqueMapNames = [...new Set(mapResults.map((map) => map.map_name))];

  // Group POIs by rounds, excluding rounds with value zero
  const poisByRound = poisResults.reduce((acc, poi) => {
    if (poi.round_drafted > 0) {
      // Exclude rounds with value zero
      acc[poi.round_drafted] = acc[poi.round_drafted] || [];
      acc[poi.round_drafted].push(poi);
    }
    return acc;
  }, {});

  return (
    <Container>
      <Title>Draft Results</Title>
      <Subtitle>Overview</Subtitle>
      <Table>
        <thead>
          <HeaderRow>
            <HeaderCell>Team</HeaderCell>
            {uniqueMapNames.map((mapName) => (
              <HeaderCell key={mapName}>{mapName + " POI"}</HeaderCell>
            ))}
          </HeaderRow>
        </thead>
        <tbody>
          {combined.map((item, index) => (
            <DataRow key={index}>
              <DataCell>
                {item.draft_priority}. {item.team_name}
              </DataCell>
              {uniqueMapNames.map((mapName) => {
                const poiForMap = item.poi_and_map.find(
                  ([name]) => name === mapName
                );
                return (
                  <DataCell key={mapName}>
                    {poiForMap ? poiForMap[1] : "-"}
                  </DataCell>
                );
              })}
            </DataRow>
          ))}
        </tbody>
      </Table>

      <Subtitle $mgTop="2rem">Round-by-Round</Subtitle>
      {Object.entries(poisByRound).map(([round, pois]) => (
        <RoundSection key={round}>
          <h2>Round {round}</h2>
          {pois
            .sort((a, b) => a.number_picked - b.number_picked)
            .map((poi) => {
              const team = teamsResults.find(
                (team) => team.id === poi.drafted_by
              );
              const map = mapResults.find((map) => map.id === poi.map_id);

              // Ensure team exists before accessing its properties
              if (team && map) {
                return (
                  <p key={poi.id}>
                    ({poi.number_picked}) {team.team_name} - {poi.poi_name} (
                    {map.map_name})
                  </p>
                );
              } else {
                return null;
              }
            })}
        </RoundSection>
      ))}
    </Container>
  );
}

export default DraftResultsOverview;
