/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCorrectMattressType, getFilteredSizes, numberFormat, sendFeedback } from "../shared/helper";
import { useEffect, useState } from "react";
import { getMattress } from "../redux/mattressSlice";
import { getAllMattressSize } from "../redux/mattressSizeSlice";
import Loader from "../Components/Loader";
import InputMask from 'react-input-mask'
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function Order() {
    const dispatch = useDispatch()
    const { isLoading, mattress } = useSelector(state => state.mattress)
    const { sizeLoading = isLoading, mattressSizeList } = useSelector(state => state.mattressSize)
    const navigate = useNavigate()


    const location = useLocation();
    const id = location.pathname.split("/")[2];

    const sizes = getFilteredSizes(id, mattressSizeList)

    const [price, setPrice] = useState(sizes[0]?.price ? sizes[0]?.price : 0)
    const [activeSize, setActiveSize] = useState(sizes[0]?.size)
    const [isOpen, setIsOpen] = useState(false)
    const [phone, setPhone] = useState("+998")
    const [name, setName] = useState("")

    // modal mui
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (sizes.length > 0 && price === 0) {
            setPrice(sizes[0].price);
            setActiveSize(sizes[0].size);
        }
    }, [sizes]);

    useEffect(() => {
        dispatch(getMattress(id))
        dispatch(getAllMattressSize())
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (phone.length < 19) {
            toast.error('Номер телефона обязателен')
        } else {
            sendFeedback({ userName: name, phone, name: mattress.name, type: mattress.mattressType, size: activeSize, price })
                .then(() => {
                    setIsOpen(false)
                    navigate('/')
                })
        }
    }
    return (
        <>
            <div className="order py-5">
                <div className="container">
                    <Link to='/продукция'><h4>Назад</h4></Link>
                    <div className="col-12 mb-4"></div>
                    {
                        isLoading ? <Loader />
                            :
                            <div className="row align-center">
                                <div className="col-lg-6">
                                    <img className="w-100" src={mattress?.image} alt="" />
                                </div>
                                <div className="col-lg-6">
                                    <h3 className='matras-name'>{mattress?.name}</h3>
                                    <h4>{getCorrectMattressType(mattress?.mattressType)}</h4>
                                    <h5>{mattress?.description}</h5>
                                    <p>Выберите размер матраса</p>

                                    {
                                        sizeLoading ? <Loader /> :
                                            getFilteredSizes(id, mattressSizeList)?.map(item => (
                                                <div
                                                    id='box-size'
                                                    key={item.id}
                                                    onClick={() => { setActiveSize(item.size); setPrice(item.price) }}
                                                    className={`${activeSize === item.size ? 'active' : ''}`}
                                                    style={{ backgroundColor: activeSize === item.size ? 'blue' : 'silver' }}>
                                                    <h5>{item.size}</h5>
                                                </div>
                                            ))}
                                    <h5 className='price'><span>Цена: </span>{mattress && numberFormat(price)}</h5>
                                    {mattress && <button onClick={() => handleOpen()} className="btn btn-primary">Заказать сейчас</button>}
                                </div>
                            </div>
                    }
                </div>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3 className='mb-4'>Заполните форму и мы позвоним вам ближайший время</h3>
                    <form onSubmit={handleSubmit} className={`myModal ${isOpen ? 'active' : ''}`}>
                        <div className="wrap">
                            <input required value={name} onChange={e => setName(e.target.value)} placeholder="Name" type="text" className="form-control" />
                            <div className="col-12 mb-4"></div>
                            <InputMask
                                id={'status-phone'}
                                placeholder="+998 (_) _ _ _"
                                mask="+998 (99) 999-99-99"
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
                                disabled={false}
                                className={'form-control'}
                            />
                            <div className="col-12 mb-4"></div>

                            <button type="submit" className="btn btn-primary">Отправлять</button>
                        </div>
                        <div onClick={() => setIsOpen(false)} className="outline"></div>
                    </form>
                </Box>
            </Modal>

            
        </>
    )
}
