import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.json();
    console.log('Received form data:', formData);
    
    // Validate required environment variables
    const notionToken = import.meta.env.NOTION_TOKEN;
    const notionDatabaseId = import.meta.env.NOTION_DATABASE_ID;
    
    console.log('Environment check:', {
      hasToken: !!notionToken,
      hasDatabase: !!notionDatabaseId,
      tokenLength: notionToken ? notionToken.length : 0,
      databaseId: notionDatabaseId ? notionDatabaseId.substring(0, 8) + '...' : 'missing'
    });
    
    if (!notionToken || !notionDatabaseId) {
      console.error('Missing Notion environment variables');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
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
            ? formData.situation.map((item: string) => ({ name: item }))
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
            ? formData.outcomes.map((item: string) => ({ name: item }))
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
      return new Response(
        JSON.stringify({ 
          error: 'Failed to submit application',
          details: `Notion API returned ${notionResponse.status}: ${errorText}`
        }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const result = await notionResponse.json();
    
    return new Response(
      JSON.stringify({ success: true, id: result.id }), 
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Application submission error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const GET: APIRoute = async () => {
  const notionToken = import.meta.env.NOTION_TOKEN;
  const notionDatabaseId = import.meta.env.NOTION_DATABASE_ID;
  
  return new Response(
    JSON.stringify({ 
      message: 'GenZen Pro Application API endpoint is working',
      hasToken: !!notionToken,
      hasDatabase: !!notionDatabaseId,
      tokenLength: notionToken ? notionToken.length : 0,
      environment: import.meta.env.MODE
    }), 
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};