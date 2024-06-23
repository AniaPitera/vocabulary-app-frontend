import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AddCategory({ open, handleClose, addCategory }) {
  const [name, setName] = useState("");
  const [wordLanguage, setWordLanguage] = useState("");
  const [translationLanguage, setTranslationLanguage] = useState("");

  const token = localStorage.getItem("token");
  const decodedToken = token ? jwtDecode(token) : null;
  const userId = decodedToken ? decodedToken.user_id : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/category",
        {
          name,
          word_language: wordLanguage,
          translation_language: translationLanguage,
          user: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addCategory(response.data);
      handleClose();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: {
          width: "500px",
          height: "350px",
        },
      }}
    >
      <DialogTitle>Utwórz nowy zestaw słówek</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          onChange={(e) => setName(e.target.value)}
          name="category"
          label="Nazwa zestawu"
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="word_language"
          onChange={(e) => setWordLanguage(e.target.value)}
          name="category"
          label="Język słówek"
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="translation_language"
          onChange={(e) => setTranslationLanguage(e.target.value)}
          name="category"
          label="Język tłumaczeń"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button type="submit">Utwórz zestaw</Button>
      </DialogActions>
    </Dialog>
  );
}
