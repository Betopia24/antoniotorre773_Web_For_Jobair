import React from 'react'

interface HeadingProps {
  heading: string
  subheading?: string
  align?: 'center' | 'left' | 'right'
  specialText?: string
}

const Heading: React.FC<HeadingProps> = ({
  heading,
  subheading,
  align = 'center',
  specialText,
}) => {
  // Alignment classes
  const alignClass = align === 'center' ? 'text-center' : align === 'left' ? 'text-left' : 'text-right'

  return (
    <div className={`flex flex-col w-full ${alignClass} gap-2`}>
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-snug">
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
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-300 max-w-3xl mx-auto">
          {subheading}
        </p>
      )}
    </div>
  )
}

export default Heading
