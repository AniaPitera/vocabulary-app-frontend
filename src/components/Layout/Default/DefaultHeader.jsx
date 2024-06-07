import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

export default function HeaderDefault() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}
          >
            Vocabulary App
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add"
            sx={{ mr: 2 }}
          >
            <LightTooltip title="Utwórz nowy zestaw słówek">
              <AddIcon />
            </LightTooltip>
          </IconButton>
          <Button href="/login" color="inherit">
            Zaloguj się
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
