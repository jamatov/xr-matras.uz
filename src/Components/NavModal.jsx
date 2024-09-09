import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';

export default function NavModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='NavModal'
    >
      <Modal.Header className='modal-head' closeButton>
      
      </Modal.Header>
      <Modal.Body className='modal-body'>
        <ul className='modal-nav'>
          <li><NavLink className={({isActive}) => isActive ? 'active' : ''} onClick={props.onHide}  to="/">Главная</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'active' : ''} onClick={props.onHide} to="/онас">О нас</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'active' : ''} onClick={props.onHide} to="/продукция">Продукция</NavLink></li>
          <li><NavLink className={({isActive}) => isActive ? 'active' : ''} onClick={props.onHide} to="/контакты">Контакты</NavLink></li>
        </ul>
      </Modal.Body>
      
    </Modal>
  )
}
