import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from "@mui/material"
import { UseFormRegister } from "react-hook-form"
import { AssertsShape } from "yup/lib/object"

interface IRadioGroupOption {
  label: string
  value: number | string
}
interface IRadioGroupProps {
  fieldValue: IRadioGroupOption["value"]
  helperText: string | undefined
  label: string
  name: string
  options: IRadioGroupOption[]
  register: UseFormRegister<AssertsShape<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
  setValue(fieldName: string, newValue: string | number): void
}

export const RadioGroup: React.FC<IRadioGroupProps> = ({
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
