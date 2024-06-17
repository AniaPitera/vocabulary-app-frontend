import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";

const API_URL = 'http://localhost:8080/API';

export default function AddCategory({ open, handleClose }) {
  const [name, setName] = useState("");
  const [wordLanguage, setWordLanguage] = useState("");
  const [translationLanguage, setTranslationLanguage] = useState("");
  
  const handleWordLanguageChange = (event) => {
    setWordLanguage(event.target.value);
  };

  const handleTranslationLanguageChange = (event) => {
    setTranslationLanguage(event.target.value);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (e) => {
            e.preventDefault();
            try {
              await axios.post(`${API_URL}/categories`, { 
                  name,
                  wordLanguage,
                  translationLanguage,
                });
              } catch (error) {
                console.error(error);
              }
            handleClose();
          },
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
            label="Podaj nazwę zestawu słówek"
            fullWidth
          />
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="word-language-label">
              Podaj w jakim języku będą wpowadzane słowa
            </InputLabel>
            <Select
              labelId="word-language-label"
              id="word-language"
              value={wordLanguage}
              onChange={handleWordLanguageChange}
              label="Podaj w jakim języku będą wpowadzane słowa"
              fullWidth
            >
              <MenuItem value="polski">polski</MenuItem>
              <MenuItem value="angielski">angielski</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" required>
            <InputLabel id="translation-language-label">
              Podaj w jakim języku będą tłumaczenia słów
            </InputLabel>
            <Select
              labelId="translation-language-label"
              id="translation-language"
              value={translationLanguage}
              onChange={handleTranslationLanguageChange}
              label="Podaj w jakim języku będą tłumaczenia słów"
            >
              <MenuItem value="polski">polski</MenuItem>
              <MenuItem value="angielski">angielski</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Anuluj</Button>
          <Button type="submit">Utwórz zestaw</Button>
        </DialogActions>
      </Dialog>
  );
}
