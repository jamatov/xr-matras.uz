import React, { useState } from 'react';
import httpClient from '../shared/axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const CreateMattress = () => {
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mattressType, setMattressType] = useState('ANATOMOCHEKIE');
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [sizes, setSizes] = useState([{size: '', price: ''}]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === '' || description === '' ||
      file === null || imagePreview === '' 
    ) {
      toast.error("Bad Request");
      return
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('mattressType', mattressType);
    formData.append('file', file);

    if (sizes.length > 0) {
      sizes.forEach((size, index) => {
        formData.append(`sizes[${index}].size`, size.size);
        formData.append(`sizes[${index}].price`, size.price);
      });
    }

    try {
      await httpClient.post('/api/v1/admin/mattress', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(() => {
        toast.success(`${name} создано успешно`);
        navigate('/admin')
        setName('');
        setDescription('');
        setMattressType('ANATOMOCHEKIE');
        setFile(null);
        setImagePreview(null);
        setSizes([]);
      })
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSizeAdd = () => {
    if (sizes.some((size) => size.size === '' || size.price === '')) {
      toast.error("Размер обязателен")
      return;
    }
    setSizes([...sizes, { size: '', price: '' }]);
  };

  const handleSizeRemove = (index) => {
    const newSizes = [...sizes];
    newSizes.splice(index, 1);
    setSizes(newSizes);
  };

  const handleSizeChange = (index, field, value) => {
    if (value === '') return;
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  return (
    <form className='py-5 admin-form' onSubmit={handleSubmit}>
      <h6> <Link to='/admin'>Назад</Link></h6>
      <label>
        Название:
        <input required className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Описание:
        <textarea
          required
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </label>
      <label>
        Тип матраса:
        <select
          className="form-control"
          value={mattressType}
          onChange={(e) => setMattressType(e.target.value)}>
          <option value="ANATOMOCHEKIE">Анатомический</option>
          <option value="TOPPER">Топпер</option>
          <option value="MILANO">Милано</option>
          <option value="SOFT_MEMRI">Софт мемри</option>
          <option value="PREMIUM">Премиум</option>
          <option value="ARTAPEDIK">Ортопедические</option>

        </select>
      </label>
      <label>
        Файл:
        <input required className="form-control"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      {imagePreview && (
        <div>
          <h3>Просмотр изображения:</h3>
          <img src={imagePreview} alt="Preview" style={{ maxWidth: '300px' }} />
        </div>
      )}
      <div className='col-12 mb-4'></div>
      <h3>Размеры</h3>
      {sizes.map((size, index) => (
        <div key={index}>
          <label>
            Размер:
            <input required className="form-control"
              type="text"
              value={size.size}
              onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
            />
          </label>
          <label>
            Цена:
            <input required className="form-control"
              type="number"
              value={size.price}
              onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
            />
          </label>
          <button className='btn btn-danger'  type="button" onClick={() => handleSizeRemove(index)}>
            Удалять
          </button>
        </div>
      ))}
      <div className='col-12 mb-3'></div>
      <button className='btn btn-warning mb-3' type="button" onClick={handleSizeAdd}>
        Добавить размер
      </button>
      <br />
      <button className='btn btn-success' type="submit">Подтверждение</button>
    </form>
  );
};

export default CreateMattress;