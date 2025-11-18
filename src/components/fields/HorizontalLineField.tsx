interface Field{
  fieldId: string;
  fieldType: string;
  properties: any;
}
const HorizontalLineField = ({ field } : {field:Field}) => {
  const props = field.properties;

  return (
    <div className="w-full my-2">
      <hr
        style={{
          width: props.lineWidth,
          borderColor: props.lineColor,
          opacity: props.opacity,
          borderStyle: props.lineStyle,
          borderWidth: props.thickness,
        }}
      />
    </div>
  );
};

export default HorizontalLineField;
