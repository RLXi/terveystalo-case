import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import axios from "axios";

interface FormFields {
  name: string;
  code: string;
  unit: string;
  lowerReference: number;
  upperReference: number;
}

export function CreateMeasurement() {
  const measurementForm = useForm({
    initialValues: {
      name: "",
      code: "",
      unit: "",
      lowerReference: 0,
      upperReference: 0,
    },
    validate: {
      upperReference: (value, otherValues) =>
        value > otherValues.lowerReference ? null : "Invalid value",
      lowerReference: (value, otherValues) =>
        value < otherValues.upperReference ? null : "Invalid value",
    },
  });

  async function handleSubmit(values: FormFields) {
    const response = await axios.post("http://localhost:4000/tests", values);
    console.log(response.data);
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={measurementForm.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Name"
          placeholder="Hemoglobin"
          {...measurementForm.getInputProps("name")}
        />
        <TextInput
          required
          label="Code"
          placeholder="hg"
          {...measurementForm.getInputProps("code")}
        />
        <TextInput
          required
          label="unit"
          placeholder="g/l"
          {...measurementForm.getInputProps("unit")}
        />
        <NumberInput
          required
          label="Lower reference value"
          placeholder="0"
          {...measurementForm.getInputProps("lowerReference")}
        />
        <NumberInput
          required
          label="Upper reference value"
          placeholder="0"
          {...measurementForm.getInputProps("upperReference")}
        />

        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
