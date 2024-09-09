import React, { useState } from "react";
import axios from "axios";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { CHAT_ID, TOKEN } from "../Constants";

export default function TestForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [model, setModel] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  let text = `Ismi: ${name}.%0ATelefon raqami: ${phone}.%0AXabar : ${model}`;

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
    <section id='Form' className='Form'>
      <div className="container">
        <h2 className='section-tittle'>Оставить заявку</h2>

          <form onSubmit={sendFeedback} action="">
            <div className="row">
              <h3>Оставьте вашу заявку, и наши специалисты свяжутся с вами в ближайшее время.</h3>
              <div className="col-md-6 mb-4">
                <input 
                className="col-12" 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                id="name" placeholder='Имя' />
              </div>
              <div className="col-md-6 mb-4">
                <InputMask
                  className="col-12"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  mask="+998 (99) 999-99-99"
                  maskChar=""
                  id="phone"
                  type="text"
                  placeholder="+998 (_) _ _ _"
                />
              </div>
              <div className="col-12 mb-4">
                <textarea  value={model}
                onChange={(e) => setModel(e.target.value)} className='col-12' name="name" id="name" cols="30" rows="10" placeholder='Опишите Ваше обращение в кратце, мы Вам перезвоним и обсудим детали вместе'></textarea>

              </div>
            </div>
            <button disabled={isLoading} type="submit">
              {" "}
              {isLoading && (
                <i className="spinner-border spinner-border-sm text-white me-2"></i>
              )}
              Заказать
            </button>

          </form>
      </div>
    </section>
  )
}
