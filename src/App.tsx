import { useState, useEffect, FormEvent } from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos';
import { Photo } from './types/Photo';
import { PhotoItem } from './components';


const App = () => {
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

  return (
    <C.Container>
      <C.Area>
       <C.Header>Galeria de Fotos</C.Header>

    {
      /* Area de Upload */
    }

    { loading &&
      <C.ScreenWarning>
        <div className="emoji">🤪</div>
        <div>Loading...</div>
      </C.ScreenWarning>
     }

    {!loading && photos.length > 0 &&
      <C.Photolist>
        {photos.map((item, index)=>(
          <PhotoItem key={index} url={item.url} name={item.name} />
                   
          ))}
      </C.Photolist>
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
