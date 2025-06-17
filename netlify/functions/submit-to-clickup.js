// Use the root node-fetch module
const fetch = require('node-fetch');

// Helper function to handle CORS
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    const { formType, ...formData } = data;

    // Get ClickUp API key and list ID from environment variables
    const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
    const LIST_ID = process.env.CLICKUP_LIST_ID;

    // Map form data to ClickUp task format
    const taskData = {
      name: `New ${formType} Submission - ${new Date().toLocaleString()}`,
      description: Object.entries(formData)
        .map(([key, value]) => `**${key}:** ${value}`)
        .join('\n\n'),
      status: 'New',
      priority: 3, // 1-4 where 1 is urgent
    };

    // Create task in ClickUp
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${LIST_ID}/task`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: CLICKUP_API_KEY,
        },
        body: JSON.stringify(taskData),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ClickUp API error: ${error}`);
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        data: result 
      }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        success: false, 
        error: error.message || 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
    };
  }
};
