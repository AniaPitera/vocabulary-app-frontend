import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddCategory from "./AddCategory";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose();
  };

  const handleDelete = () => {
    handleClose();
  };

  const handleAddClickOpen = () => {
    setOpen(true);
    handleCloseMenu();
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleStartLearning = () => {
    const categoryId = "123"; // t
    navigate(`/categories/${categoryId}/learn`);
  };

  const handleCardClick = () => {
    const categoryId = "123";
    navigate(`/categories/${categoryId}`);
  };

  return (
    <>
      <Typography variant="h4" sx={{ marginTop: 10, textAlign: "center" }}>
        Moje zestawy słówek
      </Typography>
      <Card sx={{ marginTop: 10 }}>
        <CardHeader
          title="Nazwa zestawu"
          subheader="Język: polski-angielski"
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
                <MenuItem onClick={handleEdit}>Edytuj </MenuItem>
                <MenuItem onClick={handleDelete}>Usuń </MenuItem>
              </Menu>
            </>
          }
        />
        <CardActions disableSpacing sx={{ ml: 1, mb: 1 }}>
          <Button
            size="large"
            variant="outlined"
            onClick={handleCardClick}
            sx={{ mr: 2 }}
          >
            Przejdź do zestawu
          </Button>

          <Button size="large" variant="outlined" onClick={handleStartLearning}>
            Rozpocznij naukę
          </Button>
        </CardActions>
      </Card>
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
