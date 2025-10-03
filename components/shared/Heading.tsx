import React from "react";

interface HeadingProps {
  heading: string;
  subheading?: string;
  align?: "center" | "left" | "right";
  specialText?: string;
}

const Heading: React.FC<HeadingProps> = ({
  heading,
  subheading,
  align = "center",
  specialText,
}) => {
  const textAlignClass =
    align === "center"
      ? "text-center"
      : align === "left"
      ? "text-left"
      : "text-right";

  // Center container if align=center
  const containerClass = align === "center" ? "mx-auto" : "";

  return (
    <div className={`flex flex-col w-full gap-2`}>
      {/* Heading container */}
      <div className={`max-w-4xl ${containerClass}`}>
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-semibold leading-none ${textAlignClass}`}>
          {specialText && heading.includes(specialText) ? (
            <>
              {heading.split(specialText)[0]}
              <span className="text-gradient">{specialText}</span>
              {heading.split(specialText)[1]}
            </>
          ) : (
            heading
          )}
        </h1>

        {/* Subheading */}
        {subheading && (
          <p className={`mt-3 text-base sm:text-lg md:text-xl font-semibold text-gray-300 ${textAlignClass}`}>
            {subheading}
          </p>
        )}
      </div>
    </div>
  );
};

export default Heading;
