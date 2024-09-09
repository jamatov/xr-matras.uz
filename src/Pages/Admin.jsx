/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteMattress, getAllMattress } from "../redux/mattressSlice";
import Loader from "../Components/Loader";
import { logout } from "../redux/authSlice";
import { toast } from "react-toastify";
import { getCorrectMattressType } from "../shared/helper";

export default function Admin() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { isLoading, mattressList } = useSelector((state) => state.mattress);

  const handleDelete = (id) => {
    dispatch(deleteMattress(id))
      .then(() => {
        dispatch(getAllMattress());
      })
  }

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login')
    toast.warning(`Вы вышли из системы`)
  }

  useEffect(() => {
    dispatch(getAllMattress());
  }, []);
  return (
    <div className="admin py-5">
      <div className="container">
        <div className="row pb-5">
          <div className="col-12 d-flex align-items-center justify-content-between">
            <h3>Матрасы</h3>
            <div className="d-flex align-items-center gap-2">
              <Link className="btn btn-success" to="/admin/add">
                Добавить Матрас
              </Link>
              <button onClick={handleLogout} className="btn btn-danger">
                ВЫХОД
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          {isLoading ? (
            <Loader />
          ) : (
            !!mattressList && mattressList.map((mattress) => (
              <div key={mattress.id} className="col-lg-3 col-md-6 col-sm-12 mb-5">
                <div className="card h-100">
                  <img
                    src={mattress.image}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{mattress.name}</h5>
                    <h6>{getCorrectMattressType(mattress.mattressType)}</h6>
                    <p className="card-text">{mattress.description}</p>

                    <button onClick={() => handleDelete(mattress.id)} className="btn btn-outline-danger">Удалить</button>
                    <Link to={`/admin/detail/${mattress.id}`} className="btn btn-primary">
                      Посмотреть
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
