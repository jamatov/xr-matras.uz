/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, } from "react-router-dom";
import { getMattress } from "../redux/mattressSlice";
import Loader from "./Loader";
import { getAllMattressSize } from "../redux/mattressSizeSlice";
import { getCorrectMattressType, getFilteredSizes, numberFormat } from "../shared/helper";

export default function MattressDetail() {
    const dispatch = useDispatch()
    const { isLoading, mattress } = useSelector(state => state.mattress)
    const { sizeLoading = isLoading, mattressSizeList } = useSelector(state => state.mattressSize)

    const location = useLocation();
    const id = location.pathname.split("/")[3];

    const sizes = getFilteredSizes(id, mattressSizeList)

    useEffect(() => {
        dispatch(getMattress(id))
        dispatch(getAllMattressSize())
    }, [])
    return (
        <div className="mattressDetail py-5">
            <div className="container">
                <Link to='/admin'>Назад</Link>
                {
                    isLoading ? <Loader />
                        :
                        <div className="row">
                            <div className="col-lg-6">
                                <img className="w-100" src={mattress?.image} alt="" />
                            </div>
                            <div className="col-lg-6">
                                <h3>{mattress?.name}</h3>
                                <h6>{getCorrectMattressType(mattress?.mattressType)}</h6>
                                <p>{mattress?.description}</p>
                                {
                                    sizeLoading ? <Loader /> :
                                        !!sizes && sizes.map(item => (
                                            <div>
                                                <h5>{item.size} - {numberFormat(item.price)} </h5>
                                            </div>
                                        ))}
                            </div>
                        </div>
                }
            </div>
        </div>
    )
}
