import React, { useState, useEffect } from "react";
import AddClientModal from "../components/Cadastro/AddClientModal";
import { nanoid } from "nanoid";
import EditClientModal from "../components/Cadastro/EditClientModal";

export default function Cadastro() {
  // shows a the default list of clients
  const initialList = [
    {
      id: "a",
      name: "Fernando Pava",
      cpf: "487.290.978-00",
      email: "fernando.pava@hotmail.com",
      empresa: "Indico",
      cnpj: "12.345.678/9000-12",
      nivel: "client",
    },
    {
      id: "b",
      name: "Pava Fernando",
      cpf: "487.290.978-00",
      email: "pava.fernando@hotmail.com",
      empresa: "Indico",
      cnpj: "12.345.678/9000-12",
      nivel: "client",
    },
  ];
  // list of users (default)
  const [list, setList] = React.useState(initialList);

  const handleAdd = (args: any) => {
    const newList = [...list];
    args.id = nanoid();
    newList.push(args);
    setList(newList);
    console.log(newList);
  };

  // delete button
  const removeElement = (id: string) => {
    const newList = list.filter((item) => item.id != id);
    setList(newList);
  };

  // edit button
  const editElement = (updatedItem: any) => {
    let newList = [...list].map((item) => {
      if (item.id == updatedItem.id) {
        return updatedItem;
      }
      return item;
    });
    console.log(newList);
    setList(newList);
  };

  return (
    <div className="content">
      <div className="clients-content-box">
        <h2 className="cadastro-titles">Usuários empresa</h2>
        <h3 className="client-titles">Novo Usuario</h3>
        <AddClientModal handleAdd={handleAdd} editElement={editElement} />
        <h3 className="client-titles">Usuario cadastrados</h3>
        <div className="list-wrapper">
          <table className="client-list">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Empresa</th>
                <th>Buttons - Unnamed</th>
              </tr>
            </thead>
            <tbody>
              {list.map((item, index) => (
                <tr key={index} className="list-item">
                  <td>
                    <img src="assets/icons/person.svg" height={20}></img>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.empresa}</td>
                  <td>
                    <EditClientModal
                      editElement={editElement}
                      id={item.id}
                      name={item.name}
                      cpf={item.cpf}
                      email={item.email}
                      empresa={item.empresa}
                      cnpj={item.cnpj}
                      nivel={item.nivel}
                    />
                    <button onClick={() => removeElement(item.id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
