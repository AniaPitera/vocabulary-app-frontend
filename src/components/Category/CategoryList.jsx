import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import AddCategory from "./AddCategory";

export default function CategoryList() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/category", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = async (categoryId, updatedCategory) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`/category/${categoryId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCategory),
      });
      if (response.ok) {
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
      const response = await fetch(`/category/${categoryId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        fetchCategories();
      } else {
        console.error("Error deleting category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleAddClickOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleStartLearning = (categoryId) => {
    navigate(`/categories/${categoryId}/learn`);
  };

  const handleCategoryDetailClick = (categoryId) => {
    navigate(`/categories/${categoryId}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 10, textAlign: "center" }}>
        Moje zestawy słówek
      </Typography>
      {categories.map((category) => (
        <Card key={category.id} sx={{ marginTop: 10 }}>
          <CardHeader
            title={category.name}
            subheader={`Język: ${category.word_language || "nieznany"}-${
              category.translation_language || "nieznany"
            }`}
            action={
              <>
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVertIcon />
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem
                    onClick={() =>
                      handleEdit(category.id, { name: "New Category Name" })
                    }
                  >
                    Edytuj
                  </MenuItem>
                  <MenuItem onClick={() => handleDelete(category.id)}>
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
      <AddCategory open={open} handleClose={handleDialogClose} />
    </>
  );
}
