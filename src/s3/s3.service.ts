import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
    private readonly s3Client: S3Client;
    private readonly bucketName: string;

    constructor() {
        this.bucketName = "sinedmv";

        this.s3Client = new S3Client({
            endpoint: process.env.S3_ENDPOINT!!.toString(), // "https://storage.yandexcloud.net",
            region: process.env.S3_REGION!!.toString(), // "ru-central1",
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY_ID!!.toString(),
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!!.toString()
            },
            forcePathStyle: true,
        });
    }

    async uploadFile(file: Express.Multer.File, key: string) {
        await this.s3Client.send(
            new PutObjectCommand({
                Bucket: this.bucketName,
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
                ACL: 'public-read'
            })
        );
        return key;
    }

    async getFileUrl(key: string) {
        const command = new GetObjectCommand({
            Bucket: this.bucketName,
            Key: key,
        });
        return getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
    }

    async listFiles() {
        try {
            const response = await this.s3Client.send(
                new ListObjectsV2Command({
                    Bucket: this.bucketName,
                })
            );

            if (!response.Contents) {
                console.warn('S3 response does not contain Contents array');
                return [];
            }

            return response.Contents.filter((file) => file.Key);

        } catch (error) {
            console.error('S3 listFiles error:', {
                error: error.message,
                bucket: this.bucketName,
                stack: error.stack
            });

            return [];
        }
    }
}