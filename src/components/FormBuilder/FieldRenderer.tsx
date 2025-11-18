import React from "react";

import TextField from "../fields/TextField";
import SignatureField from "../fields/SignatureField";
import InitialField from "../fields/InitialField";
import NumberField from "../fields/NumberField";
import HeadingField from "../fields/HeadingField";
import ParagraphField from "../fields/ParagraphField";
import CheckboxField from "../fields/CheckboxField";
import CompanyNameField from "../fields/CompanyNameField";
import CurrencyField from "../fields/CurrencyField";
import DateField from "../fields/DateField";
import DateRangeField from "../fields/DateRangeField";
import DateTimeRangeField from "../fields/DateTimeRangeField";
import DropdownField from "../fields/DropdownField";
import EmailField from "../fields/EmailField";
import FileField from "../fields/FileField";
import FixedTimeField from "../fields/FixedTimeField";
import FullNameField from "../fields/FullNameField";
import HorizontalLineField from "../fields/HorizontalLineField";
import ListField from "../fields/ListField";
import MultipleField from "../fields/MultipleField";
import MultilineField from "../fields/MultilineField";
import RadioField from "../fields/RadioField";
import StampField from "../fields/StampField";
import TimeRangeField from "../fields/TimeRangeField";
import TitleField from "../fields/TitleField";
import WeekdaysField from "../fields/WeekdaysField";
import TimeField from "../fields/TimeField";
import MyInitialField from "../fields/MyInitialField";
import MySignatureField from "../fields/MySignatureField";



export type FieldType =
   "text"
   "number"
   "signature"
   "initial"
   "heading"
   "paragraph"
   "checkbox"
   "company_name"
   "currency"
   "date"
   "date_range"
   "date_time_range"
   "dropdown"
   "email"
   "file"
   "fixed_time"
   "full_name"
   "horizontal"
   "list"
   "multiple"
   "multiline"
   "radio"
   "stamp"
   "time_range"
   "title"
   "weekdays"
   "time"
   "my_initial"
   "my_signature";

export interface Field {
  fieldId: string;
  fieldType: FieldType;
  fieldName?: string;
  fieldUniqueKey?: string;
  properties?: Record<string, any>;
  [key: string]: any;
}

const map: Record<FieldType, React.FC<{ field: Field }>> = {
  text: TextField,
  number: NumberField,
  signature: SignatureField,
  initial: InitialField,
  heading: HeadingField,
  paragraph: ParagraphField,
  checkbox: CheckboxField,
  company_name: CompanyNameField,
  currency: CurrencyField,
  date: DateField,
  date_range: DateRangeField,
  date_time_range: DateTimeRangeField,
  dropdown: DropdownField,
  email: EmailField,
  file: FileField,
  fixed_time: FixedTimeField,
  full_name: FullNameField,
  horizontal: HorizontalLineField,
  list: ListField,
  multiple: MultipleField,
  multiline: MultilineField,
  radio: RadioField,
  stamp: StampField,
  time_range: TimeRangeField,
  title: TitleField,
  weekdays: WeekdaysField,
  time: TimeField,
  my_initial: MyInitialField,
  my_signature: MySignatureField,
};

const FieldRenderer = ({ field }: { field: Field }) => {
  const Component = map[field.fieldType];

  if (!Component) {
    return (
      <div className="text-red-500 font-semibold">
         UNKNOWN FIELD TYPE: {field.fieldType}
      </div>
    );
  }

  return <Component field={field} />;
};

export default FieldRenderer;
