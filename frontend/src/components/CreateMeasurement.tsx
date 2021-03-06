import { useForm } from "@mantine/form";
import { Box, Button, Group, NumberInput, TextInput } from "@mantine/core";
import { useNotifications } from "@mantine/notifications";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FormFields } from "../interfaces";

const apiurl = import.meta.env.VITE_APIURL || "http://localhost:8080/api";

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
      upperReference: (value, otherValues) => {
        if (!value && value !== 0) return "Value is required";
        return value > otherValues.lowerReference
          ? null
          : "Must be greater than lower reference";
      },
      lowerReference: (value, otherValues) => {
        if (!value && value !== 0) return "Value is required";

        return value < otherValues.upperReference
          ? null
          : "Must be less than upper reference";
      },
    },
  });

  async function handleSubmit(values: FormFields) {
    try {
      await axios.post(`${apiurl}/tests`, values);
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
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}
