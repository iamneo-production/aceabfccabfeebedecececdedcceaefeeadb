
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import ApplyForm from '../ApplyForm/ApplyForm'; // Import the CourseList component
import { useState, useEffect } from 'react';
import UserAppBar from '../../UserAppBar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Footer from '../../Footer'

const defaultTheme = createTheme();

const UniversityList = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

    const handleSearch = () => {
      const filtered = cardDetails.filter((card) => {
        const lowerCaseQuery = searchQuery.toLowerCase();
       
        return (
          card.title.toLowerCase().includes(lowerCaseQuery) ||
          card.place.toLowerCase().includes(lowerCaseQuery) ||
          card.collegeId.toString().includes(lowerCaseQuery)
        );
      });
      setFilteredCards(filtered);
    };
    
    
 

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseCardDetails = () => {
    setSelectedCard(null);
  };

  const cardDetails = React.useMemo(
    () => [
      {
        collegeId: 1,
        title: 'Huston University',
        description: 'Description for Card 1',
        imageURL: 'https://source.unsplash.com/random/800x600?sig=1',
        place: 'Houston, TX',
        starRating: 4.5,
      },
      {
        collegeId: 2,
        title: 'University of Houston',
        description: 'Description for Card 2',
        imageURL: 'https://source.unsplash.com/random/800x600?sig=2',
        place: 'Houston, TX',
        starRating: 4.0,
      },
      {
        collegeId: 3,
        title: 'MIT',
        description: 'Description for Card 3',
        imageURL: 'https://source.unsplash.com/random/800x600?sig=3',
        place: 'Cambridge, MA',
        starRating: 4.8,
      },
      {
        collegeId: 4,
        title: 'VIT',
        description: 'Description for Card 4',
        imageURL: 'https://source.unsplash.com/random/800x600?sig=4',
        place: 'Vellore, India',
        starRating: 4.2,
      },
      {
        collegeId: 5,
        title: 'SRM',
        description: 'Description for Card 5',
        imageURL: 'https://source.unsplash.com/random/800x600?sig=5',
        place: 'Chennai, India',
        starRating: 4.6,
      },
      {
        collegeId: 6,
        title: 'DPS',
        description: 'Description for Card 6',
        imageURL: 'https://source.unsplash.com/random/800x600?sig=6',
        place: 'New Delhi, India',
        starRating: 4.0,
      },
    ],
    []
  );

  useEffect(() => {
    setFilteredCards(cardDetails);
    setLoading(false);
  }, [cardDetails]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />

      <UserAppBar id={params.userId} />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h1 style={{ fontFamily: 'AdmitEasy', fontSize: '32px', color: 'darkblue' }}>
            Welcome to AdmitEasy
          </h1>
          <p style={{ fontSize: '18px', color: 'gray' }}>
            Making your admission process easier than ever.
          </p>
        </div>
        
      <main>
        {/* Hero unit */}
        <Box sx={{ bgcolor: 'background.paper', pb: 6 }}></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* Conditionally render the search bar */}
          {selectedCard === null && (
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
                  placeholder="Search by name or place"
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
          )}
          {loading ? (
            <Typography>Loading...</Typography>
          ) : selectedCard ? (
            // Display selected card details and courses
            <ApplyForm
              collegeId={selectedCard.collegeId}
              title={selectedCard.title}
              onClose={handleCloseCardDetails}
            />
          ) : (
            // Display grid of cards
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
                      cursor: 'pointer',
                    }}
                    onClick={() => handleCardClick(card)}
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
                      
                      {/* Display place and star rating */}
                      <Typography variant="subtitle1" color="text.secondary">
                        Place: {card.place}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        Star Rating: 
                        <Rating
                          name="star-rating"
                          value={card.starRating}
                          precision={0.5}
                          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                          readOnly // To make it read-only
                        />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>
                      <Footer/>
    </ThemeProvider>
  );
};

export default UniversityList;


