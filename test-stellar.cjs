const https = require('https');

const url = 'https://vixsrc.to/embed/263200?token=5eda18e99ed607110e05b3a221eb67b1&t=RGVhZHBvb2wgJiBXb2x2ZXJpbmU%3D&expires=1786561110&lang=en&skin=vixsrc&canPlayFHD=1';

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Referer': 'https://vixsrc.to/'
  }
};

https.get(url, options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log("Status:", res.statusCode);
    const match = data.match(/window\.masterPlaylist/);
    console.log("Match window.masterPlaylist:", !!match);
    
    // Log a portion of the response around the playlist if found, or first 500 chars if not
    if (match) {
      console.log(data.substring(match.index, match.index + 200));
    } else {
      console.log("Not found. First 500 chars:", data.substring(0, 500));
    }
  });
}).on('error', err => {
  console.log("Error:", err.message);
});
