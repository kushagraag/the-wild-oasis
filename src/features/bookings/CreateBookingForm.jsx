import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateBooking";
import { useEditCabin } from "./useEditBooking";
import Checkbox from "../../ui/Checkbox";
import { useCabins } from "../cabins/useCabins";
import { useBookings } from "./useBookings";
import { useRangeBookings } from "./useRangeBookings";

function CreateBookingForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  // console.log(errors);

  const { createCabin, isCreating } = useCreateCabin();

  const { editCabin, isEditing } = useEditCabin();

  // const { data: rangeBookings, isLoading: isRangeBookingsLoading } =
  //   useRangeBookings();

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    if (isEditSession)
      // editCabin(
      //   { newCabinData: { ...data, image }, id: editId },
      //   {
      //     onSuccess: (data) => {
      //       reset();
      //       onCloseModal?.();
      //     },
      //   }
      // );
      console.log(" in edit session");
    // createCabin(
    //   { ...data, image: image },
    //   {
    //     onSuccess: (data) => {
    //       reset();
    //       onCloseModal?.();
    //     },
    //   }
    // );
    else {
      // formatStartEndDates();
      console.log(data, formatStartEndDates());
    }
  }

  function formatStartEndDates() {
    const { startDate, endDate } = getValues();
    const formattedStartDate = new Date(startDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedEndDate = new Date(endDate)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    return { formattedStartDate, formattedEndDate };
  }

  function onError(errors) {
    // console.log(errors);
  }

  function getCurrentDate() {
    const date = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-IN", options);

    // Split the formatted date and rearrange to YYYY-MM-DD
    const [day, month, year] = formattedDate.split("/");
    return `${year}-${month}-${day}`;
  }

  // console.log(rangeBookings(formatStartEndDates()));

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label={"Start date"} error={errors?.name?.message}>
        <Input
          defaultValue={getCurrentDate()}
          min={getCurrentDate()}
          type="date"
          id="startDate"
          disabled={isWorking}
          {...register("startDate", {
            required: "This field is required",
            valueAsDate: true,
          })}
        />
      </FormRow>
      <FormRow label={"End date"} error={errors?.name?.message}>
        <Input
          defaultValue={getCurrentDate()}
          min={getCurrentDate()}
          type="date"
          id="endDate"
          disabled={isWorking}
          {...register("endDate", {
            required: "This field is required",
            valueAsDate: true,
            validate: (value) => value > getValues().startDate,
          })}
        />
      </FormRow>
      {/* fetch available cabins and populate */}
      <FormRow label={"Cabins"} error={errors?.name?.message}>
        <select
          {...register("cabinId", { required: "This field is required" })}
          id="cabinId"
          disabled={isWorking}
          defaultValue={"cabin1"}
        >
          <option value="">Select...</option>
          <option value="cabin1">Cabin 1</option>
          <option value="cabin2">Cabin 2</option>
          <option value="cabin3">Cabin 3</option>
        </select>
      </FormRow>

      <FormRow label={"Guest name"} error={errors?.name?.message}>
        <Input
          defaultValue="g1"
          type="text"
          id="fullName"
          disabled={isWorking}
          {...register("fullName", {
            required: "This field is required",
            maxLength: 24,
          })}
        />
      </FormRow>

      <FormRow label={"Guest Email"} error={errors?.name?.message}>
        <Input
          defaultValue="g1@g1.com"
          type="text"
          id="email"
          disabled={isWorking}
          {...register("email", {
            required: "This field is required",
            maxLength: 24,
          })}
        />
      </FormRow>

      <FormRow label={"Guest nationality"} error={errors?.name?.message}>
        <Input
          defaultValue="IN"
          type="text"
          id="nationality"
          disabled={isWorking}
          {...register("nationality", {
            required: "This field is required",
            maxLength: 24,
          })}
        />
      </FormRow>

      <FormRow label={"Guest national ID"} error={errors?.name?.message}>
        <Input
          defaultValue="1222333"
          type="text"
          id="nationalID"
          disabled={isWorking}
          {...register("nationalID", {
            required: "This field is required",
            maxLength: 24,
          })}
        />
      </FormRow>

      <FormRow label={"Guest country flag"} error={errors?.name?.message}>
        <Input
          defaultValue="in-flag"
          type="text"
          id="countryFlag"
          disabled={isWorking}
          {...register("countryFlag", {
            required: "This field is required",
            maxLength: 24,
          })}
        />
      </FormRow>

      <FormRow label={"Total no of guest"} error={errors?.name?.message}>
        <Input
          defaultValue="2"
          type="number"
          id="numGuests"
          disabled={isWorking}
          {...register("numGuests", {
            required: "This field is required",
            min: 1,
            max: 10, // cabins.maxCapacity
          })}
        />
      </FormRow>

      <FormRow label={"Include breakfast"} error={errors?.name?.message}>
        <Input
          defaultChecked
          type="checkbox"
          id="hasBreakfast"
          disabled={isWorking}
          {...register("hasBreakfast")}
        />
      </FormRow>

      <FormRow label={"Pay now #TOTAL"} error={errors?.name?.message}>
        <Input
          type="checkbox"
          id="isPaid"
          disabled={isWorking}
          {...register("isPaid")}
        />
      </FormRow>

      <FormRow label={"Any additional notes"} error={errors?.name?.message}>
        <Input
          defaultValue="extraass "
          type="text"
          id="observations"
          disabled={isWorking}
          {...register("observations")}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
