import { BadRequestException } from '@nestjs/common';
import {diskStorage} from 'multer';


const allowFileTypes=['image/jpeg','image/png'];
const maxFileSize=5*1024*1024;


export const multerOption={


storage:  diskStorage({
    destination:'./static/uploads',
    filename:(req,file,cb)=>{
const uniqueSuffix=Date.now()+"-"+Math.round(Math.random()*1e9);
const extention=file.originalname.split('.').pop();
cb(null,uniqueSuffix+"."+extention);

    }
}),limits:{
    fileSize:maxFileSize,
},
fileFilter:(req,file,cb)=>{

    if(allowFileTypes.includes(file.mimetype)){
        cb(null,true);
    }
    else
    {
        cb(new BadRequestException("file type not allowed"),false);
    }
}


};



