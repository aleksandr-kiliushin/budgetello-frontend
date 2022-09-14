import { FormHelperText } from "@mui/material"
import FormControl from "@mui/material/FormControl"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormLabel from "@mui/material/FormLabel"
import Radio from "@mui/material/Radio"
import MuiRadioGroup from "@mui/material/RadioGroup"
import { FC } from "react"
import { UseFormRegister } from "react-hook-form"
import { AssertsShape } from "yup/lib/object"

interface Option {
  label: string
  value: number | string
}
interface Props {
  fieldValue: Option["value"]
  helperText: string | undefined
  label: string
  name: string
  options: Option[]
  register: UseFormRegister<AssertsShape<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
  setValue(fieldName: string, newValue: string | number): void
}

const RadioGroup: FC<Props> = ({ fieldValue, helperText, label, name, options, register, setValue }) => {
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

export default RadioGroup
