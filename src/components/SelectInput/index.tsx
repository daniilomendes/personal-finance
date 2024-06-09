import { ChangeEvent, useId } from "react";
import { Container, Label, Select } from "./style";

type Props = {
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
};

const SelectInput = ({ value, onChange, options, label }: Props) => {
  const referenceId = useId();

  return (
    <Container>
      {label && <Label htmlFor={referenceId}>{label}</Label>}
      <Select id={referenceId} value={value} onChange={onChange}>
        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default SelectInput;
