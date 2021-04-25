import Head from 'next/head';
import { useState } from 'react';
import ImagesGrid from '../components/ImagesGrid';

export default function Home({ images }) {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(images);

  return (
    <div className='container'>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>
        <input
          type='search'
          placeholder='search'
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={async () => {
            const res = await fetch(
              `https://images-api.nasa.gov/search?media_type=image&q=${search}`
            );
            const data = await res.json();
            setSearchResult(await data.collection.items);
          }}
        >
          Search
        </button>
      </div>

      <main className='content'>
        {searchResult &&
          searchResult.map((el) => (
            <ImagesGrid
              key={el.data[0].nasa_id}
              imageLink={el.links[0].href}
              imageId={el.data[0].nasa_id}
            />
          ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    'https://images-api.nasa.gov/search?media_type=image'
  );
  const data = await res.json();
  const images = await data.collection.items;

  return {
    props: {
      images,
    },
  };
}
