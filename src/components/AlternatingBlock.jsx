import React from "react";

const AlternatingBlock = ({
  image,
  title,
  text,
  children,
  imageLeft = true,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row ${
        !imageLeft ? "md:flex-row-reverse" : ""
      } w-full items-stretch h-auto overflow-hidden contain-layout`}
    >
      <div className="w-full md:w-1/2 md:h-auto max-h-full flex group overflow-hidden relative min-h-[300px] sm:min-h-0">
        <img
          src={image}
          alt={title ? `${title} - Akdeniz Restoran` : "Akdeniz Restoran"}
          width="800"
          height="600"
          loading="lazy" 
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 select-none"
        />
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-12 md:p-20 bg-primary">
        {title && (
          <h2 className="text-2xl md:text-3xl font-medium pl-[0.1em] tracking-widest text-accent mb-8 uppercase">
            {title}
          </h2>
        )}

        {children ? (
          <div className="w-full max-w-2xl">{children}</div>
        ) : (
          <p className="text-text font-light leading-relaxed max-w-md text-sm md:text-base">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default React.memo(AlternatingBlock);