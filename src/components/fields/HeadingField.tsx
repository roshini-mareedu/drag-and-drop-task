const HeadingField = ({ field } : any) => {
  const props = field.properties;

  const level = Number(props.headingLevel) || 2; 
  const Tag = `h${level}`; 

  const headingText = props.value || props.placeholder || "Heading";

  return (
    <div className="w-full">

      <Tag
        style={{
          color: props.color,
          fontFamily: props.fontFamily,
          textAlign: props.textAlign,
        }}
        className="font-semibold"
      >
        {headingText}
      </Tag>

    </div>
  );
};

export default HeadingField;

