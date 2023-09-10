import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const Footer = () => {
  return (
    <footer style={{ background: "#f8f8f8", padding: "30px 0" }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome to AdmitEasy! We are dedicated to providing high-quality education and helping students achieve their academic goals.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Link href="/home" color="inherit">
              Home
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Link href="/courses" color="inherit">
              Courses
            </Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <Link href="/contact" color="inherit">
              Contact Us
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Address: 123 Main St, AdmitEasy City, USA
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Phone: +1 (123) 456-7890
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Email: contact@admiteasy.com
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" gutterBottom>
            Connect with Us
          </Typography>
          <Box>
            <IconButton aria-label="Facebook" color="primary" component="a" href="#" target="_blank" rel="noopener noreferrer">
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" color="primary" component="a" href="#" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="LinkedIn" color="primary" component="a" href="#" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="subtitle2" color="textSecondary" align="center" style={{ marginTop: "20px" }}>
        &copy; {new Date().getFullYear()} AdmitEasy. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;
