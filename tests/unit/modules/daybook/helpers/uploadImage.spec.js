
import 'setimmediate';
import cloudinary from 'cloudinary';
import uploadImage from '@/modules/daybook/helpers/uploadImage';
import axios from 'axios';

cloudinary.config({
    cloud_name: 'db2h2aoif',
    api_key: '237474643748662',
    api_secret: 'pkBuCBoEqrkmTiD3lB4ErnHqJAs'
})

describe('Pruebas en el uploadImage', () => {
    test('debe de cargar un archivo y retornar un URL', async () => {
        const {data} = await axios.get('https://res.cloudinary.com/db2h2aoif/image/upload/v1668745453/vuejs/app-journal/Samir_V2_uu1haw.png', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'img.png')
        const url = await uploadImage(file)
        expect(typeof url).toBe('string')
        //Tomar el ID de la imagen cargada a Claudinary
        const segment = url.split('/')
        const imageId = segment[segment.length-1].replace('.png','')
        const pathUrl = 'vuejs/app-journal/'+imageId;
        const { deleted } = await cloudinary.v2.api.delete_resources(pathUrl)
        
        // Nos aseguramos de que la imagen haya sido eliminada
        // para no crear archivos basura en cloudinary
        expect(deleted[pathUrl]).toBe('deleted')
    });
});