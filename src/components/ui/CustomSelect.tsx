import Select from "react-select";
import type { StylesConfig } from "react-select";
import makeAnimated from 'react-select/animated';
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";


type OptionType = {
  label: string;
  value: string;
};

type CustomSelectProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>> = {
  data?: OptionType[],
  field: ControllerRenderProps<TFieldValues, TName>,
  holder: string,
  noOption: string,
  inputId: string
}

const customSelectStyles: StylesConfig<unknown, true> = {
  control: (base, state) => ({
    ...base,
    padding: "0 12px",
    minHeight: "48px",
    borderRadius: 0,
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: state.isFocused ? "#22d3ee" : "#cad5e2",
    boxShadow: "none",

    "&:hover": {
      borderColor: state.isFocused ? "" : "#cad5e2",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '12px 0px 12px 0px',
    margin: 0,
  }),
  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    color: "#374151",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    margin: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  }),
  menu: (base) => ({
    ...base,
    borderRadius: 0,
    color: "#374151",
    fontWeight: "600",
  }),
  option: (style) => ({
    ...style,
    textTransform: 'capitalize'
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#06b6d4',
    borderRadius: '4px',
    padding: '2px',
}),

  multiValueLabel: (base) => ({
    ...base,
    color: '#FFF', 
    fontWeight: 'bold',
    padding: '0 6px',
  }),

  multiValueRemove: (base) => ({
    ...base,
      color: '#0e7490',
    ':hover': {
      backgroundColor: '#a5f3fc', 
      color: '#0e7490',
      cursor:'pointer'
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    cursor: 'pointer',
    color: state.isFocused ? '#0e7490' : '#94a3b8',
    padding: '6px',
    ':hover': {
      color: '#0e7490',
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    color: '#ef4444',
    padding: '6px',
    cursor:'pointer',
    ':hover': {
      color: '#b91c1c', 
    },
  }),
};


export default function CustomSelect<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({data, field, holder, noOption, inputId} : CustomSelectProps<TFieldValues, TName>) {
  const animatedComponents = makeAnimated();
  
  return (
    <Select
      {...field}
      inputId={inputId}
      options={data}
      className="w-full"
      styles={customSelectStyles}
      isMulti
      components={animatedComponents}
      placeholder={holder}
      noOptionsMessage={()=> noOption}
    />
  );
}
