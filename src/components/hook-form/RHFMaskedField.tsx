// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
// imask
import { IMaskInput } from 'react-imask';
// react
import React from 'react';
// ----------------------------------------------------------------------

export type Definitions = {
    [k: string]: RegExp;
};

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
    mask: string;
};

const TextMaskCustom = React.forwardRef<HTMLInputElement, CustomProps>(
    function TextMaskCustom(props, ref) {
        const { onChange, mask, ...other } = props;
        return (
            <IMaskInput
                {...other}
                mask={mask}
                inputRef={ref}
                onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
                overwrite
            />
        );
    },
);

export default function RHFMaskedField({ name, mask, ...other }:  {name: string, mask: string} & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField 
            {...field} 
            fullWidth 
            error={!!error} 
            helperText={error?.message} 
            {...other} 
            InputProps={{
                inputComponent: TextMaskCustom as any,
                inputProps: {
                    mask
                }
            }}
        />
      )}
    />
  );
}