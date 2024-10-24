import { useNavigate } from "react-router-dom";
import CreateGroupForm, {
  formInputs,
} from "../CreateGroupForm/CreateGroupForm";
import { useApi } from "../../hooks/useApi";
import { Container } from "@chakra-ui/react";

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const { postData: postGroup } = useApi(
    `${import.meta.env.VITE_API_BASE_URL}/groups`
  );

  // What to do when the form is submitted
  const onSubmit = async (data: formInputs) => {
    try {
      await postGroup(data, `${import.meta.env.VITE_API_BASE_URL}/groups`);
      navigate(`/group/${data.name}`);
    } catch (err) {
      console.error(err);
      throw new Error("Group creation failed");
    }
  };

  return (
    <Container m={6}>
      <CreateGroupForm onSubmit={onSubmit} />
    </Container>
  );
};

export default CreateGroupPage;
