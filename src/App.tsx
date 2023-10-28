import { z } from 'zod'
import { useId, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Combobox } from './components/Combobox'
import { produce } from 'immer'
import { Listbox } from './components/Listbox'

const formSchema = z.object({
  option: z.string().min(1, 'Too short!').nullable(),
  selection: z.string().min(1, 'Too short!').nullable(),
})

type FormValues = z.infer<typeof formSchema>

export const App = () => {
  const id = useId()

  const [options, setOptions] = useState([
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
  ])

  const [selected, setSelected] = useState<string[]>([])

  const { handleSubmit, control, setValue } = useForm<FormValues>({
    defaultValues: {
      option: null,
      selection: options[0],
    },
    resolver: zodResolver(formSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    setValue('option', '')
    setSelected(produce((draft) => [...draft, data.option]))
    setOptions(
      produce((draft) => draft.filter((option) => option !== data.option))
    )
  }

  const handleUpdate = () => {
    setOptions(produce((draft) => [...draft, 'New option']))
    setValue('selection', options[3])
  }

  return (
    <div className="grid gap-2">
      <form id={id} onSubmit={handleSubmit(onSubmit)}>
        <Combobox<FormValues>
          name="option"
          label="Options"
          placeholder="Choose or search an option"
          control={control}
          options={options}
        />
        <Listbox<FormValues>
          name="selection"
          label="Options"
          placeholder="Choose or search an option"
          control={control}
          options={options}
        />
      </form>
      <div>
        <button
          type="submit"
          form={id}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Submit
        </button>
      </div>
      <div>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
      {selected.length > 0 && (
        <ul>
          {selected.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
