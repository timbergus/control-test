import Fuse from 'fuse.js'
import classNames from 'classnames'
import { useState } from 'react'
import { Combobox as HeadlessCombobox } from '@headlessui/react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'

type ComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  label?: string
  placeholder?: string
  options: string[]
  control: Control<TFieldValues>
}

export function Combobox<T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
}: ComboboxProps<T>) {
  const fuse = new Fuse(options)

  const [query, setQuery] = useState('')

  const filteredOptions =
    query === ''
      ? options.map((item, refIndex) => ({ item, refIndex }))
      : fuse.search(query.toLowerCase())

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <HeadlessCombobox
          as="div"
          value={value}
          onChange={onChange}
          disabled={!options.length}
        >
          <div className="grid gap-y-1">
            {label && (
              <HeadlessCombobox.Label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
              </HeadlessCombobox.Label>
            )}
            <div className="relative">
              <HeadlessCombobox.Input
                className="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
              />
              <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </HeadlessCombobox.Button>
              {filteredOptions.length > 0 && (
                <HeadlessCombobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.map((option) => (
                    <HeadlessCombobox.Option
                      key={option.item}
                      value={option.item}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <span
                            className={classNames(
                              'block truncate',
                              selected && 'font-semibold'
                            )}
                          >
                            {option.item}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                'absolute inset-y-0 right-0 flex items-center pr-4',
                                active ? 'text-white' : 'text-indigo-600'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </>
                      )}
                    </HeadlessCombobox.Option>
                  ))}
                </HeadlessCombobox.Options>
              )}
            </div>
            {error && (
              <p className="text-sm font-medium text-red-800">
                {error?.message}
              </p>
            )}
          </div>
        </HeadlessCombobox>
      )}
    />
  )
}
