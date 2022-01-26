import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import { FC } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { AssertsShape } from 'yup/lib/object'

interface Option {
  label: string
  value: boolean | number | string
}
interface Props {
  register: UseFormRegister<AssertsShape<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string
  options: Option[]
  name: string
}

const RadioGroup: FC<Props> = ({ label, name, options, register }) => (
  <FormControl>
    <FormLabel id={name}>{label}</FormLabel>
    <MuiRadioGroup aria-labelledby={name}>
      {options.map(({ label, value }) => (
        <FormControlLabel
          control={<Radio />}
          key={String(value)}
          label={label}
          value={value}
          {...register(name)}
        />
      ))}
    </MuiRadioGroup>
  </FormControl>
)

export default RadioGroup
