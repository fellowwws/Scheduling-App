import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { firestore } from "../firebase";
import { withRouter } from "react-router-dom";

function _Dropdown({ rota, history }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(!dropdownOpen);

  const handleEdit = () => {
    history.push(`/rota/${rota.id}`);
  };
  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      const collection = rota.published ? "published" : "unpublished";
      firestore
        .collection(collection)
        .doc(rota.id)
        .delete();
    }
  };

  return (
    <Dropdown className="float-right" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Actions</DropdownToggle>
      <DropdownMenu right>
        <DropdownItem onClick={handleEdit}>Edit ✏️</DropdownItem>
        <DropdownItem divider />
        <DropdownItem onClick={handleDelete}>Delete 🗑</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}

export default withRouter(_Dropdown);
