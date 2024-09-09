import React from 'react'
import { NavLink } from 'react-router-dom'
import img from '../Images/footer-logo.svg'

export default function Footer() {
  return (
    <footer className='Footer'>
      <div className="container">
        <div className='footer-body'>
          <img src={img} alt="logo" />
          <ul>
            <li><NavLink to="/">Главная</NavLink></li>
            <li><NavLink to="/онас">О нас</NavLink></li>
            <li><NavLink to="/продукция">Продукция</NavLink></li>
            <li><NavLink to="/контакты">Контакты</NavLink></li>
          </ul>
        </div>
        <div className='footer-bottom'>
          <p className='brand'>XR MATRAS © 2024</p>
          <p>Разработка и реклама <a href="https://www.instagram.com/webmarketing.uz/" target='_blank'>WEB MARKETING</a></p>
        </div>
      </div>
    </footer>
  )
}
