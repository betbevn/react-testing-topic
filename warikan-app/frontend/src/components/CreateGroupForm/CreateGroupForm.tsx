import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  VStack,
} from "@chakra-ui/react";
import { groupSchema } from "../../schema/group";

// Define the types of variables used in the form
export interface formInputs {
  name: string;
  members: string;
}

interface CreateGroupFormProps {
  onSubmit: (data: formInputs) => Promise<void>;
}

const CreateGroupForm: React.FC<CreateGroupFormProps> = ({ onSubmit }) => {
  // React Hook Form. This is necessary to write validation and processing when the form is submitted.
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<formInputs>({
    resolver: zodResolver(groupSchema),
  });

  // What to do when the form is submitted
  const onSubmitForm = handleSubmit(async (data) => {
    try {
      await onSubmit(data);
      console.info("Registration successful");
      reset();
    } catch (e) {
      console.error(e);
      window.alert("Registration failed");
    }
  });

  return (
    <VStack maxW={"600px"}>
      <form onSubmit={onSubmitForm} style={{ width: "60%" }}>
        <FormControl mb={5} isInvalid={Boolean(errors.name)}>
          <FormLabel htmlFor="name">Group Name</FormLabel>
          <Input id="name" placeholder="旅行" {...register("name")} />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl mb={10} isInvalid={Boolean(errors.members)}>
          <FormLabel htmlFor="members">Members</FormLabel>
          <Input
            id="members"
            placeholder="太郎, 花子"
            {...register("members")}
          />
          <FormErrorMessage>
            {errors.members && errors.members.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="green"
          isLoading={isSubmitting}
          type="submit"
          w={"full"}
        >
          Create a group
        </Button>
      </form>
    </VStack>
  );
};

export default CreateGroupForm;
