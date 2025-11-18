interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const ParagraphField = ({ field } : {field:Field}) => {
  const props = field.properties;

  const paragraphText = props.value || props.placeholder || "Paragraph text";

  return (
    <p
      style={{
        fontSize: props.fontsize,
        color: props.color,
        fontFamily: props.fontFamily,
        textAlign: props.textAlign,
      }}
      className="leading-relaxed"
    >
      {paragraphText}
    </p>
  );
};

export default ParagraphField;
