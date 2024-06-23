import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const LearnWords = () => {
  const { categoryId } = useParams();
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
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

  const handleNextWord = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    setShowTranslation(false);
  };

  const handleToggleTranslation = () => {
    setShowTranslation((prevShowTranslation) => !prevShowTranslation);
  };

  if (words.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  const currentWord = words[currentIndex];

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 10, textAlign: "center" }}>
        Uczysz się słówek z zestawu: {categoryName}
      </Typography>
      <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
        Słówko {currentIndex + 1} z {words.length}
      </Typography>

      <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
        <Card
          sx={{
            width: "600px",
            height: "400px",
            cursor: "pointer",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5">
              {showTranslation ? currentWord.translation : currentWord.word}
            </Typography>
          </CardContent>
        </Card>
        <Button
          variant="outlined"
          onClick={handleToggleTranslation}
          sx={{ mb: 2 }}
        >
          {showTranslation ? "Pokaż słówko" : "Pokaż tłumaczenie"}
        </Button>
        <Box display="flex" justifyContent="space-between" width="300px">
          <Button variant="contained" color="success" onClick={handleNextWord}>
            Umiem
          </Button>
          <Button variant="contained" color="error" onClick={handleNextWord}>
            Nie umiem
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LearnWords;
