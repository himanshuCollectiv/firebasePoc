const express = require('express');
const { messaging } = require('./firebase');

const app = express();

app.use(express.json());

app.post('/send-notification', async (req, res) => {
  try {
    const { token } = req.body || {};

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Missing "token" in request body'
      });
    }

    const response = await messaging.send({
      token,
      notification: {
        title: 'Test Notification',
        body: 'Hello! Firebase notification triggered successfully.'
      }
    });

    res.status(200).json({
      success: true,
      message: 'Notification triggered successfully',
      messageId: response
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});