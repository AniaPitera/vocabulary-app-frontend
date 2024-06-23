import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Card,
  CardHeader,
  CardActions,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Container
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import AddCategory from "./AddCategory";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function CategoryList() {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editCategory, setEditCategory] = useState({
    name: "",
    word_language: "",
    translation_language: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }
    const decodedToken = token ? jwtDecode(token) : null;
    const user = decodedToken ? decodedToken.user_id : null;
    try {
      const response = await axios.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        params: { userId: user },
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const addCategory = (newCategory) => {
    setCategories((prevCategories) => [...prevCategories, newCategory]);
  };

  const handleEdit = async (categoryId, updatedCategory) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `/category/${categoryId}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        fetchCategories();
      } else {
        console.error("Error editing category");
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        fetchCategories();
      } else {
        console.error("Error deleting category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleClick = (event, categoryId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCategoryId(categoryId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedCategoryId(null);
  };

  const handleAddClickOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleEditDialogOpen = async (categoryId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`/category/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditCategory(response.data);
      setSelectedCategoryId(categoryId);
      setEditOpen(true);
    } catch (error) {
      console.error("Error fetching category:", error);
    }
  };

  const handleEditDialogClose = () => {
    setEditOpen(false);
    setSelectedCategoryId(null);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await handleEdit(selectedCategoryId, editCategory);
    setEditOpen(false);
  };

  const handleStartLearning = (categoryId) => {
    navigate(`/categories/${categoryId}/learn`);
  };

  const handleCategoryDetailClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ marginTop: 10, textAlign: "center" }}>
        Moje zestawy słówek
      </Typography>
      {categories.map((category) => (
        <Card key={category.id} sx={{ marginTop: 2 }}>
          <CardHeader
            title={category.name}
            subheader={`Język: ${category.word_language || "nieznany"}-${
              category.translation_language || "nieznany"
            }`}
            action={
              <>
                <IconButton
                  aria-label="settings"
                  onClick={(event) => handleClick(event, category.id)}
                >
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() => {
                      handleEditDialogOpen(selectedCategoryId);
                      handleCloseMenu();
                    }}
                  >
                    Edytuj
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleDelete(selectedCategoryId);
                      handleCloseMenu();
                    }}
                  >
                    Usuń
                  </MenuItem>
                </Menu>
              </>
            }
          />
          <CardActions disableSpacing sx={{ ml: 1, mb: 1 }}>
            <Button
              size="large"
              variant="outlined"
              onClick={() => handleCategoryDetailClick(category.id)}
              sx={{ mr: 2 }}
            >
              Przejdź do zestawu
            </Button>

            <Button
              size="large"
              variant="outlined"
              onClick={() => handleStartLearning(category.id)}
            >
              Rozpocznij naukę
            </Button>
          </CardActions>
        </Card>
      ))}
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          startIcon={<AddIcon />}
          onClick={handleAddClickOpen}
          size="large"
          sx={{ mt: 2 }}
          variant="outlined"
        >
          Utwórz nowy zestaw słówek
        </Button>
      </Box>
      <AddCategory
        open={open}
        handleClose={handleDialogClose}
        addCategory={addCategory}
      />
      <Dialog
        open={editOpen}
        onClose={handleEditDialogClose}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">Edytuj zestaw</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nazwa zestawu"
              type="text"
              fullWidth
              value={editCategory.name}
              onChange={(e) =>
                setEditCategory({ ...editCategory, name: e.target.value })
              }
            />
            <TextField
              margin="dense"
              id="word_language"
              label="Język słówek"
              type="text"
              fullWidth
              value={editCategory.word_language}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  word_language: e.target.value,
                })
              }
            />
            <TextField
              margin="dense"
              id="translation_language"
              label="Język tłumaczeń"
              type="text"
              fullWidth
              value={editCategory.translation_language}
              onChange={(e) =>
                setEditCategory({
                  ...editCategory,
                  translation_language: e.target.value,
                })
              }
            />
            <DialogActions>
              <Button onClick={handleEditDialogClose} color="primary">
                Anuluj
              </Button>
              <Button type="submit" color="primary">
                Zapisz
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Container>
  );
}
