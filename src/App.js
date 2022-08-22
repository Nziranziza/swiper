import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper';

function App() {
  const [loading, setLoading] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/photos?_limit=6'
        );
        const photos = await res.json();
        setPhotos(photos);
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className='container'>
      <h1>Custom Swiper with Swiper</h1>
      {Boolean(error) && !loading && <p>Something went wrong! Try again later</p>}
      {loading ? <p>Loading...</p> :
        <div>
          <Swiper
            spaceBetween={20}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            onSwiper={setThumbsSwiper}
            className='thumbnail'
          >
            {photos.map(({ title, thumbnailUrl }) => (
              <SwiperSlide>
                <img src={thumbnailUrl} alt={title} />
                <span className="thumbnail__title">{title.split(' ')[0]}</span>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            loop={true}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className='preview'
          >
            {photos.map(({ title, url }) => (
              <SwiperSlide>
                <img src={url} alt={title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>}
    </div>
  );
}

export default App;
