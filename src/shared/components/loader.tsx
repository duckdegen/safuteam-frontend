import Image from 'next/image';
import { memo } from 'react';

const Loader = () => (
  <div className="relative h-16 w-16">
    <div className="absolute left-0 top-0 animate-spin">
      <div className="h-16 w-16">
        <Image src="/logo.png" height={300} width={300} alt="" />
      </div>
    </div>
  </div>
);

export default memo(Loader);
