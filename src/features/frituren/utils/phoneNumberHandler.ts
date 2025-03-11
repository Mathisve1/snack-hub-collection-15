
export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>, 
  field: any
) => {
  let value = e.target.value.replace(/\D/g, '');
  
  if (!value) {
    field.onChange('');
    return;
  }
  
  if (!value.startsWith('32')) {
    value = '32' + value;
  }
  
  value = value.slice(0, 10);
  field.onChange(value);
};
