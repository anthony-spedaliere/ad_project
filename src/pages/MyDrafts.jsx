// style imports
import supabase from "../services/supabase";
import { DashboardContentContainer } from "../styles/DashboardStyles";

// const deleteUser = async (userId) => {
//   try {
//     const { data, error } = await supabase.auth.admin.deleteUser(userId);

//     if (error) {
//       throw new Error(error.message);
//     }

//     console.log("User deleted successfully:", data);
//     return data;
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     throw error; // Re-throw the error for further handling if needed
//   }
// };

// const userId = "0ee77654-ed50-44fd-b5b9-c67679b68422";

function MyDrafts() {
  // deleteUser(userId)
  //   .then((data) => console.log("User deletion successful:", data))
  //   .catch((error) => console.error("Error occurred:", error));

  return (
    <DashboardContentContainer>
      <h1>My Drafts</h1>
    </DashboardContentContainer>
  );
}

export default MyDrafts;
