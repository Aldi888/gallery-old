import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import ImageList from '@mui/material/ImageList';
import { ImageListItem } from '@mui/material';



const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, SetLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  
  useEffect(()=> {
    const getPhotos = async () => {
        SetLoading(true);
        setPhotos(await Photos.getAll());
        SetLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if(file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if(result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  return (
    <C.Container>
<Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Avalie
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    
    
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="white"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Inicio
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="white"
          href="#"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ display: 'flex', alInignItems: 'center' }}
          color="gray"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
      </Breadcrumbs>
    
      <C.Area>
       <C.Header>Galeria de Fotos</C.Header>

    {
      <C.UploadForm method="POST" onSubmit={handleFormSubmit}>
        <input type="file" name="image" />
        <input type="submit" value="Enviar" />


      </C.UploadForm>
    }

    { loading &&
      <C.ScreenWarning>
        <div className="emoji">🤪</div>
        <div>Loading...</div>
      </C.ScreenWarning>
     }

    {!loading && photos.length > 0 &&
      <ImageList cols={4} rowHeight={210}>
        {photos.map((item, index)=>(
          <ImageListItem key={index}>
            <PhotoItem  url={item.url} name={item.name} />

          </ImageListItem>
                   
          ))}
      </ImageList>
}
{!loading && photos.length === 0 &&
          <C.ScreenWarning>
            <div className="emoji">😞</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        }
     
         </C.Area>
    </C.Container>
  );
}

export default App;
