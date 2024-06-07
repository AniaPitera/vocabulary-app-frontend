import { Typography } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Vocabulary App {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = () => {
  return <Copyright sx={{ mt: 8, mb: 4 }} />;
};

export default Footer;
