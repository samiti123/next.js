import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ImageDetail({ image }) {
  console.log(image);
  const router = useRouter();
  if (!router.isFallback && !image) {
    return <div>Image not found</div>;
  }

  return (
    <div className='container'>
      <div>
        <Link href='/'>
          <a>
            <button>Go Back</button>
          </a>
        </Link>
        {router.isFallback ? (
          <div>Loading...</div>
        ) : (
          <div>
            <img width={1000} height={800} src={image} />
          </div>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const imgID = params.id;
  const res = await fetch(`https://images-api.nasa.gov/asset/${imgID}`);
  const data = await res.json();
  const image = await data.collection.items[0].href;

  return {
    props: {
      image,
    },
  };
}

export async function getStaticPaths() {
  const res = await fetch(
    'https://images-api.nasa.gov/search?media_type=image'
  );
  const data = await res.json();
  const images = await data.collection.items;

  return {
    paths:
      (images &&
        images.map((el) => ({
          params: {
            id: el.data[0].nasa_id,
          },
        }))) ||
      [],
    fallback: true,
  };
}
