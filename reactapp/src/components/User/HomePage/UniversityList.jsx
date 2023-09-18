
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
import axios from 'axios';
import CountUp from 'react-countup';



const defaultTheme = createTheme();
const UniversityList = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [numberOfAdmission, setNumberOfAdmission] = useState(0);
  const [successfulAdmissions, setSuccessfulAdmissions] = useState(0);


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
  useEffect(() => {
    // Replace with your API endpoint to fetch the data


    axios
      .get("https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/studentsNumber")
      .then((response) => {
        // Assuming your API returns an object with the number of students and successful admissions
        const students = response.data

        setNumberOfStudents(students);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios
      .get("https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/admissionsNumber")
      .then((response) => {
        // Assuming your API returns an object with the number of students and successful admissions
        const admissions = response.data

        setNumberOfAdmission(admissions);

      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });



  }, []);

  useEffect(() => {
    // Define the API endpoint URL where your data is hosted
    const apiUrl =
      'https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/institute';

    // Make a GET request to fetch the list of institutes from the API
    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming your API returns an array of institutes
        const dataFromApi = response.data;
        console.log(response.data);

        const formattedCardDetails = dataFromApi.map((courseWithAdmission) => ({
          collegeId: courseWithAdmission.course.institute.instituteId,
          title: courseWithAdmission.course.institute.instituteName,
          description: courseWithAdmission.course.institute.instituteDescription,
          imageURL: courseWithAdmission.course.institute.imageURL,
          place: courseWithAdmission.course.institute.instituteAddress,
          starRating: parseFloat(courseWithAdmission.course.institute.starRating),
          enrolledStudents: courseWithAdmission.admissionCount, // Add this line
        }));


        setCardDetails(formattedCardDetails);
        setFilteredCards(formattedCardDetails); // Initialize filteredCards with the formatted data
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

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
        <Box sx={{ bgcolor: 'background.paper', pb: 6 }}>
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
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card sx={{ border: '1px solid #ccc', padding: '16px' }}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom>
                          Total Students
                        </Typography>
                        <Typography variant="h4" color="primary">
                          <CountUp start={0} end={numberOfStudents} duration={2} separator="," />
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card sx={{ border: '1px solid #ccc', padding: '16px' }}>
                      <CardContent>
                        <Typography variant="h4" gutterBottom>
                          Successful Admissions
                        </Typography>
                        <Typography variant="h4" color="primary">
                          <CountUp start={0} end={numberOfAdmission} duration={2} separator="," />
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
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
                        <Typography variant="subtitle1" color="text.secondary">
                          Enrolled Students: {card.enrolledStudents}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </Container>
        </Box>
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default UniversityList;


