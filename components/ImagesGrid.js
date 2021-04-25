import Image from 'next/image';
import Link from 'next/link';

export default function ImagesGrid({ imageLink, imageId }) {
  return (
    <div style={{ margin: '10px ' }}>
      <Link>
        <a>
          <Image width={350} height={150} objectFit={'cover'} src={imageLink} />
        </a>
      </Link>
    </div>
  );
}
