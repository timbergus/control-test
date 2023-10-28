import classNames from 'classnames'
import { Listbox as HeadlessListbox } from '@headlessui/react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/20/solid'

type ListboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  label?: string
  placeholder?: string
  options: string[]
  control: Control<TFieldValues>
}

export function Listbox<T extends FieldValues>({
  name,
  label,
  placeholder,
  options,
  control,
}: ListboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <HeadlessListbox value={value} onChange={onChange}>
          {({ open }) => (
            <>
              {label && (
                <HeadlessListbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                  {label}
                </HeadlessListbox.Label>
              )}
              <div className="relative mt-2">
                <HeadlessListbox.Button
                  placeholder={placeholder}
                  className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <span className="block truncate">{value}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </HeadlessListbox.Button>
                <HeadlessListbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option) => (
                    <HeadlessListbox.Option
                      key={option}
                      className={({ active }) =>
                        classNames(
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <>
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'block truncate'
                            )}
                          >
                            {option}
                          </span>

                          {selected ? (
                            <span
                              className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                              )}
                            >
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </HeadlessListbox.Option>
                  ))}
                </HeadlessListbox.Options>
              </div>
              {error && (
                <p className="text-sm font-medium text-red-800">
                  {error?.message}
                </p>
              )}
            </>
          )}
        </HeadlessListbox>
      )}
    />
  )
}
