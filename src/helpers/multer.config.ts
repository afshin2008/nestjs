import {diskStorage} from 'multer';


export const multerOption={


storage:  diskStorage({
    destination:'./static/uploads',
    filename:(req,file,cb)=>{
const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9);
const extention=file.originalname.split('.').pop();
cb(null,uniqueSuffix+"."+extention);

    },
}),
};



