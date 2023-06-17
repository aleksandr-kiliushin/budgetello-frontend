import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from "@mui/material"
import { FC } from "react"
import { UseFormRegister } from "react-hook-form"

type TRadioGroupOption = {
  label: string
  value: number | string
}
type TRadioGroupProps = {
  fieldValue: TRadioGroupOption["value"]
  helperText: string | undefined
  label: string
  name: string
  options: TRadioGroupOption[]
  register: UseFormRegister<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  setValue(fieldName: string, newValue: string | number): void
}

export const RadioGroup: FC<TRadioGroupProps> = ({
  fieldValue,
  helperText,
  label,
  name,
  options,
  register,
  setValue,
}) => {
  return (
    <FormControl>
      <FormLabel id={name}>{label}</FormLabel>
      <MuiRadioGroup aria-labelledby={name}>
        {options.map(({ label, value }) => (
          <FormControlLabel
            {...register(name, { valueAsNumber: typeof value === "number" })}
            checked={String(value) === String(fieldValue)}
            control={<Radio />}
            key={String(value)}
            label={label}
            // onChange={() => setValue(name, value)}
            value={value}
          />
        ))}
      </MuiRadioGroup>
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  )
}
