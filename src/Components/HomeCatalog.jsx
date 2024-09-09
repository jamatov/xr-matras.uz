/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllMattress } from '../redux/mattressSlice';
import Loader from './Loader';
import { getCorrectMattressType } from '../shared/helper';
import { Link } from 'react-router-dom';

export default function HomeCatalog() {
  const dispatch = useDispatch();
  const { isLoading, mattressList } = useSelector((state) => state.mattress);

  useEffect(() => {
    dispatch(getAllMattress());
  }, []);

  return (
    <section className='HomeCatalog' >
      <div className="container">
        <h2>Наши матрасы</h2>
        <div className="row">
          {isLoading ? <Loader /> :
            mattressList.length > 0 && mattressList.map((item) => (
              <div key={item.id} className="col-6 col-md-3 mb-5">
                <div className="card h-100">
                  <img src={item?.image} alt="card-img" />
                  <div className="card-body">
                    <h5>{item.name}</h5>
                    <h3>{getCorrectMattressType(item.mattressType)}</h3>
                    <Link to={`/order/${item.id}`}>Заказать</Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>

  )
}
