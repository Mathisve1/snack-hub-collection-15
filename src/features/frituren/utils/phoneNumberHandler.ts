
export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  field: any
) => {
  // Accept any input - no restrictions
  field.onChange(e.target.value);
};
