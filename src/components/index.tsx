import FieldsData from "@/data/fields";
import FormBuilder from "./FormBuilder/FormBuilder";

export default function Main() {
  return <FormBuilder fields={FieldsData} />;
}
