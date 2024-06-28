import { useForm } from "react-hook-form";
import FormRow from "../ui/FormRow";
import StyledInput from "../ui/StyledInput";

function UsernameCreationPage() {
  const { register } = useForm();

  return (
    <div>
      <FormRow
        label="Username (Maximum 20 characters. Spaces not allowed.)"
        error={""}
      >
        <StyledInput
          type="text"
          id="username"
          disabled={""}
          {...register("username", {
            required: "This field is required.",
            maxLength: {
              value: 20,
              message: "Username can be a maximum of 20 characters.",
            },
            pattern: {
              value: /^\S*$/,
              message: "No spaces allowed in the username.",
            },
          })}
        />
      </FormRow>
    </div>
  );
}

export default UsernameCreationPage;
