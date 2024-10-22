import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { expenseSchema } from "../../schema/expense";
import { Group } from "../../type";

export interface formInputs {
  expenseName: string;
  amount: number;
  payer: string;
}

interface CreateExpenseFormProps {
  group: Group;
  onSubmit: (data: formInputs) => Promise<void>;
}

const CreateExpenseForm: React.FC<CreateExpenseFormProps> = ({
  group,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<formInputs>({
    resolver: zodResolver(expenseSchema),
  });

  const onSubmitFrom = async (data: formInputs) => {
    const postData = {
      ...data,
      groupName: group.name,
    };

    try {
      await onSubmit(postData);
      console.info("Registration successful");
      reset();
    } catch (e) {
      console.error(e);
      window.alert("Registration failed");
    }
  };

  return (
    <VStack w={"full"} maxW={"600px"}>
      <form onSubmit={handleSubmit(onSubmitFrom)} style={{ width: "60%" }}>
        <VStack>
          <FormControl mb={5} isInvalid={Boolean(errors.expenseName)}>
            <FormLabel>Expense Name</FormLabel>
            <Input type="text" {...register("expenseName")} />
            <FormErrorMessage>
              {errors.expenseName && errors.expenseName.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={5} isInvalid={Boolean(errors.amount)}>
            <FormLabel>Amount</FormLabel>
            <Input type="number" {...register("amount")} />
            <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb={5} isInvalid={Boolean(errors.payer)}>
            <FormLabel>Paying Member</FormLabel>
            <Select placeholder="please select" {...register("payer")}>
              {group.members.map((member) => (
                <option value={member} key={member}>
                  {member}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.payer?.message}</FormErrorMessage>
          </FormControl>
          <Button
            colorScheme="green"
            isLoading={isSubmitting}
            type="submit"
            w={"full"}
            m={5}
          >
            Register your expenses
          </Button>
        </VStack>
      </form>
    </VStack>
  );
};

export default CreateExpenseForm;
