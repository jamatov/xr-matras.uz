import React, {useState} from 'react'
import axios from "axios";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { CHAT_ID, TOKEN } from "../Constants/index.js";
import { ToastContainer } from "react-toastify";


export default function SectionForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [isLoading, setIsLoading] = useState(false);

  let text = `Ismi: ${name}.%0ATelefon raqami: ${phone}.`;

  const sendFeedback = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (phone.length !== 19) {
      toast.error("Требуется номер телефона. Попробуйте еще раз.");
      setIsLoading(false);
    } else {
      const { data } = axios.post(
        `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${text}`
      );

      toast.success(`Завершено успешно. Дождитесь обратного звонка!`);
      setIsLoading(false);
      setName("");
      setPhone("+998");
    }
  };


  return (
    <section className='SectionForm'>
      <div className="container">
        <form onSubmit={sendFeedback} action="">
          <h2>Не знаете, какую модель выбрать?</h2>
          <h3>Оставьте заявку, проконсультируем вас в течение 20 минут</h3>
          <div className='form-inputs'>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              id="name"  type="text" placeholder='Ваше имя'/>
              <InputMask value={phone}
                onChange={(e) => setPhone(e.target.value)}
                mask="+998 (99) 999-99-99"
                maskChar=""
                id="phone"
                type="text"
                placeholder="+998 (_) _ _ _"/>
            <button disabled={isLoading}  type='submit'>
            {" "}
              {isLoading && (
                <i className="spinner-border spinner-border-sm text-white me-2"></i>
              )}Отправить</button>

          </div>

        </form>
      </div>
    </section>
  )
}
