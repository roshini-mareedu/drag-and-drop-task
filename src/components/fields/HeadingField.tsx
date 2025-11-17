// import React from "react";

// const HeadingField = ({ field } : any) => {
//   const props = field.properties;

//   const level = Number(props.headingLevel) || 2; // default h2
//   const Tag = `h${level}`; // dynamic HTML heading tag (h1–h6)

//   const headingText = props.value || props.placeholder || "Heading";

//   return (
//     <div className="w-full">

//       <Tag
//         style={{
//           color: props.color,
//           fontFamily: props.fontFamily,
//           textAlign: props.textAlign,
//         }}
//         className="font-semibold"
//       >
//         {headingText}
//       </Tag>

//     </div>
//   );
// };

// export default HeadingField;


import React from "react";

const HeadingField = ({ field }: any) => {
  const props = field.properties;

  const level = Number(props.headingLevel) || 2;
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const headingText = props.value || props.placeholder || "Heading";

  // ShadCN Style Map
  const variantClasses: Record<number, string> = {
    1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
    2: "scroll-m-20 text-3xl font-semibold tracking-tight",
    3: "scroll-m-20 text-2xl font-semibold tracking-tight",
    4: "scroll-m-20 text-xl font-semibold tracking-tight",
    5: "scroll-m-20 text-lg font-medium tracking-tight",
    6: "scroll-m-20 text-base font-medium tracking-tight",
  };

  return (
    <div className="w-full py-2">
      <Tag
        className={variantClasses[level] ?? variantClasses[2]}
        style={{
          color: props.color,
          fontFamily: props.fontFamily,
          textAlign: props.textAlign,
        }}
      >
        {headingText}
      </Tag>
    </div>
  );
};

export default HeadingField;
