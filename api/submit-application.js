// Vercel serverless function for form submission
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    const notionToken = process.env.NOTION_TOKEN;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;
    
    return res.status(200).json({
      message: 'GenZen Pro Application API endpoint is working',
      hasToken: !!notionToken,
      hasDatabase: !!notionDatabaseId,
      tokenLength: notionToken ? notionToken.length : 0,
      environment: process.env.NODE_ENV || 'unknown'
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    console.log('Received form data:', formData);
    
    // Validate required environment variables
    const notionToken = process.env.NOTION_TOKEN;
    const notionDatabaseId = process.env.NOTION_DATABASE_ID;
    
    console.log('Environment check:', {
      hasToken: !!notionToken,
      hasDatabase: !!notionDatabaseId,
      tokenLength: notionToken ? notionToken.length : 0,
      databaseId: notionDatabaseId ? notionDatabaseId.substring(0, 8) + '...' : 'missing'
    });
    
    if (!notionToken || !notionDatabaseId) {
      console.error('Missing Notion environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Prepare Notion page properties based on form data
    const notionPageData = {
      parent: { database_id: notionDatabaseId },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: formData.name || 'Unknown'
              }
            }
          ]
        },
        'Email': {
          email: formData.email || ''
        },
        'Company': {
          rich_text: [
            {
              text: {
                content: formData.company || ''
              }
            }
          ]
        },
        'Role': {
          rich_text: [
            {
              text: {
                content: formData.role || ''
              }
            }
          ]
        },
        'Situation': {
          multi_select: Array.isArray(formData.situation) 
            ? formData.situation.map((item) => ({ name: item }))
            : []
        },
        'Challenges': {
          rich_text: [
            {
              text: {
                content: formData.challenges || ''
              }
            }
          ]
        },
        'Solutions Tried': {
          rich_text: [
            {
              text: {
                content: formData.solutionsTried || ''
              }
            }
          ]
        },
        'Timeline': {
          select: formData.timeline ? { name: formData.timeline } : null
        },
        'Desired Outcomes': {
          multi_select: Array.isArray(formData.outcomes) 
            ? formData.outcomes.map((item) => ({ name: item }))
            : []
        },
        'Referral Source': {
          select: formData.referralSource ? { name: formData.referralSource } : null
        },
        'Additional Info': {
          rich_text: [
            {
              text: {
                content: formData.additionalInfo || ''
              }
            }
          ]
        },
        'Submission Date': {
          date: {
            start: new Date().toISOString()
          }
        },
        'Status': {
          select: {
            name: 'New Application'
          }
        }
      }
    };

    console.log('Sending to Notion:', JSON.stringify(notionPageData, null, 2));

    // Submit to Notion
    const notionResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(notionPageData),
    });

    if (!notionResponse.ok) {
      const errorText = await notionResponse.text();
      console.error('Notion API error:', {
        status: notionResponse.status,
        statusText: notionResponse.statusText,
        errorText: errorText
      });
      return res.status(500).json({
        error: 'Failed to submit application',
        details: `Notion API returned ${notionResponse.status}: ${errorText}`
      });
    }

    const result = await notionResponse.json();
    
    return res.status(200).json({ success: true, id: result.id });

  } catch (error) {
    console.error('Application submission error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}