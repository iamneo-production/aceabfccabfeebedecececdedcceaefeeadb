
// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useParams } from 'react-router-dom';
// import ApplyForm from '../ApplyForm/ApplyForm';
// import { useState, useEffect } from 'react';
// import UserAppBar from '../../UserAppBar';
// import Rating from '@mui/material/Rating';
// import StarIcon from '@mui/icons-material/Star';
// import Footer from '../../Footer';
// import axios from 'axios';
// import CountUp from 'react-countup';

// const defaultTheme = createTheme();

// const UniversityList = () => {
//   const params = useParams();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredCards, setFilteredCards] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedCard, setSelectedCard] = useState(null);
//   const [cardDetails, setCardDetails] = useState(null);
//   const [numberOfStudents, setNumberOfStudents] = useState(0);
//   const [numberOfAdmission, setNumberOfAdmission] = useState(0);

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleSearch = () => {
//     const filtered = cardDetails.filter((card) => {
//       const lowerCaseQuery = searchQuery.toLowerCase();

//       return (
//         card.title.toLowerCase().includes(lowerCaseQuery) ||
//         card.place.toLowerCase().includes(lowerCaseQuery) ||
//         card.collegeId.toString().includes(lowerCaseQuery)
//       );
//     });
//     setFilteredCards(filtered);
//   };

//   const handleCardClick = (card) => {
//     setSelectedCard(card);
//   };

//   const handleCloseCardDetails = () => {
//     setSelectedCard(null);
//   };

//   useEffect(() => {
//     axios
//       .get("https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/studentsNumber")
//       .then((response) => {
//         const students = response.data;
//         setNumberOfStudents(students);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });

//     axios
//       .get("https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/admissionsNumber")
//       .then((response) => {
//         const admissions = response.data;
//         setNumberOfAdmission(admissions);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   useEffect(() => {
//     const apiUrl = 'https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/institute';

//     axios
//       .get(apiUrl)
//       .then((response) => {
//         const dataFromApi = response.data;
//         console.log(response.data);

//         const formattedCardDetails = dataFromApi.map((institute) => ({
//           collegeId: institute.instituteId,
//           title: institute.instituteName,
//           description: institute.instituteDescription,
//           imageURL: institute.imageURL,
//           place: institute.instituteAddress,
//           starRating: parseFloat(institute.starRating),
//         }));

//         setCardDetails(formattedCardDetails);
//         setFilteredCards(formattedCardDetails);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />
//       <UserAppBar id={params.userId} />
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <h1 style={{ fontFamily: 'AdmitEasy', fontSize: '32px', color: 'darkblue' }}>
//           Welcome to AdmitEasy
//         </h1>
//         <p style={{ fontSize: '18px', color: 'gray' }}>
//           Making your admission process easier than ever.
//         </p>
//       </div>
//       <main>
//         <Box sx={{ bgcolor: 'background.paper', pb: 6 }}>
//           <Container sx={{ py: 8 }} maxWidth="md">
//             {selectedCard === null && (
//               <Box
//                 sx={{
//                   bgcolor: 'background.paper',
//                   pt: 2,
//                   pb: 2,
//                   display: 'flex',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flexDirection: 'column',
//                 }}
//               >
//                 <Container maxWidth="sm">
//                   <input
//                     type="text"
//                     placeholder="Search by name or place"
//                     value={searchQuery}
//                     onChange={handleSearchChange}
//                     style={{ width: '70%', padding: '10px' }}
//                   />
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={handleSearch}
//                     style={{ marginLeft: '10px' }}
//                   >
//                     Search
//                   </Button>
//                 </Container>
//               </Box>
//             )}
//             {loading ? (
//               <Typography>Loading...</Typography>
//             ) : selectedCard ? (
//               <ApplyForm
//                 collegeId={selectedCard.collegeId}
//                 title={selectedCard.title}
//                 onClose={handleCloseCardDetails}
//               />
//             ) : (
//               <Grid container spacing={4}>
//                 {filteredCards.map((card, index) => (
//                   <Grid
//                     item
//                     key={index}
//                     xs={12}
//                     sm={6}
//                     md={4}
//                     id={`instituteGrid${index + 1}`}
//                   >
//                     <Card
//                       sx={{
//                         height: '100%',
//                         display: 'flex',
//                         flexDirection: 'column',
//                         cursor: 'pointer',
//                       }}
//                       onClick={() => handleCardClick(card)}
//                     >
//                       <CardMedia
//                         component="div"
//                         sx={{
//                           // 16:9
//                           pt: '56.25%',
//                         }}
//                         image={card.imageURL}
//                       />
//                       <CardContent sx={{ flexGrow: 1 }}>
//                         <Typography gutterBottom variant="h5" component="h2">
//                           {card.title}
//                         </Typography>
//                         <Typography>{card.description}</Typography>
//                         <Typography variant="subtitle1" color="text.secondary">
//                           Place: {card.place}
//                         </Typography>
//                         <Typography variant="subtitle1" color="text.secondary">
//                           Star Rating:
//                           <Rating
//                             name="star-rating"
//                             value={card.starRating}
//                             precision={0.5}
//                             emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                             readOnly
//                           />
//                         </Typography>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 ))}
//               </Grid>
//             )}
//             {/* Stylish Cards for Total Students and Successful Admissions */}
//             {selectedCard === null && (
//               <Grid container spacing={2} sx={{ mt: 4 }}>
//                 <Grid item xs={6}>
//                   <Card sx={{ backgroundColor: '#f3f3f3' }}>
//                     <CardContent>
//                       <Typography variant="h5" color="primary" gutterBottom>
//                         Total Students
//                       </Typography>
//                       <Typography variant="h4" color="primary">
//                         <CountUp start={0} end={numberOfStudents} duration={2} separator="," />
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={6}>
//                   <Card sx={{ backgroundColor: '#f3f3f3' }}>
//                     <CardContent>
//                       <Typography variant="h5" color="success" gutterBottom>
//                         Successful Admissions
//                       </Typography>
//                       <Typography variant="h4" color="success">
//                         <CountUp start={0} end={numberOfAdmission} duration={2} separator="," />
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               </Grid>
//             )}
//           </Container>
//         </Box>
//       </main>
//       <Footer />
//     </ThemeProvider>
//   );
// };

// export default UniversityList;
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import ApplyForm from '../ApplyForm/ApplyForm';
import { useState, useEffect } from 'react';
import UserAppBar from '../../UserAppBar';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Footer from '../../Footer';
import axios from 'axios';
import CountUp from 'react-countup';

const defaultTheme = createTheme();

const UniversityList = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardDetails, setCardDetails] = useState(null);
  const [numberOfStudents, setNumberOfStudents] = useState(0);
  const [numberOfAdmission, setNumberOfAdmission] = useState(0);

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
    axios
      .get("https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/studentsNumber")
      .then((response) => {
        const students = response.data;
        setNumberOfStudents(students);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios
      .get("https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/admissionsNumber")
      .then((response) => {
        const admissions = response.data;
        setNumberOfAdmission(admissions);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const apiUrl = 'https://8080-aceabfccabfeebedecececdedcceaefeeadb.premiumproject.examly.io/admin/institute';

    axios
      .get(apiUrl)
      .then((response) => {
        const dataFromApi = response.data;
        console.log(response.data);

        const formattedCardDetails = dataFromApi.map((institute) => ({
          collegeId: institute.instituteId,
          title: institute.instituteName,
          description: institute.instituteDescription,
          imageURL: institute.imageURL,
          place: institute.instituteAddress,
          starRating: parseFloat(institute.starRating),
        }));

        setCardDetails(formattedCardDetails);
        setFilteredCards(formattedCardDetails);
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
        <Box sx={{ bgcolor: 'background.paper', pb: 6 }}>
          <Container sx={{ py: 8 }} maxWidth="md">
            {selectedCard === null && (
              <Box
                sx={{
                  bgcolor: 'background.paper',
                  pt: 2,
                  pb: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
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
              <ApplyForm
                collegeId={selectedCard.collegeId}
                title={selectedCard.title}
                onClose={handleCloseCardDetails}
              />
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
                            readOnly
                          />
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
            {/* Stylish Cards for Total Students and Successful Admissions */}
            {selectedCard === null && (
              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: '#f3f3f3' }}>
                    <CardContent>
                      <Typography variant="h5" color="primary" gutterBottom>
                        Total Students
                      </Typography>
                      <Typography variant="h4" color="primary">
                        <CountUp start={0} end={numberOfStudents} duration={2} separator="," />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card sx={{ backgroundColor: '#f3f3f3' }}>
                    <CardContent>
                      <Typography variant="h5" color="success" gutterBottom>
                        Successful Admissions
                      </Typography>
                      <Typography variant="h4" color="success">
                        <CountUp start={0} end={numberOfAdmission} duration={2} separator="," />
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
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

