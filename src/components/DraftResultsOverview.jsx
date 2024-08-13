import { useSelector } from "react-redux";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const HeaderRow = styled.tr`
  background-color: #f0f0f0;
`;

const HeaderCell = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const DataRow = styled.tr``;

const DataCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

function DraftResultsOverview() {
  const poisResults = useSelector((state) => state.draftResults.pois);
  const teamsResults = useSelector((state) => state.draftResults.teams);
  const mapResults = useSelector((state) => state.draftResults.maps);

  // Create the combined array
  const combined = teamsResults.map((team) => {
    const teamPois = poisResults.filter((poi) => poi.drafted_by === team.id);

    const poiAndMap = teamPois.map((poi) => {
      const map = mapResults.find((map) => map.id === poi.map_id);
      return [map?.map_name, poi.poi_name];
    });

    return {
      draft_priority: team.draft_priority,
      team_name: team.team_name,
      poi_and_map: poiAndMap,
    };
  });

  // Get unique map names for the header
  const uniqueMapNames = [...new Set(mapResults.map((map) => map.map_name))];

  return (
    <Container>
      <Title>Draft Results</Title>
      <Table>
        <thead>
          <HeaderRow>
            <HeaderCell>Teams</HeaderCell>
            {uniqueMapNames.map((mapName) => (
              <HeaderCell key={mapName}>{mapName}</HeaderCell>
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
    </Container>
  );
}

export default DraftResultsOverview;
