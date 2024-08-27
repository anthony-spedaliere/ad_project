import { useSelector } from "react-redux";
import styled from "styled-components";
import { IoReturnUpBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { utils, writeFile } from "xlsx";
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

const ExportButton = styled.button`
  padding: 10px 20px;
  background-color: var(--blue-color);
  color: #fff;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 5px;

  &:hover {
    background-color: #2e38c9;
  }
`;

export const BackButton = styled.button`
  color: ${(props) => props.$customColor || "var(--red-color)"};
  text-decoration: none;
  font-size: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: ${(props) => props.$mgBottom || "0rem"};

  &:hover {
    color: var(--color-grey-400);
  }
`;

function DraftResultsOverview() {
  const poisResults = useSelector((state) => state.draftResults.pois);
  const teamsResults = useSelector((state) => state.draftResults.teams);
  const mapResults = useSelector((state) => state.draftResults.maps);
  const navigate = useNavigate();

  function handleBack() {
    navigate("/dashboard/draft-history");
  }

  // Ensure data is not null or undefined
  if (!poisResults || !teamsResults || !mapResults) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
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
      acc[poi.round_drafted] = acc[poi.round_drafted] || [];
      acc[poi.round_drafted].push(poi);
    }
    return acc;
  }, {});

  function exportToExcel() {
    const overviewData = combined.map((item) => {
      const row = {
        Team: `${item.draft_priority}. ${item.team_name}`,
      };
      uniqueMapNames.forEach((mapName) => {
        const poiForMap = item.poi_and_map.find(([name]) => name === mapName);
        row[`${mapName} POI`] = poiForMap ? poiForMap[1] : "-";
      });
      return row;
    });

    const roundData = [];
    Object.entries(poisByRound).forEach(([round, pois]) => {
      pois.forEach((poi) => {
        const team = teamsResults.find((team) => team.id === poi.drafted_by);
        const map = mapResults.find((map) => map.id === poi.map_id);
        if (team && map) {
          roundData.push({
            Round: round,
            Pick: poi.number_picked,
            Team: team.team_name,
            POI: poi.poi_name,
            Map: map.map_name,
          });
        }
      });
    });

    const ws1 = utils.json_to_sheet(overviewData);
    const ws2 = utils.json_to_sheet(roundData);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws1, "Overview");
    utils.book_append_sheet(wb, ws2, "Round-by-Round");

    writeFile(wb, "DraftResults.xlsx");
  }

  return (
    <Container>
      <BackButton onClick={handleBack} $customColor="var(--blue-color)">
        <IoReturnUpBack />
        Back
      </BackButton>
      <Title>Draft Results</Title>
      <Subtitle>
        Overview{" "}
        <ExportButton onClick={exportToExcel}>Export to Excel</ExportButton>
      </Subtitle>

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
