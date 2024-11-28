import React from 'react';
import Skeleton from '../../../../components/common/Skeleton';
import { Link } from 'react-router-dom';
import Card from '../../../../components/grid/Card';
import Banner from '../banner/Banner';
import ItemEmpty from '../itemEmpty/ItemEmpty';

function Home({ loading, productListHome }) {
  const items = [
    {
      label: 'New Women Top',
      to: '/?category=female&category=top',
      data: productListHome?.female_top,
    },
    {
      label: 'New Women Pants',
      to: '/?category=female&category=pants',
      data: productListHome?.female_pants,
    },
    {
      label: 'New Women Dress',
      to: '/?category=female&category=dress',
      data: productListHome?.female_dress,
    },
    {
      label: 'New Men Top',
      to: '/?category=male&category=top',
      data: productListHome?.male_top,
    },
    {
      label: 'New Men Pants',
      to: '/?category=male&category=pants',
      data: productListHome?.male_pants,
    },
  ];

  if (!loading && !productListHome) return <ItemEmpty />;
  return (
    <main className="landing home">
      <div className="wrapper">
        <Banner />
        <div className="landing__container">
          {loading ? (
            <Skeleton />
          ) : (
            items.map(({ label, to, data }) => (
              <section className="landing__home" key={label}>
                <div className="landing__home-top">
                  <h2>{label}</h2>
                  <Link to={to}>show more</Link>
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
      </div>
    </main>
  );
}

export default Home;
