import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);
const handler = async (req, res) => {
  const response = await fetch("https://srv1.gerifilmai.online/serialai/svajokle/70Serija.mp4", {
    "headers": {
      "accept": "video/mp4",
      "accept-language": "en-US,en;q=0.9,lt;q=0.8",
      "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Linux\"",
      "sec-fetch-dest": "video",
      "sec-fetch-mode": "no-cors",
      "sec-fetch-site": "same-origin",
      "Referer": "https://srv1.gerifilmai.online/serialai/svajokle/70Serija.mp4",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    "body": null,
    "method": "GET"
  });; // replace this with your API call & options
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  res.setHeader('Content-Type', 'video/mp4');
  res.setHeader('Content-Disposition', 'attachment; filename=70.mp4');
  await pipeline(response.body, res);
};

export default handler;

