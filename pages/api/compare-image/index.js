import {
  RekognitionClient,
  CompareFacesCommand,
} from '@aws-sdk/client-rekognition';

import nextConnect from 'next-connect';
import uploadFile from '../../../lib/multer';

const faceRecognition = new RekognitionClient({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
});

const handler = nextConnect({
  onError: (err, _, res) => {
    return res
      .status(400)
      .json({ message: err?.message || 'Something went wrong' });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.use(uploadFile.array('image', 2));

handler.post(async (req, res) => {
  try {
    const files = req.files;
    const data = await faceRecognition.send(
      new CompareFacesCommand({
        SourceImage: {
          Bytes: files[0].buffer,
        },
        TargetImage: {
          Bytes: files[1].buffer,
        },
      })
    );

    return res.status(200).json({
      matchedFaces: data?.FaceMatches,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to detect faces' || 'Something went wrong',
    });
  }
});

export default handler;
