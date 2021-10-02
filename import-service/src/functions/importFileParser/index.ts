import { handlerPath } from '@libs/handlerResolver';
import { UPLOAD_PREFIX, BUCKET_NAME } from '../../utils/constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: BUCKET_NAME,
        event: 's3:ObjectCreated:*',
        existing: true,
        rules: [
          {
            prefix: `${UPLOAD_PREFIX}/`
          }
        ]
      }
    }
  ]
}
