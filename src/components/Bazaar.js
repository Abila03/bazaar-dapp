import React, { useState } from 'react';

const Bazaar = ({ bazaarContract, account }) => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');

  const ListItem = async () => {
    try {
      await bazaarContract.methods.ListItem(itemName, itemPrice).send({ from: account });
      alert('Item berhasil terdaftar!');
    } catch (error) {
      console.error('Error listing item:', error);
      alert('Gagal mendaftarkan item. Lihat konsol untuk detail.');
    }
  };

  return (
    <div className="mt-4">
      <h3>List Item</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ListItem();
        }}
        className="mt-3"
      >
        <div className="mb-3">
          <label className="form-label">Nama Item</label>
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nama item"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga Item</label>
          <input
            type="number"
            className="form-control"
            placeholder="Masukkan harga item"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Daftar Item
        </button>
      </form>
    </div>
  );
};

export default Bazaar;
