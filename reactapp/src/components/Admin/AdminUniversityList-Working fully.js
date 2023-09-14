
import React, { useState, useEffect } from 'react';
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
import CourseList from '../Admin/AdminCourses';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import AdminAppBar from '../AdminAppBar';

const defaultTheme = createTheme();

const AdminUniversityList = () => {
  const params = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({});

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    const filtered = cardDetails.filter((card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleEditClick = (card, e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the card
    setEditFormData(card);
    setEditDialogOpen(true);
  };
  


  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleDeleteClick = () => {
    // Implement delete logic here
  };

  const handleEditSave = () => {
    // Handle saving edited data here
    console.log("Edited Data:", editFormData);
    setEditDialogOpen(false); // Close the dialog after saving
  };

  const handleAddInstituteClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  const handleAddInstituteSave = () => {
    // Handle saving new institute data here
    console.log("New Institute Data:", addFormData);
    setAddDialogOpen(false); // Close the dialog after saving
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

      <AdminAppBar id={params.userId} />

      <main>
        <Box sx={{ bgcolor: 'background.paper', pb: 6 }}></Box>
        <Container sx={{ py: 8 }} maxWidth="md">
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
          ) : selectedCard ? (
            <CourseList
              collegeId={selectedCard.collegeId}
              title={selectedCard.title}
              onClose={() => setSelectedCard(null)}
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
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        {/* <Button
                          variant="outlined"
                          onClick={() => handleEditClick(card)}
                        >
                          Edit
                        </Button> */}
                        <Button
  variant="outlined"
  onClick={(e) => handleEditClick(card, e)}
>
  Edit
</Button>

                        <Button
                          variant="outlined"
                          onClick={() => handleDeleteClick(card)}
                        >
                          Delete
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </main>

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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 2,
          pb: 2,
        }}
      >
        <Button variant="contained" color="primary" onClick={handleAddInstituteClick}>
          Add Institute
        </Button>
      </Box>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose}>
        <DialogTitle>Edit Institute</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={editFormData.title || ''}
            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={editFormData.description || ''}
            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Place"
            value={editFormData.place || ''}
            onChange={(e) => setEditFormData({ ...editFormData, place: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Star Rating"
            value={editFormData.starRating || ''}
            onChange={(e) => setEditFormData({ ...editFormData, starRating: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose}>Cancel</Button>
          <Button onClick={handleEditSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addDialogOpen} onClose={handleAddDialogClose}>
        <DialogTitle>Add Institute</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={addFormData.title || ''}
            onChange={(e) => setAddFormData({ ...addFormData, title: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={addFormData.description || ''}
            onChange={(e) => setAddFormData({ ...addFormData, description: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Place"
            value={addFormData.place || ''}
            onChange={(e) => setAddFormData({ ...addFormData, place: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Star Rating"
            value={addFormData.starRating || ''}
            onChange={(e) => setAddFormData({ ...addFormData, starRating: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
          <Button onClick={handleAddInstituteSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default AdminUniversityList;


