import { S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "node:crypto";



const s3Client = new S3Client({
    region: process.env.AWS_REGION as string,
    endpoint: process.env.S3_ENDPOINT as string,
    forcePathStyle: true,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
      }
});


export class S3Service{
static async generatePresignedUrl( fileType: string){


    
    const key = `resumes/${crypto.randomUUID()}`;
    const command = new PutObjectCommand({
         Bucket: process.env.S3_BUCKET_NAME as string,
         Key: key,
         ContentType: fileType,
    })

 const uploadUrl =  await getSignedUrl(s3Client, command, {expiresIn: 3600})
 return {uploadUrl, key};
}

}