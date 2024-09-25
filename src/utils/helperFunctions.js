// Format date to MM/DD/YYYY
export const formatDate = (dateString) => {
  const date = new Date(dateString + "T00:00:00"); // Append 'T00:00:00' to ensure it's interpreted as local time
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return date.toLocaleDateString(undefined, options);
};

// Format time to HH:MM PM/AM
export const formatTime = (timeString) => {
  const [time] = timeString.split("-");
  const [hours, minutes, seconds] = time.split(":");
  const date = new Date();
  date.setHours(parseInt(hours));
  date.setMinutes(parseInt(minutes));
  date.setSeconds(parseInt(seconds));
  let formattedTime = date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
  return formattedTime;
};

// Convert seconds to minutes
export const formatMinutes = (seconds) => (seconds / 60).toFixed(1);

// Capitalize first letter
export const capitalizeFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const groupData = (sampleData) => {
  return sampleData.reduce((acc, item) => {
    // Create a unique key for each draft
    const draftKey = "draft";

    // Initialize the draft entry if it doesn't exist
    if (!acc[draftKey]) {
      acc[draftKey] = {
        draft_id: item.draft_id,
        draft_created_at: item.draft_created_at,
        draft_name: item.draft_name,
        draft_type: item.draft_type,
        draft_time_per_pick: item.draft_time_per_pick,
        draft_date: item.draft_date,
        draft_time: item.draft_time,
        start_time: item.start_clock,
        send_email: item.send_email,
        turn: item.turn,
        number_of_groups: item.number_of_groups,
        number_of_teams: item.number_of_teams,
        number_of_maps: item.number_of_maps,
        is_draft_complete: item.is_draft_complete,
        admin: item.admin,
        groups: {},
        maps: {},
      };
    }

    // Handle groups
    const groupKey = `${item.group_name}`;
    if (!acc[draftKey].groups[groupKey]) {
      acc[draftKey].groups[groupKey] = {
        group_id: item.group_id,
        group_created_at: item.group_created_at,
        group_name: item.group_name,
        teams: {}, // Add teams here
      };
    }

    // Handle maps
    const mapKey = `${item.map_name}`;
    if (!acc[draftKey].maps[mapKey]) {
      acc[draftKey].maps[mapKey] = {
        map_id: item.map_id,
        map_created_at: item.map_created_at,
        map_name: item.map_name,
        pois: {},
      };
    }

    // Handle POIs
    const poiKey = `${item.poi_name}`;
    acc[draftKey].maps[mapKey].pois[poiKey] = {
      poi_id: item.poi_id,
      poi_created_at: item.poi_created_at,
      poi_name: item.poi_name,
      poi_number: item.poi_number,
    };

    // Handle teams
    if (item.team_id) {
      const teamKey = `${item.team_name}`;
      if (!acc[draftKey].groups[groupKey].teams[teamKey]) {
        acc[draftKey].groups[groupKey].teams[teamKey] = {
          team_id: item.team_id,
          team_created_at: item.team_created_at,
          team_name: item.team_name,
          draft_priority: item.draft_priority,
          team_group_id: item.team_group_id,
          team_draft_id: item.team_draft_id,
          team_owner: item.team_owner,
        };
      }
    }

    return acc;
  }, {});
};
