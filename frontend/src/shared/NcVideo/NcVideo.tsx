import React, { FC } from "react";
import Image, { ImageProps } from "next/image";

export interface NcVideoProps {
  containerClassName?: string;
  alt?: string;
  src: string;
  max_width?: string
  width?: string
  height?: string
  className?: string
  controls?: boolean;
}

const NcVideo: FC<NcVideoProps> = ({
  containerClassName = "",
  alt = "nc-image",
  src,
  max_width,
  width,
  height,
  controls=false,
  className = "object-cover w-full h-full",
  ...args
}) => {
  return (
    <div className={`${containerClassName} flex justify-center items-center`}> 

    <iframe width={width} max-width={max_width} height={height} src={src} className="m-auto" />
     </div>
  );
};

export default NcVideo;
