import React from 'react';
import Skeleton from '../../../../components/common/Skeleton';
import { Link } from 'react-router-dom';
import Card from '../../../../components/grid/Card';
import Banner from '../banner/Banner';
import ItemEmpty from '../itemEmpty/ItemEmpty';
import ArrowRightIcon from '../../../../assets/icons/ArrowRightIcon';

function Home({ loading, productListHome }) {
  const items = [
    {
      label: 'Women Top',
      to: '/?category=female&category=top',
      data: productListHome?.female_top,
    },
    {
      label: 'Women Pants',
      to: '/?category=female&category=pants',
      data: productListHome?.female_pants,
    },
    {
      label: 'Women Dress',
      to: '/?category=female&category=dress',
      data: productListHome?.female_dress,
    },
    {
      label: 'Men Top',
      to: '/?category=male&category=top',
      data: productListHome?.male_top,
    },
    {
      label: 'Men Pants',
      to: '/?category=male&category=pants',
      data: productListHome?.male_pants,
    },
  ];

  if (!loading && !productListHome) return <ItemEmpty />;
  return (
    <main className="landing home">
      <Banner />
      <div className="wrapper">
        <div className="landing__container">
          {loading ? (
            <Skeleton />
          ) : (
            items.map(({ label, to, data }) => (
              <section className="landing__home" key={label}>
                <div className="landing__home-top">
                  <h2>{label}</h2>
                  <Link to={to}>
                    More <ArrowRightIcon />
                  </Link>
                </div>
                <div className="landing__home-bot">
                  <div className="grid">
                    {data &&
                      data.map((item) => (
                        <Card
                          item={item}
                          key={item._id}
                          name={null}
                          category={null}
                          imgFront={false}
                        />
                      ))}
                  </div>
                </div>
              </section>
            ))
          )}
        </div>
        <article className="landing__gender">
          <Link to={'/?category=female'} className="landing__gender-card">
            <div className="image-container">
              <img
                src="https://res.cloudinary.com/dtcm9xmqh/image/upload/w_800/v1730796150/02b190814a79625291cdb08f64ab94d65bde77c8_eky6fl.jpg"
                alt="women"
              />
            </div>
            <div className="landing__gender-text">
              <div>
                VIEW
                <br />
                WOMEN
                <br />
                CLOTHING
              </div>
            </div>
          </Link>

          <Link to={'/?category=male'} className="landing__gender-card">
            <div className="image-container">
              <img
                src="https://res.cloudinary.com/dtcm9xmqh/image/upload/w_800/v1730817334/e3f221933f379129239811fa4ca45e9f68fa94c1_iebjzs.jpg"
                alt="men"
              />
            </div>
            <div className="landing__gender-text">
              <div>
                VIEW
                <br />
                MEN
                <br />
                CLOTHING
              </div>
            </div>
          </Link>
        </article>
      </div>
    </main>
  );
}

export default Home;
