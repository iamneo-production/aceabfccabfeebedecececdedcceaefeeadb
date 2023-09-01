import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ResponsiveAppBar from '../../ResponsiveAppBar';
import { useParams } from 'react-router-dom';


const defaultTheme = createTheme();

const HomePage = () => {
  const params = useParams();
  console.log(params.userId);

  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCards, setFilteredCards] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = cardDetails.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const cardDetails = [
    {
      collegeId: 1,
      title: 'Huston university',
      description: 'Description for Card 1',
      imageURL: 'https://source.unsplash.com/random/800x600?sig=1',
    },
    {
      collegeId: 2,
      title: 'University of Huston',
      description: 'Description for Card 2',
      imageURL: 'https://source.unsplash.com/random/800x600?sig=2',
    },
    {
      collegeId: 3,
      title: 'MIT',
      description: 'Description for Card 3',
      imageURL: 'https://source.unsplash.com/random/800x600?sig=3',
    },
    {
      collegeId: 4,
      title: 'VIT',
      description: 'Description for Card 4',
      imageURL: 'https://source.unsplash.com/random/800x600?sig=4',
    },
    {
      collegeId: 5,
      title: 'SRM',
      description: 'Description for Card 5',
      imageURL: 'https://source.unsplash.com/random/800x600?sig=5',
    },
    {
      collegeId: 6,
      title: 'DPS',
      description: 'Description for Card 6',
      imageURL: 'https://source.unsplash.com/random/800x600?sig=6',
    },
  ];

  
  React.useEffect(() => {
    setFilteredCards(cardDetails);
    setLoading(false);
  }, [cardDetails]);

  return (
    <div>
      <ResponsiveAppBar />

      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />

        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pb: 6,
            }}
          ></Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* Search bar */}
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 2,
                pb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Container maxWidth="sm">
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  style={{ width: '70%', padding: '10px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  style={{ marginLeft: '10px' }}
                >
                  Search
                </Button>
              </Container>
            </Box>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <Grid container spacing={4}>
                {filteredCards.map((card, index) => (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    id={`instituteGrid${index + 1}`}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: '56.25%',
                        }}
                        image={card.imageURL}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.title}
                        </Typography>
                        <Typography>{card.description}</Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">View</Button>
                        <Button size="small">Edit</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
};

export default HomePage;
