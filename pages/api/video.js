import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);
const handler = async (req, res) => {

    const number = req.query.number

    const url = process.env.VIDEO_URL_TEMPLATE.replace('{number}', number);

    const response = await fetch(url, {
        "headers": {
            "accept": "video/mp4",
            "accept-language": "en-US,en;q=0.9,lt;q=0.8",
            "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "video",
            "sec-fetch-mode": "no-cors",
            "sec-fetch-site": "same-origin",
            "Referer": process.env.VIDEO_URL_REFERER,
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename=${number}.mp4`);
    await pipeline(response.body, res);
};

export default handler;

