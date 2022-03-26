import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const apiurl = import.meta.env.VITE_APIURL || "http://localhost:8080/api";

interface FormFields {
  name: string;
  code: string;
  unit: string;
  lowerReference: number;
  upperReference: number;
}

export function CreateMeasurement({
  closeDrawer,
  redirect,
}: {
  closeDrawer?: () => void;
  redirect?: boolean;
}) {
  const notifications = useNotifications();
  const navigate = useNavigate();

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
    try {
      const response = await axios.post(`${apiurl}/tests`, values);
      console.log(response.data);
      notifications.showNotification({
        icon: <FaCheck />,
        message: "Measurement created",
        color: "green",
      });
      if (closeDrawer) closeDrawer();
      if (redirect) navigate("/");
    } catch (e) {
      console.error(e);
      notifications.showNotification({
        icon: <FaTimes />,
        message: "Failed to create measurement",
        color: "red",
      });
    }
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
          label="Unit"
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
          <Button type="submit" disabled={!measurementForm.errors}>
            Submit
          </Button>
        </Group>
      </form>
    </Box>
  );
}
