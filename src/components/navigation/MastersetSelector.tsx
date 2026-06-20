import { useState } from "react";

import { mastersetOptions } from "../../data/mastersetOptions";
import { DropdownSelect } from "../ui/DropdownSelect";

const mastersetDropdownOptions = mastersetOptions.map((masterset) => ({
  label: masterset.name,
  value: masterset.id,
}));

export function MastersetSelector() {
  const [selectedMastersetId, setSelectedMastersetId] = useState(
    mastersetOptions[0]?.id ?? "",
  );

  return (
    <DropdownSelect
      label="Select masterset"
      options={mastersetDropdownOptions}
      value={selectedMastersetId}
      onChange={setSelectedMastersetId}
    />
  );
}
