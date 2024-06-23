import { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Close";
import {
  Card,
  CardActions,
  CardContent,
  TextField,
  IconButton,
  Container,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useParams } from "react-router-dom";
import { randomId } from "@mui/x-data-grid-generator";

const AddNewWordButton = ({ setWords }) => {
  const handleClick = () => {
    const id = randomId();
    const newWord = {
      id,
      word: "",
      translation: "",
      isLearned: false,
      isNew: true,
      isEditMode: true,
    };
    setWords((oldWords) => [...oldWords, newWord]);
  };

  return (
    <Box
      sx={{
        mt: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        startIcon={<AddIcon />}
        onClick={handleClick}
        size="large"
        variant="outlined"
      >
        Dodaj nową fiszkę
      </Button>
    </Box>
  );
};

export default function WordList() {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    const fetchCategoryAndWords = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;

      try {
        const categoryResponse = await axios.get("/category", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          params: { userId: userId },
        });

        const categoryIdNumber = Number(categoryId);
        const category = categoryResponse.data.find(
          (cat) => cat.id === categoryIdNumber
        );
        if (category) {
          setCategoryName(category.name);
        } else {
          console.error("Category not found");
        }

        const wordsResponse = await axios.get("/word", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { categoryId: categoryIdNumber },
        });
        setWords(wordsResponse.data);
      } catch (error) {
        console.error("Error fetching category or words:", error);
      }
    };

    if (categoryId) {
      fetchCategoryAndWords();
    }
  }, [categoryId]);

  const handleEditClick = (id) => {
    setWords((words) =>
      words.map((word) =>
        word.id === id ? { ...word, isEditMode: true } : word
      )
    );
  };

  const handleSaveClick = async (id) => {
    const word = words.find((word) => word.id === id);
    if (word.isNew) {
      await addNewWord(word);
    } else {
      await updateWord(word);
    }
    setWords((words) =>
      words.map((word) =>
        word.id === id ? { ...word, isEditMode: false } : word
      )
    );
  };

  const handleDeleteClick = async (id) => {
    await deleteWord(id);
    setWords(words.filter((word) => word.id !== id));
  };

  const handleCancelClick = (id) => {
    setWords((words) =>
      words.map((word) =>
        word.id === id ? { ...word, isEditMode: false } : word
      )
    );

    const editedWord = words.find((word) => word.id === id);
    if (editedWord.isNew) {
      setWords(words.filter((word) => word.id !== id));
    }
  };

  const handleWordChange = (id, field, value) => {
    setWords((words) =>
      words.map((word) => (word.id === id ? { ...word, [field]: value } : word))
    );
  };

  const addNewWord = async (newWord) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "/word",
        {
          word: newWord.word,
          translation: newWord.translation,
          is_learned: false,
          category: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setWords((oldWords) =>
          oldWords.map((word) =>
            word.id === newWord.id
              ? { ...newWord, isNew: false, id: response.data.id }
              : word
          )
        );
      } else {
        console.error("Error adding word");
      }
    } catch (error) {
      console.error("Error adding word:", error);
    }
  };

  const updateWord = async (updatedWord) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `/word/${updatedWord.id}`,
        {
          word: updatedWord.word,
          translation: updatedWord.translation,
          is_learned: false,
          category: categoryId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setWords((oldWords) =>
          oldWords.map((word) =>
            word.id === updatedWord.id ? { ...word, isNew: false } : word
          )
        );
      } else {
        console.error("Error updating word");
      }
    } catch (error) {
      console.error("Error updating word:", error);
    }
  };

  const deleteWord = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`/word/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status !== 200) {
        console.error("Error deleting word");
      }
    } catch (error) {
      console.error("Error deleting word:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ mt: 10 }}>
        Zestaw - {categoryName}
      </Typography>
      {words.map((word) => (
        <Card key={word.id} sx={{ marginTop: 2 }}>
          <CardContent>
            {word.isEditMode ? (
              <>
                <TextField
                  label="Słówko"
                  value={word.word}
                  onChange={(e) =>
                    handleWordChange(word.id, "word", e.target.value)
                  }
                  fullWidth
                />
                <TextField
                  label="Tłumaczenie"
                  value={word.translation}
                  onChange={(e) =>
                    handleWordChange(word.id, "translation", e.target.value)
                  }
                  fullWidth
                  sx={{ marginTop: 2 }}
                />
              </>
            ) : (
              <>
                <Typography variant="h6">{word.word}</Typography>
                <Typography variant="body2">{word.translation}</Typography>
              </>
            )}
          </CardContent>
          <CardActions>
            {word.isEditMode ? (
              <>
                <IconButton onClick={() => handleSaveClick(word.id)}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => handleCancelClick(word.id)}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => handleEditClick(word.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDeleteClick(word.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </CardActions>
        </Card>
      ))}
      <AddNewWordButton setWords={setWords} />
    </Container>
  );
}
