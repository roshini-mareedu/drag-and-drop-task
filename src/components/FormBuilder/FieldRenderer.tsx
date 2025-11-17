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

const FieldRenderer = ({ field } : any) => {
  const map = {
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

  const Component = map[field.fieldType];
  if (!Component) return <div className="text-red-500">UNKNOWN FIELD TYPE: {field.fieldType}</div>;

  return <Component field={field} />;
};

export default FieldRenderer;
